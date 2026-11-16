import { STORYBOOK_MOCK_API } from '../mocks/storybook-mock-api.data';
import {CommonModule} from '@angular/common';
import {Component, Input} from '@angular/core';
import {AbstractControl, ReactiveFormsModule, UntypedFormControl} from '@angular/forms';
import {Meta, moduleMetadata} from '@storybook/angular';
import {FormGeneratorComponent} from '../../lib/form-generator/form-generator/form-generator.component';
import {FieldTypeEnum, FormGeneratorElModel, FormGeneratorValidationEnum} from '../../lib/form-generator/form-generator.model';
import {FormGeneratorFieldComponentConfig} from '../../lib/form-generator/form-generator.tokens';
import {
  createField,
  defaultFieldStoryArgs,
  FieldStory,
  FieldStoryArgs,
  formGeneratorFieldDecorators,
  renderWithExternalForm,
  requiredValidation,
  validation
} from './field-story-helpers';
import { create } from 'underscore';

enum DemoFieldTypeEnum {
  ModuleComment = 100
}

@Component({
  selector: 'demo-module-comment-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div [hidden]="!parentIsVisible" style="border: 1px dashed #7f56d9; border-radius: 8px; padding: 12px;">
      <label style="display:block; font-weight:600; margin-bottom:6px;">{{ formEl.Label }} (module field)</label>
      <textarea [formControl]="formControl" rows="4" style="width:100%; padding:8px;"></textarea>
      <small style="display:block; margin-top:6px; color:#6b7280;">Rendered by app-provided field type 100</small>
    </div>
  `
})
class DemoModuleCommentFieldComponent {
  @Input({required: true}) formEl!: FormGeneratorElModel;
  @Input({required: true}) control!: UntypedFormControl | AbstractControl;
  @Input() parentIsVisible: boolean = true;
  @Input() fieldComponentOverrides: FormGeneratorFieldComponentConfig[] = [];

  get formControl(): UntypedFormControl {
    return this.control as UntypedFormControl;
  }
}

@Component({
  selector: 'demo-overridden-string-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div [hidden]="!parentIsVisible" style="border-left: 4px solid #10b981; padding-left: 10px;">
      <label style="display:block; font-weight:600; margin-bottom:6px;">{{ formEl.Label }} (override)</label>
      <input [formControl]="formControl" style="width:100%; padding:8px; text-transform:uppercase;" />
      <small style="display:block; margin-top:6px; color:#6b7280;">Overrides built-in string renderer</small>
    </div>
  `
})
class DemoOverriddenStringFieldComponent {
  @Input({required: true}) formEl!: FormGeneratorElModel;
  @Input({required: true}) control!: UntypedFormControl | AbstractControl;
  @Input() parentIsVisible: boolean = true;
  @Input() fieldComponentOverrides: FormGeneratorFieldComponentConfig[] = [];

  get formControl(): UntypedFormControl {
    return this.control as UntypedFormControl;
  }
}


@Component({
  selector: 'demo-overridden-date-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div [hidden]="!parentIsVisible" style="border-left: 4px solid #10b981; padding-left: 10px;">
      <label style="display:block; font-weight:600; margin-bottom:6px;">{{ formEl.Label }} (override)</label>
      <input type="date" [formControl]="formControl" style="width:100%; padding:8px; text-transform:uppercase;" />
      <small style="display:block; margin-top:6px; color:#6b7280;">Overrides built-in string renderer</small>
    </div>
  `
})
class DemoOverriddenDateFieldComponent {
  @Input({required: true}) formEl!: FormGeneratorElModel;
  @Input({required: true}) control!: UntypedFormControl | AbstractControl;
  @Input() parentIsVisible: boolean = true;
  @Input() fieldComponentOverrides: FormGeneratorFieldComponentConfig[] = [];

  get formControl(): UntypedFormControl {
    return this.control as UntypedFormControl;
  }
}

@Component({
  selector: 'demo-chip-stage-field',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [hidden]="!parentIsVisible" style="display:flex; gap:8px; align-items:center; margin: 8px 0;">
      <span style="font-weight:600;">{{ formEl.Label }}</span>
      <span
        *ngIf="defaultLabel"
        style="display:inline-block; padding:2px 8px; border-radius:12px; color:white;"
        [style.background]="colorMap[defaultColor] || '#6b7280'">
        {{ defaultLabel }}
      </span>
    </div>
  `
})
class DemoChipStageFieldComponent {
  @Input({required: true}) formEl!: FormGeneratorElModel;
  @Input({required: true}) control!: UntypedFormControl | AbstractControl;
  @Input() parentIsVisible: boolean = true;
  @Input() fieldComponentOverrides: FormGeneratorFieldComponentConfig[] = [];

