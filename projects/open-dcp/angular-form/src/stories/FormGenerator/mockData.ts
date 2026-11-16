import { STORYBOOK_MOCK_API } from '../mocks/storybook-mock-api.data';
import {
  ActionType,
  ConditionOperator,
  FieldTypeEnum,
  FormGeneratorElModel,
  FormGeneratorValidationEnum,
  LogicalOperator
} from "../../lib/form-generator/form-generator.model";

const basicConfiguration: FormGeneratorElModel[] = [
  {
    Label: 'Platform',
    Name: 'platform_1',
    FieldType: FieldTypeEnum.MultiSelectDropdown,
    FieldValidations: [
      {
        Value: '',
        Type: FormGeneratorValidationEnum.Required,
      },
    ],
    FieldOptions: [
      {
        Label: 'Biologics',
        Category: null,
        Value: 'biologics',
      },
      {
        Label: 'Small Molecules',
        Category: null,
        Value: 'small_molecules',
      },
    ],
    FieldSettings: null,
    Children: [],
  },
  {
    Label: 'DS/DP/Device',
    Name: 'dc/dp/device_2',
    FieldType: 1,
    FieldValidations: [
      {
        Value: '',
        Type: FormGeneratorValidationEnum.Required,
      },
    ],
    FieldOptions: [
      {
        Label: 'DC',
        Category: null,
        Value: 'dc',
      },
      {
        Label: 'DP',
        Category: null,
        Value: 'dp',
      },
      {
        Label: 'Device',
        Category: null,
        Value: 'device',
      },
    ],
    FieldSettings: null,
    Children: [],
  },
  {
    Label: 'Product',
    Name: 'product_3',
    FieldType: 1,
    FieldValidations: [
      {
        Value: '',
        Type: FormGeneratorValidationEnum.Required,
      },
    ],
    FieldOptions: [
      {
        Label: 'Product 1',
        Category: null,
        Value: 'product1',
      },
      {
        Label: 'Product 2',
        Category: null,
        Value: 'product2',
      },],
    FieldSettings: {
      DefaultValue: null,
      StepSize: 0,
    },
    Children: [],
  },
  {
    Label: 'Assessment Start Date',
    Name: 'assessment_start_date_4',
    FieldType: 6,
    FieldValidations: [
      {
        Value: '',
        Type: FormGeneratorValidationEnum.Required,
      },
    ],
    FieldOptions: [],
    FieldSettings: {
      "DefaultValue": "2025-09-10T09:50:00.000Z",
      "StepSize": 0,
      "DataUrl": null,
      "IsRepeatable": false,
      "IsReadOnly": false
    },
    Children: [],
  },
  {
    Label: 'Assessment Period',
    Name: 'assessment_period_5',
    FieldType: 1,
    FieldValidations: [
      {
        Value: '',
        Type: FormGeneratorValidationEnum.Required,
      },
    ],
    FieldOptions: [
      {
        Label: 'Period 1',
        Category: null,
        Value: 'period1',
      },
      {
        Label: 'Period 2',
        Category: null,
        Value: 'period2',
      },],
    FieldSettings: {
      DefaultValue: null,
      StepSize: 0,
    },
    Children: [],
  },
  {
    Label: 'TPH Assessor',
    Name: 'tph_assessor_6',
    FieldType: 1,
    FieldValidations: [
      {
        Value: '',
        Type: FormGeneratorValidationEnum.Required,
      },
    ],
    FieldOptions: [
      {
        Label: 'Assessor 1',
        Category: null,
        Value: 'Assessor1',
      },
      {
        Label: 'Assessor 2',
        Category: null,
        Value: 'Assessor2',
      },],
    FieldSettings: null,
    Children: [],
  },
  {
    Label: 'Overall Technical Product Health',
    Name: 'overall_technical_product_health_7',
    FieldType: 1,
    FieldValidations: [
      {
        Value: '',
        Type: FormGeneratorValidationEnum.Required,
      },
    ],
    FieldOptions: [
      {
        Label: 'Red',
        Category: null,
        Value: 'red',
      },
      {
        Label: 'Green',
        Category: null,
        Value: 'green',
      },
      {
        Label: 'Blue',
        Category: null,
        Value: 'blue',
      },
    ],
    FieldSettings: null,
    Children: [],
  },
    {
      Label: "Parent",
      Name: 'key_action_group_form_29',
      FieldType: 4,
      FieldValidations: [
        {
          Value: '1',
          Type: FormGeneratorValidationEnum.Min,
        },
        {
          Value: '10',
          Type: FormGeneratorValidationEnum.Max,
        },
      ],
      FieldOptions: [],
      FieldSettings: {
        DefaultValue: null,
        StepSize: 0,
        DataUrl: '',
        IsRepeatable: true,
        IsReadOnly: false,
      },
      Children: [
        {
          Label: 'Key Action',
          Name: 'key_action_8',
          FieldType: 3,
          FieldValidations: [
            {
              Value: '',
              Type: FormGeneratorValidationEnum.Required,
            },
            {
              Value: '1000',
              Type: FormGeneratorValidationEnum.StringLength,
            },
          ],
          FieldOptions: [],
          FieldSettings: null,
          Children: [],
          ConditionGroups: [],
        },
        {
          Label: 'Owner',
          Name: 'owner_9',
          FieldType: 3,
          FieldValidations: [
            {
              Value: '',
              Type: FormGeneratorValidationEnum.Required,
            },
          ],
          FieldOptions: [],
          FieldSettings: null,
          Children: [],
          ConditionGroups: [],
        },
        {
          Label: 'Due Date',
          Name: 'due_date_10',
          FieldType: 3,
          FieldValidations: [
            {
              Value: '',
              Type: FormGeneratorValidationEnum.Required,
            },
          ],
          FieldOptions: [],
          FieldSettings: null,
          Children: [],
          ConditionGroups: [],
        },
        {
          Label: 'Status',
          Name: 'status_11',
          FieldType: 1,
          FieldValidations: [
            {
              Value: '',
              Type: FormGeneratorValidationEnum.Required,
            },
          ],
          FieldOptions: [
            {
              Label: 'Open',
              Category: null,
              Value: 'open',
            },
            {
              Label: 'Close',
              Category: null,
              Value: 'close',
            },
          ],
          FieldSettings: null,
          Children: [],
          ConditionGroups: [],
        },
        {
          Label: 'Closure date',
          Name: 'closure_date_12',
          FieldType: 3,
          FieldValidations: [],
          FieldOptions: [],
          FieldSettings: {
            DefaultValue: null,
            StepSize: 0,
            DataUrl: '',
            IsRepeatable: false,
            IsReadOnly: true,
          },
          Children: [],
          ConditionGroups: [],
        },
      ],
      ConditionGroups: [],
    }
];

const formWithHint = [
  {
    "Label": "Assessment Start Date",
    "Name": "assessment_start_date_4",
    "Description": null,
    "FieldType": 6,
    "FieldValidations": [
      {
        "Value": "",
        "Type": FormGeneratorValidationEnum.Required,
      }
    ],
    "FieldOptions": [],
    "FieldSettings": {
      "DefaultValue": "2025-08-19T06:41:44.547Z",
      "StepSize": 0,
      "DataUrl": "",
      "IsRepeatable": false,
      "IsReadOnly": true
    },
    "Children": null,
    "ConditionGroups": []
  },
  {
    "Label": "TPH Assessor",
    "Name": "tph_assessor_6",
    "Description": "Please select your Roche or Genentech email address.",
    "FieldType": 3,
    "FieldValidations": [
      {
        "Value": "",
        "Type": FormGeneratorValidationEnum.Required,
      }
    ],
    "FieldOptions": [],
    "FieldSettings": {
      "DefaultValue": "Demo Assessor demo.assessor@example.com",
      "StepSize": 0,
      "DataUrl": "",
      "IsRepeatable": false,
      "IsReadOnly": true
    },
    "Children": null,
    "ConditionGroups": []
  },
  {
    "Label": "Platform",
    "Name": "platform_1",
    "Description": null,
    "FieldType": 1,
    "FieldValidations": [
      {
        "Value": "",
        "Type": FormGeneratorValidationEnum.Required,
      }
    ],
    "FieldOptions": [
      {
        "Label": "Biologics",
        "Category": null,
        "Value": "biologics"
      },
      {
        "Label": "Small Molecules",
        "Category": null,
        "Value": "small_molecules"
      }
    ],
    "FieldSettings": null,
    "Children": null,
    "ConditionGroups": []
  },
  {
    "Label": "DS/DP/Device",
    "Name": "ds/dp/device_2",
    "Description": null,
    "FieldType": 1,
    "FieldValidations": [
      {
        "Value": "",
        "Type": FormGeneratorValidationEnum.Required,
      }
    ],
    "FieldOptions": [
      {
        "Label": "DS",
        "Category": null,
        "Value": "ds"
      },
      {
        "Label": "DP",
        "Category": null,
        "Value": "dp"
      },
      {
        "Label": "Device",
        "Category": null,
        "Value": "device"
      }
    ],
    "FieldSettings": null,
    "Children": null,
    "ConditionGroups": []
  },
  {
    "Label": "Product",
    "Name": "product_3",
    "Description": null,
    "FieldType": 1,
    "FieldValidations": [
      {
        "Value": "",
        "Type": FormGeneratorValidationEnum.Required,
      }
    ],
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
  },
  {
    "Label": "Assessment Period",
    "Name": "assessment_period_5",
    "Description": "Assessments are retrospective. Please select the Quarter to which your assessment applies.",
    "FieldType": 1,
    "FieldValidations": [
      {
        "Value": "",
        "Type": FormGeneratorValidationEnum.Required,
      }
    ],
    "FieldOptions": [],
    "FieldSettings": {
      "DefaultValue": "2025 Q3",
      "StepSize": 0,
      "DataUrl": "",
      "IsRepeatable": false,
      "IsReadOnly": false
    },
    "Children": null,
    "ConditionGroups": []
  },
  {
    "Label": "Overall Technical Product Health",
    "Name": "overall_technical_product_health_7",
    "Description": "The assessment is independent of the platform and must be completed irrespective of whether manufacturing is ongoing or not.",
    "FieldType": 1,
    "FieldValidations": [
      {
        "Value": "",
        "Type": FormGeneratorValidationEnum.Required,
      }
    ],
    "FieldOptions": [
      {
        "Label": "Red",
        "Category": null,
        "Value": "red"
      },
      {
        "Label": "Green",
        "Category": null,
        "Value": "green"
      },
      {
        "Label": "Yellow",
        "Category": null,
        "Value": "yellow"
      }
    ],
    "FieldSettings": null,
    "Children": null,
    "ConditionGroups": []
  },
  {
    "Label": "Has the Overall Technical Product Health changed compared to previous period?",
    "Name": "overall_technical_product_health_change_31",
    "Description": null,
    "FieldType": 1,
    "FieldValidations": [
      {
        "Value": "",
        "Type": FormGeneratorValidationEnum.Required,
      }
    ],
    "FieldOptions": [
      {
        "Label": "Positive Change",
        "Category": null,
        "Value": "positive_change"
      },
      {
        "Label": "Negative Change",
        "Category": null,
        "Value": "negative_change"
      },
      {
        "Label": "No Change",
        "Category": null,
        "Value": "no_change"
      }
    ],
    "FieldSettings": null,
    "Children": null,
    "ConditionGroups": []
  },
  {
    "Label": "Rationale",
    "Name": "rationale_32",
    "Description": "Please provide a descriptive rationale for the color-coded ranking of technical product health. Why did you rate the overall technical product health as you did? What are the potential consequences of the rating?",
    "FieldType": 11,
    "FieldValidations": [
      {
        "Value": "",
        "Type": FormGeneratorValidationEnum.Required,
      },
      {
        "Value": "1000",
        "Type": FormGeneratorValidationEnum.StringLength
      }
    ],
    "FieldOptions": [],
    "FieldSettings": null,
    "Children": null,
    "ConditionGroups": []
  }
];

