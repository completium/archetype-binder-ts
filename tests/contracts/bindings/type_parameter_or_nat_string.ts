import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
const asset_add_arg_to_mich = (i: att.Or<att.Nat, string>): att.Micheline => {
    return i.to_mich();
}
export class Type_parameter_or_nat_string {
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
    async deploy(res: att.Or<att.Nat, string>, params: Partial<ex.Parameters>) {
        const address = await ex.deploy("./tests/contracts/type_parameter_or_nat_string.arl", {
            res: res.to_mich()
        }, params);
        this.address = address;
    }
    async asset_add(i: att.Or<att.Nat, string>, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "asset_add", asset_add_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_asset_add_param(i: att.Or<att.Nat, string>, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "asset_add", asset_add_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_res(): Promise<att.Or<att.Nat, string>> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            return (x => {
                const is_left = x["0"] !== undefined;
                const value = is_left ? (x => { return new att.Nat(x); })(x["0"]) : (x => { return x; })(x["1"]);
                return new att.Or<att.Nat, string>(value, is_left);
            })(storage);
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const type_parameter_or_nat_string = new Type_parameter_or_nat_string();
