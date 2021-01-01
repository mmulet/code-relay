import { compiledFileGeneratorsDirectory } from "./directories";
import generate from "./generate";
import getAllFileGenerators from "./getAllFileGenerators";

const generateAll = async () =>
  Promise.all(
    (await getAllFileGenerators(compiledFileGeneratorsDirectory)).map(generate)
  );

export default generateAll;

if (require.main == module) {
  generateAll().catch(console.error);
}
