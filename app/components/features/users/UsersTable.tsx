import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import { useTranslation } from 'react-i18next';
import { useApiQuery } from '~/hooks/use-api';
import { API_ENDPOINT } from '~/api';
import { type User } from '~/models';
import { Button } from '~/components/ui/button';
import { EditIcon, TrashIcon } from 'lucide-react';
import { Link } from 'react-router';
import { ACTION, KEY_QUERY } from '~/constans';
import { TableData } from '~/components/common';

export function UsersTable() {
  const { t } = useTranslation(['common', 'users']);

  const queryUserList = useApiQuery<User[]>(
    {
      method: 'get',
      url: API_ENDPOINT.USERS.LIST,
    },
    {
      querykey: [KEY_QUERY.USER_LIST],
      message: {
        default: t('errors.list_default', { ns: 'users' }),
      },
    }
  );

  return (
    <div>
      <div className="mb-2 flex justify-start gap-2 md:justify-end">
        <Button
          loading={queryUserList.query.isFetching}
          icon={ACTION.RELOAD}
          onClick={() => {
            void queryUserList.query.refetch();
          }}
        >
          {t('pagination.reload', { ns: 'common' })}
        </Button>

        <Link to="/users/create">
          <Button icon={ACTION.CREATE}>{t('actions.create', { ns: 'common' })}</Button>
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>{t('list.email', { ns: 'users' })}</TableHead>
            <TableHead>{t('list.name', { ns: 'users' })}</TableHead>
            <TableHead>{t('actions.actions', { ns: 'common' })}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableData queryResponse={queryUserList} colSpan={4}>
            {user => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Link to={`/users/${user.id}`}>
                      <Button variant="outline">
                        <EditIcon className="h-4 w-4" />
                      </Button>
                    </Link>

                    <Link to={`/users/${user.id}/delete`}>
                      <Button variant="outline">
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableData>
        </TableBody>
      </Table>
    </div>
  );
}
