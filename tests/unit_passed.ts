import { generate_binding, Target, Language } from '../src/main'

const fs = require('fs');

const skipped = [
  "/tmp/contract-interface-json/fail_with_tuple_lit.json",
  "/tmp/contract-interface-json/test_asset.json",
  "/tmp/contract-interface-json/effect_fail_complex.json",
  "/tmp/contract-interface-json/spec_fails.json",
  "/tmp/contract-interface-json/lang_enum.json",
  "/tmp/contract-interface-json/verif_fail.json",
  "/tmp/contract-interface-json/unused_variable_opt.json",
  "/tmp/contract-interface-json/rf_failif_with.json",
  "/tmp/contract-interface-json/test_asset_sort_coll_2.json"
]

const is_skipped = (p: string) => {
  let res = false
  skipped.forEach(x => { if (x == p) { res = true } })
  return res
}

describe('Test', async () => {

  it('unit', async () => {
    const path = "/tmp/contract-interface-json/"
    const dir = await fs.promises.opendir(path)
    for await (const dirent of dir) {
      const file = path + dirent.name
      if (is_skipped(file)) {
        continue
      }
      console.log(file)
      const output = `./tests/passed/${dirent.name}.ts`
      const input = fs.readFileSync(file);
      const ci = JSON.parse(input);
      const a = generate_binding(ci, { target: Target.Experiment, language: Language.Archetype, path: "~/archetype/archetype-lang/tests/passed/" });
      //console.log(a)
      fs.writeFileSync(output, a)
    }
    // // for (file : fs.rea) {

    // // }
    // // const input = fs.readFileSync("./examples/" + name + ".json");
  })
})