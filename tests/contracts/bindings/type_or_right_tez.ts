import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
const set_value_arg_to_mich = (i: att.Tez): att.Micheline => {
    return i.to_mich();
}
export class Type_or_right_tez {
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
        const address = (await ex.deploy("./tests/contracts/type_or_right_tez.arl", {}, params)).address;
        this.address = address;
    }
    async set_value(i: att.Tez, params: Partial<ex.Parameters>): Promise<att.CallResult> {
        if (this.address != undefined) {
            return await ex.call(this.address, "set_value", set_value_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_set_value_param(i: att.Tez, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "set_value", set_value_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_res(): Promise<att.Or<att.Nat, att.Tez>> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.Or.from_mich(storage, x => { return att.Nat.from_mich(x); }, x => { return att.Tez.from_mich(x); });
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const type_or_right_tez = new Type_or_right_tez();
