import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
export type my_asset_key = att.Nat;
export const my_asset_key_mich_type: att.MichelineType = att.prim_annot_to_mich_type("nat", []);
export type my_asset_value = Array<boolean>;
export const my_asset_value_mich_type: att.MichelineType = att.list_annot_to_mich_type(att.prim_annot_to_mich_type("bool", []), []);
export type my_asset_container = Array<[
    my_asset_key,
    my_asset_value
]>;
export const my_asset_container_mich_type: att.MichelineType = att.pair_to_mich_type("map", att.prim_annot_to_mich_type("nat", []), att.list_annot_to_mich_type(att.prim_annot_to_mich_type("bool", []), []));
const asset_put_arg_to_mich = (i: Array<boolean>): att.Micheline => {
    return att.list_to_mich(i, x => {
        return att.bool_to_mich(x);
    });
}
export class Type_asset_value_2_set_bool {
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
        const address = await ex.deploy("./tests/contracts/type_asset_value_2_set_bool.arl", {}, params);
        this.address = address;
    }
    async asset_put(i: Array<boolean>, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "asset_put", asset_put_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_asset_put_param(i: Array<boolean>, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
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
                Array<boolean>
            ]> = [];
            for (let e of storage.entries()) {
                res.push([(x => { return new att.Nat(x); })(e[0]), (x => { const res: Array<boolean> = []; for (let i = 0; i < x.length; i++) {
                        res.push((x => { return x.prim ? (x.prim == "True" ? true : false) : x; })(x[i]));
                    } return res; })(e[1])]);
            }
            return res;
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const type_asset_value_2_set_bool = new Type_asset_value_2_set_bool();
