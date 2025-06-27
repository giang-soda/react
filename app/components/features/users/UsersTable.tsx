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
import { ButtonReload, TableData, DeleteModal } from '~/components/common';
import { URL_PATH } from '~/constans';
import { useState } from 'react';

export function UsersTable() {
  const { t } = useTranslation(['common', 'users']);
  const [open, setOpen] = useState(false);
  const [itemSelected, setItemSelected] = useState<User>();

  const api = useApiQuery<User[]>(
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

  const handleDelete = (user: User) => {
    setItemSelected(user);
    setOpen(true);
  };

  return (
    <div>
      <div className="mb-2 flex justify-start gap-2 md:justify-end">
        <ButtonReload queryResponse={api} refreshQuerykey={[KEY_QUERY.USER_DETAIL]} />

        <Link to={URL_PATH.USERS.CREATE}>
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
          <TableData queryResponse={api} colSpan={4}>
            {user => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Link to={URL_PATH.USERS.EDIT(user.id)}>
                      <Button variant="outline">
                        <EditIcon className="h-4 w-4" />
                      </Button>
                    </Link>

                    <Button variant="outline" onClick={() => handleDelete(user)}>
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableData>
        </TableBody>
      </Table>

      {itemSelected && (
        <DeleteModal
          url={API_ENDPOINT.USERS.DELETE(itemSelected.id)}
          open={open}
          setOpen={setOpen}
          refreshQuerykey={[KEY_QUERY.USER_LIST]}
        >
          <p>{t('delete.description', { ns: 'users' })}</p>
          <div className="mt-5 flex flex-col gap-1">
            <span>
              Name: <strong>{itemSelected.name}</strong>
            </span>
            <span>
              Email: <strong>{itemSelected.email}</strong>
            </span>
            <span>
              ID: <strong>{itemSelected.id}</strong>
            </span>
          </div>
        </DeleteModal>
      )}
    </div>
  );
}
