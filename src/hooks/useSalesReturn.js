// src/hooks/useSalesReturn.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/services/apiClient";

// ✅ Create sales return
export const useAddSalesReturn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const res = await apiClient.post("/sales-returns", data);
      return res.data;
    },
    onSuccess: (data) => {
      console.log("Sales return created:", data);
      // invalidate if you have list query
      queryClient.invalidateQueries(["sales-returns"]);
    },
    onError: (error) => {
      console.error("Error creating sales return:", error);
    },
  });
};
