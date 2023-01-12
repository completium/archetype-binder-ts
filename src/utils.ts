import ts, { factory, KeywordTypeNode, Path, SyntaxKind } from "typescript";

export type ATSimple = {
  node: "address" | "bls12_381_fr" | "bls12_381_g1" | "bls12_381_g2" | "bool" | "bytes" | "chain_id" | "chest_key" | "chest" | "currency" | "date" | "duration" | "int" | "key_hash" | "key" | "nat" | "never" | "operation" | "rational" | "signature" | "state" | "string" | "timestamp" | "tx_rollup_l2_address" | "unit"
}

export type ATSapling = {
  node: "sapling_state" | "sapling_transaction"
  memo_size: number
}

export type ATNamed = {
  node: "aggregate" | "asset_container" | "asset_key" | "asset_value" | "asset_view" | "asset" | "collection" | "enum" | "event" | "partition" | "record"
  name: string
}

export type ATSingle = {
  node: "contract" | "list" | "option" | "set" | "ticket"
  arg: ArchetypeType
}

export type ATMap = {
  node: "big_map" | "iterable_big_map" | "map"
  key_type: ArchetypeType
  value_type: ArchetypeType
}

export type ATOr = {
  node: "or"
  left_type: ArchetypeType
  right_type: ArchetypeType
}

export type ATLambda = {
  node: "lambda"
  arg_type: ArchetypeType
  ret_type: ArchetypeType
}

export type ATTuple = {
  "node": "tuple"
  "args": Array<ArchetypeType>
}

export type ArchetypeType = ATSimple | ATSapling | ATNamed | ATSingle | ATMap | ATOr | ATLambda | ATTuple

export type RawArchetypeType = {
  node: "address" | "aggregate" | "asset_container" | "asset_key" | "asset_value" | "asset_view" | "asset" | "big_map" | "bls12_381_fr" | "bls12_381_g1" | "bls12_381_g2" | "bool" | "bytes" | "chain_id" | "chest_key" | "chest" | "collection" | "contract" | "currency" | "date" | "duration" | "enum" | "event" | "int" | "iterable_big_map" | "key_hash" | "key" | "lambda" | "list" | "map" | "nat" | "never" | "operation" | "option" | "or" | "partition" | "rational" | "record" | "sapling_state" | "sapling_transaction" | "set" | "signature" | "state" | "string" | "ticket" | "timestamp" | "tuple" | "tx_rollup_l2_address" | "unit"
  name: string | null
  int_value: number | null
  args: Array<RawArchetypeType>
}

export type MTPrimSimple = {
  prim: "address" | "bls12_381_fr" | "bls12_381_g1" | "bls12_381_g2" | "bool" | "bytes" | "chain_id" | "chest_key" | "chest" | "int" | "key_hash" | "key" | "mutez" | "nat" | "never" | "operation" | "signature" | "string" | "timestamp" | "tx_rollup_l2_address" | "unit"
  annots?: Array<string>
}

export type MTPrimSingle = {
  prim: "contract" | "list" | "option" | "set" | "ticket"
  annots?: Array<string>
  args: [MichelsonType]
}

export type MTPrimSingleInt = {
  prim: "sapling_state" | "sapling_transaction"
  annots?: Array<string>
  args: [MTInt]
}

export type MTPrimPair = {
  prim: "big_map" | "lambda" | "map" | "or"
  annots?: Array<string>
  args: [MichelsonType, MichelsonType]
}

export type MTPrimMulti = {
  prim: "pair"
  annots?: Array<string>
  args: Array<MichelsonType>
}

export type MTInt = {
  int: string
}

export type MichelsonType = MTPrimSimple | MTPrimSingle | MTPrimSingleInt | MTPrimPair | MTPrimMulti

export type MDPrimSimple = {
  prim: "False" | "None" | "True" | "Unit"
}

export type MDPrimSingle = {
  prim: "Left" | "Right" | "Some"
  args: [MichelsonData]
}

export type MDPrimPair = {
  prim: "Elt"
  args: [MichelsonData, MichelsonData]
}

export type MDPrimMulti = {
  prim: "Pair"
  args: Array<MichelsonData>
}

export type MDString = {
  string: string
}

export type MDInt = {
  int: string
}

export type MDBytes = {
  bytes: string
}

export type MDArray = Array<MichelsonData>

export type MichelsonData = MDString | MDInt | MDBytes | MDArray | MDPrimSimple | MDPrimSingle | MDPrimPair | MDPrimMulti

export type RawMicheline = {
  "prim": string | null
  "int": string | null
  "bytes": string | null
  "string": string | null
  "args": Array<RawMicheline>
  "annots": Array<string>
  "array": Array<RawMicheline>
}

type ContractParameterGen<AT> = {
  "name": string
  "type": AT
  "const": boolean
  "default": string | null
}
export type ContractParameter = ContractParameterGen<ArchetypeType>

type FunctionParameterGen<AT> = {
  "name": string
  "type": AT
}
export type FunctionParameter = FunctionParameterGen<ArchetypeType>

type EntrypointGen<AT> = {
  "name": string
  "args": Array<FunctionParameterGen<AT>>
}
export type Entrypoint = EntrypointGen<ArchetypeType>

type FieldGen<AT> = {
  "name": string
  "type": AT
  "is_key": boolean
}
export type Field = FieldGen<ArchetypeType>


type AssetGen<AT, MT> = {
  "name": string
  "container_kind": "map" | "big_map" | "iterable_big_map"
  "fields": Array<FieldGen<AT>>
  "container_type_michelson": MT
  "key_type_michelson": MT
  "value_type_michelson": MT
}
export type Asset = AssetGen<ArchetypeType, MichelsonType>

type EnumValueGen<T> = {
  "name": string,
  "types": Array<T>
}
export type EnumValue = EnumValueGen<ArchetypeType>

type EnumGen<AT, MT> = {
  "name": string
  "constructors": Array<EnumValueGen<AT>>
  "type_michelson": MT
}
export type Enum = EnumGen<ArchetypeType, MichelsonType>

type StorageElementGen<AT> = {
  "name": string
  "type": AT
  "const": boolean
}
export type StorageElement = StorageElementGen<ArchetypeType>

type RecordGen<AT, MT> = {
  "name": string
  "fields": Array<Omit<FieldGen<AT>, "is_key">>
  "type_michelson": MT
}
export type Record = RecordGen<ArchetypeType, MichelsonType>

type GetterGen<AT, MT> = {
  "name": string
  "args": Array<FunctionParameterGen<AT>>
  "return": AT
  "return_michelson": {
    "value": MT
    "is_storable": boolean
  }
}
export type Getter = GetterGen<ArchetypeType, MichelsonType>

type ViewGen<AT> = {
  "name": string
  "args": Array<FunctionParameterGen<AT>>
  "return": AT
}
export type View = ViewGen<ArchetypeType>

type EventGen<AT, MT> = {
  "name": string
  "fields": Array<Omit<FieldGen<AT>, "is_key">>
  "type_michelson": MT
}
export type Event = EventGen<ArchetypeType, MichelsonType>

type ErrorGen<MD> = {
  "kind": string
  "args": Array<string>
  "expr": MD
}
export type Error = ErrorGen<MichelsonData>

export type ContractInterfaceGen<AT, MT, MD> = {
  "name": string,
  "parameters": Array<ContractParameterGen<AT>>
  "types": {
    "assets": Array<AssetGen<AT, MT>>
    "enums": Array<EnumGen<AT, MT>>
    "records": Array<RecordGen<AT, MT>>
    "events": Array<EventGen<AT, MT>>
  }
  "storage": Array<StorageElementGen<AT>>
  "storage_type": {
    "value": MT
    "is_storable": boolean
  }
  "entrypoints": Array<EntrypointGen<AT>>
  "getters": Array<GetterGen<AT, MT>>
  "views": Array<ViewGen<AT>>
  "errors": Array<ErrorGen<MD>>
}

export type RawContractInterface = ContractInterfaceGen<RawArchetypeType, RawMicheline, RawMicheline>
export type ContractInterface = ContractInterfaceGen<ArchetypeType, MichelsonType, MichelsonData>

type TaquitoEnv = {
  in_map_key: boolean
}

export const makeTaquitoEnv = (): TaquitoEnv => {
  return { in_map_key: false }
}

/* Compute path and argument */

export type PathItemSimple = [number]

export type PathItemDouble = [number, number]

export type PathItem = PathItemSimple | PathItemDouble

const get_size_michelson_type = (ty: MichelsonType): number => {
  switch (ty.prim) {
    case "address": return 1
    case "big_map": return 1
    case "bls12_381_fr": return 1
    case "bls12_381_g1": return 1
    case "bls12_381_g2": return 1
    case "bool": return 1
    case "bytes": return 1
    case "chain_id": return 1
    case "chest_key": return 1
    case "chest": return 1
    case "contract": return 1
    case "int": return 1
    case "key_hash": return 1
    case "key": return 1
    case "lambda": return 1
    case "list": return 1
    case "map": return 1
    case "mutez": return 1
    case "nat": return 1
    case "never": return 1
    case "operation": return 1
    case "option": return 1
    case "or": return 1
    case "pair": return (ty.args.length - 1 + get_size_michelson_type(ty.args[ty.args.length - 1]))
    case "sapling_state": return 1
    case "sapling_transaction": return 1
    case "set": return 1
    case "signature": return 1
    case "string": return 1
    case "ticket": return 3
    case "timestamp": return 1
    case "tx_rollup_l2_address": return 1
    case "unit": return 1
  }
}

export const get_path = (id: string, sty: MichelsonType): Array<PathItem> => {
  const aux = (ty: MichelsonType, accu: Array<PathItem>): Array<PathItem> | undefined => {
    if (ty.annots && ty.annots?.length > 0 && ty.annots[0] == id) {
      return accu
    }
    if (ty.prim == "pair") {
      for (let i = 0; i < ty.args.length; ++i) {
        const is_last = i == ty.args.length - 1;
        let ii: PathItem = [i];
        if (is_last) {
          const size = get_size_michelson_type(ty.args[i]);
          if (size > 1) {
            ii = [i, (i + size)]
          }
        }
        const npath: Array<PathItem> = accu.concat([])
        npath.push(ii);
        const r = aux(ty.args[i], npath);
        if (r) {
          return r
        }
      }
    }
    return undefined
  }
  const res = aux(sty, []);
  return res ?? [];
}

export const make_arg = (expr: ts.Expression, pi: PathItem) => {
  if (pi.length == 1) {
    const [n] = (pi as PathItemSimple);
    return factory.createElementAccessExpression(
      factory.createPropertyAccessExpression(
        expr,
        factory.createIdentifier("args")
      ),
      factory.createNumericLiteral(n)
    )
  } else if (pi.length == 2) {
    const [start, end] = (pi as PathItemDouble);
    return factory.createCallExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier("att"),
        factory.createIdentifier("pair_to_mich")
      ),
      undefined,
      [factory.createCallExpression(
        factory.createPropertyAccessExpression(
          factory.createPropertyAccessExpression(
            // factory.createParenthesizedExpression(acc),
            factory.createParenthesizedExpression(factory.createAsExpression(
              expr,
              factory.createTypeReferenceNode(
                factory.createQualifiedName(
                  factory.createIdentifier("att"),
                  factory.createIdentifier("Mpair")
                ),
                undefined
              )
            )),
            factory.createIdentifier("args")
          ),
          factory.createIdentifier("slice")
        ),
        undefined,
        [
          factory.createNumericLiteral(start.toString()),
          factory.createNumericLiteral(end.toString())
        ]
      )]
    )
  } else {
    throw new Error("Internal Error");
  }
}

export enum e_left_right {
  Left = "Left",
  Right = "Right"
}

export const compute_path_enum = (idx: number, length: number): Array<e_left_right> => {
  let res: Array<e_left_right> = []
  if (idx == 0 && length == 1) {
    return res
  }
  for (let i = 0; i < idx; ++i) {
    if (!(i == idx - 1 && idx + 1 == length)) {
      res.push(e_left_right.Right)
    }
  }
  res.push(idx + 1 == length ? e_left_right.Right : e_left_right.Left)
  return res
}

/* Archetype type to Michelson type ---------------------------------------- */

