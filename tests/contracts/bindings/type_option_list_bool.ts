import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
export const storage_type: att.MichelineType = { prim: "option", args: [{ prim: "list", args: [{ prim: "bool", annots: [] }], annots: [] }], annots: [] };
const set_value_arg_to_mich = (i: att.Option<Array<boolean>>): att.Micheline => {
    return i.to_mich((x => { return att.list_to_mich(x, x => {
        return att.bool_to_mich(x);
    }); }));
}
export class Type_option_list_bool {
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
        const address = (await ex.deploy("./tests/contracts/type_option_list_bool.arl", {}, params)).address;
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
            const storage = await ex.get_raw_storage(this.address);
            return att.mich_to_option(storage, x => { return att.mich_to_list(x, x => { return att.mich_to_bool(x); }); });
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const type_option_list_bool = new Type_option_list_bool();
