'use client';

import clsx from 'clsx';
import styles from '../styles.module.scss';
import { usersDetail } from '@/lib/api/client/users';
import HeadUpdate from '@/components/head';
import { useEffect, useState } from 'react';
import { IUser } from '@/lib/api/interfaces/user';
import { useParams } from 'next/navigation';

export default function DashboardBlogDetail() {
  const [title, setTitle] = useState<string>('Loading...');
  const [user, setUser] = useState<IUser>({} as IUser);

  const params = useParams();
  const id = params?.id;
  useEffect(() => {
    usersDetail(Number(id)).then((r) => {
      setUser(r);
      console.log(r.mail);
      setTitle(r.mail);
    });
  }, []);

  return (
    <>
      <HeadUpdate title={title} />
      <h1 className={clsx(Number(id) === 1 && styles['color-yellow'])}>Khong the ket noi</h1>
      <p>User {title}</p>
      <p>id: {user.id}</p>
      <p>last name: {user.lastName}</p>
      <p>first name: {user.firstName}</p>
      <p>role: {user.role}</p>
      <p>
        mail: <span dangerouslySetInnerHTML={{ __html: String(user.mail) }}></span>
      </p>
    </>
  );
}
