import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
export const storage_type: att.MichelineType = { prim: "nat", annots: [] };
const replace_arg_to_mich = (v: att.Nat): att.Micheline => {
    return v.to_mich();
}
const double_arg_to_mich = (): att.Micheline => {
    return att.unit_mich;
}
export class Training_storevalue {
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
    async deploy(counter: att.Nat, params: Partial<ex.Parameters>) {
        const address = (await ex.deploy("./tests/contracts/training_storevalue.arl", {
            counter: counter.to_mich()
        }, params)).address;
        this.address = address;
    }
    async replace(v: att.Nat, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "replace", replace_arg_to_mich(v), params);
        }
        throw new Error("Contract not initialised");
    }
    async double(params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "double", double_arg_to_mich(), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_replace_param(v: att.Nat, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "replace", replace_arg_to_mich(v), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_double_param(params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "double", double_arg_to_mich(), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_counter(): Promise<att.Nat> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.mich_to_nat(storage);
        }
        throw new Error("Contract not initialised");
    }
    errors = {
        r1: att.pair_to_mich([att.string_to_mich("\"INVALID_CONDITION\""), att.string_to_mich("\"r1\"")])
    };
}
export const training_storevalue = new Training_storevalue();
