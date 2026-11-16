import { FieldOptionModel } from '../../lib/form-generator/form-generator.model';

/**
 * Storybook-only mock API. Stories point their DataUrl values here so no real backend is contacted;
 * MSW handlers (see storybook-mock-api.ts) answer with synthetic data.
 *
 * The URL must be absolute: relative DataUrl values get the gateway module URL prepended by the library.
 */
export const STORYBOOK_MOCK_API_PATH = '/storybook-mock-api';

export const getStorybookMockApiBase = (): string => {
  const origin = typeof window !== 'undefined' && window.location?.origin && window.location.origin !== 'null'
    ? window.location.origin
    : 'http://localhost';
  return `${origin}${STORYBOOK_MOCK_API_PATH}`;
};

export const STORYBOOK_MOCK_API = getStorybookMockApiBase();

export interface MockTableColumn {
  Key: string;
  Name: string;
  DataType: string;
  IsVisible: boolean;
  OrderIndex: number;
  ColumnType: string;
}

export interface MockTableCell {
  Value: string | number;
  Status: string;
  Color: string;
}

export interface MockTable {
  Columns: MockTableColumn[];
  Rows: MockTableCell[][];
}

export const buildTableColumnsFromUrl = (requestUrl: string): MockTableColumn[] => {
  const url = new URL(requestUrl);
  const columns: MockTableColumn[] = [];

  for (let index = 0; ; index++) {
    const key = url.searchParams.get(`columns[${index}].Key`);
    if (!key) {
      break;
    }

    const isVisibleRaw = url.searchParams.get(`columns[${index}].IsVisible`);
    const orderIndex = parseInt(url.searchParams.get(`columns[${index}].OrderIndex`) ?? '', 10);

    columns.push({
      Key: key,
      Name: url.searchParams.get(`columns[${index}].Name`) || key,
      DataType: 'string',
      IsVisible: isVisibleRaw === null ? true : isVisibleRaw.toLowerCase() === 'true',
      OrderIndex: Number.isNaN(orderIndex) ? index : orderIndex,
      ColumnType: url.searchParams.get(`columns[${index}].ColumnType`) || 'Metadata'
    });
  }

  return columns;
};

const cell = (Value: string | number): MockTableCell => ({Value, Status: '', Color: ''});

export const kpiVariabilityTableMock: MockTable = {
  Columns: [
    {Key: 'Area', Name: 'Area', DataType: 'string', IsVisible: true, OrderIndex: 0, ColumnType: 'Metadata'},
    {Key: 'PMPName', Name: 'PMP Name', DataType: 'string', IsVisible: true, OrderIndex: 1, ColumnType: 'Metadata'},
    {Key: 'Site', Name: 'Manufacturing Site', DataType: 'string', IsVisible: true, OrderIndex: 2, ColumnType: 'Metadata'},
    {Key: 'AttributeScope', Name: 'Attribute Scope', DataType: 'string', IsVisible: true, OrderIndex: 3, ColumnType: 'Metadata'},
    {Key: 'AttributeName', Name: 'Attribute Name', DataType: 'string', IsVisible: true, OrderIndex: 4, ColumnType: 'Metadata'},
    {Key: 'RSD', Name: 'RSD', DataType: 'string', IsVisible: true, OrderIndex: 5, ColumnType: 'Metric'}
  ],
  Rows: [
    [cell('DS'), cell('Demo Product v1.0 Drug Substance'), cell('Site A'), cell('N/A'), cell('Calculated Overall Yield'), cell(11.41)],
    [cell('DS'), cell('Demo Product v1.0 Drug Substance'), cell('Site B'), cell('N/A'), cell('Calculated Overall Yield'), cell(5.86)],
    [cell('DS'), cell('Demo Product v1.0 Drug Substance'), cell('Site A'), cell('N/A'), cell('Product concentration'), cell(5.89)]
  ]
};

const metricOnlyColumns = (metricName: string): MockTableColumn[] => [
  {Key: 'Site', Name: 'Site', DataType: 'string', IsVisible: true, OrderIndex: 0, ColumnType: 'Metadata'},
  {Key: metricName, Name: metricName, DataType: 'string', IsVisible: true, OrderIndex: 1, ColumnType: 'Metric'}
];

export const buildMockTable = (requestUrl: string): MockTable => {
  const queryColumns = buildTableColumnsFromUrl(requestUrl);
  const queryKeys = queryColumns.map(column => column.Key);

  if (queryKeys.includes('Area') && queryKeys.includes('PMPName')) {
    return kpiVariabilityTableMock;
  }

  const columns = queryColumns.length > 0
    ? queryColumns
    : metricOnlyColumns(new URL(requestUrl).searchParams.get('metricName') || 'Value');

  if (!columns.some(column => column.IsVisible)) {
    return {Columns: columns, Rows: []};
  }

  const Rows = [1, 2].map(rowIndex => columns.map(column =>
    cell(column.ColumnType === 'Metric' ? rowIndex * 3 : `Demo ${column.Name} ${rowIndex}`)
  ));

  return {Columns: columns, Rows};
};

const rdbmsOptions: Record<string, FieldOptionModel[]> = {
  Products: [
    {Label: 'Demo Product A', Value: 'product-a', Category: null},
    {Label: 'Demo Product B', Value: 'product-b', Category: null},
    {Label: 'Demo Product C', Value: 'product-c', Category: null}
  ],
  Sites: [
    {Label: 'Internal Site A', Value: 'Internal Site A', Category: 'Internal'},
    {Label: 'Internal Site B', Value: 'Internal Site B', Category: 'Internal'},
    {Label: 'External Site C', Value: 'External Site C', Category: 'External'}
  ]
};

/** Returns null for unknown tables so the handler can respond with an explicit error. */
export const buildRdbmsOptions = (requestUrl: string): FieldOptionModel[] | null => {
  const tableName = new URL(requestUrl).searchParams.get('tableName') ?? '';
  return rdbmsOptions[tableName] ?? null;
};

/** Quarter options (`yyyy/Q`) from the `startTime` year up to the quarter of `now`. */
export const buildTimeOptions = (requestUrl: string, now: Date = new Date()): FieldOptionModel[] => {
  const startYear = parseInt(new URL(requestUrl).searchParams.get('startTime') ?? '', 10);
  const lastYear = now.getUTCFullYear();
  const lastQuarter = Math.floor(now.getUTCMonth() / 3) + 1;
  const options: FieldOptionModel[] = [];

  for (let year = Number.isNaN(startYear) ? lastYear : startYear; year <= lastYear; year++) {
    const maxQuarter = year === lastYear ? lastQuarter : 4;
    for (let quarter = 1; quarter <= maxQuarter; quarter++) {
      options.push({Label: `${year}/${quarter}`, Value: `${year}/${quarter}`, Category: null});
    }
  }

  return options;
};

export const buildAggregatedResult = () => ({
  DefaultValue: {Label: 'Good', Color: 'Green', Value: 'good'}
});
