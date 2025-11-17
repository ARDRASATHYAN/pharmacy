import apiClient from "./apiClient";


const stockService = {
 
    getStocks: async () => {
      const { data } = await apiClient.get("/stock");
      return data;
    },
};

export default stockService;
