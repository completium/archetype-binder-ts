import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
export class r_record implements att.ArchetypeType {
    constructor(public f_a: att.Nat, public f_b: string) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return att.pair_to_mich([this.f_a.to_mich(), att.string_to_mich(this.f_b)]);
    }
    equals(v: r_record): boolean {
        return att.micheline_equals(this.to_mich(), v.to_mich());
    }
    static from_mich(input: att.Micheline): r_record {
        return new r_record(att.mich_to_nat((input as att.Mpair).args[0]), att.mich_to_string((input as att.Mpair).args[1]));
    }
}
export const r_record_mich_type: att.MichelineType = att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("nat", ["%f_a"]),
    att.prim_annot_to_mich_type("string", ["%f_b"])
], []);
const view_get_value_arg_to_mich = (i: r_record): att.Micheline => {
    return i.to_mich();
}
export class Type_view_record_2_fields {
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
        const address = (await ex.deploy("./tests/contracts/type_view_record_2_fields.arl", {}, params)).address;
        this.address = address;
    }
    async view_get_value(i: r_record, params: Partial<ex.Parameters>): Promise<r_record> {
        if (this.address != undefined) {
            const mich = await ex.exec_view(this.get_address(), "get_value", view_get_value_arg_to_mich(i), params);
            return r_record.from_mich(mich.value);
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const type_view_record_2_fields = new Type_view_record_2_fields();
