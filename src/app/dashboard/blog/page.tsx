'use client'

/**
 * route /dashboard/blog
 */
import { Text, Button, Table, TextField } from '@radix-ui/themes';
import styles from './styles.module.scss';
import Link from "next/link";
import { useState, useEffect } from 'react';
import { usersList, IUser } from '@/lib/api/client/users';
import { useForm } from 'react-hook-form';
import { IBase } from '@/lib/helpers/interfaces';
import { useSelector, useDispatch } from 'react-redux';
import { setData } from '@/lib/store/slices/user-list-filter';
import { RootState } from '@/lib/store';

export default function DashboardBlog() {
  const [posts, setPosts] = useState([] as Array<IUser>);
  const [total, setTotal] = useState(0);
  const {
    register,
    getValues,
  } = useForm();
  const store = useSelector((state: RootState) => state.userListFilter);
  const dispatch = useDispatch();

  useEffect(() => {
    apiUserList(store);
  }, []);

  const handleSearch = () => {
    const values = getValues();
    dispatch(setData(values));
    apiUserList(values);
  }

  const apiUserList = async (params?: IBase) => {
    usersList(params).then(r => {
      setTotal(r.total);
      setPosts(r.items);
    })
  }

  return (
    <div>
      <div>
        <Text size="9" className={styles['color-red']}>User list</Text>
      </div>
      <div className="pb-10">
        <Button variant="solid" >Create User</Button>
      </div>
      <div>
        <div className="pr-10">Total: {total}</div>
        <div>limit: 
        <TextField.Root placeholder="Limit" {...register('limit')} />
        </div>
        <div>offset: 
        <TextField.Root placeholder="Offset" {...register('offset')} />
        </div>

        <div className="pt-5">
        <Button variant="solid" onClick={handleSearch}>Search</Button>
      </div>
      </div>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Role</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {posts.length === 0 && (
            <Table.Row>
              <Table.Cell colSpan={4}>Empty data</Table.Cell>
            </Table.Row>
          )}

          {posts.length > 0 && posts.map((post) => (
            <Table.Row key={post.id}>
              <Table.Cell>
                <Link href={`/dashboard/blog/${post.id}`}>{post.id}</Link>
              </Table.Cell>
              <Table.Cell>{post.pdlUserId}</Table.Cell>
              <Table.Cell>{post.firstName + '-' + post.lastName}</Table.Cell>
              <Table.Cell>{post.role}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}