export const archetype_type_to_mich_type = (at: ArchetypeType, ci: ContractInterface): MichelsonType => {
  switch (at.node) {
    case "address": return <MTPrimSimple>{ prim: at.node }
    case "aggregate": {
      const a = get_asset_type(at.name, ci);
      return { prim: "set", args: [a.container_type_michelson] }
    }
    case "asset_container": {
      const a = get_asset_type(at.name, ci);
      return a.container_type_michelson
    }
    case "asset_key": {
      const a = get_asset_type(at.name, ci);
      return a.key_type_michelson
    }
    case "asset_value": {
      const a = get_asset_type(at.name, ci);
      return a.value_type_michelson
    }
    case "asset_view": {
      const a = get_asset_type(at.name, ci);
      return { prim: "set", args: [a.container_type_michelson] }
    }
    case "asset": {
      const a = get_asset_type(at.name, ci);
      return a.container_type_michelson
    }
    case "big_map": return <MTPrimPair>{ prim: at.node, args: [archetype_type_to_mich_type(at.key_type, ci), archetype_type_to_mich_type(at.value_type, ci)] }
    case "bls12_381_fr": return <MTPrimSimple>{ prim: at.node }
    case "bls12_381_g1": return <MTPrimSimple>{ prim: at.node }
    case "bls12_381_g2": return <MTPrimSimple>{ prim: at.node }
    case "bool": return <MTPrimSimple>{ prim: at.node }
    case "bytes": return <MTPrimSimple>{ prim: at.node }
    case "chain_id": return <MTPrimSimple>{ prim: at.node }
    case "chest_key": return <MTPrimSimple>{ prim: at.node }
    case "chest": return <MTPrimSimple>{ prim: at.node }
    case "collection": throw new Error(`archetype_type_to_mich_type: TODO ${at.node}`)
    case "contract": return <MTPrimSingle>{ prim: at.node, args: [archetype_type_to_mich_type(at.arg, ci)] }
    case "currency": return <MTPrimSimple>{ prim: "mutez" }
    case "date": return <MTPrimSimple>{ prim: "timestamp" }
    case "duration": return <MTPrimSimple>{ prim: "nat" }
    case "enum": {
      const a = get_enum_type(at.name, ci)
      return a.type_michelson
    }
    case "event": {
      const r = get_record_or_event_type(at.name, ci);
      return r.type_michelson
    }
    case "int": return <MTPrimSimple>{ prim: at.node }
    case "iterable_big_map": throw new Error(`archetype_type_to_mich_type: TODO ${at.node}`)
    case "key_hash": return <MTPrimSimple>{ prim: at.node }
    case "key": return <MTPrimSimple>{ prim: at.node }
    case "lambda": return <MTPrimPair>{ prim: at.node, args: [archetype_type_to_mich_type(at.arg_type, ci), archetype_type_to_mich_type(at.ret_type, ci)] }
    case "list": return <MTPrimSingle>{ prim: at.node, args: [archetype_type_to_mich_type(at.arg, ci)] }
    case "map": return <MTPrimPair>{ prim: at.node, args: [archetype_type_to_mich_type(at.key_type, ci), archetype_type_to_mich_type(at.value_type, ci)] }
    case "nat": return <MTPrimSimple>{ prim: at.node }
    case "never": return <MTPrimSimple>{ prim: at.node }
    case "operation": return <MTPrimSimple>{ prim: at.node }
    case "option": return <MTPrimSingle>{ prim: at.node, args: [archetype_type_to_mich_type(at.arg, ci)] }
    case "or": return <MTPrimPair>{ prim: at.node, args: [archetype_type_to_mich_type(at.left_type, ci), archetype_type_to_mich_type(at.right_type, ci)] }
    case "partition": {
      const a = get_asset_type(at.name, ci);
      return { prim: "set", args: [a.container_type_michelson] }
    }
    case "rational": return <MTPrimMulti>{ prim: "pair", args: [<MTPrimSimple>{ prim: "int" }, <MTPrimSimple>{ prim: "nat" }] }
    case "record": {
      const r = get_record_or_event_type(at.name, ci);
      return r.type_michelson
    }
    case "sapling_state": return <MTPrimSingleInt>{ prim: at.node, args: [<MTInt>{ int: at.memo_size.toString() }] }
    case "sapling_transaction": return <MTPrimSingleInt>{ prim: at.node, args: [<MTInt>{ int: at.memo_size.toString() }] }
    case "set": return <MTPrimSingle>{ prim: at.node, args: [archetype_type_to_mich_type(at.arg, ci)] }
    case "signature": return <MTPrimSimple>{ prim: at.node }
    case "state": return <MTPrimSimple>{ prim: "int" }
    case "string": return <MTPrimSimple>{ prim: at.node }
    case "ticket": return <MTPrimSingle>{ prim: at.node, args: [archetype_type_to_mich_type(at.arg, ci)] }
    case "timestamp": return <MTPrimSimple>{ prim: at.node }
    case "tuple": return <MTPrimMulti>{ prim: "pair", args: at.args.map(x => { return archetype_type_to_mich_type(x, ci) }) }
    case "tx_rollup_l2_address": return <MTPrimSimple>{ prim: at.node }
    case "unit": return <MTPrimSimple>{ prim: at.node }
  }
}

/* Archetype type to Typescript type --------------------------------------- */

export const archetype_type_to_ts_type = (at: ArchetypeType, ci: ContractInterface): KeywordTypeNode<any> => {
  const throw_error = (ty: string): KeywordTypeNode<any> => {
    throw new Error(`archetype_type_to_ts_type: '${ty}' type not handled`)
  }
  switch (at.node) {
    case "address": return factory.createTypeReferenceNode(
      factory.createQualifiedName(
        factory.createIdentifier("att"),
        factory.createIdentifier("Address")
      ),
      undefined
    );
    case "aggregate": {
      const [is_only_key, ty] = is_asset_one_field_key(at.name, ci)
      if (is_only_key && ty != null) {
        return archetype_type_to_ts_type({ node: "set", arg: ty }, ci)
      } else {
        return archetype_type_to_ts_type({ node: "set", arg: { node: "asset_key", name: at.name } }, ci)
      }
    }
    case "asset_container": return throw_error(at.node)
    case "asset_key": {
      const [is_only_key, ty] = is_asset_one_field_key(at.name, ci)
      if (is_only_key && ty != null) {
        return archetype_type_to_ts_type(ty, ci)
      } else {
        return factory.createTypeReferenceNode(
          factory.createIdentifier(at.name + "_key"),
          undefined
        )
      }
    }
    case "asset_value": {
      const [is_only_val, ty] = is_asset_one_field_val(at.name, ci)
      if (is_only_val && ty != null) {
        return archetype_type_to_ts_type(ty, ci)
      } else {
        return factory.createTypeReferenceNode(
          factory.createIdentifier(at.name + "_value"),
          undefined
        )
      }
    }
    case "asset_view": {
      const [is_only_key, ty] = is_asset_one_field_key(at.name, ci)
      if (is_only_key && ty != null) {
        return archetype_type_to_ts_type({ node: "list", arg: ty }, ci)
      } else {
        return archetype_type_to_ts_type({ node: "list", arg: { node: "asset_key", name: at.name } }, ci)
      }
    }
    case "asset": {
      if (at.name != null) {
        return factory.createTypeReferenceNode(
          factory.createIdentifier(at.name + "_container"),
          undefined
        );
      } else {
        throw new Error(`Cannot get asset name (asset)`)
      }
    }
    case "big_map": return factory.createTypeReferenceNode(
      factory.createIdentifier("Array"),
      [factory.createTupleTypeNode([
        archetype_type_to_ts_type(at.key_type, ci),
        archetype_type_to_ts_type(at.value_type, ci)
      ])]
    );
    case "bls12_381_fr": return factory.createTypeReferenceNode(
      factory.createQualifiedName(
        factory.createIdentifier("att"),
        factory.createIdentifier("Bls12_381_fr")
      ),
      undefined
    );
    case "bls12_381_g1": return factory.createTypeReferenceNode(
      factory.createQualifiedName(
        factory.createIdentifier("att"),
        factory.createIdentifier("Bls12_381_g1")
      ),
      undefined
    );
    case "bls12_381_g2": return factory.createTypeReferenceNode(
      factory.createQualifiedName(
        factory.createIdentifier("att"),
        factory.createIdentifier("Bls12_381_g2")
      ),
      undefined
    );
    case "bool": return factory.createKeywordTypeNode(SyntaxKind.BooleanKeyword)
    case "bytes": return factory.createTypeReferenceNode(
      factory.createQualifiedName(
        factory.createIdentifier("att"),
        factory.createIdentifier("Bytes")
      ),
      undefined
    );
    case "chain_id": return factory.createTypeReferenceNode(
      factory.createQualifiedName(
        factory.createIdentifier("att"),
        factory.createIdentifier("Chain_id")
      ),
      undefined
    );
    case "chest_key": return factory.createTypeReferenceNode(
      factory.createQualifiedName(
        factory.createIdentifier("att"),
        factory.createIdentifier("Chest_key")
      ),
      undefined
    );
    case "chest": return factory.createTypeReferenceNode(
      factory.createQualifiedName(
        factory.createIdentifier("att"),
        factory.createIdentifier("Chest")
      ),
      undefined
    );
    case "collection": return throw_error(at.node)
    case "contract": return factory.createTypeReferenceNode(
      factory.createQualifiedName(
        factory.createIdentifier("att"),
        factory.createIdentifier("Entrypoint")
      ),
      undefined
    );
    case "currency": return factory.createTypeReferenceNode(
      factory.createQualifiedName(
        factory.createIdentifier("att"),
        factory.createIdentifier("Tez")
      ),
      undefined
    );
    case "date": return factory.createTypeReferenceNode(
      factory.createIdentifier("Date"),
      undefined
    )
    case "duration": return factory.createTypeReferenceNode(
      factory.createQualifiedName(
        factory.createIdentifier("att"),
        factory.createIdentifier("Duration")
      ),
      undefined
    );
    case "enum": return factory.createTypeReferenceNode(
      factory.createIdentifier(at.name != null ? at.name : ""),
      undefined
    )
    case "event": {
      return factory.createTypeReferenceNode(
        factory.createIdentifier(at.name),
        undefined)
    }
    case "int": return factory.createTypeReferenceNode(
      factory.createQualifiedName(
        factory.createIdentifier("att"),
        factory.createIdentifier("Int")
      ),
      undefined
    );
    case "iterable_big_map": return factory.createTypeReferenceNode(
      factory.createIdentifier("Array"),
      [factory.createTupleTypeNode([
        archetype_type_to_ts_type(at.key_type, ci),
        archetype_type_to_ts_type(at.value_type, ci)
      ])]
    );
    case "key_hash": return factory.createTypeReferenceNode(
      factory.createQualifiedName(
        factory.createIdentifier("att"),
        factory.createIdentifier("Key_hash")
      ),
      undefined
    );
    case "key": return factory.createTypeReferenceNode(
      factory.createQualifiedName(
        factory.createIdentifier("att"),
        factory.createIdentifier("Key")
      ),
      undefined
    );
    case "lambda": return factory.createTypeReferenceNode(
      factory.createQualifiedName(
        factory.createIdentifier("att"),
        factory.createIdentifier("Micheline")
      ),
      undefined
    );
    case "list": return factory.createTypeReferenceNode(
      factory.createIdentifier("Array"),
      [archetype_type_to_ts_type(at.arg, ci)]
    )
    case "map": return factory.createTypeReferenceNode(
      factory.createIdentifier("Array"),
      [factory.createTupleTypeNode([
        archetype_type_to_ts_type(at.key_type, ci),
        archetype_type_to_ts_type(at.value_type, ci)
      ])]
    );
    case "nat": return factory.createTypeReferenceNode(
      factory.createQualifiedName(
        factory.createIdentifier("att"),
        factory.createIdentifier("Nat")
      ),
      undefined
    );
    case "never": return factory.createTypeReferenceNode(
      factory.createQualifiedName(
        factory.createIdentifier("att"),
        factory.createIdentifier("Micheline")
      ),
      undefined
    );
    case "operation": return throw_error(at.node)
    case "option": return factory.createTypeReferenceNode(
      factory.createQualifiedName(
        factory.createIdentifier("att"),
        factory.createIdentifier("Option"),
      ),
      [archetype_type_to_ts_type(at.arg, ci)]
    );
    case "or": return factory.createTypeReferenceNode(
      factory.createQualifiedName(
        factory.createIdentifier("att"),
        factory.createIdentifier("Or")
      ),
      [
        archetype_type_to_ts_type(at.left_type, ci),
        archetype_type_to_ts_type(at.right_type, ci)
      ]
    )
    case "partition": {
      const [is_only_key, ty] = is_asset_one_field_key(at.name, ci)
      if (is_only_key && ty != null) {
        return archetype_type_to_ts_type({ node: "set", arg: ty }, ci)
      } else {
        return archetype_type_to_ts_type({ node: "set", arg: { node: "asset_key", name: at.name } }, ci)
      }
    }
    case "rational": return factory.createTypeReferenceNode(
      factory.createQualifiedName(
        factory.createIdentifier("att"),
        factory.createIdentifier("Rational")
      ),
      undefined
    );
    case "record": {
      return factory.createTypeReferenceNode(
        factory.createIdentifier(at.name),
        undefined)
    }
    case "sapling_state": return factory.createTypeReferenceNode(
      factory.createQualifiedName(
        factory.createIdentifier("att"),
        factory.createIdentifier("Sapling_state")
      ),
      undefined
    );
    case "sapling_transaction": return factory.createTypeReferenceNode(
      factory.createQualifiedName(
        factory.createIdentifier("att"),
        factory.createIdentifier("Sapling_transaction")
      ),
      undefined
    );
    case "set": return factory.createTypeReferenceNode(
      factory.createIdentifier("Array"),
      [archetype_type_to_ts_type(at.arg, ci)]
    )
    case "signature": return factory.createTypeReferenceNode(
      factory.createQualifiedName(
        factory.createIdentifier("att"),
        factory.createIdentifier("Signature")
      ),
      undefined
    );
    case "state": return throw_error(at.node)
    case "string": return factory.createKeywordTypeNode(SyntaxKind.StringKeyword);
    case "ticket": return factory.createTypeReferenceNode(
      factory.createQualifiedName(
        factory.createIdentifier("att"),
        factory.createIdentifier("Ticket")
      ),
      [archetype_type_to_ts_type(at.arg, ci)]
    );
    case "timestamp": return throw_error(at.node)
    case "tuple": return factory.createTupleTypeNode(
      at.args.map(t => archetype_type_to_ts_type(t, ci))
    );
    case "tx_rollup_l2_address": return factory.createTypeReferenceNode(
      factory.createQualifiedName(
        factory.createIdentifier("att"),
        factory.createIdentifier("Tx_rollup_l2_address")
      ),
      undefined
    );
    case "unit": return factory.createTypeReferenceNode(
      factory.createQualifiedName(
        factory.createIdentifier("att"),
        factory.createIdentifier("Unit")
      ),
      undefined
    );
  }
}

