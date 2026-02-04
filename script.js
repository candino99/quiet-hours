// ======================
// LINCOLN VALENTINE SCRIPT
// phrase unlock + consent gate + saved progress
// ======================

const SECRET_PHRASE = "do it for daddy";

// ✅ UPDATED TO YOUR CONVERTED FILES
// If you only have 1 pic or 1 spicy so far, leave the rest commented.
const NORMAL_PICS = [
  "assets/photos/pic 1.jpg",
  // "assets/photos/pic 2.jpg",
];

const SPICY_PHOTOS = [
  { src: "assets/photos/spicy 1.jpg", caption: "yeah…im yours" },
  { src: "assets/photos/spicy 2.jpg", caption: "don’t act shy now." },
  { src: "assets/photos/spicy 3.jpg", caption: "i know what you’re thinking." },
  { src: "assets/photos/spicy 4.jpg", caption: "yes daddy." },
  { src: "assets/photos/spicy 5.jpg", caption: "keep looking." },
  { src: "assets/photos/spicy 6.jpg", caption: "okay… one more" },
];


const SPICY_VIDEOS = [
  { src: "assets/video/Spicy Vid 1.mp4", caption: "press play 😌" },
  { src: "assets/video/Spicy vid 2.mp4", caption: "just for you." },
];

const VOICE_NOTE = "assets/audio/Lincoln note 2.m4a";

const MEMES = [
  { src: "assets/memes/meme_01.JPG", caption: "me after we have boom boom 😭" },
  { src: "assets/memes/meme_02.JPG", caption: "what you see after you look down." },
  { src: "assets/memes/meme_03.JPG", caption: "what i ask you every other day." },
  { src: "assets/memes/meme_04.JPG", caption: "i’m obsessed.you make me do this all the time lol." },
  { src: "assets/memes/meme_05.JPG", caption: "come here 😌" },
  { src: "assets/memes/meme_06.JPG", caption: "when you spank me" },
];


// ---------- STORAGE KEYS ----------
const K = {
  PRIVATE_UNLOCKED: "lincoln_private_unlocked",
  PHOTOS_OPENED: "lincoln_photos_opened",
  VIDEO_PLAYED: "lincoln_video_played",
  AUDIO_PLAYED: "lincoln_audio_played",
};

// ---------- HELPERS ----------
function normalize(s){
  return (s || "").toLowerCase().replace(/\s+/g," ").trim();
}
function setFlag(key, val=true){ localStorage.setItem(key, val ? "1" : "0"); }
function getFlag(key){ return localStorage.getItem(key) === "1"; }

// ---------- SCREENS ----------
const screens = {
  intro: document.getElementById("screenIntro"),
  note: document.getElementById("screenNote"),
  ask: document.getElementById("screenAsk"),
  hub: document.getElementById("screenPrivateHub"),
  photos: document.getElementById("screenPhotos"),
  videos: document.getElementById("screenVideos"),
};

function showOnly(screenEl){
  Object.values(screens).forEach(el => el.classList.remove("active"));
  screenEl.classList.add("active");
  window.scrollTo(0,0);
}

// nav buttons
document.getElementById("btnStart").addEventListener("click", () => showOnly(screens.note));
document.getElementById("btnToAsk").addEventListener("click", () => showOnly(screens.ask));
document.getElementById("btnToPrivate").addEventListener("click", () => showOnly(screens.hub));
document.getElementById("btnBackHome").addEventListener("click", () => showOnly(screens.ask));

// ---------- VALENTINE ASK ----------
const revealAskBtn = document.getElementById("revealAskBtn");
const askBlock = document.getElementById("askBlock");
const preAskLine = document.getElementById("preAskLine");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const yesMsg = document.getElementById("yesMsg");

let yesClicks = 0;
let noDodges = 0;

revealAskBtn.addEventListener("click", () => {
  preAskLine.textContent = "okay… don’t laugh 😭";
  askBlock.style.display = "block";
  revealAskBtn.style.display = "none";
});

