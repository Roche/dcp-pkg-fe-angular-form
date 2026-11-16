import { MOCK_TIME_RANGE_TAG, MockDcpTimeRangeElement, registerMockDcpTimeRange } from './dcp-time-range.mock';

describe('MockDcpTimeRangeElement', () => {
  let element: MockDcpTimeRangeElement;

  const inputs = () => Array.from(element.querySelectorAll('input')) as HTMLInputElement[];
  const change = (start: string, end: string) => {
    const [startInput, endInput] = inputs();
    startInput.value = start;
    endInput.value = end;
    endInput.dispatchEvent(new Event('change', {bubbles: true}));
  };

  beforeAll(() => registerMockDcpTimeRange());

  beforeEach(() => {
    element = document.createElement(MOCK_TIME_RANGE_TAG) as MockDcpTimeRangeElement;
    element.timeRange = {StartTime: '2026-07-20T08:00:00.000Z', EndTime: '2026-07-20T10:00:00.000Z'};
    element.placeholder = 'Maintenance Window';
    element.timezone = 'Europe/Sofia';
    document.body.append(element);
  });

  afterEach(() => element.remove());

  it('registers only once', () => {
    expect(() => registerMockDcpTimeRange()).not.toThrow();
    expect(customElements.get(MOCK_TIME_RANGE_TAG)).toBe(MockDcpTimeRangeElement);
  });

  it('renders initial values, label, and demo note', () => {
    expect(inputs().map(i => i.value)).toEqual(['2026-07-20T08:00', '2026-07-20T10:00']);
    expect(element.querySelector('legend')?.textContent).toBe('Maintenance Window');
    expect(element.textContent).toContain('Europe/Sofia');
    expect(element.textContent).toContain('not applied');
  });

  it('updates inputs when timeRange is set after connection', () => {
    element.timeRange = {StartTime: '2026-01-01T00:00:00.000Z', EndTime: '2026-01-02T00:00:00.000Z'};
    expect(inputs().map(i => i.value)).toEqual(['2026-01-01T00:00', '2026-01-02T00:00']);
  });

  it('emits timeRangeChange with ISO values on valid edits', () => {
    const listener = jest.fn();
    element.addEventListener('timeRangeChange', listener);

    change('2026-07-21T09:30', '2026-07-21T11:00');

    expect(listener).toHaveBeenCalledTimes(1);
    expect((listener.mock.calls[0][0] as CustomEvent).detail).toEqual({
      StartTime: '2026-07-21T09:30:00.000Z',
      EndTime: '2026-07-21T11:00:00.000Z'
    });
    expect(element.querySelector('[role="alert"]')?.textContent).toBe('');
  });

  it('shows an error and does not emit for invalid ranges', () => {
    const listener = jest.fn();
    element.addEventListener('timeRangeChange', listener);

    change('2026-07-21T12:00', '2026-07-21T11:00');
    expect(element.querySelector('[role="alert"]')?.textContent).toContain('before');

    change('', '2026-07-21T11:00');
    expect(element.querySelector('[role="alert"]')?.textContent).toContain('valid');

    expect(listener).not.toHaveBeenCalled();
    expect(inputs()[0].getAttribute('aria-invalid')).toBe('true');
  });

  it('stops listening after disconnect and resumes on reconnect', () => {
    const listener = jest.fn();
    element.addEventListener('timeRangeChange', listener);

    element.remove();
    change('2026-07-21T09:00', '2026-07-21T10:00');
    expect(listener).not.toHaveBeenCalled();

    document.body.append(element);
    change('2026-07-21T09:00', '2026-07-21T10:00');
    expect(listener).toHaveBeenCalledTimes(1);
  });
});