const formWithConditions = [
  {
    "Label": "Active Manufacturing",
    "Name": "active_manufacturing_17",
    "Description": "This part of the assessment is only relevant for products that have been actively manufactured during the assessment period. If your product does not fall into this category, answer 'No' and you're done! If you answer 'Yes', please continue with the form. If your product has been manufactured at several manufacturing sites in parallel during the assessment period, an assessment should be made for each form. Similarly, if different general forms have been manufactured during the assessment period, an assessment should be made for each form.",
    "FieldType": 10,
    "FieldValidations": [
      {
        "Value": '',
        "Type": FormGeneratorValidationEnum.Required,
      }
    ],
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
    "FieldSettings": {
      DefaultValue: true
    },
    "Children": null,
    "ConditionGroups": []
  },
  {
    "Label": "Number of Batches",
    "Name": "number_of_batches_23",
    "Description": null,
    "FieldType": 2,
    "FieldValidations": [
      {
        "Value": "",
        "Type": FormGeneratorValidationEnum.Required,
      }
    ],
    "FieldOptions": [],
    "FieldSettings": null,
    "Children": [],
    "ConditionGroups": [
      {
        "Operator": LogicalOperator.and,
        "Conditions": [
          {
            "DependentOn": "active_manufacturing_17",
            "Operator": ConditionOperator.equal,
            "Values": [
              true
            ]
          }
        ],
        "Action": ActionType.Show,
        "LoadUrl": null,
        "LoadOnce": true
      }
    ]
  },
  {
    "Label": "Site",
    "Name": "manufacturing_site_group_form_30",
    "Description": null,
    "FieldType": 4,
    "FieldValidations": [],
    "FieldOptions": [],
    "FieldSettings": {
      "DefaultValue": null,
      "StepSize": 0,
      "DataUrl": "",
      "IsRepeatable": true,
      "IsReadOnly": false
    },
    "Children": [
      {
        "Label": "Manufacturing Site",
        "Name": "manufacturing_site_19",
        "Description": null,
        "FieldType": 1,
        "FieldValidations": [
          {
            "Value": "",
            "Type": FormGeneratorValidationEnum.Required,
          }
        ],
        "FieldOptions": [
            {
              "Label": "Green",
              "Category": null,
              "Value": "green"
            },
            {
              "Label": "Red",
              "Category": null,
              "Value": "red"
            }
          ],
        "FieldSettings": {
          "DefaultValue": null,
          "StepSize": 0,
          "DataUrl": "",
          "IsRepeatable": false,
          "IsReadOnly": false
        },
        "Children": [],
        "ConditionGroups": []
      },
      {
        "Label": "Process Performance",
        "Name": "process_performance_20",
        "Description": null,
        "FieldType": 11,
        "FieldValidations": [
          {
            "Value": "1000",
            "Type": FormGeneratorValidationEnum.StringLength
          },
          {
            "Value": "",
            "Type": FormGeneratorValidationEnum.Required,
          }
        ],
        "FieldOptions": [],
        "FieldSettings": null,
        "Children": [],
        "ConditionGroups": []
      },
      {
        "Label": "Process Performance Rating",
        "Name": "process_performance_rating_21",
        "Description": null,
        "FieldType": FieldTypeEnum.MultiSelectDropdown,
        "FieldValidations": [
          {
            "Value": "",
            "Type": FormGeneratorValidationEnum.Required,
          }
        ],
        "FieldOptions": [
          {
            "Label": "Green",
            "Category": null,
            "Value": "green"
          },
          {
            "Label": "Red",
            "Category": null,
            "Value": "red"
          },
          {
            "Label": "Yellow",
            "Category": null,
            "Value": "yellow"
          }
        ],
        "FieldSettings": null,
        "Children": [],
        "ConditionGroups": []
      },
      {
        "Label": "Number of Batches",
        "Name": "number_of_batches_23",
        "Description": null,
        "FieldType": 2,
        "FieldValidations": [
          {
            "Value": "",
            "Type": FormGeneratorValidationEnum.Required,
          }
        ],
        "FieldOptions": [],
        "FieldSettings": null,
        "Children": [],
        "ConditionGroups": [
          {
            "Operator": LogicalOperator.and,
            "Conditions": [
              {
                "DependentOn": "process_performance_rating_21",
                "Operator": ConditionOperator.equal,
                "Values": [
                  "green", "yellow"
                ]
              },
              {
                "DependentOn": "ds/dp/device_2",
                "Operator": ConditionOperator.equal,
                "Values": [
                  "ds"
                ]
              }
            ],
            "Action": ActionType.Show,
            "LoadUrl": null,
            "LoadOnce": true
          }
        ]
      },
      {
        "Label": "Pre-Harvest Titer (RSD%)",
        "Name": "pre_harvest_titer_rsd_24",
        "Description": null,
        "FieldType": 3,
        "FieldValidations": [
          {
            "Value": "",
            "Type": FormGeneratorValidationEnum.Required,
          }
        ],
        "FieldOptions": [],
        "FieldSettings": null,
        "Children": [],
        "ConditionGroups": [
          {
            "Operator": LogicalOperator.and,
            "Conditions": [
              {
                "DependentOn": "platform_1",
                "Operator": ConditionOperator.equal,
                "Values": [
                  "biologics"
                ]
              },
              {
                "DependentOn": "ds/dp/device_2",
                "Operator": ConditionOperator.equal,
                "Values": [
                  "ds"
                ]
              }
            ],
            "Action": ActionType.Show,
            "LoadUrl": null,
            "LoadOnce": true
          }
        ]
      },
      {
        "Label": "API Yield (Actual - Target)",
        "Name": "api_yield_actual_target_25",
        "Description": null,
        "FieldType": 3,
        "FieldValidations": [
          {
            "Value": "",
            "Type": FormGeneratorValidationEnum.Required,
          }
        ],
        "FieldOptions": [],
        "FieldSettings": null,
        "Children": [],
        "ConditionGroups": [
          {
            "Operator": LogicalOperator.and,
            "Conditions": [
              {
                "DependentOn": "platform_1",
                "Operator": ConditionOperator.equal,
                "Values": [
                  "biologics"
                ]
              },
              {
                "DependentOn": "ds/dp/device_2",
                "Operator": ConditionOperator.equal,
                "Values": [
                  "ds"
                ]
              }
            ],
            "Action": ActionType.Show,
            "LoadUrl": null,
            "LoadOnce": true
          }
        ]
      },
      {
        "Label": "API Yield Actuals (RSD)",
        "Name": "api_yield_actual_rsd_26",
        "Description": null,
        "FieldType": 3,
        "FieldValidations": [
          {
            "Value": "",
            "Type": FormGeneratorValidationEnum.Required,
          }
        ],
        "FieldOptions": [],
        "FieldSettings": null,
        "Children": [],
        "ConditionGroups": [
          {
            "Operator": LogicalOperator.and,
            "Conditions": [
              {
                "DependentOn": "platform_1",
                "Operator": ConditionOperator.equal,
                "Values": [
                  "biologics"
                ]
              },
              {
                "DependentOn": "ds/dp/device_2",
                "Operator": ConditionOperator.equal,
                "Values": [
                  "ds"
                ]
              }
            ],
            "Action": ActionType.Show,
            "LoadUrl": null,
            "LoadOnce": true
          }
        ]
      },
      {
        "Label": "Investigative UPEs",
        "Name": "investigative_upes_27",
        "Description": null,
        "FieldType": 11,
        "FieldValidations": [
          {
            "Value": "",
            "Type": FormGeneratorValidationEnum.Required,
          },
          {
            "Value": "1000",
            "Type": FormGeneratorValidationEnum.StringLength
          }
        ],
        "FieldOptions": [],
        "FieldSettings": null,
        "Children": [],
        "ConditionGroups": [
          {
            "Operator": LogicalOperator.and,
            "Conditions": [
              {
                "DependentOn": "active_manufacturing_17",
                "Operator": ConditionOperator.equal,
                "Values": [
                  true
                ]
              }
            ],
            "Action": ActionType.Show,
            "LoadUrl": null,
            "LoadOnce": true
          }
        ]
      },
      {
        "Label": "Raw Materials",
        "Name": "raw_materials_28",
        "Description": null,
        "FieldType": 11,
        "FieldValidations": [
          {
            "Value": "",
            "Type": FormGeneratorValidationEnum.Required,
          },
          {
            "Value": "1000",
            "Type": FormGeneratorValidationEnum.StringLength
          }
        ],
        "FieldOptions": [],
        "FieldSettings": null,
        "Children": [],
        "ConditionGroups": [
          {
            "Operator": LogicalOperator.or,
            "Conditions": [
              {
                "DependentOn": "platform_1",
                "Operator": ConditionOperator.equal,
                "Values": [
                  "biologics"
                ]
              },
              {
                "DependentOn": "ds/dp/device_2",
                "Operator": ConditionOperator.equal,
                "Values": [
                  "ds"
                ]
              }
            ],
            "Action": ActionType.Show,
            "LoadUrl": null,
            "LoadOnce": true
          }
        ]
      }
    ],
    "ConditionGroups": [
      {
        "Operator": LogicalOperator.and,
        "Conditions": [
          {
            "DependentOn": "active_manufacturing_17",
            "Operator": ConditionOperator.equal,
            "Values": [
              true
            ]
          }
        ],
        "Action": ActionType.Show,
        "LoadUrl": null,
        "LoadOnce": true
      }
    ]
  }
];

const formArrayWithChildren = [
    {
        "Label": "Key Action",
        "Name": "key_action_group_form_29",
        "Description": null,
        "FieldType": 4,
        "FieldValidations": [
            {
                "Value": "1",
                "Type": FormGeneratorValidationEnum.Min
            },
            {
                "Value": "10",
                "Type": FormGeneratorValidationEnum.Max
            }
        ],
        "FieldOptions": [],
        "FieldSettings": {
            "DefaultValue": null,
            "StepSize": 0,
            "DataUrl": "",
            "IsRepeatable": true,
            "IsReadOnly": false
        },
        "Children": [
            {
                "Label": "Key Action",
                "Name": "key_action_8",
                "Description": null,
                "FieldType": 11,
                "FieldValidations": [
                    {
                        "Value": "",
                        "Type": FormGeneratorValidationEnum.Required
                    },
                    {
                        "Value": "1000",
                        "Type": FormGeneratorValidationEnum.StringLength
                    }
                ],
                "FieldOptions": [],
                "FieldSettings": null,
                "Children": [],
                "ConditionGroups": []
            },
            {
                "Label": "Owner",
                "Name": "owner_9",
                "Description": null,
                "FieldType": 3,
                "FieldValidations": [
                    {
                        "Value": "",
                        "Type": FormGeneratorValidationEnum.Required
                    }
                ],
                "FieldOptions": [],
                "FieldSettings": null,
                "Children": [],
                "ConditionGroups": []
            },
            {
                "Label": "Due Date",
                "Name": "due_date_10",
                "Description": null,
                "FieldType": 6,
                "FieldValidations": [
                    {
                        "Value": "",
                        "Type": FormGeneratorValidationEnum.Required
                    }
                ],
                "FieldOptions": [],
                "FieldSettings": null,
                "Children": [],
                "ConditionGroups": []
            },
            {
                "Label": "Status",
                "Name": "status_11",
                "Description": null,
                "FieldType": 1,
                "FieldValidations": [
                    {
                        "Value": "",
                        "Type": FormGeneratorValidationEnum.Required
                    }
                ],
                "FieldOptions": [
                    {
                        "Label": "Open",
                        "Category": null,
                        "Value": "open"
                    },
                    {
                        "Label": "Close",
                        "Category": null,
                        "Value": "close"
                    }
                ],
                "FieldSettings": null,
                "Children": [],
                "ConditionGroups": []
            },
            {
                "Label": "Closure date",
                "Name": "closure_date_12",
                "Description": null,
                "FieldType": 3,
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
            }
        ],
        "ConditionGroups": []
    }
];

const formMaxLimitReached: FormGeneratorElModel[] = [
    {
        "Label": "TPH Assessor",
        "Name": "tph_assessor_6",
        "Description": null,
        "FieldType": 3,
        "FieldValidations": [
            {
                "Value": "",
                "Type": FormGeneratorValidationEnum.Required
            }
        ],
        "FieldOptions": [],
        "FieldSettings": {
            "DefaultValue": "Demo Assessor demo.assessor@example.com",
            "StepSize": 0,
            "DataUrl": "",
            "IsRepeatable": false,
            "IsReadOnly": true
        },
        "Children": null,
        "ConditionGroups": []
    },
    {
        "Label": "Platform",
        "Name": "platform_1",
        "Description": null,
        "FieldType": 1,
        "FieldValidations": [
            {
                "Value": "",
                "Type": FormGeneratorValidationEnum.Required
            }
        ],
        "FieldOptions": [
            {
                "Label": "Biologics",
                "Category": null,
                "Value": "biologics"
            },
            {
                "Label": "Small Molecules",
                "Category": null,
                "Value": "small_molecules"
            }
        ],
        "FieldSettings": null,
        "Children": null,
        "ConditionGroups": []
    },
    {
        "Label": "DS/DP/Device",
        "Name": "ds/dp/device_2",
        "Description": null,
        "FieldType": 1,
        "FieldValidations": [
            {
                "Value": "",
                "Type": FormGeneratorValidationEnum.Required
            }
        ],
        "FieldOptions": [
            {
                "Label": "DS",
                "Category": null,
                "Value": "ds"
            },
            {
                "Label": "DP",
                "Category": null,
                "Value": "dp"
            },
            {
                "Label": "Device",
                "Category": null,
                "Value": "device"
            }
        ],
        "FieldSettings": null,
        "Children": null,
        "ConditionGroups": []
    },
    {
        "Label": "Product",
        "Name": "product_3",
        "Description": null,
        "FieldType": 1,
        "FieldValidations": [
            {
                "Value": "",
                "Type": FormGeneratorValidationEnum.Required
            }
        ],
        "FieldOptions": [],
        "FieldSettings": {
            "DefaultValue": null,
            "StepSize": 0,
            "DataUrl": STORYBOOK_MOCK_API + "/tph/assessment/form/options/rdbms?tableName=Products&labelPropertyName=Name&valuePropertyName=Id",
            "IsRepeatable": false,
            "IsReadOnly": false
        },
        "Children": null,
        "ConditionGroups": []
    },
    {
        "Label": "Assessment Period",
        "Name": "assessment_period_5",
        "Description": "Assessments are retrospective. Please select the Quarter to which your assessment applies.",
        "FieldType": 1,
        "FieldValidations": [
            {
                "Value": "",
                "Type": FormGeneratorValidationEnum.Required
            }
        ],
        "FieldOptions": [],
        "FieldSettings": {
            "DefaultValue": "2025/Q3",
            "StepSize": 0,
            "DataUrl": STORYBOOK_MOCK_API + "/tph/assessment/form/options/time?startTime=2020-01-01Z&endTime=*&interval=3mo&format=yyyy/Q",
            "IsRepeatable": false,
            "IsReadOnly": false
        },
        "Children": null,
        "ConditionGroups": []
    },
    {
        "Label": "Overall Technical Product Health",
        "Name": "overall_technical_product_health_7",
        "Description": "The assessment is independent of the platform and must be completed irrespective of whether manufacturing is ongoing or not.",
        "FieldType": 1,
        "FieldValidations": [
            {
                "Value": "",
                "Type": FormGeneratorValidationEnum.Required
            }
        ],
        "FieldOptions": [
            {
                "Label": "Red",
                "Category": null,
                "Value": "red"
            },
            {
                "Label": "Green",
                "Category": null,
                "Value": "green"
            },
            {
                "Label": "Yellow",
                "Category": null,
                "Value": "yellow"
            }
        ],
        "FieldSettings": null,
        "Children": null,
        "ConditionGroups": []
    },
    {
        "Label": "Has the Overall Technical Product Health changed compared to previous period?",
        "Name": "overall_technical_product_health_change_31",
        "Description": null,
        "FieldType": 1,
        "FieldValidations": [
            {
                "Value": "",
                "Type": FormGeneratorValidationEnum.Required
            }
        ],
        "FieldOptions": [
            {
                "Label": "Positive Change",
                "Category": null,
                "Value": "positive_change"
            },
            {
                "Label": "Negative Change",
                "Category": null,
                "Value": "negative_change"
            },
            {
                "Label": "No Change",
                "Category": null,
                "Value": "no_change"
            }
        ],
        "FieldSettings": null,
        "Children": null,
        "ConditionGroups": []
    },
    {
        "Label": "Rationale",
        "Name": "rationale_32",
        "Description": "Please provide a descriptive rationale for the color-coded ranking of technical product health. Why did you rate the overall technical product health as you did? What are the potential consequences of the rating?",
        "FieldType": 11,
        "FieldValidations": [
            {
                "Value": "",
                "Type": FormGeneratorValidationEnum.Required
            },
            {
                "Value": "1000",
               "Type": FormGeneratorValidationEnum.StringLength
            }
        ],
        "FieldOptions": [],
        "FieldSettings": null,
        "Children": null,
        "ConditionGroups": []
    }
];

