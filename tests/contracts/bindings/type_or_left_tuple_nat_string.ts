import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
export const storage_type: att.MichelineType = { prim: "or", args: [{ prim: "pair", args: [{ prim: "nat", annots: [] }, { prim: "string", annots: [] }], annots: [] }, { prim: "nat", annots: [] }], annots: [] };
const set_value_arg_to_mich = (i: [
    att.Nat,
    string
]): att.Micheline => {
    return att.pair_to_mich([i[0].to_mich(), att.string_to_mich(i[1])]);
}
export class Type_or_left_tuple_nat_string {
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
        const address = (await ex.deploy("./tests/contracts/type_or_left_tuple_nat_string.arl", {}, params)).address;
        this.address = address;
    }
    async set_value(i: [
        att.Nat,
        string
    ], params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "set_value", set_value_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_set_value_param(i: [
        att.Nat,
        string
    ], params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "set_value", set_value_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_res(): Promise<att.Or<[
        att.Nat,
        string
    ], att.Nat>> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.mich_to_or(storage, x => { return (p => {
                const p0 = (p as att.Mpair);
                return [att.mich_to_nat(p0.args[0]), att.mich_to_string(p0.args[1])];
            })(x); }, x => { return att.mich_to_nat(x); });
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const type_or_left_tuple_nat_string = new Type_or_left_tuple_nat_string();
