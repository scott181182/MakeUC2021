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
                        <div></div>
                        <span aria-label="timer" v-text="elapsedTime"></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="row read-row">
            <div id="section-panel" class="col s3">

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
            <!-- <div id="read-panel">
            </div> -->
        </div>
    </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";



export default class ArticleReaderPage extends Vue
{
    public pdfUrl: string | null = null;
    public audioUrl: string | null = null;
    public playing = false;
    public elapsedTime = "00:00"

    private get audio() { return this.$refs.audio as HTMLAudioElement; }

    public mounted(): void {
        this.$refs.audio
        const article = this.$route.params.article as string;
        this.pdfUrl   = `/api/catalog/${article}/pdf`;
        this.audioUrl = `/api/catalog/${article}/audio`;

        // this.audio.addEventListener("timeupdate", () => this.updateTime());
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
    private updateTime() {
        const minutes = Math.floor(this.audio.currentTime / 60);
        const seconds = Math.floor(this.audio.currentTime - minutes * 60);

        const minuteValue = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const secondValue = seconds < 10 ? `0${seconds}` : `${seconds}`;

        this.elapsedTime = `${minuteValue}:${secondValue}`
    }
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
            flex-grow: 1;
            margin-left: 1rem;
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
