import {Injector, runInInjectionContext} from '@angular/core';
import {DcHttp} from '@open-dcp/angular-services';
import {ODCPFormGeneratorService} from './dc-form-generator.service';
import {FieldOptionModel, FieldTypeEnum, FormGeneratorElModel, GroupResult} from './form-generator.model';

describe('ODCPFormGeneratorService option values', () => {
  let service: ODCPFormGeneratorService;

  beforeEach(() => {
    service = runInInjectionContext(
      Injector.create({providers: []}),
      () => new ODCPFormGeneratorService({} as DcHttp)
    );
  });

  describe('compareOptionValues', () => {
    it('compares primitives strictly', () => {
      expect(service.compareOptionValues('a', 'a')).toBe(true);
      expect(service.compareOptionValues(1, 1)).toBe(true);
      expect(service.compareOptionValues(1, '1')).toBe(false);
      expect(service.compareOptionValues(null, null)).toBe(true);
      expect(service.compareOptionValues(null, undefined)).toBe(false);
    });

    it('compares objects by content, ignoring key order', () => {
      expect(service.compareOptionValues({a: 1, b: {c: 2}}, {b: {c: 2}, a: 1})).toBe(true);
      expect(service.compareOptionValues({a: 1}, {a: 2})).toBe(false);
      expect(service.compareOptionValues({a: 1}, null)).toBe(false);
      expect(service.compareOptionValues({a: 1}, '{"a":1}')).toBe(false);
    });
  });

  describe('convertedFieldOptionsValues', () => {
    const options = [
      {Label: 'First', Value: {Id: 1, Name: 'A'}},
      {Label: 'Second', Value: {Id: 2, Name: 'B'}},
      {Label: 'First duplicate', Value: {Name: 'A', Id: 1}},
      {Label: 'Primitive', Value: 3}
    ] as FieldOptionModel[];

    it('keeps object values as objects by default', () => {
      const result = service.convertedFieldOptionsValues(options);
      expect(result.map(el => el.Value)).toEqual([{Name: 'A', Id: 1}, {Id: 2, Name: 'B'}, 3]);
      expect(result[0].Label).toBe('First duplicate');
    });

    it('serializes object values when requested', () => {
      const result = service.convertedFieldOptionsValues(options, true);
      expect(typeof result[0].Value).toBe('string');
      expect(result[result.length - 1].Value).toBe(3);
    });
  });

  describe('getGroupedFieldOptions', () => {
    it('keeps raw values for ungrouped options', () => {
      const value = {Id: 1};
      const result = service.getGroupedFieldOptions([{Label: 'A', Value: value} as FieldOptionModel]);
      expect((result[0] as FieldOptionModel).Value).toBe(value);
    });

    it('keeps raw values for grouped options', () => {
      const value = {Id: 1};
      const result = service.getGroupedFieldOptions([
        {Label: 'A', Value: value, Category: 'Cat'} as FieldOptionModel
      ]) as GroupResult[];
      expect(result[0].options[0].Value).toBe(value);
    });
  });

  describe('legacy JSON string values for static options', () => {
    const objectValue = {Id: 1, Name: 'A'};
    const options = [
      {Label: 'A', Value: objectValue},
      {Label: 'B', Value: {Id: 2, Name: 'B'}}
    ] as FieldOptionModel[];

    it('resolves a stored JSON string to the matching option object (DropDown)', () => {
      const el = {Name: 'dd', FieldType: FieldTypeEnum.DropDown, FieldOptions: options} as FormGeneratorElModel;
      expect(service.generateValue(el, '{"Name":"A","Id":1}')).toBe(objectValue);
    });

    it('resolves stored JSON strings inside arrays (MultiSelectDropdown)', () => {
      const el = {Name: 'ms', FieldType: FieldTypeEnum.MultiSelectDropdown, FieldOptions: options} as FormGeneratorElModel;
      expect(service.generateValue(el, ['{"Id":1,"Name":"A"}', objectValue])).toEqual([objectValue, objectValue]);
    });

    it('leaves non-matching, non-JSON and primitive-option values untouched', () => {
      expect(service.resolveLegacyStringOptionValue(options, '{"Id":3}')).toBe('{"Id":3}');
      expect(service.resolveLegacyStringOptionValue(options, '$DCP-FirstOption')).toBe('$DCP-FirstOption');
      const primitive = [{Label: 'One', Value: '1'}] as FieldOptionModel[];
      expect(service.resolveLegacyStringOptionValue(primitive, '1')).toBe('1');
    });
  });
});