const newFormArrayStructure = [
  {
    'Label': 'Key Action',
    'Name': 'key_action_group_form|29',
    'Description': null,
    'FieldType': 4,
    'FieldValidations': [
      { 'Value': '10', 'Type': FormGeneratorValidationEnum.Max }
    ],
    'FieldOptions': [],
    'FieldSettings': {
      'DefaultValue': [
        {
          'FormArrayElementId': '1694933529',
          'key_action|8': 'fdas',
          'owner|9': 'asdf@asdf.de',
          'due_date|10': '2025-09-02T00:00:00.000Z',
          'status|11': 'closed',
          'closure_date|12': null
        }, {
          'FormArrayElementId': '1694933545',
          'key_action|8': 'fdas2',
          'owner|9': 'asdf2@asdf.de',
          'due_date|10': '2025-09-03T00:00:00.000Z',
          'status|11': 'open',
          'closure_date|12': null
        }
      ],
      'StepSize': 0,
      'DataUrl': '',
      'IsRepeatable': true,
      'IsReadOnly': false
    },
    'Children': [
      {
        'Label': 'Key Action',
        'Name': 'key_action|8',
        'Description': 'Keeping the current reporting period TPH rating in mind, describe key actions to be taken in this and ' +
          'next reporting period to restore or improve product technical health, including escalation if needed.',
        'FieldType': 11,
        'FieldValidations': [ {
          'Value': '',
          'Type': FormGeneratorValidationEnum.Required,
        }, {
          'Value': '10000',
          'Type': FormGeneratorValidationEnum.StringLength
        } ],
        'FieldOptions': [],
        'FieldSettings': {
          'DefaultValue': 'Generate at-scale verification data required to support 30mM PAA registration in November and prepare (author) regulatory submission.',
          'StepSize': 0,
          'DataUrl': null,
          'IsRepeatable': false,
          'IsReadOnly': false
        },
        'Children': [],
        'ConditionGroups': []
      }, {
      'Label': 'Owner',
        'Name': 'owner|9',
        'Description': 'Please enter the owner’s name.',
        'FieldType': 3,
        'FieldValidations': [ {
        'Value': '',
          'Type': FormGeneratorValidationEnum.Required,
      } ],
        'FieldOptions': [],
        'FieldSettings': {
          'DefaultValue': 'demo.owner@example.com',
          'StepSize': 0,
          'DataUrl': null,
          'IsRepeatable': false,
          'IsReadOnly': false
        },
        'Children': [],
        'ConditionGroups': []
      }, {
      'Label': 'Due Date',
        'Name': 'due_date|10',
        'Description': 'The assessment is independent of the platform and must be completed irrespective of whether manufacturing is ongoing or not.',
        'FieldType': 6,
        'FieldValidations': [ {
        'Value': '', 'Type': FormGeneratorValidationEnum.Required,
      } ],
        'FieldOptions': [],
        'FieldSettings': {
        'DefaultValue': '2025-09-01T00:00:00.000Z',
          'StepSize': 0,
          'DataUrl': null,
          'IsRepeatable': false,
          'IsReadOnly': false
        },
        'Children': [],
        'ConditionGroups': []
      }, {
      'Label': 'Status',
        'Name': 'status|11',
        'Description': null,
        'FieldType': 1,
        'FieldValidations': [ {
        'Value': '',
          'Type': FormGeneratorValidationEnum.Required,
      } ],
        'FieldOptions': [ {
        'Label': 'Open',
          'Category': null,
          'Value': 'open'
        }, {
        'Label': 'Close',
          'Category': null,
          'Value': 'closed'
      } ],
        'FieldSettings': {
        'DefaultValue': 'closed',
          'StepSize': 0,
          'DataUrl': null,
          'IsRepeatable': false,
          'IsReadOnly': false },
        'Children': [],
        'ConditionGroups': []
      }, {
      'Label': 'Closure date',
        'Name': 'closure_date|12',
        'Description': null,
        'FieldType': 3,
        'FieldValidations': [],
        'FieldOptions': [],
        'FieldSettings': {
        'DefaultValue': null,
          'StepSize': 0,
          'DataUrl': '',
          'IsRepeatable': false,
          'IsReadOnly': true
        },
        'Children': [],
        'ConditionGroups': []
    } ],
    'ConditionGroups': []
  } ]


const formArrayWithChildrenAndConditions: FormGeneratorElModel[] = [
  {
    "Label": "Active Manufacturing",
    "Name": "active_manufacturing|17",
    "Description": "This part of the assessment is only relevant for products that have been actively manufactured during the assessment period. If your product does not fall into this category, answer 'No' and you're done! If you answer 'Yes', please continue with the form. If your product has been manufactured at several manufacturing sites in parallel during the assessment period, an assessment should be made for each form. Similarly, if different general forms have been manufactured during the assessment period, an assessment should be made for each form.",
    "FieldType": 10,
    "FieldValidations": [],
    "FieldOptions": [],
    "FieldSettings": null,
    "Children": null,
    "ConditionGroups": []
  },
  {
    "Label": "Site",
    "Name": "manufacturing_site_group_form|30",
    "Description": null,
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
      {
        "Label": "Manufacturing Site",
        "Name": "manufacturing_site|19",
        "Description": "Please enter the name of the site and galenical form (Galenical form is only relevant for DP). Please use the following format: Company, Location, Form, e.g., 'Delpharm, Italy, Capsules' as an example for DP, or 'Roche, Basel' as an example for DS.",
        "FieldType": 1,
        "FieldValidations": [
          {
            "Value": "",
            Type: FormGeneratorValidationEnum.Required
          }
        ],
        "FieldOptions": [],
        "FieldSettings": {
          "DefaultValue": null,
          "StepSize": 0,
          "DataUrl": STORYBOOK_MOCK_API + "/tph/assessment/form/options/rdbms?tableName=Sites&labelPropertyName=Name&valuePropertyName=Name&categoryPropertyName=Type&categoryFormat=Enum:SiteType",
          "IsRepeatable": false,
          "IsReadOnly": false
        },
        "Children": [],
        "ConditionGroups": []
      },
      {
        "Label": "Process Performance",
        "Name": "process_performance|20",
        "Description": "How is the process performing? Please use this field to provide a qualitative summary of the process performance and process monitoring data. Take the following factors into account in your assessment: Overall Rule violations, rule violations with common root causes, Cross-site trends, significant single site trends, RpK, CPk, continuous process verification (CPV) for CMOs, critical deviations, OOS results, batches lost/reprocessed.\n\nNote that this narrative can also serve to complete the Product & Process Monitoring section of the E2E APOR. The following are the Inclusion criteria for the E2E APOR, please take them into account when performing this part of the assessment:\n\n+ Include any notable issues requiring a Quality record as a result of process monitoring\n+ Include instances where a rule trend violation resulted in a change to the process (not in TPH).\n+ For CPP, KPI including yield, COA, Additional Attributes, IP Bioburden - only include those attributes where the conclusion was associated with a process issue and/or where an action associated with the manufacturing process (including analytical methods, revalidation) or control limits was identified.\n+ Cross-site/Cross-process evaluation – include common excursions occurring at more than one site (in TPH) or occurring across more than one process step (i.e., upstream and downstream) that warrant further evaluation.\n+ Site process evaluation – include conclusions where actions associated with the manufacturing process (including analytical methods, revalidation) or control limits were identified.",
        "FieldType": 11,
        "FieldValidations": [
          {
            "Value": "",
            Type: FormGeneratorValidationEnum.Required
          }
        ],
        "FieldOptions": [],
        "FieldSettings": null,
        "Children": [],
        "ConditionGroups": []
      },
      {
        "Label": "Process Performance Rating",
        "Name": "process_performance_rating|21",
        "Description": null,
        "FieldType": 1,
        "FieldValidations": [
          {
            "Value": "",
            Type: FormGeneratorValidationEnum.Required
          }
        ],
        "FieldOptions": [
          {
            "Label": "Green",
            "Category": null,
            "Value": "green"
          },
          {
            "Label": "Red",
            "Category": null,
            "Value": "red"
          },
          {
            "Label": "Yellow",
            "Category": null,
            "Value": "yellow"
          }
        ],
        "FieldSettings": null,
        "Children": [],
        "ConditionGroups": []
      },
      {
        "Label": "Number of Batches",
        "Name": "number_of_batches|23",
        "Description": null,
        "FieldType": 2,
        "FieldValidations": [
          {
            "Value": "",
            Type: FormGeneratorValidationEnum.Required
          }
        ],
        "FieldOptions": [],
        "FieldSettings": null,
        "Children": [],
        "ConditionGroups": [
          {
            "Operator": LogicalOperator.and,
            "Conditions": [
              {
                "DependentOn": "platform|1",
                "Operator": ConditionOperator.equal,
                "Values": [
                  "biologics"
                ]
              },
              {
                "DependentOn": "ds/dp/device|2",
                "Operator": ConditionOperator.equal,
                "Values": [
                  "ds"
                ]
              }
            ],
           "Action": ActionType.Show,
            "LoadUrl": null,
            "LoadOnce": true
          }
        ]
      },
      {
        "Label": "Pre-Harvest Titer (RSD%)",
        "Name": "pre_harvest_titer_rsd|24",
        "Description": "In relation to the pre-harvest titer please include the RSD%. The RSD should be less than or equal to 8%. These data are available in REMIX. Please also see this guidance.",
        "FieldType": 3,
        "FieldValidations": [
          {
            "Value": "",
            Type: FormGeneratorValidationEnum.Required
          }
        ],
        "FieldOptions": [],
        "FieldSettings": null,
        "Children": [],
        "ConditionGroups": [
          {
             "Operator": LogicalOperator.and,
            "Conditions": [
              {
                "DependentOn": "platform|1",
                "Operator": ConditionOperator.equal,
                "Values": [
                  "biologics"
                ]
              },
              {
                "DependentOn": "ds/dp/device|2",
                "Operator": ConditionOperator.equal,
                "Values": [
                  "ds"
                ]
              }
            ],
           "Action": ActionType.Show,
            "LoadUrl": null,
            "LoadOnce": true
          }
        ]
      },
      {
        "Label": "API Yield (Actual - Target)",
        "Name": "api_yield_actual_target|25",
        "Description": "In relation to the API Yield, please enter the Σ (actual - target). The result should be greater than -3%. These data are available in REMIX. Please also see this guidance.",
        "FieldType": 3,
        "FieldValidations": [
          {
            "Value": "",
            Type: FormGeneratorValidationEnum.Required
          }
        ],
        "FieldOptions": [],
        "FieldSettings": null,
        "Children": [],
        "ConditionGroups": [
          {
             "Operator": LogicalOperator.and,
            "Conditions": [
              {
                "DependentOn": "platform|1",
                "Operator": ConditionOperator.equal,
                "Values": [
                  "biologics"
                ]
              },
              {
                "DependentOn": "ds/dp/device|2",
                "Operator": ConditionOperator.equal,
                "Values": [
                  "ds"
                ]
              }
            ],
           "Action": ActionType.Show,
            "LoadUrl": null,
            "LoadOnce": true
          }
        ]
      },
      {
        "Label": "API Yield Actuals (RSD)",
        "Name": "api_yield_actual_rsd|26",
        "Description": null,
        "FieldType": 3,
        "FieldValidations": [
          {
            "Value": "",
            Type: FormGeneratorValidationEnum.Required
          }
        ],
        "FieldOptions": [],
        "FieldSettings": null,
        "Children": [],
        "ConditionGroups": [
          {
             "Operator": LogicalOperator.and,
            "Conditions": [
              {
                "DependentOn": "platform|1",
                "Operator": ConditionOperator.equal,
                "Values": [
                  "biologics"
                ]
              },
              {
                "DependentOn": "ds/dp/device|2",
                "Operator": ConditionOperator.equal,
                "Values": [
                  "ds"
                ]
              }
            ],
           "Action": ActionType.Show,
            "LoadUrl": null,
            "LoadOnce": true
          }
        ]
      },
      {
        "Label": "Investigative UPEs",
        "Name": "investigative_upes|27",
        "Description": "As part of TPH assessments, it is important that the DST reviews all the unplanned events (UPEs) in the review period, particularly the investigation UPEs that stem from manufacturing deviation (or a product test results with possible causal or contributory role from manufacturing variability). DSTs are not expected or required to review track-and-trend events for the purpose of TPH assessment. It is also understood and expected that significant UPEs (e.g. those resulting in action limit excursions or OOS) are already brought to the DST for awareness and dialogue. The purpose of this additional review is to:\n\n- Improve visibility, awareness and promote sharing of knowledge, watchouts, insights etc., across sites (e.g. of multiple sites manufacturing the same product)\n- Increased awareness and qualitatively identify any product or site-specific trends\n- Increased awareness and dialogue of certain types of UPEs (e.g. UPEs where the root cause was “unable to determine”, “process variability” or “material”)\n\nThis section can also be used to highlight recent quality related issues or events that the DST had to be involved in during investigation and/or remediation.\n\nDSTs are not required to provide a “color” assessment based on this review. However, the teams are encouraged to follow-up on areas where potential risks are identified through this review. On the dashboard row for “Investigative UPEs”, the DSTL should acknowledge that this review was performed and provide a pointer to any actions or follow-up (e.g. reference to action items in the “Action board”).",
        "FieldType": 11,
        "FieldValidations": [
          {
            "Value": "",
            Type: FormGeneratorValidationEnum.Required
          }
        ],
        "FieldOptions": [],
        "FieldSettings": null,
        "Children": [],
        "ConditionGroups": [
          {
             "Operator": LogicalOperator.and,
            "Conditions": [
              {
                "DependentOn": "platform|1",
                "Operator": ConditionOperator.equal,
                "Values": [
                  "biologics"
                ]
              },
              {
                "DependentOn": "ds/dp/device|2",
                "Operator": ConditionOperator.equal,
                "Values": [
                  "ds"
                ]
              }
            ],
           "Action": ActionType.Show,
            "LoadUrl": null,
            "LoadOnce": true
          }
        ]
      },
      {
        "Label": "Raw Materials",
        "Name": "raw_materials|28",
        "Description": "DSTs are not required to provide a “color” assessment based for raw materials review. However, given the relevance of raw materials in the overall technical health and robustness of the DS processes, the following aspects should be considered:\n\n- Manufacturing process related UPEs where the probable or contributing root cause was a raw material (see above section on UPEs)\n- A network-level team is examining and tracking direct material risks based on a holistic assessment of each raw material used in GMP manufacturing. The assessment, prioritization and actions of this team may impact one or more products (e.g. dual sourcing of certain high risk raw materials). If that happens, the DST should highlight this and any product and or site-specific actions along with timelines. The DSTL is responsible for providing visibility to the DST based on prior discussions in network forums such as direct material risk monitoring and execution teams\n- If one or more raw materials are experiencing significant supply shortages and alternate source is being implemented (especially raw materials that have the potential to impact product quality and/or process performance). The DSTL is responsible for providing visibility and awareness to the sites based on discussions in network teams like the one described above.\n\nOngoing raw material-related risks and initiatives (particularly those with a potential for impact to product quality and/or process performance metrics like overall yield, step yield) should be acknowledged in the dashboard row for “Raw materials”. The DSTL is responsible for gathering input from the DST members to complete this.",
        "FieldType": 11,
        "FieldValidations": [
          {
            "Value": "",
            Type: FormGeneratorValidationEnum.Required
          }
        ],
        "FieldOptions": [],
        "FieldSettings": null,
        "Children": [],
        "ConditionGroups": [
          {
             "Operator": LogicalOperator.and,
            "Conditions": [
              {
                "DependentOn": "platform|1",
                "Operator": ConditionOperator.equal,
                "Values": [
                  "biologics"
                ]
              },
              {
                "DependentOn": "ds/dp/device|2",
                "Operator": ConditionOperator.equal,
                "Values": [
                  "ds"
                ]
              }
            ],
           "Action": ActionType.Show,
            "LoadUrl": null,
            "LoadOnce": true
          }
        ]
      },
      {
        "Label": "Pre Harvest Titer Site Comparison",
        "Name": "pre_harvest_titer_site_comparison|33",
        "Description": "Please compare the Pre-Harvest Titer between sites according to the following system:\r\n\r\n2 sites:\r\n{(site B- site A)*100/average}\r\n\r\n3 or more sites:\r\n{(site X - average)*100/average}\r\n(X = 1, 2, 3)\r\n\r\nIn each case the results should be less than or equal to 5% these data are available in REMIX. Please also see this guidance [https://docs.google.com/document/d/1TOx5b3Sgga4grO30V4FZaBFpVARkULDSS2JUp2NpGeg/edit?tab=t.0#heading=h.fb896i25wd74]",
        "FieldType": 11,
        "FieldValidations": [],
        "FieldOptions": [],
        "FieldSettings": null,
        "Children": [],
        "ConditionGroups": [
          {
             "Operator": LogicalOperator.and,
            "Conditions": [
              {
                "DependentOn": "platform|1",
                "Operator": ConditionOperator.equal,
                "Values": [
                  "biologics"
                ]
              },
              {
                "DependentOn": "ds/dp/device|2",
                "Operator": ConditionOperator.equal,
                "Values": [
                  "ds"
                ]
              }
            ],
           "Action": ActionType.Show,
            "LoadUrl": null,
            "LoadOnce": true
          }
        ]
      }
    ],
    "ConditionGroups": [
      {
         "Operator": LogicalOperator.and,
        "Conditions": [
          {
            "DependentOn": "active_manufacturing|17",
            "Operator": ConditionOperator.equal,
            "Values": [
              "true"
            ]
          }
        ],
       "Action": ActionType.Show,
        "LoadUrl": null,
        "LoadOnce": true
      }
    ]
  }
]

