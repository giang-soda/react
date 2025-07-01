import { useTranslation } from 'react-i18next';
import { useApiQuery } from '~/hooks/use-api';
import { API_ENDPOINT } from '~/api';
import type { User, DataColumn, DataSearch } from '~/models';
import { CheckCircleIcon } from 'lucide-react';
import { KEY_QUERY, URL_PATH } from '~/constans';
import { DataTable, DeleteModal } from '~/components/common';
import { useState } from 'react';

export function UserTable() {
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

  const columns: DataColumn<User>[] = [
    {
      key: 'id',
      header: 'ID',
      sortable: 'number',
      searchable: true,
    },
    {
      key: 'email',
      header: t('list.email', { ns: 'users' }),
      sortable: true,
      searchable: true,
    },
    {
      key: 'name',
      header: t('list.name', { ns: 'users' }),
      sortable: true,
      searchable: true,
    },
    {
      key: 'role',
      header: t('list.role', { ns: 'users' }),
      sortable: true,
      searchable: true,
    },
    {
      key: 'status',
      header: t('list.status', { ns: 'users' }),
      sortable: true,
      searchable: true,
      render: (value: React.ReactNode) => {
        return value && <CheckCircleIcon className="h-4 w-4 text-green-500" />;
      },
    },
    {
      key: 'count',
      header: t('list.count', { ns: 'users' }),
      sortable: true,
      searchable: true,
    },
    {
      key: 'createdAt',
      header: t('list.createdAt', { ns: 'users' }),
      sortable: true,
      searchable: true,
      date: true,
    },
    {
      key: 'updatedAt',
      header: t('list.updatedAt', { ns: 'users' }),
      sortable: true,
      searchable: true,
      date: true,
    },
  ];

  const handleSearch: DataSearch<User>[] = [
    {
      key: 'id',
      label: 'ID',
      searchFn: (item: User, value: React.ReactNode) => {
        return item.id.includes(value as string);
      },
      type: 'input',
    },
    {
      key: 'email',
      label: t('list.search_email_name', { ns: 'users' }),
      searchFn: (item: User, value: React.ReactNode) => {
        return (
          item.email.toLowerCase().includes((value as string).toLowerCase()) ||
          item.name.toLowerCase().includes((value as string).toLowerCase())
        );
      },
      type: 'input',
    },
    {
      key: 'role',
      label: t('list.role', { ns: 'users' }),
      searchFn: (item: User, value: React.ReactNode) => {
        return item.role.includes(value as string);
      },
      type: 'select',
      options: [
        { value: 'admin', label: t('role.admin', { ns: 'users' }) },
        { value: 'user', label: t('role.user', { ns: 'users' }) },
      ],
    },
    {
      key: 'status',
      label: t('list.status', { ns: 'users' }),
      searchFn: (item: User, value: React.ReactNode) => {
        return (value as boolean) ? item.status : true;
      },
      type: 'checkbox',
    },
    {
      key: 'count',
      label: t('list.count', { ns: 'users' }),
      searchFn: (item: User, value: React.ReactNode) => {
        return item.count === Number(value);
      },
      type: 'input',
    },
  ];

  const handleDelete = (user: User) => {
    setItemSelected(user);
    setOpen(true);
  };

  const deleteModal = itemSelected && (
    <DeleteModal
      apiUrl={API_ENDPOINT.USERS.DELETE(itemSelected.id)}
      open={open}
      setOpen={setOpen}
      refreshQuerykey={[KEY_QUERY.USER_LIST, [KEY_QUERY.USER_DETAIL, itemSelected.id]]}
    >
      <p>{t('delete.description', { ns: 'users' })}</p>
      <div className="mt-5 flex flex-col gap-1">
        <span>
          {t('list.name', { ns: 'users' })}: <strong>{itemSelected.name}</strong>
        </span>
        <span>
          {t('list.email', { ns: 'users' })}: <strong>{itemSelected.email}</strong>
        </span>
        <span>
          ID: <strong>{itemSelected.id}</strong>
        </span>
      </div>
    </DeleteModal>
  );

  return (
    <>
      <DataTable
        queryResponse={api}
        columns={columns}
        refreshQuerykey={[KEY_QUERY.USER_LIST]}
        urlCreate={URL_PATH.USERS.CREATE}
        urlEdit={URL_PATH.USERS.EDIT}
        onDelete={handleDelete}
        onSearch={handleSearch}
      />

      {deleteModal}
    </>
  );
}
