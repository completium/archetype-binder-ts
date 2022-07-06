import * as ts from "typescript";

const file = ts.createSourceFile("source.ts", "", ts.ScriptTarget.ESNext, false, ts.ScriptKind.TS);
const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

const importExDecl = ts.factory.createImportDeclaration(
  undefined,
  undefined,
  ts.factory.createImportClause(
    false,
    undefined,
    ts.factory.createNamespaceImport(ts.factory.createIdentifier("ex"))
  ),
  ts.factory.createStringLiteral("@completium/experiment-ts"),
  undefined
)
const result = printer.printNode(ts.EmitHint.Unspecified, importExDecl, file);
console.log(result);