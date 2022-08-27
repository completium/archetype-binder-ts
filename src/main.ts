import ts, { createPrinter, createSourceFile, factory, ListFormat, NewLineKind, NodeFlags, ScriptKind, ScriptTarget, SyntaxKind, TsConfigSourceFile } from 'typescript';

import { archetype_type_to_mich_to_name, archetype_type_to_ts_type, ArchetypeType, Asset, ContractInterface, entity_to_mich, Entrypoint, Enum, Field, function_params_to_mich, FunctionParameter, get_return_body, make_cmp_body, make_completium_literal, make_error, mich_to_field_decl, MichelsonType, Record, StorageElement, value_to_mich_type } from "./utils";

const file = createSourceFile("source.ts", "", ScriptTarget.ESNext, false, ScriptKind.TS);
const printer = createPrinter({ newLine: NewLineKind.LineFeed });

// https://ts-ast-viewer.com/#

const make_mich_to_entity_decl = (name : string, body : ts.Statement[]) => {
  return factory.createVariableStatement(
    [factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    factory.createVariableDeclarationList(
    [factory.createVariableDeclaration(
      factory.createIdentifier("mich_to_" + name),
      undefined,
      undefined,
      factory.createArrowFunction(
        undefined,
        undefined,
        [factory.createParameterDeclaration(
          undefined,
          undefined,
          undefined,
          factory.createIdentifier("v"),
          undefined,
          factory.createTypeReferenceNode(
            factory.createQualifiedName(
              factory.createIdentifier("ex"),
              factory.createIdentifier("Micheline")
            ),
            undefined
          ),
          undefined
        ),
        factory.createParameterDeclaration(
          undefined,
          undefined,
          undefined,
          factory.createIdentifier("collapsed"),
          undefined,
          factory.createKeywordTypeNode(ts.SyntaxKind.BooleanKeyword),
          factory.createFalse()
        )],
        factory.createTypeReferenceNode(
          factory.createIdentifier(name),
          undefined
        ),
        factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
        factory.createBlock(body, true)
      )
    )],
    ts.NodeFlags.Const
  ))
}

const fields_to_mich_to_entity_decl = (name : string, fields : Array<Omit<Field, "is_key">>) => {
  return make_mich_to_entity_decl(name, [
    factory.createVariableStatement(
      undefined,
      factory.createVariableDeclarationList(
        [factory.createVariableDeclaration(
          factory.createIdentifier("fields"),
          undefined,
          undefined,
          factory.createArrayLiteralExpression(
            [],
            false
          )
        )],
        ts.NodeFlags.Let
      )
    ),
    factory.createIfStatement(
      factory.createIdentifier("collapsed"),
      factory.createBlock(
        [factory.createExpressionStatement(factory.createBinaryExpression(
          factory.createIdentifier("fields"),
          factory.createToken(ts.SyntaxKind.EqualsToken),
          factory.createCallExpression(
            factory.createPropertyAccessExpression(
              factory.createIdentifier("ex"),
              factory.createIdentifier("mich_to_pairs")
            ),
            undefined,
            [factory.createIdentifier("v")]
          )
        ))],
        true
      ),
      factory.createBlock(
        [factory.createExpressionStatement(factory.createBinaryExpression(
          factory.createIdentifier("fields"),
          factory.createToken(ts.SyntaxKind.EqualsToken),
          factory.createCallExpression(
            factory.createPropertyAccessExpression(
              factory.createIdentifier("ex"),
              factory.createIdentifier("annotated_mich_to_array")
            ),
            undefined,
            [
              factory.createIdentifier("v"),
              factory.createIdentifier(name + "_mich_type")
            ]
          )
        ))],
        true
      )
    ),
    factory.createReturnStatement(factory.createObjectLiteralExpression(fields.map((x, i) => {
      return factory.createPropertyAssignment(
        factory.createIdentifier(x.name),
        mich_to_field_decl(x.type, factory.createElementAccessExpression(
          factory.createIdentifier("fields"),
          factory.createIdentifier(""+i)
        ), i, fields.length)
      )
    })))
  ])
}

const mich_to_asset_value_decl = (a : Asset) => {
  const fields_no_key = a.fields.filter(x => !x.is_key)
  const name = a.name + "_value"
  if (fields_no_key.length > 1) {
    return fields_to_mich_to_entity_decl(a.name + "_value", a.fields.filter(x => !x.is_key))
  } else {
    return make_mich_to_entity_decl(name, [
      factory.createReturnStatement(mich_to_field_decl(fields_no_key[0].type, factory.createIdentifier("v")))
    ])
  }
}
const mich_to_record_decl = (r : Record) => fields_to_mich_to_entity_decl(r.name, r.fields)

const field_to_cmp_body = (field : Omit<Field, "is_key">) => {
  const a = factory.createPropertyAccessExpression(
    factory.createIdentifier("a"),
    factory.createIdentifier(field.name)
  )
  const b = factory.createPropertyAccessExpression(
    factory.createIdentifier("b"),
    factory.createIdentifier(field.name)
  )
  return make_cmp_body(a, b, field.type)
}

const make_cmp_decl = (name : string, body : ts.Expression) => {
  return factory.createVariableStatement(
    [factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    factory.createVariableDeclarationList(
    [factory.createVariableDeclaration(
      factory.createIdentifier(name + "_cmp"),
      undefined,
      undefined,
      factory.createArrowFunction(
        undefined,
        undefined,
        [
          factory.createParameterDeclaration(
            undefined,
            undefined,
            undefined,
            factory.createIdentifier("a"),
            undefined,
            factory.createTypeReferenceNode(
              factory.createIdentifier(name),
              undefined
            ),
            undefined
          ),
          factory.createParameterDeclaration(
            undefined,
            undefined,
            undefined,
            factory.createIdentifier("b"),
            undefined,
            factory.createTypeReferenceNode(
              factory.createIdentifier(name),
              undefined
            ),
            undefined
          )
        ],
        undefined,
        factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
        factory.createBlock(
          [factory.createReturnStatement(body)],
          true
        )
      )
    )],
    ts.NodeFlags.Const
  ))
}

const fields_to_cmp_decl = (name : string, fields : Array<Omit<Field, "is_key">>) => {
  return make_cmp_decl(name, factory.createParenthesizedExpression(
    fields.slice(1).reduce((acc, f) => {
      return factory.createBinaryExpression(
        acc,
        factory.createToken(ts.SyntaxKind.AmpersandAmpersandToken),
        field_to_cmp_body(f)
      )
    }, field_to_cmp_body(fields[0]))
  ))
}

const asset_to_cmp_decl = (a : Asset) => {
  const fields_no_key = a.fields.filter(x => !x.is_key)
  const name = a.name + "_value"
  if (fields_no_key.length > 1) {
    return fields_to_cmp_decl(name, fields_no_key)
  } else {
    const arg_a = factory.createIdentifier("a")
    const arg_b = factory.createIdentifier("b")
    return make_cmp_decl(name, make_cmp_body(arg_a, arg_b, fields_no_key[0].type))
  }
}

const record_to_cmp_decl = (r : Record) => fields_to_cmp_decl(r.name, r.fields)

const entity_to_mich_type_decl = (name : string, mt : MichelsonType) => {
  return factory.createVariableStatement(
    [factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    factory.createVariableDeclarationList(
      [factory.createVariableDeclaration(
        factory.createIdentifier(name),
        undefined,
        factory.createTypeReferenceNode(
          factory.createQualifiedName(
            factory.createIdentifier("ex"),
            factory.createIdentifier("MichelineType")
          ),
          undefined
        ),
        value_to_mich_type(mt)
      )],
      ts.NodeFlags.Const
    )
  )
}

const assetKeyToMichTypeDecl = (a : Asset) => entity_to_mich_type_decl(a.name + "_key_mich_type", a.key_type_michelson)
const assetValueToMichTypeDecl = (a : Asset) => entity_to_mich_type_decl(a.name + "_value_mich_type", a.value_type_michelson)
const assetContainerToMichTypeDecl = (a : Asset) => entity_to_mich_type_decl(a.name + "_container_mich_type", a.container_type_michelson)
const recordToMichTypeDecl = (r : Record) => entity_to_mich_type_decl(r.name + "_mich_type", r.type_michelson)

const entryToArgToMichDecl = (e: Entrypoint) : ts.VariableDeclarationList => {
  return factory.createVariableDeclarationList(
    [factory.createVariableDeclaration(
      factory.createIdentifier(e.name+"_arg_to_mich"),
      undefined,
      undefined,
      factory.createArrowFunction(
        undefined,
        undefined,
        e.args.map(contractParameterToParamDecl),
        factory.createTypeReferenceNode(
          factory.createQualifiedName(
            factory.createIdentifier("ex"),
            factory.createIdentifier("Micheline")
          ),
          undefined
        ),
        factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
        factory.createBlock(
          [factory.createReturnStatement(function_params_to_mich(e.args))],
          true
        )
      )
    )],
    ts.NodeFlags.Const
  )
}

const fieldToPropertyDecl = (f : Omit<Field, "is_key">) => {
  return factory.createPropertySignature(
    undefined,
    factory.createIdentifier(f.name),
    undefined,
    archetype_type_to_ts_type(f.type)
  )
}

const entityToInterfaceDecl = (name : string, fields : Array<Omit<Field,"is_key">>) => {
  if (fields.length == 1) {
    const field = fields[0];
    return factory.createTypeAliasDeclaration(
      undefined,
      [factory.createModifier(ts.SyntaxKind.ExportKeyword)],
      factory.createIdentifier(name),
      undefined,
      archetype_type_to_ts_type(field.type)
    )
  } else {
    return factory.createInterfaceDeclaration(
      undefined,
      [factory.createModifier(SyntaxKind.ExportKeyword)],
      factory.createIdentifier(name),
      undefined,
      undefined,
      fields.map(fieldToPropertyDecl)
    )
  }
}

const assetKeyToInterfaceDecl = (a : Asset) => entityToInterfaceDecl(a.name + "_key", a.fields.filter(x => x.is_key))
const assetValueToInterfaceDecl = (a : Asset) => entityToInterfaceDecl(a.name + "_value", a.fields.filter(x => !x.is_key))
const recordToInterfaceDecl = (r : Record) => entityToInterfaceDecl(r.name, r.fields)

const assetContainerToTypeDecl = (a : Asset) => {
  return factory.createTypeAliasDeclaration(
    undefined,
    [factory.createModifier(SyntaxKind.ExportKeyword)],
    factory.createIdentifier(a.name+"_container"),
    undefined,
    factory.createTypeReferenceNode(
      factory.createIdentifier("Array"),
      [not_a_set(a) ?
        factory.createTupleTypeNode([
          factory.createTypeReferenceNode(
            factory.createIdentifier(a.name+"_key"),
            undefined
          ),
          factory.createTypeReferenceNode(
            factory.createIdentifier(a.name+"_value"),
            undefined
          )
        ]) :
        factory.createTypeReferenceNode(
          factory.createIdentifier(a.name+"_key"),
          undefined
        )
      ]
    ))
}

const entityToMichDecl = (entity_postfix : string, aname : string, mt : MichelsonType, fields : Array<Partial<Field>>) => {
  return factory.createVariableStatement(
    [factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    factory.createVariableDeclarationList(
    [factory.createVariableDeclaration(
      factory.createIdentifier(aname + entity_postfix + "_to_mich"),
      undefined,
      undefined,
      factory.createArrowFunction(
        undefined,
        undefined,
        [factory.createParameterDeclaration(
          undefined,
          undefined,
          undefined,
          factory.createIdentifier("x"),
          undefined,
          factory.createTypeReferenceNode(
            factory.createIdentifier(aname + entity_postfix),
            undefined
          ),
          undefined
        )],
        factory.createTypeReferenceNode(
          factory.createQualifiedName(
            factory.createIdentifier("ex"),
            factory.createIdentifier("Micheline")
          ),
          undefined
        ),
        factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
        factory.createBlock(
          [factory.createReturnStatement((entity_to_mich("x", mt, fields))[1])],
          true
        )
      )
    )],
    ts.NodeFlags.Const
  ))
}

const assetKeyToMichDecl = (a : Asset) => entityToMichDecl("_key", a.name, a.key_type_michelson, a.fields.filter(x => x.is_key))
const assetValueToMichDecl = (a : Asset) =>  entityToMichDecl("_value", a.name, a.value_type_michelson, a.fields.filter(x => !x.is_key))
const assetContainerToMichDecl = (a : Asset) => entityToMichDecl("_container", a.name, a.container_type_michelson, a.fields)
const recordToMichDecl = (r : Record) => entityToMichDecl("", r.name, r.type_michelson, r.fields)

const contractParameterToParamDecl = (fp : FunctionParameter) => {
  return factory.createParameterDeclaration(
    undefined,
    undefined,
    undefined,
    factory.createIdentifier(fp.name),
    undefined,
    archetype_type_to_ts_type(fp.type),
    undefined
  )
}

const storageElementToParamDecl = (se : StorageElement) => {
  return factory.createParameterDeclaration(
    undefined,
    undefined,
    undefined,
    factory.createIdentifier(se.name),
    factory.createToken(SyntaxKind.QuestionToken),
    archetype_type_to_ts_type(se.type),
    undefined
  )
}

const entryToMethod = (e : Entrypoint) => {
  return factory.createMethodDeclaration(
    undefined,
    [factory.createModifier(SyntaxKind.AsyncKeyword)],
    undefined,
    factory.createIdentifier(e.name),
    undefined,
    undefined,
    e.args.map(contractParameterToParamDecl).concat([
      factory.createParameterDeclaration(
        undefined,
        undefined,
        undefined,
        factory.createIdentifier("params"),
        undefined,
        factory.createTypeReferenceNode(
          factory.createIdentifier("Partial"),
          [factory.createTypeReferenceNode(
            factory.createQualifiedName(
              factory.createIdentifier("ex"),
              factory.createIdentifier("Parameters")
            ),
            undefined
          )]
        ),
        undefined
      )
    ]),
    factory.createTypeReferenceNode(
      factory.createIdentifier("Promise"),
      [factory.createKeywordTypeNode(SyntaxKind.AnyKeyword)]
    ),
    factory.createBlock(
      [factory.createIfStatement(
        factory.createBinaryExpression(
          factory.createPropertyAccessExpression(
            factory.createThis(),
            factory.createIdentifier("address")
          ),
          factory.createToken(SyntaxKind.ExclamationEqualsToken),
          factory.createIdentifier("undefined")
        ),
        factory.createBlock(
          [factory.createExpressionStatement(factory.createAwaitExpression(factory.createCallExpression(
            factory.createPropertyAccessExpression(
              factory.createIdentifier("ex"),
              factory.createIdentifier("call")
            ),
            undefined,
            [
              factory.createPropertyAccessExpression(
                factory.createThis(),
                factory.createIdentifier("address")
              ),
              factory.createStringLiteral(e.name),
              factory.createCallExpression(
                factory.createIdentifier(e.name+"_arg_to_mich"),
                undefined,
                e.args.map(x => x.name).map(x => factory.createIdentifier(x))
              ),
              factory.createIdentifier("params")
            ]
          )))],
          true
        ),
        undefined
      )],
      true
    )
  )
}

const storage_elt_to_getter_skeleton = (elt_name : string, args : ts.ParameterDeclaration[], ts_type : ts.KeywordTypeNode<any>, body : ts.Statement[]) => {
  return factory.createMethodDeclaration(
    undefined,
    [factory.createModifier(ts.SyntaxKind.AsyncKeyword)],
    undefined,
    factory.createIdentifier("get_" + elt_name),
    undefined,
    undefined,
    args,
    factory.createTypeReferenceNode(
      factory.createIdentifier("Promise"),
      [ ts_type ]
    ),
    factory.createBlock(
      [
        factory.createIfStatement(
          factory.createBinaryExpression(
            factory.createPropertyAccessExpression(
              factory.createThis(),
              factory.createIdentifier("address")
            ),
            factory.createToken(ts.SyntaxKind.ExclamationEqualsToken),
            factory.createIdentifier("undefined")
          ),
          factory.createBlock(
            ([
              factory.createVariableStatement(
                undefined,
                factory.createVariableDeclarationList(
                  [factory.createVariableDeclaration(
                    factory.createIdentifier("storage"),
                    undefined,
                    undefined,
                    factory.createAwaitExpression(factory.createCallExpression(
                      factory.createPropertyAccessExpression(
                        factory.createIdentifier("ex"),
                        factory.createIdentifier("get_storage")
                      ),
                      undefined,
                      [factory.createPropertyAccessExpression(
                        factory.createThis(),
                        factory.createIdentifier("address")
                      )]
                    ))
                  )],
                  ts.NodeFlags.Const | ts.NodeFlags.AwaitContext | ts.NodeFlags.ContextFlags | ts.NodeFlags.TypeExcludesFlags
                )
              ),
              ...(body)
            ])
            ,
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

const storage_elt_to_class = (selt: StorageElement, ci : ContractInterface) => {
  const root = factory.createIdentifier("storage")
  const elt = ci.storage.length > 1 ?
    factory.createPropertyAccessExpression(
      root,
      factory.createIdentifier(selt.name)
    ) :
    root
  return storage_elt_to_getter_skeleton(
    selt.name,
    [],
    archetype_type_to_ts_type(selt.type),
    get_return_body(elt, selt.type, ci)
  )
}

const get_big_map_value_getter_body = (name : string) : ts.Statement[] => {
  return [
    factory.createVariableStatement(
      undefined,
      factory.createVariableDeclarationList(
        [factory.createVariableDeclaration(
          factory.createIdentifier("data"),
          undefined,
          undefined,
          factory.createAwaitExpression(factory.createCallExpression(
            factory.createPropertyAccessExpression(
              factory.createIdentifier("ex"),
              factory.createIdentifier("get_big_map_value")
            ),
            undefined,
            [
              factory.createCallExpression(
                factory.createIdentifier("BigInt"),
                undefined,
                [factory.createPropertyAccessExpression(
                  factory.createIdentifier("storage"),
                  factory.createIdentifier(name)
                )]
              ),
              factory.createCallExpression(
                factory.createIdentifier(name+"_key_to_mich"),
                undefined,
                [factory.createIdentifier("key")]
              ),
              factory.createIdentifier(name+"_key_mich_type")
            ]
          ))
        )],
        ts.NodeFlags.Const | ts.NodeFlags.AwaitContext | ts.NodeFlags.ContextFlags | ts.NodeFlags.TypeExcludesFlags
      )
    ),
    factory.createIfStatement(
      factory.createBinaryExpression(
        factory.createIdentifier("data"),
        factory.createToken(ts.SyntaxKind.ExclamationEqualsToken),
        factory.createIdentifier("undefined")
      ),
      factory.createBlock(
        [factory.createReturnStatement(factory.createCallExpression(
          factory.createIdentifier("mich_to_" + name + "_value"),
          undefined,
          [factory.createIdentifier("data"), factory.createTrue()]
        ))],
        true
      ),
      factory.createBlock(
        [factory.createReturnStatement(factory.createIdentifier("undefined"))],
        true
      )
    )
  ]
}

const storageToGetters = (selt: StorageElement, ci : ContractInterface) => {
  switch (selt.type.node) {
    /* TODO same for big maps ? */
    case "asset"   : // Special treatment for big map assets
      const assetType = ci.types.assets.find(x => x.name == selt.name)
      if (assetType != undefined && assetType.container_kind == "big_map") {
        return storage_elt_to_getter_skeleton(
          selt.name + "_value",
          [factory.createParameterDeclaration(
            undefined,
            undefined,
            undefined,
            factory.createIdentifier("key"),
            undefined,
            factory.createTypeReferenceNode(
              factory.createIdentifier(selt.name+"_key"),
              undefined
            ),
            undefined
          )],
          factory.createUnionTypeNode([
            factory.createTypeReferenceNode(
              factory.createIdentifier(selt.name+"_value"),
              undefined
            ),
            factory.createKeywordTypeNode(ts.SyntaxKind.UndefinedKeyword)
          ]),
          get_big_map_value_getter_body(selt.name)
        )
        //return [assetValueToBigMapGetter(assetType)]
      }
    default : return storage_elt_to_class(selt, ci)
  }
}

const get_contract_class_node = (ci : ContractInterface, cp : string) => {
  return factory.createClassDeclaration(
    undefined,
    [factory.createModifier(SyntaxKind.ExportKeyword)],
    factory.createIdentifier(ci.name.charAt(0).toUpperCase() + ci.name.slice(1)),
    undefined,
    undefined,
    [
      factory.createPropertyDeclaration(
        undefined,
        undefined,
        factory.createIdentifier("address"),
        undefined,
        factory.createUnionTypeNode([
          factory.createKeywordTypeNode(SyntaxKind.StringKeyword),
          factory.createKeywordTypeNode(SyntaxKind.UndefinedKeyword)
        ]),
        undefined
      ),
      factory.createMethodDeclaration(
        undefined,
        undefined,
        undefined,
        factory.createIdentifier("get_address"),
        undefined,
        undefined,
        [],
        factory.createTypeReferenceNode(
          factory.createQualifiedName(
            factory.createIdentifier("ex"),
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
                    factory.createIdentifier("ex"),
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
      ,
      factory.createMethodDeclaration(
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
              factory.createIdentifier("ex"),
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
                      factory.createIdentifier("ex"),
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
      ),
      factory.createMethodDeclaration(
        undefined,
        [factory.createModifier(SyntaxKind.AsyncKeyword)],
        undefined,
        factory.createIdentifier("deploy"),
        undefined,
        undefined,
        ci.parameters.map(contractParameterToParamDecl).concat([
          factory.createParameterDeclaration(
            undefined,
            undefined,
            undefined,
            factory.createIdentifier("params"),
            undefined,
            factory.createTypeReferenceNode(
              factory.createIdentifier("Partial"),
              [factory.createTypeReferenceNode(
                factory.createQualifiedName(
                  factory.createIdentifier("ex"),
                  factory.createIdentifier("Parameters")
                ),
                undefined
              )]
            ),
            undefined
          )
        ]),
        undefined,
        factory.createBlock(
          [
            factory.createVariableStatement(
              undefined,
              factory.createVariableDeclarationList(
                [factory.createVariableDeclaration(
                  factory.createIdentifier("address"),
                  undefined,
                  undefined,
                  factory.createAwaitExpression(factory.createCallExpression(
                    factory.createPropertyAccessExpression(
                      factory.createIdentifier("ex"),
                      factory.createIdentifier("deploy")
                    ),
                    undefined,
                    [
                      factory.createStringLiteral(cp + ci.name + ".arl"),
                      factory.createObjectLiteralExpression(ci.parameters.map(x =>
                        factory.createPropertyAssignment(
                          factory.createIdentifier(x.name),
                          make_completium_literal(x.name, x.type)
                        )
                      ), true),
                      factory.createIdentifier("params")
                    ]
                  ))
                )],
                NodeFlags.Const | NodeFlags.AwaitContext | NodeFlags.ContextFlags | NodeFlags.TypeExcludesFlags
              )
            ),
            factory.createExpressionStatement(factory.createBinaryExpression(
              factory.createPropertyAccessExpression(
                factory.createThis(),
                factory.createIdentifier("address")
              ),
              factory.createToken(SyntaxKind.EqualsToken),
              factory.createIdentifier("address")
            ))
          ],
          true
        )
      )
    ]
    .concat(ci.entrypoints.map(entryToMethod))
    .concat(ci.parameters.filter(x => !x.const).reduce((acc,x) => acc.concat(storageToGetters(x, ci)), <ts.MethodDeclaration[]>[]))
    .concat(ci.storage.filter(x => !x.const).reduce((acc,x) => acc.concat(storageToGetters(x, ci)),<ts.MethodDeclaration[]>[]))
    .concat(ci.types.enums.filter(x => x.name == "state").map(getStateDecl))
    .concat([errors_to_decl(ci)])
  )
}

const get_imports = () : ts.ImportDeclaration => {
  return factory.createImportDeclaration(
    undefined,
    undefined,
    factory.createImportClause(
      false,
      undefined,
      factory.createNamespaceImport(factory.createIdentifier("ex"))
    ),
    factory.createStringLiteral("@completium/experiment-ts"),
    undefined
  )
}

const get_contract_decl = (ci : ContractInterface) => {
  return factory.createVariableStatement(
    [factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    factory.createVariableDeclarationList(
      [factory.createVariableDeclaration(
        factory.createIdentifier(ci.name),
        undefined,
        undefined,
        factory.createNewExpression(
          factory.createIdentifier(ci.name.charAt(0).toUpperCase() + ci.name.slice(1)),
          undefined,
          []
        )
      )],
      ts.NodeFlags.Const
    )
  )
}

const enumToDecl = (e : Enum) : ts.EnumDeclaration => {
  return factory.createEnumDeclaration(
      undefined,
      [factory.createModifier(ts.SyntaxKind.ExportKeyword)],
      factory.createIdentifier("states"),
      e.constructors.map((x,i) => {
        return factory.createEnumMember(
          factory.createIdentifier(x.name),
          i == 0 ? factory.createNumericLiteral("1") : undefined
        )
      })
    );
    /* TODO manage non integer enums */
}

const getStateDecl = (e : Enum) : ts.MethodDeclaration => {
  return factory.createMethodDeclaration(
    undefined,
    [factory.createModifier(ts.SyntaxKind.AsyncKeyword)],
    undefined,
    factory.createIdentifier("get_state"),
    undefined,
    undefined,
    [],
    factory.createTypeReferenceNode(
      factory.createIdentifier("Promise"),
      [factory.createTypeReferenceNode(
        factory.createIdentifier("states"),
        undefined
      )]
    ),
    factory.createBlock(
      [
        factory.createIfStatement(
          factory.createBinaryExpression(
            factory.createPropertyAccessExpression(
              factory.createThis(),
              factory.createIdentifier("address")
            ),
            factory.createToken(ts.SyntaxKind.ExclamationEqualsToken),
            factory.createIdentifier("undefined")
          ),
          factory.createBlock(
            [
              factory.createVariableStatement(
                undefined,
                factory.createVariableDeclarationList(
                  [factory.createVariableDeclaration(
                    factory.createIdentifier("storage"),
                    undefined,
                    undefined,
                    factory.createAwaitExpression(factory.createCallExpression(
                      factory.createPropertyAccessExpression(
                        factory.createIdentifier("ex"),
                        factory.createIdentifier("get_storage")
                      ),
                      undefined,
                      [factory.createPropertyAccessExpression(
                        factory.createThis(),
                        factory.createIdentifier("address")
                      )]
                    ))
                  )],
                  ts.NodeFlags.Const | ts.NodeFlags.AwaitContext | ts.NodeFlags.ContextFlags | ts.NodeFlags.TypeExcludesFlags
                )
              ),
              factory.createVariableStatement(
                undefined,
                factory.createVariableDeclarationList(
                  [factory.createVariableDeclaration(
                    factory.createIdentifier("state"),
                    undefined,
                    undefined,
                    factory.createPropertyAccessExpression(
                      factory.createIdentifier("storage"),
                      factory.createIdentifier("_state")
                    )
                  )],
                  ts.NodeFlags.Const | ts.NodeFlags.AwaitContext | ts.NodeFlags.ContextFlags | ts.NodeFlags.TypeExcludesFlags
                )
              ),
              factory.createSwitchStatement(
                factory.createCallExpression(
                  factory.createPropertyAccessExpression(
                    factory.createIdentifier("state"),
                    factory.createIdentifier("toNumber")
                  ),
                  undefined,
                  []
                ),
                factory.createCaseBlock(
                e.constructors.map((x, i) => {
                  return factory.createCaseClause(
                    factory.createNumericLiteral(i),
                    [factory.createReturnStatement(factory.createPropertyAccessExpression(
                      factory.createIdentifier("states"),
                      factory.createIdentifier(x.name)
                    ))]
                  )
                }))
              )
            ],
            true
          ),
          undefined
        ),
        factory.createReturnStatement(factory.createPropertyAccessExpression(
          factory.createIdentifier("states"),
          factory.createIdentifier(e.constructors[0].name)
        ))
      ],
      true
    )
  )
}

const errors_to_decl = (ci : ContractInterface) : ts.PropertyDeclaration => {
  return factory.createPropertyDeclaration(
    undefined,
    undefined,
    factory.createIdentifier("errors"),
    undefined,
    undefined,
    factory.createObjectLiteralExpression(
      ci.errors.map(make_error).reduce((acc,x) => {
        const [label, expr] = x
        if (!acc.reduce((a,p) => {
          const [l, _] = p
          if (!a) {
            return label == l
          } else {
            return false
          }
        }, false)) {
          acc.push([label, expr])
        }
        return acc
      }, <Array<[string, ts.Expression]>>[]).map(x => {
        const [label, expr] = x
        return factory.createPropertyAssignment(
          factory.createIdentifier(label),
          expr
        )
      }),
      true
    )
  )
}

const not_a_set = (a : Asset) => {
  return a.container_type_michelson.prim != "set"
}

const get_nodes = (contract_interface : ContractInterface, contract_path : string) : (ts.ImportDeclaration | ts.InterfaceDeclaration | ts.ClassDeclaration | ts.TypeAliasDeclaration | ts.VariableDeclarationList | ts.VariableStatement | ts.EnumDeclaration)[] => {
  return [
    ...([get_imports()]),
    // enums
    ...(contract_interface.types.enums.map(enumToDecl)),
    // records
    ...(contract_interface.types.records.map(recordToInterfaceDecl)),
    ...(contract_interface.types.records.map(recordToMichDecl)),
    ...(contract_interface.types.records.map(recordToMichTypeDecl)),
    ...(contract_interface.types.records.map(mich_to_record_decl)),
    ...(contract_interface.types.records.map(record_to_cmp_decl)),
    // asset keys
    ...(contract_interface.types.assets.map(assetKeyToInterfaceDecl)),
    ...(contract_interface.types.assets.map(assetKeyToMichDecl)),
    ...(contract_interface.types.assets.map(assetKeyToMichTypeDecl)),
    // asset values
    ...(contract_interface.types.assets.filter(not_a_set).map(assetValueToInterfaceDecl)),
    ...(contract_interface.types.assets.filter(not_a_set).map(assetValueToMichDecl)),
    ...(contract_interface.types.assets.filter(not_a_set).map(assetValueToMichTypeDecl)),
    ...(contract_interface.types.assets.filter(not_a_set).map(mich_to_asset_value_decl)),
    ...(contract_interface.types.assets.filter(not_a_set).map(asset_to_cmp_decl)),
    // asset containers
    ...(contract_interface.types.assets.map(assetContainerToTypeDecl)),
    ...(contract_interface.types.assets.map(assetContainerToMichDecl)),
    ...(contract_interface.types.assets.map(assetContainerToMichTypeDecl)),
    // entrypoint argument to michelson
    ...(contract_interface.entrypoints.map(entryToArgToMichDecl)),
    ...([
    // contract class
      get_contract_class_node(contract_interface, contract_path),
    // contract instance
      get_contract_decl(contract_interface)
    ]),
  ]
}

export const generate_binding = (contract_interface : ContractInterface, contract_path : string = "./contracts/") : string => {
  const nodeArr = factory.createNodeArray(get_nodes(contract_interface, contract_path));
  const result = printer.printList(ListFormat.MultiLine, nodeArr, file);
  return result
}

//import ci from "../examples/oracle.json"
//console.log(generate_binding(ci))