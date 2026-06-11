import {
    getAdminOrdersApi,
    getOrdersApi,
    getUserOrdersApi,
} from "../../api/orderApi";

export const fetchOrders = () => async (dispatch) => {
    dispatch({ type: "ORDER_FETCH_REQUEST" });

    try {
        const data = await getOrdersApi();

        dispatch({
            type: "ORDER_FETCH_SUCCESS",
            payload: data,
        });
    } catch (error) {
        console.error("Lỗi khi fetch orders:", error);
        dispatch({
            type: "ORDER_FETCH_FAIL",
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const fetchUserOrders = (
    page = 0,
    size = 2,
    sortBy = "orderId",
    sortDir = "desc"
) => async (dispatch) => {
    dispatch({ type: "ORDER_USER_REQUEST" });

    try {
        const data = await getUserOrdersApi({ page, size, sortBy, sortDir });

        dispatch({
            type: "ORDER_USER_SUCCESS",
            payload: {
                orders: data.content,
                totalPages: data.totalPages,
                totalElements: data.totalElements,
                pageNumber: data.pageable?.pageNumber,
                pageSize: data.pageable?.pageSize,
                lastPage: data.last,
            },
        });
    } catch (error) {
        dispatch({
            type: "ORDER_USER_FAILURE",
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const fetchAdminOrders = (queryString) => async (dispatch) => {
    dispatch({ type: "ADMIN_ORDER_FETCH_REQUEST" });

    try {
        const data = await getAdminOrdersApi(queryString);

        dispatch({
            type: "ADMIN_ORDER_FETCH_SUCCESS",
            payload: {
                orders: data.content,
                pageNumber: data.pageNumber,
                pageSize: data.pageSize,
                totalElements: data.totalElements,
                totalPages: data.totalPages,
                lastPage: data.lastPage,
            },
        });
    } catch (error) {
        dispatch({
            type: "ADMIN_ORDER_FETCH_FAIL",
            payload: error.response?.data?.message || error.message,
        });
    }
};
