import ts, { factory, KeywordTypeNode, SyntaxKind } from "typescript";

export type ArchetypeType = {
  "node": "address" | "aggregate" | "asset_container" | "asset_key" | "asset_value" | "asset_view" | "asset" | "big_map" | "bls12_381_fr" | "bls12_381_g1" | "bls12_381_g2" | "bool" | "bytes" | "chain_id" | "chest_key" | "chest" | "collection" | "contract" | "currency" | "date" | "duration" | "enum" | "event" | "int" | "iterable_big_map" | "key_hash" | "key" | "lambda" | "list" | "map" | "nat" | "never" | "operation" | "option" | "or" | "partition" | "rational" | "record" | "sapling_state" | "sapling_transaction" | "set" | "signature" | "state" | "string" | "ticket" | "timestamp" | "tuple" | "unit"
  "name": string | null
  "args": Array<ArchetypeType>
}

export type MichelsonType = {
  "prim": string | null
  "int": string | null
  "bytes": string | null
  "string": string | null
  "args": Array<MichelsonType>
  "annots": Array<string>
  "array": Array<MichelsonType>
}

export type ContractParameter = {
  "name": string
  "type": ArchetypeType
  "const": boolean
  "default": string | null
}

export type FunctionParameter = {
  "name": string
  "type": ArchetypeType
}

export type Entrypoint = {
  "name": string
  "args": Array<FunctionParameter>
}

export type Field = {
  "name": string
  "type": ArchetypeType
  "is_key": boolean
}

export type Asset = {
  "name": string
  "container_kind": string
  "fields": Array<Field>
  "container_type_michelson": MichelsonType
  "key_type_michelson": MichelsonType
  "value_type_michelson": MichelsonType
}

export type EnumValue = {
  "name": string,
  "types": Array<ArchetypeType>
}

export type Enum = {
  "name": string
  "constructors": Array<EnumValue>
  "type_michelson": MichelsonType
}

export type StorageElement = {
  "name": string
  "type": ArchetypeType
  "const": boolean
}

export type Record = {
  "name": string
  "fields": Array<Omit<Field,"is_key">>
  "type_michelson": MichelsonType
}

export type Getter = {
  "name": string
  "args": Array<FunctionParameter>
  "return" : ArchetypeType
  "return_michelson" : {
    "value" : MichelsonType
    "is_storable" : boolean
  }
}

export type View = {
  "name": string
  "args": Array<FunctionParameter>
  "return" : ArchetypeType
}

export type Event = {
  "name": string
  "fields": Array<Omit<Field,"is_key">>
  "type_michelson": MichelsonType
}

export type Error = {
  "kind" : string
  "args" : Array<string>
  "expr" : MichelsonType
}

export type ContractInterface = {
  "name" : string,
  "parameters" : Array<ContractParameter>
  "types": {
    "assets": Array<Asset>
    "enums": Array<Enum>
    "records": Array<Record>
    "events": Array<Event>
  }
  "storage": Array<StorageElement>
  "storage_type" : null | {
    "value" : MichelsonType
    "is_storable" : boolean
  }
  "entrypoints": Array<Entrypoint>
  "getters" : Array<Getter>
  "views" : Array<View>
  "errors": Array<Error>
}

/* Archetype type to Michelson type ---------------------------------------- */


export const archetype_type_to_mich_type = (at : ArchetypeType) : MichelsonType => {
  const generate_mich = (prim : string) => {
    return {
        prim: prim,
        int: null,
        bytes: null,
        string: null,
        args: [],
        annots: [],
        array: [],
      }
  }
  switch (at.node) {
    /* TODO record asset tuple enum option or ... */
    case "address": return generate_mich(at.node)
    case "aggregate": return generate_mich(at.node)
    case "asset_container": return generate_mich(at.node)
    case "asset_key": return generate_mich(at.node)
    case "asset_value": return generate_mich(at.node)
    case "asset_view": return generate_mich(at.node)
    case "asset": return generate_mich(at.node)
    case "big_map": return generate_mich(at.node)
    case "bls12_381_fr": return generate_mich(at.node)
    case "bls12_381_g1": return generate_mich(at.node)
    case "bls12_381_g2": return generate_mich(at.node)
    case "bool": return generate_mich(at.node)
    case "bytes": return generate_mich(at.node)
    case "chain_id": return generate_mich(at.node)
    case "chest_key": return generate_mich(at.node)
    case "chest": return generate_mich(at.node)
    case "collection": return generate_mich(at.node)
    case "contract": return generate_mich(at.node)
    case "currency": return generate_mich(at.node)
    case "date": return generate_mich(at.node)
    case "duration": return generate_mich(at.node)
    case "enum": return generate_mich(at.node)
    case "event": return generate_mich(at.node)
    case "int": return generate_mich(at.node)
    case "iterable_big_map": return generate_mich(at.node)
    case "key_hash": return generate_mich(at.node)
    case "key": return generate_mich(at.node)
    case "lambda": return generate_mich(at.node)
    case "list": return generate_mich(at.node)
    case "map": return generate_mich(at.node)
    case "nat": return generate_mich(at.node)
    case "never": return generate_mich(at.node)
    case "operation": return generate_mich(at.node)
    case "option": return generate_mich(at.node)
    case "or": return generate_mich(at.node)
    case "partition": return generate_mich(at.node)
    case "rational": return generate_mich(at.node)
    case "record": return generate_mich(at.node)
    case "sapling_state": return generate_mich(at.node)
    case "sapling_transaction": return generate_mich(at.node)
    case "set": return generate_mich(at.node)
    case "signature": return generate_mich(at.node)
    case "state": return generate_mich(at.node)
    case "string": return generate_mich(at.node)
    case "ticket": return generate_mich(at.node)
    case "timestamp": return generate_mich(at.node)
    case "tuple": return generate_mich(at.node)
    case "unit": return generate_mich(at.node)
  }
}

/* Archetype type to Typescript type --------------------------------------- */

