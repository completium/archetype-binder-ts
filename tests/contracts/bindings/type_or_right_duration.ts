import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
const set_value_arg_to_mich = (i: att.Duration): att.Micheline => {
    return i.to_mich();
}
export class Type_or_right_duration {
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
        const address = await ex.deploy("./tests/contracts/type_or_right_duration.arl", {}, params);
        this.address = address;
    }
    async set_value(i: att.Duration, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "set_value", set_value_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_set_value_param(i: att.Duration, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "set_value", set_value_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_res(): Promise<att.Or<att.Nat, att.Duration>> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            return (x => {
                const is_left = x["0"] !== undefined;
                const value = is_left ? (x => { return new att.Nat(x["0"]); })(x["0"]) : (x => { return new att.Duration(x["1"]); })(x["1"]);
                return new att.Or<att.Nat, att.Duration>(value, is_left);
            })(storage);
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const type_or_right_duration = new Type_or_right_duration();