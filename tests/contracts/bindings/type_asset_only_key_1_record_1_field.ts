import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
export class r_record implements att.ArchetypeType {
    constructor(public f_a: att.Nat) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return this.f_a.to_mich();
    }
    equals(v: r_record): boolean {
        return this.f_a.equals(v.f_a);
    }
    static from_mich(input: att.Micheline): r_record {
        return new r_record(att.Nat.from_mich(input));
    }
}
export const r_record_mich_type: att.MichelineType = att.prim_annot_to_mich_type("nat", []);
export const my_asset_key_mich_type: att.MichelineType = att.prim_annot_to_mich_type("nat", []);
export type my_asset_container = Array<r_record>;
export const my_asset_container_mich_type: att.MichelineType = att.set_annot_to_mich_type(att.prim_annot_to_mich_type("nat", []), []);
const asset_put_arg_to_mich = (i: r_record): att.Micheline => {
    return i.to_mich();
}
export class Type_asset_only_key_1_record_1_field {
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
        const address = (await ex.deploy("./tests/contracts/type_asset_only_key_1_record_1_field.arl", {}, params)).address;
        this.address = address;
    }
    async asset_put(i: r_record, params: Partial<ex.Parameters>): Promise<att.CallResult> {
        if (this.address != undefined) {
            return await ex.call(this.address, "asset_put", asset_put_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_asset_put_param(i: r_record, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "asset_put", asset_put_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_my_asset(): Promise<my_asset_container> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.mich_to_list(storage, x => { return r_record.from_mich(x); });
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const type_asset_only_key_1_record_1_field = new Type_asset_only_key_1_record_1_field();