/* Complex data type comparison generators --------------------------------- */

const rm_milliseconds_from = (x: ts.Expression): ts.BinaryExpression => {
  return factory.createBinaryExpression(
    factory.createCallExpression(
      factory.createPropertyAccessExpression(
        x,
        factory.createIdentifier("getTime")
      ),
      undefined,
      []
    ),
    factory.createToken(ts.SyntaxKind.MinusToken),
    factory.createCallExpression(
      factory.createPropertyAccessExpression(
        x,
        factory.createIdentifier("getMilliseconds")
      ),
      undefined,
      []
    )
  )
}

const make_tuple_cmp_body = (a: ts.Expression, b: ts.Expression, types: Array<ArchetypeType>, ci: ContractInterface): ts.Expression => {
  return factory.createCallExpression(
    factory.createParenthesizedExpression(factory.createArrowFunction(
      undefined,
      undefined,
      [
        factory.createParameterDeclaration(
          undefined,
          undefined,
          undefined,
          factory.createIdentifier("x"),
          undefined,
          undefined,
          undefined
        ),
        factory.createParameterDeclaration(
          undefined,
          undefined,
          undefined,
          factory.createIdentifier("y"),
          undefined,
          undefined,
          undefined
        )
      ],
      undefined,
      factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
      factory.createBlock(
        [factory.createReturnStatement(
          types.slice(1).reduce((acc, t, i) => {
            return factory.createBinaryExpression(
              acc,
              factory.createToken(ts.SyntaxKind.AmpersandAmpersandToken),
              make_cmp_body(factory.createElementAccessExpression(
                factory.createIdentifier("x"),
                factory.createNumericLiteral(i + 1)
              ), factory.createElementAccessExpression(
                factory.createIdentifier("y"),
                factory.createNumericLiteral(i + 1)
              ), t, ci)
            )
          }, make_cmp_body(factory.createElementAccessExpression(
            factory.createIdentifier("x"),
            factory.createNumericLiteral("0")
          ), factory.createElementAccessExpression(
            factory.createIdentifier("y"),
            factory.createNumericLiteral("0")
          ), types[0], ci)))],
        true
      )
    )),
    undefined,
    [a, b]
  )
}

export const make_cmp_body = (a: ts.Expression, b: ts.Expression, atype: ArchetypeType, ci: ContractInterface): ts.Expression => {
  const make_cmp_equals = (a: ts.Expression, b: ts.Expression) => {
    return factory.createCallExpression(
      factory.createPropertyAccessExpression(
        a,
        factory.createIdentifier("equals")
      ),
      undefined,
      [b]
    )
  }
  const make_cmp_equals_default = (a: ts.Expression, b: ts.Expression) => {
    return factory.createBinaryExpression(a, factory.createToken(ts.SyntaxKind.EqualsEqualsToken), b)
  }
  const make_cmp_equals_container = (a: ts.Expression, b: ts.Expression) => {
    return factory.createBinaryExpression(
      factory.createCallExpression(
        factory.createPropertyAccessExpression(
          factory.createIdentifier("JSON"),
          factory.createIdentifier("stringify")
        ),
        undefined,
        [a]
      ),
      factory.createToken(ts.SyntaxKind.EqualsEqualsToken),
      factory.createCallExpression(
        factory.createPropertyAccessExpression(
          factory.createIdentifier("JSON"),
          factory.createIdentifier("stringify")
        ),
        undefined,
        [b]
      )
    )
  }
  switch (atype.node) {
    case "address": return make_cmp_equals(a, b);
    case "aggregate": return make_cmp_equals_default(a, b);
    case "asset_container": return make_cmp_equals_default(a, b);
    case "asset_key": {
      const [is_only_key, ty] = is_asset_one_field_key(atype.name, ci)
      if (is_only_key && ty != null) {
        return make_cmp_body(a, b, ty, ci)
      } else {
        return make_cmp_equals_default(a, b)
      }
    }
    case "asset_value": {
      const [is_only_val, ty] = is_asset_one_field_val(atype.name, ci)
      if (is_only_val && ty != null) {
        return make_cmp_body(a, b, ty, ci)
      } else {
        return make_cmp_equals_default(a, b)
      }
    }
    case "asset_view": return make_cmp_equals_default(a, b);
    case "asset": return make_cmp_equals_container(a, b);
    case "big_map": return make_cmp_equals_default(a, b);
    case "bls12_381_fr": return make_cmp_equals(a, b);
    case "bls12_381_g1": return make_cmp_equals(a, b);
    case "bls12_381_g2": return make_cmp_equals(a, b);
    case "bool": return make_cmp_equals_default(a, b);
    case "bytes": return make_cmp_equals(a, b);
    case "chain_id": return make_cmp_equals(a, b);
    case "chest_key": return make_cmp_equals(a, b);
    case "chest": return make_cmp_equals(a, b);
    case "collection": return make_cmp_equals_default(a, b);
    case "contract": return make_cmp_equals(a, b);
    case "currency": return make_cmp_equals(a, b);
    case "date": return factory.createBinaryExpression(
      factory.createParenthesizedExpression(rm_milliseconds_from(a)),
      factory.createToken(ts.SyntaxKind.EqualsEqualsToken),
      factory.createParenthesizedExpression(rm_milliseconds_from(b))
    );
    case "duration": return make_cmp_equals(a, b);
    case "enum": return make_cmp_equals_default(a, b);
    case "event": return make_cmp_equals_default(a, b);
    case "int": return make_cmp_equals(a, b);
    case "iterable_big_map": return make_cmp_equals_default(a, b);
    case "key_hash": return make_cmp_equals(a, b);
    case "key": return make_cmp_equals(a, b);
    case "lambda": return make_cmp_equals_default(a, b);
    case "list": return make_cmp_equals_container(a, b);
    case "map": return make_cmp_equals_container(a, b);
    case "nat": return make_cmp_equals(a, b);
    case "never": return make_cmp_equals_default(a, b);
    case "operation": return make_cmp_equals_default(a, b);
    case "option": return make_cmp_equals(a, b);
    case "or": return make_cmp_equals(a, b);
    case "partition": return make_cmp_equals_default(a, b);
    case "rational": return make_cmp_equals(a, b);
    case "record": return make_cmp_equals_default(a, b);
    case "sapling_state": return make_cmp_equals(a, b);
    case "sapling_transaction": return make_cmp_equals(a, b);
    case "set": return make_cmp_equals_container(a, b);
    case "signature": return make_cmp_equals(a, b);
    case "state": return make_cmp_equals(a, b);
    case "string": return make_cmp_equals_default(a, b);
    case "ticket": return make_cmp_equals(a, b);
    case "timestamp": return make_cmp_equals_default(a, b);
    case "tuple": return make_tuple_cmp_body(a, b, atype.args, ci);
    case "tx_rollup_l2_address": return make_cmp_equals(a, b);
    case "unit": return make_cmp_equals(a, b);
  }
}

/* Michelson to Typescript utils ----------------------------------------------------- */

