const songs = [
  // Romantic
  {
    title: "Tum Hi Ho",
    artist: "Arijit Singh",
    file: "assets/music/tum_hi_ho.mp3",
    cover: "assets/images/tum_hi_ho.jpg"
  },
  // Motivational
  {
    title: "Zinda",
    artist: "Siddharth Mahadevan",
    file: "assets/music/zinda.mp3",
    cover: "assets/images/motivational1.jpg"
  },
  // Punjabi
  {
    title: "Lover",
    artist: "Diljit Dosanjh",
    file: "assets/music/lover.mp3",
    cover: "assets/images/lover.jpg"
  },
  // Devotional
  {
    title: "Shiv Tandav Stotram",
    artist: "Shankar Mahadevan",
    file: "assets/music/Shiva-Tandava-Stotram.mp3",
    cover: "assets/images/shiv_tandav.jpg"
  },
  // Sad
  {
    title: "Channa Mereya",
    artist: "Arijit Singh",
    file: "assets/music/channa_mereya.mp3",
    cover: "assets/images/channa_mereya.jpg"
  },
  // // Bollywood Classic
  {
    title: "Tujh Mein Rab Dikhta Hai",
    artist: "Roop Kumar Rathod",
    file: "assets/music/Tujh_Mein_Rab.mp3",
    cover: "assets/images/tujh_mein_rab.jpg"
  }
];



let songIndex = 0;

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const progressBar = document.getElementById("progress");
const progressContainer = document.getElementById("progress-bar");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

function loadSong(song) {
  title.innerText = song.title;
  artist.innerText = song.artist;
  audio.src = song.file;
  cover.src = song.cover;
}

function playSong() {
  audio.play();
  playBtn.textContent = "⏸";
}

function pauseSong() {
  audio.pause();
  playBtn.textContent = "▶️";
}

function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

playBtn.addEventListener("click", () => {
  if (audio.paused) playSong();
  else pauseSong();
});

nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

audio.addEventListener("timeupdate", () => {
  const { duration, currentTime } = audio;
  const progressPercent = (currentTime / duration) * 100;
  progressBar.style.width = `${progressPercent}%`;

  // Time formatting
  let mins = Math.floor(currentTime / 60);
  let secs = Math.floor(currentTime % 60);
  currentTimeEl.textContent = `${mins}:${secs < 10 ? "0" + secs : secs}`;

  if (duration) {
    let dmins = Math.floor(duration / 60);
    let dsecs = Math.floor(duration % 60);
    durationEl.textContent = `${dmins}:${dsecs < 10 ? "0" + dsecs : dsecs}`;
  }
});

// Click to seek
progressContainer.addEventListener("click", (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
});

// Initial song load
loadSong(songs[songIndex]);
