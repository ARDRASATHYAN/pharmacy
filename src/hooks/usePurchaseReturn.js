import apiClient from "@/services/apiClient";
import purchaseReturnService from "@/services/purchaseReturnService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export function usePurchaseReturnList() {
  return useQuery({
    queryKey: ["purchase-return-list"],
    queryFn: purchaseReturnService.getPurchaseReturnList,
  });
}


// 🔹 Create purchase return
export function useCreatePurchaseReturn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: purchaseReturnService.createPurchaseReturn,
    onSuccess: () => {
      // ✅ correctly invalidate queries
      queryClient.invalidateQueries({ queryKey: ["purchase-return-list"] });
      queryClient.invalidateQueries({ queryKey: ["purchasereturnitem"] });
    },
  });
}

// 🔹 List of purchase return items
export function usePurchaseReturnItems() {
  return useQuery({
    queryKey: ["purchasereturnitem"],
    queryFn: purchaseReturnService.getPurchaseReturnItems,
  });
}