export const archetype_type_to_ts_type = (at: ArchetypeType) : KeywordTypeNode<any>  => {
  const throw_error = (ty : string) => {
    throw new Error(`archetype_type_to_ts_type: '${ty}' type not handled`)
  }
  switch (at.node) {
    case "address":  return factory.createTypeReferenceNode(
      factory.createQualifiedName(
        factory.createIdentifier("att"),
        factory.createIdentifier("Address")
      ),
      undefined
    );
    case "aggregate": throw_error(at.node)
    case "asset_container": throw_error(at.node)
    case "asset_key": throw_error(at.node)
    case "asset_value":  return factory.createTypeReferenceNode(
      factory.createIdentifier(at.args[0].name+"_value"),
      undefined
    );
    case "asset_view": throw_error(at.node)
    case "asset": return factory.createTypeReferenceNode(
      factory.createIdentifier(at.name+"_container"),
      undefined
    );
    case "big_map": return factory.createTypeReferenceNode(
      factory.createIdentifier("Array"),
      [factory.createTupleTypeNode([
        archetype_type_to_ts_type(at.args[0]),
        archetype_type_to_ts_type(at.args[1])
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
    case "chain_id":  return factory.createTypeReferenceNode(
      factory.createQualifiedName(
        factory.createIdentifier("att"),
        factory.createIdentifier("Chain_id")
      ),
      undefined
    );
    case "chest_key":  return factory.createTypeReferenceNode(
      factory.createQualifiedName(
        factory.createIdentifier("att"),
        factory.createIdentifier("Chest_key")
      ),
      undefined
    );
    case "chest":  return factory.createTypeReferenceNode(
      factory.createQualifiedName(
        factory.createIdentifier("att"),
        factory.createIdentifier("Chest")
      ),
      undefined
    );
    case "collection": throw_error(at.node)
    case "contract":  return factory.createTypeReferenceNode(
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
    case "event": throw_error(at.node)
    case "int": return factory.createTypeReferenceNode(
      factory.createQualifiedName(
        factory.createIdentifier("att"),
        factory.createIdentifier("Int")
      ),
      undefined
    );
    case "iterable_big_map": throw_error(at.node)
    case "key_hash":  return factory.createTypeReferenceNode(
      factory.createQualifiedName(
        factory.createIdentifier("att"),
        factory.createIdentifier("Key_hash")
      ),
      undefined
    );
    case "key":  return factory.createTypeReferenceNode(
      factory.createQualifiedName(
        factory.createIdentifier("att"),
        factory.createIdentifier("Key")
      ),
      undefined
    );
    case "lambda": throw_error(at.node)
    case "list": return factory.createTypeReferenceNode(
      factory.createIdentifier("Array"),
      [archetype_type_to_ts_type(at.args[0])]
    )
    case "map": return factory.createTypeReferenceNode(
      factory.createIdentifier("Array"),
      [factory.createTupleTypeNode([
        archetype_type_to_ts_type(at.args[0]),
        archetype_type_to_ts_type(at.args[1])
      ])]
    );
    case "nat":       return factory.createTypeReferenceNode(
      factory.createQualifiedName(
        factory.createIdentifier("att"),
        factory.createIdentifier("Nat")
      ),
      undefined
    );
    case "never": throw_error(at.node)
    case "operation": throw_error(at.node)
    case "option": return factory.createTypeReferenceNode(
      factory.createQualifiedName(
        factory.createIdentifier("att"),
        factory.createIdentifier("Option"),
      ),
      [ archetype_type_to_ts_type(at.args[0]) ]
    );
    case "or":        return factory.createTypeReferenceNode(
      factory.createQualifiedName(
        factory.createIdentifier("att"),
        factory.createIdentifier("Or")
      ),
      [
        archetype_type_to_ts_type(at.args[0]),
        archetype_type_to_ts_type(at.args[1])
      ]
    )
    case "partition": throw_error(at.node)
    case "rational":       return factory.createTypeReferenceNode(
      factory.createQualifiedName(
        factory.createIdentifier("att"),
        factory.createIdentifier("Rational")
      ),
      undefined
    );
    case "record": if (at.name != null) {
      return factory.createTypeReferenceNode(
        factory.createIdentifier(at.name),
        undefined)
    };
    case "sapling_state": throw_error(at.node)
    case "sapling_transaction":  return factory.createTypeReferenceNode(
      factory.createQualifiedName(
        factory.createIdentifier("att"),
        factory.createIdentifier("Sapling_transaction")
      ),
      undefined
    );
    case "set" :   return factory.createTypeReferenceNode(
      factory.createIdentifier("Array"),
      [archetype_type_to_ts_type(at.args[0])]
    )
    case "signature":  return factory.createTypeReferenceNode(
      factory.createQualifiedName(
        factory.createIdentifier("att"),
        factory.createIdentifier("Signature")
      ),
      undefined
    );
    case "state": throw_error(at.node)
    case "string": return factory.createKeywordTypeNode(SyntaxKind.StringKeyword);
    case "ticket": throw_error(at.node)
    case "timestamp": throw_error(at.node)
    case "tuple": return factory.createTupleTypeNode(
      at.args.map(t => archetype_type_to_ts_type(t))
    );
    case "unit":  return factory.createTypeReferenceNode(
      factory.createQualifiedName(
        factory.createIdentifier("att"),
        factory.createIdentifier("Unit")
      ),
      undefined
    );
  }
}

/* Complex data type comparison generators --------------------------------- */

const rm_milliseconds_from = (x : ts.Expression) : ts.BinaryExpression => {
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

const make_tuple_cmp_body = (a : ts.Expression, b : ts.Expression, types: Array<ArchetypeType>) : ts.Expression => {
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
              factory.createNumericLiteral(""+(i+1))
            ), factory.createElementAccessExpression(
              factory.createIdentifier("y"),
              factory.createNumericLiteral(""+(i+1))
            ), t)
          )
        }, make_cmp_body(factory.createElementAccessExpression(
          factory.createIdentifier("x"),
          factory.createNumericLiteral("0")
        ), factory.createElementAccessExpression(
          factory.createIdentifier("y"),
          factory.createNumericLiteral("0")
        ), types[0])))],
        true
      )
    )),
    undefined,
    [ a, b ]
  )
}

export const make_cmp_body = (a : ts.Expression, b : ts.Expression, atype: ArchetypeType) => {
  const make_cmp_equals = (a : ts.Expression, b : ts.Expression) => {
    return factory.createCallExpression(
            factory.createPropertyAccessExpression(
              a,
              factory.createIdentifier("equals")
            ),
            undefined,
            [b]
          )
  }
  const make_cmp_equals_default = (a : ts.Expression, b : ts.Expression) => {
    return factory.createBinaryExpression(a, factory.createToken(ts.SyntaxKind.EqualsEqualsToken), b)
  }
  const make_cmp_equals_container = (a : ts.Expression, b : ts.Expression) => {
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
    case "asset_key": return make_cmp_equals_default(a, b);
    case "asset_value": return make_cmp_equals_default(a, b);
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
    case "or": return make_cmp_equals_default(a, b);
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
    case "tuple": return make_tuple_cmp_body(a, b, atype.args);
    case "unit": return make_cmp_equals(a, b);
  }
}

