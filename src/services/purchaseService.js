import apiClient from "./apiClient";


const purchaseService = {
  createPurchase: async (payload) => {
    const { data } = await apiClient.post("/purchase", payload);
    return data;
  },
   getpurchaseInvoise: async () => {
      const { data } = await apiClient.get("/purchase");
      return data;
    },
    getpurchasItem: async () => {
      const { data } = await apiClient.get("/purchase/items");
      return data;
    },
};

export default purchaseService;
