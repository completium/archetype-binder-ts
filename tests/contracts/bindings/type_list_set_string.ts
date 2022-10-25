import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
const set_value_arg_to_mich = (i: Array<Array<string>>): att.Micheline => {
    return att.list_to_mich(i, x => {
        return att.list_to_mich(x, x => {
            return att.string_to_mich(x);
        });
    });
}
export class Type_list_set_string {
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
        const res = await ex.deploy("./tests/contracts/type_list_set_string.arl", {}, params);
        this.address = res.address;
    }
    async set_value(i: Array<Array<string>>, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "set_value", set_value_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_set_value_param(i: Array<Array<string>>, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "set_value", set_value_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_res(): Promise<Array<Array<string>>> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            const res: Array<Array<string>> = [];
            for (let i = 0; i < storage.length; i++) {
                res.push((x => { const res: Array<string> = []; for (let i = 0; i < x.length; i++) {
                    res.push((x => { return x; })(x[i]));
                } return res; })(storage[i]));
            }
            return res;
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const type_list_set_string = new Type_list_set_string();
