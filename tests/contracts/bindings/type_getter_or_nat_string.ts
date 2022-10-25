import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
const get_value_arg_to_mich = (i: att.Or<att.Nat, att.Nat>): att.Micheline => {
    return i.to_mich((x => { return x.to_mich(); }), (x => { return x.to_mich(); }));
}
export const deploy_get_value_callback = async (): Promise<att.DeployResult> => {
    return await ex.deploy_callback("get_value", att.or_to_mich_type(att.prim_annot_to_mich_type("nat", []), att.prim_annot_to_mich_type("string", []), []));
};
export class Type_getter_or_nat_string {
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
        const res = await ex.deploy("./tests/contracts/type_getter_or_nat_string.arl", {}, params);
        this.address = res.address;
        this.get_value_callback_address = (await deploy_get_value_callback()).address;
    }
    async get_value(i: att.Or<att.Nat, att.Nat>, params: Partial<ex.Parameters>): Promise<att.Or<att.Nat, att.Nat>> {
        if (this.address != undefined) {
            if (this.get_value_callback_address != undefined) {
                const entrypoint = new att.Entrypoint(new att.Address(this.get_value_callback_address), "callback");
                await ex.call(this.address, "get_value", att.getter_args_to_mich(get_value_arg_to_mich(i), entrypoint), params);
                return await ex.get_callback_value<att.Or<att.Nat, att.Nat>>(this.get_value_callback_address, x => { return (x => {
                    const is_left = x["0"] !== undefined;
                    const value = is_left ? (x => { return new att.Nat(x); })(x["0"]) : (x => { return new att.Nat(x); })(x["1"]);
                    return new att.Or<att.Nat, att.Nat>(value, is_left);
                })(x); });
            }
        }
        throw new Error("Contract not initialised");
    }
    async get_res(): Promise<att.Or<att.Nat, att.Nat>> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            return (x => {
                const is_left = x["0"] !== undefined;
                const value = is_left ? (x => { return new att.Nat(x); })(x["0"]) : (x => { return new att.Nat(x); })(x["1"]);
                return new att.Or<att.Nat, att.Nat>(value, is_left);
            })(storage);
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const type_getter_or_nat_string = new Type_getter_or_nat_string();
