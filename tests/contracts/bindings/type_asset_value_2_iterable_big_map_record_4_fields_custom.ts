import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
export class r_record implements att.ArchetypeType {
    constructor(public f_a: att.Nat, public f_b: string, public f_c: att.Bytes, public f_d: boolean) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return att.pair_to_mich([this.f_a.to_mich(), att.pair_to_mich([att.string_to_mich(this.f_b), this.f_c.to_mich()]), att.bool_to_mich(this.f_d)]);
    }
    equals(v: r_record): boolean {
        return att.micheline_equals(this.to_mich(), v.to_mich());
    }
    static from_mich(input: att.Micheline): r_record {
        return new r_record(att.Nat.from_mich((input as att.Mpair).args[0]), att.mich_to_string(((input as att.Mpair).args[1] as att.Mpair).args[0]), att.Bytes.from_mich(((input as att.Mpair).args[1] as att.Mpair).args[1]), att.mich_to_bool((input as att.Mpair).args[2]));
    }
}
export const r_record_mich_type: att.MichelineType = att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("nat", ["%f_a"]),
    att.pair_array_to_mich_type([
        att.prim_annot_to_mich_type("string", ["%f_b"]),
        att.prim_annot_to_mich_type("bytes", ["%f_c"])
    ], []),
    att.prim_annot_to_mich_type("bool", ["%f_d"])
], []);
export const my_asset_key_mich_type: att.MichelineType = att.prim_annot_to_mich_type("nat", []);
export const my_asset_value_mich_type: att.MichelineType = att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("nat", ["%f_a"]),
    att.pair_array_to_mich_type([
        att.prim_annot_to_mich_type("string", ["%f_b"]),
        att.prim_annot_to_mich_type("bytes", ["%f_c"])
    ], []),
    att.prim_annot_to_mich_type("bool", ["%f_d"])
], []);
export type my_asset_container = Array<[
    att.Nat,
    r_record
]>;
export const my_asset_container_mich_type: att.MichelineType = att.pair_array_to_mich_type([
    att.pair_annot_to_mich_type("big_map", att.prim_annot_to_mich_type("nat", []), att.pair_array_to_mich_type([
        att.prim_annot_to_mich_type("nat", ["%index"]),
        att.pair_array_to_mich_type([
            att.prim_annot_to_mich_type("nat", ["%f_a"]),
            att.pair_array_to_mich_type([
                att.prim_annot_to_mich_type("string", ["%f_b"]),
                att.prim_annot_to_mich_type("bytes", ["%f_c"])
            ], []),
            att.prim_annot_to_mich_type("bool", ["%f_d"])
        ], ["%value"])
    ], ["%values"]), ["%values"]),
    att.pair_annot_to_mich_type("big_map", att.prim_annot_to_mich_type("nat", []), att.prim_annot_to_mich_type("nat", []), ["%keys"]),
    att.prim_annot_to_mich_type("nat", ["%size"])
], []);
const asset_put_arg_to_mich = (i: r_record): att.Micheline => {
    return i.to_mich();
}
export class Type_asset_value_2_iterable_big_map_record_4_fields_custom {
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
        const address = (await ex.deploy("./tests/contracts/type_asset_value_2_iterable_big_map_record_4_fields_custom.arl", {}, params)).address;
        this.address = address;
    }
    async asset_put(i: r_record, params: Partial<ex.Parameters>): Promise<att.CallResult> {
        if (this.address != undefined) {
            return await ex.call(this.address, "asset_put", asset_put_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_asset_put_param(i: r_record, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "asset_put", asset_put_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_my_asset_value(key: att.Nat): Promise<r_record | undefined> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            const raw_data = await ex.get_big_map_value(BigInt(att.Int.from_mich((storage as att.Mpair)?.args[0]).toString()), key.to_mich(), my_asset_key_mich_type);
            const data = raw_data ? att.pair_to_mich((raw_data as att.Mpair).args.slice(1, 4)) : undefined;
            if (data != undefined) {
                return r_record.from_mich(data);
            }
            else {
                return undefined;
            }
        }
        throw new Error("Contract not initialised");
    }
    async has_my_asset_value(key: att.Nat): Promise<boolean> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            const raw_data = await ex.get_big_map_value(BigInt(att.Int.from_mich((storage as att.Mpair)?.args[0]).toString()), key.to_mich(), my_asset_key_mich_type);
            const data = raw_data ? att.pair_to_mich((raw_data as att.Mpair).args.slice(1, 4)) : undefined;
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
export const type_asset_value_2_iterable_big_map_record_4_fields_custom = new Type_asset_value_2_iterable_big_map_record_4_fields_custom();
