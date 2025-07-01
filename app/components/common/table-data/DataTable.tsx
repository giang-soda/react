import React, { useState, useMemo, useEffect } from 'react';
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
import type { QueryResponse, DataSort, DataPagination, DataColumn, DataSearch } from '~/models';
import { BodyData, ButtonReload } from '.';
import { Link } from 'react-router';
import { Button } from '~/components/ui/button';
import { ACTION, DATE_FORMAT_TIME, PAGE_SIZE, PAGE_SIZE_OPTIONS } from '~/constans';
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
  onSearch?: DataSearch<T>[];
  rowActions?: (item: T) => React.ReactNode;
  debounceDelay?: number;
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
  onSearch,
  rowActions,
  debounceDelay = 500,
}: DataTableProps<T>) {
  const { t } = useTranslation(['common']);
  const [searchTerm, setSearchTerm] = useState<Record<string, React.ReactNode>>(
    {} as Record<string, React.ReactNode>
  );
  const [sortConfig, setSortConfig] = useState<DataSort<T>>({} as DataSort<T>);
  const [pagination, setPagination] = useState<DataPagination>({
    pageIndex: 0,
    pageSize: pageSizeOptions[0] || PAGE_SIZE,
  });

  // Create debounced search function using lodash
  const initSearch = (key: string, value: React.ReactNode) => {
    setSearchTerm(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, pageIndex: 0 }));
  };

  const debouncedSearch = debounce(initSearch, debounceDelay);

  // Handle search input change
  const handleSearchChange = (key: string, value: React.ReactNode) => {
    debouncedSearch(key, value);
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

    if (onSearch) {
      filteredData = filteredData.filter(item => {
        return Object.entries(searchTerm).every(([key, value]) => {
          if (value === '') return true;

          const searchKey = onSearch.find(f => f.key === key);
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
            .includes(((searchTerm[DEFAULT_SEARCH_TERM_ALL] as string) || '').toLowerCase());
        });
      });
    }

    // Sort data
    if (sortConfig.key) {
      filteredData.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue === null || aValue === undefined) return sortConfig.direction === 'asc' ? -1 : 1;
        if (bValue === null || bValue === undefined) return sortConfig.direction === 'asc' ? 1 : -1;

        if (sortConfig.type === 'number') {
          return sortConfig.direction === 'asc'
            ? Number(aValue) - Number(bValue)
            : Number(bValue) - Number(aValue);
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filteredData;
  }, [queryResponse.query.data, searchTerm, sortConfig, columns, onSearch]);

  // Pagination logic
  const pageCount = Math.ceil(filteredAndSortedData.length / pagination.pageSize);

  const paginatedData = useMemo(() => {
    const startIndex = pagination.pageIndex * pagination.pageSize;
    return filteredAndSortedData.slice(startIndex, startIndex + pagination.pageSize);
  }, [filteredAndSortedData, pagination.pageIndex, pagination.pageSize]);

  const handleSort = (key: keyof T, sortable?: boolean | string) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
      type: typeof sortable === 'boolean' ? 'string' : (sortable as 'number'),
    }));
    setPagination(prev => ({ ...prev, pageIndex: 0 }));
  };

  const sortIcon = ({ column }: { column: keyof T }) => {
    if (sortConfig.key !== column) {
      return <ChevronDown className="ml-1 h-4 w-4 opacity-0 group-hover:opacity-70" />;
    }

    return sortConfig.direction === 'asc' ? (
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
              isActive={pagination.pageIndex === i}
              onClick={e => {
                e.preventDefault();
                setPagination(prev => ({ ...prev, pageIndex: i }));
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
            isActive={pagination.pageIndex === 0}
            onClick={e => {
              e.preventDefault();
              setPagination(prev => ({ ...prev, pageIndex: 0 }));
            }}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      // Show ellipsis if needed
      if (pagination.pageIndex > 2) {
        items.push(
          <PaginationItem key="ellipsis1">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      // Show current page and neighbors
      const start = Math.max(1, pagination.pageIndex - 1);
      const end = Math.min(pageCount - 2, pagination.pageIndex + 1);

      for (let i = start; i <= end; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              isActive={pagination.pageIndex === i}
              onClick={e => {
                e.preventDefault();
                setPagination(prev => ({ ...prev, pageIndex: i }));
              }}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        );
      }

      // Show ellipsis if needed
      if (pagination.pageIndex < pageCount - 3) {
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
              isActive={pagination.pageIndex === pageCount - 1}
              onClick={e => {
                e.preventDefault();
                setPagination(prev => ({ ...prev, pageIndex: pageCount - 1 }));
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
          {onSearch ? (
            <>
              <div className="flex flex-col gap-4 md:flex-row">
                <Input
                  className="text-muted-foreground w-15 border-none p-0 text-sm shadow-none"
                  placeholder="search"
                  disabled
                  value={t('pagination.search', { ns: 'common' }) + ':'}
                />
                {onSearch.map(search => (
                  <div key={search.key}>
                    {search.type === 'input' && (
                      <Input
                        placeholder={search.label}
                        onChange={e => handleSearchChange(search.key, e.target.value)}
                      />
                    )}

                    {search.type === 'select' && search.options && (
                      <Select
                        key={search.key}
                        onValueChange={value =>
                          handleSearchChange(search.key, value === 'all' ? '' : value)
                        }
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
                        key={search.key}
                      >
                        <Checkbox
                          id={search.key}
                          checked={searchTerm[search.key] as boolean}
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
                value={searchTerm[DEFAULT_SEARCH_TERM_ALL] as string}
                onChange={e => handleSearchChange(DEFAULT_SEARCH_TERM_ALL, e.target.value)}
              />
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <ButtonReload queryResponse={queryResponse} refreshQuerykey={refreshQuerykey} />
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
                  onClick={() => column.sortable && handleSort(column.key, column.sortable)}
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
                        : column.date
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
                  ? pagination.pageIndex * pagination.pageSize + 1
                  : 0,
              to: Math.min(
                (pagination.pageIndex + 1) * pagination.pageSize,
                filteredAndSortedData.length
              ),
              total: filteredAndSortedData.length,
              ns: 'common',
            })}
          </p>
          <Select
            value={pagination.pageSize.toString()}
            onValueChange={value => {
              setPagination({
                pageIndex: 0,
                pageSize: Number(value),
              });
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pagination.pageSize} />
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
                      setPagination(prev => ({
                        ...prev,
                        pageIndex: Math.max(0, prev.pageIndex - 1),
                      }));
                    }}
                    className={pagination.pageIndex === 0 ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>

                {renderPaginationItems()}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={e => {
                      e.preventDefault();
                      setPagination(prev => ({
                        ...prev,
                        pageIndex: Math.min(pageCount - 1, prev.pageIndex + 1),
                      }));
                    }}
                    className={
                      pagination.pageIndex >= pageCount - 1 ? 'pointer-events-none opacity-50' : ''
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
