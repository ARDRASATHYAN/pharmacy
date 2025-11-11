
import itemService from "@/services/itemService";
import StoreStockService from "@/services/storeStockService";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useStoreStock() {
  return useQuery({
    queryKey: ["storestock"],
    queryFn: StoreStockService.getStoreStock,
    staleTime: 1000 * 60 * 5, // 5 min cache
  });
}

export function useAddStoreStock() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn:StoreStockService.StoreStockCreate,
    onSuccess: () => queryClient.invalidateQueries(["storestock"]),
  });
}


export function useSingleStoreStock() {
  return useMutation({
    mutationFn: (id) => StoreStockService.getSingleStoreStock(id),
  });
}

export function useUpdateStoreStock() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => StoreStockService.updateStoreStock(id, data),
    onSuccess: () => queryClient.invalidateQueries(["storestock"]),
  });
}

export function useDeleteStoreStock() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn:StoreStockService.deleteStoreStock,
    onSuccess: () => queryClient.invalidateQueries(["storestock"]),
  });
}
