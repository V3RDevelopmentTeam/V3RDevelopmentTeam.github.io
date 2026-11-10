const audio = document.getElementById("Imaginative");
const audioToggle = document.getElementById("audioToggle");
const audioIcon = document.getElementById("audioIcon");

const AUDIO_ON = "https://img.icons8.com/?size=100&id=iWO20ZvCeU53&format=png&color=FFFFFF";
const AUDIO_OFF = "https://img.icons8.com/?size=100&id=J8AUGZ0QFMe0&format=png&color=FFFFFF";

audio.volume = 0.16;

function updateAudioIcon() {
    const muted = audio.paused || audio.muted;

    audioIcon.src = muted ? AUDIO_OFF : AUDIO_ON;
    audioIcon.alt = muted ? "Audio muted" : "Audio playing";

    audioToggle.setAttribute(
        "aria-label",
        muted ? "Play audio" : "Mute audio"
    );
}

audioToggle.addEventListener("click", function () {
    if (audio.paused) {
        audio.muted = false;

        audio.play().catch(console.error);
    } else {
        audio.muted = !audio.muted;
    }

    updateAudioIcon();
});

audio.addEventListener("play", updateAudioIcon);
audio.addEventListener("pause", updateAudioIcon);
audio.addEventListener("volumechange", updateAudioIcon);

updateAudioIcon();