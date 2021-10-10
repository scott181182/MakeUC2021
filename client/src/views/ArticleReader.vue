<template>
    <div class="container">
        <div class="row" style="margin-bottom: 0;">
            <AudioController :src="audioUrl" ref="controller"/>
        </div>
        <div class="row read-row">
            <div id="section-panel" class="col s3">
                <ul class="collection">
                    <li
                        v-for="annotation of annotationData.annotations"
                        :key="annotation.label"
                        v-text="annotation.label"
                        class="collection-item annotation-label"
                        @click="moveTo(annotation.timestamp)"
                    ></li>
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

import { fetchAnnotation } from "@/api";
import { AnnotationObject } from "../common/Catalog";
import AudioController from "../components/AudioController.vue";



@Options({
    components: { AudioController }
})
export default class ArticleReaderPage extends Vue
{
    public pdfUrl: string | null = null;
    public audioUrl: string | null = null;

    public annotationData: AnnotationObject = { annotations: [  ] };

    public playing = false;
    public elapsedTime = "00:00";
    public endTime = "00:00";
    public audioProgress = "0%";

    private get controller() { return this.$refs.controller as AudioController; }

    public mounted(): void {
        const article = this.$route.params.article as string;
        this.pdfUrl   = `/api/catalog/${article}/pdf`;
        this.audioUrl = `/api/catalog/${article}/audio`;

        fetchAnnotation(article).then((data) => {
            this.annotationData = data;
            console.log(this.annotationData);
        });
    }

    public moveTo(millis: number): void {
        this.controller.moveTo(millis);
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

    .collection-item {
        cursor: pointer;
        &:hover { background-color: #e0e0e0; }
    }
}
#pdf-panel {
    padding: 0;
    &>embed { height: 100%; }
}
</style>
