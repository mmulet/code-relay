export const html = ({
  title,
  body,
  head,
  moduleName,
  bodyEnd
}: {
  readonly title: string;
  readonly body: string;
  readonly moduleName: string;
  readonly head?: string;
  readonly bodyEnd?: string
}) => `
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<!-- To the attention of Contributors: 
This file is generated. Do not modify by hand. Modify ./scripts/src/fileGenerators/${moduleName} instead -->
<html>

<head>
<link rel="icon" type="image/png" href="/favicon.png?">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>${title}</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    ${head ?? ""}
</head>
<body>
    ${body}
    ${bodyEnd ?? ""}
</body>
</html>
`;