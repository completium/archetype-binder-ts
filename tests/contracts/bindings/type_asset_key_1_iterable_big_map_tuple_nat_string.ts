import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
export const my_asset_key_mich_type: att.MichelineType = att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("nat", []),
    att.prim_annot_to_mich_type("string", [])
], []);
export const my_asset_value_mich_type: att.MichelineType = att.prim_annot_to_mich_type("string", []);
export type my_asset_container = Array<[
    [
        att.Nat,
        string
    ],
    string
]>;
export const my_asset_container_mich_type: att.MichelineType = att.pair_array_to_mich_type([
    att.pair_annot_to_mich_type("big_map", att.pair_array_to_mich_type([
        att.prim_annot_to_mich_type("nat", []),
        att.prim_annot_to_mich_type("string", [])
    ], []), att.pair_array_to_mich_type([
        att.prim_annot_to_mich_type("nat", ["%index"]),
        att.prim_annot_to_mich_type("string", ["%value"])
    ], ["%values"]), ["%values"]),
    att.pair_annot_to_mich_type("big_map", att.prim_annot_to_mich_type("nat", []), att.pair_array_to_mich_type([
        att.prim_annot_to_mich_type("nat", []),
        att.prim_annot_to_mich_type("string", [])
    ], []), ["%keys"]),
    att.prim_annot_to_mich_type("nat", ["%size"])
], []);
const asset_put_arg_to_mich = (i: [
    att.Nat,
    string
]): att.Micheline => {
    return att.pair_to_mich([i[0].to_mich(), att.string_to_mich(i[1])]);
}
export class Type_asset_key_1_iterable_big_map_tuple_nat_string {
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
        const address = (await ex.deploy("./tests/contracts/type_asset_key_1_iterable_big_map_tuple_nat_string.arl", {}, params)).address;
        this.address = address;
    }
    async asset_put(i: [
        att.Nat,
        string
    ], params: Partial<ex.Parameters>): Promise<att.CallResult> {
        if (this.address != undefined) {
            return await ex.call(this.address, "asset_put", asset_put_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_asset_put_param(i: [
        att.Nat,
        string
    ], params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "asset_put", asset_put_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_my_asset_value(key: [
        att.Nat,
        string
    ]): Promise<string | undefined> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            const raw_data = await ex.get_big_map_value(BigInt(att.Int.from_mich((storage as att.Mpair)?.args[0]).toString()), att.pair_to_mich([key[0].to_mich(), att.string_to_mich(key[1])]), my_asset_key_mich_type);
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
    async has_my_asset_value(key: [
        att.Nat,
        string
    ]): Promise<boolean> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            const raw_data = await ex.get_big_map_value(BigInt(att.Int.from_mich((storage as att.Mpair)?.args[0]).toString()), att.pair_to_mich([key[0].to_mich(), att.string_to_mich(key[1])]), my_asset_key_mich_type);
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
export const type_asset_key_1_iterable_big_map_tuple_nat_string = new Type_asset_key_1_iterable_big_map_tuple_nat_string();
