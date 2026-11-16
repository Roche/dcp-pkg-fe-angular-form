import { http, HttpResponse } from 'msw';
import {
  buildAggregatedResult,
  buildMockTable,
  buildRdbmsOptions,
  buildTimeOptions,
  STORYBOOK_MOCK_API
} from './storybook-mock-api.data';

/**
 * Shared MSW handlers for the Storybook-only mock API. Registered as initial handlers in
 * `.storybook/preview.ts`, so they stay active alongside any story-level `msw.handlers`.
 */
export const storybookMockApiHandlers = [
  http.get(`${STORYBOOK_MOCK_API}/tph/assessment/form/options/rdbms`, ({ request }) => {
    const options = buildRdbmsOptions(request.url);
    return options
      ? HttpResponse.json(options)
      : HttpResponse.json({ message: 'Unknown mock rdbms table' }, { status: 404 });
  }),
  http.get(`${STORYBOOK_MOCK_API}/tph/assessment/form/options/time`, ({ request }) =>
    HttpResponse.json(buildTimeOptions(request.url))
  ),
  http.get(`${STORYBOOK_MOCK_API}/tph/assessment/form/options/table`, ({ request }) =>
    HttpResponse.json(buildMockTable(request.url))
  ),
  http.get(`${STORYBOOK_MOCK_API}/tph/assessment/form/result/aggregated`, () =>
    HttpResponse.json(buildAggregatedResult())
  ),
  // Unmatched mock-API requests fail loudly instead of reaching the network.
  http.all(`${STORYBOOK_MOCK_API}/*`, ({ request }) =>
    HttpResponse.json({ message: `No Storybook mock for ${new URL(request.url).pathname}` }, { status: 404 })
  )
];
