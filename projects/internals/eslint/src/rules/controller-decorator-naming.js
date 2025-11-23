/**
 * Rule: controller-decorator-naming
 * Controller decorators should follow the naming pattern @[category][Name]<T>()
 * where category is: state, type, interaction, or i18n.
 */
const validPrefixes = ['state', 'type', 'interaction', 'i18n', 'keynav', 'ariaMenu', 'dynamicControllers'];

// Known controller decorator names from BlueprintUI
const knownControllers = [
  'stateDisabled', 'stateChecked', 'stateExpanded', 'stateReadonly', 'stateSelected', 'stateActive', 'statePressed', 'stateScrollLock', 'stateDirection', 'stateTextContent',
  'typeButton', 'typeAnchor', 'typeClosable', 'typeGroup', 'typeMenu', 'typePopover', 'typeNavigation', 'typeRegion', 'typeCommandTrigger', 'typePopoverTrigger', 'typeFormRadio', 'typeFormCheckbox', 'typeMultiselectable',
  'interactionClick', 'interactionTouch', 'interactionResponsive', 'interactionSelect', 'interactionExpand', 'interactionRangeSelection', 'interactionTextChange', 'interactionResizeContext',
  'i18n', 'keynav', 'ariaMenu', 'dynamicControllers'
];

export default {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce naming convention for controller decorators',
      category: 'Stylistic Issues'
    },
    schema: [
      {
        type: 'object',
        properties: {
          additionalControllers: {
            type: 'array',
            items: { type: 'string' }
          }
        },
        additionalProperties: false
      }
    ]
  },
  create(context) {
    const additionalControllers = context.options[0]?.additionalControllers || [];
    const allKnownControllers = [...knownControllers, ...additionalControllers];

    return {
      'ClassDeclaration > Decorator'(node) {
        // Get the decorator name
        let decoratorName = null;

        if (node.expression.type === 'CallExpression') {
          decoratorName = node.expression.callee?.name;
        } else if (node.expression.type === 'Identifier') {
          decoratorName = node.expression.name;
        }

        if (!decoratorName) return;

        // Skip known non-controller decorators
        const nonControllerDecorators = ['customElement', 'property', 'state', 'query', 'queryAll', 'eventOptions'];
        if (nonControllerDecorators.includes(decoratorName)) return;

        // Check if it looks like a controller decorator (starts with lowercase and is on class)
        if (decoratorName[0] === decoratorName[0].toLowerCase()) {
          const hasValidPrefix = validPrefixes.some(prefix => decoratorName.startsWith(prefix));
          const isKnown = allKnownControllers.includes(decoratorName);

          if (!hasValidPrefix && !isKnown) {
            // Only warn if it looks like it might be a controller (has generic type or matches pattern)
            const sourceCode = context.sourceCode || context.getSourceCode();
            const text = sourceCode.getText(node);

            // Check if it has a generic type argument like <BpButton>
            if (text.includes('<') && text.includes('>')) {
              context.report({
                node,
                message: `Controller decorator '${decoratorName}' should follow naming convention: @[state|type|interaction|i18n][Name]<T>()`
              });
            }
          }
        }
      }
    };
  }
};
