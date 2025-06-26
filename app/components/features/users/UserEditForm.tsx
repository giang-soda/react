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
import { Loading } from '~/components/common';
import { type User } from '~/models';
import { NoData } from '~/components/common/Nodata';
import { Button } from '~/components/ui/button';
import { EditIcon, TrashIcon } from 'lucide-react';
import { Link } from 'react-router';

export function UserEditForm({ user }: { user: User }) {
  const { t } = useTranslation(['common', 'users']);

  return (
    <div>
      id: {user.id}
      name: {user.name}
      email: {user.email}
    </div>
  );
}
