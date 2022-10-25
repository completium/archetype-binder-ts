import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
export type r_record = att.Nat;
export const r_record_mich_type: att.MichelineType = att.prim_annot_to_mich_type("nat", []);
const set_value_arg_to_mich = (i: Array<r_record>): att.Micheline => {
    return att.list_to_mich(i, x => {
        return x.to_mich();
    });
}
export class Type_list_record_1_field {
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
        const res = await ex.deploy("./tests/contracts/type_list_record_1_field.arl", {}, params);
        this.address = res.address;
    }
    async set_value(i: Array<r_record>, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "set_value", set_value_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_set_value_param(i: Array<r_record>, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "set_value", set_value_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_res(): Promise<Array<r_record>> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            const res: Array<r_record> = [];
            for (let i = 0; i < storage.length; i++) {
                res.push((x => { return (x => { return new att.Nat(x); })(x); })(storage[i]));
            }
            return res;
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const type_list_record_1_field = new Type_list_record_1_field();
