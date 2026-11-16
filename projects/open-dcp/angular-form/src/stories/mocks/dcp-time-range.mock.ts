/**
 * Storybook-only stand-in for the externally hosted `dcp-time-range` web component.
 *
 * Synthetic demo UI: it edits a start/end range in UTC and emits `timeRangeChange` with ISO strings,
 * mirroring the contract used by `odcp-fg-time-range`. It does NOT reproduce the real widget
 * (no presets, localisation, or timezone conversion). Never export it from the library.
 */
export interface MockTimeRange {
  StartTime: string;
  EndTime: string;
}

export const MOCK_TIME_RANGE_TAG = 'dcp-time-range';

const toInputValue = (iso: string | undefined | null): string => {
  const date = iso ? new Date(iso) : null;
  return date && !Number.isNaN(date.getTime()) ? date.toISOString().slice(0, 16) : '';
};

const fromInputValue = (value: string): string | null => {
  const date = value ? new Date(`${value}Z`) : null;
  return date && !Number.isNaN(date.getTime()) ? date.toISOString() : null;
};

export class MockDcpTimeRangeElement extends HTMLElement {
  private _timeRange: MockTimeRange | null = null;
  private _placeholder = '';
  private _language: string | null = null;
  private _timezone = 'UTC';

  private labelEl: HTMLElement | null = null;
  private startInput: HTMLInputElement | null = null;
  private endInput: HTMLInputElement | null = null;
  private noteEl: HTMLElement | null = null;
  private errorEl: HTMLElement | null = null;

  private readonly onChange = () => this.emitIfValid();

  get timeRange(): MockTimeRange | null {
    return this._timeRange;
  }

  set timeRange(value: MockTimeRange | null) {
    this._timeRange = value;
    this.syncInputs();
  }

  get placeholder(): string {
    return this._placeholder;
  }

  set placeholder(value: string) {
    this._placeholder = value ?? '';
    this.syncText();
  }

  get language(): string | null {
    return this._language;
  }

  set language(value: string | null) {
    this._language = value;
    this.syncText();
  }

  get timezone(): string {
    return this._timezone;
  }

  set timezone(value: string) {
    this._timezone = value || 'UTC';
    this.syncText();
  }

  connectedCallback() {
    if (!this.startInput) {
      this.render();
    }
    this.addEventListener('change', this.onChange);
    this.syncText();
    this.syncInputs();
  }

  disconnectedCallback() {
    this.removeEventListener('change', this.onChange);
  }

  private render() {
    const wrapper = document.createElement('fieldset');
    wrapper.style.cssText = 'border:1px dashed #9ca3af; border-radius:8px; padding:8px 12px; display:flex; flex-wrap:wrap; gap:12px; align-items:flex-end;';

    this.labelEl = document.createElement('legend');
    this.startInput = this.createInput(wrapper, 'Start (UTC)', 'start');
    this.endInput = this.createInput(wrapper, 'End (UTC)', 'end');

    this.errorEl = document.createElement('div');
    this.errorEl.setAttribute('role', 'alert');
    this.errorEl.style.cssText = 'color:#dc2626; width:100%;';

    this.noteEl = document.createElement('small');
    this.noteEl.style.cssText = 'color:#6b7280; width:100%;';

    wrapper.prepend(this.labelEl);
    wrapper.append(this.errorEl, this.noteEl);
    this.replaceChildren(wrapper);
  }

  private createInput(parent: HTMLElement, labelText: string, name: string): HTMLInputElement {
    const label = document.createElement('label');
    label.style.cssText = 'display:flex; flex-direction:column; gap:4px;';
    label.textContent = labelText;
    const input = document.createElement('input');
    input.type = 'datetime-local';
    input.name = name;
    label.append(input);
    parent.append(label);
    return input;
  }

  private syncText() {
    if (this.labelEl) {
      this.labelEl.textContent = this._placeholder || 'Time range';
    }
    if (this.noteEl) {
      this.noteEl.textContent = `Storybook demo widget - times are edited in UTC; timezone "${this._timezone}"`
        + ` and language "${this._language ?? 'n/a'}" are displayed only, not applied.`;
    }
  }

  private syncInputs() {
    if (!this.startInput || !this.endInput) {
      return;
    }
    this.startInput.value = toInputValue(this._timeRange?.StartTime);
    this.endInput.value = toInputValue(this._timeRange?.EndTime);
    this.setError('');
  }

  private setError(message: string) {
    if (this.errorEl) {
      this.errorEl.textContent = message;
    }
    this.startInput?.setAttribute('aria-invalid', String(!!message));
    this.endInput?.setAttribute('aria-invalid', String(!!message));
  }

  private emitIfValid() {
    const start = fromInputValue(this.startInput?.value ?? '');
    const end = fromInputValue(this.endInput?.value ?? '');

    if (!start || !end) {
      this.setError('Both start and end must be valid dates.');
      return;
    }
    if (new Date(start) > new Date(end)) {
      this.setError('Start must be before or equal to end.');
      return;
    }

    this.setError('');
    this._timeRange = { StartTime: start, EndTime: end };
    this.dispatchEvent(new CustomEvent<MockTimeRange>('timeRangeChange', { detail: { ...this._timeRange } }));
  }
}

export const registerMockDcpTimeRange = (registry: CustomElementRegistry = customElements) => {
  if (!registry.get(MOCK_TIME_RANGE_TAG)) {
    registry.define(MOCK_TIME_RANGE_TAG, MockDcpTimeRangeElement);
  }
};
