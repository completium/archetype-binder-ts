import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
export const storage_type: att.MichelineType = { prim: "pair", args: [{ prim: "address", annots: ["%owner"] }, { prim: "pair", args: [{ prim: "option", args: [{ prim: "address", annots: [] }], annots: ["%oa"] }, { prim: "pair", args: [{ prim: "int", annots: ["%s"] }, { prim: "pair", args: [{ prim: "option", args: [{ prim: "nat", annots: [] }], annots: ["%o"] }, { prim: "pair", args: [{ prim: "list", args: [{ prim: "int", annots: [] }], annots: ["%l"] }, { prim: "pair", args: [{ prim: "map", args: [{ prim: "nat", annots: [] }, { prim: "pair", args: [{ prim: "string", annots: [] }, { prim: "int", annots: [] }], annots: [] }], annots: ["%m"] }, { prim: "pair", args: [{ prim: "set", args: [{ prim: "nat", annots: [] }], annots: ["%s1"] }, { prim: "pair", args: [{ prim: "list", args: [{ prim: "pair", args: [{ prim: "pair", args: [{ prim: "nat", annots: ["%f1"] }, { prim: "pair", args: [{ prim: "int", annots: ["%f2"] }, { prim: "mutez", annots: ["%f3"] }], annots: [] }], annots: [] }, { prim: "pair", args: [{ prim: "pair", args: [{ prim: "pair", args: [{ prim: "int", annots: [] }, { prim: "nat", annots: [] }], annots: ["%f4"] }, { prim: "bool", annots: ["%f5"] }], annots: [] }, { prim: "pair", args: [{ prim: "bytes", annots: ["%f6"] }, { prim: "pair", args: [{ prim: "string", annots: ["%f7"] }, { prim: "pair", args: [{ prim: "timestamp", annots: ["%f8"] }, { prim: "pair", args: [{ prim: "int", annots: ["%f9"] }, { prim: "pair", args: [{ prim: "address", annots: ["%f10"] }, { prim: "pair", args: [{ prim: "option", args: [{ prim: "nat", annots: [] }], annots: ["%f11"] }, { prim: "pair", args: [{ prim: "list", args: [{ prim: "string", annots: [] }], annots: ["%f12"] }, { prim: "set", args: [{ prim: "pair", args: [{ prim: "string", annots: [] }, { prim: "pair", args: [{ prim: "nat", annots: [] }, { prim: "int", annots: [] }], annots: [] }], annots: [] }], annots: ["%f13"] }], annots: [] }], annots: [] }], annots: [] }], annots: [] }], annots: [] }], annots: [] }], annots: [] }], annots: [] }], annots: [] }], annots: ["%l1"] }, { prim: "pair", args: [{ prim: "list", args: [{ prim: "list", args: [{ prim: "pair", args: [{ prim: "pair", args: [{ prim: "nat", annots: ["%f1"] }, { prim: "pair", args: [{ prim: "int", annots: ["%f2"] }, { prim: "mutez", annots: ["%f3"] }], annots: [] }], annots: [] }, { prim: "pair", args: [{ prim: "pair", args: [{ prim: "pair", args: [{ prim: "int", annots: [] }, { prim: "nat", annots: [] }], annots: ["%f4"] }, { prim: "bool", annots: ["%f5"] }], annots: [] }, { prim: "pair", args: [{ prim: "bytes", annots: ["%f6"] }, { prim: "pair", args: [{ prim: "string", annots: ["%f7"] }, { prim: "pair", args: [{ prim: "timestamp", annots: ["%f8"] }, { prim: "pair", args: [{ prim: "int", annots: ["%f9"] }, { prim: "pair", args: [{ prim: "address", annots: ["%f10"] }, { prim: "pair", args: [{ prim: "option", args: [{ prim: "nat", annots: [] }], annots: ["%f11"] }, { prim: "pair", args: [{ prim: "list", args: [{ prim: "string", annots: [] }], annots: ["%f12"] }, { prim: "set", args: [{ prim: "pair", args: [{ prim: "string", annots: [] }, { prim: "pair", args: [{ prim: "nat", annots: [] }, { prim: "int", annots: [] }], annots: [] }], annots: [] }], annots: ["%f13"] }], annots: [] }], annots: [] }], annots: [] }], annots: [] }], annots: [] }], annots: [] }], annots: [] }], annots: [] }], annots: [] }], annots: [] }], annots: ["%l2"] }, { prim: "pair", args: [{ prim: "pair", args: [{ prim: "pair", args: [{ prim: "nat", annots: ["%f1"] }, { prim: "pair", args: [{ prim: "int", annots: ["%f2"] }, { prim: "mutez", annots: ["%f3"] }], annots: [] }], annots: [] }, { prim: "pair", args: [{ prim: "pair", args: [{ prim: "pair", args: [{ prim: "int", annots: [] }, { prim: "nat", annots: [] }], annots: ["%f4"] }, { prim: "bool", annots: ["%f5"] }], annots: [] }, { prim: "pair", args: [{ prim: "bytes", annots: ["%f6"] }, { prim: "pair", args: [{ prim: "string", annots: ["%f7"] }, { prim: "pair", args: [{ prim: "timestamp", annots: ["%f8"] }, { prim: "pair", args: [{ prim: "int", annots: ["%f9"] }, { prim: "pair", args: [{ prim: "address", annots: ["%f10"] }, { prim: "pair", args: [{ prim: "option", args: [{ prim: "nat", annots: [] }], annots: ["%f11"] }, { prim: "pair", args: [{ prim: "list", args: [{ prim: "string", annots: [] }], annots: ["%f12"] }, { prim: "set", args: [{ prim: "pair", args: [{ prim: "string", annots: [] }, { prim: "pair", args: [{ prim: "nat", annots: [] }, { prim: "int", annots: [] }], annots: [] }], annots: [] }], annots: ["%f13"] }], annots: [] }], annots: [] }], annots: [] }], annots: [] }], annots: [] }], annots: [] }], annots: [] }], annots: [] }], annots: ["%r"] }, { prim: "pair", args: [{ prim: "set", args: [{ prim: "address", annots: [] }], annots: ["%just_a_key"] }, { prim: "pair", args: [{ prim: "map", args: [{ prim: "address", annots: [] }, { prim: "nat", annots: [] }], annots: ["%visitor"] }, { prim: "pair", args: [{ prim: "map", args: [{ prim: "address", annots: [] }, { prim: "pair", args: [{ prim: "nat", annots: ["%nb_visits2"] }, { prim: "timestamp", annots: ["%last"] }], annots: [] }], annots: ["%visitor_2"] }, { prim: "pair", args: [{ prim: "or", args: [{ prim: "int", annots: ["%A"] }, { prim: "or", args: [{ prim: "pair", args: [{ prim: "nat", annots: [] }, { prim: "string", annots: [] }], annots: ["%B"] }, { prim: "unit", annots: ["%C"] }], annots: [] }], annots: ["%a_value"] }, { prim: "pair", args: [{ prim: "or", args: [{ prim: "int", annots: ["%A"] }, { prim: "or", args: [{ prim: "pair", args: [{ prim: "nat", annots: [] }, { prim: "string", annots: [] }], annots: ["%B"] }, { prim: "unit", annots: ["%C"] }], annots: [] }], annots: ["%b_value"] }, { prim: "or", args: [{ prim: "int", annots: ["%A"] }, { prim: "or", args: [{ prim: "pair", args: [{ prim: "nat", annots: [] }, { prim: "string", annots: [] }], annots: ["%B"] }, { prim: "unit", annots: ["%C"] }], annots: [] }], annots: ["%c_value"] }], annots: [] }], annots: [] }], annots: [] }], annots: [] }], annots: [] }], annots: [] }], annots: [] }], annots: [] }], annots: [] }], annots: [] }], annots: [] }], annots: [] }], annots: [] }], annots: [] }], annots: [] };
export enum anenum_types {
    A = "A",
    B = "B",
    C = "C"
}
export abstract class anenum extends att.Enum<anenum_types> {
}
export class A extends anenum {
    constructor(private content: att.Int) {
        super(anenum_types.A);
    }
    to_mich() { return att.left_to_mich(this.content.to_mich()); }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    get() { return this.content; }
}
export class B extends anenum {
    constructor(private content: [
        att.Nat,
        string
    ]) {
        super(anenum_types.B);
    }
    to_mich() { return att.right_to_mich(att.left_to_mich(att.pair_to_mich([this.content[0].to_mich(), att.string_to_mich(this.content[1])]))); }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    get() { return this.content; }
}
export class C extends anenum {
    constructor() {
        super(anenum_types.C);
    }
    to_mich() { return att.right_to_mich(att.right_to_mich(att.unit_mich)); }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
}
export const mich_to_anenum = (m: any): anenum => {
    throw new Error("mich_toanenum : complex enum not supported yet");
};
export class all implements att.ArchetypeType {
    constructor(public a: att.Nat, public b: att.Int, public c: att.Tez, public d: att.Rational, public e: boolean, public f: att.Bytes, public g: string, public h: Date, public i: att.Duration, public j: att.Address, public k: att.Option<att.Nat>, public n: Array<string>, public p: Array<[
        string,
        att.Nat,
        att.Int
    ]>) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return att.pair_to_mich([att.pair_to_mich([this.a.to_mich(), att.pair_to_mich([this.b.to_mich(), this.c.to_mich()])]), att.pair_to_mich([att.pair_to_mich([this.d.to_mich(), att.bool_to_mich(this.e)]), att.pair_to_mich([this.f.to_mich(), att.pair_to_mich([att.string_to_mich(this.g), att.pair_to_mich([att.date_to_mich(this.h), att.pair_to_mich([this.i.to_mich(), att.pair_to_mich([this.j.to_mich(), att.pair_to_mich([this.k.to_mich((x => { return x.to_mich(); })), att.pair_to_mich([att.list_to_mich(this.n, x => {
                                                return att.string_to_mich(x);
                                            }), att.list_to_mich(this.p, x => {
                                                return att.pair_to_mich([att.string_to_mich(x[0]), x[1].to_mich(), x[2].to_mich()]);
                                            })])])])])])])])])]);
    }
    equals(v: all): boolean {
        return (this.a.equals(v.a) && this.a.equals(v.a) && this.b.equals(v.b) && this.c.equals(v.c) && this.d.equals(v.d) && this.e == v.e && this.f.equals(v.f) && this.g == v.g && (this.h.getTime() - this.h.getMilliseconds()) == (v.h.getTime() - v.h.getMilliseconds()) && this.i.equals(v.i) && this.j.equals(v.j) && this.k.equals(v.k) && JSON.stringify(this.n) == JSON.stringify(v.n) && JSON.stringify(this.p) == JSON.stringify(v.p));
    }
}
export const all_mich_type: att.MichelineType = att.pair_array_to_mich_type([
    att.pair_array_to_mich_type([
        att.prim_annot_to_mich_type("nat", ["%f1"]),
        att.pair_array_to_mich_type([
            att.prim_annot_to_mich_type("int", ["%f2"]),
            att.prim_annot_to_mich_type("mutez", ["%f3"])
        ], [])
    ], []),
    att.pair_array_to_mich_type([
        att.pair_array_to_mich_type([
            att.pair_array_to_mich_type([
                att.prim_annot_to_mich_type("int", []),
                att.prim_annot_to_mich_type("nat", [])
            ], ["%f4"]),
            att.prim_annot_to_mich_type("bool", ["%f5"])
        ], []),
        att.pair_array_to_mich_type([
            att.prim_annot_to_mich_type("bytes", ["%f6"]),
            att.pair_array_to_mich_type([
                att.prim_annot_to_mich_type("string", ["%f7"]),
                att.pair_array_to_mich_type([
                    att.prim_annot_to_mich_type("timestamp", ["%f8"]),
                    att.pair_array_to_mich_type([
                        att.prim_annot_to_mich_type("int", ["%f9"]),
                        att.pair_array_to_mich_type([
                            att.prim_annot_to_mich_type("address", ["%f10"]),
                            att.pair_array_to_mich_type([
                                att.option_annot_to_mich_type(att.prim_annot_to_mich_type("nat", []), ["%f11"]),
                                att.pair_array_to_mich_type([
                                    att.list_annot_to_mich_type(att.prim_annot_to_mich_type("string", []), ["%f12"]),
                                    att.list_annot_to_mich_type(att.pair_array_to_mich_type([
                                        att.prim_annot_to_mich_type("string", []),
                                        att.pair_array_to_mich_type([
                                            att.prim_annot_to_mich_type("nat", []),
                                            att.prim_annot_to_mich_type("int", [])
                                        ], [])
                                    ], []), ["%f13"])
                                ], [])
                            ], [])
                        ], [])
                    ], [])
                ], [])
            ], [])
        ], [])
    ], [])
], []);
export type just_a_key_key = att.Address;
export type visitor_key = att.Address;
export type visitor_2_key = att.Address;
export const just_a_key_key_mich_type: att.MichelineType = att.prim_annot_to_mich_type("address", []);
export const visitor_key_mich_type: att.MichelineType = att.prim_annot_to_mich_type("address", []);
export const visitor_2_key_mich_type: att.MichelineType = att.prim_annot_to_mich_type("address", []);
export type visitor_value = att.Nat;
export class visitor_2_value implements att.ArchetypeType {
    constructor(public nb_visits2: att.Nat, public last: Date) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return att.pair_to_mich([this.nb_visits2.to_mich(), att.date_to_mich(this.last)]);
    }
    equals(v: visitor_2_value): boolean {
        return (this.nb_visits2.equals(v.nb_visits2) && this.nb_visits2.equals(v.nb_visits2) && (this.last.getTime() - this.last.getMilliseconds()) == (v.last.getTime() - v.last.getMilliseconds()));
    }
}
export const visitor_value_mich_type: att.MichelineType = att.prim_annot_to_mich_type("nat", []);
export const visitor_2_value_mich_type: att.MichelineType = att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("nat", ["%nb_visits2"]),
    att.prim_annot_to_mich_type("timestamp", ["%last"])
], []);
export type just_a_key_container = Array<just_a_key_key>;
export type visitor_container = Array<[
    visitor_key,
    visitor_value
]>;
export type visitor_2_container = Array<[
    visitor_2_key,
    visitor_2_value
]>;
export const just_a_key_container_mich_type: att.MichelineType = att.list_annot_to_mich_type(att.prim_annot_to_mich_type("address", []), []);
export const visitor_container_mich_type: att.MichelineType = att.pair_to_mich_type("map", att.prim_annot_to_mich_type("address", []), att.prim_annot_to_mich_type("nat", []));
export const visitor_2_container_mich_type: att.MichelineType = att.pair_to_mich_type("map", att.prim_annot_to_mich_type("address", []), att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("nat", ["%nb_visits2"]),
    att.prim_annot_to_mich_type("timestamp", ["%last"])
], []));
const myentry_arg_to_mich = (arg: all): att.Micheline => {
    return arg.to_mich();
}
const myentry2_arg_to_mich = (arg: [
    att.Nat,
    string
]): att.Micheline => {
    return att.pair_to_mich([arg[0].to_mich(), att.string_to_mich(arg[1])]);
}
const myentry3_arg_to_mich = (ev: anenum): att.Micheline => {
    return ev.to_mich();
}
const mygetter_arg_to_mich = (): att.Micheline => {
    return att.unit_mich;
}
const view_myview_arg_to_mich = (): att.Micheline => {
    return att.unit_mich;
}
export const deploy_mygetter_callback = async (): Promise<att.DeployResult> => {
    return await ex.deploy_callback("mygetter", att.or_to_mich_type(att.prim_annot_to_mich_type("int", ["%A"]), att.or_to_mich_type(att.pair_array_to_mich_type([
        att.prim_annot_to_mich_type("nat", []),
        att.prim_annot_to_mich_type("string", [])
    ], ["%B"]), att.prim_annot_to_mich_type("unit", ["%C"]), []), []));
};
export class Test_big_record {
    address: string | undefined;
    constructor(address: string | undefined = undefined) {
        this.address = address;
    }
    mygetter_callback_address: string | undefined;
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
    async deploy(owner: att.Address, oa: att.Option<att.Address>, params: Partial<ex.Parameters>) {
        const address = (await ex.deploy("./tests/contracts/test_big_record.arl", {
            owner: owner.to_mich(),
            oa: oa.to_mich((x => { return x.to_mich(); }))
        }, params)).address;
        this.address = address;
        this.mygetter_callback_address = (await deploy_mygetter_callback()).address;
    }
    async myentry(arg: all, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "myentry", myentry_arg_to_mich(arg), params);
        }
        throw new Error("Contract not initialised");
    }
    async myentry2(arg: [
        att.Nat,
        string
    ], params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "myentry2", myentry2_arg_to_mich(arg), params);
        }
        throw new Error("Contract not initialised");
    }
    async myentry3(ev: anenum, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "myentry3", myentry3_arg_to_mich(ev), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_myentry_param(arg: all, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "myentry", myentry_arg_to_mich(arg), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_myentry2_param(arg: [
        att.Nat,
        string
    ], params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "myentry2", myentry2_arg_to_mich(arg), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_myentry3_param(ev: anenum, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "myentry3", myentry3_arg_to_mich(ev), params);
        }
        throw new Error("Contract not initialised");
    }
    async mygetter(params: Partial<ex.Parameters>): Promise<anenum> {
        if (this.address != undefined) {
            if (this.mygetter_callback_address != undefined) {
                const entrypoint = new att.Entrypoint(new att.Address(this.mygetter_callback_address), "callback");
                await ex.call(this.address, "mygetter", att.getter_args_to_mich(mygetter_arg_to_mich(), entrypoint), params);
                return await ex.get_callback_value<anenum>(this.mygetter_callback_address, x => { return mich_to_anenum(x); });
            }
        }
        throw new Error("Contract not initialised");
    }
    async view_myview(params: Partial<ex.Parameters>): Promise<anenum> {
        if (this.address != undefined) {
            const mich = await ex.exec_view(this.get_address(), "myview", view_myview_arg_to_mich(), params);
            return mich_to_anenum(mich.value);
        }
        throw new Error("Contract not initialised");
    }
    async get_owner(): Promise<att.Address> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.mich_to_address(storage.args[0]);
        }
        throw new Error("Contract not initialised");
    }
    async get_oa(): Promise<att.Option<att.Address>> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.mich_to_option(storage.args[1].args[0], x => { return att.mich_to_address(x); });
        }
        throw new Error("Contract not initialised");
    }
    async get_s(): Promise<att.Int> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.mich_to_int(storage.args[1].args[1].args[0]);
        }
        throw new Error("Contract not initialised");
    }
    async get_o(): Promise<att.Option<att.Nat>> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.mich_to_option(storage.args[1].args[1].args[1].args[0], x => { return att.mich_to_nat(x); });
        }
        throw new Error("Contract not initialised");
    }
    async get_l(): Promise<Array<att.Int>> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.mich_to_list(storage.args[1].args[1].args[1].args[1].args[0], x => { return att.mich_to_int(x); });
        }
        throw new Error("Contract not initialised");
    }
    async get_m(): Promise<Array<[
        att.Nat,
        [
            string,
            att.Int
        ]
    ]>> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.mich_to_map(storage.args[1].args[1].args[1].args[1].args[1].args[0], (x, y) => [att.mich_to_nat(x), (p => {
                    const p0 = (p as att.Mpair);
                    return [att.mich_to_string(p0.args[0]), att.mich_to_int(p0.args[1])];
                })(y)]);
        }
        throw new Error("Contract not initialised");
    }
    async get_s1(): Promise<Array<att.Nat>> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.mich_to_list(storage.args[1].args[1].args[1].args[1].args[1].args[1].args[0], x => { return att.mich_to_nat(x); });
        }
        throw new Error("Contract not initialised");
    }
    async get_l1(): Promise<Array<all>> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.mich_to_list(storage.args[1].args[1].args[1].args[1].args[1].args[1].args[1].args[0], x => { return mich_to_all(x, collapsed); });
        }
        throw new Error("Contract not initialised");
    }
    async get_l2(): Promise<Array<Array<all>>> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.mich_to_list(storage.args[1].args[1].args[1].args[1].args[1].args[1].args[1].args[1].args[0], x => { return att.mich_to_list(x, x => { return mich_to_all(x, collapsed); }); });
        }
        throw new Error("Contract not initialised");
    }
    async get_r(): Promise<all> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return mich_to_all(storage.args[1].args[1].args[1].args[1].args[1].args[1].args[1].args[1].args[1].args[0], collapsed);
        }
        throw new Error("Contract not initialised");
    }
    async get_just_a_key(): Promise<just_a_key_container> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return storage.args[1].args[1].args[1].args[1].args[1].args[1].args[1].args[1].args[1].args[1].args[0];
        }
        throw new Error("Contract not initialised");
    }
    async get_visitor(): Promise<visitor_container> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return storage.args[1].args[1].args[1].args[1].args[1].args[1].args[1].args[1].args[1].args[1].args[1].args[0];
        }
        throw new Error("Contract not initialised");
    }
    async get_visitor_2(): Promise<visitor_2_container> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return storage.args[1].args[1].args[1].args[1].args[1].args[1].args[1].args[1].args[1].args[1].args[1].args[1].args[0];
        }
        throw new Error("Contract not initialised");
    }
    async get_a_value(): Promise<anenum> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return mich_to_anenum(storage.args[1].args[1].args[1].args[1].args[1].args[1].args[1].args[1].args[1].args[1].args[1].args[1].args[1].args[0]);
        }
        throw new Error("Contract not initialised");
    }
    async get_b_value(): Promise<anenum> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return mich_to_anenum(storage.args[1].args[1].args[1].args[1].args[1].args[1].args[1].args[1].args[1].args[1].args[1].args[1].args[1].args[1].args[0]);
        }
        throw new Error("Contract not initialised");
    }
    async get_c_value(): Promise<anenum> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return mich_to_anenum(storage.args[1].args[1].args[1].args[1].args[1].args[1].args[1].args[1].args[1].args[1].args[1].args[1].args[1].args[1].args[1]);
        }
        throw new Error("Contract not initialised");
    }
    errors = {
        INVALID_CALLER: att.string_to_mich("\"INVALID_CALLER\""),
        NOT_TO_BE_CALLED: att.string_to_mich("\"NOT_TO_BE_CALLED\"")
    };
}
export const test_big_record = new Test_big_record();
