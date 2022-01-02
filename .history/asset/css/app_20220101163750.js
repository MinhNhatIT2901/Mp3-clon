const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const app = {
    songs: [
        {
            name: 'Holo',
            singer: 'Jonh',
            path: './asser/music/holo.mp3'
        },
        {
            name: 'Home',
            singer: 'Jonh',
            path: './asser/music/home.mp3'
        },
        {
            name: 'Summer',
            singer: 'Jonh',
            path: './asser/music/mp3_music_summer.mp3'
        },
        {
            name: 'Spark',
            singer: 'Jonh',
            path: './asser/music/spark.mp3'
        },
    ],
    render: function() {
        console.log(123)
    },
    start: function() {
        this.render();
    }

}

app.start();