  readonly colorMap: Record<string, string> = {
    Red: '#dc2626',
    Yellow: '#d97706',
    Green: '#16a34a',
    Grey: '#6b7280',
    NoData: '#6b7280'
  };

  get defaultLabel(): string {
    return this.formEl?.FieldSettings?.DefaultValue?.Label || '';
  }

  get defaultColor(): string {
    return this.formEl?.FieldSettings?.DefaultValue?.Color || 'Grey';
  }
}

const meta: Meta<FormGeneratorComponent & FieldStoryArgs> = {
  title: 'Form Generator/Sub Field Component Overrides',
  component: FormGeneratorComponent,
  tags: ['autodocs'],
  decorators: [
    ...formGeneratorFieldDecorators,
    moduleMetadata({
      imports: [DemoModuleCommentFieldComponent, DemoOverriddenStringFieldComponent, DemoChipStageFieldComponent]
    })
  ],
  args: defaultFieldStoryArgs
};

export default meta;

export const AddCustomFieldType: FieldStory = {
  render: renderWithExternalForm,
  args: {
    formGeneratorSettings: [
      createField({
        Name: 'module_comment',
        Label: 'Module Comment',
        FieldType: DemoFieldTypeEnum.ModuleComment,
        FieldValidations: [requiredValidation()],
        FieldSettings: {
          DefaultValue: 'Provided by custom type 100',
          StepSize: 0,
          DataUrl: null,
          IsRepeatable: false,
          IsReadOnly: false
        }
      })
    ],
    fieldComponentOverrides: [
      {type: DemoFieldTypeEnum.ModuleComment, component: DemoModuleCommentFieldComponent}
    ]
  }
};

