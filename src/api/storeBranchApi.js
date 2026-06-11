import api from "./api";

export const getStoresApi = async () => {
    const response = await api.get("/stores");
    return response.data;
};

export const createStoreApi = async (payload) => {
    const response = await api.post("/admin/stores", payload);
    return response.data;
};

export const updateStoreApi = async (id, payload) => {
    const response = await api.put(`/admin/stores/${id}`, payload);
    return response.data;
};

export const deleteStoreApi = async (id) => {
    const response = await api.delete(`/admin/stores/${id}`);
    return response.data;
};
