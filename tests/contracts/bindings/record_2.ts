import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
export class r2 implements att.ArchetypeType {
    constructor(public n: att.Nat, public s: string) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return att.pair_to_mich([this.n.to_mich(), att.string_to_mich(this.s)]);
    }
    equals(v: r2): boolean {
        return (this.n.equals(v.n) && this.n.equals(v.n) && this.s == v.s);
    }
}
export const r2_mich_type: att.MichelineType = att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("nat", ["%n"]),
    att.prim_annot_to_mich_type("string", ["%s"])
], []);
export const mich_to_r2 = (v: att.Micheline, collapsed: boolean = false): r2 => {
    let fields: att.Micheline[] = [];
    if (collapsed) {
        fields = att.mich_to_pairs(v);
    }
    else {
        fields = att.annotated_mich_to_array(v, r2_mich_type);
    }
    return new r2(att.mich_to_nat(fields[0]), att.mich_to_string(fields[1]));
};
const set_value_arg_to_mich = (i: r2): att.Micheline => {
    return i.to_mich();
}
export class Record_2 {
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
        const address = await ex.deploy("./tests/contracts/record_2.arl", {}, params);
        this.address = address;
    }
    async set_value(i: r2, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "set_value", set_value_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_set_value_param(i: r2, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "set_value", set_value_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_res(): Promise<r2> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            return new r2((x => { return new att.Nat(x); })(storage.n), (x => { return x; })(storage.s));
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const record_2 = new Record_2();