/* Michelson to Typescript utils ----------------------------------------------------- */

const make_arg = (i : number) : ts.Expression  => {
  const p_idx = Math.floor(i / 2)
  const arg_idx = i % 2
  return factory.createElementAccessExpression(
    factory.createPropertyAccessExpression(
      factory.createIdentifier("p" + p_idx),
      factory.createIdentifier("args")
    ),
    factory.createNumericLiteral("" + arg_idx)
  )
}

const make_pair_decl = (arg : ts.Expression, i : number) => {
  const idx = Math.floor(i / 2)
  if (idx == 0) {
    return factory.createVariableStatement(
      undefined,
      factory.createVariableDeclarationList(
        [factory.createVariableDeclaration(
          factory.createIdentifier("p0"),
          undefined,
          undefined,
          factory.createParenthesizedExpression(factory.createAsExpression(
            arg,
            factory.createTypeReferenceNode(
              factory.createQualifiedName(
                factory.createIdentifier("att"),
                factory.createIdentifier("Mpair")
              ),
              undefined
            )
          ))
        )],
        ts.NodeFlags.Const
      )
    )
  } else {
    return factory.createVariableStatement(
      undefined,
      factory.createVariableDeclarationList(
        [factory.createVariableDeclaration(
          factory.createIdentifier("p" + idx),
          undefined,
          undefined,
          factory.createParenthesizedExpression(factory.createAsExpression(
            factory.createElementAccessExpression(
              factory.createPropertyAccessExpression(
                factory.createIdentifier("p" + (idx - 1)),
                factory.createIdentifier("args")
              ),
              factory.createNumericLiteral("1")
            ),
            factory.createTypeReferenceNode(
              factory.createQualifiedName(
                factory.createIdentifier("att"),
                factory.createIdentifier("Mpair")
              ),
              undefined
            )
          ))
        )],
        ts.NodeFlags.Const
      )
    )
  }
}

const mich_to_tuple = (types : Array<ArchetypeType>, arg : ts.Expression ) => {
  let decls : Array<ts.Statement> = []
  let args  : Array<ts.Expression> = []
  for (let i = 0; i < types.length; i++) {
    if (i % 2 == 0) {
      // create declaration
      decls.push(make_pair_decl(factory.createIdentifier("p"), i))
    }
    args.push(mich_to_field_decl(types[i], make_arg(i)))
  }
  const body = [ ...decls, factory.createReturnStatement(factory.createArrayLiteralExpression(args))]
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

const contained_type_to_field_decl = (fname : string, arg : ts.Expression, atype : ArchetypeType) => {
  return factory.createCallExpression(
    factory.createPropertyAccessExpression(
      factory.createIdentifier("att"),
      factory.createIdentifier(fname)
    ),
    undefined,
    [
      arg,
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
          [factory.createReturnStatement(mich_to_field_decl(atype, factory.createIdentifier("x"), 0, 0))],
          false
        )
      )
    ]
  )
}

export const mich_to_field_decl = (atype : ArchetypeType, arg : ts.Expression, idx : number = 0, len : number = 0) : ts.Expression => {
  switch (atype.node) {
    case "map" : return factory.createCallExpression(
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
              mich_to_field_decl(atype.args[0], factory.createIdentifier("x"), 0, 0),
              mich_to_field_decl(atype.args[1], factory.createIdentifier("y"), 0, 0)
            ],
            false
          )
        )
      ]
    )
    case "record": {
      const larg = idx + 1 == len ? factory.createCallExpression(
        factory.createIdentifier("mich_to_"+ atype.name),
        undefined,
        [factory.createObjectLiteralExpression(
        [
          factory.createPropertyAssignment(
            factory.createIdentifier("prim"),
            factory.createStringLiteral("Pair")
          ),
          factory.createPropertyAssignment(
            factory.createIdentifier("args"),
            factory.createCallExpression(
              factory.createPropertyAccessExpression(
                factory.createIdentifier("fields"),
                factory.createIdentifier("slice")
              ),
              undefined,
              [factory.createNumericLiteral(idx)]
            )
          )
        ],
        false
      ), factory.createIdentifier("collapsed")]) : factory.createCallExpression(
        factory.createIdentifier("mich_to_" + atype.name),
        undefined,
        [arg, factory.createIdentifier("collapsed")])
      return larg
    }
    case "option" :
      return contained_type_to_field_decl("mich_to_option", arg, atype.args[0])
    case "set" :
    case "list":
      return contained_type_to_field_decl("mich_to_list", arg, atype.args[0])
    case "tuple":
      return mich_to_tuple(atype.args, arg)
    case "enum":
      return factory.createCallExpression(
        factory.createIdentifier("mich_to_" + atype.name),
        undefined,
        [arg]
      )
    default :
      return factory.createCallExpression(
        factory.createPropertyAccessExpression(
          factory.createIdentifier("att"),
          factory.createIdentifier(archetype_type_to_mich_to_name(atype))
        ),
        undefined,
        [arg]
      )
  }
}

export const archetype_type_to_mich_to_name = (atype : ArchetypeType) : string => {
  switch (atype.node) {
    case "date"         : return "mich_to_date"
    case "nat"          : return "mich_to_nat"
    case "int"          : return "mich_to_int"
    case "currency"     : return "mich_to_tez"
    case "duration"     : return "mich_to_duration"
    case "bool"         : return "mich_to_bool"
    case "string"       : return "mich_to_string"
    case "rational"     : return "mich_to_rational"
    case "address"      : return "mich_to_address"
    case "bytes"        : return "mich_to_bytes"
    case "signature"    : return "mich_to_signature"
    case "key"          : return "mich_to_key"
    case "bls12_381_fr" : return "mich_to_bls12_381_fr"
    default: throw new Error("archetype_type_to_mich_to_name: unknown type '" + atype.node + "'")
  }
}

/* storage element getter formulas ----------------------------------------- */

const access_nth_field = (x : ts.Expression, i : number) : ts.Expression => {
  return factory.createElementAccessExpression(
    x,
    factory.createElementAccessExpression(
      factory.createCallExpression(
        factory.createPropertyAccessExpression(
          factory.createIdentifier("Object"),
          factory.createIdentifier("keys")
        ),
        undefined,
        [x]
      ),
      factory.createNumericLiteral(""+i)
    )
  )
}

