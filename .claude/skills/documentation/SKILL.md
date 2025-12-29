---
description: Documentation Authoring Guidance and Best Practices
globs: src/**/*.11ty.js,src/**/*.examples.js
alwaysApply: true
---

# Web Component Documentation

## Project Overview

This is a web component library documentation site built with 11ty (Eleventy). The site uses 11ty.js files that render content via markdown syntax to create comprehensive documentation for web components.

## 11ty files

Follow other existing component documentation `*.11ty.js` file formats.

## Writing Style Guidelines

### Tone and Voice

- Use clear, concise language
- Write in present tense
- Use active voice when possible
- Be helpful and instructional, not prescriptive
- Assume developers have basic web development knowledge

### Technical Writing Best Practices

- Start with the most common use case
- Progress from simple to complex examples
- Explain the "why" behind design decisions
- Include troubleshooting sections for complex components
- Cross-reference related components and patterns

### Code Quality in Examples

- Use semantic HTML
- Follow accessibility best practices

### Cross-References

- Link to related components
- Reference design system principles
- Connect to accessibility guidelines
- Point to relevant external resources

## element.examples.js Files

Each component requires an `element.examples.js` file for live documentation examples.

### Required File Format

```javascript
export const metadata = {
  name: 'component-name', // matches folder name, no 'bp-' prefix
  elements: ['bp-component', 'bp-related-component'] // all elements used
};

export function example() {
  return /* html */ `
    <script type="module">
      import '@blueprintui/components/include/component.js';
    </script>
    <bp-component>basic usage</bp-component>
  `;
}

export function variantName() {
  return /* html */ `
    <script type="module">
      import '@blueprintui/components/include/component.js';
    </script>
    <bp-component variant="name">variant example</bp-component>
  `;
}
```

### Documentation Coverage Requirements

Every component documentation must include:

1. **Basic Usage** - Simple, minimal example (function name: `example`)
2. **All Variants and States** - Separate functions for each variant (status, size, type), disabled, readonly, loading states
3. **Accessibility Patterns** - `aria-label` examples, proper `<label>` elements for form controls
4. **Form Integration** (for form components) - Usage within `<form>`, validation states, `name`/`value` attributes
5. **Slots and Composition** - Document all named slots with examples
6. **Interactive Examples** - Event handling where relevant

### Style Guidelines

1. **Imports**: Always include script import in each example function
2. **HTML Template Tag**: Use `/* html */` comment for syntax highlighting
3. **Function Names**: Use descriptive camelCase (e.g., `statusError`, `withIcon`, `formValidation`)
4. **Self-Contained**: Each example should be runnable independently
5. **Realistic Content**: Use realistic placeholder content, not "lorem ipsum"

### Example Patterns

```javascript
// Status variant
export function statusSuccess() {
  return /* html */ `
    <script type="module">
      import '@blueprintui/components/include/alert.js';
    </script>
    <bp-alert status="success">Operation completed successfully</bp-alert>
  `;
}

// Form integration
export function formValidation() {
  return /* html */ `
    <script type="module">
      import '@blueprintui/components/include/input.js';
      import '@blueprintui/components/include/button.js';
    </script>
    <form>
      <bp-field>
        <label>Email</label>
        <bp-input type="email" name="email" required></bp-input>
        <bp-field-message status="error">Please enter a valid email</bp-field-message>
      </bp-field>
      <bp-button type="submit">Submit</bp-button>
    </form>
  `;
}

// Accessibility
export function accessibility() {
  return /* html */ `
    <script type="module">
      import '@blueprintui/components/include/button.js';
    </script>
    <bp-button aria-label="Close dialog" aria-describedby="close-desc">
      <bp-icon shape="close"></bp-icon>
    </bp-button>
    <span id="close-desc" hidden>Closes the current dialog</span>
  `;
}
```

### Quality Checklist

- [ ] All properties from element.ts have corresponding examples
- [ ] All status/variant values are demonstrated
- [ ] Disabled and readonly states shown (if applicable)
- [ ] Accessibility attributes properly demonstrated
- [ ] Form integration shown (for form components)
- [ ] All slots documented with examples
- [ ] metadata.elements includes all component tags used
- [ ] Each example includes its own script import
