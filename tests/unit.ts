import { generate_binding, Target, Language } from '../src/main'

const fs = require('fs');

describe('Test', async () => {

  it('unit', async () => {
    const name = 'poll';

    // const input = fs.readFileSync("./examples/" + name + ".json");
    const input = fs.readFileSync("./tests/contracts/json/type_asset_value_2_address.json");
    const ci = JSON.parse(input);
    const a = generate_binding(ci, { target: Target.Experiment, language: Language.Archetype, path: "./contracts/" });
    //console.log(a)
    // fs.writeFileSync("./examples/ts/result.ts", a)
    fs.writeFileSync("./tests/result.ts", a)
  })
})