import axios from "axios";
import { AnnotationObject, ArticleObject, CatalogObject } from "./common/Catalog";



const Endpoints = {
    CATALOG: "/api/catalog",
    ARTICLE: (article: string) => `/api/catalog/${article}`,
    ANNOTATION: (article: string) => `/api/catalog/${article}/annotation`,
} as const;

function fetchJSON(endpoint: string) {
    return axios.get(endpoint, {
        headers: {
            "Accept": "application/json"
        }
    });
}
// function fetchText(endpoint: string) {
//     return axios.get(endpoint, {
//         headers: {
//             "Accept": "text/plain"
//         }
//     });
// }


export function fetchCatalog(): Promise<CatalogObject>
{
    return fetchJSON(Endpoints.CATALOG).then((res) => res.data);
}
export function fetchArticle(article: string): Promise<ArticleObject>
{
    return fetchJSON(Endpoints.ARTICLE(article)).then((res) => res.data);
}

export function fetchAnnotation(article: string): Promise<AnnotationObject>
{
    return fetchJSON(Endpoints.ANNOTATION(article)).then((res) => res.data);
}