export const mich_to_archetype_type = (atype: ArchetypeType, arg: ts.Expression, ci: ContractInterface): ts.Expression => {

  const TODO = (ty: string, x: ts.Expression): ts.Expression => {
    throw new Error(`TODO: ${ty}`)
  }

  const get_size = (aty: ArchetypeType): number => {
    switch (aty.node) {
      case "address": return 1;
      case "aggregate": return 1;
      case "asset_container": return 1;
      case "asset_key": return 1;
      case "asset_value": return 1;
      case "asset_view": return 1;
      case "asset": return 1;
      case "big_map": return 1;
      case "bls12_381_fr": return 1;
      case "bls12_381_g1": return 1;
      case "bls12_381_g2": return 1;
      case "bool": return 1;
      case "bytes": return 1;
      case "chain_id": return 1;
      case "chest_key": return 1;
      case "chest": return 1;
      case "collection": return 1;
      case "contract": return 1;
      case "currency": return 1;
      case "date": return 1
      case "duration": return 1;
      case "enum": return 1;
      case "event": return 1;
      case "int": return 1;
      case "iterable_big_map": return 3;
      case "key_hash": return 1;
      case "key": return 1;
      case "lambda": return 1;
      case "list": return 1;
      case "map": return 1;
      case "nat": return 1;
      case "never": return 1;
      case "operation": return 1;
      case "option": return 1;
      case "or": return 1;
      case "partition": return 1;
      case "rational": return 2;
      case "record": {
        const r = get_record_or_event_type(aty.name, ci)
        return get_size_michelson_type(r.type_michelson)
      }
      case "sapling_state": return 1;
      case "sapling_transaction": return 1;
      case "set": return 1;
      case "signature": return 1;
      case "state": return 1;
      case "string": return 1;
      case "ticket": return 3;
      case "timestamp": return 1;
      case "tuple": return (aty.args.length - 1 + get_size(aty.args[aty.args.length - 1]));
      case "tx_rollup_l2_address": return 1;
      case "unit": return 1;
    }
  }

  const class_to_mich = (id: string, args: ts.Expression[]): ts.Expression => {
    return factory.createCallExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier("att"),
        factory.createIdentifier(id)
      ),
      undefined,
      args
    )
  }

  const class_from_mich = (name: string, args: ts.Expression[]): ts.Expression => {
    return factory.createCallExpression(
      factory.createPropertyAccessExpression(
        factory.createPropertyAccessExpression(
          factory.createIdentifier("att"),
          factory.createIdentifier(name)
        ),
        factory.createIdentifier("from_mich")
      ),
      undefined,
      args
    )
  }

  const map_mich_to_ts = (key_type: ArchetypeType, value_type: ArchetypeType) => {
    return factory.createCallExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier("att"),
        factory.createIdentifier("mich_to_map")
      ),
      undefined,
      [
        arg,
        factory.createArrowFunction(
          undefined,
          undefined,
          [
            factory.createParameterDeclaration(
              undefined,
              undefined,
              undefined,
              factory.createIdentifier("x"),
              undefined,
              undefined,
              undefined
            ),
            factory.createParameterDeclaration(
              undefined,
              undefined,
              undefined,
              factory.createIdentifier("y"),
              undefined,
              undefined,
              undefined
            )
          ],
          undefined,
          factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
          factory.createArrayLiteralExpression(
            [
              mich_to_archetype_type(key_type, factory.createIdentifier("x"), ci),
              mich_to_archetype_type(value_type, factory.createIdentifier("y"), ci)
            ],
            false
          )
        )
      ]
    )
  }

  const contained_type_to_field_decl = (fname: string, arg: ts.Expression, atypes: ArchetypeType[], from_mich: boolean) => {
    return factory.createCallExpression(
      from_mich ? factory.createPropertyAccessExpression(
        factory.createPropertyAccessExpression(
          factory.createIdentifier("att"),
          factory.createIdentifier(fname)
        ),
        factory.createIdentifier("from_mich")
      ) : factory.createPropertyAccessExpression(
        factory.createIdentifier("att"),
        factory.createIdentifier(fname)
      ),
      undefined,
      [arg].concat(
        atypes.map(atype => {
          return factory.createArrowFunction(
            undefined,
            undefined,
            [factory.createParameterDeclaration(
              undefined,
              undefined,
              undefined,
              factory.createIdentifier("x"),
              undefined,
              undefined,
              undefined
            )],
            undefined,
            factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
            factory.createBlock(
              [factory.createReturnStatement(mich_to_archetype_type(atype, factory.createIdentifier("x"), ci))],
              false
            )
          )
        }))
    )
  }

  const mich_to_tuple = (types: Array<ArchetypeType>, arg: ts.Expression) => {
    const decls: Array<ts.Statement> = []
    const args: Array<ts.Expression> = []
    for (let i = 0; i < types.length; i++) {
      const aty = types[i];
      let pi: PathItem = [i]
      if (i == types.length - 1) {
        const size = get_size(aty);
        if (size > 1) {
          pi = [i, i + size]
        }
      }
      const expr_arg = factory.createAsExpression(
        factory.createIdentifier("p"),
        factory.createTypeReferenceNode(
          factory.createQualifiedName(
            factory.createIdentifier("att"),
            factory.createIdentifier("Mpair")
          ),
          undefined
        )
      );
      const narg: ts.Expression = make_arg(expr_arg, pi);
      args.push(mich_to_archetype_type(types[i], narg, ci))
    }
    const body = [...decls, factory.createReturnStatement(factory.createArrayLiteralExpression(args))]
    return factory.createCallExpression(
      factory.createParenthesizedExpression(factory.createArrowFunction(
        undefined,
        undefined,
        [factory.createParameterDeclaration(
          undefined,
          undefined,
          undefined,
          factory.createIdentifier("p"),
          undefined,
          undefined,
          undefined
        )],
        undefined,
        factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
        factory.createBlock(
          body,
          true
        )
      )),
      undefined,
      [arg]
    )
  }

  const record_to_mich = (record_name: string, arg: ts.Expression, ci: ContractInterface) => {
    return factory.createCallExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier(record_name),
        factory.createIdentifier("from_mich")
      ),
      undefined,
      [arg]
    )
  }

  const enum_to_mich = (enum_name: string, arg: ts.Expression, ci: ContractInterface) => {
    return factory.createCallExpression(
      factory.createIdentifier("mich_to_" + enum_name),
      undefined,
      [arg]
    )
  }

  const asset_to_mich = (asset_name: string, arg: ts.Expression, ci: ContractInterface) => {
    const asset_type = get_asset_type(asset_name, ci);
    const is_only_keys = (a: Asset): boolean => {
      return a.fields.reduce((accu: boolean, x: Field) => { return accu && x.is_key }, true)
    }
    switch (asset_type.container_kind) {
      case "map": {
        let key_type: ArchetypeType = { node: "asset_key", name: asset_name };
        const [is_one_field_key, key_ty] = is_asset_one_field_key(asset_name, ci);
        if (is_one_field_key && key_ty != null) {
          key_type = key_ty
        }
        if (is_only_keys(asset_type)) {
          return contained_type_to_field_decl("mich_to_list", arg, [key_type], false)
        } else {
          let value_type: ArchetypeType = { node: "asset_value", name: asset_name };
          const [is_one_field_val, val_ty] = is_asset_one_field_val(asset_name, ci);
          if (is_one_field_val && val_ty != null) {
            value_type = val_ty
          }
          return map_mich_to_ts(key_type, value_type);
        }
      }
      case "big_map":
        return class_from_mich("Int", [arg])
      case "iterable_big_map": {
        const key_type: ArchetypeType = { node: "asset_key", name: asset_name };
        const val_type: ArchetypeType = { node: "asset_value", name: asset_name };
        const values: ArchetypeType = { node: 'big_map', key_type: key_type, value_type: { node: 'tuple', args: [{ node: 'nat' }, val_type] } }
        const keys: ArchetypeType = { node: 'big_map', key_type: { node: 'nat' }, value_type: key_type }
        const size: ArchetypeType = { node: 'nat' }
        return mich_to_tuple([values, keys, size], arg)
      }
    }
  }

  function mich_unit(): ts.Expression {
    return factory.createNewExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier("att"),
        factory.createIdentifier("Unit")
      ),
      undefined,
      []
    )
  }

  switch (atype.node) {
    case "address": return class_from_mich("Address", [arg]);
    case "aggregate": {
      const [a, ty] = is_asset_one_field_key(atype.name, ci)
      if (a && ty != null) {
        return mich_to_archetype_type({ node: 'set', arg: ty }, arg, ci)
      } else {
        return mich_to_archetype_type({ node: 'set', arg: { node: "record", name: atype.name + "_key" } }, arg, ci)
      }
    }
    case "asset_container": return TODO("asset_container", arg);
    case "asset_key": {
      const [a, ty] = is_asset_one_field_key(atype.name, ci)
      if (a && ty != null) {
        return mich_to_archetype_type(ty, arg, ci)
      } else {
        return record_to_mich(atype.name + "_key", arg, ci)
      }
    }
    case "asset_value": {
      const [a, ty] = is_asset_one_field_val(atype.name, ci)
      if (a && ty != null) {
        return mich_to_archetype_type(ty, arg, ci)
      } else {
        return record_to_mich(atype.name + "_value", arg, ci)
      }
    }
    case "asset_view": {
      const [a, ty] = is_asset_one_field_key(atype.name, ci)
      if (a && ty != null) {
        return mich_to_archetype_type({ node: "list", arg: ty }, arg, ci)
      } else {
        return mich_to_archetype_type({ node: "list", arg: { node: "record", name: atype.name + "_key" } }, arg, ci)
      }
    }
    case "asset": return asset_to_mich(atype.name, arg, ci);
    case "big_map": return class_from_mich("Int", [arg]);
    case "bls12_381_fr": return class_from_mich("Bls12_381_fr", [arg]);
    case "bls12_381_g1": return class_from_mich("Bls12_381_g1", [arg]);
    case "bls12_381_g2": return class_from_mich("Bls12_381_g2", [arg]);
    case "bool": return class_to_mich("mich_to_bool", [arg]);
    case "bytes": return class_from_mich("Bytes", [arg]);
    case "chain_id": return class_from_mich("Chain_id", [arg]);
    case "chest_key": return class_from_mich("Chest_key", [arg]);
    case "chest": return class_from_mich("Chest", [arg]);
    case "collection": return TODO("collection", arg);
    case "contract": return TODO("contract", arg);
    case "currency": return class_from_mich("Tez", [arg]);
    case "date": return class_to_mich("mich_to_date", [arg]);
    case "duration": return class_from_mich("Duration", [arg]);
    case "enum": return enum_to_mich(atype.name, arg, ci)
    case "event": return record_to_mich(atype.name, arg, ci)
    case "int": return class_from_mich("Int", [arg]);
    case "iterable_big_map": return class_from_mich("Int", [arg]);
    case "key_hash": return class_from_mich("Key_hash", [arg]);
    case "key": return class_from_mich("Key", [arg]);
    case "lambda": return arg;
    case "list": return contained_type_to_field_decl("mich_to_list", arg, [atype.arg], false)
    case "map": return map_mich_to_ts(atype.key_type, atype.value_type);
    case "nat": return class_from_mich("Nat", [arg]);
    case "never": return arg;
    case "operation": return TODO("operation", arg);
    case "option": return contained_type_to_field_decl("Option", arg, [atype.arg], true);
    case "or": return contained_type_to_field_decl("Or", arg, [atype.left_type, atype.right_type], true);
    case "partition": {
      const [a, ty] = is_asset_one_field_key(atype.name, ci)
      if (a && ty != null) {
        return mich_to_archetype_type({ node: 'set', arg: ty }, arg, ci)
      } else {
        return mich_to_archetype_type({ node: 'set', arg: { node: "record", name: atype.name + "_key" } }, arg, ci)
      }
    }
    case "rational": return class_from_mich("Rational", [arg]);
    case "record": return record_to_mich(atype.name, arg, ci)
    case "sapling_state": return class_from_mich("Sapling_state", [arg]);
    case "sapling_transaction": return class_from_mich("Sapling_transaction", [arg]);
    case "set": return contained_type_to_field_decl("mich_to_list", arg, [atype.arg], false)
    case "signature": return class_from_mich("Signature", [arg]);
    case "state": return TODO("state", arg);
    case "string": return class_to_mich("mich_to_string", [arg]);
    case "ticket": return contained_type_to_field_decl("Ticket", arg, [atype.arg], true);
    case "timestamp": return class_from_mich("Int", [arg]);
    case "tuple": return mich_to_tuple(atype.args, arg);
    case "tx_rollup_l2_address": return class_from_mich("Tx_rollup_l2_address", [arg]);
    case "unit": return mich_unit();
  }
}

/* storage element getter formulas ----------------------------------------- */

export const get_record_or_event_type = (name: string | null, ci: ContractInterface) => {
  if (name != null) {
    for (let i = 0; i < ci.types.records.length; i++) {
      if (ci.types.records[i].name == name) {
        return ci.types.records[i]
      }
    }
    for (let i = 0; i < ci.types.events.length; i++) {
      if (ci.types.events[i].name == name) {
        return ci.types.events[i]
      }
    }
  }
  throw new Error("get_record_or_event_type: '" + name + "' not found")
}

const get_asset_type = (name: string, ci: ContractInterface) => {
  if (name != null) {
    for (let i = 0; i < ci.types.assets.length; i++) {
      if (ci.types.assets[i].name == name) {
        return ci.types.assets[i]
      }
    }
  }
  throw new Error("get_asset_type: '" + name + "' not found")
}

export const is_asset_one_field_key = (name: string, ci: ContractInterface): [boolean, ArchetypeType | null] => {
  const a = get_asset_type(name, ci);
  const [cpt, ty]: [number, ArchetypeType | null] = a.fields.reduce(([c, ty]: [number, ArchetypeType | null], x) => {
    if (x.is_key) {
      return [c + 1, x.type]
    } else {
      return [c, ty]
    }
  }, [0, null])
  return [cpt == 1, ty]
}

export const is_asset_one_field_val = (name: string, ci: ContractInterface): [boolean, ArchetypeType | null] => {
  const a = get_asset_type(name, ci);
  const [cpt, ty]: [number, ArchetypeType | null] = a.fields.reduce(([c, ty]: [number, ArchetypeType | null], x) => {
    if (!x.is_key) {
      return [c + 1, x.type]
    } else {
      return [c, ty]
    }
  }, [0, null])
  return [cpt == 1, ty]
}

const get_enum_type = (name: string, ci: ContractInterface): Enum => {
  if (name != null) {
    for (let i = 0; i < ci.types.enums.length; i++) {
      if (ci.types.enums[i].name == name) {
        return ci.types.enums[i]
      }
    }
  }
  throw new Error("get_enum_type: '" + name + "' not found")
}

/* Typescript To Micheline utils ------------------------------------------------------ */