const formWithDateRange = [
    {
        "Label": "Platform",
        "Name": "platform|1",
        "Description": null,
        "FieldType": 1,
        "FieldValidations": [],
        "FieldOptions": [
            {
                "Label": "Biologics",
                "Category": null,
                "Value": "biologics"
            },
            {
                "Label": "Small Molecules",
                "Category": null,
                "Value": "small_molecules"
            }
        ],
        "FieldSettings": {
            "DefaultValue": "biologics",
            "StepSize": 0,
            "DataUrl": null,
            "IsRepeatable": false,
            "IsReadOnly": false
        },
        "Children": [],
        "ConditionGroups": []
    },
    {
        "Label": "DS/DP/Device",
        "Name": "ds/dp/device|2",
        "Description": null,
        "FieldType": 1,
        "FieldValidations": [],
        "FieldOptions": [
            {
                "Label": "DS",
                "Category": null,
                "Value": "ds"
            },
            {
                "Label": "DP",
                "Category": null,
                "Value": "dp"
            },
            {
                "Label": "Device",
                "Category": null,
                "Value": "device"
            }
        ],
        "FieldSettings": {
            "DefaultValue": "ds",
            "StepSize": 0,
            "DataUrl": null,
            "IsRepeatable": false,
            "IsReadOnly": false
        },
        "Children": [],
        "ConditionGroups": []
    },
    {
        "Label": "Product",
        "Name": "product|3",
        "Description": null,
        "FieldType": 1,
        "FieldValidations": [],
        "FieldOptions": [],
        "FieldSettings": {
            "DefaultValue": "Avastin",
            "StepSize": 0,
            "DataUrl": STORYBOOK_MOCK_API + "/tph/assessment/form/options/rdbms?tableName=Products&labelPropertyName=Name&valuePropertyName=Id",
            "IsRepeatable": false,
            "IsReadOnly": false
        },
        "Children": [],
        "ConditionGroups": []
    },
    {
        "Label": "Manufacturing Site",
        "Name": "manufacturing_site|19",
        "Description": "Please enter the name of the site and galenical form (Galenical form is only relevant for DP). Please use the following format: Company, Location, Form, e.g., 'Delpharm, Italy, Capsules' as an example for DP, or 'Roche, Basel' as an example for DS.",
        "FieldType": 5,
        "FieldValidations": [],
        "FieldOptions": [],
        "FieldSettings": {
            "DefaultValue": [
                "AESCULAP, TUTTLINGEN",
                "DUVELL (DD PROJECT)",
                "ELI LILLY & CO, INDIANAPOLIS",
                "ENABLE INJECTIONS INC, CINCINNATI",
                "EXCELLA GMBH & CO KG, FEUCHT",
                "FAREVA PAU, IDRON",
                "FINORGA-NOVASEP SAS, CHASSE-SUR-RHONE",
                "FIS FABBRICA ITALIANA SINTETICI SPA LONIGO, LONIGO",
                "FIS FABBRICA ITALIANA SINTETICI SPA MONTECCHIO MAGGIORE, MONTECCHIO MAGGIORE",
                "FIS FABBRICA ITALIANA SINTETICI SPA TERMOLI, TERMOLI",
                "FISHER CLINICAL SERVICES ALLSCHWIL, ALLSCHWIL",
                "FLAMMA",
                "FORTREA CLINICAL RESEARCH UNIT LTD, LEEDS",
                "FRÜH, FEHRALTORF",
                "FUJIFILM DIOSYNTH BIOTECHNOLOGIES DK, HILLEROD",
                "FUJIFILM DIOSYNTH BIOTECHNOLOGIES UK LTD, BILLINGHAM",
                "FUJIFILM DIOSYNTH BIOTECHNOLOGIES, MORRISVILLE",
                "GOCN",
                "HALOZYME, SAN DIEGO",
                "HAS HEALTHCARE (FORMERLY HELSINN), BIASCA",
                "HOSPIRA PFIZER, ROCKY MOUNT",
                "HOVIONE FARMACIENCIA SA (LISBON), LOURES",
                "HOVIONE LTD (CORK), RINGASKIDDY",
                "HTO",
                "LEIDEN UNIVERSITY MEDICAL CENTER (LUMC)-LEIDEN, LEIDEN",
                "NOBLE INTERNATIONAL INC, ORLANDO",
                "NOVARTIS (FORMER ALCON-COUVREUR N V), PUURS-SINT-AMANDS",
                "NOVARTIS PHARMA SAS - HUNINGUE, HUNINGUE",
                "NOVARTIS PHARMA STEIN AG, STEIN",
                "NOVARTIS SINGAPORE, SINGAPORE",
                "NUOVA OMPI SRL, PIOMBINO DESE",
                "NYPRO LTD, BRAY",
                "PATHEON API INC - FLORENCE, FLORENCE",
                "PATHEON AUSTRIA GMBH & CO KG, LINZ",
                "PATHEON BIOLOGICS LLC, SAINT LOUIS",
                "PATHEON FRANCE, BOURGOIN OPERATIONS, BOURGOIN-JALLIEU",
                "PATHEON INC TORONTO REGION OPERATIONS - MISSISSAUGA, MISSISSAUGA",
                "PATHEON ITALIA SPA MONZA OPERATIONS, MONZA",
                "PATHEON MANUFACTURING SERVICES LLC - GREENVILLE, GREENVILLE",
                "PATHEON MANUFACTURING SERVICES LLC, GREENVILLE",
                "PATHEON REGENSBURG GMBH RESCOM, REGENSBURG",
                "PCI PHARMA SERVICES UK, HEREFORD",
                "PCI PHARMA SERVICES, TREDEGAR",
                "PENN PHARMACEUTICAL SERVICES LTD, TAFARNAUBACH IND ESTATE UNITS 23 & 24, GWENT",
                "PHARMAJET INC, GOLDEN",
                "PHARMARON UK LTD (CARDIFF), CARDIFF",
                "PHARMARON UK LTD (RUSHDEN), RUSHDEN",
                "PHARMARON, TIANJIN",
                "PHILLIPS MEDISIZE LLC - HUDSON, HUDSON",
                "PHILLIPS MEDISIZE LLC PHILLIPS MEDICAL NEW RICHMOND, NEW RICHMOND",
                "PHILLIPS MEDISIZE LLC, MENOMONIE",
                "PLASTIAPE SPA, OSNAGO LC",
                "PPD DEVELOPMENT LLC -MIDDLETON, MIDDLETON",
                "PRA HEALTH SCIENCES, GRONINGEN",
                "PRA INTERNATIONAL BV, GRONINGEN",
                "PZ",
                "QUOTIENT SCIENCES LTD - ALNWICK, ALNWICK",
                "QUOTIENT SCIENCES LTD - NOTTINGHAM, NOTTINGHAM",
                "QUOTIENT SCIENCES LTD - READING, READING",
                "QUOTIENT SCIENCES PHARMA-PHILADELPHIA, BOOTHWYN",
                "RECIPHARM, LEGANES",
                "RECIPROCAL LABS CORP, PROPELLER HEALTH, MADISON",
                "RMH",
                "ROTTENDORF PHARMA GMBH, ENNIGERLOH",
                "RSTO",
                "SA AJINOMOTO OMNICHEM NV, WETTEREN",
                "SAFC (MILLIPORE SIGMA), MADISON",
                "SAMSUNG BIOLOGICS, YEONSU-GU",
                "SCANDINAVIAN HEALTH LTD (SHL), TAOYUAN",
                "SELVITA SA (CONTRACT LAB), KRAKOW",
                "SERIPHARM (AXPLORA), LE MANS",
                "SGS INSTITUT FRESENIUS GMBH KG (CONTRACT LAB), BERLIN",
                "SHA",
                "SHANGHAI STA PHARMACEUTICAL PRODUCT CO, LTD, WAIGAOQIAO FREE TRADE ZONE, SHANGHAI",
                "SHANGHAI SYNTHEALL (STA), PHARMACEUTICAL CO LTD, JINSHAN SITE, SHANGHAI",
                "SHARP PACKAGING SERVICES LCC, ALLENTOWN",
                "SHARP PACKAGING SERVICES LCC, CONSHOHOCKEN",
                "SHIONOGI PHARMA CO LTD, SETTSU",
                "SHIONOGI PHARMA CO LTD, TOKUSHIMA",
                "SHL MEDICAL AG, ZUG",
                "SIEGFRIED AG (ZOFINGEN), ZOFINGEN",
                "SIEGFRIED HAMELN, HAMELN",
                "SIGNA SA DE CV (TOLUCA), TOLUCA",
                "SIMBEC-ORION-MERTHYR TYDFIL, UK, PENTREBACH",
                "SKYEPHARMA AG, ST QUENTIN FALLAVIER",
                "SSFP DP",
                "AGC BIOLOGICS-BOTHELL, BOTHELL",
                "ALFRESA PHARMA COR, OSAKA",
                "ALMAC PHARMA SERVICES LTD, AUDUBON",
                "ALMAC PHARMA SERVICES LTD, CRAIGAVON",
                "ALMAC PHARMA SERVICES LTD, DUNDALK",
                "ALMAC PHARMA SERVICES LTD, DURHAM",
                "ALMAC PHARMA SERVICES LTD, LOUGHBOROUGH",
                "ALMAC PHARMA SERVICES LTD, SOUDERTON",
                "ANDERSONBRECON INC, PCI PHARMA SVCS, ROCKFORD",
                "APTUIT (OXFORD) LTD, MILTON PARK ABINGDON",
                "APTUIT (VERONA) SRL, VERONA",
                "ASYMCHEM LIFE SCIENCE (TIANJIN) CO, LTD, TIANJIN",
                "AVARA PHARMACEUTICAL, NORMAN",
                "AVID BIOSERVICES, TUSTIN",
                "B BRAUN MEDICAL AG, SEMPACH",
                "BACHEM AG, BUBENDORF",
                "BI RCV (BOEHRINGER INGELHEIM VIENNA SITE), WIEN",
                "BIOVECTRA INC, CHARLOTTETOWN",
                "BOEHRINGER INGELHEIM (BIBERACH), BIBERACH AN DER RISS",
                "BS-BIO",
                "BS-SM",
                "BSP PHARMACEUTICALS SPA, LATINA SCALO",
                "CATALENT BLOOMINGTON (FORMER COOK PHARMICA), BLOOMINGTON",
                "CATALENT EBERBACH, EBERBACH",
                "CATALENT GREENVILLE (FORMER MAYNE PHARMA), GREENVILLE",
                "CATALENT GREENVILLE, GREENVILLE",
                "CATALENT KANSAS CITY, KANSAS CITY",
                "CATALENT PHARMA SOLUTIONS LLC, PHILADELPHIA\r\n",
                "CATALENT PHARMA SOLUTIONS LLC, WINCHESTER",
                "CATALENT PHARMA SOLUTIONS, CONTRACT PACKAGING, PHILADELPHIA",
                "CATALENT SCHORNDORF, SCHORNDORF",
                "CENEXI SAS, FONTENAY SOUS BOIS",
                "CERBIOS PHARMA SA, BARBENGO/LUGANO",
                "CHANGZHOU SYNTHEALL PHARMACEUTICAL, CO LTD, A WUXI APPTEC CO CHANGZHOU SITE, CHANGZHOU",
                "CHUGAI, FUJIEDA",
                "CHUGAI, LONDON",
                "CHUGAI, TOKYO",
                "CHUGAI, UTSUNOMIYA",
                "CORDEN (BERGAMO), TREVIGLIO",
                "CORDEN (COLORADO), BOULDER",
                "COREALIS PHARMA -LAVAL, LAVAL",
                "CREDENCE - US",
                "DELPHARM, SEGRATE",
                "DOTTIKON EXCLUSIVE SYNTHESIS AG, DOTTIKON",
                "DSM, SISSELN AG",
                "EVONIK, LAFAYETTE",
                "ICON (PRA) LENEXA, LENEXA",
                "INVICRO LONDON, LONDON",
                "INVICRO NEW HAVEN, NEW HAVEN",
                "JABIL HEALTHCARE, SAINT PETERSBURG",
                "JOHNS HOPKINS UNIVERSITY (JHU)-BALTIMORE, BALTIMORE",
                "KATALYST",
                "KAU",
                "KORU MEDICAL SYSTEMS",
                "LABCORP EARLY DEVELOPMENT, MADISON",
                "LIFE MOLECULAR IMAGING GMBH-BERLIN, BERLIN",
                "LONSTROFF AG, MERENSCHWAND",
                "LONZA AG - VISP - SWITZERLAND, VISP",
                "LONZA AG, BASEL",
                "LONZA BIOLOGICS INC - PORTSMITH, PORTSMOUTH",
                "LONZA BIOLOGICS PLC - UK",
                "LONZA BIOLOGICS TUAS - SINGAPORE, SINGAPORE",
                "LONZA STEIN - SWITZERLAND, BASEL",
                "LONZA VACAVILLE, VACAVILLE",
                "LONZA, STEIN",
                "LTS DEVICE TECHNOLOGIES LTD., NETANYA",
                "MICMAC MICRO MACINAZIONE SA, MONTEGGIO",
                "MOTT",
                "ST PHARM CO LTD, SIHEUNG-SI",
                "SSFP DS",
                "ST PHARM, ANSAN-SI",
                "STA PHARMACEUTICAL HONG KONG (WUXI SMALL MOLECULE COMMERCIAL), KOWLOON",
                "STERIGENICS, VERVIERS",
                "SUMITOMO",
                "TERUMO, LEUVEN",
                "THERMO FISHER SCIENTIFIC CORK, CARRIGALINE",
                "THERMOFISHER, MISSISSAUGA",
                "TIANJIN ASYMCHEM PHARMACEUTICAL, CO LTD, TIANJIN",
                "UNIVERSITÄTSKLINIKUM TÜBINGEN-TÜBINGEN",
                "UNIVERSITY MEDICAL CENTER GRONINGEN (UMCG)-GRONINGEN, GRONINGEN",
                "VETTER DEVELOPMENT SERVICES AUSTRIA, GMBH, RANKWEIL",
                "VETTER PHARMA-FERTIGUNG GMBH & CO KG, RAVENSBURG",
                "VETTER PHARMA-FERTIGUNG GMBH, & CO KG, LANGENARGEN",
                "VUMC RESEARCH BV, AMSTERDAM",
                "WEST PHARMACEUTICAL SERVICES AZ INC, TEMPE",
                "WOODSTOCK STERILE SOUTIONS, WOODSTOCK",
                "WUXI APPTEC (HONG KONG) LTD, HONG KONG",
                "WUXI APPTEC CO LTD, WUXI",
                "WUXI BIOLOGICS CO LTD, SHANGHAI",
                "WUXI BIOLOGICS SHANGHAI CO LTD, SHANGHAI",
                "WUXI WUPPERTAL, WUPPERTAL",
                "YPSOMED AG, BURGDORF",
                "YUKON MEDICAL LLC, DURHAM"
            ],
            "StepSize": 0,
            "DataUrl": STORYBOOK_MOCK_API + "/tph/assessment/form/options/rdbms?tableName=Sites&labelPropertyName=Name&valuePropertyName=Name&categoryPropertyName=Type&categoryFormat=Enum:SiteType",
            "IsRepeatable": false,
            "IsReadOnly": false
        },
        "Children": [],
        "ConditionGroups": []
    },
    {
        "Label": "PMP Name",
        "Name": "pmp_name|34",
        "Description": null,
        "FieldType": 1,
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
    },
    {
        "Label": "Date Range",
        "Name": "date_range|35",
        "Description": null,
        "FieldType": 12,
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
    }
]

