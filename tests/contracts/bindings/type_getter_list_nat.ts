import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
const get_value_arg_to_mich = (i: Array<att.Nat>): att.Micheline => {
    return att.list_to_mich(i, x => {
        return x.to_mich();
    });
}
export const deploy_get_value_callback = async (): Promise<string> => {
    return await ex.deploy_callback("get_value", att.list_annot_to_mich_type(att.prim_annot_to_mich_type("nat", []), []));
};
export class Type_getter_list_nat {
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
        const address = await ex.deploy("./tests/contracts/type_getter_list_nat.arl", {}, params);
        this.address = address;
        this.get_value_callback_address = await deploy_get_value_callback();
    }
    async get_value(i: Array<att.Nat>, params: Partial<ex.Parameters>): Promise<Array<att.Nat>> {
        if (this.address != undefined) {
            if (this.get_value_callback_address != undefined) {
                const entrypoint = new att.Entrypoint(new att.Address(this.get_value_callback_address), "callback");
                await ex.call(this.address, "get_value", att.getter_args_to_mich(get_value_arg_to_mich(i), entrypoint), params);
                return await ex.get_callback_value<Array<att.Nat>>(this.get_value_callback_address, x => { const res: Array<att.Nat> = []; for (let i = 0; i < x.length; i++) {
                    res.push((x => { return new att.Nat(x); })(x[i]));
                } return res; });
            }
        }
        throw new Error("Contract not initialised");
    }
    async get_res(): Promise<Array<att.Nat>> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            const res: Array<att.Nat> = [];
            for (let i = 0; i < storage.length; i++) {
                res.push((x => { return new att.Nat(x); })(storage[i]));
            }
            return res;
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const type_getter_list_nat = new Type_getter_list_nat();
