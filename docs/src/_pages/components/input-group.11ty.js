import schema from '../../../../packages/components/dist/drafter/schema.json' assert { type: 'json' };

export const data = {
  title: 'Input Group',
  schema: schema.find(c => c.name === 'input-group')
}

export function render() {
  return /* html */``;
}