const conditionalDependentForm: FormGeneratorElModel[] = [
    {
        "Label": "Key Action",
        "Name": "key_action_group_form|29",
        "Description": null,
        "FieldType": 4,
        "FieldValidations": [
            {
                "Value": "10",
                 Type: FormGeneratorValidationEnum.Max
            },
            {
                "Value": "1",
                 Type: FormGeneratorValidationEnum.Min
            }
        ],
        "FieldOptions": [],
        "FieldSettings": {
            "DefaultValue": [],
            "StepSize": 0,
            "DataUrl": "",
            "IsRepeatable": true,
            "IsReadOnly": false
        },
        "Children": [
            {
                "Label": "Key Action",
                "Name": "key_action|8",
                "Description": "Keeping the current reporting period TPH rating in mind, describe key actions to be taken in this and next reporting period to restore or improve product technical health, including escalation if needed.",
                "FieldType": 11,
                "FieldValidations": [
                    {
                        "Value": "",
                        Type: FormGeneratorValidationEnum.Required
                    }
                ],
                "FieldOptions": [],
                "FieldSettings": null,
                "Children": [],
                "ConditionGroups": []
            },
            {
                "Label": "Owner",
                "Name": "owner|9",
                "Description": "Please enter the owner’s name.",
                "FieldType": 3,
                "FieldValidations": [
                    {
                        "Value": "",
                        Type: FormGeneratorValidationEnum.Required
                    }
                ],
                "FieldOptions": [],
                "FieldSettings": null,
                "Children": [],
                "ConditionGroups": []
            },
            {
                "Label": "Due Date",
                "Name": "due_date|10",
                "Description": "The assessment is independent of the platform and must be completed irrespective of whether manufacturing is ongoing or not.",
                "FieldType": 6,
                "FieldValidations": [
                    {
                        "Value": "",
                        Type: FormGeneratorValidationEnum.Required
                    }
                ],
                "FieldOptions": [],
                "FieldSettings": null,
                "Children": [],
                "ConditionGroups": []
            },
            {
                "Label": "Status",
                "Name": "status|11",
                "Description": null,
                "FieldType": 1,
                "FieldValidations": [
                    {
                        "Value": "",
                        Type: FormGeneratorValidationEnum.Required
                    }
                ],
                "FieldOptions": [
                    {
                        "Label": "Open",
                        "Category": null,
                        "Value": "open"
                    },
                    {
                        "Label": "Close",
                        "Category": null,
                        "Value": "closed"
                    }
                ],
                "FieldSettings": null,
                "Children": [],
                "ConditionGroups": []
            },
            {
                "Label": "Closure date",
                "Name": "closure_date|12",
                "Description": null,
                "FieldType": 6,
                "FieldValidations": [],
                "FieldOptions": [],
                "FieldSettings": {
                    "DefaultValue": "2025-10-27T06:19:04.646Z",
                    "StepSize": 0,
                    "DataUrl": "",
                    "IsRepeatable": false,
                    "IsReadOnly": false
                },
                "Children": [],
                "ConditionGroups": [
                    {
                         "Operator": LogicalOperator.and,
                        "Conditions": [
                            {
                                "DependentOn": "status|11",
                                "Operator": ConditionOperator.equal,
                                "Values": [
                                    "closed"
                                ]
                            }
                        ],
                       "Action": ActionType.Show,
                        "LoadUrl": null,
                        "LoadOnce": true
                    }
                ]
            }
        ],
        "ConditionGroups": []
    }
];


const dynamicData: FormGeneratorElModel[] = [
    {
        "Label": "Parameter Type",
        "Name": "type",
        "Description": null,
        "FieldType": 1,
        "FieldValidations": [],
        "FieldOptions": [
            {
                "Label": "KPI",
                "Category": null,
                "Value": "KPI"
            },
            {
                "Label": "CQA",
                "Category": null,
                "Value": "CQA"
            }
        ],
        "FieldSettings": {
            "DefaultValue": "CQA",
            "StepSize": 0,
            "DataUrl": "",
            "IsRepeatable": false,
            "IsReadOnly": false
        },
        "Children": [],
        "ConditionGroups": [
            {
                "Operator": LogicalOperator.and,
                "Conditions": [],
                "Action": ActionType.Show,
                "LoadUrl": null,
                "LoadOnce": true
            }
        ]
    },
    {
        "Label": "Platform",
        "Name": "platform",
        "Description": null,
        "FieldType": 1,
        "FieldValidations": [],
        "FieldOptions": [],
        "FieldSettings": {
            "DefaultValue": "$DCP-first",
            "StepSize": 0,
            "DataUrl": "https://demo.dev/tph/cqa/options/meta-data?filters[0].Key=type&filters[0].StringValue=${type}&valuePropertyName=Platform",
            "IsRepeatable": false,
            "IsReadOnly": false
        },
        "Children": [],
        "ConditionGroups": []
    },
  {
    "Label": "Device",
    "Name": "device",
    "Description": null,
    "FieldType": 1,
    "FieldValidations": [],
    "FieldOptions": [],
    "FieldSettings": {
      "DefaultValue": "$DCP-first",
      "StepSize": 0,
      "DataUrl": "https://demo.dev/tph/cqa/options/meta-data?filters[0].Key=type&filters[0].StringValue=${type}&filters[1].Key=platform&filters[1].StringValue=${platform}&valuePropertyName=Device",
      "IsRepeatable": false,
      "IsReadOnly": false
    },
    "Children": [],
    "ConditionGroups": []
  }
];

const multiSelect: FormGeneratorElModel[] = [
  {
    "Label": "Platform",
    "Name": "platform|1",
    "Description": null,
    "FieldType": FieldTypeEnum.MultiSelectDropdown,
    "FieldValidations": [
      {
        "Value": "",
        "Type": FormGeneratorValidationEnum.Required
      }
    ],
    "FieldOptions": [
      {
        "Label": "Biologics",
        "Category": null,
        "Value": "biologics"
      },
      {
        "Label": "Small Molecules",
        "Category": null,
        "Value": "small_molecules"
      }
    ],
    "FieldSettings": {
      "DefaultValue": [],
      "StepSize": 0,
      "DataUrl": null,
      "IsRepeatable": false,
      "IsReadOnly": false
    },
    "Children": null,
    "ConditionGroups": []
  }
]

const preselectedMultiSelect: FormGeneratorElModel[] = [
  {
    "Label": "Platform",
    "Name": "platform|1",
    "Description": null,
    "FieldType": FieldTypeEnum.MultiSelectDropdown,
    "FieldValidations": [
      {
        "Value": "",
        "Type": FormGeneratorValidationEnum.Required
      }
    ],
    "FieldOptions": [
      {
        "Label": "Biologics",
        "Category": null,
        "Value": "biologics"
      },
      {
        "Label": "Small Molecules",
        "Category": null,
        "Value": "small_molecules"
      }
    ],
    "FieldSettings": {
      "DefaultValue": [
        "biologics",
        "small_molecules"
      ],
      "StepSize": 0,
      "DataUrl": null,
      "IsRepeatable": false,
      "IsReadOnly": false
    },
    "Children": null,
    "ConditionGroups": []
  },
  {
    "Label": "DS/DP/Device",
    "Name": "ds/dp/device|2",
    "Description": null,
    "FieldType": FieldTypeEnum.MultiSelectDropdown,
    "FieldValidations": [
      {
        "Value": "",
        "Type": FormGeneratorValidationEnum.Required
      }
    ],
    "FieldOptions": [
      {
        "Label": "DS",
        "Category": null,
        "Value": "ds"
      },
      {
        "Label": "DP",
        "Category": null,
        "Value": "dp"
      },
      {
        "Label": "Device",
        "Category": null,
        "Value": "device"
      }
    ],
    "FieldSettings": {
      "DefaultValue": [
        "ds",
        "dp",
        "device"
      ],
      "StepSize": 0,
      "DataUrl": null,
      "IsRepeatable": false,
      "IsReadOnly": false
    },
    "Children": null,
    "ConditionGroups": []
  }
]

const preselectedMultiSelectObject: FormGeneratorElModel[] = [
  {
    "Label": "Platform",
    "Name": "platform|1",
    "Description": null,
    "FieldType": FieldTypeEnum.MultiSelectDropdown,
    "FieldValidations": [
      {
        "Value": "",
        "Type": FormGeneratorValidationEnum.Required
      }
    ],
    "FieldOptions": [
      {
        "Label": "Biologics",
        "Category": null,
        "Value": {
          a:1
        }
      },
      {
        "Label": "Small Molecules",
        "Category": null,
        "Value": {
          b:2
        }
      }
    ],
    "FieldSettings": {
      "DefaultValue": [
        {
          a:1
        }
      ],
      "StepSize": 0,
      "DataUrl": null,
      "IsRepeatable": false,
      "IsReadOnly": false
    },
    "Children": null,
    "ConditionGroups": []
  },
]

const countConditions = [
  {
    "Label": "Site",
    "Name": "manufacturing_site_group_form|30",
    "Description": null,
    "FieldType": FieldTypeEnum.Array,
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
    ],
    "ConditionGroups": []
  },
  {
    "Label": "Pre Harvest Titer Site Comparison",
    "Name": "pre_harvest_titer_site_comparison|33",
    "Description": "Count Greater or Equal to 2",
    "FieldType": FieldTypeEnum.TextArea,
    "FieldValidations": [],
    "FieldOptions": [],
    "FieldSettings": null,
    "Children": null,
    "ConditionGroups": [
      {
        "Operator": LogicalOperator.and,
        "Conditions": [
          {
            "DependentOn": "manufacturing_site_group_form|30",
            "Operator": ConditionOperator.countGreaterOrEqualTo,
            "Values": [
              2
            ]
          }
        ],
        "Action": ActionType.Show,
        "LoadUrl": null,
        "LoadOnce": true
      }
    ]
  },
  {
    "Label": "Pre Harvest Titer Site Comparison",
    "Name": "pre_harvest_titer_site_comparison|34",
    "Description": "Count Less or Equal to 3",
    "FieldType": FieldTypeEnum.TextArea,
    "FieldValidations": [],
    "FieldOptions": [],
    "FieldSettings": null,
    "Children": null,
    "ConditionGroups": [
      {
        "Operator": LogicalOperator.and,
        "Conditions": [
          {
            "DependentOn": "manufacturing_site_group_form|30",
            "Operator": ConditionOperator.countLessOrEqualTo,
            "Values": [
              3
            ]
          }
        ],
        "Action": ActionType.Show,
        "LoadUrl": null,
        "LoadOnce": true
      }
    ]
  },
  {
    "Label": "Pre Harvest Titer Site Comparison",
    "Name": "pre_harvest_titer_site_comparison|35",
    "Description": "Count Equal to 1, 2 or 3",
    "FieldType": FieldTypeEnum.TextArea,
    "FieldValidations": [],
    "FieldOptions": [],
    "FieldSettings": null,
    "Children": null,
    "ConditionGroups": [
      {
        "Operator": LogicalOperator.and,
        "Conditions": [
          {
            "DependentOn": "manufacturing_site_group_form|30",
            "Operator": ConditionOperator.countEqualTo,
            "Values": [
              1, 2, 3
            ]
          }
        ],
        "Action": ActionType.Show,
        "LoadUrl": null,
        "LoadOnce": true
      }
    ]
  },
]

