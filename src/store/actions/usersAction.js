import {
    getAddressesApi,
    updateUserApi,
} from "../../api/userApi";

export const fetchAddresses = () => async (dispatch) => {
    dispatch({ type: "ADDRESS_FETCH_REQUEST" });

    try {
        const data = await getAddressesApi();

        dispatch({
            type: "ADDRESS_FETCH_SUCCESS",
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: "ADDRESS_FETCH_FAIL",
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const updateUser = (userData) => async (dispatch) => {
    dispatch({ type: "USER_UPDATE_REQUEST" });

    try {
        const data = await updateUserApi(userData);

        dispatch({
            type: "USER_UPDATE_SUCCESS",
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: "USER_UPDATE_FAIL",
            payload: error.response?.data?.message || error.message,
        });
    }
};
