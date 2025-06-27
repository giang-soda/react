# Welcome to React Router!

- 📖 [React Router docs](https://reactrouter.com/)

## Getting Started

#### Installation

Install the dependencies:

```bash
npm install
```

#### Run with dev

1. Start the development server with HMR:

   ```bash
   npm run dev
   ```

2. Check lint and format code

   ```bash
   npm run format
   npm run lint
   ```

#### Building for Production

Create a production build:

```bash
npm run build
```

## Development

### 1. Common

1. Dùng shadcn-ui cho framework css
2. Dùng admin theme [https://shadcn-admin.netlify.app](https://shadcn-admin.netlify.app)
3. File khai báo router: app/routes.ts
4. Dùng handle execption để ra trang báo lỗi, xem chi tiết ở hàm ErrorBoundary trong file app/root.tsx
5. Có chuyển đổi theme dark/light, ngôn ngữ vi/en, xem chi tiết ở Context/hook app/context/ThemeContext.tsx
6. Gọi api dùng axios, file handle app/api/axios.ts.
7. Component nên tách ra để khi render chỉ render những thành phần cần thiết. Page ở trong folder app/routes, chứa cơ bản như header page, gọi component thành phần như form, table (ở trong folder app/components/features)
8. Component dùng chung: app/components/common

### 2. Multi language

1. Sử dụng lib i18next, i18next-http-backend, react-i18next
2. File init: app/lib/translator.ts
3. File switch language: app/context/ThemeContext.tsx, hook toggleLanguage, dùng localstorage để lưu ngôn ngữ hiện tại
4. Thêm 1 file json dịch mới:
   - cho vào public/locales. ví dụ admin.json
   - thêm vào mảng `ns` trong init của file app/lib/translator.ts
5. Sử dụng:
   - import { useTranslation } from "react-i18next";
   - gọi hook, vì là hook nên chỉ được sử dụng trong component (.tsx)
   ```
   const { t } = useTranslation(); // nếu sử dụng tất cả file
   const { t } = useTranslation(['auth', 'validate']); // nếu sử dụng nhiều file
   const { t } = useTranslation('validate'); // nếu sử dụng 1 file
   ```
   - sử dụng trong template:
   ```
   t('login.success', {ns: 'auth'}); // nếu sử dụng nhiều file
   t('login.success'); // nếu sử dụng 1 file
   ```

### 3. Call api

1. Dùng lib axios
2. File init axios app/api/axios.ts: default path /api/, header thêm Bearer token
3. Function fakeApi: tạo fake api để test, remove trong quá trình code thật.
4. Ví dụ error response from Backend:
   ```json
   {
     "code": "ERR_TODO_LIST"
     // data more
   }
   ```
5. Chi tiết hàm handleError (app/api/axios.ts):
   - Xử lý common error
   - Truyền option gồm t: translator, message: thông báo lỗi dựa vào mã code từ server response

   ```json
   {
       "message": {
           "default": t('errors.default', { ns: 'todos' }),
           "ERROR_TODO_LIST": t('errors.ERR_TODO_LIST', { ns: 'todos' }),
       }
   }
   ```
   - server trả về mã code nào, tìm trong mảng message tương ứng để hiển thị toast, nếu không có thì hiển thị default.

6. Khai báo params
   - Khai báo mã lỗi để quản lý tập trung: `app/api/error-code.ts`
   - Khai báo endpoint api: app/api/endpoint.ts
7. Ví dụ call api với query hook

- Sử dụng lib @tanstack/react-query để quản lý state: data, loading, error, cache
- Tham khảo quản lý user ở folder `app/components/features/users`
- Với phương thức get, sẽ lưu cache để không gọi lại api (nếu có data mới, phải call refetch hoặc invalidate cache)

  ```ts
  import { useApiQuery } from '~/hooks/use-api';

  // khai báo hook
  const queryHook = useApiQuery<User[]>( // type data reponse
    {
      method: 'get',
      url: API_ENDPOINT.USERS.LIST,
    },
    {
      querykey: [KEY_QUERY.USER_LIST], // key để lưu cache
      message: {
        // message lỗi (xem lại phần 5)
        default: t('errors.list_default', { ns: 'users' }),
      },
    }
  );

  // dùng data queryHook
  // queryHook.query: UseQueryResult của lib
  queryHook.query.isFetching;
  queryHook.query.isLoading;
  queryHook.query.refetch();

  queryHook.query.data; // Là body json của axios response
  ```

- Với phương thức post (thêm, sửa xóa), sử dụng `useMutation` của lib

  ```ts
  import { useApiMutation } from '~/hooks/use-api';

  // khai báo
  const apiHook = useApiMutation<User>(
    {
      method: 'post',
      url: API_ENDPOINT.USERS.CREATE,
    },
    {
      message: {
        default: t('errors.create_default', { ns: 'users' }),
      },
      bodyParamsStruct: {
        // filter body param theo cấu trúc này trước khi gửi lên api
        email: String,
        active: Boolean,
        birthday: Date,
        count: Number,
      },
      refreshQuerykey: [KEY_QUERY.USER_LIST, [KEY_QUERY.USER_DETAIL, user.id]], // nếu có sẽ xóa cache theo key này sau khi success, mục đích cập nhập data mới, xóa list và xóa detail vừa cập nhập
      redirect: URL_PATH.USERS.LIST, // nếu có redirect page này sau khi success
      onSuccess: responseData => {
        // callback khi success
        // responseData tương đương với apiHook.mutation.data.data
        toast.success(t('success.create', { ns: 'users', id: responseData.id }));
      },
    }
  );

  // call api
  apiHook.mutation.mutate(bodyData | undefined);
  ```

### 4. Error page

Hiện trang báo lỗi, layout trang báo lỗi ở folder `app/components/errors`

```ts
import { ErrorResponseHandler } from '~/lib/errors';

throw new ErrorResponseHandler(500);
```

### Demo

Đã demo đầy đủ chức năng CRUD user
- List: 
  - file app/components/features/users/UsersTable.tsx
  - format table all data
  - common: Table Data body (check error, empty or show data), ButtonReload 
  - delete modal
- Create / Edit:
  - file: app/components/features/users/UserCreateForm.tsx /  UserEditForm.tsx
  - format form dùng react-hook-form, validate zod tách ra file riêng
  - Group button EditSubmit component: cancel, save, delete (có thêm tham số setOpenDelete cho form edit)
- Delete
  - common app/components/common/table-data/DeleteModal.tsx
  - button event show modal ở cả table list và Edit page
  - use basic
    ```ts
    <DeleteModal
        apiUrl={API_ENDPOINT.USERS.DELETE(user.id)}
        open={open}
        setOpen={setOpen}
        refreshQuerykey={[KEY_QUERY.USER_LIST, [KEY_QUERY.USER_DETAIL, user.id]]}
        redirect={URL_PATH.USERS.LIST}
      />
    ```
