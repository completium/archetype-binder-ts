import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
export const storage_type: att.MichelineType = { prim: "big_map", args: [{ prim: "pair", args: [{ prim: "pair", args: [{ prim: "pair", args: [{ prim: "nat", annots: [] }, { prim: "string", annots: [] }], annots: [] }, { prim: "bytes", annots: [] }], annots: [] }, { prim: "bool", annots: [] }], annots: [] }, { prim: "nat", annots: [] }], annots: [] };
const set_value_arg_to_mich = (i: [
    [
        [
            att.Nat,
            string
        ],
        att.Bytes
    ],
    boolean
]): att.Micheline => {
    return att.pair_to_mich([att.pair_to_mich([att.pair_to_mich([i[0][0][0].to_mich(), att.string_to_mich(i[0][0][1])]), i[0][1].to_mich()]), att.bool_to_mich(i[1])]);
}
export class Type_big_map_key_tuple_nat_string_bytes_bool_rev {
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
        const address = (await ex.deploy("./tests/contracts/type_big_map_key_tuple_nat_string_bytes_bool_rev.arl", {}, params)).address;
        this.address = address;
    }
    async set_value(i: [
        [
            [
                att.Nat,
                string
            ],
            att.Bytes
        ],
        boolean
    ], params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "set_value", set_value_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_set_value_param(i: [
        [
            [
                att.Nat,
                string
            ],
            att.Bytes
        ],
        boolean
    ], params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "set_value", set_value_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_res_value(key: [
        [
            [
                att.Nat,
                string
            ],
            att.Bytes
        ],
        boolean
    ]): Promise<att.Nat | undefined> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            const data = await ex.get_big_map_value(BigInt(storage), att.pair_to_mich([att.pair_to_mich([att.pair_to_mich([key[0][0][0].to_mich(), att.string_to_mich(key[0][0][1])]), key[0][1].to_mich()]), att.bool_to_mich(key[1])]), att.pair_array_to_mich_type([
                att.pair_array_to_mich_type([
                    att.pair_array_to_mich_type([
                        att.prim_annot_to_mich_type("nat", []),
                        att.prim_annot_to_mich_type("string", [])
                    ], []),
                    att.prim_annot_to_mich_type("bytes", [])
                ], []),
                att.prim_annot_to_mich_type("bool", [])
            ], []), att.prim_annot_to_mich_type("nat", [])), collapsed = true;
            if (data != undefined) {
                return att.mich_to_nat(data);
            }
            else {
                return undefined;
            }
        }
        throw new Error("Contract not initialised");
    }
    async has_res_value(key: [
        [
            [
                att.Nat,
                string
            ],
            att.Bytes
        ],
        boolean
    ]): Promise<boolean> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            const data = await ex.get_big_map_value(BigInt(storage), att.pair_to_mich([att.pair_to_mich([att.pair_to_mich([key[0][0][0].to_mich(), att.string_to_mich(key[0][0][1])]), key[0][1].to_mich()]), att.bool_to_mich(key[1])]), att.pair_array_to_mich_type([
                att.pair_array_to_mich_type([
                    att.pair_array_to_mich_type([
                        att.prim_annot_to_mich_type("nat", []),
                        att.prim_annot_to_mich_type("string", [])
                    ], []),
                    att.prim_annot_to_mich_type("bytes", [])
                ], []),
                att.prim_annot_to_mich_type("bool", [])
            ], []), att.prim_annot_to_mich_type("nat", [])), collapsed = true;
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
export const type_big_map_key_tuple_nat_string_bytes_bool_rev = new Type_big_map_key_tuple_nat_string_bytes_bool_rev();
