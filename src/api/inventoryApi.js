import api from "./api";

export const getProductsApi = async (queryString = "") => {
    const endpoint = queryString
        ? `/public/products?${queryString}`
        : "/public/products";

    const { data } = await api.get(endpoint);
    return data;
};

export const searchProductsApi = async (queryString = "") => {
    const endpoint = queryString
        ? `/public/products/search?${queryString}`
        : "/public/products/search";

    const { data } = await api.get(endpoint);
    return data;
};

export const getAllProductsApi = async () => {
    const { data } = await api.get("/public/products");
    return data;
};

export const getCategoriesApi = async () => {
    const { data } = await api.get("/public/categories");
    return data;
};
