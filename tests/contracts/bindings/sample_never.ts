import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
export class Sample_never {
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
        const address = (await ex.deploy("./tests/contracts/sample_never.arl", {}, params)).address;
        this.address = address;
    }
    async get_res(): Promise<att.Or<att.Micheline, att.Nat>> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.Or.from_mich(storage, x => { return x; }, x => { return att.Nat.from_mich(x); });
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const sample_never = new Sample_never();
