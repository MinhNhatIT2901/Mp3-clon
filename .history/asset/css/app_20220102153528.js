const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = 'NMN';

const cd = $('.cd');
const heading = $('.header-name');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const playBtn = $('.btn-toggle-play');
const player = $('.player');
const progress = $('#progress');
const prevBtn = $('.btn-prev');
const nextBtn = $('.btn-next');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');
const playList = $('.playlist');


const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
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
            path: './asset/music/mp3_music_summer.mp3',
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
            path: './asset/music/home.mp3',
            image: './asset/img/img5.jpg'
        },
        {
            name: 'Comback',
            singer: 'Shin Ka',
            path: './asset/music/mp3_music_summer.mp3',
            image: './asset/img/img6.jpg'
        },
    ],
    setConfig: function(key, value) {
        this.config[key] = value
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
    },
    render: function() {
        const htmls = this.songs.map((song, index) => {
            return `
            <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
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
        playList.innerHTML = htmls.join('');
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
            cdThumbAnimate.play()
        }

        // Khi song bi pause
        audio.onpause = function() {
            _this.isPlaying = false
            player.classList.remove('playing')
            cdThumbAnimate.pause()
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
        cdThumbAnimate.pause()

        // Khi next song
        nextBtn.onclick = function() {
            if(_this.isRandom) {
                _this.playRandomSong()
            }else {
                _this.nextSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }

        // Khi prev song
        prevBtn.onclick = function() {
            if(_this.isRandom) {
                _this.playRandomSong()
            }else {
                _this.prevSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }

        // Click random button
        randomBtn.onclick = function(e) {
            _this.isRandom = !_this.isRandom
            _this.setConfig('isRandom', this.isRandom)
            randomBtn.classList.toggle('active', _this.isRandom)
        }

        // Click repeat
        repeatBtn.onclick = function(e) {
            _this.isRepeat = !_this.isRepeat
            _this.setConfig('isRepeat', this.isRepeat)
            repeatBtn.classList.toggle('active', _this.isRepeat)
        }

        // Next song when audio ended or back
        audio.onended = function() {
            if(_this.isRepeat) {
                audio.play()
            }else {
                nextBtn.click()
            }
        }

        // Click playlist
        playList.onclick = function(e) {
            const songNode = e.target.closest('.song:not(.active)')
            if(songNode || e.target.closest('.option')) {

                // Xu ly khi click vao song
                if(songNode) {
                    _this.currentIndex = Number(songNode.dataset.index)
                    _this.loadCurrentSong()
                    _this.render()
                    audio.play()
                }

                // Xu ly khi click vao option song
                if(e.target.closest('.option')) {

                }
            }
        }
    }, 
    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
    },
    loadConfig: function () {
        this.isRandom= this.config.isRandom
        this.isRepeat= this.config.isRepeat
    },
    nextSong: function() {
        this.currentIndex++
        if(this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },
    prevSong: function() {
        this.currentIndex--
        if(this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
    },
    playRandomSong: function() {
        let newIndex 
        do {
            newIndex = Math.floor(Math.random() * this.songs.length) 
        }while(newIndex === this.currentIndex)
        this.currentIndex = newIndex
        this.loadCurrentSong()
    },
    // scrollToActiveSong: function() {
    //     setTimeout(() => {
    //         $('.song.active').scrollIntoView({
    //             behavior: 'smooth',
    //             block: 'neares'
    //         })
    //     }, 300)
    // },
    scrollToActiveSong: function() {
        setTimeout ( () => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'neares'
            })
        }, 300)
    },
    start: function() {
        this.loadConfig();
        // ?????nh ngh??a c??c thu???c t??nh cho object
        this.defineProperties();

        // L???ng nghe / x??? l?? c??c s??? ki???n (DOM event)
        this.handleEvents();

        // Load thong tin bai hat dau tien vao` UI
        this.loadCurrentSong();

        // Render playlist
        this.render();

        randomBtn.classList.toggle('active', thi. isRandom)
        repeatBtn.classList.toggle('active', this.isRepeat)
    }
}

app.start();
