import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
export class Path_storage {
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
        const address = (await ex.deploy("./tests/contracts/path_storage.arl", {}, params)).address;
        this.address = address;
    }
    async get_a(): Promise<att.Int> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            const storage0 = (storage as att.Mpair)
            return att.mich_to_int(storage0.args[0]);
        }
        throw new Error("Contract not initialised");
    }
    async get_b(): Promise<[
        att.Int,
        att.Int
    ]> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            const storage0 = (storage as att.Mpair)
            return (p => {
                const p0 = (p as att.Mpair);
                return [att.mich_to_int(p0.args[0]), att.mich_to_int(p0.args[1])];
            })(storage0.args[1]);
        }
        throw new Error("Contract not initialised");
    }
    async get_c(): Promise<[
        att.Int,
        att.Int,
        att.Int
    ]> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            const storage0 = (storage as att.Mpair)
            return (p => {
                const p0 = (p as att.Mpair);
                return [att.mich_to_int(p0.args[0]), att.mich_to_int(p0.args[1]), att.mich_to_int(p0.args[2])];
            })(att.pair_to_mich(storage0.args.slice(2,5)));
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const path_storage = new Path_storage();
