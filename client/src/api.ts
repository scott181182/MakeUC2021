import axios from "axios";
import { ArticleObject, CatalogObject } from "./common/Catalog";



const Endpoints = {
    CATALOG: "/api/catalog",
    ARTICLE: (article: string) => `/api/catalog/${article}`,
} as const;

function fetchJSON(endpoint: string) {
    return axios.get(endpoint, {
        headers: {
            "Accept": "application/json"
        }
    });
}


export function fetchCatalog(): Promise<CatalogObject>
{
    return fetchJSON(Endpoints.CATALOG).then((res) => res.data);
}
export function fetchArticle(article: string): Promise<ArticleObject>
{
    return fetchJSON(Endpoints.ARTICLE(article)).then((res) => res.data);
}