const closureDate: FormGeneratorElModel[] = [
    {
        "Label": "New Key Actions",
        "Name": "new_key_action_group_form|41",
        "Description": null,
        "FieldType": 4,
        "FieldValidations": [
            {
                "Value": "10",
                "Type": FormGeneratorValidationEnum.Max
            },
            {
                "Value": "1",
               "Type": FormGeneratorValidationEnum.Min
            }
        ],
        "FieldOptions": [],
        "FieldSettings": {
            "DefaultValue": [],
            "StepSize": 0,
            "DataUrl": "",
            "IsRepeatable": true,
            "IsReadOnly": false
        },
        "Children": [
            {
                "Label": "Key Action",
                "Name": "new_key_action|42",
                "Description": "Keeping the current reporting period TPH rating in mind, describe key actions to be taken in this and next reporting period to restore or improve product technical health, including escalation if needed.",
                "FieldType": 11,
                "FieldValidations": [
                    {
                        "Value": "",
                        "Type": FormGeneratorValidationEnum.Required
                    },
                    {
                        "Value": "5000",
                        "Type": FormGeneratorValidationEnum.StringLength
                    },
                    {
                        "Value": "",
                        "Type": FormGeneratorValidationEnum.Trimmed
                    }
                ],
                "FieldOptions": [],
                "FieldSettings": null,
                "Children": [],
                "ConditionGroups": []
            },
            {
                "Label": "Owner",
                "Name": "new_owner|43",
                "Description": "Please enter the owner’s name.",
                "FieldType": 3,
                "FieldValidations": [
                    {
                        "Value": "",
                        "Type": FormGeneratorValidationEnum.Required
                    },
                    {
                        "Value": "5000",
                        "Type": FormGeneratorValidationEnum.StringLength
                    },
                    {
                        "Value": "",
                       "Type": FormGeneratorValidationEnum.Trimmed
                    }
                ],
                "FieldOptions": [],
                "FieldSettings": null,
                "Children": [],
                "ConditionGroups": []
            },
            {
                "Label": "Due Date",
                "Name": "new_due_date|44",
                "Description": "The assessment is independent of the platform and must be completed irrespective of whether manufacturing is ongoing or not.",
                "FieldType": 6,
                "FieldValidations": [
                    {
                        "Value": "",
                        "Type": FormGeneratorValidationEnum.Required
                    }
                ],
                "FieldOptions": [],
                "FieldSettings": null,
                "Children": [],
                "ConditionGroups": []
            },
            {
                "Label": "Status",
                "Name": "new_status|45",
                "Description": null,
                "FieldType": 1,
                "FieldValidations": [
                    {
                        "Value": "",
                        "Type": FormGeneratorValidationEnum.Required
                    }
                ],
                "FieldOptions": [
                    {
                        "Label": "Open",
                        "Category": null,
                        "Value": "open"
                    },
                    {
                        "Label": "Close",
                        "Category": null,
                        "Value": "closed"
                    }
                ],
                "FieldSettings": null,
                "Children": [],
                "ConditionGroups": []
            },
            {
                "Label": "Closure date",
                "Name": "new_closure_date|46",
                "Description": null,
                "FieldType": 6,
                "FieldValidations": [],
                "FieldOptions": [],
                "FieldSettings": {
                    "DefaultValue": "2025-12-01T04:58:04.408Z",
                    "StepSize": 0,
                    "DataUrl": "",
                    "IsRepeatable": false,
                    "IsReadOnly": true
                },
                "Children": [],
                "ConditionGroups": [
                    {
                        "Operator": LogicalOperator.and,
                        "Conditions": [
                            {
                                "DependentOn": "new_status|45",
                                "Operator": ConditionOperator.equal,
                                "Values": [
                                    "closed"
                                ]
                            }
                        ],
                        "Action": ActionType.Show,
                        "LoadUrl": null,
                        "LoadOnce": true
                    }
                ]
            }
        ],
        "ConditionGroups": [
            {
                "Operator": LogicalOperator.and,
                "Conditions": [
                    {
                        "DependentOn": "action_requirement|40",
                        "Operator": ConditionOperator.equal,
                        "Values": [
                            false
                        ]
                    }
                ],
                "Action": ActionType.Show,
                "LoadUrl": null,
                "LoadOnce": true
            }
        ]
    }
]

const newData = [
  {
    "Label": "Interval",
    "Name": "Interval",
    "Description": null,
    "FieldType": 1,
    "FieldValidations": [
      {
        "Value": null,
        "Type": FormGeneratorValidationEnum.Required
      }
    ],
    "FieldOptions": [
      {
        "Label": "20 s",
        "Category": null,
        "Value": 20
      },
      {
        "Label": "40 s",
        "Category": null,
        "Value": 40
      },
      {
        "Label": "60 s",
        "Category": null,
        "Value": 60
      },
      {
        "Label": "80 s",
        "Category": null,
        "Value": 80
      },
      {
        "Label": "100 s",
        "Category": null,
        "Value": 100
      },
      {
        "Label": "120 s",
        "Category": null,
        "Value": 120
      },
      {
        "Label": "140 s",
        "Category": null,
        "Value": 140
      },
      {
        "Label": "160 s",
        "Category": null,
        "Value": 160
      },
      {
        "Label": "180 s",
        "Category": null,
        "Value": 180
      },
      {
        "Label": "200 s",
        "Category": null,
        "Value": 200
      }
    ],
    "FieldSettings": {
      "DefaultValue": 20,
      "StepSize": 0.0,
      "DataUrl": null,
      "IsRepeatable": false,
      "IsReadOnly": false
    },
    "Children": [],
    "ConditionGroups": []
  },
  {
    "Label": "Outputs to be monitored",
    "Name": "Outputs",
    "Description": null,
    "FieldType": 4,
    "FieldValidations": [
      {
        "Value": 1,
        "Type": FormGeneratorValidationEnum.Min
      }
    ],
    "FieldOptions": [],
    "FieldSettings": {
      "DefaultValue": [
        {
          "ViolationThreshold": 3,
          "ViolationThresholdInRow": 2,
          "UpperSigmaValue": 0.5,
          "LowerSigmaValue": 0.5,
          "FormArrayElementId": "C863FAD7032C8998CF57922E53AE882B",
          "ModelOutput": "{\"Comp\":1,\"CalculationType\":1}"
        }
      ],
      "StepSize": 0.0,
      "DataUrl": null,
      "IsRepeatable": true,
      "IsReadOnly": false
    },
    "Children": [
      {
        "Label": "Get Limits By",
        "Name": "ModelOutput",
        "Description": null,
        "FieldType": 1,
        "FieldValidations": [
          {
            "Value": null,
            "Type": FormGeneratorValidationEnum.Required
          }
        ],
        "FieldOptions": [
          {
            "Label": "Score (Comp 1)",
            "Category": "Score",
            "Value": {
              "Comp": 1,
              "CalculationType": 1
            }
          },
          {
            "Label": "DmodX (Comp 1)",
            "Category": "DmodX",
            "Value": {
              "Comp": 1,
              "CalculationType": 2
            }
          },
          {
            "Label": "Hotelling's T² (Comp 1)",
            "Category": "Hotelling's T²",
            "Value": {
              "Comp": 1,
              "CalculationType": 3
            }
          },
          {
            "Label": "Druck_P1.U",
            "Category": "Parameter",
            "Value": {
              "ParameterName": "Druck_P1.U",
              "CalculationType": 0
            }
          },
          {
            "Label": "Druck_P2.U",
            "Category": "Parameter",
            "Value": {
              "ParameterName": "Druck_P2.U",
              "CalculationType": 0
            }
          }
        ],
        "FieldSettings": {
          "DefaultValue": null,
          "StepSize": 0.0,
          "DataUrl": null,
          "IsRepeatable": false,
          "IsReadOnly": false
        },
        "Children": [],
        "ConditionGroups": []
      },
      {
        "Label": "Upper Sigma Value",
        "Name": "UpperSigmaValue",
        "Description": null,
        "FieldType": 2,
        "FieldValidations": [
          {
            "Value": null,
            "Type": FormGeneratorValidationEnum.Required
          },
          {
            "Value": 0.5,
            "Type": FormGeneratorValidationEnum.Min
          },
          {
            "Value": 6,
            "Type": FormGeneratorValidationEnum.Max
          },
          {
            "Value": 0.1,
            "Type": FormGeneratorValidationEnum.Remainder
          }
        ],
        "FieldOptions": [],
        "FieldSettings": {
          "DefaultValue": "0,5",
          "StepSize": 0.1,
          "DataUrl": null,
          "IsRepeatable": false,
          "IsReadOnly": false
        },
        "Children": [],
        "ConditionGroups": []
      },
      {
        "Label": "Lower Sigma Value",
        "Name": "LowerSigmaValue",
        "Description": null,
        "FieldType": 2,
        "FieldValidations": [
          {
            "Value": null,
            "Type": FormGeneratorValidationEnum.Required
          },
          {
            "Value": 0.5,
            "Type": FormGeneratorValidationEnum.Min
          },
          {
            "Value": 6,
            "Type": FormGeneratorValidationEnum.Max
          },
          {
            "Value": 0.1,
            "Type": FormGeneratorValidationEnum.Remainder
          }
        ],
        "FieldOptions": [],
        "FieldSettings": {
          "DefaultValue": "0,5",
          "StepSize": 0.1,
          "DataUrl": null,
          "IsRepeatable": false,
          "IsReadOnly": false
        },
        "Children": [],
        "ConditionGroups": []
      },
      {
        "Label": "Total number of violations",
        "Name": "ViolationThreshold",
        "Description": null,
        "FieldType": 2,
        "FieldValidations": [
          {
            "Value": null,
            "Type": FormGeneratorValidationEnum.Required
          },
          {
            "Value": 0,
            "Type": FormGeneratorValidationEnum.Min
          },
          {
            "Value": 1,
            "Type": FormGeneratorValidationEnum.Remainder
          }
        ],
        "FieldOptions": [],
        "FieldSettings": {
          "DefaultValue": "0",
          "StepSize": 1.0,
          "DataUrl": null,
          "IsRepeatable": false,
          "IsReadOnly": false
        },
        "Children": [],
        "ConditionGroups": []
      },
      {
        "Label": "Consecutive number of violations",
        "Name": "ViolationThresholdInRow",
        "Description": null,
        "FieldType": 2,
        "FieldValidations": [
          {
            "Value": null,
            "Type": FormGeneratorValidationEnum.Required
          },
          {
            "Value": "${ViolationThreshold}",
            "Type": FormGeneratorValidationEnum.Max
          },
          {
            "Value": 1,
            "Type": FormGeneratorValidationEnum.Remainder
          }
        ],
        "FieldOptions": [],
        "FieldSettings": {
          "DefaultValue": null,
          "StepSize": 1.0,
          "DataUrl": null,
          "IsRepeatable": false,
          "IsReadOnly": false
        },
        "Children": [],
        "ConditionGroups": []
      }
    ],
    "ConditionGroups": []
  }
]

const showCondition = [
  {
    "Label": "Sensor Filter Type",
    "Name": "SensorFilterType",
    "Description": null,
    "FieldType": FieldTypeEnum.DropDown,
    "FieldValidations": [
      {
        "Value": null,
        "Type": FormGeneratorValidationEnum.Required
      }
    ],
    "FieldOptions": [
      {
        "Label": "Attribute Filter",
        "Category": null,
        "Value": "AttributeFilter"
      },
      {
        "Label": "No Sensor Filter",
        "Category": null,
        "Value": "NoSensorFilter"
      },
      {
        "Label": "Element Filter",
        "Category": null,
        "Value": "ElementFilter"
      }
    ],
    "FieldSettings": {
      "DefaultValue": "NoSensorFilter",
      "StepSize": 0,
      "DataUrl": null,
      "IsRepeatable": false,
      "IsReadOnly": false
    },
    "Children": [],
    "ConditionGroups": []
  },
  {
    "Label": "Sensor Filter Condition",
    "Name": "SensorFilterCondition",
    "Description": null,
    "FieldType": FieldTypeEnum.String,
    "FieldValidations": [
      {
        "Value": null,
        "Type": FormGeneratorValidationEnum.Required
      }
    ],
    "FieldOptions": [],
    "FieldSettings": {
      "DefaultValue": null,
      "StepSize": 0,
      "DataUrl": null,
      "IsRepeatable": false,
      "IsReadOnly": false
    },
    "Children": [],
    "ConditionGroups": [
      {
        "Operator": LogicalOperator.or,
        "Conditions": [
          {
            "DependentOn": "SensorFilterType",
            "Operator": ConditionOperator.equal,
            "Values": [
              "AttributeFilter"
            ]
          },
          {
            "DependentOn": "SensorFilterType",
            "Operator": ConditionOperator.equal,
            "Values": [
              "ElementFilter"
            ]
          }
        ],
        "Action": ActionType.Show,
        LoadUrl: null,
        LoadOnce: true
      }
    ]
  }, {
    "Label": "Proxy",
    "Name": "Proxy",
    "Description": null,
    "FieldType": FieldTypeEnum.Group,
    "FieldValidations": [],
    "FieldOptions": [],
    "FieldSettings": {
      "DefaultValue": null,
      "StepSize": 0,
      "DataUrl": null,
      "IsRepeatable": false,
      "IsReadOnly": false
    },
    "Children": [
      {
        "Label": "Proxy Active",
        "Name": "Active",
        "Description": null,
        "FieldType": FieldTypeEnum.Checkbox,
        "FieldValidations": [],
        "FieldOptions": [],
        "FieldSettings": {
          "DefaultValue": false,
          "StepSize": 0,
          "DataUrl": null,
          "IsRepeatable": false,
          "IsReadOnly": false
        },
        "Children": [],
        "ConditionGroups": []
      },
      {
        "Label": "Proxy Url",
        "Name": "Url",
        "Description": null,
        "FieldType": FieldTypeEnum.String,
        "FieldValidations": [
          {
            "Value": null,
            "Type": FormGeneratorValidationEnum.Required,
          }
        ],
        "FieldOptions": [],
        "FieldSettings": {
          "DefaultValue": null,
          "StepSize": 0,
          "DataUrl": null,
          "IsRepeatable": false,
          "IsReadOnly": false
        },
        "Children": [],
        "ConditionGroups": [
          {
            "Operator": LogicalOperator.and,
            "Conditions": [
              {
                "DependentOn": "Active",
                "Operator": ConditionOperator.equal,
                "Values": [
                  true
                ]
              }
            ],
            "Action": ActionType.Show,
            "LoadUrl": null,
            "LoadOnce": true
          }
        ]
      },
      {
        "Label": "Proxy Client Id",
        "Name": "ClientId",
        "Description": null,
        "FieldType": FieldTypeEnum.String,
        "FieldValidations": [
          {
            "Value": null,
            "Type": FormGeneratorValidationEnum.Required
          }
        ],
        "FieldOptions": [],
        "FieldSettings": {
          "DefaultValue": null,
          "StepSize": 0,
          "DataUrl": null,
          "IsRepeatable": false,
          "IsReadOnly": false
        },
        "Children": [],
        "ConditionGroups": [
          {
            "Operator": LogicalOperator.and,
            "Conditions": [
              {
                "DependentOn": "Active",
                "Operator": ConditionOperator.equal,
                "Values": [
                  true
                ]
              }
            ],
            "Action": ActionType.Show,
            "LoadUrl": null,
            "LoadOnce": true
          }
        ]
      },
      {
        "Label": "Proxy Client Secret",
        "Name": "ClientSecret",
        "Description": null,
        "FieldType": FieldTypeEnum.Secret,
        "FieldValidations": [
          {
            "Value": null,
            "Type": FormGeneratorValidationEnum.Required
          }
        ],
        "FieldOptions": [],
        "FieldSettings": {
          "DefaultValue": null,
          "StepSize": 0,
          "DataUrl": null,
          "IsRepeatable": false,
          "IsReadOnly": false
        },
        "Children": [],
        "ConditionGroups": [
          {
            "Operator": LogicalOperator.and,
            "Conditions": [
              {
                "DependentOn": "Active",
                "Operator": ConditionOperator.equal,
                "Values": [
                  true
                ]
              }
            ],
            "Action": ActionType.Show,
            "LoadUrl": null,
            "LoadOnce": true
          }
        ]
      }
    ],
    "ConditionGroups": []
  }]


