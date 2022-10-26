import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
export const storage_type: att.MichelineType = { prim: "map", args: [{ prim: "string", annots: [] }, { prim: "pair", args: [{ prim: "string", annots: ["%name"] }, { prim: "nat", annots: ["%nbvisits"] }], annots: [] }], annots: [] };
export type visitor_key = string;
export const visitor_key_mich_type: att.MichelineType = att.prim_annot_to_mich_type("string", []);
export class visitor_value implements att.ArchetypeType {
    constructor(public name: string, public nbvisits: att.Nat) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return att.pair_to_mich([att.string_to_mich(this.name), this.nbvisits.to_mich()]);
    }
    equals(v: visitor_value): boolean {
        return (this.name == v.name && this.name == v.name && this.nbvisits.equals(v.nbvisits));
    }
}
export const visitor_value_mich_type: att.MichelineType = att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("string", ["%name"]),
    att.prim_annot_to_mich_type("nat", ["%nbvisits"])
], []);
export type visitor_container = Array<[
    visitor_key,
    visitor_value
]>;
export const visitor_container_mich_type: att.MichelineType = att.pair_to_mich_type("map", att.prim_annot_to_mich_type("string", []), att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("string", ["%name"]),
    att.prim_annot_to_mich_type("nat", ["%nbvisits"])
], []));
const register_arg_to_mich = (l: string, n: string): att.Micheline => {
    return att.pair_to_mich([
        att.string_to_mich(l),
        att.string_to_mich(n)
    ]);
}
const visit_arg_to_mich = (l: string): att.Micheline => {
    return att.string_to_mich(l);
}
export class Training_visitors {
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
        const address = (await ex.deploy("./tests/contracts/training_visitors.arl", {}, params)).address;
        this.address = address;
    }
    async register(l: string, n: string, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "register", register_arg_to_mich(l, n), params);
        }
        throw new Error("Contract not initialised");
    }
    async visit(l: string, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "visit", visit_arg_to_mich(l), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_register_param(l: string, n: string, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "register", register_arg_to_mich(l, n), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_visit_param(l: string, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "visit", visit_arg_to_mich(l), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_visitor(): Promise<visitor_container> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return storage;
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const training_visitors = new Training_visitors();
