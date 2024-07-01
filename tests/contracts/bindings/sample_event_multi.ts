import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
import * as el from "@completium/event-listener";
export class e1 implements att.ArchetypeType {
    constructor(public a1: att.Nat) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return this.a1.to_mich();
    }
    equals(v: e1): boolean {
        return this.a1.equals(v.a1);
    }
    static from_mich(input: att.Micheline): e1 {
        return new e1(att.Nat.from_mich(input));
    }
}
export class e2 implements att.ArchetypeType {
    constructor(public a1: att.Nat, public b2: string) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return att.pair_to_mich([this.a1.to_mich(), att.string_to_mich(this.b2)]);
    }
    equals(v: e2): boolean {
        return att.micheline_equals(this.to_mich(), v.to_mich());
    }
    static from_mich(input: att.Micheline): e2 {
        return new e2(att.Nat.from_mich((input as att.Mpair).args[0]), att.mich_to_string((input as att.Mpair).args[1]));
    }
}
export class e3 implements att.ArchetypeType {
    constructor(public a3: att.Nat, public b3: string, public c3: att.Bytes) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return att.pair_to_mich([this.a3.to_mich(), att.string_to_mich(this.b3), this.c3.to_mich()]);
    }
    equals(v: e3): boolean {
        return att.micheline_equals(this.to_mich(), v.to_mich());
    }
    static from_mich(input: att.Micheline): e3 {
        return new e3(att.Nat.from_mich((input as att.Mpair).args[0]), att.mich_to_string(((input as att.Mpair).args[1] as att.Mpair).args[0]), att.Bytes.from_mich(((input as att.Mpair).args[1] as att.Mpair).args[1]));
    }
}
export class e4 implements att.ArchetypeType {
    constructor(public a4: att.Nat, public b4: string, public c4: att.Bytes, public d4: att.Int) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return att.pair_to_mich([this.a4.to_mich(), att.string_to_mich(this.b4), this.c4.to_mich(), this.d4.to_mich()]);
    }
    equals(v: e4): boolean {
        return att.micheline_equals(this.to_mich(), v.to_mich());
    }
    static from_mich(input: att.Micheline): e4 {
        return new e4(att.Nat.from_mich(input[0]), att.mich_to_string(input[1]), att.Bytes.from_mich(input[2]), att.Int.from_mich(input[3]));
    }
}
export class e5 implements att.ArchetypeType {
    constructor(public a5: att.Nat, public b5: string, public c5: att.Bytes, public d5: att.Int, public f5: att.Address) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return att.pair_to_mich([this.a5.to_mich(), att.string_to_mich(this.b5), this.c5.to_mich(), this.d5.to_mich(), this.f5.to_mich()]);
    }
    equals(v: e5): boolean {
        return att.micheline_equals(this.to_mich(), v.to_mich());
    }
    static from_mich(input: att.Micheline): e5 {
        return new e5(att.Nat.from_mich(input[0]), att.mich_to_string(input[1]), att.Bytes.from_mich(input[2]), att.Int.from_mich(input[3]), att.Address.from_mich(input[4]));
    }
}
export class e6 implements att.ArchetypeType {
    constructor(public a6: att.Nat, public b6: string, public c6: att.Bytes, public d6: att.Int, public f6: att.Address, public g6: att.Key) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return att.pair_to_mich([this.a6.to_mich(), att.string_to_mich(this.b6), this.c6.to_mich(), this.d6.to_mich(), this.f6.to_mich(), this.g6.to_mich()]);
    }
    equals(v: e6): boolean {
        return att.micheline_equals(this.to_mich(), v.to_mich());
    }
    static from_mich(input: att.Micheline): e6 {
        return new e6(att.Nat.from_mich(input[0]), att.mich_to_string(input[1]), att.Bytes.from_mich(input[2]), att.Int.from_mich(input[3]), att.Address.from_mich(input[4]), att.Key.from_mich(input[5]));
    }
}
const entry_1_arg_to_mich = (e: e1): att.Micheline => {
    return e.to_mich();
}
const entry_2_arg_to_mich = (e: e2): att.Micheline => {
    return e.to_mich();
}
const entry_3_arg_to_mich = (e: e3): att.Micheline => {
    return e.to_mich();
}
const entry_4_arg_to_mich = (e: e4): att.Micheline => {
    return e.to_mich();
}
const entry_5_arg_to_mich = (e: e5): att.Micheline => {
    return e.to_mich();
}
const entry_6_arg_to_mich = (e: e6): att.Micheline => {
    return e.to_mich();
}
export class Sample_event_multi {
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
        const address = (await ex.deploy("./tests/contracts/sample_event_multi.arl", {}, params)).address;
        this.address = address;
    }
    async entry_1(e: e1, params: Partial<ex.Parameters>): Promise<att.CallResult> {
        if (this.address != undefined) {
            return await ex.call(this.address, "entry_1", entry_1_arg_to_mich(e), params);
        }
        throw new Error("Contract not initialised");
    }
    async entry_2(e: e2, params: Partial<ex.Parameters>): Promise<att.CallResult> {
        if (this.address != undefined) {
            return await ex.call(this.address, "entry_2", entry_2_arg_to_mich(e), params);
        }
        throw new Error("Contract not initialised");
    }
    async entry_3(e: e3, params: Partial<ex.Parameters>): Promise<att.CallResult> {
        if (this.address != undefined) {
            return await ex.call(this.address, "entry_3", entry_3_arg_to_mich(e), params);
        }
        throw new Error("Contract not initialised");
    }
    async entry_4(e: e4, params: Partial<ex.Parameters>): Promise<att.CallResult> {
        if (this.address != undefined) {
            return await ex.call(this.address, "entry_4", entry_4_arg_to_mich(e), params);
        }
        throw new Error("Contract not initialised");
    }
    async entry_5(e: e5, params: Partial<ex.Parameters>): Promise<att.CallResult> {
        if (this.address != undefined) {
            return await ex.call(this.address, "entry_5", entry_5_arg_to_mich(e), params);
        }
        throw new Error("Contract not initialised");
    }
    async entry_6(e: e6, params: Partial<ex.Parameters>): Promise<att.CallResult> {
        if (this.address != undefined) {
            return await ex.call(this.address, "entry_6", entry_6_arg_to_mich(e), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_entry_1_param(e: e1, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "entry_1", entry_1_arg_to_mich(e), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_entry_2_param(e: e2, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "entry_2", entry_2_arg_to_mich(e), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_entry_3_param(e: e3, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "entry_3", entry_3_arg_to_mich(e), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_entry_4_param(e: e4, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "entry_4", entry_4_arg_to_mich(e), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_entry_5_param(e: e5, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "entry_5", entry_5_arg_to_mich(e), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_entry_6_param(e: e6, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "entry_6", entry_6_arg_to_mich(e), params);
        }
        throw new Error("Contract not initialised");
    }
    register_e1(ep: el.EventProcessor<e1>) {
        if (this.address != undefined) {
            el.registerEvent({ source: this.address, filter: tag => { return tag == "e1"; }, process: (raw: any, data: el.EventData | undefined) => {
                    const event = (x => {
                        return e1.from_mich((att.normalize(x) as att.Micheline));
                    })(raw);
                    ep(event, data);
                } });
            return;
        }
        throw new Error("Contract not initialised");
    }
    register_e2(ep: el.EventProcessor<e2>) {
        if (this.address != undefined) {
            el.registerEvent({ source: this.address, filter: tag => { return tag == "e2"; }, process: (raw: any, data: el.EventData | undefined) => {
                    const event = (x => {
                        return e2.from_mich((att.normalize(x) as att.Micheline));
                    })(raw);
                    ep(event, data);
                } });
            return;
        }
        throw new Error("Contract not initialised");
    }
    register_e3(ep: el.EventProcessor<e3>) {
        if (this.address != undefined) {
            el.registerEvent({ source: this.address, filter: tag => { return tag == "e3"; }, process: (raw: any, data: el.EventData | undefined) => {
                    const event = (x => {
                        return e3.from_mich((att.normalize(x) as att.Micheline));
                    })(raw);
                    ep(event, data);
                } });
            return;
        }
        throw new Error("Contract not initialised");
    }
    register_e4(ep: el.EventProcessor<e4>) {
        if (this.address != undefined) {
            el.registerEvent({ source: this.address, filter: tag => { return tag == "e4"; }, process: (raw: any, data: el.EventData | undefined) => {
                    const event = (x => {
                        return e4.from_mich((att.normalize(x) as att.Micheline));
                    })(raw);
                    ep(event, data);
                } });
            return;
        }
        throw new Error("Contract not initialised");
    }
    register_e5(ep: el.EventProcessor<e5>) {
        if (this.address != undefined) {
            el.registerEvent({ source: this.address, filter: tag => { return tag == "e5"; }, process: (raw: any, data: el.EventData | undefined) => {
                    const event = (x => {
                        return e5.from_mich((att.normalize(x) as att.Micheline));
                    })(raw);
                    ep(event, data);
                } });
            return;
        }
        throw new Error("Contract not initialised");
    }
    register_e6(ep: el.EventProcessor<e6>) {
        if (this.address != undefined) {
            el.registerEvent({ source: this.address, filter: tag => { return tag == "e6"; }, process: (raw: any, data: el.EventData | undefined) => {
                    const event = (x => {
                        return e6.from_mich((att.normalize(x) as att.Micheline));
                    })(raw);
                    ep(event, data);
                } });
            return;
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const sample_event_multi = new Sample_event_multi();
