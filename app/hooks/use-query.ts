import { useQueryClient, type QueryKey } from '@tanstack/react-query';

interface UseQueryRefreshKeyResponse {
  call: (queryKey?: QueryKey) => void;
}

export function useQueryRefreshKey(): UseQueryRefreshKeyResponse {
  const queryClient = useQueryClient();

  const call = (queryKey?: QueryKey) => {
    if (!queryKey) {
      return;
    }

    queryKey.forEach(key => {
      queryClient.removeQueries({ queryKey: Array.isArray(key) ? key : [key] });
    });
  };

  return {
    call,
  };
}
