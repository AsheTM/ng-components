# Contributing

## Issues

Create an issue first, describing the problem you encounter or the feature you need. Pull requests are welcome; otherwise the issue will be handled in the future.

## Branching model

The repository follows [git flow](https://nvie.com/posts/a-successful-git-branching-model/):

| Branch | Purpose | Created from | Merged into |
| --- | --- | --- | --- |
| `main` | published releases | — | — |
| `develop` | integration of the next release | `main` | — |
| `feature/<issue>-<topic>` | new feature | `develop` | `develop` |
| `bugfix/<issue>-<topic>` | bug fix | `develop` | `develop` |
| `chore/<issue>-<topic>`, `build/…`, `ci/…`, `docs/…` | maintenance | `develop` | `develop` |
| `release/<package>@<version>` | release preparation (version, changelog) | `develop` | `main` and `develop` |
| `hotfix/<issue>-<topic>` | urgent fix of a published release | `main` | `main` and `develop` |

Every change goes through a pull request linked to its issue, and pull requests are merged with a **merge commit** (no squash, no rebase), so the history of each branch is kept.

## Commit messages

Commits follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<optional scope>): <description>

<optional body>

<optional footer, e.g. Refs #12 / Closes #12>
```

- **types**: `feat`, `fix`, `refactor`, `perf`, `style`, `test`, `docs`, `build`, `ci`, `chore`, `revert`
- **scopes**: the project name, e.g. `ng-dialog`, `ng-input`, `demo`
- breaking changes add `!` after the type/scope and a `BREAKING CHANGE:` footer

## Before opening a pull request

```bash
npm run verify   # lint, unit tests and builds, as the CI does
```

Add or update unit tests for every behaviour change, and the `CHANGELOG.md` of the affected package when preparing a release.