yesBtn.addEventListener("click", () => {
  yesClicks++;
  yesMsg.style.display = "block";
  const lines = [
    "YAY ❤️ i’m smiling so hard.",
    "okay wait… you’re sure?? 🥺",
    "i love you. like… a lot.",
    "locked in 😈"
  ];
  yesMsg.textContent = lines[Math.min(yesClicks - 1, lines.length - 1)];
  yesBtn.style.transform = `scale(${1 + Math.min(yesClicks, 6) * 0.03})`;
});

function rand(min, max){ return Math.random() * (max - min) + min; }
function moveNoButton(){
  const pad = 10;
  const bw = noBtn.offsetWidth, bh = noBtn.offsetHeight;
  const maxX = window.innerWidth - bw - pad;
  const maxY = window.innerHeight - bh - pad;

  const x = rand(pad, Math.max(pad, maxX));
  const y = rand(pad + 80, Math.max(pad + 80, maxY));

  noBtn.style.position = "fixed";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
  noBtn.style.zIndex = 9999;
}

noBtn.addEventListener("pointerenter", () => {
  noDodges++;
  moveNoButton();
  if(noDodges === 3) preAskLine.textContent = "are you sureeee? 😌";
  if(noDodges === 6) preAskLine.textContent = "okay the no button is shy.";
  if(noDodges === 9) { preAskLine.textContent = "no left the chat 😈"; noBtn.style.display = "none"; }
});

// ---------- PRIVATE HUB ----------
const phraseInput = document.getElementById("phraseInput");
const phraseBtn = document.getElementById("phraseBtn");
const phraseMsg = document.getElementById("phraseMsg");
const privateButtons = document.getElementById("privateButtons");

const btnPhotos = document.getElementById("btnPhotos");
const btnVideos = document.getElementById("btnVideos");
const btnAudio  = document.getElementById("btnAudio");

const statusPhotos = document.getElementById("statusPhotos");
const statusVideos = document.getElementById("statusVideos");
const statusAudio  = document.getElementById("statusAudio");

function renderHub(){
  const unlocked = getFlag(K.PRIVATE_UNLOCKED);
  privateButtons.style.display = unlocked ? "block" : "none";

  btnPhotos.disabled = !unlocked;
  btnVideos.disabled = !unlocked;
  btnAudio.disabled  = !unlocked;

  statusPhotos.textContent = getFlag(K.PHOTOS_OPENED) ? "✅" : (unlocked ? "🔓" : "🔒");
  statusVideos.textContent = getFlag(K.VIDEO_PLAYED) ? "✅" : (unlocked ? "🔓" : "🔒");
  statusAudio.textContent  = getFlag(K.AUDIO_PLAYED) ? "✅" : (unlocked ? "🔓" : "🔒");
}

function unlockPrivate(){
  setFlag(K.PRIVATE_UNLOCKED, true);
  phraseMsg.textContent = "good. come here 😌";
  renderHub();
}

phraseBtn.addEventListener("click", () => {
  const v = normalize(phraseInput.value);
  if (v === normalize(SECRET_PHRASE)) unlockPrivate();
  else phraseMsg.textContent = "mm… not quite. try again.";
});

phraseInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") phraseBtn.click();
});

// ---------- CONSENT MODAL ----------
const consentModal = document.getElementById("consentModal");
const consentYes = document.getElementById("consentYes");
const consentNo  = document.getElementById("consentNo");

let consentAction = null;

function openConsent(nextFn){
  consentAction = nextFn;
  consentModal.style.display = "flex";
}
function closeConsent(){
  consentModal.style.display = "none";
  consentAction = null;
}

consentYes.addEventListener("click", () => {
  const next = consentAction;   // capture it BEFORE close
  closeConsent();
  if (typeof next === "function") next();
});


consentNo.addEventListener("click", () => {
  closeConsent();
  showOnly(screens.hub);
});

consentModal.addEventListener("click", (e) => {
  if (e.target === consentModal) {
    closeConsent();
    showOnly(screens.hub);
  }
});

