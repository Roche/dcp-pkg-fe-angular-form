import {Injectable, OnDestroy} from "@angular/core";
import {FormGeneratorElModel} from "../form-generator.model";
import {UntypedFormGroup} from "@angular/forms";
import {debounceTime, filter, takeUntil} from "rxjs/operators";
import {OnDestroySubject} from "@open-dcp/angular-services";


@Injectable()
/**
 * Base class for form-generator driven configuration handling.
 *
 * @example
 * ```ts
 * @Injectable()
 * export class ChartConfigurationService extends FormGeneratorBaseClass {
 *   initialize(settings: FormGeneratorElModel[]) {
 *     this.configurationForm = new UntypedFormGroup({});
 *     this.setFormSettings(settings);
 *
 *     this.subscribeToConfiguration((configuration) => {
 *       // Fired only when the form is valid and after debounce.
 *       console.log("Valid configuration", configuration);
 *     });
 *   }
 * }
 * ```
 */
export abstract class FormGeneratorBaseClass extends OnDestroySubject implements OnDestroy {
  formGeneratorSettings: FormGeneratorElModel[] = [];
  configurationForm: UntypedFormGroup = new UntypedFormGroup({});
  defaultConfiguration: any = {};
  get configurationValue(): any {
    return this.configurationForm.value;
  }
  override ngOnDestroy() {
    super.ngOnDestroy();
  }
  setFormSettings(settings: FormGeneratorElModel[] = []) {
    this.formGeneratorSettings = settings;
  }
  subscribeToConfiguration(callback: (configuration: any) => void) {
    this.configurationForm.valueChanges.pipe(
      takeUntil(this.onDestroy$),
      filter(v => Object.keys(v).length >0),
      debounceTime(200)
    )
    .subscribe(val => {
      if (this.configurationForm.valid) {
        callback(val)
      }
    });
  }
}
