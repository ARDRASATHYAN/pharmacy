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
 
};



export default reportService;
