import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
export class my_asset_key implements att.ArchetypeType {
    constructor(public k: att.Nat) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return this.k.to_mich();
    }
    equals(v: my_asset_key): boolean {
        return this.k.equals(v.k);
    }
    static from_mich(input: att.Micheline): my_asset_key {
        return new my_asset_key(att.mich_to_nat(input));
    }
}
export const my_asset_key_mich_type: att.MichelineType = att.prim_annot_to_mich_type("nat", []);
export class my_asset_value implements att.ArchetypeType {
    constructor(public v: att.Chest_key) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return this.v.to_mich();
    }
    equals(v: my_asset_value): boolean {
        return this.v.equals(v.v);
    }
    static from_mich(input: att.Micheline): my_asset_value {
        return new my_asset_value(att.mich_to_chest_key(input));
    }
}
export const my_asset_value_mich_type: att.MichelineType = att.prim_annot_to_mich_type("chest_key", []);
export type my_asset_container = Array<[
    my_asset_key,
    my_asset_value
]>;
export const my_asset_container_mich_type: att.MichelineType = att.pair_annot_to_mich_type("map", att.prim_annot_to_mich_type("nat", []), att.prim_annot_to_mich_type("chest_key", []), []);
const asset_put_arg_to_mich = (i: att.Chest_key): att.Micheline => {
    return i.to_mich();
}
export class Type_asset_value_2_chest_key {
    address: string | undefined;
    constructor(address: string | undefined = undefined) {
        this.address = address;
    }
    get_address(): att.Address {
        if (undefined != this.address) {
            return new att.Address(this.address);
        }
        throw new Error("Contract not initialised");
    }
    async get_balance(): Promise<att.Tez> {
        if (null != this.address) {
            return await ex.get_balance(new att.Address(this.address));
        }
        throw new Error("Contract not initialised");
    }
    async deploy(params: Partial<ex.Parameters>) {
        const address = (await ex.deploy("./tests/contracts/type_asset_value_2_chest_key.arl", {}, params)).address;
        this.address = address;
    }
    async asset_put(i: att.Chest_key, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "asset_put", asset_put_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_asset_put_param(i: att.Chest_key, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "asset_put", asset_put_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_my_asset(): Promise<my_asset_container> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.mich_to_map(storage, (x, y) => [my_asset_key.from_mich(x), my_asset_value.from_mich(y)]);
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const type_asset_value_2_chest_key = new Type_asset_value_2_chest_key();
