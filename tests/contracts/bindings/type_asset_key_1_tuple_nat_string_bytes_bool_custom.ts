import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
export class my_asset_key implements att.ArchetypeType {
    constructor(public k: [
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
        return att.pair_to_mich([this.k.to_mich(), att.pair_to_mich([att.string_to_mich(this.k), this.k.to_mich()]), att.bool_to_mich(this.k)]);
    }
    equals(v: my_asset_key): boolean {
        return ((x, y) => {
            return x[0].equals(y[0]) && ((x, y) => {
                return x[0] == y[0] && x[1].equals(y[1]);
            })(x[1], y[1]) && x[2] == y[2];
        })(this.k, v.k);
    }
    static from_mich(input: att.Micheline): my_asset_key {
        return new my_asset_key((p => {
            return [att.mich_to_nat((p as att.Mpair).args[0]), (p => {
                    return [att.mich_to_string((p as att.Mpair).args[0]), att.mich_to_bytes((p as att.Mpair).args[1])];
                })((p as att.Mpair).args[1]), att.mich_to_bool((p as att.Mpair).args[2])];
        })(input));
    }
}
export const my_asset_key_mich_type: att.MichelineType = att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("nat", []),
    att.pair_array_to_mich_type([
        att.prim_annot_to_mich_type("string", []),
        att.prim_annot_to_mich_type("bytes", [])
    ], []),
    att.prim_annot_to_mich_type("bool", [])
], []);
export class my_asset_value implements att.ArchetypeType {
    constructor(public v: string) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return att.string_to_mich(this.v);
    }
    equals(v: my_asset_value): boolean {
        return this.v == v.v;
    }
    static from_mich(input: att.Micheline): my_asset_value {
        return new my_asset_value(att.mich_to_string(input));
    }
}
export const my_asset_value_mich_type: att.MichelineType = att.prim_annot_to_mich_type("string", []);
export type my_asset_container = Array<[
    my_asset_key,
    my_asset_value
]>;
export const my_asset_container_mich_type: att.MichelineType = att.pair_annot_to_mich_type("map", att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("nat", []),
    att.pair_array_to_mich_type([
        att.prim_annot_to_mich_type("string", []),
        att.prim_annot_to_mich_type("bytes", [])
    ], []),
    att.prim_annot_to_mich_type("bool", [])
], []), att.prim_annot_to_mich_type("string", []), []);
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
export class Type_asset_key_1_tuple_nat_string_bytes_bool_custom {
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
        const address = (await ex.deploy("./tests/contracts/type_asset_key_1_tuple_nat_string_bytes_bool_custom.arl", {}, params)).address;
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
            return att.mich_to_map(storage, (x, y) => [my_asset_key.from_mich(x), my_asset_value.from_mich(y)]);
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const type_asset_key_1_tuple_nat_string_bytes_bool_custom = new Type_asset_key_1_tuple_nat_string_bytes_bool_custom();