const class_to_mich = (x: ts.Expression): ts.CallExpression => {
  return factory.createCallExpression(
    factory.createPropertyAccessExpression(
      x,
      factory.createIdentifier("to_mich")
    ),
    undefined,
    []
  )
}

const id_to_mich = (x: ts.Expression): ts.CallExpression => {
  return factory.createCallExpression(
    factory.createParenthesizedExpression(factory.createArrowFunction(
      undefined,
      undefined,
      [factory.createParameterDeclaration(
        undefined,
        undefined,
        undefined,
        factory.createIdentifier("x"),
        undefined,
        undefined,
        undefined
      )],
      undefined,
      factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
      factory.createIdentifier("x")
    )),
    undefined,
    [x]
  );
}

const string_to_mich = (x: ts.Expression): ts.CallExpression => {
  return factory.createCallExpression(
    factory.createPropertyAccessExpression(
      factory.createIdentifier("att"),
      factory.createIdentifier("string_to_mich")
    ),
    undefined,
    [x]
  );
}

export const unit_to_mich = (): ts.CallExpression => {
  return factory.createCallExpression(
    factory.createPropertyAccessExpression(
      factory.createIdentifier("att"),
      factory.createIdentifier("unit_to_mich")
    ),
    undefined,
    []
  );
}

const bool_to_mich = (x: ts.Expression): ts.CallExpression => {
  return factory.createCallExpression(
    factory.createPropertyAccessExpression(
      factory.createIdentifier("att"),
      factory.createIdentifier("bool_to_mich")
    ),
    undefined,
    [x]
  );
}

const date_to_mich = (x: ts.Expression): ts.CallExpression => {
  return factory.createCallExpression(
    factory.createPropertyAccessExpression(
      factory.createIdentifier("att"),
      factory.createIdentifier("date_to_mich")
    ),
    undefined,
    [x]
  );
}

const tuple_to_mich = (name: string, types: ArchetypeType[], ci: ContractInterface): ts.CallExpression => {
  return factory.createCallExpression(
    factory.createPropertyAccessExpression(
      factory.createIdentifier("att"),
      factory.createIdentifier("pair_to_mich")
    ),
    undefined,
    [factory.createArrayLiteralExpression(
      types.map((x, i) => function_param_to_mich({ name: name + "[" + i.toString() + "]", type: x }, ci)),
      false
    )]
  )
}

const record_or_event_to_mich = (fp: FunctionParameter, ci: ContractInterface): ts.CallExpression => {
  const v = get_record_or_event_type((fp.type as ATNamed).name, ci);
  if (v.fields.length == 1) {
    const aty = v.fields[0].type;
    return function_param_to_mich({ ...fp, type: aty }, ci);
  } else {
    return class_to_mich(factory.createIdentifier(fp.name))
  }
}

const list_to_mich = (name: string, atype: ArchetypeType, ci: ContractInterface): ts.CallExpression => {
  return internal_list_to_mich(name, [
    factory.createReturnStatement(function_param_to_mich({ name: "x", type: atype }, ci))
  ])
}

const internal_list_to_mich = (name: string, body: ts.Statement[]): ts.CallExpression => {
  return factory.createCallExpression(
    factory.createPropertyAccessExpression(
      factory.createIdentifier("att"),
      factory.createIdentifier("list_to_mich")
    ),
    undefined,
    [
      factory.createIdentifier(name),
      factory.createArrowFunction(
        undefined,
        undefined,
        [factory.createParameterDeclaration(
          undefined,
          undefined,
          undefined,
          factory.createIdentifier("x"),
          undefined,
          undefined,
          undefined
        )],
        undefined,
        factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
        factory.createBlock(
          body,
          true
        )
      )
    ]
  )
}

const internal_map_to_mich = (name: string, decls: ts.CallExpression[]): ts.CallExpression => {
  return internal_list_to_mich(name, [
    factory.createVariableStatement(
      undefined,
      factory.createVariableDeclarationList(
        [factory.createVariableDeclaration(
          factory.createIdentifier("x_key"),
          undefined,
          undefined,
          factory.createElementAccessExpression(
            factory.createIdentifier("x"),
            factory.createNumericLiteral("0")
          )
        )],
        ts.NodeFlags.Const
      )
    ),
    factory.createVariableStatement(
      undefined,
      factory.createVariableDeclarationList(
        [factory.createVariableDeclaration(
          factory.createIdentifier("x_value"),
          undefined,
          undefined,
          factory.createElementAccessExpression(
            factory.createIdentifier("x"),
            factory.createNumericLiteral("1")
          )
        )],
        ts.NodeFlags.Const
      )
    ),
    factory.createReturnStatement(factory.createCallExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier("att"),
        factory.createIdentifier("elt_to_mich")
      ),
      undefined,
      decls
    ))
  ])
}

const map_to_mich = (name: string, key_type: ArchetypeType | null, value_type: ArchetypeType | null, ci: ContractInterface) => {
  if (null == key_type) throw new Error("map_to_mich: null key type")
  if (null == value_type) throw new Error("map_to_mich: null value type")
  return internal_map_to_mich(name, [
    function_param_to_mich({ name: "x_key", type: key_type }, ci),
    function_param_to_mich({ name: "x_value", type: value_type }, ci)
  ])
}

export const function_param_to_mich = (fp: FunctionParameter, ci: ContractInterface): ts.CallExpression => {
  const throw_error = (ty: string): ts.CallExpression => {
    throw new Error("function_param_to_mich: unhandled type '" + ty + "'")
  }
  const option_to_mich = (ty: ArchetypeType, x: ts.Expression) => {
    return factory.createCallExpression(
      factory.createPropertyAccessExpression(
        x,
        factory.createIdentifier("to_mich")
      ),
      undefined,
      [factory.createParenthesizedExpression(factory.createArrowFunction(
        undefined,
        undefined,
        [factory.createParameterDeclaration(
          undefined,
          undefined,
          undefined,
          factory.createIdentifier("x"),
          undefined,
          undefined,
          undefined
        )],
        undefined,
        factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
        factory.createBlock(
          [factory.createReturnStatement(function_param_to_mich({ name: "x", type: ty }, ci))],
          false
        )
      ))]
    )
  }

  const or_to_mich = (ty_left: ArchetypeType, ty_right: ArchetypeType, x: ts.Expression) => {
    return factory.createCallExpression(
      factory.createPropertyAccessExpression(
        x,
        factory.createIdentifier("to_mich")
      ),
      undefined,
      [factory.createParenthesizedExpression(factory.createArrowFunction(
        undefined,
        undefined,
        [factory.createParameterDeclaration(
          undefined,
          undefined,
          undefined,
          factory.createIdentifier("x"),
          undefined,
          undefined,
          undefined
        )],
        undefined,
        factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
        factory.createBlock(
          [factory.createReturnStatement(function_param_to_mich({ name: "x", type: ty_left }, ci))],
          false
        )
      )),
      factory.createParenthesizedExpression(factory.createArrowFunction(
        undefined,
        undefined,
        [factory.createParameterDeclaration(
          undefined,
          undefined,
          undefined,
          factory.createIdentifier("x"),
          undefined,
          undefined,
          undefined
        )],
        undefined,
        factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
        factory.createBlock(
          [factory.createReturnStatement(function_param_to_mich({ name: "x", type: ty_right }, ci))],
          false
        )
      ))
      ]
    )
  }

  const ticket_to_mich = (ty: ArchetypeType, x: ts.Expression) => {
    return factory.createCallExpression(
      factory.createPropertyAccessExpression(
        x,
        factory.createIdentifier("to_mich")
      ),
      undefined,
      [factory.createParenthesizedExpression(factory.createArrowFunction(
        undefined,
        undefined,
        [factory.createParameterDeclaration(
          undefined,
          undefined,
          undefined,
          factory.createIdentifier("x"),
          undefined,
          undefined,
          undefined
        )],
        undefined,
        factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
        factory.createBlock(
          [factory.createReturnStatement(function_param_to_mich({ name: "x", type: ty }, ci))],
          false
        )
      ))]
    )
  }

  switch (fp.type.node) {
    case "address": return class_to_mich(factory.createIdentifier(fp.name))
    case "aggregate": return list_to_mich(fp.name, { node: "asset_key", name: fp.type.name }, ci)
    case "asset_container": return throw_error(fp.type.node);
    case "asset_key": {
      const [is_only_key, ty] = is_asset_one_field_key(fp.type.name, ci)
      if (is_only_key && ty != null) {
        return function_param_to_mich({ name: fp.name, type: ty }, ci)
      } else {
        return class_to_mich(factory.createIdentifier(fp.name));
      }
    }
    case "asset_value": {
      const [is_only_val, ty] = is_asset_one_field_val(fp.type.name, ci)
      if (is_only_val && ty != null) {
        return function_param_to_mich({ name: fp.name, type: ty }, ci)
      } else {
        return class_to_mich(factory.createIdentifier(fp.name));
      }
    }
    case "asset_view": return list_to_mich(fp.name, { node: "asset_key", name: fp.type.name }, ci);
    case "asset": return throw_error(fp.type.node);
    case "big_map": return map_to_mich(fp.name, fp.type.key_type, fp.type.value_type, ci);
    case "bls12_381_fr": return class_to_mich(factory.createIdentifier(fp.name));
    case "bls12_381_g1": return class_to_mich(factory.createIdentifier(fp.name));
    case "bls12_381_g2": return class_to_mich(factory.createIdentifier(fp.name));
    case "bool": return bool_to_mich(factory.createIdentifier(fp.name));
    case "bytes": return class_to_mich(factory.createIdentifier(fp.name));
    case "chain_id": return class_to_mich(factory.createIdentifier(fp.name));
    case "chest_key": return class_to_mich(factory.createIdentifier(fp.name));
    case "chest": return class_to_mich(factory.createIdentifier(fp.name));
    case "collection": return throw_error(fp.type.node);
    case "contract": return class_to_mich(factory.createIdentifier(fp.name));
    case "currency": return class_to_mich(factory.createIdentifier(fp.name));
    case "date": return date_to_mich(factory.createIdentifier(fp.name));
    case "duration": return class_to_mich(factory.createIdentifier(fp.name));
    case "enum": return class_to_mich(factory.createIdentifier(fp.name));
    case "event": return record_or_event_to_mich(fp, ci);
    case "int": return class_to_mich(factory.createIdentifier(fp.name));
    case "iterable_big_map": return map_to_mich(fp.name, fp.type.key_type, fp.type.value_type, ci);
    case "key_hash": return class_to_mich(factory.createIdentifier(fp.name));
    case "key": return class_to_mich(factory.createIdentifier(fp.name));
    case "lambda": return id_to_mich(factory.createIdentifier(fp.name));
    case "list": return list_to_mich(fp.name, fp.type.arg, ci);
    case "map": return map_to_mich(fp.name, fp.type.key_type, fp.type.value_type, ci);
    case "nat": return class_to_mich(factory.createIdentifier(fp.name));
    case "never": return throw_error(fp.type.node);
    case "operation": return throw_error(fp.type.node);
    case "option": return option_to_mich(fp.type.arg, factory.createIdentifier(fp.name));
    case "or": return or_to_mich(fp.type.left_type, fp.type.right_type, factory.createIdentifier(fp.name));
    case "partition": return list_to_mich(fp.name, { node: "asset_key", name: fp.type.name }, ci);
    case "rational": return class_to_mich(factory.createIdentifier(fp.name));
    case "record": return class_to_mich(factory.createIdentifier(fp.name));
    case "sapling_state": return class_to_mich(factory.createIdentifier(fp.name));
    case "sapling_transaction": return class_to_mich(factory.createIdentifier(fp.name));
    case "set": return list_to_mich(fp.name, fp.type.arg, ci);
    case "signature": return class_to_mich(factory.createIdentifier(fp.name));
    case "state": return throw_error(fp.type.node);
    case "string": return string_to_mich(factory.createIdentifier(fp.name));
    case "ticket": return ticket_to_mich(fp.type.arg, factory.createIdentifier(fp.name));
    case "timestamp": return throw_error(fp.type.node);
    case "tuple": return tuple_to_mich(fp.name, fp.type.args, ci);
    case "tx_rollup_l2_address": return class_to_mich(factory.createIdentifier(fp.name))
    case "unit": return unit_to_mich()
  }
}

