import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
export const storage_type: att.MichelineType = { prim: "nat", annots: [] };
const increment_arg_to_mich = (): att.Micheline => {
    return att.unit_mich;
}
export class Training_counter {
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
        const address = (await ex.deploy("./tests/contracts/training_counter.arl", {}, params)).address;
        this.address = address;
    }
    async increment(params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "increment", increment_arg_to_mich(), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_increment_param(params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "increment", increment_arg_to_mich(), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_count(): Promise<att.Nat> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.mich_to_nat(storage);
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const training_counter = new Training_counter();
