import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
export class r_record implements att.ArchetypeType {
    constructor(public f_a: att.Nat, public f_b: string, public f_c: att.Bytes, public f_d: boolean) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return att.pair_to_mich([this.f_a.to_mich(), att.pair_to_mich([att.pair_to_mich([att.string_to_mich(this.f_b), this.f_c.to_mich()]), att.bool_to_mich(this.f_d)])]);
    }
    equals(v: r_record): boolean {
        return (this.f_a.equals(v.f_a) && this.f_a.equals(v.f_a) && this.f_b == v.f_b && this.f_c.equals(v.f_c) && this.f_d == v.f_d);
    }
}
export const r_record_mich_type: att.MichelineType = att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("nat", ["%f_a"]),
    att.pair_array_to_mich_type([
        att.pair_array_to_mich_type([
            att.prim_annot_to_mich_type("string", ["%f_b"]),
            att.prim_annot_to_mich_type("bytes", ["%f_c"])
        ], []),
        att.prim_annot_to_mich_type("bool", ["%f_d"])
    ], [])
], []);
const get_value_arg_to_mich = (i: r_record): att.Micheline => {
    return i.to_mich();
}
export const deploy_get_value_callback = async (params: Partial<ex.Parameters>): Promise<att.DeployResult> => {
    return await ex.deploy_callback("get_value", att.pair_array_to_mich_type([
        att.prim_annot_to_mich_type("nat", ["%f_a"]),
        att.pair_array_to_mich_type([
            att.pair_array_to_mich_type([
                att.prim_annot_to_mich_type("string", ["%f_b"]),
                att.prim_annot_to_mich_type("bytes", ["%f_c"])
            ], []),
            att.prim_annot_to_mich_type("bool", ["%f_d"])
        ], [])
    ], []), params);
};
export class Type_getter_record_4_fields_custom {
    address: string | undefined;
    constructor(address: string | undefined = undefined) {
        this.address = address;
    }
    get_value_callback_address: string | undefined;
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
        const address = (await ex.deploy("./tests/contracts/type_getter_record_4_fields_custom.arl", {}, params)).address;
        this.address = address;
        this.get_value_callback_address = (await deploy_get_value_callback(params)).address;
    }
    async get_value(i: r_record, params: Partial<ex.Parameters>): Promise<r_record> {
        if (this.address != undefined) {
            if (this.get_value_callback_address != undefined) {
                const entrypoint = new att.Entrypoint(new att.Address(this.get_value_callback_address), "callback");
                await ex.call(this.address, "get_value", att.getter_args_to_mich(get_value_arg_to_mich(i), entrypoint), params);
                return await ex.get_callback_value<r_record>(this.get_value_callback_address, x => { return mich_to_r_record(x, collapsed); });
            }
        }
        throw new Error("Contract not initialised");
    }
    async get_res(): Promise<r_record> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return mich_to_r_record(storage, collapsed);
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const type_getter_record_4_fields_custom = new Type_getter_record_4_fields_custom();
