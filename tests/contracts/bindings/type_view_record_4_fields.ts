import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
export class r_record implements att.ArchetypeType {
    constructor(public f_a: att.Nat, public f_b: string, public f_c: att.Bytes, public f_d: boolean) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return att.pair_to_mich([this.f_a.to_mich(), att.pair_to_mich([att.string_to_mich(this.f_b), att.pair_to_mich([this.f_c.to_mich(), att.bool_to_mich(this.f_d)])])]);
    }
    equals(v: r_record): boolean {
        return (this.f_a.equals(v.f_a) && this.f_a.equals(v.f_a) && this.f_b == v.f_b && this.f_c.equals(v.f_c) && this.f_d == v.f_d);
    }
}
export const r_record_mich_type: att.MichelineType = att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("nat", ["%f_a"]),
    att.pair_array_to_mich_type([
        att.prim_annot_to_mich_type("string", ["%f_b"]),
        att.pair_array_to_mich_type([
            att.prim_annot_to_mich_type("bytes", ["%f_c"]),
            att.prim_annot_to_mich_type("bool", ["%f_d"])
        ], [])
    ], [])
], []);
const view_get_value_arg_to_mich = (i: r_record): att.Micheline => {
    return i.to_mich();
}
export class Type_view_record_4_fields {
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
        const address = await ex.deploy("./tests/contracts/type_view_record_4_fields.arl", {}, params);
        this.address = address;
    }
    async view_get_value(i: r_record, params: Partial<ex.Parameters>): Promise<r_record> {
        if (this.address != undefined) {
            const mich = await ex.exec_view(this.get_address(), "get_value", view_get_value_arg_to_mich(i), params);
            return new r_record((x => { return new att.Nat(x); })(mich.f_a), (x => { return x; })(mich.f_b), (x => { return new att.Bytes(x); })(mich.f_c), (x => { return x; })(mich.f_d));
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const type_view_record_4_fields = new Type_view_record_4_fields();