export const function_params_to_mich = (a: Array<FunctionParameter>, ci: ContractInterface) => {
  if (a.length == 0) {
    return factory.createPropertyAccessExpression(
      factory.createIdentifier("att"),
      factory.createIdentifier("unit_mich")
    )
  } else if (a.length == 1) {
    return function_param_to_mich(a[0], ci)
  } else {
    return factory.createCallExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier("att"),
        factory.createIdentifier("pair_to_mich")
      ),
      undefined,
      [factory.createArrayLiteralExpression(
        a.map((x, i) => function_param_to_mich(x, ci)),
        true
      )]
    )
  }
}

export const storage_to_mich = (mt: MichelsonType, selts: Array<StorageElement>, ci: ContractInterface): ts.Expression => {
  if (mt.prim == "pair" && mt.annots && mt.annots.length == 0) {
    return factory.createCallExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier("att"),
        factory.createIdentifier("pair_to_mich")
      ),
      undefined,
      [factory.createArrayLiteralExpression(
        mt.args.map(x => storage_to_mich(x, selts, ci)),
        false
      )]
    )
  } else {
    let selt = selts[0]
    if (mt.annots && mt.annots.length > 0) {
      const annot = mt.annots[0]
      for (let i = 0; i < selts.length; i++) {
        if (annot == "%" + selts[i].name) {
          selt = selts[i]
        }
      }
    }
    return function_param_to_mich(selt, ci)
  }
}

const get_archetype_type_from_idx = (idx: number, fields: Array<Partial<Field>>) => {
  return fields[idx].type
}

const get_field_name_from_idx = (idx: number, fields: Array<Partial<Field>>) => {
  return fields[idx].name
}

const mich_type_to_archetype = (mt: MichelsonType): ArchetypeType => {
  switch (mt.prim) {
    case "address": return { node: mt.prim }
    case "big_map": return { node: mt.prim, key_type: mich_type_to_archetype(mt.args[0]), value_type: mich_type_to_archetype(mt.args[1]) }
    case "bls12_381_fr": return { node: mt.prim }
    case "bls12_381_g1": return { node: mt.prim }
    case "bls12_381_g2": return { node: mt.prim }
    case "bool": return { node: mt.prim }
    case "bytes": return { node: mt.prim }
    case "chain_id": return { node: mt.prim }
    case "chest_key": return { node: mt.prim }
    case "chest": return { node: mt.prim }
    case "contract": return { node: mt.prim, arg: mich_type_to_archetype(mt.args[0]) }
    case "int": return { node: mt.prim }
    case "key_hash": return { node: mt.prim }
    case "key": return { node: mt.prim }
    case "lambda": return { node: mt.prim, arg_type: mich_type_to_archetype(mt.args[0]), ret_type: mich_type_to_archetype(mt.args[1]) }
    case "list": return { node: mt.prim, arg: mich_type_to_archetype(mt.args[0]) }
    case "map": return { node: mt.prim, key_type: mich_type_to_archetype(mt.args[0]), value_type: mich_type_to_archetype(mt.args[1]) }
    case "mutez": return { node: "currency" }
    case "nat": return { node: mt.prim }
    case "never": return { node: mt.prim }
    case "operation": return { node: mt.prim }
    case "option": return { node: mt.prim, arg: mich_type_to_archetype(mt.args[0]) }
    case "or": return { node: mt.prim, left_type: mich_type_to_archetype(mt.args[0]), right_type: mich_type_to_archetype(mt.args[1]) }
    case "pair": return { node: "tuple", args: mt.args.map(mich_type_to_archetype) }
    case "sapling_state": return { node: mt.prim, memo_size: parseInt(mt.args[0].int) }
    case "sapling_transaction": return { node: mt.prim, memo_size: parseInt(mt.args[0].int) }
    case "set": return { node: mt.prim, arg: mich_type_to_archetype(mt.args[0]) }
    case "signature": return { node: mt.prim }
    case "string": return { node: mt.prim }
    case "ticket": return { node: mt.prim, arg: mich_type_to_archetype(mt.args[0]) }
    case "timestamp": return { node: "date" }
    case "tx_rollup_l2_address": return { node: mt.prim }
    case "unit": return { node: mt.prim }
    // default: throw new Error("mich_type_to_archetype: cannot convert prim '" + (mt.prim ?? "null") + "'")
  }
}

/**
 * Generates To Michelson TS expression that follows its Michelson Type structure
 * @param v value name
 * @param mt local michelson type
 * @param fields base of fields for type lookup
 * @param fidx field index
 * @returns pair of number of fields looked up so far and 'to_mich' expression
 */
export const entity_to_mich = (v: string, mt: MichelsonType, fields: Array<Partial<Field>>, fidx = 0, ci: ContractInterface): [number, ts.CallExpression] => {
  if (mt.annots && mt.annots.length > 0) {
    //const name = mt.annots[0].slice(1)
    const name = get_field_name_from_idx(fidx, fields)

    //const atype = get_archetype_type_of(name, fields)
    const atype = get_archetype_type_from_idx(fidx, fields)
    if (undefined == atype) {
      throw new Error("entity_to_mich: type not found for '" + (name ?? "null") + "'")
    }
    if (name == null) {
      throw new Error("entity_to_mich: field name is null")
    }
    const fp = { name: v + "." + name, type: atype }
    return [fidx + 1, function_param_to_mich(fp, ci)]
  } else {
    switch (mt.prim) {
      case "pair": {
        if (fields.length == 1 && fields[0].type?.node == "record") {
          return [fidx, function_param_to_mich({ name: v, type: mich_type_to_archetype(mt) }, ci)]
        } else {
          const lexpr: Array<ts.Expression> = [];
          const [fidx00, llexpr] = mt.args.reduce(([idx, lexpr], arg) => {
            const [fidx0, expr] = entity_to_mich(v, arg, fields, idx, ci);
            lexpr.push(expr)
            return [fidx0, lexpr]
          }, ([fidx, lexpr]));

          return [fidx00, factory.createCallExpression(
            factory.createPropertyAccessExpression(
              factory.createIdentifier("att"),
              factory.createIdentifier("pair_to_mich")
            ),
            undefined,
            [factory.createArrayLiteralExpression(llexpr, false)]
          )]
        }
      }
      case "map":
      case "big_map": {
        // left
        const [_, expr0] = entity_to_mich("x_key", mt.args[0], fields.filter(x => x.is_key), fidx, ci)
        // right
        const [fidx1, expr1] = entity_to_mich("x_value", mt.args[1], fields.filter(x => !x.is_key), fidx, ci)
        return [fidx1, internal_map_to_mich(v, [
          expr0,
          expr1
        ])]
      }
      case "set": {
        const [_, expr0] = entity_to_mich("x", mt.args[0], fields.filter(x => x.is_key), fidx, ci)
        return [fidx, internal_list_to_mich(v, [
          factory.createReturnStatement(expr0)
        ])
        ]
      }
      default: return [fidx, function_param_to_mich({ name: v, type: mich_type_to_archetype(mt) }, ci)]
    }
  }
}


export const value_to_mich_type = (mt: MichelsonType): ts.CallExpression => {
  const for_composite_type = (arg: MichelsonType) => {
    const annots = mt.annots ? (mt.annots.length >= 1 ? [factory.createStringLiteral(mt.annots[0])] : []) : []
    return factory.createCallExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier("att"),
        factory.createIdentifier("list_annot_to_mich_type")
      ),
      undefined,
      [
        value_to_mich_type(arg),
        factory.createArrayLiteralExpression(
          annots,
          false
        )
      ])
  }

  const for_set_type = (arg: MichelsonType) => {
    const annots = mt.annots ? (mt.annots.length >= 1 ? [factory.createStringLiteral(mt.annots[0])] : []) : []
    return factory.createCallExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier("att"),
        factory.createIdentifier("set_annot_to_mich_type")
      ),
      undefined,
      [
        value_to_mich_type(arg),
        factory.createArrayLiteralExpression(
          annots,
          false
        )
      ])
  }

  const for_simple_type = (prim: string, annots: Array<string>) => {
    const exprAnnots = annots.length >= 1 ? [factory.createStringLiteral(annots[0])] : []
    return factory.createCallExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier("att"),
        factory.createIdentifier("prim_annot_to_mich_type")
      ),
      undefined,
      [
        factory.createStringLiteral(prim),
        factory.createArrayLiteralExpression(
          exprAnnots,
          false
        )
      ]
    )
  }

  const for_lambda = (annots: Array<string>, arg_left: MichelsonType, arg_right: MichelsonType) => {
    const exprAnnots = annots.length >= 1 ? [factory.createStringLiteral(annots[0])] : []
    return factory.createCallExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier("att"),
        factory.createIdentifier("pair_annot_to_mich_type")
      ),
      undefined,
      [
        factory.createStringLiteral("lambda"),
        value_to_mich_type(arg_left),
        value_to_mich_type(arg_right),
        factory.createArrayLiteralExpression(
          exprAnnots,
          false
        )
      ]
    )
  }

  switch (mt.prim) {
    case "address": return for_simple_type(mt.prim, mt.annots ?? [])
    case "big_map": {
      const annots = mt.annots && mt.annots.length >= 1 ? [factory.createStringLiteral(mt.annots[0])] : []
      return factory.createCallExpression(
        factory.createPropertyAccessExpression(
          factory.createIdentifier("att"),
          factory.createIdentifier("pair_annot_to_mich_type")
        ),
        undefined,
        [
          factory.createStringLiteral("big_map"),
          value_to_mich_type(mt.args[0]), value_to_mich_type(mt.args[1]), factory.createArrayLiteralExpression(annots, false)
        ]
      )
    }
    case "bls12_381_fr": return for_simple_type(mt.prim, mt.annots ?? [])
    case "bls12_381_g1": return for_simple_type(mt.prim, mt.annots ?? [])
    case "bls12_381_g2": return for_simple_type(mt.prim, mt.annots ?? [])
    case "bool": return for_simple_type(mt.prim, mt.annots ?? [])
    case "bytes": return for_simple_type(mt.prim, mt.annots ?? [])
    case "chain_id": return for_simple_type(mt.prim, mt.annots ?? [])
    case "chest_key": return for_simple_type(mt.prim, mt.annots ?? [])
    case "chest": return for_simple_type(mt.prim, mt.annots ?? [])
    case "contract": throw new Error(`value_to_mich_type: TODO: ${mt.prim}`)
    case "int": return for_simple_type(mt.prim, mt.annots ?? [])
    case "key_hash": return for_simple_type(mt.prim, mt.annots ?? [])
    case "key": return for_simple_type(mt.prim, mt.annots ?? [])
    case "lambda": return for_lambda(mt.annots ?? [], mt.args[0], mt.args[1])
    case "list": return for_composite_type(mt.args[0])
    case "map": {
      const annots = mt.annots && mt.annots.length >= 1 ? [factory.createStringLiteral(mt.annots[0])] : []
      return factory.createCallExpression(
        factory.createPropertyAccessExpression(
          factory.createIdentifier("att"),
          factory.createIdentifier("pair_annot_to_mich_type")
        ),
        undefined,
        [
          factory.createStringLiteral("map"),
          value_to_mich_type(mt.args[0]), value_to_mich_type(mt.args[1]), factory.createArrayLiteralExpression(annots, false)
        ]
      )
    }
    case "mutez": return for_simple_type(mt.prim, mt.annots ?? [])
    case "nat": return for_simple_type(mt.prim, mt.annots ?? [])
    case "never": return for_simple_type(mt.prim, mt.annots ?? [])
    case "operation": return for_simple_type(mt.prim, mt.annots ?? [])
    case "option": {
      const annots = mt.annots ? (mt.annots.length >= 1 ? [factory.createStringLiteral(mt.annots[0])] : []) : []
      return factory.createCallExpression(
        factory.createPropertyAccessExpression(
          factory.createIdentifier("att"),
          factory.createIdentifier("option_annot_to_mich_type")
        ),
        undefined,
        [
          value_to_mich_type(mt.args[0]),
          factory.createArrayLiteralExpression(
            annots,
            false
          )
        ])
    }
    case "or": return factory.createCallExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier("att"),
        factory.createIdentifier("or_to_mich_type")
      ),
      undefined,
      [
        value_to_mich_type(mt.args[0]),
        value_to_mich_type(mt.args[1]),
        factory.createArrayLiteralExpression(
          mt.annots ? mt.annots.map(a => factory.createStringLiteral(a, false)) : []
        )
      ]
    )
    case "pair": {
      const annots = mt.annots && mt.annots.length >= 1 ? [factory.createStringLiteral(mt.annots[0])] : []
      return factory.createCallExpression(
        factory.createPropertyAccessExpression(
          factory.createIdentifier("att"),
          factory.createIdentifier("pair_array_to_mich_type")
        ),
        undefined,
        [
          factory.createArrayLiteralExpression(
            mt.args.map(value_to_mich_type),
            // [value_to_mich_type(mt.args[0]), value_to_mich_type(mt.args[1])],
            true
          ),
          factory.createArrayLiteralExpression(
            annots,
            false
          )
        ]
      )
    }
    case "ticket": {
      const annots = mt.annots && mt.annots.length >= 1 ? [factory.createStringLiteral(mt.annots[0])] : []
      return factory.createCallExpression(
        factory.createPropertyAccessExpression(
          factory.createIdentifier("att"),
          factory.createIdentifier("ticket_annot_to_mich_type")
        ),
        undefined,
        [
          value_to_mich_type(mt.args[0]),
          factory.createArrayLiteralExpression(
            annots,
            false
          )
        ])
    }
    case "sapling_state": return for_simple_type(mt.prim, mt.annots ?? [])
    case "sapling_transaction": return for_simple_type(mt.prim, mt.annots ?? [])
    case "set": return for_set_type(mt.args[0])
    case "signature": return for_simple_type(mt.prim, mt.annots ?? [])
    case "string": return for_simple_type(mt.prim, mt.annots ?? [])
    case "ticket": return for_simple_type(mt.prim, mt.annots ?? [])
    case "timestamp": return for_simple_type(mt.prim, mt.annots ?? [])
    case "tx_rollup_l2_address": return for_simple_type(mt.prim, mt.annots ?? [])
    case "unit": return for_simple_type(mt.prim, mt.annots ?? [])
  }
}

