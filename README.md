# coderelay.io

This is the source for the code-relay website.

---

## Looking for the repo for the back-end code?

There isn't one, yet. Right now, I ([@mmulet](github.com/mmulet)) answer all emails personally.
When code relay grows large enough that it needs an automated backend,
I intend to build it using code relay, and it will be open source.

---

The content is all plain html, but we do have some
javascript for interactive animations and other fun things.
In the true spirit of web-development, we have re-invented the wheel
and created a custom build system using React/React-dom server.
Namely, we wrote the whole site with React components, which we generate
ahead of time and serve as plain html. Read more about this in ./scripts/README.md.

## Structure

Here are the folders and their meanings:

- `docs` folder is where all user facing content goes.
  The server serves all files in the `docs` folder as `/`

- `gulp` folder is where all files for the gulp build system go.
  These are all typescript files. These files are all compiled on the fly by ts-node

- `scripts` folder is where all source files for the website reside.

## Development

Install dependencies:

```
npm install .
```

Then, generate the site.

```
npm run build
```

---

Use npm run dev to start the gulp file which will watch all sources and generate on the fly with live-reload

```
npm run dev
```

Set the environment variable CODE_RELAY_DEV_PORT to change the port. The default is 5000.

All the code for the site is in the ./scripts/src directory

# How to read the code

- Start at `./gulpfile.ts` to see how it is built
- This should lead you to `./scripts/src/index.ts` which will generate all files.
- From there look at each file in `./scripts/src/fileGenerators`
