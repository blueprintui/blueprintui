import schema from '../../../../packages/components/.drafter/schema.json' with { type: 'json' };

export const data = {
  title: 'Input Group',
  schema: schema.find(c => c.name === 'input-group')
}

export function render() {
  return /* html */``;
}
