import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
export const storage_type: att.MichelineType = { prim: "map", args: [{ prim: "nat", annots: [] }, { prim: "pair", args: [{ prim: "string", annots: ["%s"] }, { prim: "pair", args: [{ prim: "nat", annots: [] }, { prim: "pair", args: [{ prim: "pair", args: [{ prim: "string", annots: [] }, { prim: "bytes", annots: [] }], annots: [] }, { prim: "bool", annots: [] }], annots: [] }], annots: ["%v"] }], annots: [] }], annots: [] };
export type my_asset_key = att.Nat;
export const my_asset_key_mich_type: att.MichelineType = att.prim_annot_to_mich_type("nat", []);
export class my_asset_value implements att.ArchetypeType {
    constructor(public s: string, public v: [
        att.Nat,
        [
            string,
            att.Bytes
        ],
        boolean
    ]) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return att.pair_to_mich([att.string_to_mich(this.s), att.pair_to_mich([this.v[0].to_mich(), att.pair_to_mich([att.string_to_mich(this.v[1][0]), this.v[1][1].to_mich()]), att.bool_to_mich(this.v[2])])]);
    }
    equals(v: my_asset_value): boolean {
        return (this.s == v.s && this.s == v.s && ((x, y) => {
            return x[0].equals(y[0]) && ((x, y) => {
                return x[0] == y[0] && x[1].equals(y[1]);
            })(x[1], y[1]) && x[2] == y[2];
        })(this.v, v.v));
    }
}
export const my_asset_value_mich_type: att.MichelineType = att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("string", ["%s"]),
    att.pair_array_to_mich_type([
        att.prim_annot_to_mich_type("nat", []),
        att.pair_array_to_mich_type([
            att.pair_array_to_mich_type([
                att.prim_annot_to_mich_type("string", []),
                att.prim_annot_to_mich_type("bytes", [])
            ], []),
            att.prim_annot_to_mich_type("bool", [])
        ], [])
    ], ["%v"])
], []);
export type my_asset_container = Array<[
    my_asset_key,
    my_asset_value
]>;
export const my_asset_container_mich_type: att.MichelineType = att.pair_to_mich_type("map", att.prim_annot_to_mich_type("nat", []), att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("string", ["%s"]),
    att.pair_array_to_mich_type([
        att.prim_annot_to_mich_type("nat", []),
        att.pair_array_to_mich_type([
            att.pair_array_to_mich_type([
                att.prim_annot_to_mich_type("string", []),
                att.prim_annot_to_mich_type("bytes", [])
            ], []),
            att.prim_annot_to_mich_type("bool", [])
        ], [])
    ], ["%v"])
], []));
const asset_put_arg_to_mich = (i: [
    att.Nat,
    [
        string,
        att.Bytes
    ],
    boolean
]): att.Micheline => {
    return att.pair_to_mich([i[0].to_mich(), att.pair_to_mich([att.string_to_mich(i[1][0]), i[1][1].to_mich()]), att.bool_to_mich(i[2])]);
}
export class Type_asset_value_3_tuple_nat_string_bytes_bool_custom {
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
        const address = (await ex.deploy("./tests/contracts/type_asset_value_3_tuple_nat_string_bytes_bool_custom.arl", {}, params)).address;
        this.address = address;
    }
    async asset_put(i: [
        att.Nat,
        [
            string,
            att.Bytes
        ],
        boolean
    ], params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "asset_put", asset_put_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_asset_put_param(i: [
        att.Nat,
        [
            string,
            att.Bytes
        ],
        boolean
    ], params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "asset_put", asset_put_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_my_asset(): Promise<my_asset_container> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return storage;
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const type_asset_value_3_tuple_nat_string_bytes_bool_custom = new Type_asset_value_3_tuple_nat_string_bytes_bool_custom();
