import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
export const storage_type: att.MichelineType = { prim: "pair", args: [{ prim: "nat", annots: [] }, { prim: "pair", args: [{ prim: "list", args: [{ prim: "nat", annots: [] }], annots: [] }, { prim: "string", annots: [] }], annots: [] }], annots: [] };
const set_value_arg_to_mich = (i: Array<att.Nat>): att.Micheline => {
    return att.list_to_mich(i, x => {
        return x.to_mich();
    });
}
export class Type_tuple_list_nat {
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
        const address = (await ex.deploy("./tests/contracts/type_tuple_list_nat.arl", {}, params)).address;
        this.address = address;
    }
    async set_value(i: Array<att.Nat>, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "set_value", set_value_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_set_value_param(i: Array<att.Nat>, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "set_value", set_value_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_res(): Promise<[
        att.Nat,
        Array<att.Nat>,
        string
    ]> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return (p => {
                const p0 = (p as att.Mpair);
                const p1 = (p0.args[1] as att.Mpair);
                return [att.mich_to_nat(p0.args[0]), att.mich_to_list(p0.args[1], x => { return att.mich_to_nat(x); }), att.mich_to_string(p1.args[0])];
            })(storage);
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const type_tuple_list_nat = new Type_tuple_list_nat();
