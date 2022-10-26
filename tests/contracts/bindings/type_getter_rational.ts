import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
export const storage_type: att.MichelineType = { prim: "pair", args: [{ prim: "int", annots: [] }, { prim: "nat", annots: [] }], annots: [] };
const get_value_arg_to_mich = (i: att.Rational): att.Micheline => {
    return i.to_mich();
}
export const deploy_get_value_callback = async (): Promise<att.DeployResult> => {
    return await ex.deploy_callback("get_value", att.pair_array_to_mich_type([
        att.prim_annot_to_mich_type("int", []),
        att.prim_annot_to_mich_type("nat", [])
    ], []));
};
export class Type_getter_rational {
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
        const address = (await ex.deploy("./tests/contracts/type_getter_rational.arl", {}, params)).address;
        this.address = address;
        this.get_value_callback_address = (await deploy_get_value_callback()).address;
    }
    async get_value(i: att.Rational, params: Partial<ex.Parameters>): Promise<att.Rational> {
        if (this.address != undefined) {
            if (this.get_value_callback_address != undefined) {
                const entrypoint = new att.Entrypoint(new att.Address(this.get_value_callback_address), "callback");
                await ex.call(this.address, "get_value", att.getter_args_to_mich(get_value_arg_to_mich(i), entrypoint), params);
                return await ex.get_callback_value<att.Rational>(this.get_value_callback_address, x => { return att.mich_to_rational(x); });
            }
        }
        throw new Error("Contract not initialised");
    }
    async get_res(): Promise<att.Rational> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.mich_to_rational(storage);
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const type_getter_rational = new Type_getter_rational();
