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
    to_mich() { return new att.Int(0).to_mich(); }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
}
export class e_2 extends e_enum {
    constructor() {
        super(e_enum_types.e_2);
    }
    to_mich() { return new att.Int(1).to_mich(); }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
}
export class e_3 extends e_enum {
    constructor() {
        super(e_enum_types.e_3);
    }
    to_mich() { return new att.Int(2).to_mich(); }
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
const set_value_arg_to_mich = (i: att.Option<e_enum>): att.Micheline => {
    return i.to_mich((x => { return x.to_mich(); }));
}
export class Type_option_enum_simple {
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
        const address = (await ex.deploy("./tests/contracts/type_option_enum_simple.arl", {}, params)).address;
        this.address = address;
    }
    async set_value(i: att.Option<e_enum>, params: Partial<ex.Parameters>): Promise<att.CallResult> {
        if (this.address != undefined) {
            return await ex.call(this.address, "set_value", set_value_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_set_value_param(i: att.Option<e_enum>, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "set_value", set_value_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_res(): Promise<att.Option<e_enum>> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.mich_to_option(storage, x => { return mich_to_e_enum(x); });
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const type_option_enum_simple = new Type_option_enum_simple();
