import stockService from "@/services/stockService";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function usestock() {
  return useQuery({
    queryKey: ["stock"],
    queryFn: stockService.getStocks,
    staleTime: 1000 * 60 * 5, // 5 min cache
  });
}


const fetchStoreStock = async ({ queryKey }) => {
  const [, { store_id, item_id }] = queryKey;

  if (!store_id || !item_id) return [];

  const res = await apiClient.get("/stock/store-stock", {
    params: { store_id, item_id },
  });

  return res.data || [];
};

export const useStoreStock = (store_id, item_id) => {
  return useQuery({
    queryKey: ["storeStock", { store_id, item_id }],
    queryFn: fetchStoreStock,
    enabled: !!store_id && !!item_id, // only fetch when both exist
  });
};
