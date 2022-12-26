import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
const exec_arg_to_mich = (ik: att.Int, iv: att.Bytes): att.Micheline => {
    return att.pair_to_mich([
        ik.to_mich(),
        iv.to_mich()
    ]);
}
export class Sample_big_map {
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
        const address = (await ex.deploy("./tests/contracts/sample_big_map.arl", {}, params)).address;
        this.address = address;
    }
    async exec(ik: att.Int, iv: att.Bytes, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "exec", exec_arg_to_mich(ik, iv), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_exec_param(ik: att.Int, iv: att.Bytes, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "exec", exec_arg_to_mich(ik, iv), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_v_value(key: att.Int): Promise<att.Bytes | undefined> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            const data = await ex.get_big_map_value(BigInt(att.mich_to_int(storage).toString()), key.to_mich(), att.prim_annot_to_mich_type("int", []));
            if (data != undefined) {
                return att.mich_to_bytes(data);
            }
            else {
                return undefined;
            }
        }
        throw new Error("Contract not initialised");
    }
    async has_v_value(key: att.Int): Promise<boolean> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            const data = await ex.get_big_map_value(BigInt(att.mich_to_int(storage).toString()), key.to_mich(), att.prim_annot_to_mich_type("int", []));
            if (data != undefined) {
                return true;
            }
            else {
                return false;
            }
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const sample_big_map = new Sample_big_map();
