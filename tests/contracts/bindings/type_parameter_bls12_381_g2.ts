import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
const asset_add_arg_to_mich = (i: att.Bls12_381_g2): att.Micheline => {
    return i.to_mich();
}
export class Type_parameter_bls12_381_g2 {
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
    async deploy(res: att.Bls12_381_g2, params: Partial<ex.Parameters>) {
        const address = await ex.deploy("./tests/contracts/type_parameter_bls12_381_g2.arl", {
            res: res.to_mich()
        }, params);
        this.address = address;
    }
    async asset_add(i: att.Bls12_381_g2, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "asset_add", asset_add_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_asset_add_param(i: att.Bls12_381_g2, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "asset_add", asset_add_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_res(): Promise<att.Bls12_381_g2> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.mich_to_bls12_381_g2(storage);
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const type_parameter_bls12_381_g2 = new Type_parameter_bls12_381_g2();
