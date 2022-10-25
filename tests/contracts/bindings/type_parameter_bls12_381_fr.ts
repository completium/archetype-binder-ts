import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
const asset_add_arg_to_mich = (i: att.Bls12_381_fr): att.Micheline => {
    return i.to_mich();
}
export class Type_parameter_bls12_381_fr {
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
    async deploy(res: att.Bls12_381_fr, params: Partial<ex.Parameters>) {
        const res = await ex.deploy("./tests/contracts/type_parameter_bls12_381_fr.arl", {
            res: res.to_mich()
        }, params);
        this.address = res.address;
    }
    async asset_add(i: att.Bls12_381_fr, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "asset_add", asset_add_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_asset_add_param(i: att.Bls12_381_fr, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "asset_add", asset_add_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_res(): Promise<att.Bls12_381_fr> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            return new att.Bls12_381_fr(storage);
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const type_parameter_bls12_381_fr = new Type_parameter_bls12_381_fr();
