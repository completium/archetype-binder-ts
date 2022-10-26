import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
export const storage_type: att.MichelineType = { prim: "unit", annots: [] };
const asset_add_arg_to_mich = (i: att.Unit): att.Micheline => {
    return att.unit_to_mich();
}
export class Type_parameter_unit {
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
    async deploy(res: att.Unit, params: Partial<ex.Parameters>) {
        const address = (await ex.deploy("./tests/contracts/type_parameter_unit.arl", {
            res: att.unit_to_mich()
        }, params)).address;
        this.address = address;
    }
    async asset_add(i: att.Unit, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "asset_add", asset_add_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_asset_add_param(i: att.Unit, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "asset_add", asset_add_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_res(): Promise<att.Unit> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.unit_to_mich();
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const type_parameter_unit = new Type_parameter_unit();
