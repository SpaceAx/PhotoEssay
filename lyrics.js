// Lyrics data
const lyricsData = [
    { time: 8.91, chinese: "轻舞（soft music and graceful dances）", pinyin: "qīng wǔ", indonesian: "Menari dengan lembut (musik lembut dan tarian anggun)" },
    { time: 32.56, chinese: "当春江花 与月夜连成画", pinyin: "dāng chūn jiāng huā yǔ yuè yè lián chéng huà", indonesian: "Saat bunga di sungai musim semi bersatu dengan malam bulan, menjadi lukisan" },
    { time: 38.14, chinese: "就别再哭 去轻舞", pinyin: "jiù bié zài kū qù qīng wǔ", indonesian: "Jangan menangis lagi, menarilah dengan ringan" },
    { time: 43.71, chinese: "浮生若梦 去品读 别背诵", pinyin: "fú shēng ruò mèng qù pǐn dú bié bèi sòng", indonesian: "Hidup seperti mimpi, hayati saja… jangan hanya dihafal" },
    { time: 49.29, chinese: "像蝉翼轻盈吧", pinyin: "xiàng chán yì qīng yíng ba", indonesian: "Ringanlah seperti sayap jangkrik musim panas" },
    { time: 55.14, chinese: "有幸成为 雨中迷路的人", pinyin: "yǒu xìng chéng wéi yǔ zhōng mí lù de rén", indonesian: "Beruntunglah bisa menjadi orang yang tersesat dalam hujan" },
    { time: 77.45, chinese: "握不住风 就成为风", pinyin: "wò bù zhù fēng jiù chéng wéi fēng", indonesian: "Jika tak bisa menggenggam angin, maka jadilah angin itu" },
    { time: 82.77, chinese: "要无拘的去寻梦", pinyin: "yào wú jū de qù xún mèng", indonesian: "Pergilah mengejar mimpi tanpa batas" },
    { time: 88.61, chinese: "追不上光 就成为光", pinyin: "zhuī bú shàng guāng jiù chéng wéi guāng", indonesian: "Jika tak bisa mengejar cahaya, maka jadilah cahaya" },
    { time: 93.92, chinese: "去点亮自己的天堂", pinyin: "qù diǎn liàng zì jǐ de tiān táng", indonesian: "Untuk menyinari surgamu sendiri" },
    { time: 101.63, chinese: "假如我 只顾追向那 天之涯", pinyin: "jiǎ rú wǒ zhǐ gù zhuī xiàng nà tiān zhī yá", indonesian: "Jika suatu hari aku hanya sibuk mengejar hingga ke ujung langit" },
    { time: 112.78, chinese: "轻舞吧 别负那泪花", pinyin: "qīng wǔ ba bié fù nà lèi huā", indonesian: "Menarilah dengan lembut… jangan sia-siakan air mata itu" },
    { time: 115.71, chinese: "让伤疤 成情话", pinyin: "ràng shāng bā chéng qíng huà", indonesian: "Biarkan luka berubah menjadi kisah cinta" },
    { time: 141.74, chinese: "向天涯 也向家", pinyin: "xiàng tiān yá yě xiàng jiā", indonesian: "Menuju ujung dunia… tapi juga menuju rumah" }
];

const backgroundMusic = document.getElementById('backgroundMusic');
const lyricsContent = document.getElementById('lyricsContent');
const langButtons = document.querySelectorAll('.lang-btn');
let currentLang = 'both';
let currentLyricIndex = -1;

// Render lyrics
function renderLyrics() {
    if (!lyricsContent) return;
    
    lyricsContent.innerHTML = '';
    lyricsData.forEach((lyric, index) => {
        const lyricLine = document.createElement('div');
        lyricLine.className = 'lyric-line';
        lyricLine.dataset.index = index;
        lyricLine.dataset.time = lyric.time;
        
        let content = '';
        if (currentLang === 'both' || currentLang === 'chinese') {
            content += `<div class="lyric-chinese">${lyric.chinese}</div>`;
            content += `<div class="lyric-pinyin">${lyric.pinyin}</div>`;
        }
        if (currentLang === 'both' || currentLang === 'indonesian') {
            content += `<div class="lyric-indonesian">${lyric.indonesian}</div>`;
        }
        
        lyricLine.innerHTML = content;
        lyricsContent.appendChild(lyricLine);
    });
}

// Update active lyric
function updateActiveLyric(currentTime) {
    let newIndex = -1;
    
    for (let i = lyricsData.length - 1; i >= 0; i--) {
        if (currentTime >= lyricsData[i].time) {
            newIndex = i;
            break;
        }
    }
    
    if (newIndex !== currentLyricIndex) {
        const lines = lyricsContent.querySelectorAll('.lyric-line');
        lines.forEach((line, i) => {
            line.classList.toggle('active', i === newIndex);
        });
        
        if (newIndex >= 0 && lines[newIndex]) {
            lines[newIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        
        currentLyricIndex = newIndex;
    }
}

// Language toggle
langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        langButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentLang = btn.dataset.lang;
        renderLyrics();
    });
});

// Update lyrics based on audio time
if (backgroundMusic) {
    backgroundMusic.addEventListener('timeupdate', () => {
        updateActiveLyric(backgroundMusic.currentTime);
    });
}

// Initial render
renderLyrics();

