import React, { useMemo, useEffect, useState } from 'react';
import type { QueryKey } from '@tanstack/react-query';
import { format } from 'date-fns';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import debounce from 'lodash/debounce';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import { Input } from '~/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '~/components/ui/pagination';
import type { QueryResponse, DataColumn, DataSearch, AdminListState } from '~/models';
import { BodyData, ButtonReload } from '.';
import { Link } from 'react-router';
import { Button } from '~/components/ui/button';
import { ACTION, DATE_FORMAT_TIME, PAGE_SIZE_OPTIONS } from '~/constans';
import { Checkbox } from '~/components/ui/checkbox';
import { Label } from '~/components/ui/label';

interface DataTableProps<T> {
  queryResponse: QueryResponse<T[]>;
  columns: DataColumn<T>[];
  searchPlaceholder?: string;
  pageSizeOptions?: number[];
  refreshQuerykey?: QueryKey;
  urlCreate?: string;
  urlEdit?: (id: string) => string;
  onDelete?: (item: T) => void;
  dataSearch?: DataSearch<T>[];
  rowActions?: (item: T) => React.ReactNode;
  debounceDelay?: number;
  store: AdminListState<T>;
}

const DEFAULT_SEARCH_TERM_ALL = 'all';

export function DataTable<T extends object & { id: string | number }>({
  queryResponse,
  columns,
  searchPlaceholder,
  pageSizeOptions = PAGE_SIZE_OPTIONS,
  refreshQuerykey,
  urlCreate,
  urlEdit,
  onDelete,
  dataSearch,
  rowActions,
  debounceDelay = 500,
  store,
}: DataTableProps<T>) {
  const { t } = useTranslation(['common']);
  const [resetKey, setResetKey] = useState(0);

  const [searchTermRealtime, setSearchTermRealtime] = useState<Record<string, React.ReactNode>>({} as Record<string, React.ReactNode>);
  // Create debounced search function using lodash
  const changeParamSearch = (key: string, value: React.ReactNode) => {
    console.log('store', key, value);
    store.setSearchTerm(key, value);
  };

  const debouncedSearch = debounce(changeParamSearch, debounceDelay);

  // Handle search input change
  const handleSearchChange = (key: string, value: React.ReactNode) => {
    console.log('key', key, value);
    // setSearchTermRealtime(prev => ({ ...prev, [key]: value }));
    debouncedSearch(key, value); 
  };

  const handleResetSearch = () => {
    store.reset();
    setResetKey(prev => prev + 1);
  };

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const filteredAndSortedData = useMemo(() => {
    // Filter data based on search term
    let filteredData = [...(queryResponse.query.data || [])];

    if (dataSearch) {
      filteredData = filteredData.filter(item => {
        return Object.entries(store.searchTerm).every(([key, value]) => {
          if (value === '') return true;

          const searchKey = dataSearch.find(f => f.key === key);
          if (!searchKey) return true;
          return searchKey.searchFn(item, value);
        });
      });
    } else {
      filteredData = filteredData.filter(item => {
        return columns.some(column => {
          if (!column.searchable) return false;
          const value = item[column.key];
          if (value === null || value === undefined) return false;
          return value
            .toString()
            .toLowerCase()
            .includes(((store.searchTerm[DEFAULT_SEARCH_TERM_ALL] as string) || '').toLowerCase());
        });
      });
    }

    // Sort data
    if (store.sortConfig.key) {
      filteredData.sort((a, b) => {
        const aValue = a[store.sortConfig.key];
        const bValue = b[store.sortConfig.key];

        if (aValue === null || aValue === undefined) return store.sortConfig.direction === 'asc' ? -1 : 1;
        if (bValue === null || bValue === undefined) return store.sortConfig.direction === 'asc' ? 1 : -1;

        if (store.sortConfig.type === 'number') {
          return store.sortConfig.direction === 'asc'
            ? Number(aValue) - Number(bValue)
            : Number(bValue) - Number(aValue);
        }

        if (aValue < bValue) {
          return store.sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return store.sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filteredData;
  }, [queryResponse.query.data, store.searchTerm, store.sortConfig, columns, dataSearch]);

  // Pagination logic
  const pageCount = Math.ceil(filteredAndSortedData.length / store.pagination.pageSize);

  const paginatedData = useMemo(() => {
    const startIndex = store.pagination.pageIndex * store.pagination.pageSize;
    return filteredAndSortedData.slice(startIndex, startIndex + store.pagination.pageSize);
  }, [filteredAndSortedData, store.pagination.pageIndex, store.pagination.pageSize]);

  const sortIcon = ({ column }: { column: keyof T }) => {
    if (store.sortConfig.key !== column) {
      return <ChevronDown className="ml-1 h-4 w-4 opacity-0 group-hover:opacity-70" />;
    }

    return store.sortConfig.direction === 'asc' ? (
      <ChevronUp className="ml-1 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-1 h-4 w-4" />
    );
  };

  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;

    if (pageCount <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 0; i < pageCount; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              isActive={store.pagination.pageIndex === i}
              onClick={e => {
                e.preventDefault();
                store.setPageIndex(i);
              }}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // Show first page
      items.push(
        <PaginationItem key={0}>
          <PaginationLink
            href="#"
            isActive={store.pagination.pageIndex === 0}
            onClick={e => {
              e.preventDefault();
              store.setPageIndex(0);
            }}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      // Show ellipsis if needed
      if (store.pagination.pageIndex > 2) {
        items.push(
          <PaginationItem key="ellipsis1">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      // Show current page and neighbors
      const start = Math.max(1, store.pagination.pageIndex - 1);
      const end = Math.min(pageCount - 2, store.pagination.pageIndex + 1);

      for (let i = start; i <= end; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              isActive={store.pagination.pageIndex === i}
              onClick={e => {
                e.preventDefault();
                store.setPageIndex(i);
              }}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        );
      }

      // Show ellipsis if needed
      if (store.pagination.pageIndex < pageCount - 3) {
        items.push(
          <PaginationItem key="ellipsis2">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      // Show last page
      if (pageCount > 1) {
        items.push(
          <PaginationItem key={pageCount - 1}>
            <PaginationLink
              href="#"
              isActive={store.pagination.pageIndex === pageCount - 1}
              onClick={e => {
                e.preventDefault();
                store.setPageIndex(pageCount - 1);
              }}
            >
              {pageCount}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    return items;
  };

  const hasActions = rowActions || urlEdit || onDelete;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1">
          {dataSearch ? (
            <>
              <div className="flex flex-col gap-4 md:flex-row">
                <Label className="text-muted-foreground text-sm">
                  {t('pagination.search', { ns: 'common' })}:
                </Label>
                {dataSearch.map(search => (
                  <div key={`${search.key}-${resetKey}`}>
                    {search.type === 'input' && (
                      <Input
                        placeholder={search.label}
                        onChange={e => handleSearchChange(search.key, e.target.value)}
                        defaultValue={store.searchTerm[search.key] as string}
                      />
                    )}

                    {search.type === 'select' && search.options && (
                      <Select
                        onValueChange={value =>
                          handleSearchChange(search.key, value === 'all' ? '' : value)
                        }
                        defaultValue={store.searchTerm[search.key] as string}
                      >
                        <SelectTrigger className="max-w-sm" id={search.key}>
                          <SelectValue placeholder={search.label} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">{search.label}</SelectItem>
                          {search.options.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}

                    {search.type === 'checkbox' && (
                      <div
                        className="flex h-9 items-center space-x-2 rounded-md border px-3 py-2"
                      >
                        <Checkbox
                          id={search.key}
                          checked={store.searchTerm[search.key] as boolean}
                          onCheckedChange={value => handleSearchChange(search.key, value)}
                        />
                        <Label
                          htmlFor={search.key}
                          className="cursor-pointer text-sm font-normal whitespace-nowrap"
                        >
                          {search.label}
                        </Label>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div>
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                placeholder={searchPlaceholder || t('pagination.search', { ns: 'common' })}
                className="pl-9"
                value={store.searchTerm[DEFAULT_SEARCH_TERM_ALL] as string}
                onChange={e => handleSearchChange(DEFAULT_SEARCH_TERM_ALL, e.target.value)}
              />
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <ButtonReload queryResponse={queryResponse} refreshQuerykey={refreshQuerykey} actionBeforeReload={handleResetSearch} />
          {urlCreate && (
            <Link to={urlCreate}>
              <Button icon={ACTION.CREATE}>{t('actions.create', { ns: 'common' })}</Button>
            </Link>
          )}
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map(column => (
                <TableHead
                  key={String(column.key)}
                  className={column.sortable ? 'group cursor-pointer select-none' : ''}
                  onClick={() => column.sortable && store.setSortConfig(column.key, column.sortable)}
                >
                  <div className="flex items-center">
                    {column.header}
                    {column.sortable && sortIcon({ column: column.key })}
                  </div>
                </TableHead>
              ))}
              {hasActions && (
                <TableHead className="w-[120px]">
                  {t('actions.actions', { ns: 'common' })}
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            <BodyData
              queryResponse={queryResponse}
              data={paginatedData}
              colSpan={columns.length + (hasActions ? 1 : 0)}
            >
              {item => (
                <TableRow key={String(item.id)}>
                  {columns.map(column => (
                    <TableCell key={String(column.key)}>
                      {column.render
                        ? column.render(item[column.key] as React.ReactNode, item)
                        : item[column.key] === null || item[column.key] === undefined
                          ? '-'
                          : column.date && item[column.key]
                            ? format(String(item[column.key]), DATE_FORMAT_TIME)
                            : String(item[column.key])}
                    </TableCell>
                  ))}

                  {hasActions && (
                    <TableCell>
                      <div className="flex gap-2">
                        {urlEdit && (
                          <Link to={urlEdit(String(item.id))}>
                            <Button variant="outline" size="icon" icon={ACTION.EDIT} />
                          </Link>
                        )}

                        {onDelete && (
                          <Button
                            variant="outline"
                            size="icon"
                            icon={ACTION.DELETE}
                            onClick={() => onDelete(item)}
                          />
                        )}

                        {rowActions?.(item)}
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              )}
            </BodyData>
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end px-2">
        <div className="flex items-center space-x-2">
          <p className="text-muted-foreground text-sm">
            {t('pagination.showing', {
              from:
                filteredAndSortedData.length > 0
                  ? store.pagination.pageIndex * store.pagination.pageSize + 1
                  : 0,
              to: Math.min(
                (store.pagination.pageIndex + 1) * store.pagination.pageSize,
                filteredAndSortedData.length
              ),
              total: filteredAndSortedData.length,
              ns: 'common',
            })}
          </p>
          <Select
            value={store.pagination.pageSize.toString()}
            onValueChange={value => {
              store.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={store.pagination.pageSize} />
            </SelectTrigger>
            <SelectContent>
              {pageSizeOptions.map(size => (
                <SelectItem key={size} value={size.toString()}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {pageCount > 1 && (
          <div className="ml-4 flex items-center space-x-2">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={e => {
                      e.preventDefault();
                      store.setPageIndex(Math.max(0, store.pagination.pageIndex - 1));
                    }}
                    className={store.pagination.pageIndex === 0 ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>

                {renderPaginationItems()}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={e => {
                      e.preventDefault();
                      store.setPageIndex(Math.min(pageCount - 1, store.pagination.pageIndex + 1));
                    }}
                    className={
                      store.pagination.pageIndex >= pageCount - 1 ? 'pointer-events-none opacity-50' : ''
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
}
