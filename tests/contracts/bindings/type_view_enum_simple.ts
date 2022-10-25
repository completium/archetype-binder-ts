import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
export enum e_enum_types {
    e_1 = "e_1",
    e_2 = "e_2",
    e_3 = "e_3"
}
export abstract class e_enum extends att.Enum<e_enum_types> {
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
    const v = (new att.Nat(m)).to_big_number().toNumber();
    switch (v) {
        case 0: return new e_1();
        case 1: return new e_2();
        case 2: return new e_3();
        default: throw new Error("mich_to_asset_type : invalid value " + v);
    }
};
const view_get_value_arg_to_mich = (i: e_enum): att.Micheline => {
    return i.to_mich();
}
export class Type_view_enum_simple {
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
        const address = (await ex.deploy("./tests/contracts/type_view_enum_simple.arl", {}, params)).address;
        this.address = address;
    }
    async view_get_value(i: e_enum, params: Partial<ex.Parameters>): Promise<e_enum> {
        if (this.address != undefined) {
            const mich = await ex.exec_view(this.get_address(), "get_value", view_get_value_arg_to_mich(i), params);
            if (mich == "2" || (mich.toNumber ? mich.toNumber() == 2 : false)) {
                return new e_3();
            }
            else if (mich == "1" || (mich.toNumber ? mich.toNumber() == 1 : false)) {
                return new e_2();
            }
            else
                return new e_1();
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const type_view_enum_simple = new Type_view_enum_simple();