/* Errors ------------------------------------------------------------------ */

export const to_label = (input: string) => {
  const res = input.replace(/^\d/g, "_").split(new RegExp("[ !\"#$%&'()*+,-./:;<=>?@\[\\\]^`{}~]")).join('_').toUpperCase();
  return res
}

export const mich_type_to_error = (expr: MichelsonData): [string, ts.Expression] | null => {
  if ((expr as MDString) && (expr as MDString).string) {
    return [to_label((expr as MDString).string), factory.createCallExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier("att"),
        factory.createIdentifier("string_to_mich")
      ),
      undefined,
      [factory.createStringLiteral("\"" + (expr as MDString).string + "\"")]
    )]
  } else if ((expr as MDPrimMulti) && (expr as MDPrimMulti).prim == "Pair") {
    const args: Array<[string, ts.Expression]> =
      (expr as MDPrimMulti).args.reduce((acc, x) => {
        const res = mich_type_to_error(x);
        if (res != null) {
          acc.push(res);
          return acc
        } else {
          return acc
        }
      }, ([] as Array<[string, ts.Expression]>));
    const label = args.reduce((acc, n) => {
      return (acc == "" ? "" : acc + "_") + n[0].toUpperCase()
    }, "")
    return [label, factory.createCallExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier("att"),
        factory.createIdentifier("pair_to_mich")
      ),
      undefined,
      [factory.createArrayLiteralExpression(args.map(p => p[1]))]
    )]
  } else {
    return null
  }
}

export const make_error = (error: Error): [string, ts.Expression] | null => {
  switch (error.kind) {
    case "InvalidCondition":
      const res = mich_type_to_error(error.expr);
      return res ? [error.args[0], res[1]] : null
    default:
      return mich_type_to_error(error.expr)
  }
}

/* constant code functions */

export const make_to_string_decl = () => {
  return factory.createMethodDeclaration(
    undefined,
    undefined,
    undefined,
    factory.createIdentifier("toString"),
    undefined,
    undefined,
    [],
    factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
    factory.createBlock(
      [factory.createReturnStatement(factory.createCallExpression(
        factory.createPropertyAccessExpression(
          factory.createIdentifier("JSON"),
          factory.createIdentifier("stringify")
        ),
        undefined,
        [
          factory.createThis(),
          factory.createNull(),
          factory.createNumericLiteral("2")
        ]
      ))],
      true
    )
  )
}

// class utils

export const get_constructor = () => {
  return factory.createConstructorDeclaration(
    undefined,
    undefined,
    [factory.createParameterDeclaration(
      undefined,
      undefined,
      undefined,
      factory.createIdentifier("address"),
      undefined,
      factory.createUnionTypeNode([
        factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
        factory.createKeywordTypeNode(ts.SyntaxKind.UndefinedKeyword)
      ]),
      factory.createIdentifier("undefined")
    )],
    factory.createBlock(
      [factory.createExpressionStatement(factory.createBinaryExpression(
        factory.createPropertyAccessExpression(
          factory.createThis(),
          factory.createIdentifier("address")
        ),
        factory.createToken(ts.SyntaxKind.EqualsToken),
        factory.createIdentifier("address")
      ))],
      true
    )
  )
}

export const get_get_address_decl = () => {
  return factory.createMethodDeclaration(
    undefined,
    undefined,
    undefined,
    factory.createIdentifier("get_address"),
    undefined,
    undefined,
    [],
    factory.createTypeReferenceNode(
      factory.createQualifiedName(
        factory.createIdentifier("att"),
        factory.createIdentifier("Address")
      ),
      undefined
    ),
    factory.createBlock(
      [
        factory.createIfStatement(
          factory.createBinaryExpression(
            factory.createIdentifier("undefined"),
            factory.createToken(ts.SyntaxKind.ExclamationEqualsToken),
            factory.createPropertyAccessExpression(
              factory.createThis(),
              factory.createIdentifier("address")
            )
          ),
          factory.createBlock(
            [factory.createReturnStatement(factory.createNewExpression(
              factory.createPropertyAccessExpression(
                factory.createIdentifier("att"),
                factory.createIdentifier("Address")
              ),
              undefined,
              [factory.createPropertyAccessExpression(
                factory.createThis(),
                factory.createIdentifier("address")
              )]
            ))],
            true
          ),
          undefined
        ),
        factory.createThrowStatement(factory.createNewExpression(
          factory.createIdentifier("Error"),
          undefined,
          [factory.createStringLiteral("Contract not initialised")]
        ))
      ],
      true
    )
  )
}

export const get_get_balance_decl = () => {
  return factory.createMethodDeclaration(
    undefined,
    [factory.createModifier(ts.SyntaxKind.AsyncKeyword)],
    undefined,
    factory.createIdentifier("get_balance"),
    undefined,
    undefined,
    [],
    factory.createTypeReferenceNode(
      factory.createIdentifier("Promise"),
      [factory.createTypeReferenceNode(
        factory.createQualifiedName(
          factory.createIdentifier("att"),
          factory.createIdentifier("Tez")
        ),
        undefined
      )]
    ),
    factory.createBlock(
      [
        factory.createIfStatement(
          factory.createBinaryExpression(
            factory.createNull(),
            factory.createToken(ts.SyntaxKind.ExclamationEqualsToken),
            factory.createPropertyAccessExpression(
              factory.createThis(),
              factory.createIdentifier("address")
            )
          ),
          factory.createBlock(
            [factory.createReturnStatement(factory.createAwaitExpression(factory.createCallExpression(
              factory.createPropertyAccessExpression(
                factory.createIdentifier("ex"),
                factory.createIdentifier("get_balance")
              ),
              undefined,
              [factory.createNewExpression(
                factory.createPropertyAccessExpression(
                  factory.createIdentifier("att"),
                  factory.createIdentifier("Address")
                ),
                undefined,
                [factory.createPropertyAccessExpression(
                  factory.createThis(),
                  factory.createIdentifier("address")
                )]
              )]
            )))],
            true
          ),
          undefined
        ),
        factory.createThrowStatement(factory.createNewExpression(
          factory.createIdentifier("Error"),
          undefined,
          [factory.createStringLiteral("Contract not initialised")]
        ))
      ],
      true
    )
  )
}


