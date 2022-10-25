import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
const set_value_arg_to_mich = (i: Array<[
    att.Nat,
    string
]>): att.Micheline => {
    return att.list_to_mich(i, x => {
        const x_key = x[0];
        const x_value = x[1];
        return att.elt_to_mich(x_key.to_mich(), att.string_to_mich(x_value));
    });
}
export class Type_big_map_value_map_nat_string {
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
        const res = await ex.deploy("./tests/contracts/type_big_map_value_map_nat_string.arl", {}, params);
        this.address = res.address;
    }
    async set_value(i: Array<[
        att.Nat,
        string
    ]>, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "set_value", set_value_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_set_value_param(i: Array<[
        att.Nat,
        string
    ]>, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "set_value", set_value_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_res_value(key: att.Nat): Promise<Array<[
        att.Nat,
        string
    ]> | undefined> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            const data = await ex.get_big_map_value(BigInt(storage), key.to_mich(), att.prim_annot_to_mich_type("nat", []), att.pair_to_mich_type("map", att.prim_annot_to_mich_type("nat", []), att.prim_annot_to_mich_type("string", []))), collapsed = true;
            if (data != undefined) {
                let res: Array<[
                    att.Nat,
                    string
                ]> = [];
                for (let e of data.entries()) {
                    res.push([(x => { return new att.Nat(x); })(e[0]), (x => { return x; })(e[1])]);
                }
                return res;
            }
            else {
                return undefined;
            }
        }
        throw new Error("Contract not initialised");
    }
    async has_res_value(key: att.Nat): Promise<boolean> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            const data = await ex.get_big_map_value(BigInt(storage), key.to_mich(), att.prim_annot_to_mich_type("nat", []), att.pair_to_mich_type("map", att.prim_annot_to_mich_type("nat", []), att.prim_annot_to_mich_type("string", []))), collapsed = true;
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
export const type_big_map_value_map_nat_string = new Type_big_map_value_map_nat_string();
