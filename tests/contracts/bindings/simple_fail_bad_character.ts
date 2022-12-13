import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
const f_arg_to_mich = (): att.Micheline => {
    return att.unit_mich;
}
export class Simple_fail_bad_character {
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
        const address = (await ex.deploy("./tests/contracts/simple_fail_bad_character.arl", {}, params)).address;
        this.address = address;
    }
    async f(params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "f", f_arg_to_mich(), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_f_param(params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "f", f_arg_to_mich(), params);
        }
        throw new Error("Contract not initialised");
    }
    errors = {
        DON_T_FAIL_: att.string_to_mich("\"don't fail!\"")
    };
}
export const simple_fail_bad_character = new Simple_fail_bad_character();