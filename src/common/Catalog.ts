
export interface CatalogObject
{
    articles: {
        title: string;
        authors: string;
        keywords: string[];
        abstract: string;
        abstractAudio: string;
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

export interface AnnotationObject
{
    annotations: {
        timestamp: number;
        label: string;
        page: number;
    }[];
}
