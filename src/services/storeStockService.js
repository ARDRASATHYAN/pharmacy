import apiClient from "./apiClient";

const StoreStockService = {
 // services/userService.js
 StoreStockCreate: async (data) => {
  const res = await apiClient.post("/store_stock",data);
  return res.data;
},



  getStoreStock: async () => {
    const { data } = await apiClient.get("/store_stock");
    return data;
  },


  getSingleStoreStock: async (id) => {
    const { data } = await apiClient.get(`/store_stock/${id}`);
    return data;
  },

  deleteStoreStock: async (id) => {
    const { data } = await apiClient.delete(`/store_stock/${id}`);
    return data;
  },

  updateStoreStock: async (id, payload) => {
    const { data } = await apiClient.put(`/store_stock/${id}`, payload);
    return data;
  },

}
export default  StoreStockService;