export const OverrideBuiltInDate: FieldStory = {
  render: renderWithExternalForm,
  args: {
    formGeneratorSettings: [
      createField({
          "Label": "Deviation /CAPA / Complaints Health",
          "Name": "deviation_capa_complaints_health_functional|101",
          "Description": "What's the Deviation, CAPA, and Complaints functional assessment? (Good/Medium/Poor)",
          "FieldType": 1,
          "FieldValidations": [],
          "FieldOptions": [
              {
                  "Label": "Good",
                  "Category": null,
                  "Value": "good"
              },
              {
                  "Label": "Medium",
                  "Category": null,
                  "Value": "medium"
              },
              {
                  "Label": "Poor",
                  "Category": null,
                  "Value": "poor"
              }
          ],
          "FieldSettings": null,
          "Children": null,
          "ConditionGroups": []
      }),
      createField({
          "Label": "What's the summary of Deviation, CAPA, and Complaints impacting technical health?",
          "Name": "deviation_capa_complaints_summary_functional|102",
          "Description": "Summarize any deviations, CAPAs, or complaints or potentially concerning trends that result in lower product health score. These should relate to the technical aspects of the process performance and product health, which may impact the yield or performance of the next batches to be manufactured.",
          "FieldType": 11,
          "FieldValidations": [],
          "FieldOptions": [],
          "FieldSettings": null,
          "Children": null,
          "ConditionGroups": []
      }),
      createField({
          "Label": "Product Risk Log / Other Risks Health",
          "Name": "product_risk_log_other_risks_health_functional|103",
          "Description": "What's the Product Risk Log / Other Risks assessment? (Good/Medium/Poor)",
          "FieldType": 1,
          "FieldValidations": [],
          "FieldOptions": [
              {
                  "Label": "Good",
                  "Category": null,
                  "Value": "good"
              },
              {
                  "Label": "Medium",
                  "Category": null,
                  "Value": "medium"
              },
              {
                  "Label": "Poor",
                  "Category": null,
                  "Value": "poor"
              }
          ],
          "FieldSettings": {
              "DefaultValue": null,
              "StepSize": 0,
              "DataUrl": null,
              "IsRepeatable": false,
              "IsReadOnly": false
          },
          "Children": null,
          "ConditionGroups": []
      }),
      createField({
          "Label": "What's the summary of Product Risk Log / Other Risks impacting technical health?",
          "Name": "product_risk_log_other_risks_summary_functional|104",
          "Description": "Summarize any risks that lower the product health score - TDT/TPT risk log - Manufacturability Readiness Assessment - Raw material / Direct material risks - Asset health - other technical risks identified by the technical team. These should relate to the technical aspects of the process performance and product health, which may impact the yield or performance of the next batches to be manufactured.",
          "FieldType": 11,
          "FieldValidations": [],
          "FieldOptions": [],
          "FieldSettings": {
              "DefaultValue": null,
              "StepSize": 0,
              "DataUrl": null,
              "IsRepeatable": false,
              "IsReadOnly": false
          },
          "Children": null,
          "ConditionGroups": []
      }),
      createField({
          "Label": "Risk from last assessments",
          "Name": "risk_from_last_assessments_group_form_functional|105",
          "Description": "Created in the previous reporting period. Please review them, update their status and remove any that are no longer relevant.",
          "FieldType": 4,
          "FieldValidations": [],
          "FieldOptions": [],
          "FieldSettings": {
              "DefaultValue": [],
              "StepSize": 0,
              "DataUrl": "",
              "IsRepeatable": true,
              "IsReadOnly": true
          },
          "Children": [
              createField({
                  "Label": "Risk",
                  "Name": "risk_functional|106",
                  "FieldType": 11,
                  "FieldValidations": [],
                  "FieldOptions": [],
                  "FieldSettings": null,
                  "Children": [],
                  "ConditionGroups": []
              }),
              createField({
                  "Label": "Next Step / Actions",
                  "Name": "next_step_actions_functional|107",
                  "FieldType": 11,
                  "FieldValidations": [],
                  "FieldOptions": [],
                  "FieldSettings": null,
                  "Children": [],
                  "ConditionGroups": []
              }),
              createField({
                  "Label": "Are the actions already planned by the technical team?",
                  "Name": "actions_planned_by_technical_team_functional|108",
                  "FieldType": 1,
                  "FieldValidations": [],
                  "FieldOptions": [
                      {
                          "Label": "Yes",
                          "Category": null,
                          "Value": "yes"
                      },
                      {
                          "Label": "No",
                          "Category": null,
                          "Value": "no"
                      }
                  ],
                  "FieldSettings": null,
                  "Children": [],
                  "ConditionGroups": []
              }),
              createField({
                  "Label": "Are the actions added to the PTT Technical Roadmap?",
                  "Name": "actions_added_to_ptt_roadmap_functional|109",
                  "FieldType": 1,
                  "FieldValidations": [],
                  "FieldOptions": [
                      {
                          "Label": "Yes",
                          "Category": null,
                          "Value": "yes"
                      },
                      {
                          "Label": "No",
                          "Category": null,
                          "Value": "no"
                      }
                  ],
                  "FieldSettings": null,
                  "Children": [],
                  "ConditionGroups": []
              }),
              createField({
                  "Label": "Are the actions already in progress?",
                  "Name": "actions_already_in_progress_functional|110",
                  "FieldType": 1,
                  "FieldValidations": [],
                  "FieldOptions": [
                      {
                          "Label": "Yes",
                          "Category": null,
                          "Value": "yes"
                      },
                      {
                          "Label": "No",
                          "Category": null,
                          "Value": "no"
                      }
                  ],
                  "FieldSettings": null,
                  "Children": [],
                  "ConditionGroups": []
              }),
              createField({
                  "Label": "Due Date for Risk Closure",
                  "Name": "due_date_for_risk_closure_functional|111",
                  "FieldType": 6,
                  "FieldValidations": [],
                  "FieldOptions": [],
                  "FieldSettings": null,
                  "Children": [],
                  "ConditionGroups": []
              }),
              createField({
                  "Label": "Status of Actions",
                  "Name": "status_of_actions_functional|112",
                  "FieldType": 1,
                  "FieldValidations": [],
                  "FieldOptions": [
                      {
                          "Label": "Open",
                          "Category": null,
                          "Value": "open"
                      },
                      {
                          "Label": "Closed",
                          "Category": null,
                          "Value": "closed"
                      }
                  ],
                  "FieldSettings": null,
                  "Children": [],
                  "ConditionGroups": []
              }),
              createField({
                  "Label": "Actions Closure Date",
                  "Name": "actions_closure_date_functional|113",
                  "FieldType": 6,
                  "FieldValidations": [],
                  "FieldOptions": [],
                  "FieldSettings": {
                      "DefaultValue": null,
                      "StepSize": 0,
                      "DataUrl": "",
                      "IsRepeatable": false,
                      "IsReadOnly": true
                  },
                  "Children": [],
                  "ConditionGroups": []
              })
          ],
          "ConditionGroups": []
      }),
      createField({
          "Label": "No new risks based on this quarterly assessment",
          "Name": "no_new_risks_based_on_this_quarterly_assessment_functional|114",
          "FieldType": 10,
          "FieldValidations": [],
          "FieldOptions": [],
          "FieldSettings": {
              "DefaultValue": false,
              "StepSize": 0,
              "DataUrl": "",
              "IsRepeatable": false,
              "IsReadOnly": false
          },
          "Children": null,
          "ConditionGroups": []
      }),
      createField({
          "Label": "New risk",
          "Name": "new_risk_group_form_functional|115",
          "FieldType": 4,
          "FieldValidations": [],
          "FieldOptions": [],
          "FieldSettings": {
              "DefaultValue": [],
              "StepSize": 0,
              "DataUrl": "",
              "IsRepeatable": true,
              "IsReadOnly": false
          },
          "Children": [
              createField({
                  "Label": "Risk",
                  "Name": "new_risk_functional|116",
                  "FieldType": 11,
                  "FieldValidations": [],
                  "FieldOptions": [],
                  "FieldSettings": null,
                  "Children": [],
                  "ConditionGroups": []
              }),
              createField({
                  "Label": "Next Step / Actions",
                  "Name": "new_next_step_actions_functional|117",
                  "FieldType": 11,
                  "FieldValidations": [],
                  "FieldOptions": [],
                  "FieldSettings": null,
                  "Children": [],
                  "ConditionGroups": []
              }),
              createField({
                  "Label": "Are the actions already planned by the technical team?",
                  "Name": "new_actions_planned_by_technical_team_functional|118",
                  "FieldType": 1,
                  "FieldValidations": [],
                  "FieldOptions": [
                      {
                          "Label": "Yes",
                          "Category": null,
                          "Value": "yes"
                      },
                      {
                          "Label": "No",
                          "Category": null,
                          "Value": "no"
                      }
                  ],
                  "FieldSettings": null,
                  "Children": [],
                  "ConditionGroups": []
              }),
              createField({
                  "Label": "Are the actions added to the PTT Technical Roadmap?",
                  "Name": "new_actions_added_to_ptt_roadmap_functional|119",
                  "FieldType": 1,
                  "FieldValidations": [],
                  "FieldOptions": [
                      {
                          "Label": "Yes",
                          "Category": null,
                          "Value": "yes"
                      },
                      {
                          "Label": "No",
                          "Category": null,
                          "Value": "no"
                      }
                  ],
                  "FieldSettings": null,
                  "Children": [],
                  "ConditionGroups": []
              }),
              createField({
                  "Label": "Are the actions already in progress?",
                  "Name": "new_actions_already_in_progress_functional|120",
                  "FieldType": 1,
                  "FieldValidations": [],
                  "FieldOptions": [
                      {
                          "Label": "Yes",
                          "Category": null,
                          "Value": "yes"
                      },
                      {
                          "Label": "No",
                          "Category": null,
                          "Value": "no"
                      }
                  ],
                  "FieldSettings": null,
                  "Children": [],
                  "ConditionGroups": []
              }),
              createField({
                  "Label": "Due Date for Risk Closure",
                  "Name": "new_due_date_for_risk_closure_functional|121",
                  "FieldType": 6,
                  "FieldValidations": [],
                  "FieldOptions": [],
                  "FieldSettings": null,
                  "Children": [],
                  "ConditionGroups": []
              }),
              createField({
                  "Label": "Status of Actions",
                  "Name": "new_status_of_actions_functional|122",
                  "FieldType": 1,
                  "FieldValidations": [],
                  "FieldOptions": [
                      {
                          "Label": "Open",
                          "Category": null,
                          "Value": "open"
                      },
                      {
                          "Label": "Closed",
                          "Category": null,
                          "Value": "closed"
                      }
                  ],
                  "FieldSettings": null,
                  "Children": [],
                  "ConditionGroups": []
              }),
              createField({
                  "Label": "Actions Closure Date",
                  "Name": "new_actions_closure_date_functional|123",
                  "FieldType": 6,
                  "FieldValidations": [],
                  "FieldOptions": [],
                  "FieldSettings": {
                      "DefaultValue": null,
                      "StepSize": 0,
                      "DataUrl": "",
                      "IsRepeatable": false,
                      "IsReadOnly": false
                  },
                  "Children": [],
                  "ConditionGroups": []
              })
          ],
          "ConditionGroups": []
      })
    ],
    fieldComponentOverrides: [
      {type: FieldTypeEnum.String, component: DemoOverriddenStringFieldComponent},
      {type: FieldTypeEnum.DateTime, component: DemoOverriddenDateFieldComponent}
    ]
  }
};

