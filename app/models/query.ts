import type { UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';

export interface UseApiResponse {
  isLoading: boolean;
  error: React.ReactNode | null;
  data: React.ReactNode | null;
  call: () => Promise<React.ReactNode>;
  resetData: (newData?: React.ReactNode | null) => void;
}

export interface QueryResponse<T> {
  data: T | null;
  query: UseQueryResult;
}

export interface MutationResponse {
  mutation: UseMutationResult<AxiosResponse, Error, Record<string, React.ReactNode> | undefined | null | void>;
}
