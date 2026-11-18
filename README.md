# @ashetm/ng-components

Angular workspace hosting the `@ashetm` Angular libraries.

| Package | Description | Documentation |
| --- | --- | --- |
| [`@ashetm/ng-dialog`](https://www.npmjs.com/package/@ashetm/ng-dialog) | Alert, confirm and form dialogs opened through a service | [README](projects/ng-dialog/README.md) · [CHANGELOG](projects/ng-dialog/CHANGELOG.md) |
| `@ashetm/ng-input` | Standalone form inputs (text, textarea, select, radio, date) | [README](projects/ng-input/README.md) · [CHANGELOG](projects/ng-input/CHANGELOG.md) |

The `ng-components-demo` application showcases the libraries.

> **NB:** the current line supports Angular 14 (Angular 13 and below are no longer supported).

## Development

Requirements: Node.js version of [`.nvmrc`](.nvmrc) (`nvm use`) and Google Chrome for unit tests.

```bash
npm ci                              # install dependencies
npm run start:ng-components-demo    # build the libraries and serve the demo on http://localhost:4500
npm run lint                        # lint every project
npm test                            # unit tests of every library (headless Chrome)
npm run build                       # build every library, then the demo
npm run verify                      # lint, test and build, as the CI does
```

Each project also has its own scripts, e.g. `npm run test:ng-dialog`, `npm run build:ng-input`, `npm run package:ng-dialog`.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE)
