import API from "../utils/axiosInstance";

export const createClaimAPI = async (itemId, message) => {
  const response = await API.post("/claims", { 
    item_id: itemId,
    message: message 
  });
  return response.data;
};

export const updateClaimStatusAPI = async (claimId, status) =>{
  const response = await API.put(`/claims/${claimId}/status`,
    {
      status: status
    });
    return response.data;
}

export const getAllClaimsAPI = async() =>{
  const response = await API.get('/claims');
  return response.data;
};
