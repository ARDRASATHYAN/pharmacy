import apiClient from "@/services/apiClient";
import { useQuery } from "@tanstack/react-query";


export function usePurchaseReturnList() {
  return useQuery({
    queryKey: ["purchase-return-list"],
    queryFn: async () => {
      const res = await apiClient.get("/purchasereturn");
      return res.data;
    }
  });
}

export function usepurchasereturnitems() {
  return useQuery({
    queryKey: ["purchasereturnitem"],
   queryFn: async () => {
      const res = await apiClient.get("/purchasereturn/items");
      return res.data;
    }
  });
}
