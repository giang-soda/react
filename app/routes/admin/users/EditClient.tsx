import { UserEditForm } from '~/components/features/admin/users/UserEditForm';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router';
import { API_ENDPOINT } from '~/api';
import { useApiQuery } from '~/hooks/use-api';
import type { User } from '~/models';
import { Button } from '~/components/ui/button';
import { ACTION, KEY_QUERY } from '~/constans';
import { EditData } from '~/components/common/table-data';
import { URL_PATH } from '~/constans';

export default function UserEditClient() {
  const { t } = useTranslation('users');
  const { id } = useParams();

  const api = useApiQuery<User>(
    {
      method: 'get',
      url: API_ENDPOINT.USERS.DETAIL(id ?? ''),
    },
    {
      querykey: [KEY_QUERY.USER_DETAIL, id],
      message: {
        default: t('errors.detail_default', { ns: 'users' }),
      },
    }
  );

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <Link to={URL_PATH.ADMIN.USERS.LIST}>
          <Button variant="link" icon={ACTION.BACK}></Button>
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">{t('edit.title')}</h1>
      </div>

      <EditData queryResponse={api}>{user => <UserEditForm user={user} />}</EditData>
    </div>
  );
}
