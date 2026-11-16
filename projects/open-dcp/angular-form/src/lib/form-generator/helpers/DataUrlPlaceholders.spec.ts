jest.mock('../dc-form-generator.service', () => ({
  ODCPFormGeneratorService: class ODCPFormGeneratorServiceMock {}
}));

import { DataLoaderClass } from './DataLoader.class';
import { TableDataLoaderClass } from './TableDataLoader.class';

type LoaderPrototype = {
  getDataUrlKeys: () => string[];
  replaceUrlValues: (values: Record<string, unknown>) => string;
  resolveDataKeyValue: (
    key: string,
    parentValue: Record<string, unknown>,
    rootValue: Record<string, unknown>
  ) => { value: unknown; dependencyKey: string | null };
  getPathValue: (source: unknown, path: string[]) => unknown;
  findValueDeep: (source: unknown, key: string) => unknown;
  resolveRelativePath: (relativeKey: string, rootValue: Record<string, unknown>) => { value: unknown; dependencyKey: string | null };
  getControlPath: () => string[];
};

const dataUrl =
  'https://demo.dev/aggregated?flat=${complaint_health_e2e|178}' +
  '&relativeLocal=${./local_health|1}' +
  '&relativeParentSibling=${../commercial_deviations_group_e2e|187.commercial_deviations_health_e2e|189}' +
  '&root=${$root.assessment_root|1.complaints_group_e2e|170.complaint_health_e2e|178}';

const rootValue = {
  'assessment_root|1': {
    'complaints_group_e2e|170': {
      'complaint_health_e2e|178': 'medium',
    },
    'commercial_deviations_group_e2e|187': {
      'commercial_deviations_health_e2e|189': 'poor',
    },
    'product_quality_health_group_e2e|192': {
      'local_health|1': 'amber',
      'product_quality_health_e2e|194': null,
    },
  },
};

function assertMixedPlaceholderResolution(proto: LoaderPrototype) {
  const context: any = {
    formEl: {
      FieldSettings: {
        DataUrl: dataUrl,
      },
    },
    getPathValue: proto.getPathValue,
    findValueDeep: proto.findValueDeep,
    resolveRelativePath: proto.resolveRelativePath,
    getControlPath: () => [
      'assessment_root|1',
      'product_quality_health_group_e2e|192',
      'product_quality_health_e2e|194',
    ],
  };

  const keys = proto.getDataUrlKeys.call(context);

  expect(keys).toEqual([
    'complaint_health_e2e|178',
    './local_health|1',
    '../commercial_deviations_group_e2e|187.commercial_deviations_health_e2e|189',
    '$root.assessment_root|1.complaints_group_e2e|170.complaint_health_e2e|178',
  ]);

  const values = keys.reduce((acc, key) => {
    const resolved = proto.resolveDataKeyValue.call(context, key, rootValue, rootValue);
    return {
      ...acc,
      [key]: resolved.value,
    };
  }, {} as Record<string, unknown>);

  const url = proto.replaceUrlValues.call(context, values);

  expect(url).toContain('flat=medium');
  expect(url).toContain('relativeLocal=amber');
  expect(url).toContain('relativeParentSibling=poor');
  expect(url).toContain('root=medium');
}

function assertMultiLevelRelativeTraversal(proto: LoaderPrototype) {
  const context: any = {
    getPathValue: proto.getPathValue,
    resolveRelativePath: proto.resolveRelativePath,
    getControlPath: () => [
      'root|1',
      'level1|2',
      'level2|3',
      'level3|4',
      'leaf|5',
    ],
  };

  const valueTree = {
    'root|1': {
      'global_target|99': 'ok',
      'level1|2': {
        'level2|3': {
          'level3|4': {
            'leaf|5': null,
          }
        }
      }
    }
  };

  const resolved = proto.resolveRelativePath.call(context, '../../../global_target|99', valueTree);
  expect(resolved.value).toBe('ok');
  expect(resolved.dependencyKey).toBe('global_target|99');
}

describe('DataUrl placeholder resolution', () => {
  it('supports mixed ${key}, ${./key}, ${../path}, ${$root.path} in DataLoader', () => {
    assertMixedPlaceholderResolution(DataLoaderClass.prototype as unknown as LoaderPrototype);
  });

  it('supports mixed ${key}, ${./key}, ${../path}, ${$root.path} in TableDataLoader', () => {
    assertMixedPlaceholderResolution(TableDataLoaderClass.prototype as unknown as LoaderPrototype);
  });

  it('supports ../../../ traversal in DataLoader', () => {
    assertMultiLevelRelativeTraversal(DataLoaderClass.prototype as unknown as LoaderPrototype);
  });

  it('supports ../../../ traversal in TableDataLoader', () => {
    assertMultiLevelRelativeTraversal(TableDataLoaderClass.prototype as unknown as LoaderPrototype);
  });
});



