import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
export type my_asset_key = att.Nat;
export const my_asset_key_mich_type: att.MichelineType = att.prim_annot_to_mich_type("nat", []);
export type my_asset_value = [
    att.Nat,
    string,
    att.Bytes
];
export const my_asset_value_mich_type: att.MichelineType = att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("nat", []),
    att.pair_array_to_mich_type([
        att.prim_annot_to_mich_type("string", []),
        att.prim_annot_to_mich_type("bytes", [])
    ], [])
], []);
export type my_asset_container = Array<[
    my_asset_key,
    my_asset_value
]>;
export const my_asset_container_mich_type: att.MichelineType = att.pair_annot_to_mich_type("map", att.prim_annot_to_mich_type("nat", []), att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("nat", []),
    att.pair_array_to_mich_type([
        att.prim_annot_to_mich_type("string", []),
        att.prim_annot_to_mich_type("bytes", [])
    ], [])
], []), []);
const asset_put_arg_to_mich = (i: [
    att.Nat,
    string,
    att.Bytes
]): att.Micheline => {
    return att.pair_to_mich([i[0].to_mich(), att.string_to_mich(i[1]), i[2].to_mich()]);
}
export class Type_asset_value_2_tuple_nat_string_bytes {
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
        const address = (await ex.deploy("./tests/contracts/type_asset_value_2_tuple_nat_string_bytes.arl", {}, params)).address;
        this.address = address;
    }
    async asset_put(i: [
        att.Nat,
        string,
        att.Bytes
    ], params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "asset_put", asset_put_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_asset_put_param(i: [
        att.Nat,
        string,
        att.Bytes
    ], params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "asset_put", asset_put_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_my_asset(): Promise<my_asset_container> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            let res: Array<[
                att.Nat,
                [
                    att.Nat,
                    string,
                    att.Bytes
                ]
            ]> = [];
            for (let e of storage.entries()) {
                res.push([(x => { return new att.Nat(x); })(e[0]), (x => { return [(x => { return new att.Nat(x); })(x[Object.keys(x)[0]]), (x => { return x; })(x[Object.keys(x)[1]]), (x => { return new att.Bytes(x); })(x[Object.keys(x)[2]])]; })(e[1])]);
            }
            return res;
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const type_asset_value_2_tuple_nat_string_bytes = new Type_asset_value_2_tuple_nat_string_bytes();
