import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
export type my_asset_key = att.Nat;
export const my_asset_key_mich_type: att.MichelineType = att.prim_annot_to_mich_type("nat", []);
export class my_asset_value implements att.ArchetypeType {
    constructor(public s: string, public v: boolean) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return att.pair_to_mich([att.string_to_mich(this.s), att.bool_to_mich(this.v)]);
    }
    equals(v: my_asset_value): boolean {
        return (this.s == v.s && this.s == v.s && this.v == v.v);
    }
}
export const my_asset_value_mich_type: att.MichelineType = att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("string", ["%s"]),
    att.prim_annot_to_mich_type("bool", ["%v"])
], []);
export type my_asset_container = Array<[
    my_asset_key,
    my_asset_value
]>;
export const my_asset_container_mich_type: att.MichelineType = att.pair_to_mich_type("map", att.prim_annot_to_mich_type("nat", []), att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("string", ["%s"]),
    att.prim_annot_to_mich_type("bool", ["%v"])
], []));
const asset_put_arg_to_mich = (i: boolean): att.Micheline => {
    return att.bool_to_mich(i);
}
export class Type_asset_value_3_bool {
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
        const address = await ex.deploy("./tests/contracts/type_asset_value_3_bool.arl", {}, params);
        this.address = address;
    }
    async asset_put(i: boolean, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "asset_put", asset_put_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_asset_put_param(i: boolean, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
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
                my_asset_value
            ]> = [];
            for (let e of storage.entries()) {
                res.push([(x => { return new att.Nat(x); })(e[0]), (x => { return new my_asset_value((x => { return x; })(x.s), (x => { return x.prim ? (x.prim == "True" ? true : false) : x; })(x.v)); })(e[1])]);
            }
            return res;
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const type_asset_value_3_bool = new Type_asset_value_3_bool();
