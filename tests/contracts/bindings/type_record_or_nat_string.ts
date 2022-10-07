import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
export class my_record implements att.ArchetypeType {
    constructor(public n: att.Nat, public v: att.Or<att.Nat, string>, public s: string) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return att.pair_to_mich([this.n.to_mich(), att.pair_to_mich([this.v.to_mich(), att.string_to_mich(this.s)])]);
    }
    equals(v: my_record): boolean {
        return (this.n.equals(v.n) && this.n.equals(v.n) && this.v == v.v && this.s == v.s);
    }
}
export const my_record_mich_type: att.MichelineType = att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("nat", ["%n"]),
    att.pair_array_to_mich_type([
        att.or_to_mich_type(att.prim_annot_to_mich_type("nat", []), att.prim_annot_to_mich_type("string", []), ["%v"]),
        att.prim_annot_to_mich_type("string", ["%s"])
    ], [])
], []);
const set_value_arg_to_mich = (i: my_record): att.Micheline => {
    return i.to_mich();
}
export class Type_record_or_nat_string {
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
        const address = await ex.deploy("./tests/contracts/type_record_or_nat_string.arl", {}, params);
        this.address = address;
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
            return new my_record((x => { return new att.Nat(x); })(storage.n), (x => { return (x => {
                const is_left = x["0"] !== undefined;
                const value = is_left ? (x => { return new att.Nat(x["0"]); })(x["0"]) : (x => { return x["1"]; })(x["1"]);
                return new att.Or<att.Nat, string>(value, is_left);
            })(storage); })(storage.v), (x => { return x; })(storage.s));
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const type_record_or_nat_string = new Type_record_or_nat_string();