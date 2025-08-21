const API_BASE_URL = import.meta.env.VITE_MARVEL_BASE_URL;
const API_PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;
const API_PRIVATE_KEY = import.meta.env.VITE_PRIVATE_KEY;
const API_DRGB_URL = "https://dragonball-api.com/api/characters";

const config = {
    apiBaseUrl: API_BASE_URL,
    apiPublicKey: API_PUBLIC_KEY,
    apiPrivateKey: API_PRIVATE_KEY,
    apiDrgUrl: API_DRGB_URL,
};
export default config;
