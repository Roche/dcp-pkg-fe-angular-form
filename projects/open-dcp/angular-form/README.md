# AngularComponents

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.0.

## Code scaffolding

Run `ng generate component component-name --project angular-components` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project angular-components`.
> Note: Don't forget to add `--project angular-components` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build angular-components` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build angular-components`, go to the dist folder `cd dist/angular-components` and run `npm publish`.

## Validation translations

`odcp-form-validation-error` includes fallback validation messages under
`ODCP.FORM.VALIDATIONS` for `required`, `min`, `max`, `whitespace`,
`minlength` / `minLength`, and `maxlength` / `maxLength`.

Wrapper components such as `odcp-input-string`, `odcp-input-number`,
`odcp-secret-input`, `odcp-textarea`, `odcp-dropdown-select`, and
`odcp-multi-select` expose a `translationPrefix` input that is passed through to the
validation error component.

## Running unit tests

Run `ng test angular-components` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
