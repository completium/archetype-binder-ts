import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
const set_value_arg_to_mich = (i: Array<boolean>): att.Micheline => {
    return att.list_to_mich(i, x => {
        return att.bool_to_mich(x);
    });
}
export class Type_tuple_list_bool {
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
        const address = (await ex.deploy("./tests/contracts/type_tuple_list_bool.arl", {}, params)).address;
        this.address = address;
    }
    async set_value(i: Array<boolean>, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "set_value", set_value_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_set_value_param(i: Array<boolean>, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "set_value", set_value_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_res(): Promise<[
        att.Nat,
        Array<boolean>,
        string
    ]> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            return [(x => { return new att.Nat(x); })(storage[Object.keys(storage)[0]]), (x => { const res: Array<boolean> = []; for (let i = 0; i < x.length; i++) {
                    res.push((x => { return x.prim ? (x.prim == "True" ? true : false) : x; })(x[i]));
                } return res; })(storage[Object.keys(storage)[1]]), (x => { return x; })(storage[Object.keys(storage)[2]])];
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const type_tuple_list_bool = new Type_tuple_list_bool();
