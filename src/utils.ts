import ts, { factory, KeywordTypeNode, SyntaxKind } from "typescript";

export type ArchetypeType = {
  "node": string
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
  "types": Array<string> /* TODO */
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

export type Record = {} /* TODO */

export type Getter = {} /* TODO */

export type Event = {} /* TODO */

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
  "entrypoints": Array<Entrypoint>
  "getters": Array<Getter>
  "errors": Array<MichelsonType>
}

export const archetypeTypeToTsType = (at: ArchetypeType) : KeywordTypeNode<any>  => {
  switch (at.node) {
    case "key":       return factory.createKeywordTypeNode(SyntaxKind.StringKeyword);
    case "date":      return factory.createTypeReferenceNode(
      factory.createIdentifier("Date"),
      undefined
    )
    case "string":    return factory.createKeywordTypeNode(SyntaxKind.StringKeyword);
    case "signature": return factory.createKeywordTypeNode(SyntaxKind.StringKeyword);
    case "int":       return factory.createKeywordTypeNode(SyntaxKind.BigIntKeyword);
    case "nat":       return factory.createKeywordTypeNode(SyntaxKind.BigIntKeyword);
    case "asset":     return factory.createTypeReferenceNode(
      factory.createIdentifier(at.name+"_container"),
      undefined
    );
    case "asset_value":  return factory.createTypeReferenceNode(
      factory.createIdentifier(at.args[0].name+"_value"),
      undefined
    );
    case "map":    return factory.createTypeReferenceNode(
      factory.createIdentifier("Array"),
      [factory.createTupleTypeNode([
        archetypeTypeToTsType(at.args[0]),
        archetypeTypeToTsType(at.args[1])
      ])]
    );
    case "tuple": return factory.createTupleTypeNode([
      archetypeTypeToTsType(at.args[0]),
      archetypeTypeToTsType(at.args[1])
    ]);
    default:       return factory.createKeywordTypeNode(SyntaxKind.StringKeyword)
  }
}

export const entryArgToMich = (fp: FunctionParameter) : ts.CallExpression => {
  switch (fp.type.node) {
    case "string": return factory.createCallExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier("ex"),
        factory.createIdentifier("string_to_mich")
      ),
      undefined,
      [factory.createIdentifier(fp.name)]
    );
    case "asset_value": return factory.createCallExpression(
      factory.createIdentifier(fp.type.args[0].name+"_value_to_mich"),
      undefined,
      [factory.createIdentifier(fp.name)]
    )
    case "tuple": return factory.createCallExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier("ex"),
        factory.createIdentifier("pair_to_mich")
      ),
      undefined,
      [factory.createArrayLiteralExpression(
        fp.type.args.map((x,i) => entryArgToMich({ name:fp.name+"["+i+"]", type: fp.type.args[i] })),
        false
      )]
    )
    case "map": return factory.createCallExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier("ex"),
        factory.createIdentifier("list_to_mich")
      ),
      undefined,
      [
        factory.createIdentifier(fp.name),
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
            [
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
                  factory.createIdentifier("ex"),
                  factory.createIdentifier("elt_to_mich")
                ),
                undefined,
                [
                  entryArgToMich({ name: "x_key", type: fp.type.args[0] }),
                  entryArgToMich({ name: "x_value", type: fp.type.args[1] })
                ]
              ))
            ],
            true
          )
        )
      ]
    )
    default:  return factory.createCallExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier("ex"),
        factory.createIdentifier("string_to_mich")
      ),
      undefined,
      [factory.createIdentifier(fp.name)]
    );
  }
}

export const valueToMich = (v : string, mt: MichelsonType) : ts.CallExpression => {
  switch (mt.prim) {
    case "pair": return factory.createCallExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier("ex"),
        factory.createIdentifier("pair_to_mich")
      ),
      undefined,
      [factory.createArrayLiteralExpression(
        [ valueToMich(v, mt.args[0]), valueToMich(v, mt.args[1]) ],
        false
      )]
    );
    case "timestamp": return factory.createCallExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier("ex"),
        factory.createIdentifier("date_to_mich")
      ),
      undefined,
      [factory.createPropertyAccessExpression(
        factory.createIdentifier(v),
        factory.createIdentifier(mt.annots[0].slice(1)))
      ]
    );
    case "nat": return factory.createCallExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier("ex"),
        factory.createIdentifier("bigint_to_mich")
      ),
      undefined,
      [factory.createPropertyAccessExpression(
        factory.createIdentifier(v),
        factory.createIdentifier(mt.annots[0].slice(1)))
      ]
    );
    case "big_map": return factory.createCallExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier("ex"),
        factory.createIdentifier("list_to_mich")
      ),
      undefined,
      [
        factory.createIdentifier("x"),
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
            [
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
                  factory.createIdentifier("ex"),
                  factory.createIdentifier("elt_to_mich")
                ),
                undefined,
                [
                  valueToMich("x_key", mt.args[0]),
                  valueToMich("x_value", mt.args[1])
                ]
              ))
            ],
            true
          )
        )
      ]
    );
    default: return factory.createCallExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier("ex"),
        factory.createIdentifier("string_to_mich")
      ),
      undefined,
      [factory.createIdentifier(v)])
  }
}

export const valuetoMichType = (mt : MichelsonType) : ts.CallExpression => {
  switch (mt.prim) {
    case "big_map": return factory.createCallExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier("ex"),
        factory.createIdentifier("pair_to_mich_type")
      ),
      undefined,
      [ factory.createStringLiteral("big_map"), valuetoMichType(mt.args[0]), valuetoMichType(mt.args[1]) ]
    )
    case "map": return factory.createCallExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier("ex"),
        factory.createIdentifier("pair_to_mich_type")
      ),
      undefined,
      [ factory.createStringLiteral("map"), valuetoMichType(mt.args[0]), valuetoMichType(mt.args[1]) ]
    )
    case "pair": return factory.createCallExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier("ex"),
        factory.createIdentifier("pair_array_to_mich_type")
      ),
      undefined,
      [factory.createArrayLiteralExpression(
        [ valuetoMichType(mt.args[0]), valuetoMichType(mt.args[1]) ],
        true
      )]
    )
    default: {
      const prim = mt.prim == null ? "string" : mt.prim
      const annots = mt.annots.length >= 1 ? [factory.createStringLiteral(mt.annots[0])] : []
      return factory.createCallExpression(
        factory.createPropertyAccessExpression(
          factory.createIdentifier("ex"),
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