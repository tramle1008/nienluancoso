import api from "./api";
import { getAuthToken } from "../utils/auth";

export const getCartApi = async () => {
    const token = getAuthToken();

    const { data } = await api.get("/auth/carts/user/cart", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return data;
};