const get_record_type = (name : string | null, ci : ContractInterface) => {
  if (name != null) {
    for (let i = 0; i < ci.types.records.length; i++) {
      if (ci.types.records[i].name == name) {
        return ci.types.records[i]
      }
    }
  }
  throw new Error("get_record_type: '" + name + "' not found")
}

const get_asset_type = (name : string | null, ci : ContractInterface) => {
  if (name != null) {
    for (let i = 0; i < ci.types.assets.length; i++) {
      if (ci.types.assets[i].name == name) {
        return ci.types.assets[i]
      }
    }
  }
  throw new Error("get_asset_type: '" + name + "' not found")
}

const get_field_annot_names = (r : Record) : { [key: string] : string } => {
  const internal_get_fan =
  (mt : MichelsonType, idx : number, acc : { [key: string] : string }) : [ number, { [key: string] : string } ] => {
    if (mt.annots.length > 0) {
      const annot = mt.annots[0].slice(1)
      acc[r.fields[idx].name] = annot
      return [ idx + 1, acc ]
    } else {
      switch (mt.prim) {
        case "pair" : {
          // left
          const [idx_left,   acc_left] = internal_get_fan(mt.args[0], idx, acc)
          // right
          const [idx_right, acc_right] = internal_get_fan(mt.args[1], idx_left, acc_left)
          return [idx_right, acc_right]
        }
        case "unit" : {
          return [ idx, acc ]
        }
        default : throw new Error("internal_get_fan: found a node which is not annotated nor is a pair")
      }
    }
  }
  const [ _, res ] = internal_get_fan(r.type_michelson, 0, {})
  return res
}

const get_lambda_form = (body : ts.Statement[], arg : ts.Expression) : ts.Expression => {
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
      factory.createBlock(
        body,
        false
      )
    )),
    undefined,
    [arg]
  )
}

const get_enum = (name : string | null, ci : ContractInterface) => {
  for (var i = 0; i < ci.types.enums.length; i++) {
    if (ci.types.enums[i].name == name) {
      return ci.types.enums[i]
    }
  }
  return null
}

const make_enum_type_case_body = (elt : ts.Expression, c : EnumValue, ci : ContractInterface) => {
  if (c.types.length == 0) {
    return factory.createReturnStatement(factory.createNewExpression(
      factory.createIdentifier(c.name),
      undefined,
      []
    ))
  } else {
    var atype : ArchetypeType
    if (c.types.length == 1) {
      atype = c.types[0]
    } else {
      atype = {
        node : "tuple",
        name : null,
        args : c.types
      }
    }
    return factory.createReturnStatement(factory.createNewExpression(
      factory.createIdentifier(c.name),
      undefined,
      [factory.createCallExpression(
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
          archetype_type_to_ts_type(atype),
          factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
          factory.createBlock(
            taquito_to_ts(factory.createIdentifier("x"), atype, ci),
            false
          )
        )),
        undefined,
        [factory.createPropertyAccessExpression(
          elt,
          factory.createIdentifier(c.name)
        )]
      )]
    ))
  }
}

const make_enum_return_body = (elt : ts.Expression, e : Enum, ci : ContractInterface) : ts.Statement => {
  return e.constructors.slice(1).reduce(
    (acc, c) => {
      return factory.createIfStatement(
        factory.createBinaryExpression(
          factory.createPropertyAccessExpression(
            elt,
            factory.createIdentifier(c.name)
          ),
          factory.createToken(ts.SyntaxKind.ExclamationEqualsEqualsToken),
          factory.createIdentifier("undefined")
        ),
        factory.createBlock(
          [make_enum_type_case_body(elt, c, ci)],
          true
        ),
        acc
      )
    },
    <ts.Statement>make_enum_type_case_body(elt, e.constructors[0], ci)
  )
}

const get_element_access = (elt : ts.Expression, idx : number) => {
  return factory.createElementAccessExpression(
    elt,
    factory.createElementAccessExpression(
      factory.createCallExpression(
        factory.createPropertyAccessExpression(
          factory.createIdentifier("Object"),
          factory.createIdentifier("keys")
        ),
        undefined,
        [elt]
      ),
      factory.createNumericLiteral("" + idx)
    )
  )
}

const get_tuple_body = (elt : ts.Expression, t : ArchetypeType, ci : ContractInterface, start_idx : number = 0) : [ts.Expression[], number] => {
  const [array, idx] = t.args.reduce((acc, a) => {
    const [acc_array, acc_idx ] = acc
    switch (a.node) {
      case "tuple" :
        const [ tuple_array, tuple_idx ] = get_tuple_body(elt, a, ci, acc_idx)
        return [
          [ ...acc_array, factory.createArrayLiteralExpression(tuple_array) ],
          tuple_idx
        ]
      default :
        return [
          [ ...acc_array, get_lambda_form(taquito_to_ts(factory.createIdentifier("x"), a, ci), get_element_access(elt, acc_idx)) ],
          acc_idx + 1
        ]
    }
  }, [<ts.Expression[]>[], start_idx])
  return [array, idx]
}

