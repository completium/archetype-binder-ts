import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
const get_value_arg_to_mich = (i: att.Chest): att.Micheline => {
    return i.to_mich();
}
export const deploy_get_value_callback = async (): Promise<string> => {
    return await ex.deploy_callback("get_value", att.prim_annot_to_mich_type("chest", []));
};
export class Type_getter_chest {
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
        const address = await ex.deploy("./tests/contracts/type_getter_chest.arl", {}, params);
        this.address = address;
        this.get_value_callback_address = await deploy_get_value_callback();
    }
    async get_value(i: att.Chest, params: Partial<ex.Parameters>): Promise<att.Chest> {
        if (this.address != undefined) {
            if (this.get_value_callback_address != undefined) {
                const entrypoint = new att.Entrypoint(new att.Address(this.get_value_callback_address), "callback");
                await ex.call(this.address, "get_value", att.getter_args_to_mich(get_value_arg_to_mich(i), entrypoint), params);
                return await ex.get_callback_value<att.Chest>(this.get_value_callback_address, x => { return new att.Chest(x); });
            }
        }
        throw new Error("Contract not initialised");
    }
    async get_res(): Promise<att.Chest> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return new att.Chest(storage);
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const type_getter_chest = new Type_getter_chest();
