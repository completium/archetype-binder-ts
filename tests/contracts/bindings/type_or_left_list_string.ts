import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
const set_value_arg_to_mich = (i: Array<string>): att.Micheline => {
    return att.list_to_mich(i, x => {
        return att.string_to_mich(x);
    });
}
export class Type_or_left_list_string {
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
        const address = await ex.deploy("./tests/contracts/type_or_left_list_string.arl", {}, params);
        this.address = address;
    }
    async set_value(i: Array<string>, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "set_value", set_value_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_set_value_param(i: Array<string>, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "set_value", set_value_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_res(): Promise<att.Or<Array<string>, att.Nat>> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            return (x => {
                const is_left = x["0"] !== undefined;
                const value = is_left ? (x => { const res: Array<string> = []; for (let i = 0; i < x.length; i++) {
                    res.push((x => { return x; })(x[i]));
                } return res; })(x["0"]) : (x => { return new att.Nat(x); })(x["1"]);
                return new att.Or<Array<string>, att.Nat>(value, is_left);
            })(storage);
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const type_or_left_list_string = new Type_or_left_list_string();
