import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
export type r_record = att.Nat;
export const r_record_mich_type: att.MichelineType = att.prim_annot_to_mich_type("nat", []);
const set_value_arg_to_mich = (i: r_record): att.Micheline => {
    return i.to_mich();
}
export class Type_or_left_record_1_field {
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
        const address = await ex.deploy("./tests/contracts/type_or_left_record_1_field.arl", {}, params);
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
    async get_res(): Promise<att.Or<r_record, att.Nat>> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            return (x => {
                const is_left = x["0"] !== undefined;
                const value = is_left ? (x => { return (x => { return new att.Nat(x); })(x); })(x["0"]) : (x => { return new att.Nat(x); })(x["1"]);
                return new att.Or<r_record, att.Nat>(value, is_left);
            })(storage);
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const type_or_left_record_1_field = new Type_or_left_record_1_field();