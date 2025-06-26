import { FormQueryUpdate } from './FormQueryHook';

export function meta() {
  return [{ title: 'Call Api Update Form' }, { name: 'description', content: 'CallApiUpdateForm' }];
}

export default function CallApiUpdateForm() {
  return (
    <div>
      <FormQueryUpdate />
    </div>
  );
}
