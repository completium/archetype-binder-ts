import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
export class my_record implements att.ArchetypeType {
    constructor(public n: att.Nat, public v: Array<[
        att.Nat,
        string
    ]>, public s: string) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return att.pair_to_mich([this.n.to_mich(), att.pair_to_mich([att.list_to_mich(this.v, x => {
                    const x_key = x[0];
                    const x_value = x[1];
                    return att.elt_to_mich(x_key.to_mich(), att.string_to_mich(x_value));
                }), att.string_to_mich(this.s)])]);
    }
    equals(v: my_record): boolean {
        return (this.n.equals(v.n) && this.n.equals(v.n) && JSON.stringify(this.v) == JSON.stringify(v.v) && this.s == v.s);
    }
}
export const my_record_mich_type: att.MichelineType = att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("nat", ["%n"]),
    att.pair_array_to_mich_type([
        att.pair_to_mich_type("map", att.prim_annot_to_mich_type("nat", []), att.prim_annot_to_mich_type("string", [])),
        att.prim_annot_to_mich_type("string", ["%s"])
    ], [])
], []);
const set_value_arg_to_mich = (i: my_record): att.Micheline => {
    return i.to_mich();
}
export class Type_record_map_nat_string {
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
        const res = await ex.deploy("./tests/contracts/type_record_map_nat_string.arl", {}, params);
        this.address = res.address;
    }
    async set_value(i: my_record, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "set_value", set_value_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_set_value_param(i: my_record, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "set_value", set_value_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_res(): Promise<my_record> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            return new my_record((x => { return new att.Nat(x); })(storage.n), (x => { let res: Array<[
                att.Nat,
                string
            ]> = []; for (let e of x.entries()) {
                res.push([(x => { return new att.Nat(x); })(e[0]), (x => { return x; })(e[1])]);
            } return res; })(storage.v), (x => { return x; })(storage.s));
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const type_record_map_nat_string = new Type_record_map_nat_string();
