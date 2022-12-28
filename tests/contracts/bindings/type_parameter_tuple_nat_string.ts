import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
const asset_add_arg_to_mich = (i: [
    att.Nat,
    string
]): att.Micheline => {
    return att.pair_to_mich([i[0].to_mich(), att.string_to_mich(i[1])]);
}
export class Type_parameter_tuple_nat_string {
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
    async deploy(res: [
        att.Nat,
        string
    ], params: Partial<ex.Parameters>) {
        const address = (await ex.deploy("./tests/contracts/type_parameter_tuple_nat_string.arl", {
            res: att.pair_to_mich([res[0].to_mich(), att.string_to_mich(res[1])])
        }, params)).address;
        this.address = address;
    }
    async asset_add(i: [
        att.Nat,
        string
    ], params: Partial<ex.Parameters>): Promise<att.CallResult> {
        if (this.address != undefined) {
            return await ex.call(this.address, "asset_add", asset_add_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_asset_add_param(i: [
        att.Nat,
        string
    ], params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "asset_add", asset_add_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_res(): Promise<[
        att.Nat,
        string
    ]> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return (p => {
                return [att.mich_to_nat((p as att.Mpair).args[0]), att.mich_to_string((p as att.Mpair).args[1])];
            })(storage);
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const type_parameter_tuple_nat_string = new Type_parameter_tuple_nat_string();
