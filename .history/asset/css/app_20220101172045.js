const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const app = {
    songs: [
        {
            name: 'Holo',
            singer: 'Jonh',
            path: './asset/music/holo.mp3',
            image: 'https://a10.gaanacdn.com/images/song/39/24225939/crop_480x480_1536749130.jpg'
        },
        {
            name: 'Home',
            singer: 'Jonh',
            path: './asset/music/home.mp3',
            image: './asset/img/img2.jpg'
        },
        {
            name: 'Summer',
            singer: 'Jonh',
            path: './asser/music/mp3_music_summer.mp3',
            image: './asset/img/img3.jpg'
        },
        {
            name: 'Spark',
            singer: 'Jonh',
            path: './asset/music/spark.mp3',
            image: './asset/img/img4.jpg'
        }
    ],
    render: function() {
        const htmls = this.songs.map(song => {
            return `
                div class="song">
                    <div class="thumb" 
                        style="background-image: url('${song.image}')">
                    </div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `
        })
        $('.playlist').innerHTML = htmls.join('');
    },
    start: function() {
        this.render();
    }
}

app.start();
