import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
export class r_record implements att.ArchetypeType {
    constructor(public f_a: att.Nat) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return this.f_a.to_mich();
    }
    equals(v: r_record): boolean {
        return this.f_a.equals(v.f_a);
    }
    static from_mich(input: att.Micheline): r_record {
        return new r_record(att.mich_to_nat(input));
    }
}
export const r_record_mich_type: att.MichelineType = att.prim_annot_to_mich_type("nat", []);
const view_get_value_arg_to_mich = (i: r_record): att.Micheline => {
    return i.to_mich();
}
export class Type_view_record_1_field {
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
        const address = (await ex.deploy("./tests/contracts/type_view_record_1_field.arl", {}, params)).address;
        this.address = address;
    }
    async view_get_value(i: r_record, params: Partial<ex.Parameters>): Promise<r_record | undefined> {
        if (this.address != undefined) {
            const mich = await ex.exec_view(this.get_address(), "get_value", view_get_value_arg_to_mich(i), params);
            return mich.value ? r_record.from_mich(mich.value) : undefined;
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const type_view_record_1_field = new Type_view_record_1_field();
