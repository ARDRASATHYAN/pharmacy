import stockService from "@/services/stockService";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function usestock() {
  return useQuery({
    queryKey: ["stock"],
    queryFn: stockService.getStocks,
    staleTime: 1000 * 60 * 5, // 5 min cache
  });
}
