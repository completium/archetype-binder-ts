import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
export class Sample_tuple_tuple_rational {
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
        const address = (await ex.deploy("./tests/contracts/sample_tuple_tuple_rational.arl", {}, params)).address;
        this.address = address;
    }
    async get_v(): Promise<[
        att.Nat,
        [
            string,
            att.Rational
        ]
    ]> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return (p => {
                const p0 = (p as att.Mpair);
                return [att.mich_to_nat(p0.args[0]), (p => {
                        const p0 = (p as att.Mpair);
                        return [att.mich_to_string(p0.args[0]), att.mich_to_rational(p0.args[1])];
                    })(p0.args[1])];
            })(storage);
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const sample_tuple_tuple_rational = new Sample_tuple_tuple_rational();
