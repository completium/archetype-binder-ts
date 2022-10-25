import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
export type r_record = att.Nat;
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
    async view_get_value(i: r_record, params: Partial<ex.Parameters>): Promise<r_record> {
        if (this.address != undefined) {
            const mich = await ex.exec_view(this.get_address(), "get_value", view_get_value_arg_to_mich(i), params);
            return (x => { return new att.Nat(x); })(mich);
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const type_view_record_1_field = new Type_view_record_1_field();