export const taquito_to_ts = (elt : ts.Expression, atype: ArchetypeType, ci : ContractInterface) : ts.Statement[] => {
  const make_class = () => {
    return [factory.createReturnStatement(factory.createNewExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier("att"),
        factory.createIdentifier(atype.node.charAt(0).toUpperCase() + atype.node.slice(1))
      ),
      undefined,
      [ elt ]
    ))]
  }
  const make_list = () => {
      return [
        factory.createVariableStatement(
          undefined,
          factory.createVariableDeclarationList(
            [factory.createVariableDeclaration(
              factory.createIdentifier("res"),
              undefined,
              archetype_type_to_ts_type(atype),
              factory.createArrayLiteralExpression(
                [],
                false
              )
            )],
            ts.NodeFlags.Const
          )
        ),
        factory.createForStatement(
          factory.createVariableDeclarationList(
            [factory.createVariableDeclaration(
              factory.createIdentifier("i"),
              undefined,
              undefined,
              factory.createNumericLiteral("0")
            )],
            ts.NodeFlags.Let
          ),
          factory.createBinaryExpression(
            factory.createIdentifier("i"),
            factory.createToken(ts.SyntaxKind.LessThanToken),
            factory.createPropertyAccessExpression(
              elt,
              factory.createIdentifier("length")
            )
          ),
          factory.createPostfixUnaryExpression(
            factory.createIdentifier("i"),
            ts.SyntaxKind.PlusPlusToken
          ),
          factory.createBlock(
            [factory.createExpressionStatement(factory.createCallExpression(
              factory.createPropertyAccessExpression(
                factory.createIdentifier("res"),
                factory.createIdentifier("push")
              ),
              undefined,
              [ get_lambda_form(
                  taquito_to_ts(factory.createIdentifier("x"), atype.args[0], ci),
                  factory.createElementAccessExpression(
                    elt,
                    factory.createIdentifier("i")
                  )
                )
              ]
            ))],
            true
          )
        ),
        factory.createReturnStatement(factory.createIdentifier("res"))
      ];
    }

  const throw_error = () => {
    throw new Error("taquito_to_ts: type '" + atype.node + "' not found")
  }

  switch (atype.node) {
    case "address": return make_class();
    case "aggregate": throw_error();
    case "asset_container": throw_error();
    case "asset_key": throw_error();
    case "asset_value": throw_error();
    case "asset_view": throw_error();
    case "asset": {
      const a = get_asset_type(atype.name, ci)
      if (a.container_kind == "big_map") {
        // create asset value record
        const fields_no_key = a.fields.filter(x => !x.is_key)
        const asset_value_record_type : Record = {
          name           : a.name + "_value",
          fields         : fields_no_key,
          type_michelson : a.value_type_michelson
        }
        const augmented_ci : ContractInterface = { ...ci,
          types : { ...ci.types,
            records : [ ...ci.types.records, asset_value_record_type]
          }
        }
        return taquito_to_ts(elt, { name: a.name + "_value", node : "record", args:[] }, augmented_ci)
      } else {
        // create asset container (not for asset to big_map)
        const fields_no_key = a.fields.filter(x => !x.is_key)
        const keys = a.fields.filter(x => x.is_key)
        const key_type : ArchetypeType = keys.length > 1 ? {
          node : "tuple",
          name : null,
          args : keys.map(x => x.type)
        } : keys[0].type
        if (fields_no_key.length > 1) {
          // create a record type in Contract Interface corresponding to asset value
          const asset_value_record_type : Record = {
            name           : a.name + "_value",
            fields         : fields_no_key,
            type_michelson : a.value_type_michelson
          }
          const augmented_ci : ContractInterface = { ...ci,
            types : { ...ci.types,
              records : [ ...ci.types.records, asset_value_record_type]
            }
          }
          const map_type : ArchetypeType = {
            node : "map",
            name : a.name,
            args : [
              key_type,
              {
                node : "record",
                name : a.name + "_value",
                args : []
              }
            ]
          }
        return taquito_to_ts(elt, map_type, augmented_ci)
        } else if (fields_no_key.length == 1) {
          // create local equivalent type to map<key, value>
          const map_type : ArchetypeType = {
            node : "map",
            name : a.name,
            args : [
              key_type,
              fields_no_key[0].type
            ]
          }
          return taquito_to_ts(elt, map_type, ci)
        } else {
          const list_type : ArchetypeType = {
            node : "list",
            name : null,
            args : [ key_type ]
          }
          return taquito_to_ts(elt, list_type, ci)
        }
      }
    };
    case "big_map": throw_error();
    case "bls12_381_fr": return make_class();
    case "bls12_381_g1": return make_class();
    case "bls12_381_g2": return make_class();
    case "bool": return [factory.createReturnStatement(elt)];
    case "bytes": return make_class();
    case "chain_id": return make_class();
    case "chest_key": return make_class();
    case "chest": return make_class();
    case "collection": throw_error();
    case "contract": throw_error();
    case "currency": return [factory.createReturnStatement(factory.createNewExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier("att"),
        factory.createIdentifier("Tez")
      ),
      undefined,
      [ elt, factory.createStringLiteral("mutez") ]
    ))];
    case "date": return [factory.createReturnStatement(factory.createNewExpression(
      factory.createIdentifier("Date"),
      undefined,
      [ elt ]
    ))];
    case "duration": return make_class();
    case "enum": {
        const e = get_enum(atype.name, ci)
        if (e != null) {
          return [make_enum_return_body(elt, e, ci)]
        }
        throw new Error("enum not found: " + atype.name)
      };
    case "event": throw_error();
    case "int": return make_class();
    case "iterable_big_map": throw_error();
    case "key_hash": return make_class();
    case "key": return make_class();
    case "lambda": throw_error();
    case "list": return make_list();
    case "map": {
      return [
        factory.createVariableStatement(
          undefined,
          factory.createVariableDeclarationList(
            [factory.createVariableDeclaration(
              factory.createIdentifier("res"),
              undefined,
              archetype_type_to_ts_type(atype)
              ,
              factory.createArrayLiteralExpression(
                [],
                false
              )
            )],
            ts.NodeFlags.Let
          )
        ),
        factory.createForOfStatement(
          undefined,
          factory.createVariableDeclarationList(
            [factory.createVariableDeclaration(
              factory.createIdentifier("e"),
              undefined,
              undefined,
              undefined
            )],
            ts.NodeFlags.Let
          ),
          factory.createCallExpression(
            factory.createPropertyAccessExpression(
              elt,
              factory.createIdentifier("entries")
            ),
            undefined,
            []
          ),
          factory.createBlock(
            [factory.createExpressionStatement(factory.createCallExpression(
              factory.createPropertyAccessExpression(
                factory.createIdentifier("res"),
                factory.createIdentifier("push")
              ),
              undefined,
              [factory.createArrayLiteralExpression(
                [
                  get_lambda_form(
                    taquito_to_ts(factory.createIdentifier("x"), atype.args[0], ci),
                    factory.createElementAccessExpression(
                      factory.createIdentifier("e"),
                      factory.createIdentifier("0")
                    )
                  ),
                  get_lambda_form(
                    taquito_to_ts(factory.createIdentifier("x"), atype.args[1], ci),
                    factory.createElementAccessExpression(
                      factory.createIdentifier("e"),
                      factory.createIdentifier("1")
                    )
                  )
                ],
                false
              )]
            ))],
            true
          )
        ),
        factory.createReturnStatement(factory.createIdentifier("res"))
      ]
    };
    case "nat": return make_class();
    case "never": throw_error();
    case "operation": throw_error();
    case "option": return [factory.createReturnStatement(factory.createNewExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier("att"),
        factory.createIdentifier("Option")
      ),
      [ archetype_type_to_ts_type(atype.args[0]) ],
      [factory.createConditionalExpression(
        factory.createBinaryExpression(
          elt,
          factory.createToken(ts.SyntaxKind.EqualsEqualsToken),
          factory.createNull()
        ),
        factory.createToken(ts.SyntaxKind.QuestionToken),
        factory.createNull(),
        factory.createToken(ts.SyntaxKind.ColonToken),
        get_lambda_form(taquito_to_ts(factory.createIdentifier("x"), atype.args[0], ci), elt)
      )]
    ))];
    case "or": return [factory.createReturnStatement(factory.createCallExpression(
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
          [
            factory.createVariableStatement(
              undefined,
              factory.createVariableDeclarationList(
                [factory.createVariableDeclaration(
                  factory.createIdentifier("is_left"),
                  undefined,
                  undefined,
                  factory.createBinaryExpression(
                    factory.createElementAccessExpression(
                      factory.createIdentifier("x"),
                      factory.createStringLiteral("0")
                    ),
                    factory.createToken(ts.SyntaxKind.ExclamationEqualsEqualsToken),
                    factory.createIdentifier("undefined")
                  )
                )],
                ts.NodeFlags.Const
              )
            ),
            factory.createVariableStatement(
              undefined,
              factory.createVariableDeclarationList(
                [factory.createVariableDeclaration(
                  factory.createIdentifier("value"),
                  undefined,
                  undefined,
                  factory.createConditionalExpression(
                    factory.createIdentifier("is_left"),
                    factory.createToken(ts.SyntaxKind.QuestionToken),
                    factory.createCallExpression(
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
                          taquito_to_ts(factory.createElementAccessExpression(
                        factory.createIdentifier("x"),
                        factory.createStringLiteral("0")
                      ), atype.args[0], ci),
                          false
                        )
                      )),
                      undefined,
                      [factory.createElementAccessExpression(
                        factory.createIdentifier("x"),
                        factory.createStringLiteral("0")
                      )]
                    ),
                    factory.createToken(ts.SyntaxKind.ColonToken),
                    factory.createCallExpression(
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
                          taquito_to_ts(factory.createElementAccessExpression(
                        factory.createIdentifier("x"),
                        factory.createStringLiteral("1")
                      ), atype.args[1], ci),
                          false
                        )
                      )),
                      undefined,
                      [factory.createElementAccessExpression(
                        factory.createIdentifier("x"),
                        factory.createStringLiteral("1")
                      )]
                    )
                  )
                )],
                ts.NodeFlags.Const
              )
            ),
            factory.createReturnStatement(factory.createNewExpression(
              factory.createPropertyAccessExpression(
                factory.createIdentifier("att"),
                factory.createIdentifier("Or")
              ),
              [
                archetype_type_to_ts_type(atype.args[0]),
                archetype_type_to_ts_type(atype.args[1])
              ],
              [
                factory.createIdentifier("value"),
                factory.createIdentifier("is_left")
              ]
            ))
          ],
          true
        )
      )),
      undefined,
      [factory.createIdentifier("storage")]
    ))];
    case "partition": throw_error();
    case "rational": return [factory.createReturnStatement(factory.createNewExpression(
        factory.createPropertyAccessExpression(
          factory.createIdentifier("att"),
          factory.createIdentifier("Rational")
        ),
        undefined,
        [
          access_nth_field(elt, 0),
          access_nth_field(elt, 1)
        ]
      ))];
    case "record": {
      const name = atype.name
      if (null != name) {
        const r = get_record_type(name, ci)
        const field_annot_names = get_field_annot_names(r)
        return [factory.createReturnStatement(factory.createNewExpression(
          factory.createIdentifier(name),
          undefined,
          r.fields.map(f => {
            const field_value = factory.createPropertyAccessExpression(
              elt,
              factory.createIdentifier(field_annot_names[f.name])
            )
            return  get_lambda_form(taquito_to_ts(factory.createIdentifier("x"), f.type, ci), field_value)
          })
        ))]
      }
    };
    case "sapling_state": return make_class();
    case "sapling_transaction": return make_class();
    case "set": return make_list();
    case "signature": return make_class();
    case "state": throw_error();
    case "string": return [factory.createReturnStatement(elt)];
    case "ticket": throw_error();
    case "timestamp": throw_error();
    case "tuple": {
        const [ array, _ ] = get_tuple_body(elt, atype, ci)
        return [factory.createReturnStatement(factory.createArrayLiteralExpression(array))]
      };
    case "unit": return make_class();
  }
}

