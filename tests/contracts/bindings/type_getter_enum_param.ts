import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
export enum e_enum_types {
    e_1 = "e_1",
    e_2 = "e_2",
    e_3 = "e_3",
    e_4 = "e_4"
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
    to_mich() { return att.left_to_mich(att.unit_mich); }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
}
export class e_2 extends e_enum {
    constructor(private content: att.Nat) {
        super(e_enum_types.e_2);
    }
    to_mich() { return att.right_to_mich(att.left_to_mich(this.content.to_mich())); }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    get() { return this.content; }
}
export class e_3 extends e_enum {
    constructor(private content: string) {
        super(e_enum_types.e_3);
    }
    to_mich() { return att.right_to_mich(att.right_to_mich(att.left_to_mich(att.string_to_mich(this.content)))); }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    get() { return this.content; }
}
export class e_4 extends e_enum {
    constructor(private content: [
        att.Bytes,
        boolean
    ]) {
        super(e_enum_types.e_4);
    }
    to_mich() { return att.right_to_mich(att.right_to_mich(att.right_to_mich(att.pair_to_mich([this.content[0].to_mich(), att.bool_to_mich(this.content[1])])))); }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    get() { return this.content; }
}
export const mich_to_e_enum = (m: att.Micheline): e_enum => {
    if ((m as att.Msingle).prim == "Left") {
        return new e_1();
    }
    if (((m as att.Msingle).args[0] as att.Msingle).prim == "Left") {
        return new e_2(att.Nat.from_mich(((m as att.Msingle).args[0] as att.Msingle).args[0]));
    }
    if ((((m as att.Msingle).args[0] as att.Msingle).args[0] as att.Msingle).prim == "Left") {
        return new e_3(att.mich_to_string((((m as att.Msingle).args[0] as att.Msingle).args[0] as att.Msingle).args[0]));
    }
    if ((((m as att.Msingle).args[0] as att.Msingle).args[0] as att.Msingle).prim == "Right") {
        return new e_4((p => {
            return [att.Bytes.from_mich((p as att.Mpair).args[0]), att.mich_to_bool((p as att.Mpair).args[1])];
        })((((m as att.Msingle).args[0] as att.Msingle).args[0] as att.Msingle).args[0]));
    }
    throw new Error("mich_to_e_enum : invalid micheline");
};
const get_value_arg_to_mich = (i: e_enum): att.Micheline => {
    return i.to_mich();
}
export const deploy_get_value_callback = async (params: Partial<ex.Parameters>): Promise<att.DeployResult> => {
    return await ex.deploy_callback("get_value", att.or_to_mich_type(att.prim_annot_to_mich_type("unit", ["%e_1"]), att.or_to_mich_type(att.prim_annot_to_mich_type("nat", ["%e_2"]), att.or_to_mich_type(att.prim_annot_to_mich_type("string", ["%e_3"]), att.pair_array_to_mich_type([
        att.prim_annot_to_mich_type("bytes", []),
        att.prim_annot_to_mich_type("bool", [])
    ], ["%e_4"]), []), []), []), params);
};
export class Type_getter_enum_param {
    address: string | undefined;
    constructor(address: string | undefined = undefined) {
        this.address = address;
    }
    get_value_callback_address: string | undefined;
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
        const address = (await ex.deploy("./tests/contracts/type_getter_enum_param.arl", {}, params)).address;
        this.address = address;
        this.get_value_callback_address = (await deploy_get_value_callback(params)).address;
    }
    async get_value(i: e_enum, params: Partial<ex.Parameters>): Promise<e_enum> {
        if (this.address != undefined) {
            if (this.get_value_callback_address != undefined) {
                const entrypoint = new att.Entrypoint(new att.Address(this.get_value_callback_address), "callback");
                await ex.call(this.address, "get_value", att.getter_args_to_mich(get_value_arg_to_mich(i), entrypoint), params);
                return await ex.get_callback_value<e_enum>(this.get_value_callback_address, x => { return mich_to_e_enum(x); });
            }
        }
        throw new Error("Contract not initialised");
    }
    async get_res(): Promise<e_enum> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return mich_to_e_enum(storage);
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const type_getter_enum_param = new Type_getter_enum_param();
