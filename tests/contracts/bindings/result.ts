import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
export const p_asset_key_mich_type: att.MichelineType = att.prim_annot_to_mich_type("nat", []);
export const a_asset_key_mich_type: att.MichelineType = att.prim_annot_to_mich_type("nat", []);
export const my_asset_key_mich_type: att.MichelineType = att.prim_annot_to_mich_type("nat", []);
export class my_asset_value implements att.ArchetypeType {
    constructor(public p: Array<att.Nat>, public a: Array<att.Nat>) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return att.pair_to_mich([att.list_to_mich(this.p, x => {
                return x.to_mich();
            }), att.list_to_mich(this.a, x => {
                return x.to_mich();
            })]);
    }
    equals(v: my_asset_value): boolean {
        return att.micheline_equals(this.to_mich(), v.to_mich());
    }
    static from_mich(input: att.Micheline): my_asset_value {
        return new my_asset_value(att.mich_to_list((input as att.Mpair).args[0], x => { return att.mich_to_nat(x); }), att.mich_to_list((input as att.Mpair).args[1], x => { return att.mich_to_nat(x); }));
    }
}
export const p_asset_value_mich_type: att.MichelineType = att.prim_annot_to_mich_type("string", []);
export const a_asset_value_mich_type: att.MichelineType = att.prim_annot_to_mich_type("bytes", []);
export const my_asset_value_mich_type: att.MichelineType = att.pair_array_to_mich_type([
    att.set_annot_to_mich_type(att.prim_annot_to_mich_type("nat", []), ["%p"]),
    att.set_annot_to_mich_type(att.prim_annot_to_mich_type("nat", []), ["%a"])
], []);
export type p_asset_container = Array<[
    att.Nat,
    string
]>;
export type a_asset_container = Array<[
    att.Nat,
    att.Bytes
]>;
export type my_asset_container = Array<[
    att.Nat,
    my_asset_value
]>;
export const p_asset_container_mich_type: att.MichelineType = att.pair_annot_to_mich_type("map", att.prim_annot_to_mich_type("nat", []), att.prim_annot_to_mich_type("string", []), []);
export const a_asset_container_mich_type: att.MichelineType = att.pair_annot_to_mich_type("map", att.prim_annot_to_mich_type("nat", []), att.prim_annot_to_mich_type("bytes", []), []);
export const my_asset_container_mich_type: att.MichelineType = att.pair_annot_to_mich_type("map", att.prim_annot_to_mich_type("nat", []), att.pair_array_to_mich_type([
    att.set_annot_to_mich_type(att.prim_annot_to_mich_type("nat", []), ["%p"]),
    att.set_annot_to_mich_type(att.prim_annot_to_mich_type("nat", []), ["%a"])
], []), []);
const add_aggregate_arg_to_mich = (ik: att.Nat, iv: att.Bytes): att.Micheline => {
    return att.pair_to_mich([
        ik.to_mich(),
        iv.to_mich()
    ]);
}
const add_partition_arg_to_mich = (ik: att.Nat, iv: string): att.Micheline => {
    return att.pair_to_mich([
        ik.to_mich(),
        att.string_to_mich(iv)
    ]);
}
export class Sample_asset_aggregate_partition {
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
        const address = (await ex.deploy("./contracts/sample_asset_aggregate_partition.arl", {}, params)).address;
        this.address = address;
    }
    async add_aggregate(ik: att.Nat, iv: att.Bytes, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "add_aggregate", add_aggregate_arg_to_mich(ik, iv), params);
        }
        throw new Error("Contract not initialised");
    }
    async add_partition(ik: att.Nat, iv: string, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "add_partition", add_partition_arg_to_mich(ik, iv), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_add_aggregate_param(ik: att.Nat, iv: att.Bytes, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "add_aggregate", add_aggregate_arg_to_mich(ik, iv), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_add_partition_param(ik: att.Nat, iv: string, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "add_partition", add_partition_arg_to_mich(ik, iv), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_p_asset(): Promise<p_asset_container> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.mich_to_map((storage as att.Mpair).args[0], (x, y) => [att.mich_to_nat(x), att.mich_to_string(y)]);
        }
        throw new Error("Contract not initialised");
    }
    async get_a_asset(): Promise<a_asset_container> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.mich_to_map((storage as att.Mpair).args[1], (x, y) => [att.mich_to_nat(x), att.mich_to_bytes(y)]);
        }
        throw new Error("Contract not initialised");
    }
    async get_my_asset(): Promise<my_asset_container> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.mich_to_map((storage as att.Mpair).args[2], (x, y) => [att.mich_to_nat(x), my_asset_value.from_mich(y)]);
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const sample_asset_aggregate_partition = new Sample_asset_aggregate_partition();
