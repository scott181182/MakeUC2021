<template>
    <div class="container" style="height: 100%;">
        <div class="row" style="margin-bottom: 0;">
            <div id="control-panel" class="col s12">
                <audio
                    style="display: hidden"
                    ref="audio"
                >
                    <source :src="audioUrl" type="audio/wav"/>
                    Sorry, your browser does not support the audio element.
                </audio>
                <div class="controls">
                    <button class="play button" aria-label="play pause toggle" @click="togglePlay">
                        <i :class="[ 'fas', playing ? 'fa-pause' : 'fa-play' ]"></i>
                    </button>
                    <div class="timer">
                        <span aria-label="timer" v-text="elapsedTime"></span>
                        <div class="progress">
                            <div class="determinate" :style="{ width: audioProgress }"></div>
                        </div>
                        <span v-text="endTime"></span>
                    </div>
                </div>
            </div>
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
import { Vue } from "vue-class-component";

import { fetchAnnotation } from "@/api";
import { AnnotationObject } from "../common/Catalog";



export default class ArticleReaderPage extends Vue
{
    public pdfUrl: string | null = null;
    public audioUrl: string | null = null;

    public annotationData: AnnotationObject = { annotations: [  ] };

    public playing = false;
    public elapsedTime = "00:00";
    public endTime = "00:00";
    public audioProgress = "0%";

    private get audio() { return this.$refs.audio as HTMLAudioElement; }

    public mounted(): void {
        this.$refs.audio
        const article = this.$route.params.article as string;
        this.pdfUrl   = `/api/catalog/${article}/pdf`;
        this.audioUrl = `/api/catalog/${article}/audio`;

        this.audio.addEventListener("timeupdate", () => this.updateTime("elapsedTime", this.audio.currentTime));
        this.audio.addEventListener("loadeddata", () => this.updateTime("endTime",     this.audio.duration));

        fetchAnnotation(article).then((data) => {
            this.annotationData = data;
            console.log(this.annotationData);
        });
    }

    public togglePlay(): void {
        if(this.audio.paused) {
            this.audio.play();
            this.playing = true;
        } else {
            this.audio.pause();
            this.playing = false;
        }
    }
    public moveTo(millis: number): void {
        console.log(`Moving to ${millis} = ${millis/1000}`);
        if(this.audio.paused) {
            this.audio.currentTime = millis / 1000;
        } else {
            this.audio.pause();
            this.audio.currentTime = millis / 1000;
            this.audio.play();
        }
    }

    private updateTime(key: "elapsedTime" | "endTime", time: number) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time - minutes * 60);

        const minuteValue = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const secondValue = seconds < 10 ? `0${seconds}` : `${seconds}`;

        this[key] = `${minuteValue}:${secondValue}`;
        this.audioProgress = (this.audio.currentTime * 100 / this.audio.duration).toPrecision(4) + "%";
    }
}

function seconds2string(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time - minutes * 60);

    const minuteValue = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const secondValue = seconds < 10 ? `0${seconds}` : `${seconds}`;

    return`${minuteValue}:${secondValue}`;
}
</script>

<style lang="scss">
$light-brown: #e09448;

#control-panel {
    background-color: $light-brown;

    margin-bottom: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;

    .controls {
        display: flex;
        flex-flow: row;
        padding: 0.5rem;
        align-content: center;

        .timer {
            display: flex;
            flex-flow: row;
            align-items: center;

            flex-grow: 1;
            margin-left: 1rem;

            div.progress {
                flex-grow: 1;
                margin: .5rem 1rem;
            }
        }
    }
}
.read-row {
    display: flex;
    flex-flow: row;
    align-content: stretch;
}
#section-panel {
    background-color: $light-brown;

    border-top-left-radius: 0;
    border-top-right-radius: 0;
}
#pdf-panel {
    &>embed { min-height: 700px; }
    padding: 0;
}
</style>
