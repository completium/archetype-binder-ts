import ts, { createPrinter, createSourceFile, factory, ListFormat, NewLineKind, NodeFlags, ScriptKind, ScriptTarget, SyntaxKind } from 'typescript';

import contract_json from '../examples/oracle.json'
import { archetypeTypeToTsType, Asset, ContractInterface, entryArgToMich, Entrypoint, Field, FunctionParameter, importNode, StorageElement } from "./utils";

const file = createSourceFile("source.ts", "", ScriptTarget.ESNext, false, ScriptKind.TS);
const printer = createPrinter({ newLine: NewLineKind.LineFeed });


const contract_interface : ContractInterface = contract_json

// https://ts-ast-viewer.com/#

const entryArgsToMich = (a : Array<FunctionParameter>) => {
  if (a.length == 0) {
    return factory.createPropertyAccessExpression(
      factory.createIdentifier("ex"),
      factory.createIdentifier("unit_mich")
    )
  } else if (a.length == 1) {
    return entryArgToMich(a[0])
  } else {
    return factory.createCallExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier("ex"),
        factory.createIdentifier("pair_to_mich")
      ),
      undefined,
      [factory.createArrayLiteralExpression(
        a.map(entryArgToMich),
        true
      )]
    )
  }
}

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
          [factory.createReturnStatement(entryArgsToMich(e.args))],
          true
        )
      )
    )],
    ts.NodeFlags.Const
  )
}

const fieldToPropertyDecl = (f : Field) => {
  return factory.createPropertySignature(
    undefined,
    factory.createIdentifier(f.name),
    undefined,
    archetypeTypeToTsType(f.type)
  )
}

const assetToInterfaceDecl = (is_key : boolean, postfix: string) => (a : Asset) => {
  return factory.createInterfaceDeclaration(
    undefined,
    [factory.createModifier(SyntaxKind.ExportKeyword)],
    factory.createIdentifier(a.name+postfix),
    undefined,
    undefined,
    a.fields.filter(x => x.is_key == is_key).map(fieldToPropertyDecl)
  )
}

const assetKeyToInterfaceDecl = assetToInterfaceDecl(true, "_key")

const assetValueToInterfaceDecl = assetToInterfaceDecl(false, "_value")

const assetContainerToTypeDecl = (a : Asset) => {
  return factory.createTypeAliasDeclaration(
    undefined,
    [factory.createModifier(SyntaxKind.ExportKeyword)],
    factory.createIdentifier("oracleData_container"),
    undefined,
    factory.createTypeReferenceNode(
      factory.createIdentifier("Array"),
      [factory.createTupleTypeNode([
        factory.createTypeReferenceNode(
          factory.createIdentifier(a.name+"_key"),
          undefined
        ),
        factory.createTypeReferenceNode(
          factory.createIdentifier(a.name+"_value"),
          undefined
        )
      ])]
    ))
}

const contractParameterToParamDecl = (fp : FunctionParameter) => {
  return factory.createParameterDeclaration(
    undefined,
    undefined,
    undefined,
    factory.createIdentifier(fp.name),
    undefined,
    archetypeTypeToTsType(fp.type),
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
    archetypeTypeToTsType(se.type),
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

const get_contract_class_node = (ci : ContractInterface) => {
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
        factory.createUnionTypeNode([
          factory.createKeywordTypeNode(SyntaxKind.StringKeyword),
          factory.createKeywordTypeNode(SyntaxKind.UndefinedKeyword)
        ]),
        factory.createBlock(
          [factory.createReturnStatement(factory.createPropertyAccessExpression(
            factory.createThis(),
            factory.createIdentifier("address")
          ))],
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
        ci.parameters.filter(x => !x.const).map(contractParameterToParamDecl).concat([
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
        ]).concat(ci.storage.filter(x => !x.const).map(storageElementToParamDecl)),
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
                      factory.createStringLiteral("./contracts/"+ci.name+".arl"),
                      factory.createObjectLiteralExpression(
                        [factory.createPropertyAssignment(
                          factory.createIdentifier("publickey"),
                          factory.createIdentifier("publickey")
                        )],
                        true
                      ),
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
    ].concat(ci.entrypoints.map(entryToMethod))
  )
}

const get_imports = () : Array<ts.ImportDeclaration> => {
  return [importNode]
}

const nodes : (ts.ImportDeclaration | ts.InterfaceDeclaration | ts.ClassDeclaration | ts.TypeAliasDeclaration | ts.VariableDeclarationList)[] = [
  ...(get_imports()),
  ...(contract_interface.types.assets.map(assetKeyToInterfaceDecl)),
  ...(contract_interface.types.assets.map(assetValueToInterfaceDecl)),
  ...(contract_interface.types.assets.map(assetContainerToTypeDecl)),
  ...(contract_interface.entrypoints.map(entryToArgToMichDecl)),
  ...([get_contract_class_node(contract_interface)]),
]

const nodeArr = factory.createNodeArray(nodes);

const result = printer.printList(ListFormat.MultiLine, nodeArr, file);
console.log(result);