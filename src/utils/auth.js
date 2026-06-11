export const getStoredAuth = () => {
    try {
        const auth = localStorage.getItem("auth");
        return auth ? JSON.parse(auth) : null;
    } catch (error) {
        return null;
    }
};

export const getAuthToken = () => getStoredAuth()?.jwtToken || null;

const decodeBase64Url = (value) => {
    const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(normalized.length + ((4 - normalized.length % 4) % 4), "=");

    return decodeURIComponent(
        atob(padded)
            .split("")
            .map((char) => `%${char.charCodeAt(0).toString(16).padStart(2, "0")}`)
            .join("")
    );
};

export const decodeJwtPayload = (token) => {
    try {
        const [, payload] = token.split(".");
        if (!payload) {
            return null;
        }

        return JSON.parse(decodeBase64Url(payload));
    } catch (error) {
        return null;
    }
};

export const buildAuthSession = (token, profile = {}) => {
    const payload = decodeJwtPayload(token) || {};
    const role = Array.isArray(profile.role)
        ? profile.role
        : Array.isArray(payload.role)
            ? payload.role
            : Array.isArray(payload.roles)
                ? payload.roles
                : [];

    return {
        jwtToken: token,
        id: profile.id ?? payload.id ?? payload.userId ?? null,
        userName: profile.userName ?? payload.userName ?? payload.sub ?? "",
        email: profile.email ?? payload.email ?? "",
        role,
    };
};

export const persistAuthSession = (auth) => {
    localStorage.setItem("auth", JSON.stringify(auth));
};
