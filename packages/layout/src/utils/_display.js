import { layout, bpWidthSmStatic, bpWidthMdStatic, bpWidthLgStatic, bpWidthXlStatic } from './_tokens.js';
import { container } from './mixins.js';

function generateDisplay(breakpoint = '') {
  return /* css */ `
  [${layout}~='display:none@${breakpoint}'] {
    display: none !important;
  }

  [${layout}~='display:flex@${breakpoint}'] {
    display: flex !important;
  }

  [${layout}~='display:block@${breakpoint}'] {
    display: block !important;
  }

  [${layout}~='display:inline@${breakpoint}'] {
    display: inline !important;
  }
  `;
}

export const display = /* css */ `
[${layout}~='display:none'] {
  display: none !important;
}

[${layout}~='display:flex'] {
  display: flex !important;
}

[${layout}~='display:contents'] {
  display: contents !important;
}

[${layout}~='display:block'] {
  display: block !important;
}

[${layout}~='display:inline'] {
  display: inline !important;
}

${container(bpWidthSmStatic, `${generateDisplay('sm')}`)}
${container(bpWidthMdStatic, `${generateDisplay('md')}`)}
${container(bpWidthLgStatic, `${generateDisplay('lg')}`)}
${container(bpWidthXlStatic, `${generateDisplay('xl')}`)}

[${layout}~='display:sr'] {
  position: absolute !important;
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(50%);
  padding: 0;
  border: 0;
  height: 1px;
  width: 1px;
  overflow: hidden;
  white-space: nowrap;
  top: 0;
  left: 0;
  display: block !important;
}
`;
