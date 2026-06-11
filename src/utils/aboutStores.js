export const ABOUT_STORES_STORAGE_KEY = "clothiq_about_stores";

export const defaultAboutStores = [
    {
        id: "store-1",
        branchName: "Cơ sở 1",
        address: "123 Nguyen Trai, Phuong Ben Thanh, Quan 1, TP. Ho Chi Minh",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=123+Nguyen+Trai+Quan+1+TP+Ho+Chi+Minh",
        embedUrl: "https://www.google.com/maps?q=123%20Nguyen%20Trai%20Quan%201%20TP.%20Ho%20Chi%20Minh&z=15&output=embed",
    },
    {
        id: "store-2",
        branchName: "Cơ sở 2",
        address: "456 Le Van Viet, Phuong Tang Nhon Phu A, TP. Thu Duc, TP. Ho Chi Minh",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=456+Le+Van+Viet+Thu+Duc+TP+Ho+Chi+Minh",
        embedUrl: "https://www.google.com/maps?q=456%20Le%20Van%20Viet%20Thu%20Duc%20TP.%20Ho%20Chi%20Minh&z=15&output=embed",
    },
];

export function extractGoogleMapsEmbedUrl(value) {
    if (!value) {
        return "";
    }

    const trimmedValue = value.trim();
    const iframeSrcMatch = trimmedValue.match(/src=["']([^"']+)["']/i);

    if (iframeSrcMatch?.[1]) {
        return iframeSrcMatch[1];
    }

    return trimmedValue;
}

export function getAboutStores() {
    if (typeof window === "undefined") {
        return defaultAboutStores;
    }

    try {
        const stored = window.localStorage.getItem(ABOUT_STORES_STORAGE_KEY);
        if (!stored) {
            return defaultAboutStores;
        }

        const parsed = JSON.parse(stored);
        if (!Array.isArray(parsed) || parsed.length === 0) {
            return defaultAboutStores;
        }

        return parsed;
    } catch (error) {
        console.error("Failed to read about stores from localStorage", error);
        return defaultAboutStores;
    }
}

export function saveAboutStores(stores) {
    if (typeof window === "undefined") {
        return;
    }

    window.localStorage.setItem(ABOUT_STORES_STORAGE_KEY, JSON.stringify(stores));
}
