import { promises as fs, createReadStream } from "fs";
import path from "path";

import { Request, RequestHandler, Router } from "express";
import { ResponseError, sendData } from "./util";
import { ArticleObject, CatalogObject } from "./common/Catalog";



const dataDir = path.resolve(__dirname, "..", "data");
const catalogFile = path.join(dataDir, "catalog.json");

interface RawArticleObject {
    title: string;
    authors: string;
    keywords: string[];
    abstract: string;
    features: Record<string, { audio: string; image: string; }>
    pdf: string;
    audio: string;
    annotation: string;
}
function article2client(obj: RawArticleObject): ArticleObject {
    return {
        title:    obj.title,
        authors:  obj.authors,
        keywords: obj.keywords,
        abstract: obj.abstract,
        features: Object.keys(obj.features)
    };
}
async function loadArticle(article: string) {
    if(article in articleCache) {
        return articleCache[article];
    }

    let fileData: string;
    try {
        fileData = await fs.readFile(path.join(dataDir, article, "article.json"), "utf8");
    } catch(err) {
        throw new ResponseError(`Article '${article}' not found`, 404);
    }
    let jsonObj: RawArticleObject;
    try {
        jsonObj = JSON.parse(fileData);
    } catch(err) {
        console.error(err);
        throw new ResponseError("There was a problem locating that article");
    }

    return articleCache[article] = jsonObj;
}
function sendArticleFile(property: keyof RawArticleObject): RequestHandler;
function sendArticleFile(propertyFn: (req: Request, article: RawArticleObject) => string): RequestHandler;
function sendArticleFile(propertyOrFn: keyof RawArticleObject | ((req: Request, article: RawArticleObject) => string)): RequestHandler {
    return typeof propertyOrFn === "string" ? async (req, res) => {
        const article = req.params.article;
        try {
            const data = await loadArticle(article);
            return res.sendFile(path.join(dataDir, article, data[propertyOrFn] as string));
        } catch(err) {
            return ResponseError.handle(res, err);
        }
    } : async (req, res) => {
        const article = req.params.article;
        try {
            const data = await loadArticle(article);
            const filename = propertyOrFn(req, data);
            return res.sendFile(path.join(dataDir, article, filename));
        } catch(err) {
            return ResponseError.handle(res, err);
        }
    };
}



const router = Router();

const articleCache: Record<string, RawArticleObject> = {  };



router.get("/", (_req, res) => {
    return fs.readFile(catalogFile, "utf8")
        .then((data) => JSON.parse(data))
        .then((data: CatalogObject) => sendData(res, data, data.articles.length));
})
router.get("/:article", async (req, res) => {
    const article = req.params.article;

    try {
        const data = await loadArticle(article);
        return sendData(res, article2client(data));
    } catch(err) {
        return ResponseError.handle(res, err);
    }
});
router.get("/:article/pdf",        sendArticleFile("pdf"));
router.get("/:article/audio", async (req, res) => {
    const article = req.params.article;
    try {
        const data = await loadArticle(article);
        const audioPath = path.join(dataDir, article, data.audio);

        const stat = await fs.stat(audioPath);
        res.writeHead(200, {
            "Content-Type": "audio/ogg",
            "Content-Length": stat.size
        });

        createReadStream(audioPath).pipe(res);
    } catch(err) {
        return ResponseError.handle(res, err);
    }
});
router.get("/:article/annotation", sendArticleFile("annotation"));
router.get("/:article/feature/:feature/image", sendArticleFile((req, article) => article.features[req.params.feature].image));
router.get("/:article/feature/:feature/audio", async (req, res) => {
    const { article, feature } = req.params;
    try {
        const data = await loadArticle(article);
        const audioPath = path.join(dataDir, article, data.features[feature].audio);

        const stat = await fs.stat(audioPath);
        res.writeHead(200, {
            "Content-Type": "audio/ogg",
            "Content-Length": stat.size
        });

        createReadStream(audioPath).pipe(res);
    } catch(err) {
        return ResponseError.handle(res, err);
    }
});



export default router;
