import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
const increment_arg_to_mich = (quantity: att.Nat): att.Micheline => {
    return quantity.to_mich();
}
export class Training_addnumber {
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
        const address = (await ex.deploy("./tests/contracts/training_addnumber.arl", {}, params)).address;
        this.address = address;
    }
    async increment(quantity: att.Nat, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "increment", increment_arg_to_mich(quantity), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_increment_param(quantity: att.Nat, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "increment", increment_arg_to_mich(quantity), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_count(): Promise<att.Nat> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            return new att.Nat(storage);
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const training_addnumber = new Training_addnumber();
