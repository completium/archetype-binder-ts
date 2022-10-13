import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
export enum enum_simple_types {
    e_1 = "e_1",
    e_2 = "e_2",
    e_3 = "e_3"
}
export abstract class enum_simple extends att.Enum<enum_simple_types> {
}
export class e_1 extends enum_simple {
    constructor() {
        super(enum_simple_types.e_1);
    }
    to_mich() { return new att.Nat(0).to_mich(); }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
}
export class e_2 extends enum_simple {
    constructor() {
        super(enum_simple_types.e_2);
    }
    to_mich() { return new att.Nat(1).to_mich(); }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
}
export class e_3 extends enum_simple {
    constructor() {
        super(enum_simple_types.e_3);
    }
    to_mich() { return new att.Nat(2).to_mich(); }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
}
export const mich_to_enum_simple = (m: any): enum_simple => {
    const v = (new att.Nat(m)).to_big_number().toNumber();
    switch (v) {
        case 0: return new e_1();
        case 1: return new e_2();
        case 2: return new e_3();
        default: throw new Error("mich_to_asset_type : invalid value " + v);
    }
};
const set_value_arg_to_mich = (i: enum_simple): att.Micheline => {
    return i.to_mich();
}
export class Type_map_key_enum_simple {
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
        const address = await ex.deploy("./tests/contracts/type_map_key_enum_simple.arl", {}, params);
        this.address = address;
    }
    async set_value(i: enum_simple, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "set_value", set_value_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_set_value_param(i: enum_simple, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "set_value", set_value_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_res(): Promise<Array<[
        enum_simple,
        att.Nat
    ]>> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            let res: Array<[
                enum_simple,
                att.Nat
            ]> = [];
            for (let e of storage.entries()) {
                res.push([(x => { if (x.e_3 !== undefined) {
                        return new e_3();
                    }
                    else if (x.e_2 !== undefined) {
                        return new e_2();
                    }
                    else
                        return new e_1(); })(e[0]), (x => { return new att.Nat(x); })(e[1])]);
            }
            return res;
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const type_map_key_enum_simple = new Type_map_key_enum_simple();
