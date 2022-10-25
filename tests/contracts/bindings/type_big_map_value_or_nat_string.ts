import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
const set_value_arg_to_mich = (i: att.Or<att.Nat, att.Nat>): att.Micheline => {
    return i.to_mich((x => { return x.to_mich(); }), (x => { return x.to_mich(); }));
}
export class Type_big_map_value_or_nat_string {
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
        const res = await ex.deploy("./tests/contracts/type_big_map_value_or_nat_string.arl", {}, params);
        this.address = res.address;
    }
    async set_value(i: att.Or<att.Nat, att.Nat>, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "set_value", set_value_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_set_value_param(i: att.Or<att.Nat, att.Nat>, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "set_value", set_value_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_res_value(key: att.Nat): Promise<att.Or<att.Nat, att.Nat> | undefined> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            const data = await ex.get_big_map_value(BigInt(storage), key.to_mich(), att.prim_annot_to_mich_type("nat", []), att.or_to_mich_type(att.prim_annot_to_mich_type("nat", []), att.prim_annot_to_mich_type("nat", []), [])), collapsed = true;
            if (data != undefined) {
                return (x => {
                    const is_left = x["0"] !== undefined;
                    const value = is_left ? (x => { return new att.Nat(x); })(x["0"]) : (x => { return new att.Nat(x); })(x["1"]);
                    return new att.Or<att.Nat, att.Nat>(value, is_left);
                })(data);
            }
            else {
                return undefined;
            }
        }
        throw new Error("Contract not initialised");
    }
    async has_res_value(key: att.Nat): Promise<boolean> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            const data = await ex.get_big_map_value(BigInt(storage), key.to_mich(), att.prim_annot_to_mich_type("nat", []), att.or_to_mich_type(att.prim_annot_to_mich_type("nat", []), att.prim_annot_to_mich_type("nat", []), [])), collapsed = true;
            if (data != undefined) {
                return true;
            }
            else {
                return false;
            }
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const type_big_map_value_or_nat_string = new Type_big_map_value_or_nat_string();
