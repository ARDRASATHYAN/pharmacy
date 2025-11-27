import apiClient from "./apiClient";


const reportService = {

   getpurchasereport: async (filters = {}) => {
      const { data } = await apiClient.get("/reports/purchase",{params: filters} );
      return data.data;
    },

     getsalereport: async (filters = {}) => {
      const { data } = await apiClient.get("/reports/sale",{params: filters} );
      return data.data;
    },

    getPurchaseReturnReport: async (filters = {}) => {
      const { data } = await apiClient.get("/reports/purchase-return",{params: filters} );
      return data.data;
    },

     getSalesReturnReport: async (filters = {}) => {
      const { data } = await apiClient.get("/reports/sale-return",{params: filters} );
      return data.data;
    },
 
};



export default reportService;
