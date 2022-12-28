import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
export class my_asset_key implements att.ArchetypeType {
    constructor(public k: [
        [
            att.Nat,
            string
        ],
        att.Bytes
    ], public n: att.Nat) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return att.pair_to_mich([att.pair_to_mich([att.pair_to_mich([this.k[0][0].to_mich(), att.string_to_mich(this.k[0][1])]), this.k[1].to_mich()]), this.n.to_mich()]);
    }
    equals(v: my_asset_key): boolean {
        return att.micheline_equals(this.to_mich(), v.to_mich());
    }
    static from_mich(input: att.Micheline): my_asset_key {
        return new my_asset_key((p => {
            return [(p => {
                    return [att.mich_to_nat((p as att.Mpair).args[0]), att.mich_to_string((p as att.Mpair).args[1])];
                })((p as att.Mpair).args[0]), att.mich_to_bytes((p as att.Mpair).args[1])];
        })((input as att.Mpair).args[0]), att.mich_to_nat((input as att.Mpair).args[1]));
    }
}
export const my_asset_key_mich_type: att.MichelineType = att.pair_array_to_mich_type([
    att.pair_array_to_mich_type([
        att.pair_array_to_mich_type([
            att.prim_annot_to_mich_type("nat", []),
            att.prim_annot_to_mich_type("string", [])
        ], []),
        att.prim_annot_to_mich_type("bytes", [])
    ], ["%k"]),
    att.prim_annot_to_mich_type("nat", ["%n"])
], []);
export type my_asset_container = Array<my_asset_key>;
export const my_asset_container_mich_type: att.MichelineType = att.set_annot_to_mich_type(att.pair_array_to_mich_type([
    att.pair_array_to_mich_type([
        att.pair_array_to_mich_type([
            att.prim_annot_to_mich_type("nat", []),
            att.prim_annot_to_mich_type("string", [])
        ], []),
        att.prim_annot_to_mich_type("bytes", [])
    ], ["%k"]),
    att.prim_annot_to_mich_type("nat", ["%n"])
], []), []);
const asset_put_arg_to_mich = (i: [
    [
        att.Nat,
        string
    ],
    att.Bytes
]): att.Micheline => {
    return att.pair_to_mich([att.pair_to_mich([i[0][0].to_mich(), att.string_to_mich(i[0][1])]), i[1].to_mich()]);
}
export class Type_asset_only_key_2_tuple_nat_string_bytes_rev {
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
        const address = (await ex.deploy("./tests/contracts/type_asset_only_key_2_tuple_nat_string_bytes_rev.arl", {}, params)).address;
        this.address = address;
    }
    async asset_put(i: [
        [
            att.Nat,
            string
        ],
        att.Bytes
    ], params: Partial<ex.Parameters>): Promise<att.CallResult> {
        if (this.address != undefined) {
            return await ex.call(this.address, "asset_put", asset_put_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_asset_put_param(i: [
        [
            att.Nat,
            string
        ],
        att.Bytes
    ], params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "asset_put", asset_put_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_my_asset(): Promise<my_asset_container> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.mich_to_list(storage, x => { return my_asset_key.from_mich(x); });
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const type_asset_only_key_2_tuple_nat_string_bytes_rev = new Type_asset_only_key_2_tuple_nat_string_bytes_rev();
