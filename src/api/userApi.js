import api from "./api";
import { getAuthToken } from "../utils/auth";

export const getAddressesApi = async () => {
    const token = getAuthToken();

    const { data } = await api.get("/auth/user/addresses", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return data;
};

export const updateUserApi = async (userData) => {
    const token = getAuthToken();

    const { data } = await api.put("/auth/user/update", userData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return data;
};
