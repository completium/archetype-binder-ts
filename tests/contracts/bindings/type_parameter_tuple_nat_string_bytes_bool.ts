import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
const asset_add_arg_to_mich = (i: [
    att.Nat,
    string,
    att.Bytes,
    boolean
]): att.Micheline => {
    return att.pair_to_mich([i[0].to_mich(), att.string_to_mich(i[1]), i[2].to_mich(), att.bool_to_mich(i[3])]);
}
export class Type_parameter_tuple_nat_string_bytes_bool {
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
        string,
        att.Bytes,
        boolean
    ], params: Partial<ex.Parameters>) {
        const address = await ex.deploy("./tests/contracts/type_parameter_tuple_nat_string_bytes_bool.arl", {
            res: att.pair_to_mich([res[0].to_mich(), att.string_to_mich(res[1]), res[2].to_mich(), att.bool_to_mich(res[3])])
        }, params);
        this.address = address;
    }
    async asset_add(i: [
        att.Nat,
        string,
        att.Bytes,
        boolean
    ], params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "asset_add", asset_add_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_asset_add_param(i: [
        att.Nat,
        string,
        att.Bytes,
        boolean
    ], params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "asset_add", asset_add_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_res(): Promise<[
        att.Nat,
        string,
        att.Bytes,
        boolean
    ]> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            return [(x => { return new att.Nat(x); })(storage[Object.keys(storage)[0]]), (x => { return x; })(storage[Object.keys(storage)[1]]), (x => { return new att.Bytes(x); })(storage[Object.keys(storage)[2]]), (x => { return x.prim ? (x.prim == "True" ? true : false) : x; })(storage[Object.keys(storage)[3]])];
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const type_parameter_tuple_nat_string_bytes_bool = new Type_parameter_tuple_nat_string_bytes_bool();
