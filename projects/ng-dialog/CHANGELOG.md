# 14.1.0

- [x] Fix `getInstanceId` always returning `0`, each dialog reference now has its own id
- [x] Fix `onBefore*` guards: an action is performed only when all of its guards return `true`, and the observables now emit their value before completing
- [x] Fix dialog teardown running twice when closing during the closing animation
- [x] Fix Escape closing every opened dialog, only the top-most one closes now
- [x] Fix the form dialog throwing when its `template` input is bound declaratively
- [x] Fix omitted button labels losing their default value
- [x] Fix default label typo, `Okey` is now `OK`
- [x] Add `afterClosed()` and `closed` to dialog references
- [x] Add `TDialogAlertLabels`, `TDialogLabels` and `TDialogGuard` types to the public API
- [x] Add dialog accessibility: ARIA roles and labels, focus on open, focus trap and focus restoration
- [x] Use `createComponent` and the injected `DOCUMENT` instead of the deprecated `ComponentFactoryResolver` and the global `document`
- [x] Require Angular 14.1 or above

# 1*.0.1

- [x] Fix issue of not able to prevent close event
- [x] Fix issue of not able to prevent confirm event
- [x] Fix issue of not able to prevent data event
- [x] Fix issue of not able to prevent with 2 events simultaneously

# 1*.0.0

- [x] Support ng-dialog for Angular 1*

# 14.0.0

- [x] Support ng-dialog for Angular 14

# 3.0.6

- [x] Add repository url in package.json of ng-dialog

# 3.0.5

- [x] Create CHANGELOG.md

# 3.0.4

- [x] Fix peer dependency name misspelling

# 3.0.3

- [x] Support Angualr 12 and above
- [x] Modify documentation README.md

# 3.0.2

- [x] Add keywords in package.json
- [x] Make package public in package.json
- [x] Add myself as author and contributor in package.json

# 3.0.1

- [x] Adjust documentation README.md

# 3.0.0

- [x] Remove dialog button component, and merge it with main dialog component
- [x] Implement `DialogForm` feature
- [x] Implement `DialogConfirm` feature
- [x] Implement `DialogAlert` feature
