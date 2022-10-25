import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
const set_value_arg_to_mich = (i: Array<[
    att.Nat,
    string
]>): att.Micheline => {
    return att.list_to_mich(i, x => {
        return att.pair_to_mich([x[0].to_mich(), att.string_to_mich(x[1])]);
    });
}
export class Type_list_tuple_nat_string {
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
        const res = await ex.deploy("./tests/contracts/type_list_tuple_nat_string.arl", {}, params);
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
    async get_res(): Promise<Array<[
        att.Nat,
        string
    ]>> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            const res: Array<[
                att.Nat,
                string
            ]> = [];
            for (let i = 0; i < storage.length; i++) {
                res.push((x => { return [(x => { return new att.Nat(x); })(x[Object.keys(x)[0]]), (x => { return x; })(x[Object.keys(x)[1]])]; })(storage[i]));
            }
            return res;
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const type_list_tuple_nat_string = new Type_list_tuple_nat_string();
