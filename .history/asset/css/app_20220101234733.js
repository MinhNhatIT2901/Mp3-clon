const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const cd = $('.cd');
const heading = $('.header-name');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const playBtn = $('.btn-toggle-play');
const player = $('.player');
const progress = $('#progress');

const app = {
    currentIndex: 0,
    isPlaying: false,
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
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },
    handleEvents: function() {
        const _this = this
        
        // Xu ly phong to hoac thu nho CD
        const cdWidth = cd.offsetWidth;
        document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        }

        // Xu ly khi click play
        playBtn.onclick = function() {
            if(_this.isPlaying) {
                audio.pause()
            }else {
                audio.play()
            }
        }

        // Khi song duoc play
        audio.onplay = function() {
            _this.isPlaying = true
            player.classList.add('playing')
        }

        // Khi song bi pause
        audio.onpause = function() {
            _this.isPlaying = false
            player.classList.remove('playing')
        }

        // B???t ti???n ????? b??i h??t 
        audio.ontimeupdate = function() {
            if(audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
            }
        }

        // Xu ly khi tua
        progress.onchange = function(e) { 
            const seekTime =  audio.duration / 100 * e.target.value
            audio.currentTime = seekTime 
        }

        // X??? l?? CD quay / d???ng
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)'}
        ], {
            duration: 10000, // 10 seconds
            iterations: Infinity
        })
        cdThumbAnimate.pause
    },
    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
    },
    start: function() {
        // ?????nh ngh??a c??c thu???c t??nh cho object
        this.defineProperties();

        // L???ng nghe / x??? l?? c??c s??? ki???n (DOM event)
        this.handleEvents();

        // Load thong tin bai hat dau tien vao` UI
        this.loadCurrentSong();

        // Render playlist
        this.render();
    }
}

app.start();
