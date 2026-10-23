import '@testing-library/jest-dom';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { createDOMRenderer, RendererProvider } from '@fluentui/react-components';
import { App } from './App';
import { AppProvider } from './providers/appProvider/AppProvider';

let media: MediaQueryList;
let updateMedia: (() => void) | undefined;

beforeEach(() => {
  updateMedia = undefined;
  const addEventListener = jest.fn();
  addEventListener.mockImplementation((_: string, listener: () => void) => {
    updateMedia = listener;
  });
  media = {
    matches: false,
    media: '(max-width: 640px)',
    onchange: null,
    addEventListener,
    removeEventListener: jest.fn(),
    addListener: jest.fn(),
    removeListener: jest.fn(),
    dispatchEvent: jest.fn(),
  };
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    value: jest.fn((query: string) => query === media.media ? media : {
      ...media,
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }),
  });
  Object.defineProperty(window, 'ResizeObserver', {
    configurable: true,
    value: jest.fn(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    })),
  });
});

const renderApp = () => {
  return render(
    <RendererProvider renderer={createDOMRenderer(document, {
      // CRA's jsdom selector engine crashes when evaluating Fluent's :focus-within rules.
      // These tests cover control behavior; the browser retains all focus styles.
      unstable_filterCSSRule: (rule) => !rule.includes(':focus-within'),
    })}>
      <AppProvider isLightTheme={true}><App /></AppProvider>
    </RendererProvider>
  );
};

test.each(['Original (Flexbox)', 'Alternative (Grid)'])(
  '%s adds and removes visible cards with the Fluent buttons', (implementation) => {
  renderApp();
  fireEvent.click(screen.getByRole('radio', { name: implementation }));
  const preview = screen.getByRole('region', { name: 'Card preview' });
  const count = within(screen.getByRole('group', { name: 'Visible cards' }));
  expect(within(preview).getAllByText(/^Card \d+$/)).toHaveLength(10);
  expect(screen.getByRole('radio', { name: 'Static' })).toBeChecked();

  fireEvent.click(count.getByRole('button', { name: 'Decrease card' }));
  expect(within(preview).getAllByText(/^Card \d+$/)).toHaveLength(9);
  expect(count.getByRole('status', { name: 'Card count' })).toHaveTextContent('9');

  fireEvent.click(count.getByRole('button', { name: 'Increase card' }));
  expect(within(preview).getAllByText(/^Card \d+$/)).toHaveLength(10);
});

test.each(['Original (Flexbox)', 'Alternative (Grid)'])(
  '%s changes reflow modes and handles zero cards in controlled mode', (implementation) => {
  renderApp();
  fireEvent.click(screen.getByRole('radio', { name: implementation }));
  const group = screen.getByRole('radiogroup', { name: 'Reflow Options' });
  const dynamic = within(group).getByRole('radio', { name: 'Dynamic' });
  const controlled = within(group).getByRole('radio', { name: 'Controlled' });
  fireEvent.click(dynamic);
  expect(dynamic).toBeChecked();
  fireEvent.click(controlled);
  expect(controlled).toBeChecked();

  const count = within(screen.getByRole('group', { name: 'Visible cards' }));
  const remove = count.getByRole('button', { name: 'Decrease card' });
  for (let i = 0; i < 10; i += 1) fireEvent.click(remove);
  const preview = screen.getByRole('region', { name: 'Card preview' });
  expect(within(preview).queryAllByText(/^Card \d+$/)).toHaveLength(0);
  expect(remove).toBeDisabled();

  fireEvent.click(count.getByRole('button', { name: 'Increase card' }));
  expect(within(preview).getAllByText(/^Card \d+$/)).toHaveLength(1);
});

test('preserves comparison settings when switching implementations', () => {
  renderApp();
  const preview = screen.getByRole('region', { name: 'Card preview' });
  const count = within(screen.getByRole('group', { name: 'Visible cards' }));
  const rowLimit = within(screen.getByRole('group', { name: 'Max cards per row' }));
  fireEvent.click(screen.getByRole('radio', { name: 'Controlled' }));
  fireEvent.change(screen.getByRole('slider', { name: 'Container width adjuster' }), {
    target: { value: '40' }
  });
  fireEvent.click(count.getByRole('button', { name: 'Decrease card' }));
  fireEvent.click(rowLimit.getByRole('button', { name: 'Decrease card' }));

  for (const implementation of ['Alternative (Grid)', 'Original (Flexbox)']) {
    fireEvent.click(screen.getByRole('radio', { name: implementation }));
    expect(screen.getByRole('radio', { name: implementation })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Controlled' })).toBeChecked();
    expect(preview).toHaveStyle({ width: '40%' });
    expect(within(preview).getAllByText(/^Card \d+$/)).toHaveLength(9);
    expect(rowLimit.getByRole('status', { name: 'Card count' })).toHaveTextContent('4');
  }
});

test('updates the container width and clamps the slider after a mobile resize', () => {
  const { unmount } = renderApp();
  const slider = screen.getByRole('slider', { name: 'Container width adjuster' });
  const preview = screen.getByRole('region', { name: 'Card preview' });
  expect(slider).toHaveAttribute('min', '7');
  fireEvent.change(slider, { target: { value: '40' } });
  expect(preview).toHaveStyle({ width: '40%' });
  expect(slider).toHaveAttribute('aria-valuetext', '40 percent');
  fireEvent.change(slider, { target: { value: '7' } });

  act(() => {
    Object.defineProperty(media, 'matches', { value: true });
    updateMedia?.();
  });
  expect(slider).toHaveAttribute('min', '20');
  expect(slider).toHaveValue('20');
  expect(preview).toHaveStyle({ width: '20%' });
  const listener = updateMedia;
  unmount();
  expect(media.removeEventListener).toHaveBeenCalledWith('change', listener);
});