/* Typescript To Micheline utils ------------------------------------------------------ */

const class_to_mich = (x  :ts.Expression) => {
  return factory.createCallExpression(
    factory.createPropertyAccessExpression(
      x,
      factory.createIdentifier("to_mich")
    ),
    undefined,
    []
  )
}

const string_to_mich = (x : ts.Expression) => {
  return factory.createCallExpression(
    factory.createPropertyAccessExpression(
      factory.createIdentifier("att"),
      factory.createIdentifier("string_to_mich")
    ),
    undefined,
    [x]
  );
}

export const unit_to_mich = () => {
  return factory.createCallExpression(
    factory.createPropertyAccessExpression(
      factory.createIdentifier("att"),
      factory.createIdentifier("unit_to_mich")
    ),
    undefined,
    []
  );
}

const bool_to_mich = (x : ts.Expression) => {
  return factory.createCallExpression(
    factory.createPropertyAccessExpression(
      factory.createIdentifier("att"),
      factory.createIdentifier("bool_to_mich")
    ),
    undefined,
    [x]
  );
}

const date_to_mich = (x : ts.Expression) => {
  return factory.createCallExpression(
    factory.createPropertyAccessExpression(
      factory.createIdentifier("att"),
      factory.createIdentifier("date_to_mich")
    ),
    undefined,
    [x]
  );
}

const tuple_to_mich = (name : string, types : ArchetypeType[]) => {
  return factory.createCallExpression(
    factory.createPropertyAccessExpression(
      factory.createIdentifier("att"),
      factory.createIdentifier("pair_to_mich")
    ),
    undefined,
    [factory.createArrayLiteralExpression(
      types.map((x,i) => function_param_to_mich({ name: name + "[" + i + "]", type: x })),
      false
    )]
  )
}

const list_to_mich = (name : string, atype : ArchetypeType) => {
  return internal_list_to_mich(name, [
    factory.createReturnStatement(function_param_to_mich({ name: "x", type: atype }))
  ])
}

