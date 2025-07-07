import { useTranslation } from 'react-i18next';
import { metaAdmin } from '~/lib/utils';
import { UserTable } from '~/components/features/admin/users/UserTable';
import { lazy } from 'react';
import { LoadingSuspense } from '~/components/common/Loading';

export const meta = () => metaAdmin('User List');

export default function UserListPage() {
  return (
    <LoadingSuspense>
      <UserListLazy />
    </LoadingSuspense>
  );
}

const UserListLazy = lazy(() => Promise.resolve({ default: UserListComponent }));

function UserListComponent() {
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
