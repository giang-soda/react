import { UsersTable } from '~/components/features/users/UsersTable';
import { useTranslation } from 'react-i18next';
import { metaCommon } from '~/lib/utils';

export const meta = () => metaCommon('User List');

export default function UserList() {
  const { t } = useTranslation('users');

  return (
    <div>
      <div className="mb-2 flex items-center justify-between space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">{t('list.title')}</h1>
      </div>

      <UsersTable />
    </div>
  );
}
