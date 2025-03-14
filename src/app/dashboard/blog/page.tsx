'use client';

/**
 * route /dashboard/blog
 */
import { Text, Button, Table } from '@radix-ui/themes';
import styles from './styles.module.scss';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usersList } from '@/lib/api/client/users';
import { useForm } from 'react-hook-form';
import { IBase } from '@/lib/interfaces';
import { useSelector, useDispatch } from 'react-redux';
import { updateStore, resetStore } from '@/lib/store/slices/user-list-filter';
import { RootState } from '@/lib/store';
import DashboardBlogFilter from './_components/filter';
import { IUser } from '@/lib/interfaces/user';

export default function DashboardBlog() {
  const [posts, setPosts] = useState([] as Array<IUser>);
  const [total, setTotal] = useState(0);
  const store = useSelector((state: RootState) => state.userListFilter);
  const dispatch = useDispatch();
  const { register, getValues, reset } = useForm({
    defaultValues: {
      ...store,
    },
  });

  useEffect(() => {
    apiUserList(store);
    reset({ ...store });
  }, [store]);

  const handleSearch = () => {
    const values = getValues();
    dispatch(updateStore(values));
  };

  const handleClear = () => {
    dispatch(resetStore());
  };

  const apiUserList = async (params?: IBase) => {
    usersList(params).then((r) => {
      setTotal(r.total);
      setPosts(r.items);
    });
  };

  return (
    <div>
      <div>
        <Text size="9" className={styles['color-red']}>
          User list
        </Text>
      </div>
      <div className="pb-10">
        <Button variant="solid">Create User</Button>
      </div>

      <DashboardBlogFilter
        total={total}
        register={register}
        handleSearch={handleSearch}
        handleClear={handleClear}
        setTotal={setTotal}
      />

      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Role</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {posts.length === 0 && (
            <Table.Row>
              <Table.Cell colSpan={4}>Empty data</Table.Cell>
            </Table.Row>
          )}

          {posts.length > 0 &&
            posts.map((post) => (
              <Table.Row key={post.id}>
                <Table.Cell>
                  <Link href={`/dashboard/blog/${post.id}`}>client {post.id}</Link>
                  <span className="ml-5">
                    <Link href={`/dashboard/users/${post.id}`}>server side {post.id}</Link>
                  </span>
                </Table.Cell>
                <Table.Cell>{post.pdlUserId}</Table.Cell>
                <Table.Cell>{post.firstName + '-' + post.lastName}</Table.Cell>
                <Table.Cell>{post.role}</Table.Cell>
                <Table.Cell>
                  <Link className="mr-2" href={`/dashboard/blog/${post.id}`}>
                    Edit
                  </Link>
                  <Link href={`/dashboard/blog/${post.id}`}>Delete</Link>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}
