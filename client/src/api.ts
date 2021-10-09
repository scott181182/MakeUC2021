import axios from "axios";



const Endpoints = {
    CATALOG: "/api/catalog"
} as const;

function fetchJSON(endpoint: string) {
    return axios.get(endpoint, {
        headers: {
            "Accept": "application/json"
        }
    });
}


export function getCatalog()
{
    return fetchJSON(Endpoints.CATALOG)
}
