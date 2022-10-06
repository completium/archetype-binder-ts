import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
const view_get_value_arg_to_mich = (): att.Micheline => {
    return att.unit_mich;
}
export class Type_view_option_nat {
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
        const address = await ex.deploy("./tests/contracts/type_view_option_nat.arl", {}, params);
        this.address = address;
    }
    async view_get_value(params: Partial<ex.Parameters>): Promise<att.Option<att.Nat>> {
        if (this.address != undefined) {
            const mich = await ex.exec_view(this.get_address(), "get_value", view_get_value_arg_to_mich(), params);
            return new att.Option<att.Nat>(mich == null ? null : (x => { return new att.Nat(x); })(mich));
        }
        throw new Error("Contract not initialised");
    }
    async get_res(): Promise<att.Option<att.Nat>> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            return new att.Option<att.Nat>(storage == null ? null : (x => { return new att.Nat(x); })(storage));
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const type_view_option_nat = new Type_view_option_nat();