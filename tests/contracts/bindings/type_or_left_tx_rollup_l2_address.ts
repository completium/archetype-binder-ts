import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
const set_value_arg_to_mich = (i: att.Tx_rollup_l2_address): att.Micheline => {
    return i.to_mich();
}
export class Type_or_left_tx_rollup_l2_address {
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
        const address = (await ex.deploy("./tests/contracts/type_or_left_tx_rollup_l2_address.arl", {}, params)).address;
        this.address = address;
    }
    async set_value(i: att.Tx_rollup_l2_address, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "set_value", set_value_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_set_value_param(i: att.Tx_rollup_l2_address, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "set_value", set_value_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_res(): Promise<att.Or<att.Tx_rollup_l2_address, att.Nat>> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.mich_to_or(storage, x => { return att.mich_to_tx_rollup_l2_address(x); }, x => { return att.mich_to_nat(x); });
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const type_or_left_tx_rollup_l2_address = new Type_or_left_tx_rollup_l2_address();