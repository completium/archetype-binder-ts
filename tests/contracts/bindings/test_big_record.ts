import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
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
export const deploy_mygetter_callback = async (): Promise<string> => {
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
        const address = await ex.deploy("./tests/contracts/test_big_record.arl", {
            owner: owner.to_mich(),
            oa: oa.to_mich((x => { return x.to_mich(); }))
        }, params);
        this.address = address;
        this.mygetter_callback_address = await deploy_mygetter_callback();
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
                return await ex.get_callback_value<anenum>(this.mygetter_callback_address, x => { if (x.C !== undefined) {
                    return new C();
                }
                else if (x.B !== undefined) {
                    return new B(((x): [
                        att.Nat,
                        string
                    ] => { return [(x => { return new att.Nat(x); })(x[Object.keys(x)[0]]), (x => { return x; })(x[Object.keys(x)[1]])]; })(x.B));
                }
                else
                    return new A(((x): att.Int => { return new att.Int(x); })(x.A)); });
            }
        }
        throw new Error("Contract not initialised");
    }
    async view_myview(params: Partial<ex.Parameters>): Promise<anenum> {
        if (this.address != undefined) {
            const mich = await ex.exec_view(this.get_address(), "myview", view_myview_arg_to_mich(), params);
            if (mich.C !== undefined) {
                return new C();
            }
            else if (mich.B !== undefined) {
                return new B(((x): [
                    att.Nat,
                    string
                ] => { return [(x => { return new att.Nat(x); })(x[Object.keys(x)[0]]), (x => { return x; })(x[Object.keys(x)[1]])]; })(mich.B));
            }
            else
                return new A(((x): att.Int => { return new att.Int(x); })(mich.A));
        }
        throw new Error("Contract not initialised");
    }
    async get_owner(): Promise<att.Address> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return new att.Address(storage.owner);
        }
        throw new Error("Contract not initialised");
    }
    async get_oa(): Promise<att.Option<att.Address>> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return new att.Option<att.Address>(storage.oa == null ? null : (x => { return new att.Address(x); })(storage.oa));
        }
        throw new Error("Contract not initialised");
    }
    async get_s(): Promise<att.Int> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return new att.Int(storage.s);
        }
        throw new Error("Contract not initialised");
    }
    async get_o(): Promise<att.Option<att.Nat>> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return new att.Option<att.Nat>(storage.o == null ? null : (x => { return new att.Nat(x); })(storage.o));
        }
        throw new Error("Contract not initialised");
    }
    async get_l(): Promise<Array<att.Int>> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            const res: Array<att.Int> = [];
            for (let i = 0; i < storage.l.length; i++) {
                res.push((x => { return new att.Int(x); })(storage.l[i]));
            }
            return res;
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
            let res: Array<[
                att.Nat,
                [
                    string,
                    att.Int
                ]
            ]> = [];
            for (let e of storage.m.entries()) {
                res.push([(x => { return new att.Nat(x); })(e[0]), (x => { return [(x => { return x; })(x[Object.keys(x)[0]]), (x => { return new att.Int(x); })(x[Object.keys(x)[1]])]; })(e[1])]);
            }
            return res;
        }
        throw new Error("Contract not initialised");
    }
    async get_s1(): Promise<Array<att.Nat>> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            const res: Array<att.Nat> = [];
            for (let i = 0; i < storage.s1.length; i++) {
                res.push((x => { return new att.Nat(x); })(storage.s1[i]));
            }
            return res;
        }
        throw new Error("Contract not initialised");
    }
    async get_l1(): Promise<Array<all>> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            const res: Array<all> = [];
            for (let i = 0; i < storage.l1.length; i++) {
                res.push((x => { return new all((x => { return new att.Nat(x); })(x.f1), (x => { return new att.Int(x); })(x.f2), (x => { return new att.Tez(x, "mutez"); })(x.f3), (x => { return new att.Rational(x[Object.keys(x)[0]], x[Object.keys(x)[1]]); })(x.f4), (x => { return x.prim ? (x.prim == "True" ? true : false) : x; })(x.f5), (x => { return new att.Bytes(x); })(x.f6), (x => { return x; })(x.f7), (x => { return new Date(x); })(x.f8), (x => { return new att.Duration(x); })(x.f9), (x => { return new att.Address(x); })(x.f10), (x => { return new att.Option<att.Nat>(x == null ? null : (x => { return new att.Nat(x); })(x)); })(x.f11), (x => { const res: Array<string> = []; for (let i = 0; i < x.length; i++) {
                    res.push((x => { return x; })(x[i]));
                } return res; })(x.f12), (x => { const res: Array<[
                    string,
                    att.Nat,
                    att.Int
                ]> = []; for (let i = 0; i < x.length; i++) {
                    res.push((x => { return [(x => { return x; })(x[Object.keys(x)[0]]), (x => { return new att.Nat(x); })(x[Object.keys(x)[1]]), (x => { return new att.Int(x); })(x[Object.keys(x)[2]])]; })(x[i]));
                } return res; })(x.f13)); })(storage.l1[i]));
            }
            return res;
        }
        throw new Error("Contract not initialised");
    }
    async get_l2(): Promise<Array<Array<all>>> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            const res: Array<Array<all>> = [];
            for (let i = 0; i < storage.l2.length; i++) {
                res.push((x => { const res: Array<all> = []; for (let i = 0; i < x.length; i++) {
                    res.push((x => { return new all((x => { return new att.Nat(x); })(x.f1), (x => { return new att.Int(x); })(x.f2), (x => { return new att.Tez(x, "mutez"); })(x.f3), (x => { return new att.Rational(x[Object.keys(x)[0]], x[Object.keys(x)[1]]); })(x.f4), (x => { return x.prim ? (x.prim == "True" ? true : false) : x; })(x.f5), (x => { return new att.Bytes(x); })(x.f6), (x => { return x; })(x.f7), (x => { return new Date(x); })(x.f8), (x => { return new att.Duration(x); })(x.f9), (x => { return new att.Address(x); })(x.f10), (x => { return new att.Option<att.Nat>(x == null ? null : (x => { return new att.Nat(x); })(x)); })(x.f11), (x => { const res: Array<string> = []; for (let i = 0; i < x.length; i++) {
                        res.push((x => { return x; })(x[i]));
                    } return res; })(x.f12), (x => { const res: Array<[
                        string,
                        att.Nat,
                        att.Int
                    ]> = []; for (let i = 0; i < x.length; i++) {
                        res.push((x => { return [(x => { return x; })(x[Object.keys(x)[0]]), (x => { return new att.Nat(x); })(x[Object.keys(x)[1]]), (x => { return new att.Int(x); })(x[Object.keys(x)[2]])]; })(x[i]));
                    } return res; })(x.f13)); })(x[i]));
                } return res; })(storage.l2[i]));
            }
            return res;
        }
        throw new Error("Contract not initialised");
    }
    async get_r(): Promise<all> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return new all((x => { return new att.Nat(x); })(storage.r.f1), (x => { return new att.Int(x); })(storage.r.f2), (x => { return new att.Tez(x, "mutez"); })(storage.r.f3), (x => { return new att.Rational(x[Object.keys(x)[0]], x[Object.keys(x)[1]]); })(storage.r.f4), (x => { return x.prim ? (x.prim == "True" ? true : false) : x; })(storage.r.f5), (x => { return new att.Bytes(x); })(storage.r.f6), (x => { return x; })(storage.r.f7), (x => { return new Date(x); })(storage.r.f8), (x => { return new att.Duration(x); })(storage.r.f9), (x => { return new att.Address(x); })(storage.r.f10), (x => { return new att.Option<att.Nat>(x == null ? null : (x => { return new att.Nat(x); })(x)); })(storage.r.f11), (x => { const res: Array<string> = []; for (let i = 0; i < x.length; i++) {
                res.push((x => { return x; })(x[i]));
            } return res; })(storage.r.f12), (x => { const res: Array<[
                string,
                att.Nat,
                att.Int
            ]> = []; for (let i = 0; i < x.length; i++) {
                res.push((x => { return [(x => { return x; })(x[Object.keys(x)[0]]), (x => { return new att.Nat(x); })(x[Object.keys(x)[1]]), (x => { return new att.Int(x); })(x[Object.keys(x)[2]])]; })(x[i]));
            } return res; })(storage.r.f13));
        }
        throw new Error("Contract not initialised");
    }
    async get_just_a_key(): Promise<just_a_key_container> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            const res: Array<att.Address> = [];
            for (let i = 0; i < storage.just_a_key.length; i++) {
                res.push((x => { return new att.Address(x); })(storage.just_a_key[i]));
            }
            return res;
        }
        throw new Error("Contract not initialised");
    }
    async get_visitor(): Promise<visitor_container> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            let res: Array<[
                att.Address,
                att.Nat
            ]> = [];
            for (let e of storage.visitor.entries()) {
                res.push([(x => { return new att.Address(x); })(e[0]), (x => { return new att.Nat(x); })(e[1])]);
            }
            return res;
        }
        throw new Error("Contract not initialised");
    }
    async get_visitor_2(): Promise<visitor_2_container> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            let res: Array<[
                att.Address,
                visitor_2_value
            ]> = [];
            for (let e of storage.visitor_2.entries()) {
                res.push([(x => { return new att.Address(x); })(e[0]), (x => { return new visitor_2_value((x => { return new att.Nat(x); })(x.nb_visits2), (x => { return new Date(x); })(x.last)); })(e[1])]);
            }
            return res;
        }
        throw new Error("Contract not initialised");
    }
    async get_a_value(): Promise<anenum> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            if (storage.a_value.C !== undefined) {
                return new C();
            }
            else if (storage.a_value.B !== undefined) {
                return new B(((x): [
                    att.Nat,
                    string
                ] => { return [(x => { return new att.Nat(x); })(x[Object.keys(x)[0]]), (x => { return x; })(x[Object.keys(x)[1]])]; })(storage.a_value.B));
            }
            else
                return new A(((x): att.Int => { return new att.Int(x); })(storage.a_value.A));
        }
        throw new Error("Contract not initialised");
    }
    async get_b_value(): Promise<anenum> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            if (storage.b_value.C !== undefined) {
                return new C();
            }
            else if (storage.b_value.B !== undefined) {
                return new B(((x): [
                    att.Nat,
                    string
                ] => { return [(x => { return new att.Nat(x); })(x[Object.keys(x)[0]]), (x => { return x; })(x[Object.keys(x)[1]])]; })(storage.b_value.B));
            }
            else
                return new A(((x): att.Int => { return new att.Int(x); })(storage.b_value.A));
        }
        throw new Error("Contract not initialised");
    }
    async get_c_value(): Promise<anenum> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            if (storage.c_value.C !== undefined) {
                return new C();
            }
            else if (storage.c_value.B !== undefined) {
                return new B(((x): [
                    att.Nat,
                    string
                ] => { return [(x => { return new att.Nat(x); })(x[Object.keys(x)[0]]), (x => { return x; })(x[Object.keys(x)[1]])]; })(storage.c_value.B));
            }
            else
                return new A(((x): att.Int => { return new att.Int(x); })(storage.c_value.A));
        }
        throw new Error("Contract not initialised");
    }
    errors = {
        INVALID_CALLER: att.string_to_mich("\"INVALID_CALLER\""),
        NOT_TO_BE_CALLED: att.string_to_mich("\"NOT_TO_BE_CALLED\"")
    };
}
export const test_big_record = new Test_big_record();
