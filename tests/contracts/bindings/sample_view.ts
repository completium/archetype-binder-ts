import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
const view_my_view_arg_to_mich = (n: att.Nat): att.Micheline => {
    return n.to_mich();
}
export class Sample_view {
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
        const address = (await ex.deploy("./tests/contracts/sample_view.arl", {}, params)).address;
        this.address = address;
    }
    async view_my_view(n: att.Nat, params: Partial<ex.Parameters>): Promise<att.Nat | undefined> {
        if (this.address != undefined) {
            const mich = await ex.exec_view(this.get_address(), "my_view", view_my_view_arg_to_mich(n), params);
            return mich.value ? att.Nat.from_mich(mich.value) : undefined;
        }
        throw new Error("Contract not initialised");
    }
    errors = {
        ODD: att.string_to_mich("\"odd\"")
    };
}
export const sample_view = new Sample_view();
