/**
 * Copy/paste this into the console
 * or tap "Run code"
 */
(() => {
  const number = 1;
  const nextNumber = 1 + number;
  const code = document.querySelector(
    `#code${number}`
  );
  const allCode = document.querySelector(
    `#allCode`
  );
  if (!code || !allCode) {
    return;
  }
  const nextCode = document.createElement(
    "div"
  );
  allCode.appendChild(nextCode);
  nextCode.id = `code${nextNumber}`;
  nextCode.innerHTML = code.innerHTML.replace(
    new RegExp(
      `(nu\x6dber\x5cs+<[^>]+>` +
        `=<[^>]+> \x3c[^>]+>)${number}`
    ),
    `$1${nextNumber}`
  );
})();
