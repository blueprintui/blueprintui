export const styles = /* css */ `
@layer blueprintui {
  @layer text {
    :root,
    [bp-theme] {
      color-scheme: var(--bp-color-scheme, normal);
    }

    [bp-theme] body {
      --background: var(--bp-layer-background-100);
      background: var(--background);
    }

    [bp-text] {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      --min-size: 0.9;
      --max-size: 1;
      --font-size: var(--bp-text-size-300, 16px);
      --font-weight: var(--bp-text-weight-regular, 400);
      --line-height: 1.2;
      --capsize-bottom: -0.2095em;
      --capsize-top: -0.1475em;
      --text-decoration: initial;
      --text-decoration-thickness: initial;
      font-family: var(--bp-text-font, 'system-ui', 'Avenir Next', 'Helvetica Neue', Helvetica, Arial, sans-serif);
      font-weight: var(--font-weight);
      font-size: clamp(var(--font-size) * var(--min-size), 4vw, var(--font-size) * var(--max-size)) !important;
      line-height: var(--line-height);
      text-decoration: var(--text-decoration);
      text-decoration-thickness: var(--text-decoration-thickness);
      color: inherit;
      margin: 0;
      width: 100%;
    }

    [bp-text~='banner'],
    [bp-text~='heading'],
    [bp-text~='subheading'],
    [bp-text~='section'],
    [bp-text~='subsection'],
    [bp-text~='caption'],
    [bp-text~='message'],
    [bp-text~='content'],
    [bp-text~='list'] {
      &:not(body):not([bp-text~='contrast:none']) {
        color: var(--bp-text-contrast, var(--background, #fff));
        filter: invert(100%) contrast(999) grayscale(100%);
      }

      /* https://seek-oss.github.io/capsize/ */
      &::before {
        content: '';
        margin-bottom: var(--capsize-bottom);
        display: table;
      }

      &::after {
        content: '';
        margin-top: var(--capsize-top);
        display: table;
      }
    }

    [bp-text~='banner'] {
      --font-weight: var(--bp-text-weight-light, 300);
      --font-size: var(--bp-text-size-800, 48px);
    }

    [bp-text~='heading'] {
      --font-weight: var(--bp-text-weight-light, 300);
      --font-size: var(--bp-text-size-700, 36px);
    }

    [bp-text~='subheading'] {
      --font-weight: var(--bp-text-weight-light, 300);
      --font-size: var(--bp-text-size-600, 32px);
    }

    [bp-text~='section'] {
      --font-weight: var(--bp-text-weight-light);
      --font-size: var(--bp-text-size-500, 24px);
    }

    [bp-text~='subsection'] {
      --font-weight: var(--bp-text-weight-light, 300);
      --font-size: var(--bp-text-size-400, 20px);
    }

    [bp-text~='content'] {
      --font-size: var(--bp-text-size-300, 16px);
      --line-height: 1.4em;
    }

    [bp-text~='message'] {
      --font-size: var(--bp-text-size-200, 14px);
      --line-height: 1.4em;
    }

    [bp-text~='caption'] {
      --font-size: var(--bp-text-size-100, 12px);
      --line-height: 1.4em;
    }

    [bp-text~='code'] {
      background: var(--bp-object-opacity-200, hsla(222, 7%, 46%, 0));
      padding: var(--bp-size-300);
      font-family: var(--bp-text-monospace-font, 'ui-monospace', Consolas, Menlo, Monaco, monospace);
    }

    [bp-text~='code:block'] {
      color: var(--bp-text-color-500, #fff);
      font-family: var(--bp-text-monospace-font, 'ui-monospace', Consolas, Menlo, Monaco, monospace);
      padding: var(--bp-size-600, 16px);
      background: var(--bp-layer-background-200, #fff);
      box-shadow: var(--bp-object-shadow-100, 0 2px 2px hsla(0, 0%, 0%, 0.2));
      border: var(--bp-object-border-width-100, 1px) solid var(--bp-object-border-color-100, #eff1f5);
      border-radius: var(--bp-object-border-radius-100, 4px);
      display: flex;
      width: 100%;
      overflow: auto;
      margin: 0 !important; /* override prism */
    }

    [bp-text~='link'] {
      --font-size: inherit;
      --font-weight: inherit;
      --text-decoration: underline;
      --text-decoration-thickness: 1px;
    }

    [bp-text~='start'] {
      text-align: start;
    }

    [bp-text~='end'] {
      text-align: end;
    }

    [bp-text~='center'] {
      text-align: center;
    }

    [bp-text~='capitalize'] {
      text-transform: capitalize;
    }

    [bp-text~='uppercase'] {
      text-transform: uppercase;
    }

    [bp-text~='lowercase'] {
      text-transform: lowercase;
    }

    [bp-text~='bold'] {
      font-weight: var(--bp-text-weight-bold, 600);
    }

    [bp-text~='italic'] {
      font-style: italic;
    }

    [bp-text~='fill'] {
      --max-size: 100;
    }

    [bp-text~='size:static'] {
      --min-size: 1;
      --max-size: 1;
    }

    [bp-text~='size:sm'] {
      --max-size: 0.8;
    }

    [bp-text~='size:lg'] {
      --max-size: 1.2;
    }

    [bp-text~='list'] {
      display: flex;
      margin: 0;
      gap: 12px;
      padding: 0;
      flex-direction: column;
      list-style-position: inside;
    }

    [bp-text~='list'] > * {
      display: list-item;
    }
  }
}
`;
