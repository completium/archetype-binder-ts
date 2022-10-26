import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
const incrementBoth_arg_to_mich = (inc1: att.Nat, inc2: att.Nat): att.Micheline => {
    return att.pair_to_mich([
        inc1.to_mich(),
        inc2.to_mich()
    ]);
}
export class Training_counter_two_numbers {
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
        const address = (await ex.deploy("./tests/contracts/training_counter_two_numbers.arl", {}, params)).address;
        this.address = address;
    }
    async incrementBoth(inc1: att.Nat, inc2: att.Nat, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "incrementBoth", incrementBoth_arg_to_mich(inc1, inc2), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_incrementBoth_param(inc1: att.Nat, inc2: att.Nat, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "incrementBoth", incrementBoth_arg_to_mich(inc1, inc2), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_v1(): Promise<att.Nat> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.mich_to_nat(storage.args[0]);
        }
        throw new Error("Contract not initialised");
    }
    async get_v2(): Promise<att.Nat> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.mich_to_nat(storage.args[1]);
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const training_counter_two_numbers = new Training_counter_two_numbers();
