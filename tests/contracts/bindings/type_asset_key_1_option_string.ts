import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
export class my_asset_key implements att.ArchetypeType {
    constructor(public k: att.Option<string>) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return this.k.to_mich((x => { return att.string_to_mich(x); }));
    }
    equals(v: my_asset_key): boolean {
        return this.k.equals(v.k);
    }
    static from_mich(input: att.Micheline): my_asset_key {
        return new my_asset_key(att.mich_to_option(input, x => { return att.mich_to_string(x); }));
    }
}
export const my_asset_key_mich_type: att.MichelineType = att.option_annot_to_mich_type(att.prim_annot_to_mich_type("string", []), []);
export class my_asset_value implements att.ArchetypeType {
    constructor(public v: string) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return att.string_to_mich(this.v);
    }
    equals(v: my_asset_value): boolean {
        return this.v == v.v;
    }
    static from_mich(input: att.Micheline): my_asset_value {
        return new my_asset_value(att.mich_to_string(input));
    }
}
export const my_asset_value_mich_type: att.MichelineType = att.prim_annot_to_mich_type("string", []);
export type my_asset_container = Array<[
    my_asset_key,
    my_asset_value
]>;
export const my_asset_container_mich_type: att.MichelineType = att.pair_annot_to_mich_type("map", att.option_annot_to_mich_type(att.prim_annot_to_mich_type("string", []), []), att.prim_annot_to_mich_type("string", []), []);
const asset_put_arg_to_mich = (i: att.Option<string>): att.Micheline => {
    return i.to_mich((x => { return att.string_to_mich(x); }));
}
export class Type_asset_key_1_option_string {
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
        const address = (await ex.deploy("./tests/contracts/type_asset_key_1_option_string.arl", {}, params)).address;
        this.address = address;
    }
    async asset_put(i: att.Option<string>, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "asset_put", asset_put_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_asset_put_param(i: att.Option<string>, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
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
export const type_asset_key_1_option_string = new Type_asset_key_1_option_string();
