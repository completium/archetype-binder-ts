import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
const set_value_arg_to_mich = (i: att.Option<[
    att.Nat,
    string,
    att.Bytes,
    boolean
]>): att.Micheline => {
    return i.to_mich((x => { return att.pair_to_mich([x[0].to_mich(), att.string_to_mich(x[1]), x[2].to_mich(), att.bool_to_mich(x[3])]); }));
}
export class Type_option_tuple_nat_string_bytes_bool {
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
        const address = (await ex.deploy("./tests/contracts/type_option_tuple_nat_string_bytes_bool.arl", {}, params)).address;
        this.address = address;
    }
    async set_value(i: att.Option<[
        att.Nat,
        string,
        att.Bytes,
        boolean
    ]>, params: Partial<ex.Parameters>): Promise<att.CallResult> {
        if (this.address != undefined) {
            return await ex.call(this.address, "set_value", set_value_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_set_value_param(i: att.Option<[
        att.Nat,
        string,
        att.Bytes,
        boolean
    ]>, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "set_value", set_value_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_res(): Promise<att.Option<[
        att.Nat,
        string,
        att.Bytes,
        boolean
    ]>> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.Option.from_mich(storage, x => { return (p => {
                return [att.Nat.from_mich((p as att.Mpair).args[0]), att.mich_to_string((p as att.Mpair).args[1]), att.Bytes.from_mich((p as att.Mpair).args[2]), att.mich_to_bool((p as att.Mpair).args[3])];
            })(x); });
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const type_option_tuple_nat_string_bytes_bool = new Type_option_tuple_nat_string_bytes_bool();
