import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
const set_value_arg_to_mich = (i: Array<[
    att.Nat,
    string
]>): att.Micheline => {
    return att.list_to_mich(i, x => {
        const x_key = x[0];
        const x_value = x[1];
        return att.elt_to_mich(x_key.to_mich(), att.string_to_mich(x_value));
    });
}
export class Type_or_left_map_nat_string {
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
        const res = await ex.deploy("./tests/contracts/type_or_left_map_nat_string.arl", {}, params);
        this.address = res.address;
    }
    async set_value(i: Array<[
        att.Nat,
        string
    ]>, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "set_value", set_value_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_set_value_param(i: Array<[
        att.Nat,
        string
    ]>, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "set_value", set_value_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_res(): Promise<att.Or<Array<[
        att.Nat,
        string
    ]>, Array<[
        att.Nat,
        string
    ]>>> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            return (x => {
                const is_left = x["0"] !== undefined;
                const value = is_left ? (x => { let res: Array<[
                    att.Nat,
                    string
                ]> = []; for (let e of x.entries()) {
                    res.push([(x => { return new att.Nat(x); })(e[0]), (x => { return x; })(e[1])]);
                } return res; })(x["0"]) : (x => { let res: Array<[
                    att.Nat,
                    string
                ]> = []; for (let e of x.entries()) {
                    res.push([(x => { return new att.Nat(x); })(e[0]), (x => { return x; })(e[1])]);
                } return res; })(x["1"]);
                return new att.Or<Array<[
                    att.Nat,
                    string
                ]>, Array<[
                    att.Nat,
                    string
                ]>>(value, is_left);
            })(storage);
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const type_or_left_map_nat_string = new Type_or_left_map_nat_string();
