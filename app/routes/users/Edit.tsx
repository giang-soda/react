import { UserEditForm } from '~/components/features/users/UserEditForm';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { API_ENDPOINT } from '~/api';
import { useApiQuery } from '~/hooks/use-api';
import type { User } from '~/models';
import { Loading } from '~/components/common/Loading';

export function meta() {
  return [{ title: 'User Edit' }, { name: 'description', content: 'User Edit' }];
}

export default function UserEdit() {
  const { t } = useTranslation('users');
  const { id } = useParams();

  const queryUserDetail = useApiQuery<User>(
    {
      method: 'get',
      url: API_ENDPOINT.USERS.DETAIL(id ?? ''),
    },
    {
      querykey: ['user-detail', id],
      message: {
        default: t('errors.detail_default', { ns: 'users' }),
      },
    }
  );

  return (
    <div>
      <div className="mb-2 flex items-center justify-between space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">{t('edit.title')}</h1>
      </div>

      {queryUserDetail.query.isLoading && <Loading />}

      {queryUserDetail.error && <div className="text-red-500">{queryUserDetail.error}</div>}

      {queryUserDetail.data && <UserEditForm user={queryUserDetail.data} />}
    </div>
  );
}
