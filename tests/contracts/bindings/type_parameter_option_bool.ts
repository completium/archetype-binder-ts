import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
const asset_add_arg_to_mich = (i: att.Option<boolean>): att.Micheline => {
    return i.to_mich((x => { return att.bool_to_mich(x); }));
}
export class Type_parameter_option_bool {
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
    async deploy(res: att.Option<boolean>, params: Partial<ex.Parameters>) {
        const address = await ex.deploy("./tests/contracts/type_parameter_option_bool.arl", {
            res: res.to_mich((x => { return att.bool_to_mich(x); }))
        }, params);
        this.address = address;
    }
    async asset_add(i: att.Option<boolean>, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "asset_add", asset_add_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_asset_add_param(i: att.Option<boolean>, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "asset_add", asset_add_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_res(): Promise<att.Option<boolean>> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.mich_to_option(storage, x => { return att.mich_to_bool(x); });
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const type_parameter_option_bool = new Type_parameter_option_bool();
