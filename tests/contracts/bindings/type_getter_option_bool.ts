import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
const get_value_arg_to_mich = (i: att.Option<boolean>): att.Micheline => {
    return i.to_mich((x => { return att.bool_to_mich(x); }));
}
export const deploy_get_value_callback = async (): Promise<string> => {
    return await ex.deploy_callback("get_value", att.option_annot_to_mich_type(att.prim_annot_to_mich_type("bool", []), []));
};
export class Type_getter_option_bool {
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
        const address = await ex.deploy("./tests/contracts/type_getter_option_bool.arl", {}, params);
        this.address = address;
        this.get_value_callback_address = await deploy_get_value_callback();
    }
    async get_value(i: att.Option<boolean>, params: Partial<ex.Parameters>): Promise<att.Option<boolean>> {
        if (this.address != undefined) {
            if (this.get_value_callback_address != undefined) {
                const entrypoint = new att.Entrypoint(new att.Address(this.get_value_callback_address), "callback");
                await ex.call(this.address, "get_value", att.getter_args_to_mich(get_value_arg_to_mich(i), entrypoint), params);
                return await ex.get_callback_value<att.Option<boolean>>(this.get_value_callback_address, x => { return new att.Option<boolean>(x == null ? null : (x => { return x; })(x)); });
            }
        }
        throw new Error("Contract not initialised");
    }
    async get_res(): Promise<att.Option<boolean>> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            return new att.Option<boolean>(storage == null ? null : (x => { return x; })(storage));
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const type_getter_option_bool = new Type_getter_option_bool();
