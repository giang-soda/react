import type { QueryResponse } from '~/models';
import { Loading } from '..';

interface EditDataProps<T> {
  queryResponse: QueryResponse<T>;
  children: (data: T) => React.ReactNode;
}

export function EditData<T>({ queryResponse, children }: EditDataProps<T>) {
  return (
    <>
      {queryResponse.query.isLoading ? (
        <Loading />
      ) : queryResponse.query.isError ? (
        <div className="flex flex-col items-center gap-2 text-xl font-bold text-red-500">
          <p>{queryResponse.query.error.message}</p>
        </div>
      ) : (
        queryResponse.data && children(queryResponse.data)
      )}
    </>
  );
}
