import { delay, http, HttpResponse } from 'msw';
import { FieldOptionModel } from '../../lib/form-generator/form-generator.model';
import { option } from './field-story-helpers';

/**
 * Shared sample data for stories demonstrating object option values.
 *
 * Option values are plain objects. Preselected values are always NEW object instances
 * (often with a different key order) to demonstrate that selection works by content
 * (deep equality via `compareWith`) and not by reference.
 */

export const siteOptions: FieldOptionModel[] = [
  option('Basel', { id: 1, code: 'BSL', country: 'CH' }),
  option('Kaiseraugst', { id: 2, code: 'KAU', country: 'CH' }),
  option('Penzberg', { id: 3, code: 'PZB', country: 'DE' }),
  option('Mannheim', { id: 4, code: 'MHM', country: 'DE' }),
  option('South San Francisco', { id: 5, code: 'SSF', country: 'US' })
];

export const groupedSiteOptions: FieldOptionModel[] = [
  option('Basel', { id: 1, code: 'BSL', country: 'CH' }, 'Switzerland'),
  option('Kaiseraugst', { id: 2, code: 'KAU', country: 'CH' }, 'Switzerland'),
  option('Penzberg', { id: 3, code: 'PZB', country: 'DE' }, 'Germany'),
  option('Mannheim', { id: 4, code: 'MHM', country: 'DE' }, 'Germany'),
  option('South San Francisco', { id: 5, code: 'SSF', country: 'US' }, 'United States')
];

/** Nested object values - deep equality is applied on all levels. */
export const productOptions: FieldOptionModel[] = [
  option('Atezolizumab IV', { product: { id: 'ATZ', name: 'Atezolizumab' }, route: 'IV', strengths: [840, 1200] }),
  option('Atezolizumab SC', { product: { id: 'ATZ', name: 'Atezolizumab' }, route: 'SC', strengths: [1875] }),
  option('Pertuzumab IV', { product: { id: 'PTZ', name: 'Pertuzumab' }, route: 'IV', strengths: [420] })
];

/** New instances with different key order than the options above. */
export const preselectedBasel = { country: 'CH', code: 'BSL', id: 1 };
export const preselectedMannheim = { code: 'MHM', id: 4, country: 'DE' };
export const preselectedAtezolizumabSc = { route: 'SC', strengths: [1875], product: { name: 'Atezolizumab', id: 'ATZ' } };

export const OBJECT_SITES_URL = 'https://demo.dev/object-values/sites';
export const OBJECT_LINES_URL = 'https://demo.dev/object-values/lines';

/** FieldSettings shortcut used by the object value stories. */
export const objectFieldSettings = (
  DefaultValue: any = null,
  overrides: { DataUrl?: string | null; IsReadOnly?: boolean } = {}
) => ({
  DefaultValue,
  StepSize: 0,
  DataUrl: overrides.DataUrl ?? null,
  IsRepeatable: false,
  IsReadOnly: overrides.IsReadOnly ?? false
});

/**
 * MSW handlers returning options with object values:
 * - `OBJECT_SITES_URL` - list of sites
 * - `OBJECT_LINES_URL?site=<json>` - production lines for a selected site object
 */
export const objectValueMswParameters = {
  msw: {
    handlers: [
      http.get(OBJECT_SITES_URL, async () => {
        await delay(600);
        // Fresh objects on every response - never the same reference as the default value
        return HttpResponse.json(JSON.parse(JSON.stringify(siteOptions)));
      }),
      http.get(OBJECT_LINES_URL, async ({ request }) => {
        await delay(600);
        const siteParam = new URL(request.url).searchParams.get('site');
        let siteCode: string | undefined;
        try {
          siteCode = siteParam ? JSON.parse(siteParam)?.code : undefined;
        } catch {
          siteCode = undefined;
        }
        if (!siteCode) {
          return HttpResponse.json([]);
        }
        return HttpResponse.json([
          option(`${siteCode} - Line 1`, { siteCode, line: 1 }),
          option(`${siteCode} - Line 2`, { siteCode, line: 2 }),
          option(`${siteCode} - Line 3`, { siteCode, line: 3 })
        ]);
      })
    ]
  }
};



