import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
const set_value_arg_to_mich = (i: Date): att.Micheline => {
    return att.date_to_mich(i);
}
export class Type_big_map_key_date {
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
        const address = (await ex.deploy("./tests/contracts/type_big_map_key_date.arl", {}, params)).address;
        this.address = address;
    }
    async set_value(i: Date, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "set_value", set_value_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_set_value_param(i: Date, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "set_value", set_value_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_res_value(key: Date): Promise<att.Nat | undefined> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            const data = await ex.get_big_map_value(BigInt(storage), att.date_to_mich(key), att.prim_annot_to_mich_type("date", []), att.prim_annot_to_mich_type("nat", [])), collapsed = true;
            if (data != undefined) {
                return new att.Nat(data);
            }
            else {
                return undefined;
            }
        }
        throw new Error("Contract not initialised");
    }
    async has_res_value(key: Date): Promise<boolean> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            const data = await ex.get_big_map_value(BigInt(storage), att.date_to_mich(key), att.prim_annot_to_mich_type("date", []), att.prim_annot_to_mich_type("nat", [])), collapsed = true;
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
export const type_big_map_key_date = new Type_big_map_key_date();
