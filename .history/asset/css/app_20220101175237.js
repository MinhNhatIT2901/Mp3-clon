const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const app = {
    songs: [
        {
            name: 'Holo',
            singer: 'Jonh',
            path: './asset/music/holo.mp3',
            image: './asset/img/img1.jpg'
        },
        {
            name: 'Home',
            singer: 'Stack',
            path: './asset/music/home.mp3',
            image: './asset/img/img2.jpg'
        },
        {
            name: 'Summer',
            singer: 'Min',
            path: './asser/music/mp3_music_summer.mp3',
            image: './asset/img/img3.jpg'
        },
        {
            name: 'Spark',
            singer: 'Pan',
            path: './asset/music/spark.mp3',
            image: './asset/img/img4.jpg'
        },
        {
            name: 'Hin',
            singer: 'Pani',
            path: './asset/music/home.mp',
            image: './asset/img/img5.jpg'
        },
        {
            name: 'Comback',
            singer: 'Shin Ka',
            path: './asset/music/spark.mp3',
            image: './asset/img/img6.jpg'
        },
    ],
    render: function() {
        const htmls = this.songs.map(song => {
            return `
            <div class="song">
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
    handleEvents: function() {
        const cd = $('.cd');
        const cdWidth = cd.offsetWidth;
        document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        }
    },
    start: function() {
        this.handleEvents();
        this.render();
    }
}

app.start();
