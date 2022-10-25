import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
const get_value_arg_to_mich = (i: Array<string>): att.Micheline => {
    return att.list_to_mich(i, x => {
        return att.string_to_mich(x);
    });
}
export const deploy_get_value_callback = async (): Promise<att.DeployResult> => {
    return await ex.deploy_callback("get_value", att.list_annot_to_mich_type(att.prim_annot_to_mich_type("string", []), []));
};
export class Type_getter_list_string {
    address: string | undefined;
    constructor(address: string | undefined = undefined) {
        this.address = address;
    }
    get_value_callback_address: string | undefined;
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
        const address = (await ex.deploy("./tests/contracts/type_getter_list_string.arl", {}, params)).address;
        this.address = address;
        this.get_value_callback_address = (await deploy_get_value_callback()).address;
    }
    async get_value(i: Array<string>, params: Partial<ex.Parameters>): Promise<Array<string>> {
        if (this.address != undefined) {
            if (this.get_value_callback_address != undefined) {
                const entrypoint = new att.Entrypoint(new att.Address(this.get_value_callback_address), "callback");
                await ex.call(this.address, "get_value", att.getter_args_to_mich(get_value_arg_to_mich(i), entrypoint), params);
                return await ex.get_callback_value<Array<string>>(this.get_value_callback_address, x => { const res: Array<string> = []; for (let i = 0; i < x.length; i++) {
                    res.push((x => { return x; })(x[i]));
                } return res; });
            }
        }
        throw new Error("Contract not initialised");
    }
    async get_res(): Promise<Array<string>> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            const res: Array<string> = [];
            for (let i = 0; i < storage.length; i++) {
                res.push((x => { return x; })(storage[i]));
            }
            return res;
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const type_getter_list_string = new Type_getter_list_string();
