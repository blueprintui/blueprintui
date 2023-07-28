export default function (
  /** @type {import('plop').NodePlopAPI} */
  plop
) {
  plop.setGenerator('element', {
    description: 'create element',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'element tag name please'
      }
    ],
    actions: [
      ...[
        'element.css',
        'element.examples.js',
        'element.performance.ts',
        'element.spec.ts',
        'element.ts',
        'element.visual.ts',
        'index.ts'
      ].map(path => {
        return {
          type: 'add',
          path: `${process.cwd()}/src/{{name}}/${path}`,
          templateFile: `./templates/element/${path}.hbs`
        };
      }),
      {
        type: 'add',
        path: `${process.cwd()}/src/include/{{name}}.ts`,
        templateFile: `./templates/element/include.hbs`
      }
    ]
  });
}
