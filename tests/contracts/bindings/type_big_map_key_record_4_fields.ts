import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
export class r_record implements att.ArchetypeType {
    constructor(public f_a: att.Nat, public f_b: string, public f_c: att.Bytes, public f_d: boolean) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return att.pair_to_mich([this.f_a.to_mich(), att.string_to_mich(this.f_b), this.f_c.to_mich(), att.bool_to_mich(this.f_d)]);
    }
    equals(v: r_record): boolean {
        return att.micheline_equals(this.to_mich(), v.to_mich());
    }
    static from_mich(input: att.Micheline): r_record {
        return new r_record(att.mich_to_nat((input as att.Mpair).args[0]), att.mich_to_string((input as att.Mpair).args[1]), att.mich_to_bytes((input as att.Mpair).args[2]), att.mich_to_bool((input as att.Mpair).args[3]));
    }
}
export const r_record_mich_type: att.MichelineType = att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("nat", ["%f_a"]),
    att.prim_annot_to_mich_type("string", ["%f_b"]),
    att.prim_annot_to_mich_type("bytes", ["%f_c"]),
    att.prim_annot_to_mich_type("bool", ["%f_d"])
], []);
const set_value_arg_to_mich = (i: r_record): att.Micheline => {
    return i.to_mich();
}
export class Type_big_map_key_record_4_fields {
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
        const address = (await ex.deploy("./tests/contracts/type_big_map_key_record_4_fields.arl", {}, params)).address;
        this.address = address;
    }
    async set_value(i: r_record, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "set_value", set_value_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_set_value_param(i: r_record, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "set_value", set_value_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_res_value(key: r_record): Promise<att.Nat | undefined> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            const data = await ex.get_big_map_value(BigInt(att.mich_to_int(storage).toString()), key.to_mich(), att.pair_array_to_mich_type([
                att.prim_annot_to_mich_type("nat", ["%f_a"]),
                att.prim_annot_to_mich_type("string", ["%f_b"]),
                att.prim_annot_to_mich_type("bytes", ["%f_c"]),
                att.prim_annot_to_mich_type("bool", ["%f_d"])
            ], []));
            if (data != undefined) {
                return att.mich_to_nat(data);
            }
            else {
                return undefined;
            }
        }
        throw new Error("Contract not initialised");
    }
    async has_res_value(key: r_record): Promise<boolean> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            const data = await ex.get_big_map_value(BigInt(att.mich_to_int(storage).toString()), key.to_mich(), att.pair_array_to_mich_type([
                att.prim_annot_to_mich_type("nat", ["%f_a"]),
                att.prim_annot_to_mich_type("string", ["%f_b"]),
                att.prim_annot_to_mich_type("bytes", ["%f_c"]),
                att.prim_annot_to_mich_type("bool", ["%f_d"])
            ], []));
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
export const type_big_map_key_record_4_fields = new Type_big_map_key_record_4_fields();