const disableValidationConditions = [
  {
    "Label": "Upper Sigma Value",
    "Name": "UpperSigmaValue",
    "FieldType": FieldTypeEnum.Number,
    "FieldValidations": [
      {
        "Value": 0.5,
        "Type": FormGeneratorValidationEnum.Min
      },
      {
        "Value": 6.4,
        "Type": FormGeneratorValidationEnum.Max
      },
      {
        "Value": 0.1,
        "Type": FormGeneratorValidationEnum.Remainder
      }
    ],
    "FieldOptions": [],
    "FieldSettings": {
      "DefaultValue": "3",
      "StepSize": 0.1,
      "IsRepeatable": false,
      "IsReadOnly": false
    },
    "Children": [],
    "ConditionGroups": []
  },
  {
    "Label": "Total number of violations",
    "Name": "ViolationThreshold",
    "Description": null,
    "FieldType": FieldTypeEnum.Number,
    "FieldValidations": [
      {
        "Value": null,
        "Type": FormGeneratorValidationEnum.Required
      },
      {
        "Value": "${ViolationThreshold}",
        "Type": FormGeneratorValidationEnum.Max
      },
      {
        "Value": 1,
        "Type": FormGeneratorValidationEnum.Remainder
      }
    ],
    "FieldOptions": [],
    "FieldSettings": {
      "DefaultValue": "0",
      "StepSize": 1,
      "DataUrl": null,
      "IsRepeatable": false,
      "IsReadOnly": false
    },
    "Children": [],
    "ConditionGroups": [
      {
        "Operator": LogicalOperator.and,
        "Conditions": [
          {
            "DependentOn": "ViolationThresholdInRow",
            "Operator": ConditionOperator.notEqual,
            "Values": [
              0,
              null
            ]
          }
        ],
        "Action": ActionType.DisableValidation,
        "LoadUrl": null,
        "LoadOnce": true
      }
    ]
  },
  {
    "Label": "Consecutive number of violations",
    "Name": "ViolationThresholdInRow",
    "Description": null,
    "FieldType": FieldTypeEnum.Number,
    "FieldValidations": [
      {
        "Value": null,
        "Type": FormGeneratorValidationEnum.Required
      },
      {
        "Value": "${ViolationThreshold}",
        "Type": FormGeneratorValidationEnum.Max
      },
      {
        "Value": 1,
        "Type": FormGeneratorValidationEnum.Remainder
      }
    ],
    "FieldOptions": [],
    "FieldSettings": {
      "DefaultValue": null,
      "StepSize": 1,
      "DataUrl": null,
      "IsRepeatable": false,
      "IsReadOnly": false
    },
    "Children": [],
    "ConditionGroups": [
      {
        "Operator": LogicalOperator.and,
        "Conditions": [
          {
            "DependentOn": "ViolationThreshold",
            "Operator": ConditionOperator.notEqual,
            "Values": [
              0,
              null
            ]
          }
        ],
        "Action": ActionType.DisableValidation,
        "LoadUrl": null,
        "LoadOnce": true
      }
    ]
  }
]

const descriptionWithHtml = [
  {
    "Label": "Pre Harvest Titer Site Comparison",
    "Name": "pre_harvest_titer_site_comparison|33",
    "Description": "Please compare the Pre-Harvest Titer between sites according to the following system:\r\n\r\n2 sites:\r\n{(site B- site A)*100/average}\r\n\r\n3 or more sites:\r\n{(site X - average)*100/average}\r\n(X = 1, 2, 3)\r\n\r\nIn each case the results should be less than or equal to 5% these data are available in </p> <p> REMIX. </p>.\r\n<p> Please also see this  <a href=\"https://docs.google.com/document/d/1TOx5b3Sgga4grO30V4FZaBFpVARkULDSS2JUp2NpGeg/edit?tab=t.0#heading=h.fb896i25wd74\" target=\"_blank\">guidance</a>.\r\n",
    "FieldType": 11,
    "FieldValidations": [],
    "FieldOptions": [],
    "FieldSettings": null,
    "Children": null,
    "ConditionGroups": []
  }
]

const disabledDropDown: FormGeneratorElModel[] = [
  {
    "Label": "Get Limits By",
    "Name": "ModelOutput",
    "FieldType": 1,
    "FieldValidations": [
        {
            "Type": FormGeneratorValidationEnum.Required,
            "Value": null,
        }
    ],
    "FieldOptions": [
        {
            "Label": "Score (Comp 1)",
            "Category": "Score",
            "Value": {
                "Comp": 1,
                "CalculationType": 1
            }
        },
        {
            "Label": "DmodX (Comp 1)",
            "Category": "DmodX",
            "Value": {
                "Comp": 1,
                "CalculationType": 2
            }
        },
        {
            "Label": "Hotelling's T² (Comp 1)",
            "Category": "Hotelling's T²",
            "Value": {
                "Comp": 1,
                "CalculationType": 3
            }
        },
        {
            "Label": "Score (Comp 2)",
            "Category": "Score",
            "Value": {
                "Comp": 2,
                "CalculationType": 1
            }
        },
        {
            "Label": "DmodX (Comp 2)",
            "Category": "DmodX",
            "Value": {
                "Comp": 2,
                "CalculationType": 2
            }
        },
        {
            "Label": "Hotelling's T² (Comp 2)",
            "Category": "Hotelling's T²",
            "Value": {
                "Comp": 2,
                "CalculationType": 3
            }
        },
        {
            "Label": "Ramp 1",
            "Category": "Parameter",
            "Value": {
                "ParameterName": "Ramp 1",
                "CalculationType": 0
            }
        },
        {
            "Label": "Ramp 2",
            "Category": "Parameter",
            "Value": {
                "ParameterName": "Ramp 2",
                "CalculationType": 0
            }
        },
        {
            "Label": "Trigonometric",
            "Category": "Parameter",
            "Value": {
                "ParameterName": "Trigonometric",
                "CalculationType": 0
            }
        }
    ],
    "FieldSettings": {
        "DefaultValue": {
            "Comp": 1,
            "CalculationType": 1
        },
        "StepSize": 0.0,
        "IsRepeatable": false,
        "IsReadOnly": false
    },
    "Children": [],
    "ConditionGroups": []
  },
  {
    "Label": "Multiselect Get Limits By",
    "Name": "LimitModelOutput",
    "FieldType": 5,
    "FieldValidations": [
        {
            "Type": FormGeneratorValidationEnum.Required,
            "Value": null,
        }
    ],
    "FieldOptions": [
        {
            "Label": "Score (Comp 1)",
            "Category": "Score",
            "Value": {
                "Comp": 1,
                "CalculationType": 1
            }
        },
        {
            "Label": "DmodX (Comp 1)",
            "Category": "DmodX",
            "Value": {
                "Comp": 1,
                "CalculationType": 2
            }
        },
        {
            "Label": "Hotelling's T² (Comp 1)",
            "Category": "Hotelling's T²",
            "Value": {
                "Comp": 1,
                "CalculationType": 3
            }
        },
        {
            "Label": "Score (Comp 2)",
            "Category": "Score",
            "Value": {
                "Comp": 2,
                "CalculationType": 1
            }
        },
        {
            "Label": "DmodX (Comp 2)",
            "Category": "DmodX",
            "Value": {
                "Comp": 2,
                "CalculationType": 2
            }
        },
        {
            "Label": "Hotelling's T² (Comp 2)",
            "Category": "Hotelling's T²",
            "Value": {
                "Comp": 2,
                "CalculationType": 3
            }
        },
        {
            "Label": "Ramp 1",
            "Category": "Parameter",
            "Value": {
                "ParameterName": "Ramp 1",
                "CalculationType": 0
            }
        },
        {
            "Label": "Ramp 2",
            "Category": "Parameter",
            "Value": {
                "ParameterName": "Ramp 2",
                "CalculationType": 0
            }
        },
        {
            "Label": "Trigonometric",
            "Category": "Parameter",
            "Value": {
                "ParameterName": "Trigonometric",
                "CalculationType": 0
            }
        }
    ],
    "FieldSettings": {
        "DefaultValue": {
            "Comp": 1,
            "CalculationType": 1
        },
        "StepSize": 0.0,
        "IsRepeatable": false,
        "IsReadOnly": false
    },
    "Children": [],
    "ConditionGroups": []
  },
  {
    "Label": "Upper Sigma Value",
    "Name": "UpperSigmaValue",
    "FieldType": 2,
    "FieldValidations": [
        {
            "Type": FormGeneratorValidationEnum.Required,
            "Value": null,
        },
        {
            "Value": 0.5,
            "Type": FormGeneratorValidationEnum.Min
        },
        {
            "Value": 6,
            "Type": FormGeneratorValidationEnum.Max
        },
        {
            "Value": 0.1,
            "Type": FormGeneratorValidationEnum.Remainder
        }
    ],
    "FieldOptions": [],
    "FieldSettings": {
        "StepSize": 0.1,
        "IsRepeatable": false,
        "IsReadOnly": false
    },
    "Children": [],
    "ConditionGroups": []
  },
  {
    "Label": "Lower Sigma Value",
    "Name": "LowerSigmaValue",
    "FieldType": 2,
    "FieldValidations": [
        {
            "Type": FormGeneratorValidationEnum.Required,
            Value: null
        },
        {
            "Value": 0.5,
            "Type": FormGeneratorValidationEnum.Min
        },
        {
            "Value": 6,
            "Type": FormGeneratorValidationEnum.Max
        },
        {
            "Value": 0.1,
            "Type": FormGeneratorValidationEnum.Remainder
        }
    ],
    "FieldOptions": [],
    "FieldSettings": {
        "StepSize": 0.1,
        "IsRepeatable": false,
        "IsReadOnly": false
    },
    "Children": [],
    "ConditionGroups": []
  },
  {
    "Label": "Interval",
    "Name": "Interval",
    "FieldType": 1,
    "FieldValidations": [
        {
            "Type": FormGeneratorValidationEnum.Required,
            Value: null
        }
    ],
    "FieldOptions": [
        {
            "Label": "20 s",
            "Value": 20
        },
        {
            "Label": "40 s",
            "Value": 40
        },
        {
            "Label": "60 s",
            "Value": 60
        },
        {
            "Label": "80 s",
            "Value": 80
        },
        {
            "Label": "100 s",
            "Value": 100
        },
        {
            "Label": "120 s",
            "Value": 120
        },
        {
            "Label": "140 s",
            "Value": 140
        },
        {
            "Label": "160 s",
            "Value": 160
        },
        {
            "Label": "180 s",
            "Value": 180
        },
        {
            "Label": "200 s",
            "Value": 200
        }
    ],
    "FieldSettings": {
        "DefaultValue": 20,
        "StepSize": 0.0,
        "IsRepeatable": false,
        "IsReadOnly": false
    },
    "Children": [],
    "ConditionGroups": []
  }
]

const descriptionConfiguration: FormGeneratorElModel[] = [
  {
    Label: 'Section Header',
    Name: 'SectionHeader',
    Description: 'This is a descriptive text block explaining the context of the following fields. It supports longer explanations to guide the user.',
    FieldType: FieldTypeEnum.Description,
    FieldValidations: [],
    FieldOptions: [],
    FieldSettings: null,
    Children: [],
    ConditionGroups: []
  },
  {
    Label: 'Name',
    Name: 'name',
    Description: null,
    FieldType: FieldTypeEnum.String,
    FieldValidations: [],
    FieldOptions: [],
    FieldSettings: null,
    Children: [],
    ConditionGroups: []
  }
];

const numberWithPrecisionConfiguration: FormGeneratorElModel[] = [
  {
    Label: 'Temperature (°C)',
    Name: 'Temperature',
    Description: null,
    FieldType: FieldTypeEnum.NumberWithPrecision,
    FieldValidations: [
      { Type: FormGeneratorValidationEnum.Min, Value: -100 },
      { Type: FormGeneratorValidationEnum.Max, Value: 200 },
      { Type: FormGeneratorValidationEnum.MaxPrecision, Value: 3 }
    ],
    FieldOptions: [],
    FieldSettings: {
      DefaultValue: 36.6,
      StepSize: 0.001,
      IsRepeatable: false,
      IsReadOnly: false
    },
    Children: [],
    ConditionGroups: []
  },
  {
    Label: 'Volume (mL)',
    Name: 'Volume',
    Description: null,
    FieldType: FieldTypeEnum.NumberWithPrecision,
    FieldValidations: [
      { Type: FormGeneratorValidationEnum.Required, Value: null },
      { Type: FormGeneratorValidationEnum.MinPrecision, Value: 1 },
      { Type: FormGeneratorValidationEnum.MaxPrecision, Value: 2 }
    ],
    FieldOptions: [],
    FieldSettings: {
      DefaultValue: null,
      StepSize: 0.01,
      IsRepeatable: false,
      IsReadOnly: false
    },
    Children: [],
    ConditionGroups: []
  }
];

const extendableDropDownConfiguration: FormGeneratorElModel[] = [
  {
    Label: 'Country',
    Name: 'Country',
    Description: null,
    FieldType: FieldTypeEnum.ExtendableDropDown,
    FieldValidations: [
      { Type: FormGeneratorValidationEnum.Required, Value: null }
    ],
    FieldOptions: [
      { Label: 'Switzerland', Value: 'CH' },
      { Label: 'Germany', Value: 'DE' },
      { Label: 'United States', Value: 'US' },
      { Label: 'France', Value: 'FR' },
      { Label: 'United Kingdom', Value: 'GB' }
    ],
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
    Label: 'Custom Tag',
    Name: 'CustomTag',
    Description: 'You can type a new value or select an existing one.',
    FieldType: FieldTypeEnum.ExtendableDropDown,
    FieldValidations: [],
    FieldOptions: [
      { Label: 'Alpha', Value: 'alpha' },
      { Label: 'Beta', Value: 'beta' },
      { Label: 'Gamma', Value: 'gamma' }
    ],
    FieldSettings: {
      DefaultValue: 'beta',
      StepSize: 0,
      DataUrl: null,
      IsRepeatable: false,
      IsReadOnly: false
    },
    Children: [],
    ConditionGroups: []
  }
];

const multiStringInputConfiguration: FormGeneratorElModel[] = [
  {
    "Label": "Hidden Categories",
    "Name": "HiddenCategories",
    "Description": null,
    "FieldType": FieldTypeEnum.MultiStringInput,
    "FieldValidations": [],
    "FieldOptions": [],
    "FieldSettings": {
      "DefaultValue": [
        "Greta",
        "Python"
      ],
      "StepSize": 0,
      "DataUrl": null,
      "IsRepeatable": false,
      "IsReadOnly": false
    },
    "Children": [],
    "ConditionGroups": []
  }
];

