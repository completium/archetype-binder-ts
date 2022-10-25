import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
const set_value_arg_to_mich = (i: [
    [
        att.Nat,
        string
    ],
    att.Bytes
]): att.Micheline => {
    return att.pair_to_mich([att.pair_to_mich([i[0][0].to_mich(), att.string_to_mich(i[0][1])]), i[1].to_mich()]);
}
export class Type_big_map_value_tuple_nat_string_bytes_rev {
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
        const res = await ex.deploy("./tests/contracts/type_big_map_value_tuple_nat_string_bytes_rev.arl", {}, params);
        this.address = res.address;
    }
    async set_value(i: [
        [
            att.Nat,
            string
        ],
        att.Bytes
    ], params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "set_value", set_value_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_set_value_param(i: [
        [
            att.Nat,
            string
        ],
        att.Bytes
    ], params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "set_value", set_value_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_res_value(key: att.Nat): Promise<[
        [
            att.Nat,
            string
        ],
        att.Bytes
    ] | undefined> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            const data = await ex.get_big_map_value(BigInt(storage), key.to_mich(), att.prim_annot_to_mich_type("nat", []), att.pair_array_to_mich_type([
                att.pair_array_to_mich_type([
                    att.prim_annot_to_mich_type("nat", []),
                    att.prim_annot_to_mich_type("string", [])
                ], []),
                att.prim_annot_to_mich_type("bytes", [])
            ], [])), collapsed = true;
            if (data != undefined) {
                return [[(x => { return new att.Nat(x); })(data[Object.keys(data)[0]]), (x => { return x; })(data[Object.keys(data)[1]])], (x => { return new att.Bytes(x); })(data[Object.keys(data)[2]])];
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
            const data = await ex.get_big_map_value(BigInt(storage), key.to_mich(), att.prim_annot_to_mich_type("nat", []), att.pair_array_to_mich_type([
                att.pair_array_to_mich_type([
                    att.prim_annot_to_mich_type("nat", []),
                    att.prim_annot_to_mich_type("string", [])
                ], []),
                att.prim_annot_to_mich_type("bytes", [])
            ], [])), collapsed = true;
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
export const type_big_map_value_tuple_nat_string_bytes_rev = new Type_big_map_value_tuple_nat_string_bytes_rev();
