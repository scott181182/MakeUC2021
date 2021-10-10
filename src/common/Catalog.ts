
export interface CatalogObject
{
    articles: {
        title: string;
        authors: string;
        keywords: string[];
        directory: string;
    }[];
}

export interface ArticleObject
{
    title: string;
    authors: string;
    keywords: string[];
    abstract: string;
    features: string[];
}
