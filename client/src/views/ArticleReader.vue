<template>
    <div v-if="modalFigure" class="modal-backdrop" @click="modalFigure = null"></div>
    <div v-if="modalFigure" class="modal">
        <img :src="modalFigure.image"/>
        <AudioController :src="modalFigure.audio"/>
    </div>
    <div class="container">
        <div class="row" style="margin-bottom: 0;">
            <AudioController :src="audioUrl" ref="controller"/>
        </div>
        <div class="row read-row">
            <div id="section-panel" class="col s3">
                <div class="section-select">
                    <button class="btn btn-flat" :class="{ active: sectionSelect }" @click="sectionSelect = true">
                        Sections
                    </button>
                    <button class="btn btn-flat" :class="{ active: !sectionSelect }" @click="sectionSelect = false">
                        Figures
                    </button>
                </div>
                <ul v-if="sectionSelect" class="collection">
                    <li
                        v-for="annotation of annotationData.annotations"
                        :key="annotation.label"
                        class="collection-item annotation-label"
                        @click="moveTo(annotation.timestamp)"
                    >
                        {{ annotation.label }}
                        <span class="secondary-content">(Pg.{{ annotation.page }})</span>
                    </li>
                </ul>
                <ul v-else class="collection">
                    <span v-if="articleObj.features.length === 0">
                        There are no related figures for this study.
                    </span>
                    <li
                        v-else
                        v-for="feature of articleObj.features"
                        :key="feature"
                        v-text="feature"
                        class="collection-item"
                        @click="showFeature(feature)"
                    >
                    </li>
                </ul>
            </div>
            <div id="pdf-panel" class="col s9">
                <embed
                    id="pdf-embed"
                    v-if="pdfUrl"
                    :src="pdfUrl"
                    type="application/pdf"
                    scrolling="auto"
                    width="100%"
                    height="100%"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

import { fetchAnnotation, fetchArticle } from "@/api";
import { AnnotationObject, ArticleObject } from "../common/Catalog";
import AudioController from "../components/AudioController.vue";



@Options({
    components: { AudioController }
})
export default class ArticleReaderPage extends Vue
{
    public pdfUrl: string | null = null;
    public audioUrl: string | null = null;

    public articleObj: ArticleObject | null = null;
    public annotationData: AnnotationObject = { annotations: [  ] };

    public playing = false;
    public elapsedTime = "00:00";
    public endTime = "00:00";
    public audioProgress = "0%";

    public sectionSelect = true;
    public modalFigure: { audio: string, image: string } | null = null;

    private get controller() { return this.$refs.controller as AudioController; }



    public mounted(): void {
        const article = this.$route.params.article as string;
        this.pdfUrl   = `/api/catalog/${article}/pdf`;
        this.audioUrl = `/api/catalog/${article}/audio`;

        fetchArticle(article).then((data) => {
            this.articleObj = data;
            console.log(data);
        });
        fetchAnnotation(article).then((data) => this.annotationData = data);
    }

    public moveTo(millis: number): void {
        this.controller.moveTo(millis);
    }
    public showFeature(feature: string): void {
        this.modalFigure = {
            image: `/api/catalog/${this.$route.params.article}/feature/${feature}/image`,
            audio: `/api/catalog/${this.$route.params.article}/feature/${feature}/audio`
        };
    }
}
</script>

<style scoped lang="scss">
$light-brown: #e09448;

#control-panel {
    background-color: $light-brown;

    margin-bottom: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
}
.read-row {
    display: flex;
    flex-flow: row;
    align-content: stretch;

    height:95vh;
    padding-bottom: 20px;
}
#section-panel {
    background-color: $light-brown;
    overflow-y: auto;

    border-top-left-radius: 0;
    border-top-right-radius: 0;

    .section-select {
        text-align: center;

        .btn.active {
            background-color: orange;
        }
    }

    .collection-item {
        cursor: pointer;
        &:hover { background-color: #e0e0e0; }
    }
}
#pdf-panel {
    padding: 0;
    &>embed { height: 100%; }
}

.modal-backdrop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    background-color: black;
    opacity: 0.5;
    z-index: 9;
}
.modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);

    z-index: 10;
    padding: 1rem;
    border-radius: 5px;

    img {
        max-width: 960px;
        max-height: 90vh;
    }
}
</style>
