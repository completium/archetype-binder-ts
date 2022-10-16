import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
const set_value_arg_to_mich = (i: att.Option<Array<boolean>>): att.Micheline => {
    return i.to_mich((x => { return att.list_to_mich(x, x => {
        return att.bool_to_mich(x);
    }); }));
}
export class Type_option_set_bool {
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
        const address = await ex.deploy("./tests/contracts/type_option_set_bool.arl", {}, params);
        this.address = address;
    }
    async set_value(i: att.Option<Array<boolean>>, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "set_value", set_value_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_set_value_param(i: att.Option<Array<boolean>>, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "set_value", set_value_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_res(): Promise<att.Option<Array<boolean>>> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            return new att.Option<Array<boolean>>(storage == null ? null : (x => { const res: Array<boolean> = []; for (let i = 0; i < x.length; i++) {
                res.push((x => { return x; })(x[i]));
            } return res; })(storage));
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const type_option_set_bool = new Type_option_set_bool();