const tphArrayCustomControlCase: FormGeneratorElModel[] = [
  {
    Label: 'Process Performance Assessment Summary',
    Name: 'process_performance_assessment_summary_e2e|197',
    Description: null,
    FieldType: 7,
    FieldValidations: [],
    FieldOptions: [],
    FieldSettings: null,
    Children: [
      {
        Label: 'E2E Process Performance Health',
        Name: 'process_performance_health_e2e|198',
        Description: 'The lowest health rating across all functional areas',
        FieldType: 101,
        FieldValidations: [],
        FieldOptions: [],
        FieldSettings: {
          DefaultValue: null,
          StepSize: 0,
          DataUrl: null,
          IsRepeatable: false,
          IsReadOnly: false
        },
        Children: [],
        ConditionGroups: []
      },
      {
        Label: null,
        Name: 'process_performance_table_e2e|199',
        Description: null,
        FieldType: 15,
        FieldValidations: [],
        FieldOptions: [],
        FieldSettings: {
          DefaultValue: null,
          StepSize: 0,
          DataUrl: STORYBOOK_MOCK_API + '/tph/assessment/form/options/table?columns[0].Key=Product&columns[0].Name=Functional%20Product%20Name&columns[0].ColumnType=Metadata&columns[0].IsVisible=true&columns[0].OrderIndex=0&columns[1].Key=Area&columns[1].Name=Area&columns[1].ColumnType=Metadata&columns[1].IsVisible=true&columns[1].OrderIndex=1&columns[2].Key=ProcessPerformanceRating&columns[2].Name=Process%20Performance%20Rating&columns[2].ColumnType=Metadata&columns[2].IsVisible=true&columns[2].OrderIndex=2&columns[3].Key=DataCompleteness&columns[3].Name=Data%20Completeness&columns[3].ColumnType=Metadata&columns[3].IsVisible=true&columns[3].OrderIndex=3&columns[4].Key=Context&columns[4].Name=Context&columns[4].ColumnType=Metadata&columns[4].IsVisible=true&columns[4].OrderIndex=4&columns[5].Key=Process%20Performance%20Assessment%20Summary%20Table&columns[5].Name=Process%20Performance%20Assessment%20Summary%20Table&columns[5].ColumnType=Metric&columns[5].IsVisible=false&columns[5].OrderIndex=5&filters[0].Name=DataStartTime&filters[0].Operator=gte&filters[0].Value=2025-10-01T00%3A00%3A00.000Z&filters[1].Name=DataEndTime&filters[1].Operator=lte&filters[1].Value=2026-09-30T23%3A59%3A59.999Z',
          IsRepeatable: false,
          IsReadOnly: true
        },
        Children: [],
        ConditionGroups: []
      }
    ],
    ConditionGroups: []
  },
  {
    Label: 'Detailed KPI Variability',
    Name: 'process_performance_detailed_kpi_variability_array_e2e|200',
    Description: null,
    FieldType: 4,
    FieldValidations: [],
    FieldOptions: [],
    FieldSettings: {
      DefaultValue: [
        {
          FormArrayElementId: -1890218362,
          'kpi_variability_internal_external_health_e2e|205': {
            Label: 'Good',
            Color: 'Green',
            Value: 'NaN'
          },
          'kpi_variability_internal_health_e2e|206': {
            Label: 'NoData',
            Color: 'NoData',
            Value: 'NaN'
          },
          'kpi_variability_table_e2e|207': {
            Columns: [
              {Key: 'Area', Name: 'Area', DataType: 'string', IsVisible: true, OrderIndex: 0, ColumnType: 'Metadata'},
              {Key: 'PMPName', Name: 'PMP Name', DataType: 'string', IsVisible: true, OrderIndex: 1, ColumnType: 'Metadata'},
              {Key: 'Site', Name: 'Manufacturing Site', DataType: 'string', IsVisible: true, OrderIndex: 2, ColumnType: 'Metadata'},
              {Key: 'AttributeScope', Name: 'Attribute Scope', DataType: 'string', IsVisible: true, OrderIndex: 3, ColumnType: 'Metadata'},
              {Key: 'AttributeName', Name: 'Attribute Name', DataType: 'string', IsVisible: true, OrderIndex: 4, ColumnType: 'Metadata'},
              {Key: 'RSD', Name: 'RSD', DataType: 'string', IsVisible: true, OrderIndex: 5, ColumnType: 'Metric'}
            ],
            Rows: [
              [
                {Value: 'Manufacturing', Color: null},
                {Value: 'PMP-001', Color: null},
                {Value: 'Site A', Color: null},
                {Value: 'Process', Color: null},
                {Value: 'Temperature', Color: null},
                {Value: '5.2%', Color: null}
              ],
              [
                {Value: 'Quality', Color: null},
                {Value: 'PMP-002', Color: null},
                {Value: 'Site B', Color: null},
                {Value: 'Product', Color: null},
                {Value: 'Purity', Color: null},
                {Value: '8.7%', Color: null}
              ],
              [
                {Value: 'Operations', Color: null},
                {Value: 'PMP-003', Color: null},
                {Value: 'Site A', Color: null},
                {Value: 'Process', Color: null},
                {Value: 'Yield', Color: null},
                {Value: '3.1%', Color: null}
              ]
            ]
          },
          'kpi_variability_assessment_context_e2e|208': 'something',
          'kpi_variability_external_sites_health_e2e|210': 'good',
          'kpi_variability_external_sites_assessment_context_e2e|211': 'mmmmmmmm'
        }
      ],
      StepSize: 0,
      DataUrl: null,
      IsRepeatable: true,
      IsReadOnly: false
    },
    Children: [
      {
        Label: 'Combined (Internal and External Sites) Health',
        Name: 'kpi_variability_internal_external_health_e2e|205',
        Description: 'Lowest health rating across internal and external sites',
        FieldType: 101,
        FieldValidations: [],
        FieldOptions: [],
        FieldSettings: {
          DefaultValue: null,
          StepSize: 0,
          DataUrl: STORYBOOK_MOCK_API + '/tph/assessment/form/result/aggregated?metricName=kpi_variability_internal_external_health_functional&columns[0].Key=RSD&columns[0].Name=RSD&columns[0].ColumnType=Metric&columns[0].OrderIndex=0&columns[1].Key=AssessmentResponse&columns[1].Name=${kpi_variability_external_sites_health_e2e|210}&columns[1].ColumnType=Answer&columns[1].OrderIndex=1&filters[0].Name=DataStartTime&filters[0].Operator=gte&filters[0].Value=2025-10-01T00%3A00%3A00.000Z&filters[1].Name=DataEndTime&filters[1].Operator=lte&filters[1].Value=2026-09-30T23%3A59%3A59.999Z&filters[2].Name=Product&filters[2].Operator=eq&filters[2].Value=Tecentriq',
          IsRepeatable: false,
          IsReadOnly: true
        },
        Children: [],
        ConditionGroups: []
      },
      {
        Label: 'Internal Sites Health',
        Name: 'kpi_variability_internal_health_e2e|206',
        Description: 'If RSD > 8% : Poor, if 5% < RSD <= 8% : Medium, else Good',
        FieldType: 101,
        FieldValidations: [],
        FieldOptions: [],
        FieldSettings: {
          DefaultValue: {
            Label: 'Poor',
            Color: 'Red',
            Value: 11.41
          },
          StepSize: 0,
          DataUrl: null,
          IsRepeatable: false,
          IsReadOnly: true
        },
        Children: [],
        ConditionGroups: []
      },
      {
        Label: null,
        Name: 'kpi_variability_table_e2e|207',
        Description: null,
        FieldType: 15,
        FieldValidations: [],
        FieldOptions: [],
        FieldSettings: {
          DefaultValue: null,
          StepSize: 0,
          DataUrl: STORYBOOK_MOCK_API + '/tph/assessment/form/options/table?columns[0].Key=Area&columns[0].Name=Area&columns[0].ColumnType=Metadata&columns[0].OrderIndex=0&columns[1].Key=PMPName&columns[1].Name=PMP%20Name&columns[1].ColumnType=Metadata&columns[1].OrderIndex=1&columns[2].Key=Site&columns[2].Name=Manufacturing%20Site&columns[2].ColumnType=Metadata&columns[2].OrderIndex=2&columns[3].Key=AttributeScope&columns[3].Name=Attribute%20Scope&columns[3].ColumnType=Metadata&columns[3].OrderIndex=3&columns[4].Key=AttributeName&columns[4].Name=Attribute%20Name&columns[4].ColumnType=Metadata&columns[4].OrderIndex=4&columns[5].Key=RSD&columns[5].Name=RSD&columns[5].ColumnType=Metric&columns[5].OrderIndex=5&filters[0].Name=DataStartTime&filters[0].Operator=gte&filters[0].Value=2025-10-01T00%3A00%3A00.000Z&filters[1].Name=DataEndTime&filters[1].Operator=lte&filters[1].Value=2026-09-30T23%3A59%3A59.999Z&filters[2].Name=Product&filters[2].Operator=eq&filters[2].Value=Tecentriq&languageKey=en',
          IsRepeatable: false,
          IsReadOnly: true
        },
        Children: [],
        ConditionGroups: []
      },
      {
        Label: 'Provide assessment context for the yield variance score. (Note for Biologics DS: Please also include assessment context for the titer variance score)',
        Name: 'kpi_variability_assessment_context_e2e|208',
        Description: 'Text input from Product Steward (required for anything Medium or Poor, else insert N/A)',
        FieldType: 11,
        FieldValidations: [],
        FieldOptions: [],
        FieldSettings: null,
        Children: [],
        ConditionGroups: []
      },
      {
        Label: 'If there are external manufacturing sites with data not in DCP: Provide Product Steward assessment of KPI variability for external sites:',
        Name: 'kpi_variability_external_sites_health_e2e|210',
        Description: null,
        FieldType: 1,
        FieldValidations: [],
        FieldOptions: [
          {Label: 'Good', Category: null, Value: 'good'},
          {Label: 'Medium', Category: null, Value: 'medium'},
          {Label: 'Poor', Category: null, Value: 'poor'},
          {Label: 'N.A', Category: null, Value: 'n_a'},
          {Label: 'No Data Available', Category: null, Value: 'no_data_available'}
        ],
        FieldSettings: null,
        Children: [],
        ConditionGroups: []
      },
      {
        Label: 'If there are external manufacturing sites with data not in DCP, provide Product Steward assessment context of KPI variability Health for external:',
        Name: 'kpi_variability_external_sites_assessment_context_e2e|211',
        Description: 'Text input from Product Steward (required for anything Medium or Poor, else insert N/A)',
        FieldType: 11,
        FieldValidations: [],
        FieldOptions: [],
        FieldSettings: null,
        Children: [],
        ConditionGroups: []
      }
    ],
    ConditionGroups: []
  }
];

export const CustomField101InsideArrayUsesRowDefaultValue: FieldStory = {
  render: renderWithExternalForm,
  args: {
    formGeneratorSettings: tphArrayCustomControlCase,
    fieldComponentOverrides: [
      {type: 101, component: DemoChipStageFieldComponent}
    ]
  }
};
