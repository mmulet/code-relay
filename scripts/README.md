# Scripts

There are three types of scripts, each with its own purpose,
each in a different folder.

## fileGenerators

We wrote the whole site with React components, which we generate
ahead of time and serve as plain html.
The starting point is `./fileGenerators/lib/generateAll` which looks through all files in
`./fileGenerators` and generates each one.
Each file in generated files, corresponds to one generated file. Each file's
default export _must_ be a FileGenerator object. See `./fileGenerators/lib/FileGenerator`
to see the documentation for that interface.
All of the shared dependencies for each file is saved in `./fileGenerators/lib`

## clientSide

Scripts in the clientSide folder are scripts that will run on the web page.
They will be embedded in a < script> tag. Scripts here should not be
modules, and they should not reference any scripts in any other folders.
Theses scripts are typescripts(.ts) and typescript declaration files (.d.ts)
and they are compiled and emitted to `./scripts/compiled/clientSide`. They are embedded
in the html pages at generation time.

## codeExamples

Scripts in the codeExamples folder are scripts that will never run,
they are used in the examples boxes for the website. They can be
any type of file (.css, .jsx, etc). They are not compiled by gulp. 
They are embedded into the html pages at generation time
