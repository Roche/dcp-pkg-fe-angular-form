export interface FormGeneratorElModel  {
  Label: string | null;
  Name: string;
  FieldType: FormGeneratorFieldType;
  Description?: string | null;
  FieldValidations: IFieldValidation[];
  FieldOptions?: FieldOptionModel[];
  Children?: FormGeneratorElModel[] | null;
  FieldSettings: {
    DataUrl?: string | null;
    DefaultValue?: any;
    StepSize?: number;
    IsRepeatable?: boolean;
    IsReadOnly?: boolean;
  } | null;
  ConditionGroups?: ConditionGroup[];
  allowMultiSelect?: boolean;
}

export enum LogicalOperator {
  and = 'And',
  or = 'Or'
}

export enum ActionType {
  Show = 'Show',
  Hide = 'Hide',
  Load = 'Load',
  EnableValidation = 'EnableValidation',
  DisableValidation = 'DisableValidation'
}

export interface Condition {
  "DependentOn": string,
  "Operator": ConditionOperator,
  "Values": any[]
}

export enum ConditionOperator {
  equal = 'eq',
  greaterOrEqual = 'gte',
  lessOrEqual = 'lte',
  greaterThen = 'gt',
  lessThen = 'lt',
  notEqual = 'neq',
  hasValue = "hv",
  countEqualTo = "ceq",
  countGreaterOrEqualTo = "cgeq",
  countLessOrEqualTo = "cleq",
  in = 'in',
}


  export interface ConditionGroup {
  Operator: LogicalOperator | string | number,
  Conditions: Condition[],
  Action: ActionType,
  LoadUrl: null,
  LoadOnce: boolean
}

export interface IFieldValidation {
  Type: FormGeneratorValidationEnum;
  Value: any;
}

export interface GroupResult {
  name: string;
  options: FieldOptionModel[];
}

export interface FieldOptionModel {
  Label?: string;
  Category?: string | null;
  Value?: any;
  Description?: string;
}

export enum FieldTypeEnum {
  Description = 0,
  DropDown = 1,
  Number = 2,
  String = 3,
  Array = 4,
  MultiSelectDropdown = 5,
  DateTime = 6,
  Group = 7,
  NumberWithPrecision = 8,
  MultiStringInput = 9,
  Checkbox = 10,
  TextArea = 11,
  TimeRange = 12,
  ExtendableDropDown = 13,
  Secret = 14,
  Table = 15,
  Text = 16
}

export type FormGeneratorFieldType = FieldTypeEnum | number;

export enum FormGeneratorValidationEnum {
  Required = 'Required',
  Min = 'Min',
  Max = 'Max',
  Remainder = 'Remainder',
  MaxPrecision = 'PrecisionMax',
  MinPrecision = 'PrecisionMin',
  Trimmed = 'Trimmed',
  StringLength = 'StringLength'
}

export enum FieldDefaultValueSelectionEnum {
  FirstOption = '$DCP-first',
  LastOption = '$DCP-last',
  AllOptions = '$DCP-all',
  NoOptions = '$DCP-none'
}

export interface DefaultValueModel {
  DefaultValue: any;
}

export interface TableColumnModel {
  Key: string;
  Name: string;
  DataType?: string;
  IsVisible?: boolean;
  index?: number;
  OrderIndex: number;
}

export interface TableRowModel {
  Cells: TableCellModel[];
  MetaData: any;
}

export interface TableCellModel {
  Value: any;
  Status?: string;
  Color?: string;
}

export interface TableModel {
  Columns: TableColumnModel[];
  Rows: TableRowModel[];
}