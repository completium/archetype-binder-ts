import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
export enum e_enum_types {
    e_1 = "e_1",
    e_2 = "e_2",
    e_3 = "e_3"
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
    to_mich() { return new att.Nat(0).to_mich(); }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
}
export class e_2 extends e_enum {
    constructor() {
        super(e_enum_types.e_2);
    }
    to_mich() { return new att.Nat(1).to_mich(); }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
}
export class e_3 extends e_enum {
    constructor() {
        super(e_enum_types.e_3);
    }
    to_mich() { return new att.Nat(2).to_mich(); }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
}
export const mich_to_e_enum = (m: any): e_enum => {
    const v = (new att.Nat((m as att.Mint).int)).to_big_number().toNumber();
    switch (v) {
        case 0: return new e_1();
        case 1: return new e_2();
        case 2: return new e_3();
        default: throw new Error("mich_to_asset_type : invalid value " + v);
    }
};
export class my_record implements att.ArchetypeType {
    constructor(public n: att.Nat, public v: e_enum, public s: string) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return att.pair_to_mich([this.n.to_mich(), this.v.to_mich(), att.string_to_mich(this.s)]);
    }
    equals(v: my_record): boolean {
        return att.micheline_equals(this.to_mich(), v.to_mich());
    }
    static from_mich(input: att.Micheline): my_record {
        return new my_record(att.mich_to_nat((input as att.Mpair).args[0]), mich_to_e_enum((input as att.Mpair).args[1]), att.mich_to_string((input as att.Mpair).args[2]));
    }
}
export const my_record_mich_type: att.MichelineType = att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("nat", ["%n"]),
    att.prim_annot_to_mich_type("int", ["%v"]),
    att.prim_annot_to_mich_type("string", ["%s"])
], []);
const set_value_arg_to_mich = (i: my_record): att.Micheline => {
    return i.to_mich();
}
export class Type_record_enum_simple {
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
        const address = (await ex.deploy("./tests/contracts/type_record_enum_simple.arl", {}, params)).address;
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
            const storage = await ex.get_raw_storage(this.address);
            return my_record.from_mich(storage);
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const type_record_enum_simple = new Type_record_enum_simple();
