import { useTranslation } from 'react-i18next';
import UserTable from '~/components/features/admin/users/UserTable';

export default function UserListClient() {
  const { t } = useTranslation('users');

  return (
    <div>
      <div className="mb-2 flex items-center justify-between space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">{t('list.title')}</h1>
      </div>
      <UserTable />
    </div>
  );
}
