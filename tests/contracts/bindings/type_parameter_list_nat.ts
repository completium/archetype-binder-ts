import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
const asset_add_arg_to_mich = (i: Array<att.Nat>): att.Micheline => {
    return att.list_to_mich(i, x => {
        return x.to_mich();
    });
}
export class Type_parameter_list_nat {
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
    async deploy(res: Array<att.Nat>, params: Partial<ex.Parameters>) {
        const address = await ex.deploy("./tests/contracts/type_parameter_list_nat.arl", {
            res: att.list_to_mich(res, x => {
                return x.to_mich();
            })
        }, params);
        this.address = address;
    }
    async asset_add(i: Array<att.Nat>, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "asset_add", asset_add_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_asset_add_param(i: Array<att.Nat>, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "asset_add", asset_add_arg_to_mich(i), params);
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
export const type_parameter_list_nat = new Type_parameter_list_nat();
