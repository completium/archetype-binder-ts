import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
export enum e_enum_types {
    e_1 = "e_1",
    e_2 = "e_2",
    e_3 = "e_3",
    e_4 = "e_4"
}
export abstract class e_enum extends att.Enum<e_enum_types> {
    abstract to_mich(): att.Micheline;
    equals(v: e_enum): boolean {
        return att.micheline_equals(this.to_mich(), v.to_mich());
    }
}
export class e_1 extends e_enum {
    constructor() {
        super(e_enum_types.e_1);
    }
    to_mich() { return att.left_to_mich(att.unit_mich); }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
}
export class e_2 extends e_enum {
    constructor(private content: att.Nat) {
        super(e_enum_types.e_2);
    }
    to_mich() { return att.right_to_mich(att.left_to_mich(this.content.to_mich())); }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    get() { return this.content; }
}
export class e_3 extends e_enum {
    constructor(private content: string) {
        super(e_enum_types.e_3);
    }
    to_mich() { return att.right_to_mich(att.right_to_mich(att.left_to_mich(att.string_to_mich(this.content)))); }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    get() { return this.content; }
}
export class e_4 extends e_enum {
    constructor(private content: [
        att.Bytes,
        boolean
    ]) {
        super(e_enum_types.e_4);
    }
    to_mich() { return att.right_to_mich(att.right_to_mich(att.right_to_mich(att.pair_to_mich([this.content[0].to_mich(), att.bool_to_mich(this.content[1])])))); }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    get() { return this.content; }
}
export const mich_to_e_enum = (m: att.Micheline): e_enum => {
    if ((m as att.Msingle).prim == "Left") {
        return new e_1();
    }
    if (((m as att.Msingle).args[0] as att.Msingle).prim == "Left") {
        return new e_2(att.mich_to_nat(((m as att.Msingle).args[0] as att.Msingle).args[0]));
    }
    if ((((m as att.Msingle).args[0] as att.Msingle).args[0] as att.Msingle).prim == "Left") {
        return new e_3(att.mich_to_string((((m as att.Msingle).args[0] as att.Msingle).args[0] as att.Msingle).args[0]));
    }
    if ((((m as att.Msingle).args[0] as att.Msingle).args[0] as att.Msingle).prim == "Right") {
        return new e_4((p => {
            return [att.mich_to_bytes((p as att.Mpair).args[0]), att.mich_to_bool((p as att.Mpair).args[1])];
        })((((m as att.Msingle).args[0] as att.Msingle).args[0] as att.Msingle).args[0]));
    }
    throw new Error("mich_to_e_enum : invalid micheline");
};
export class my_asset_key implements att.ArchetypeType {
    constructor(public k: e_enum) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return this.k.to_mich((x => { return att.unit_to_mich(); }), (x => { return x.to_mich((x => { return x.to_mich(); }), (x => { return x.to_mich((x => { return att.string_to_mich(x); }), (x => { return att.pair_to_mich([x[0].to_mich(), att.bool_to_mich(x[1])]); })); })); }));
    }
    equals(v: my_asset_key): boolean {
        return this.k == v.k;
    }
    static from_mich(input: att.Micheline): my_asset_key {
        return new my_asset_key(mich_to_e_enum(input));
    }
}
export const my_asset_key_mich_type: att.MichelineType = att.or_to_mich_type(att.prim_annot_to_mich_type("unit", ["%e_1"]), att.or_to_mich_type(att.prim_annot_to_mich_type("nat", ["%e_2"]), att.or_to_mich_type(att.prim_annot_to_mich_type("string", ["%e_3"]), att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("bytes", []),
    att.prim_annot_to_mich_type("bool", [])
], ["%e_4"]), []), []), []);
export type my_asset_container = Array<my_asset_key>;
export const my_asset_container_mich_type: att.MichelineType = att.set_annot_to_mich_type(att.or_to_mich_type(att.prim_annot_to_mich_type("unit", ["%e_1"]), att.or_to_mich_type(att.prim_annot_to_mich_type("nat", ["%e_2"]), att.or_to_mich_type(att.prim_annot_to_mich_type("string", ["%e_3"]), att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("bytes", []),
    att.prim_annot_to_mich_type("bool", [])
], ["%e_4"]), []), []), []), []);
const asset_put_arg_to_mich = (i: e_enum): att.Micheline => {
    return i.to_mich();
}
export class Type_asset_only_key_1_enum_param {
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
        const address = (await ex.deploy("./tests/contracts/type_asset_only_key_1_enum_param.arl", {}, params)).address;
        this.address = address;
    }
    async asset_put(i: e_enum, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "asset_put", asset_put_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_asset_put_param(i: e_enum, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
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
export const type_asset_only_key_1_enum_param = new Type_asset_only_key_1_enum_param();
