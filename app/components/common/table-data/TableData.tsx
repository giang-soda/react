import { TableCell, TableRow } from '~/components/ui/table';
import { Loading, NoData } from '..';
import type { QueryResponse } from '~/models';

interface TableDataProps<T> {
  queryResponse: QueryResponse<T[]>;
  colSpan?: number;
  children: (item: T) => React.ReactNode;
}

export function TableData<T>({ queryResponse, colSpan = 1, children }: TableDataProps<T>) {
  return (
    <>
      {queryResponse.query.isLoading ? (
        <TableRow>
          <TableCell colSpan={colSpan}>
            <Loading />
          </TableCell>
        </TableRow>
      ) : queryResponse.query.isError ? (
        <TableRow>
          <TableCell colSpan={colSpan}>
            <div className="flex flex-col items-center gap-2 text-xl font-bold text-red-500">
              <p>{queryResponse.query.error.message}</p>
            </div>
          </TableCell>
        </TableRow>
      ) : !queryResponse.query.data || queryResponse.query.data.length === 0 ? (
        <TableRow>
          <TableCell colSpan={colSpan}>
            <NoData />
          </TableCell>
        </TableRow>
      ) : (
        queryResponse.query.data.map(item => children(item))
      )}
    </>
  );
}
