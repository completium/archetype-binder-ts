import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
export const my_asset_key_mich_type: att.MichelineType = att.option_annot_to_mich_type(att.prim_annot_to_mich_type("nat", []), []);
export const my_asset_value_mich_type: att.MichelineType = att.prim_annot_to_mich_type("string", []);
export type my_asset_container = Array<[
    att.Option<att.Nat>,
    string
]>;
export const my_asset_container_mich_type: att.MichelineType = att.pair_annot_to_mich_type("big_map", att.option_annot_to_mich_type(att.prim_annot_to_mich_type("nat", []), []), att.prim_annot_to_mich_type("string", []), []);
const asset_put_arg_to_mich = (i: att.Option<att.Nat>): att.Micheline => {
    return i.to_mich((x => { return x.to_mich(); }));
}
export class Type_asset_key_1_big_map_option_nat {
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
        const address = (await ex.deploy("./tests/contracts/type_asset_key_1_big_map_option_nat.arl", {}, params)).address;
        this.address = address;
    }
    async asset_put(i: att.Option<att.Nat>, params: Partial<ex.Parameters>): Promise<att.CallResult> {
        if (this.address != undefined) {
            return await ex.call(this.address, "asset_put", asset_put_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_asset_put_param(i: att.Option<att.Nat>, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "asset_put", asset_put_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_my_asset_value(key: att.Option<att.Nat>): Promise<string | undefined> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            const data = await ex.get_big_map_value(BigInt(att.mich_to_int(storage).toString()), key.to_mich((x => { return x.to_mich(); })), my_asset_key_mich_type);
            if (data != undefined) {
                return att.mich_to_string(data);
            }
            else {
                return undefined;
            }
        }
        throw new Error("Contract not initialised");
    }
    async has_my_asset_value(key: att.Option<att.Nat>): Promise<boolean> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            const data = await ex.get_big_map_value(BigInt(att.mich_to_int(storage).toString()), key.to_mich((x => { return x.to_mich(); })), my_asset_key_mich_type);
            if (data != undefined) {
                return true;
            }
            else {
                return false;
            }
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const type_asset_key_1_big_map_option_nat = new Type_asset_key_1_big_map_option_nat();
