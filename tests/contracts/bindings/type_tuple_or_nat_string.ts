import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
const set_value_arg_to_mich = (i: att.Or<att.Nat, att.Nat>): att.Micheline => {
    return i.to_mich((x => { return x.to_mich(); }), (x => { return x.to_mich(); }));
}
export class Type_tuple_or_nat_string {
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
        const res = await ex.deploy("./tests/contracts/type_tuple_or_nat_string.arl", {}, params);
        this.address = res.address;
    }
    async set_value(i: att.Or<att.Nat, att.Nat>, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "set_value", set_value_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_set_value_param(i: att.Or<att.Nat, att.Nat>, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "set_value", set_value_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_res(): Promise<[
        att.Nat,
        att.Or<att.Nat, att.Nat>,
        string
    ]> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            return [(x => { return new att.Nat(x); })(storage[Object.keys(storage)[0]]), (x => { return (x => {
                    const is_left = x["0"] !== undefined;
                    const value = is_left ? (x => { return new att.Nat(x); })(x["0"]) : (x => { return new att.Nat(x); })(x["1"]);
                    return new att.Or<att.Nat, att.Nat>(value, is_left);
                })(x); })(storage[Object.keys(storage)[1]]), (x => { return x; })(storage[Object.keys(storage)[2]])];
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const type_tuple_or_nat_string = new Type_tuple_or_nat_string();
