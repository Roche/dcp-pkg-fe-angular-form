import {
  buildAggregatedResult,
  buildMockTable,
  buildRdbmsOptions,
  buildTableColumnsFromUrl,
  buildTimeOptions,
  kpiVariabilityTableMock,
  STORYBOOK_MOCK_API
} from './storybook-mock-api.data';

const tableUrl = (query: string) => `${STORYBOOK_MOCK_API}/tph/assessment/form/options/table?${query}`;

describe('Storybook mock API data', () => {
  it('uses an absolute same-origin base URL', () => {
    expect(STORYBOOK_MOCK_API).toBe(`${window.location.origin}/storybook-mock-api`);
    expect(STORYBOOK_MOCK_API.startsWith('http')).toBe(true);
  });

  it('builds table columns from query parameters', () => {
    const columns = buildTableColumnsFromUrl(tableUrl(
      'columns[0].Key=Product&columns[0].Name=Functional%20Product%20Name&columns[0].IsVisible=true&columns[0].OrderIndex=0' +
      '&columns[1].Key=Summary&columns[1].ColumnType=Metric&columns[1].IsVisible=false&columns[1].OrderIndex=1'
    ));

    expect(columns).toEqual([
      {Key: 'Product', Name: 'Functional Product Name', DataType: 'string', IsVisible: true, OrderIndex: 0, ColumnType: 'Metadata'},
      {Key: 'Summary', Name: 'Summary', DataType: 'string', IsVisible: false, OrderIndex: 1, ColumnType: 'Metric'}
    ]);
  });

  it('returns the KPI fixture for the KPI variability query', () => {
    expect(buildMockTable(tableUrl('columns[0].Key=Area&columns[1].Key=PMPName'))).toBe(kpiVariabilityTableMock);
  });

  it('returns rows matching query columns', () => {
    const table = buildMockTable(tableUrl('columns[0].Key=Recalls&columns[0].ColumnType=Metric'));
    expect(table.Columns.map(c => c.Key)).toEqual(['Recalls']);
    expect(table.Rows).toHaveLength(2);
    expect(table.Rows.every(row => row.length === 1 && typeof row[0].Value === 'number')).toBe(true);
  });

  it('returns meaningful columns for metric-only queries', () => {
    const table = buildMockTable(tableUrl('metricName=kpi_variability'));
    expect(table.Columns.map(c => c.Key)).toEqual(['Site', 'kpi_variability']);
    expect(table.Rows.length).toBeGreaterThan(0);
  });

  it('returns no rows when no columns are visible', () => {
    expect(buildMockTable(tableUrl('columns[0].Key=Hidden&columns[0].IsVisible=false')).Rows).toEqual([]);
  });

  it('returns rdbms options per table and null for unknown tables', () => {
    const rdbms = `${STORYBOOK_MOCK_API}/tph/assessment/form/options/rdbms`;
    expect(buildRdbmsOptions(`${rdbms}?tableName=Products`)?.length).toBeGreaterThan(0);
    expect(buildRdbmsOptions(`${rdbms}?tableName=Sites`)?.every(o => !!o.Category)).toBe(true);
    expect(buildRdbmsOptions(`${rdbms}?tableName=Unknown`)).toBeNull();
  });

  it('returns quarter options up to the reference date', () => {
    const options = buildTimeOptions(
      `${STORYBOOK_MOCK_API}/tph/assessment/form/options/time?startTime=2024-01-01Z&format=yyyy/Q`,
      new Date('2025-08-15T00:00:00Z')
    );
    expect(options.map(o => o.Value)).toEqual(['2024/1', '2024/2', '2024/3', '2024/4', '2025/1', '2025/2', '2025/3']);
  });

  it('returns a DefaultValue model for aggregated results', () => {
    expect(buildAggregatedResult()).toEqual({DefaultValue: {Label: 'Good', Color: 'Green', Value: 'good'}});
  });
});
