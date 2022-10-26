import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
export const storage_type: att.MichelineType = { prim: "address", annots: [] };
const collect_arg_to_mich = (requestedAmount: att.Tez): att.Micheline => {
    return requestedAmount.to_mich();
}
const donate_arg_to_mich = (): att.Micheline => {
    return att.unit_mich;
}
export class Training_charity {
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
    async deploy(owner: att.Address, params: Partial<ex.Parameters>) {
        const address = (await ex.deploy("./tests/contracts/training_charity.arl", {
            owner: owner.to_mich()
        }, params)).address;
        this.address = address;
    }
    async collect(requestedAmount: att.Tez, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "collect", collect_arg_to_mich(requestedAmount), params);
        }
        throw new Error("Contract not initialised");
    }
    async donate(params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "donate", donate_arg_to_mich(), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_collect_param(requestedAmount: att.Tez, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "collect", collect_arg_to_mich(requestedAmount), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_donate_param(params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "donate", donate_arg_to_mich(), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_owner(): Promise<att.Address> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.mich_to_address(storage);
        }
        throw new Error("Contract not initialised");
    }
    errors = {
        r1: att.pair_to_mich([att.string_to_mich("\"INVALID_CONDITION\""), att.string_to_mich("\"r1\"")]),
        INVALID_CALLER: att.string_to_mich("\"INVALID_CALLER\"")
    };
}
export const training_charity = new Training_charity();
