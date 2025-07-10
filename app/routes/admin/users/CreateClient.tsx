import { UserCreateForm } from '~/components/features/admin/users/UserCreateForm';
import { useTranslation } from 'react-i18next';
import { metaAdmin } from '~/lib/utils';
import { Button } from '~/components/ui/button';
import { Link } from 'react-router';
import { ACTION, URL_PATH } from '~/constans';

export const meta = () => metaAdmin('User Create');

export default function UserCreate() {
  const { t } = useTranslation('users');

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <Link to={URL_PATH.ADMIN.USERS.LIST}>
          <Button variant="link" icon={ACTION.BACK}></Button>
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">{t('create.title')}</h1>
      </div>

      <UserCreateForm />
    </div>
  );
}
