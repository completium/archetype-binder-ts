import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
const view_get_value_arg_to_mich = (i: att.Address): att.Micheline => {
    return i.to_mich();
}
export class Type_view_address {
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
        const address = (await ex.deploy("./tests/contracts/type_view_address.arl", {}, params)).address;
        this.address = address;
    }
    async view_get_value(i: att.Address, params: Partial<ex.Parameters>): Promise<att.Address> {
        if (this.address != undefined) {
            const mich = await ex.exec_view(this.get_address(), "get_value", view_get_value_arg_to_mich(i), params);
            return new att.Address(mich.value);
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const type_view_address = new Type_view_address();
