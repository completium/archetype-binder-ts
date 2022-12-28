import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
const set_value_arg_to_mich = (i: att.Option<[
    att.Nat,
    string,
    att.Bytes
]>): att.Micheline => {
    return i.to_mich((x => { return att.pair_to_mich([x[0].to_mich(), att.string_to_mich(x[1]), x[2].to_mich()]); }));
}
export class Type_option_tuple_nat_string_bytes {
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
        const address = (await ex.deploy("./tests/contracts/type_option_tuple_nat_string_bytes.arl", {}, params)).address;
        this.address = address;
    }
    async set_value(i: att.Option<[
        att.Nat,
        string,
        att.Bytes
    ]>, params: Partial<ex.Parameters>): Promise<att.CallResult> {
        if (this.address != undefined) {
            return await ex.call(this.address, "set_value", set_value_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_set_value_param(i: att.Option<[
        att.Nat,
        string,
        att.Bytes
    ]>, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "set_value", set_value_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_res(): Promise<att.Option<[
        att.Nat,
        string,
        att.Bytes
    ]>> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.mich_to_option(storage, x => { return (p => {
                return [att.mich_to_nat((p as att.Mpair).args[0]), att.mich_to_string((p as att.Mpair).args[1]), att.mich_to_bytes((p as att.Mpair).args[2])];
            })(x); });
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const type_option_tuple_nat_string_bytes = new Type_option_tuple_nat_string_bytes();
