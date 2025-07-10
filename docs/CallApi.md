# Cal API

Cách dùng khác của call api, không khuyến nghị

1. Ví dụ call api với hook (Không khuyến nghị)
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
         bodyParamsStruct: {
           firstName: String,
           status: Boolean,
           connection: [
             {
               phone: Number,
               list: [Number],
             },
           ],
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

2. Ví dụ call api function (không khuyến nghị)

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