const productQualityAggregatedE2E: FormGeneratorElModel[] = [
  {
    Label: "Product Quality Rating for Complaints",
    Name: "complaints_group_e2e|170",
    Description: null,
    FieldType: 7,
    FieldValidations: [],
    FieldOptions: [],
    FieldSettings: null,
    Children: [
      {
        Label: null,
        Name: "average_monthly_cpm_e2e|171",
        Description: null,
        FieldType: 15,
        FieldValidations: [],
        FieldOptions: [],
        FieldSettings: {
          DefaultValue: null,
          StepSize: 0,
          DataUrl: STORYBOOK_MOCK_API + "/tph/assessment/form/options/table?columns[0].Key=Average%20monthly%20CPM&columns[0].Name=Average%20monthly%20CPM&columns[0].ColumnType=Metric&columns[0].OrderIndex=0&filters[0].Name=DataStartTime&filters[0].Operator=gte&filters[0].Value=2025-10-01T00%3A00%3A00.000Z&filters[1].Name=DataEndTime&filters[1].Operator=lte&filters[1].Value=2026-09-30T23%3A59%3A59.999Z&filters[2].Name=Product&filters[2].Operator=eq&filters[2].Value=Tecentriq",
          IsRepeatable: false,
          IsReadOnly: true
        },
        Children: [],
        ConditionGroups: []
      },
      {
        Label: null,
        Name: "range_of_cpm_e2e|173",
        Description: null,
        FieldType: 15,
        FieldValidations: [],
        FieldOptions: [],
        FieldSettings: {
          DefaultValue: null,
          StepSize: 0,
          DataUrl: STORYBOOK_MOCK_API + "/tph/assessment/form/options/table?metricName=Range%20of%20CPM&columns[0].Key=RangeOfCPM&columns[0].Name=Range%20of%20CPM&columns[0].ColumnType=Metadata&columns[0].OrderIndex=0&columns[1].Key=Range%20of%20CPM&columns[1].Name=Range%20of%20CPM&columns[1].ColumnType=Metric&columns[1].IsVisible=false&columns[1].OrderIndex=1&filters[0].Name=DataStartTime&filters[0].Operator=gte&filters[0].Value=2025-10-01T00%3A00%3A00.000Z&filters[1].Name=DataEndTime&filters[1].Operator=lte&filters[1].Value=2026-09-30T23%3A59%3A59.999Z&filters[2].Name=Product&filters[2].Operator=eq&filters[2].Value=Tecentriq",
          IsRepeatable: false,
          IsReadOnly: true
        },
        Children: [],
        ConditionGroups: []
      },
      {
        Label: null,
        Name: "commercial_critical_complaints_e2e|174",
        Description: null,
        FieldType: 15,
        FieldValidations: [],
        FieldOptions: [],
        FieldSettings: {
          DefaultValue: null,
          StepSize: 0,
          DataUrl: STORYBOOK_MOCK_API + "/tph/assessment/form/options/table?columns[0].Key=%23%20Commercial%20Critical%20Complaints&columns[0].Name=%23%20Commercial%20Critical%20Complaints&columns[0].ColumnType=Metric&columns[0].OrderIndex=0&filters[0].Name=DataStartTime&filters[0].Operator=gte&filters[0].Value=2025-10-01T00%3A00%3A00.000Z&filters[1].Name=DataEndTime&filters[1].Operator=lte&filters[1].Value=2026-09-30T23%3A59%3A59.999Z&filters[2].Name=Product&filters[2].Operator=eq&filters[2].Value=Tecentriq",
          IsRepeatable: false,
          IsReadOnly: true
        },
        Children: [],
        ConditionGroups: []
      },
      {
        Label: "Provide context for Complaint Data:",
        Name: "complaint_context_e2e|176",
        Description: "Trend identified (Y/N and # of trends)? Root cause? Mitigation actions identified and/or implemented (Y/N, status of mitigation action and context)?",
        FieldType: 11,
        FieldValidations: [
          {
            Value: "",
            Type: FormGeneratorValidationEnum.Required
          }
        ],
        FieldOptions: [],
        FieldSettings: {
          DefaultValue: "ererf",
          StepSize: 0,
          DataUrl: null,
          IsRepeatable: false,
          IsReadOnly: false
        },
        Children: [],
        ConditionGroups: []
      },
      {
        Label: "Health",
        Name: "complaint_health_e2e|178",
        Description: "Rules: If product is ranked among the top 3 in CPM, OR >1 confirmed critical complaints: Poor; If product exhibits an emerging upward trend in CPM, OR <=1 confirmed critical complaint, OR no confirmed critical complaint without a defined mitigation action: Medium; If product exhibits a stable or decreasing CPM trend, AND no confirmed critical complaint: Good",
        FieldType: 1,
        FieldValidations: [
          {
            Value: "",
            Type: FormGeneratorValidationEnum.Required
          }
        ],
        FieldOptions: [
          {
            Label: "Good",
            Category: null,
            Value: "good"
          },
          {
            Label: "Medium",
            Category: null,
            Value: "medium"
          },
          {
            Label: "Poor",
            Category: null,
            Value: "poor"
          }
        ],
        FieldSettings: {
          DefaultValue: "medium",
          StepSize: 0,
          DataUrl: null,
          IsRepeatable: false,
          IsReadOnly: false
        },
        Children: [],
        ConditionGroups: []
      }
    ],
    ConditionGroups: []
  },
  {
    Label: "Product Quality Rating for Recalls/Issues",
    Name: "recalls_issues_group_e2e|179",
    Description: null,
    FieldType: 7,
    FieldValidations: [],
    FieldOptions: [],
    FieldSettings: null,
    Children: [
      {
        Label: null,
        Name: "recalls_e2e|180",
        Description: null,
        FieldType: 15,
        FieldValidations: [],
        FieldOptions: [],
        FieldSettings: {
          DefaultValue: null,
          StepSize: 0,
          DataUrl: STORYBOOK_MOCK_API + "/tph/assessment/form/options/table?columns[0].Key=%23%20Recalls&columns[0].Name=%23%20Recalls&columns[0].ColumnType=Metric&columns[0].OrderIndex=0&filters[0].Name=DataStartTime&filters[0].Operator=gte&filters[0].Value=2025-10-01T00%3A00%3A00.000Z&filters[1].Name=DataEndTime&filters[1].Operator=lte&filters[1].Value=2026-09-30T23%3A59%3A59.999Z&filters[2].Name=Product&filters[2].Operator=eq&filters[2].Value=Tecentriq",
          IsRepeatable: false,
          IsReadOnly: true
        },
        Children: [],
        ConditionGroups: []
      },
      {
        Label: null,
        Name: "technical_issues_e2e|181",
        Description: null,
        FieldType: 15,
        FieldValidations: [],
        FieldOptions: [],
        FieldSettings: {
          DefaultValue: null,
          StepSize: 0,
          DataUrl: STORYBOOK_MOCK_API + "/tph/assessment/form/options/table?columns[0].Key=%23%20Technical%20Issues&columns[0].Name=%23%20Technical%20Issues&columns[0].ColumnType=Metric&columns[0].OrderIndex=0&filters[0].Name=DataStartTime&filters[0].Operator=gte&filters[0].Value=2025-10-01T00%3A00%3A00.000Z&filters[1].Name=DataEndTime&filters[1].Operator=lte&filters[1].Value=2026-09-30T23%3A59%3A59.999Z&filters[2].Name=Product&filters[2].Operator=eq&filters[2].Value=Tecentriq",
          IsRepeatable: false,
          IsReadOnly: true
        },
        Children: [],
        ConditionGroups: []
      },
      {
        Label: "Health",
        Name: "recalls_issues_health_e2e|183",
        Description: "If 0 recalls AND 0 issues: Good; If >0 recalls OR >2 issues: Poor; Otherwise: Medium",
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
        Label: "Provide context for Recalls & Issues:",
        Name: "recalls_issues_context_e2e|186",
        Description: "Root cause triggered actions and mitigations if technical actions and mitigations are included in the technical roadmap? Expected supply impact?",
        FieldType: 11,
        FieldValidations: [
          {
            Value: "",
            Type: FormGeneratorValidationEnum.Required
          }
        ],
        FieldOptions: [],
        FieldSettings: {
          DefaultValue: "erferfefr",
          StepSize: 0,
          DataUrl: null,
          IsRepeatable: false,
          IsReadOnly: false
        },
        Children: [],
        ConditionGroups: []
      }
    ],
    ConditionGroups: []
  },
  {
    Label: "Product Quality Rating for Deviations",
    Name: "commercial_deviations_group_e2e|187",
    Description: null,
    FieldType: 7,
    FieldValidations: [],
    FieldOptions: [],
    FieldSettings: null,
    Children: [
      {
        Label: null,
        Name: "commercial_deviations_table_e2e|188",
        Description: null,
        FieldType: 15,
        FieldValidations: [],
        FieldOptions: [],
        FieldSettings: {
          DefaultValue: null,
          StepSize: 0,
          DataUrl: STORYBOOK_MOCK_API + "/tph/assessment/form/options/table?columns[0].Key=Criticality&columns[0].Name=Criticality&columns[0].ColumnType=Metadata&columns[0].OrderIndex=0&columns[1].Key=%23%20Commercial%20Deviations%20with%20Trend%20and%20Tech%20Roots&columns[1].Name=%23%20of%20commercial%20deviations%20with%20trend%20and%20tech%20roots&columns[1].ColumnType=Metric&columns[1].OrderIndex=1&columns[2].Key=%23%20Commercial%20Deviations%20with%20Trend%20and%20Tech%20Roots%20per%20Batch&columns[2].Name=%23%20of%20commercial%20deviations%20with%20trend%20and%20tech%20roots%20per%20batch&columns[2].ColumnType=Metric&columns[2].OrderIndex=2&filters[0].Name=DataStartTime&filters[0].Operator=gte&filters[0].Value=2025-10-01T00%3A00%3A00.000Z&filters[1].Name=DataEndTime&filters[1].Operator=lte&filters[1].Value=2026-09-30T23%3A59%3A59.999Z&filters[2].Name=Product&filters[2].Operator=eq&filters[2].Value=Tecentriq",
          IsRepeatable: false,
          IsReadOnly: true
        },
        Children: [],
        ConditionGroups: []
      },
      {
        Label: "Health",
        Name: "commercial_deviations_health_e2e|189",
        Description: null,
        FieldType: 1,
        FieldValidations: [
          {
            Value: "",
            Type: FormGeneratorValidationEnum.Required
          }
        ],
        FieldOptions: [
          {
            Label: "Good",
            Category: null,
            Value: "good"
          },
          {
            Label: "Medium",
            Category: null,
            Value: "medium"
          },
          {
            Label: "Poor",
            Category: null,
            Value: "poor"
          }
        ],
        FieldSettings: {
          DefaultValue: "poor",
          StepSize: 0,
          DataUrl: null,
          IsRepeatable: false,
          IsReadOnly: false
        },
        Children: [],
        ConditionGroups: []
      },
      {
        Label: "Provide context for deviations with trend:",
        Name: "commercial_deviations_context_e2e|191",
        Description: "Root cause/context triggered actions and mitigations - if technical actions and mitigations, included in technical roadmap? Assessment on supply impact.",
        FieldType: 11,
        FieldValidations: [
          {
            Value: "",
            Type: FormGeneratorValidationEnum.Required
          }
        ],
        FieldOptions: [],
        FieldSettings: {
          DefaultValue: "frfeferfef",
          StepSize: 0,
          DataUrl: null,
          IsRepeatable: false,
          IsReadOnly: false
        },
        Children: [],
        ConditionGroups: []
      }
    ],
    ConditionGroups: []
  },
  {
    Label: "E2E Product Quality Health",
    Name: "product_quality_health_group_e2e|192",
    Description: null,
    FieldType: 7,
    FieldValidations: [],
    FieldOptions: [],
    FieldSettings: null,
    Children: [
      {
        Label: "Health",
        Name: "product_quality_health_e2e|194",
        Description: "Lowest rating across four drivers",
        FieldType: 1,
        FieldValidations: [],
        FieldOptions: [],
        FieldSettings: {
          DefaultValue: null,
          StepSize: 0,
          DataUrl: STORYBOOK_MOCK_API + "/tph/assessment/form/result/aggregated?metricName=product_quality_health_e2e&columns[0].Key=%23%20Recalls&columns[0].Name=%23%20Recalls&columns[0].ColumnType=Metric&columns[0].OrderIndex=0&columns[1].Key=%23%20Technical%20Issues&columns[1].Name=%23%20Technical%20Issues&columns[1].ColumnType=Metric&columns[1].OrderIndex=1&columns[2].Key=commercial_deviations_health_e2e&columns[2].Name=${commercial_deviations_health_e2e|189}&columns[2].ColumnType=Answer&columns[2].OrderIndex=2&columns[3].Key=complaint_health_e2e&columns[3].Name=${complaint_health_e2e|178}&columns[3].ColumnType=Answer&columns[3].OrderIndex=3&filters[0].Name=DataStartTime&filters[0].Operator=gte&filters[0].Value=2025-10-01T00%3A00%3A00.000Z&filters[1].Name=DataEndTime&filters[1].Operator=lte&filters[1].Value=2026-09-30T23%3A59%3A59.999Z&filters[2].Name=Product&filters[2].Operator=eq&filters[2].Value=Tecentriq",
          IsRepeatable: false,
          IsReadOnly: true
        },
        Children: [],
        ConditionGroups: []
      }
    ],
    ConditionGroups: []
  }
];

const inputTypeTable = [
  {
    "Label": null,
    "Name": "rule_1_violation_table_functional|82",
    "Description": null,
    "FieldType": 15,
    "FieldValidations": [],
    "FieldOptions": [],
    "FieldSettings": {
        "DefaultValue": null,
        "StepSize": 0,
        "DataUrl": STORYBOOK_MOCK_API + "/tph/assessment/form/options/table?metricName=rule_1_violation",
        "IsRepeatable": false,
        "IsReadOnly": true
    },
    "Children": [],
    "ConditionGroups": []
},
]

export const formGeneratorConfigurations = {
  basic: basicConfiguration,
  hint: formWithHint,
  conditions: formWithConditions,
  arrayWithChildren: formArrayWithChildren,
  maxLimitReached: formMaxLimitReached,
  newFormArrayStructure: newFormArrayStructure,
  arrayWithChildrenAndConditions: formArrayWithChildrenAndConditions,
  dateRange: formWithDateRange,
  conditionalFields: conditionalDependentForm,
  dynamicData,
  preselectedMultiSelect,
  preselectedMultiSelectObject,
  countConditions,
  closureDate,
  newData,
  multiSelect,
  showCondition,
  disableValidationConditions,
  descriptionWithHtml,
  disabledDropDown,
  multiStringInput: multiStringInputConfiguration,
  description: descriptionConfiguration,
  numberWithPrecision: numberWithPrecisionConfiguration,
  extendableDropDown: extendableDropDownConfiguration,
  inputTypeTable,
  productQualityAggregatedE2E
}

