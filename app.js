let anniversary = new Date("2025-01-06");
let today = new Date();

// Calculate total difference in milliseconds
let diff = today - anniversary;

// Convert total difference to days
let totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));

// Calculate years, months, and days correctly
let years = 0;
let months = 0;
let days = totalDays;

// If total days are 30 or more, count as 1 month (based on calendar month difference)
if (today.getMonth() > anniversary.getMonth() || today.getFullYear() > anniversary.getFullYear()) {
    months = 1;
    days = today.getDate() - anniversary.getDate();
    if (days < 0) {
        let prevMonthDays = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
        days += prevMonthDays;
        months--;
    }
}

// If it has been exactly one month, reset days to 0
if (today.getDate() === anniversary.getDate()) {
    months = 1;
    days = 0;
}

console.log(`Years: ${years}, Months: ${months}, Days: ${days}`);


console.log(value);

document.getElementById("days").textContent = day.toString();
document.getElementById("months").textContent = month.toString();
document.getElementById("years").textContent = year.toString();


let musicPlayer = document.querySelector(".music-container");
let togglePlayer = document.querySelector(".toggle-player");

let trackInfo = document.querySelector(".track-info");
let trackName = document.querySelector(".trackname");
let trackArtist = document.querySelector(".trackartist");
let trackNav = document.querySelector(".track-nav");

let playPauseBtn = document.querySelector(".playpause-track");
let nextBtn = document.querySelector(".next-track");
let prevBtn = document.querySelector(".prev-track");

let trackIndex = 0;
let isPlaying = false;
let isHidden = true;

let currentTrack = document.createElement("audio");
let soundBars = document.querySelector(".sound-bars");

togglePlayer.addEventListener("click", function() {
    isHidden = !isHidden;
    if(isHidden){
        musicPlayer.classList.remove("hide");
        togglePlayer.innerHTML = '<img class="w-[98%]" src="icons/close.svg">';
        trackInfo.style.transitionDelay = "0.4s";
        trackNav.style.transitionDelay = "0.4s";
    } else {
        musicPlayer.classList.add("hide");
        togglePlayer.innerHTML = '<img class="w-full" src="icons/plus.svg">';
        trackInfo.style.transitionDelay = "0s";
        trackNav.style.transitionDelay = "0s";
    }
});

let soundBarsLottie = bodymovin.loadAnimation({
    container: soundBars,
    renderer: "svg",
    loop: true,
    autoPLay: false,
    path: "https://lottie.host/9ec12a7e-e429-453a-9f22-a2af1dcb4dca/2zeuy4rwtP.json",
});


let trackList = [
    {
        name: "Perfect",
        artist: "Ed Sheeran",
        path: "./music/perfect.mp3",
    },
    {
        name: "Day & Night",
        artist: "Jung Seung Hwan",
        path: "./music/day and night.mp3",
    },
    {
        name: "Love of my Life",
        artist: "Reyne",
        path: "./music/love of my life.mp3",
    },
    {
        name: "The Only One",
        artist: "Reyne",
        path: "./music/the only one.mp3",
    },
];

// EVENT LISTENERS
playPauseBtn.addEventListener("click", playPauseTrack);
nextBtn.addEventListener("click", nextTrack);
prevBtn.addEventListener("click", prevTrack);

function loadTrack(trackIndex){
    currentTrack.src = trackList[trackIndex].path;
    trackName.textContent = trackList[trackIndex].name;
    trackArtist.textContent = trackList[trackIndex].artist;
    currentTrack.addEventListener("ended", nextTrack);
    currentTrack.load();
}

loadTrack(trackIndex);

function playPauseTrack(){
    if(isPlaying == false){
        playTrack();
    }else{
        pauseTrack();
    }
}

function playTrack(){
    currentTrack.play();
    isPlaying = true;
    playPauseBtn.innerHTML = '<img class="w-8" src="icons/pause.svg">';
    soundBarsLottie.play();
}

function pauseTrack(){
    currentTrack.pause();
    isPlaying = false;
    playPauseBtn.innerHTML = '<img class="w-8" src="icons/play.svg">';
    soundBarsLottie.stop();
}

function nextTrack(){
    if(trackIndex < trackList.length - 1){
        trackIndex += 1;
        loadTrack(trackIndex);
        playTrack();
    }else{
        trackIndex = 0;
        loadTrack(trackIndex);
        playTrack();
    } 
}

function prevTrack(){
    if(trackIndex > 0){
        trackIndex -= 1;
        loadTrack(trackIndex);
        playTrack();
    }else{
        trackIndex = trackList.length - 1;
        loadTrack(trackIndex);
        playTrack();
    }
}
