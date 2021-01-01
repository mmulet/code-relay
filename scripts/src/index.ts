import generateAll from "./fileGenerators/lib/generateAll";


/**
 * This is the starting point of the site generation.
 * This will look for all modules in fileGenerators,
 * and generates the files accordingly. @see /scripts/README.MD
 *
 * However this assumes you have already compiled the
 * typescript and copied the examples.
 * If you ran `npm run build` or `gulp build`
 * these should have been done automatically.
 */
export const main = () => generateAll();

if (require.main == module) {
  main().catch(console.error);
}