const internal_list_to_mich = (name : string, body : ts.Statement[]) => {
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

const internal_map_to_mich = (name : string, decls : ts.CallExpression[]) => {
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

const map_to_mich = (name : string, key_type : ArchetypeType | null, value_type : ArchetypeType | null) => {
  if (null == key_type) throw new Error("map_to_mich: null key type")
  if (null == value_type) throw new Error("map_to_mich: null value type")
  return internal_map_to_mich(name, [
    function_param_to_mich({ name: "x_key", type: key_type }),
    function_param_to_mich({ name: "x_value", type: value_type })
  ])
}

export const function_param_to_mich = (fp: FunctionParameter) : ts.CallExpression => {
  const throw_error = (ty : string) => {
    throw new Error("function_param_to_mich: unhandled type '" + ty + "'")
  }
  switch (fp.type.node) {
    case "address": return class_to_mich(factory.createIdentifier(fp.name));
    case "aggregate": throw_error(fp.type.node);
    case "asset_container": throw_error(fp.type.node);
    case "asset_key": throw_error(fp.type.node);
    case "asset_value": return class_to_mich(factory.createIdentifier(fp.name));
    case "asset_view": throw_error(fp.type.node);
    case "asset": throw_error(fp.type.node);
    case "big_map": return map_to_mich(fp.name, fp.type.args[0], fp.type.args[1]);
    case "bls12_381_fr": return class_to_mich(factory.createIdentifier(fp.name));
    case "bls12_381_g1": return class_to_mich(factory.createIdentifier(fp.name));
    case "bls12_381_g2": return class_to_mich(factory.createIdentifier(fp.name));
    case "bool": return bool_to_mich(factory.createIdentifier(fp.name));
    case "bytes": return class_to_mich(factory.createIdentifier(fp.name));
    case "chain_id": return class_to_mich(factory.createIdentifier(fp.name));
    case "chest_key": return class_to_mich(factory.createIdentifier(fp.name));
    case "chest": return class_to_mich(factory.createIdentifier(fp.name));
    case "collection": throw_error(fp.type.node);
    case "contract": return class_to_mich(factory.createIdentifier(fp.name));
    case "currency": return class_to_mich(factory.createIdentifier(fp.name));
    case "date": return date_to_mich(factory.createIdentifier(fp.name));
    case "duration": return class_to_mich(factory.createIdentifier(fp.name));
    case "enum": return class_to_mich(factory.createIdentifier(fp.name));
    case "event": throw_error(fp.type.node);
    case "int": return class_to_mich(factory.createIdentifier(fp.name));
    case "iterable_big_map": throw_error(fp.type.node);
    case "key_hash": return class_to_mich(factory.createIdentifier(fp.name));
    case "key": return class_to_mich(factory.createIdentifier(fp.name));
    case "lambda": throw_error(fp.type.node);
    case "list": return list_to_mich(fp.name, fp.type.args[0]);
    case "map": return map_to_mich(fp.name, fp.type.args[0], fp.type.args[1]);
    case "nat": return class_to_mich(factory.createIdentifier(fp.name));
    case "never": throw_error(fp.type.node);
    case "operation": throw_error(fp.type.node);
    case "option": return class_to_mich(factory.createIdentifier(fp.name));
    case "or": return class_to_mich(factory.createIdentifier(fp.name));
    case "partition": throw_error(fp.type.node);
    case "rational": return class_to_mich(factory.createIdentifier(fp.name));
    case "record": return class_to_mich(factory.createIdentifier(fp.name));
    case "sapling_state": return class_to_mich(factory.createIdentifier(fp.name));
    case "sapling_transaction": return class_to_mich(factory.createIdentifier(fp.name));
    case "set": return list_to_mich(fp.name, fp.type.args[0]);
    case "signature": return class_to_mich(factory.createIdentifier(fp.name));
    case "state": throw_error(fp.type.node);
    case "string": return string_to_mich(factory.createIdentifier(fp.name));
    case "ticket": throw_error(fp.type.node);
    case "timestamp": throw_error(fp.type.node);
    case "tuple": return tuple_to_mich(fp.name, fp.type.args);
    case "unit": return unit_to_mich()
  }
}

export const function_params_to_mich = (a : Array<FunctionParameter>) => {
  if (a.length == 0) {
    return factory.createPropertyAccessExpression(
      factory.createIdentifier("att"),
      factory.createIdentifier("unit_mich")
    )
  } else if (a.length == 1) {
    return function_param_to_mich(a[0])
  } else {
    return factory.createCallExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier("att"),
        factory.createIdentifier("pair_to_mich")
      ),
      undefined,
      [factory.createArrayLiteralExpression(
        a.map((x, i) => function_param_to_mich(x)),
        true
      )]
    )
  }
}

export const storage_to_mich = (mt : MichelsonType, selts : Array<StorageElement>) : ts.Expression => {
  switch (mt.prim) {
    case "pair" : {
      if (mt.annots.length == 0) {
        return factory.createCallExpression(
          factory.createPropertyAccessExpression(
            factory.createIdentifier("att"),
            factory.createIdentifier("pair_to_mich")
          ),
          undefined,
          [factory.createArrayLiteralExpression(
            mt.args.map(x => storage_to_mich(x, selts)),
            false
          )]
        )
      }
    }
    default : {
      let selt = selts[0]
      if (mt.annots.length > 0) {
        const annot = mt.annots[0]
        for(let i = 0; i < selts.length; i++) {
          if (annot == "%" + selts[i].name) {
            selt = selts[i]
          }
        }
      }
      return function_param_to_mich(selt)
    }
  }
}

const get_archetype_type_of = (name : string, fields : Array<Omit<Field, "is_key">>) => {
  for (var i = 0; i < fields.length; i++) {
    const field = fields[i]
    if (field.name == name) {
      return field.type
    }
  }
}

const get_archetype_type_from_idx = (idx : number, fields : Array<Partial<Field>>) => {
  return fields[idx].type
}

const get_field_name_from_idx = (idx : number, fields : Array<Partial<Field>>) => {
  return fields[idx].name
}

