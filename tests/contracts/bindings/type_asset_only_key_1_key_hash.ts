import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
export class my_asset_key implements att.ArchetypeType {
    constructor(public k: att.Key_hash) { }
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
        return new my_asset_key(att.mich_to_key_hash(input));
    }
}
export const my_asset_key_mich_type: att.MichelineType = att.prim_annot_to_mich_type("key_hash", []);
export type my_asset_container = Array<my_asset_key>;
export const my_asset_container_mich_type: att.MichelineType = att.set_annot_to_mich_type(att.prim_annot_to_mich_type("key_hash", []), []);
const asset_put_arg_to_mich = (i: att.Key_hash): att.Micheline => {
    return i.to_mich();
}
export class Type_asset_only_key_1_key_hash {
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
        const address = (await ex.deploy("./tests/contracts/type_asset_only_key_1_key_hash.arl", {}, params)).address;
        this.address = address;
    }
    async asset_put(i: att.Key_hash, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "asset_put", asset_put_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_asset_put_param(i: att.Key_hash, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "asset_put", asset_put_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_my_asset(): Promise<my_asset_container> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.mich_to_list(storage, x => { return my_asset_key.from_mich(x); });
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const type_asset_only_key_1_key_hash = new Type_asset_only_key_1_key_hash();