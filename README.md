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
      "code": "ERR_TODO_LIST",
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
7. Ví dụ call api với hook
    - file hook lib: app/hooks/use-api.ts
    - Sử dụng: 
        ```ts
        // tham số đầu là AxiosRequestConfig, tham số thứ 2 gồm message lỗi (xem lại phần 5)
        const api = useApi(
            {
              method: 'get',
              url: API_ENDPOINT.TODOS.LIST,
            },
            {
              message: {
                default: t('errors.default'),
                ERR_TODO_LIST: t('errors.ERR_TODO_LIST'),
              },
            }
        );
        
        // call
        await api.call();
        
        // các state
        api.isLoading; // boolean
        api.error; // string | null
        api.data; // any
        
        // các method
        api.call(); // gọi api
        api.resetData(); // reset data, error = null
        ```
    - Nếu url path có biến :id, dùng generatePath(API_ENDPOINT.TODOS.ID, { id })

8. Ví dụ call api function (không khuyến nghị)
    - Hàm gọi api và xử lý error ở trong folder app/api/. Từng module tạo folder riêng cho dễ quản lý. ví dụ `app/api/todos/index.ts`. ví dụ call và xử lý handle:
    ```ts
    import { api, handleError, API_ENDPOINT, API_ERROR_CODE } from '../';

    export const get = async (t: TFunction) => {
        try {
            const response = await api.get(API_ENDPOINT.TODOS.LIST);
            return response.data;
        } catch (error) {
            return handleError(error as AxiosError, {
                t,
                message: {
                    default: t('errors.default', { ns: 'todos' }),
                    [API_ERROR_CODE.TODOS.LIST]: t('errors.ERR_TODO_LIST', { ns: 'todos' }),
                },
            });
        }
    };
    ```
    - Nếu endpoint có biến, sử dụng `generatePath` để replace `:id`, ví dụ: `await api.get(generatePath(API_ENDPOINT.TODOS.ID, { id }));`
