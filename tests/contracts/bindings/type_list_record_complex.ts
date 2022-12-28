import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
export class r_record implements att.ArchetypeType {
    constructor(public f_a: att.Nat, public f_b: att.Int, public f_c: att.Tez, public f_d: att.Rational, public f_e: boolean, public f_f: att.Bytes, public f_g: string, public f_h: Date, public f_i: att.Duration, public f_j: att.Address, public f_k: att.Option<att.Nat>, public f_n: Array<string>, public f_p: Array<[
        string,
        att.Nat,
        att.Int
    ]>) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return att.pair_to_mich([att.pair_to_mich([this.f_a.to_mich(), this.f_b.to_mich(), this.f_c.to_mich()]), att.pair_to_mich([att.pair_to_mich([this.f_d.to_mich(), att.bool_to_mich(this.f_e)]), att.pair_to_mich([this.f_f.to_mich(), att.string_to_mich(this.f_g), att.date_to_mich(this.f_h), this.f_i.to_mich(), this.f_j.to_mich(), this.f_k.to_mich((x => { return x.to_mich(); })), att.list_to_mich(this.f_n, x => {
                        return att.string_to_mich(x);
                    }), att.list_to_mich(this.f_p, x => {
                        return att.pair_to_mich([att.string_to_mich(x[0]), x[1].to_mich(), x[2].to_mich()]);
                    })])])]);
    }
    equals(v: r_record): boolean {
        return att.micheline_equals(this.to_mich(), v.to_mich());
    }
    static from_mich(input: att.Micheline): r_record {
        return new r_record(att.Nat.from_mich(((input as att.Mpair).args[0] as att.Mpair).args[0]), att.Int.from_mich(((input as att.Mpair).args[0] as att.Mpair).args[1]), att.Tez.from_mich(((input as att.Mpair).args[0] as att.Mpair).args[2]), att.Rational.from_mich(((att.pair_to_mich((input as att.Mpair as att.Mpair).args.slice(1, 10)) as att.Mpair).args[0] as att.Mpair).args[0]), att.mich_to_bool(((att.pair_to_mich((input as att.Mpair as att.Mpair).args.slice(1, 10)) as att.Mpair).args[0] as att.Mpair).args[1]), att.Bytes.from_mich((att.pair_to_mich((att.pair_to_mich((input as att.Mpair as att.Mpair).args.slice(1, 10)) as att.Mpair as att.Mpair).args.slice(1, 9)) as att.Mpair).args[0]), att.mich_to_string((att.pair_to_mich((att.pair_to_mich((input as att.Mpair as att.Mpair).args.slice(1, 10)) as att.Mpair as att.Mpair).args.slice(1, 9)) as att.Mpair).args[1]), att.mich_to_date((att.pair_to_mich((att.pair_to_mich((input as att.Mpair as att.Mpair).args.slice(1, 10)) as att.Mpair as att.Mpair).args.slice(1, 9)) as att.Mpair).args[2]), att.Duration.from_mich((att.pair_to_mich((att.pair_to_mich((input as att.Mpair as att.Mpair).args.slice(1, 10)) as att.Mpair as att.Mpair).args.slice(1, 9)) as att.Mpair).args[3]), att.Address.from_mich((att.pair_to_mich((att.pair_to_mich((input as att.Mpair as att.Mpair).args.slice(1, 10)) as att.Mpair as att.Mpair).args.slice(1, 9)) as att.Mpair).args[4]), att.Option.from_mich((att.pair_to_mich((att.pair_to_mich((input as att.Mpair as att.Mpair).args.slice(1, 10)) as att.Mpair as att.Mpair).args.slice(1, 9)) as att.Mpair).args[5], x => { return att.Nat.from_mich(x); }), att.mich_to_list((att.pair_to_mich((att.pair_to_mich((input as att.Mpair as att.Mpair).args.slice(1, 10)) as att.Mpair as att.Mpair).args.slice(1, 9)) as att.Mpair).args[6], x => { return att.mich_to_string(x); }), att.mich_to_list((att.pair_to_mich((att.pair_to_mich((input as att.Mpair as att.Mpair).args.slice(1, 10)) as att.Mpair as att.Mpair).args.slice(1, 9)) as att.Mpair).args[7], x => { return (p => {
            return [att.mich_to_string((p as att.Mpair).args[0]), att.Nat.from_mich((p as att.Mpair).args[1]), att.Int.from_mich((p as att.Mpair).args[2])];
        })(x); }));
    }
}
export const r_record_mich_type: att.MichelineType = att.pair_array_to_mich_type([
    att.pair_array_to_mich_type([
        att.prim_annot_to_mich_type("nat", ["%f1"]),
        att.prim_annot_to_mich_type("int", ["%f2"]),
        att.prim_annot_to_mich_type("mutez", ["%f3"])
    ], []),
    att.pair_array_to_mich_type([
        att.pair_array_to_mich_type([
            att.pair_array_to_mich_type([
                att.prim_annot_to_mich_type("int", []),
                att.prim_annot_to_mich_type("nat", [])
            ], ["%f4"]),
            att.prim_annot_to_mich_type("bool", ["%f5"])
        ], []),
        att.pair_array_to_mich_type([
            att.prim_annot_to_mich_type("bytes", ["%f6"]),
            att.prim_annot_to_mich_type("string", ["%f7"]),
            att.prim_annot_to_mich_type("timestamp", ["%f8"]),
            att.prim_annot_to_mich_type("int", ["%f9"]),
            att.prim_annot_to_mich_type("address", ["%f10"]),
            att.option_annot_to_mich_type(att.prim_annot_to_mich_type("nat", []), ["%f11"]),
            att.list_annot_to_mich_type(att.prim_annot_to_mich_type("string", []), ["%f12"]),
            att.set_annot_to_mich_type(att.pair_array_to_mich_type([
                att.prim_annot_to_mich_type("string", []),
                att.prim_annot_to_mich_type("nat", []),
                att.prim_annot_to_mich_type("int", [])
            ], []), ["%f13"])
        ], [])
    ], [])
], []);
const set_value_arg_to_mich = (i: Array<r_record>): att.Micheline => {
    return att.list_to_mich(i, x => {
        return x.to_mich();
    });
}
export class Type_list_record_complex {
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
        const address = (await ex.deploy("./tests/contracts/type_list_record_complex.arl", {}, params)).address;
        this.address = address;
    }
    async set_value(i: Array<r_record>, params: Partial<ex.Parameters>): Promise<att.CallResult> {
        if (this.address != undefined) {
            return await ex.call(this.address, "set_value", set_value_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_set_value_param(i: Array<r_record>, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "set_value", set_value_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_res(): Promise<Array<r_record>> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.mich_to_list(storage, x => { return r_record.from_mich(x); });
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const type_list_record_complex = new Type_list_record_complex();