const mich_type_to_archetype = (mt : MichelsonType) : ArchetypeType => {
  switch (mt.prim) {
    case "string"    : return { node: "string" , name: null, args: [] }
    case "int"       : return { node: "int"    , name: null, args: [] }
    case "nat"       : return { node: "nat"    , name: null, args: [] }
    case "timestamp" : return { node: "date"   , name: null, args: [] }
    case "address"   : return { node: "address", name: null, args: [] }
    case "bytes"     : return { node: "bytes"  , name: null, args: [] }
    case "unit"      : return { node: "unit"   , name :null, args: [] }
    case "list"      : return { node: "list"   , name: null, args: [mich_type_to_archetype(mt.args[0])] }
    case "pair"      : return { node: "tuple"  , name: null, args: [mich_type_to_archetype(mt.args[0]), mich_type_to_archetype(mt.args[1])] }
    default: throw new Error("mich_type_to_archetype: cannot convert prim '" + mt.prim + "'")
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
export const entity_to_mich = (v : string, mt: MichelsonType, fields : Array<Partial<Field>>, fidx : number = 0) : [number, ts.CallExpression] => {
  if (mt.annots.length > 0) {
    //const name = mt.annots[0].slice(1)
    const name = get_field_name_from_idx(fidx, fields)

    //const atype = get_archetype_type_of(name, fields)
    const atype = get_archetype_type_from_idx(fidx, fields)
    if (undefined == atype) {
      throw new Error("entity_to_mich: type not found for '" + name + "'")
    }
    const fp = { name: v + "." + name, type : atype }
    return [ fidx + 1, function_param_to_mich(fp) ]
  } else {
    switch (mt.prim) {
      case "pair" : {
        // left
        const [fidx0, expr0] = entity_to_mich(v, mt.args[0], fields, fidx)
        // right
        const [fidx1, expr1] = entity_to_mich(v, mt.args[1], fields, fidx0)
        return [fidx1, factory.createCallExpression(
          factory.createPropertyAccessExpression(
            factory.createIdentifier("att"),
            factory.createIdentifier("pair_to_mich")
          ),
          undefined,
          [factory.createArrayLiteralExpression(
            [ expr0, expr1 ],
            false
          )]
        )]
      }
      case "map"     :
      case "big_map" : {
        // left
        const [ _,    expr0] = entity_to_mich("x_key", mt.args[0], fields.filter(x => x.is_key), fidx)
        // right
        const [fidx1, expr1] = entity_to_mich("x_value", mt.args[1], fields.filter(x => !x.is_key), fidx)
        return [ fidx1, internal_map_to_mich(v, [
          expr0,
          expr1
        ]) ]
      }
      case "set"    : {
        const [ _,    expr0] = entity_to_mich("x", mt.args[0], fields.filter(x => x.is_key), fidx)
        return [ fidx, internal_list_to_mich(v, [
            factory.createReturnStatement(expr0)
          ])
        ]
      }
      default: return [ fidx, function_param_to_mich({ name: v, type: mich_type_to_archetype(mt) }) ]
    }
  }
}


export const value_to_mich_type = (mt : MichelsonType) : ts.CallExpression => {
  switch (mt.prim) {
    case "big_map": return factory.createCallExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier("att"),
        factory.createIdentifier("pair_to_mich_type")
      ),
      undefined,
      [ factory.createStringLiteral("big_map"), value_to_mich_type(mt.args[0]), value_to_mich_type(mt.args[1]) ]
    )
    case "map": return factory.createCallExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier("att"),
        factory.createIdentifier("pair_to_mich_type")
      ),
      undefined,
      [ factory.createStringLiteral("map"), value_to_mich_type(mt.args[0]), value_to_mich_type(mt.args[1]) ]
    )
    case "pair":
      const annots = mt.annots.length >= 1 ? [factory.createStringLiteral(mt.annots[0])] : []
      return factory.createCallExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier("att"),
        factory.createIdentifier("pair_array_to_mich_type")
      ),
      undefined,
      [
        factory.createArrayLiteralExpression(
          [ value_to_mich_type(mt.args[0]), value_to_mich_type(mt.args[1]) ],
          true
        ),
        factory.createArrayLiteralExpression(
          annots,
          false
        )
      ]
    )
    case "option": {
      const annots = mt.annots.length >= 1 ? [factory.createStringLiteral(mt.annots[0])] : []
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
    case "set":
    case "list": {
      const annots = mt.annots.length >= 1 ? [factory.createStringLiteral(mt.annots[0])] : []
      return factory.createCallExpression(
        factory.createPropertyAccessExpression(
          factory.createIdentifier("att"),
          factory.createIdentifier("list_annot_to_mich_type")
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
    case "or":
      return factory.createCallExpression(
        factory.createPropertyAccessExpression(
          factory.createIdentifier("att"),
          factory.createIdentifier("or_to_mich_type")
        ),
        undefined,
        [
          value_to_mich_type(mt.args[0]),
          value_to_mich_type(mt.args[1]),
          factory.createArrayLiteralExpression(
            mt.annots.map(a => factory.createStringLiteral(a, false))
          )
        ]
      )
    default: {
      const prim = mt.prim == null ? "string" : mt.prim
      const annots = mt.annots.length >= 1 ? [factory.createStringLiteral(mt.annots[0])] : []
      return factory.createCallExpression(
        factory.createPropertyAccessExpression(
          factory.createIdentifier("att"),
          factory.createIdentifier("prim_annot_to_mich_type")
        ),
        undefined,
        [
          factory.createStringLiteral(prim),
          factory.createArrayLiteralExpression(
            annots,
            false
          )
        ]
      )
    }
  }
}

/* Errors ------------------------------------------------------------------ */

export const mich_type_to_error = (expr : MichelsonType) : [string, ts.Expression] => {
  if (expr.string != null) {
    return [ expr.string.split(' ').join('_').toUpperCase(), factory.createCallExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier("att"),
        factory.createIdentifier("string_to_mich")
      ),
      undefined,
      [factory.createStringLiteral("\"" + expr.string + "\"")]
    ) ]
  } else if (expr.prim == "Pair") {
    const args = expr.args.map(mich_type_to_error)
    const label = args.reduce((acc, n) => {
      return (acc == "" ? "" : acc + "_") + n[0].toUpperCase()
    }, "")
    return [ label, factory.createCallExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier("att"),
        factory.createIdentifier("pair_to_mich")
      ),
      undefined,
      [factory.createArrayLiteralExpression(args.map(p => p[1]))]
    ) ]
  } else {
    return [ "NOT_HANDLED", factory.createCallExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier("att"),
        factory.createIdentifier("string_to_mich")
      ),
      undefined,
      [factory.createStringLiteral("" + expr.string)]
    ) ]
  }
}

export const make_error = (error : Error) : [ string, ts.Expression ] => {
  switch (error.kind) {
    case "InvalidCondition" :
      return [ error.args[0], mich_type_to_error(error.expr)[1] ]
    default :
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