// ---------- SPICY PHOTOS ----------
const spicyPhoto = document.getElementById("spicyPhoto");
const spicyCaption = document.getElementById("spicyCaption");
const prevPhoto = document.getElementById("prevPhoto");
const nextPhoto = document.getElementById("nextPhoto");
const btnPhotosBack = document.getElementById("btnPhotosBack");
const btnPanicFromPhotos = document.getElementById("btnPanicFromPhotos");

let photoIndex = 0;

function renderPhoto(){
  const item = SPICY_PHOTOS[photoIndex];
  spicyPhoto.src = item.src;
  spicyCaption.textContent = item.caption || "";
}

function openPhotos(){
  setFlag(K.PHOTOS_OPENED, true);
  renderHub();
  showOnly(screens.photos);
  renderPhoto();
}

prevPhoto.addEventListener("click", () => {
  photoIndex = (photoIndex - 1 + SPICY_PHOTOS.length) % SPICY_PHOTOS.length;
  renderPhoto();
});

nextPhoto.addEventListener("click", () => {
  photoIndex = (photoIndex + 1) % SPICY_PHOTOS.length;
  renderPhoto();
});

btnPhotosBack.addEventListener("click", () => showOnly(screens.hub));
btnPanicFromPhotos.addEventListener("click", () => showOnly(screens.ask));

// ---------- SPICY VIDEOS ----------
const btnVid1 = document.getElementById("btnVid1");
const btnVid2 = document.getElementById("btnVid2");
const videoPlayer = document.getElementById("videoPlayer");
const videoCaption = document.getElementById("videoCaption");
const btnVideosBack = document.getElementById("btnVideosBack");
const btnPanicFromVideos = document.getElementById("btnPanicFromVideos");

function loadVideo(i){
  const item = SPICY_VIDEOS[i];
  videoPlayer.src = item.src;
  videoCaption.textContent = item.caption || "";
}

function openVideos(){
  showOnly(screens.videos);
  loadVideo(0);
}

btnVid1.addEventListener("click", () => loadVideo(0));
btnVid2.addEventListener("click", () => loadVideo(1));

videoPlayer.addEventListener("play", () => {
  setFlag(K.VIDEO_PLAYED, true);
  renderHub();
});

btnVideosBack.addEventListener("click", () => {
  videoPlayer.pause();
  showOnly(screens.hub);
});

btnPanicFromVideos.addEventListener("click", () => {
  videoPlayer.pause();
  showOnly(screens.ask);
});

// ---------- AUDIO ----------
const audioModal = document.getElementById("audioModal");
const audioPlayer = document.getElementById("audioPlayer");
const audioClose = document.getElementById("audioClose");

function openAudio(){
  audioPlayer.src = VOICE_NOTE;
  audioModal.style.display = "flex";
}

function closeAudio(){
  audioPlayer.pause();
  audioModal.style.display = "none";
}

audioPlayer.addEventListener("play", () => {
  setFlag(K.AUDIO_PLAYED, true);
  renderHub();
});

audioClose.addEventListener("click", closeAudio);
audioModal.addEventListener("click", (e) => {
  if (e.target === audioModal) closeAudio();
});

// hub buttons
btnPhotos.addEventListener("click", () => openConsent(openPhotos));
btnVideos.addEventListener("click", () => openConsent(openVideos));
btnAudio.addEventListener("click", openAudio);

// ---------- MEMES ----------
const memeBtn = document.getElementById("memeBtn");
const memeModal = document.getElementById("memeModal");
const memeImg = document.getElementById("memeImg");
const memeCap = document.getElementById("memeCap");
const memeNext = document.getElementById("memeNext");
const memeClose = document.getElementById("memeClose");

function openMeme(){
  const pick = MEMES[Math.floor(Math.random()*MEMES.length)];
  memeImg.src = pick.src;
  memeCap.textContent = pick.caption || "";
  memeModal.style.display = "flex";
}

function closeMeme(){
  memeModal.style.display = "none";
}

memeBtn.addEventListener("click", openMeme);
memeNext.addEventListener("click", openMeme);
memeClose.addEventListener("click", closeMeme);

memeModal.addEventListener("click", (e) => {
  if (e.target === memeModal) closeMeme();
});

// ---------- INIT ----------
renderHub();