export const raw_to_contract_interface = (rci: RawContractInterface): ContractInterface => {
  const replace_keyword = (input: string): string => {
    if (input == "default") {
      return "$" + input
    }
    return input
  }
  const to_archetype_type = (rty: RawArchetypeType): ArchetypeType => {
    const force_name = (i: string | null): string => {
      if (i == null) {
        throw new Error("Invalid name")
      } else {
        return i
      }
    };
    const force_int_value = (i: number | null): number => {
      if (i == null) {
        throw new Error("Invalid int_value")
      } else {
        return i
      }
    };
    switch (rty.node) {
      case "address": return { node: rty.node }
      case "aggregate": return { node: rty.node, name: force_name(rty.name) }
      case "asset_container": return { node: rty.node, name: force_name(rty.name) }
      case "asset_key": return { node: rty.node, name: force_name(rty.name) }
      case "asset_value": return { node: rty.node, name: force_name(rty.name) }
      case "asset_view": return { node: rty.node, name: force_name(rty.name) }
      case "asset": return { node: rty.node, name: force_name(rty.name) }
      case "big_map": return { node: rty.node, key_type: to_archetype_type(rty.args[0]), value_type: to_archetype_type(rty.args[1]) }
      case "bls12_381_fr": return { node: rty.node }
      case "bls12_381_g1": return { node: rty.node }
      case "bls12_381_g2": return { node: rty.node }
      case "bool": return { node: rty.node }
      case "bytes": return { node: rty.node }
      case "chain_id": return { node: rty.node }
      case "chest_key": return { node: rty.node }
      case "chest": return { node: rty.node }
      case "collection": return { node: rty.node, name: force_name(rty.name) }
      case "contract": return { node: rty.node, arg: to_archetype_type(rty.args[0]) }
      case "currency": return { node: rty.node }
      case "date": return { node: rty.node }
      case "duration": return { node: rty.node }
      case "enum": return { node: rty.node, name: force_name(rty.name) }
      case "event": return { node: rty.node, name: force_name(rty.name) }
      case "int": return { node: rty.node }
      case "iterable_big_map": return { node: rty.node, key_type: to_archetype_type(rty.args[0]), value_type: to_archetype_type(rty.args[1]) }
      case "key_hash": return { node: rty.node }
      case "key": return { node: rty.node }
      case "lambda": return { node: rty.node, arg_type: to_archetype_type(rty.args[0]), ret_type: to_archetype_type(rty.args[1]) }
      case "list": return { node: rty.node, arg: to_archetype_type(rty.args[0]) }
      case "map": return { node: rty.node, key_type: to_archetype_type(rty.args[0]), value_type: to_archetype_type(rty.args[1]) }
      case "nat": return { node: rty.node }
      case "never": return { node: rty.node }
      case "operation": return { node: rty.node }
      case "option": return { node: rty.node, arg: to_archetype_type(rty.args[0]) }
      case "or": return { node: rty.node, left_type: to_archetype_type(rty.args[0]), right_type: to_archetype_type(rty.args[1]) }
      case "partition": return { node: rty.node, name: force_name(rty.name) }
      case "rational": return { node: rty.node }
      case "record": return { node: rty.node, name: force_name(rty.name) }
      case "sapling_state": return { node: rty.node, memo_size: force_int_value(rty.int_value) }
      case "sapling_transaction": return { node: rty.node, memo_size: force_int_value(rty.int_value) }
      case "set": return { node: rty.node, arg: to_archetype_type(rty.args[0]) }
      case "signature": return { node: rty.node }
      case "state": return { node: rty.node }
      case "string": return { node: rty.node }
      case "ticket": return { node: rty.node, arg: to_archetype_type(rty.args[0]) }
      case "timestamp": return { node: rty.node }
      case "tuple": return { node: rty.node, args: rty.args.map(to_archetype_type) }
      case "tx_rollup_l2_address": return { node: rty.node }
      case "unit": return { node: rty.node }
    }
  }

  const to_michelson_type = (rty: RawMicheline): MichelsonType => {
    switch (rty.prim) {
      case "address": return <MTPrimSimple>{ prim: rty.prim, annots: rty.annots }
      case "big_map": return <MTPrimPair>{ prim: rty.prim, annots: rty.annots, args: [to_michelson_type(rty.args[0]), to_michelson_type(rty.args[1])] }
      case "bls12_381_fr": return <MTPrimSimple>{ prim: rty.prim, annots: rty.annots }
      case "bls12_381_g1": return <MTPrimSimple>{ prim: rty.prim, annots: rty.annots }
      case "bls12_381_g2": return <MTPrimSimple>{ prim: rty.prim, annots: rty.annots }
      case "bool": return <MTPrimSimple>{ prim: rty.prim, annots: rty.annots }
      case "bytes": return <MTPrimSimple>{ prim: rty.prim, annots: rty.annots }
      case "chain_id": return <MTPrimSimple>{ prim: rty.prim, annots: rty.annots }
      case "chest_key": return <MTPrimSimple>{ prim: rty.prim, annots: rty.annots }
      case "chest": return <MTPrimSimple>{ prim: rty.prim, annots: rty.annots }
      case "contract": return <MTPrimSingle>{ prim: rty.prim, annots: rty.annots, args: [to_michelson_type(rty.args[0])] }
      case "int": return <MTPrimSimple>{ prim: rty.prim, annots: rty.annots }
      case "key_hash": return <MTPrimSimple>{ prim: rty.prim, annots: rty.annots }
      case "key": return <MTPrimSimple>{ prim: rty.prim, annots: rty.annots }
      case "lambda": return <MTPrimPair>{ prim: rty.prim, annots: rty.annots, args: [to_michelson_type(rty.args[0]), to_michelson_type(rty.args[1])] }
      case "list": return <MTPrimSingle>{ prim: rty.prim, annots: rty.annots, args: [to_michelson_type(rty.args[0])] }
      case "map": return <MTPrimPair>{ prim: rty.prim, annots: rty.annots, args: [to_michelson_type(rty.args[0]), to_michelson_type(rty.args[1])] }
      case "mutez": return <MTPrimSimple>{ prim: rty.prim, annots: rty.annots }
      case "nat": return <MTPrimSimple>{ prim: rty.prim, annots: rty.annots }
      case "never": return <MTPrimSimple>{ prim: rty.prim, annots: rty.annots }
      case "operation": return <MTPrimSimple>{ prim: rty.prim, annots: rty.annots }
      case "option": return <MTPrimSingle>{ prim: rty.prim, annots: rty.annots, args: [to_michelson_type(rty.args[0])] }
      case "or": return <MTPrimPair>{ prim: rty.prim, annots: rty.annots, args: [to_michelson_type(rty.args[0]), to_michelson_type(rty.args[1])] }
      case "pair": return <MTPrimMulti>{ prim: rty.prim, annots: rty.annots, args: rty.args.map(to_michelson_type) }
      case "sapling_state": return <MTPrimSingleInt>{ prim: rty.prim, annots: rty.annots, args: [{ int: rty.args[0].int }] }
      case "sapling_transaction": return <MTPrimSingleInt>{ prim: rty.prim, annots: rty.annots, args: [{ int: rty.args[0].int }] }
      case "set": return <MTPrimSingle>{ prim: rty.prim, annots: rty.annots, args: [to_michelson_type(rty.args[0])] }
      case "signature": return <MTPrimSimple>{ prim: rty.prim, annots: rty.annots }
      case "string": return <MTPrimSimple>{ prim: rty.prim, annots: rty.annots }
      case "ticket": return <MTPrimSingle>{ prim: rty.prim, annots: rty.annots, args: [to_michelson_type(rty.args[0])] }
      case "timestamp": return <MTPrimSimple>{ prim: rty.prim, annots: rty.annots }
      case "tx_rollup_l2_address": return <MTPrimSimple>{ prim: rty.prim, annots: rty.annots }
      case "unit": return <MTPrimSimple>{ prim: rty.prim, annots: rty.annots }
      default: throw new Error(`to_michelson_type: Invalid type ${rty.prim ?? "null"}`)
    }
  }

  const to_michelson_data = (rd: RawMicheline): MichelsonData => {
    if (rd.string) {
      return <MDString>{ string: rd.string }
    } else if (rd.int) {
      return <MDInt>{ int: rd.int }
    } else if (rd.bytes) {
      return <MDBytes>{ bytes: rd.bytes }
    } else if (rd.prim) {
      switch (rd.prim) {
        case "Elt": return <MDPrimPair>{ prim: rd.prim, args: [to_michelson_data(rd.args[0]), to_michelson_data(rd.args[1])] }
        case "False": return <MDPrimSimple>{ prim: rd.prim }
        case "Left": return <MDPrimSingle>{ prim: rd.prim, args: [to_michelson_data(rd.args[0])] }
        case "None": return <MDPrimSimple>{ prim: rd.prim }
        case "Pair": return <MDPrimMulti>{ prim: rd.prim, args: rd.args.map(to_michelson_data) }
        case "Right": return <MDPrimSingle>{ prim: rd.prim, args: [to_michelson_data(rd.args[0])] }
        case "Some": return <MDPrimSingle>{ prim: rd.prim, args: [to_michelson_data(rd.args[0])] }
        case "True": return <MDPrimSimple>{ prim: rd.prim }
        case "Unit": return <MDPrimSimple>{ prim: rd.prim }
        default: throw new Error(`to_michelson_data: Invalid data ${rd.prim ?? "null"}`)
      }
    } else {
      return <MDArray>(rd.array.map(to_michelson_data))
    }
  }

  const to_michelson_type_is_storable = (i: { value: RawMicheline, is_storable: boolean }): { value: MichelsonType, is_storable: boolean } => {
    return { value: to_michelson_type(i.value), is_storable: i.is_storable }
  }

  const for_field = (i: FieldGen<RawArchetypeType>): Field => {
    return { ...i, "type": to_archetype_type(i.type) }
  };

  const for_field_omit = (i: Omit<FieldGen<RawArchetypeType>, "is_key">): Omit<Field, "is_key"> => {
    return { ...i, "type": to_archetype_type(i.type) }
  };

  const for_function_parameter = (i: FunctionParameterGen<RawArchetypeType>): FunctionParameter => {
    return { ...i, "type": to_archetype_type(i.type) }
  };

  return {
    "name": rci.name,
    "parameters": rci.parameters.map((i: ContractParameterGen<RawArchetypeType>): ContractParameter => { return { ...i, "type": to_archetype_type(i.type) } }),
    "types": {
      assets: rci.types.assets.map((i: AssetGen<RawArchetypeType, RawMicheline>): Asset => {
        return {
          ...i,
          "fields": i.fields.map(for_field),
          "container_type_michelson": to_michelson_type(i.container_type_michelson),
          "key_type_michelson": to_michelson_type(i.key_type_michelson),
          "value_type_michelson": to_michelson_type(i.value_type_michelson),
        }
      }),
      enums: rci.types.enums.map((i: EnumGen<RawArchetypeType, RawMicheline>): Enum => {
        return {
          ...i,
          "constructors": i.constructors.map((i: EnumValueGen<RawArchetypeType>): EnumValue => { return { ...i, "types": i.types.map(to_archetype_type) } }),
          "type_michelson": to_michelson_type(i.type_michelson),
        }
      }),
      records: rci.types.records.map((i: RecordGen<RawArchetypeType, RawMicheline>): Record => {
        return {
          ...i,
          "fields": i.fields.map(for_field_omit),
          "type_michelson": to_michelson_type(i.type_michelson)
        }
      }),
      events: rci.types.events.map((i: RecordGen<RawArchetypeType, RawMicheline>): Record => {
        return {
          ...i,
          "fields": i.fields.map(for_field_omit),
          "type_michelson": to_michelson_type(i.type_michelson)
        }
      }),
    },
    storage: rci.storage.map((i: StorageElementGen<RawArchetypeType>): StorageElement => {
      return { ...i, "name": replace_keyword(i.name), "type": to_archetype_type(i.type) }
    }),
    storage_type: to_michelson_type_is_storable(rci.storage_type),
    entrypoints: rci.entrypoints.map((i: EntrypointGen<RawArchetypeType>): Entrypoint => {
      return {
        ...i,
        "args": i.args.map(for_function_parameter)
      }
    }),
    getters: rci.getters.map((i: GetterGen<RawArchetypeType, RawMicheline>): Getter => {
      return {
        ...i,
        "args": i.args.map(for_function_parameter),
        "return": to_archetype_type(i.return),
        "return_michelson": to_michelson_type_is_storable(i.return_michelson)
      }
    }),
    views: rci.views.map((i: ViewGen<RawArchetypeType>): View => { return { ...i, "args": i.args.map(for_function_parameter), "return": to_archetype_type(i.return) } }),
    errors: rci.errors.map(x => { return { ...x, expr: to_michelson_data(x.expr) } })
  }
}

export const to_michelson_type = (rmt: RawMicheline): MichelsonType => {
  switch (rmt.prim) {
    case "address": return { prim: rmt.prim, annots: rmt.annots }
    case "big_map": return { prim: rmt.prim, annots: rmt.annots, args: [to_michelson_type(rmt.args[0]), to_michelson_type(rmt.args[1])] }
    case "bls12_381_fr": return { prim: rmt.prim, annots: rmt.annots }
    case "bls12_381_g1": return { prim: rmt.prim, annots: rmt.annots }
    case "bls12_381_g2": return { prim: rmt.prim, annots: rmt.annots }
    case "bool": return { prim: rmt.prim, annots: rmt.annots }
    case "bytes": return { prim: rmt.prim, annots: rmt.annots }
    case "chain_id": return { prim: rmt.prim, annots: rmt.annots }
    case "chest_key": return { prim: rmt.prim, annots: rmt.annots }
    case "chest": return { prim: rmt.prim, annots: rmt.annots }
    case "contract": return { prim: rmt.prim, annots: rmt.annots, args: [to_michelson_type(rmt.args[0])] }
    case "int": return { prim: rmt.prim, annots: rmt.annots }
    case "key_hash": return { prim: rmt.prim, annots: rmt.annots }
    case "key": return { prim: rmt.prim, annots: rmt.annots }
    case "lambda": return { prim: rmt.prim, annots: rmt.annots, args: [to_michelson_type(rmt.args[0]), to_michelson_type(rmt.args[1])] }
    case "list": return { prim: rmt.prim, annots: rmt.annots, args: [to_michelson_type(rmt.args[0])] }
    case "map": return { prim: rmt.prim, annots: rmt.annots, args: [to_michelson_type(rmt.args[0]), to_michelson_type(rmt.args[1])] }
    case "mutez": return { prim: rmt.prim, annots: rmt.annots }
    case "nat": return { prim: rmt.prim, annots: rmt.annots }
    case "never": return { prim: rmt.prim, annots: rmt.annots }
    case "operation": return { prim: rmt.prim, annots: rmt.annots }
    case "option": return { prim: rmt.prim, annots: rmt.annots, args: [to_michelson_type(rmt.args[0])] }
    case "or": return { prim: rmt.prim, annots: rmt.annots, args: [to_michelson_type(rmt.args[0]), to_michelson_type(rmt.args[1])] }
    case "pair": return { prim: rmt.prim, annots: rmt.annots, args: rmt.args.map(to_michelson_type) }
    case "sapling_state": { if (rmt.args[0].int == null) { throw new Error("to_michelson_type: Invalid sapling_state") } return { prim: rmt.prim, annots: rmt.annots, args: [{ int: rmt.args[0].int }] } }
    case "sapling_transaction": { if (rmt.args[0].int == null) { throw new Error("to_michelson_type: Invalid sapling_transaction") } return { prim: rmt.prim, annots: rmt.annots, args: [{ int: rmt.args[0].int }] } }
    case "set": return { prim: rmt.prim, annots: rmt.annots, args: [to_michelson_type(rmt.args[0])] }
    case "signature": return { prim: rmt.prim, annots: rmt.annots }
    case "string": return { prim: rmt.prim, annots: rmt.annots }
    case "ticket": return { prim: rmt.prim, annots: rmt.annots, args: [to_michelson_type(rmt.args[0])] }
    case "timestamp": return { prim: rmt.prim, annots: rmt.annots }
    case "tx_rollup_l2_address": return { prim: rmt.prim, annots: rmt.annots }
    case "unit": return { prim: rmt.prim, annots: rmt.annots }
    default: throw new Error(`to_michelson_type: Invalid type ${rmt.prim ?? "null"}`)
  }
}

