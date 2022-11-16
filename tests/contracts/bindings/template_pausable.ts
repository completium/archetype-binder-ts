import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
const pause_arg_to_mich = (): att.Micheline => {
    return att.unit_mich;
}
const unpause_arg_to_mich = (): att.Micheline => {
    return att.unit_mich;
}
export class Template_pausable {
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
        const address = (await ex.deploy("./tests/contracts/template_pausable.arl", {}, params)).address;
        this.address = address;
    }
    async pause(params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "pause", pause_arg_to_mich(), params);
        }
        throw new Error("Contract not initialised");
    }
    async unpause(params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "unpause", unpause_arg_to_mich(), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_pause_param(params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "pause", pause_arg_to_mich(), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_unpause_param(params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "unpause", unpause_arg_to_mich(), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_paused(): Promise<boolean> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.mich_to_bool(storage);
        }
        throw new Error("Contract not initialised");
    }
    errors = {
        pausable_r2: att.string_to_mich("\"CONTRACT_NOT_PAUSED\""),
        pausable_r1: att.pair_to_mich([att.string_to_mich("\"INVALID_CONDITION\""), att.string_to_mich("\"pausable_r1\"")]),
        CONTRACT_PAUSED: att.string_to_mich("\"CONTRACT_PAUSED\"")
    };
}
export const template_pausable = new Template_pausable();
