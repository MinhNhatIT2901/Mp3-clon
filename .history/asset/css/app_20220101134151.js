const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const app = {
    songs: [
        {
            name: 'So far away',
            singer: 'Martin Garrix & David Guetta',
            path : 'https://zingmp3.vn/bai-hat/So-Far-Away-Martin-Garrix-David-Guetta-Jamie-Scott-Romy/ZW8WAW9B.html',
            image : './asset/img/img1.jpg'
        },

        {
            name: 'Señorita',
            singer: 'Shawn Mendes, Camila Cabello',
            path : 'https://zingmp3.vn/bai-hat/Senorita-Shawn-Mendes-Camila-Cabello/ZWAFDUW0.html',
            image : './asset/img/img2.jpg'
        },

        {
            name: 'Mistletoe',
            singer: 'Justin Bieber',
            path : 'https://zingmp3.vn/bai-hat/Mistletoe-Justin-Bieber/ZWZE0FWU.html',
            image : './asset/img/img3.jpg'
        },

        {
            name: 'Past Lives',
            singer: 'sapientdream',
            path : 'https://zingmp3.vn/bai-hat/Past-Lives-Bass-Communion/ZW6OOF9C.html',
            image : './asset/img/img1.jpg'
        },

        {
            name: 'Dancing in my room',
            singer: '347aidan',
            path : 'https://zingmp3.vn/bai-hat/Dancing-in-My-Room-347aidan/ZO0IW0DA.html',
            image : './asset/img/img5.jpg'
        },

        {
            name: 'I love you 3000',
            singer: 'Jackson Wang',
            path : 'https://zingmp3.vn/bai-hat/I-Love-You-3000-Chinese-Version-Jackson-Wang/ZWB080I0.html',
            image : './asset/img/img6.jpg'
        }
    ],

    render: function() {
        const htmls = this.songs.map(song => {
            return 
            `
            <div class="song">
                <div class="thumb" style="background-image: url('${song.image}')">
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