import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
export const my_asset_key_mich_type: att.MichelineType = att.prim_annot_to_mich_type("timestamp", []);
export const my_asset_value_mich_type: att.MichelineType = att.prim_annot_to_mich_type("string", []);
export type my_asset_container = Array<[
    Date,
    string
]>;
export const my_asset_container_mich_type: att.MichelineType = att.pair_array_to_mich_type([
    att.pair_annot_to_mich_type("big_map", att.prim_annot_to_mich_type("timestamp", []), att.pair_array_to_mich_type([
        att.prim_annot_to_mich_type("nat", ["%index"]),
        att.prim_annot_to_mich_type("string", ["%value"])
    ], ["%values"]), ["%values"]),
    att.pair_annot_to_mich_type("big_map", att.prim_annot_to_mich_type("nat", []), att.prim_annot_to_mich_type("timestamp", []), ["%keys"]),
    att.prim_annot_to_mich_type("nat", ["%size"])
], []);
const asset_put_arg_to_mich = (i: Date): att.Micheline => {
    return att.date_to_mich(i);
}
export class Type_asset_key_1_iterable_big_map_date {
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
        const address = (await ex.deploy("./tests/contracts/type_asset_key_1_iterable_big_map_date.arl", {}, params)).address;
        this.address = address;
    }
    async asset_put(i: Date, params: Partial<ex.Parameters>): Promise<att.CallResult> {
        if (this.address != undefined) {
            return await ex.call(this.address, "asset_put", asset_put_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_asset_put_param(i: Date, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "asset_put", asset_put_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_my_asset_value(key: Date): Promise<string | undefined> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            const raw_data = await ex.get_big_map_value(BigInt(att.Int.from_mich((storage as att.Mpair)?.args[0]).toString()), att.date_to_mich(key), my_asset_key_mich_type);
            const data = raw_data ? raw_data?.args[1] : undefined;
            if (data != undefined) {
                return att.mich_to_string(data);
            }
            else {
                return undefined;
            }
        }
        throw new Error("Contract not initialised");
    }
    async has_my_asset_value(key: Date): Promise<boolean> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            const raw_data = await ex.get_big_map_value(BigInt(att.Int.from_mich((storage as att.Mpair)?.args[0]).toString()), att.date_to_mich(key), my_asset_key_mich_type);
            const data = raw_data ? raw_data?.args[1] : undefined;
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
export const type_asset_key_1_iterable_big_map_date = new Type_asset_key_1_iterable_big_map_date();
