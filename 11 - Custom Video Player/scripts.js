const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');


function togglePlayback() {
    const method = video.paused ? 'play' : 'pause';
    video[method]()
}

function buttonUpdate () {
  toggle.textContent = this.paused ? '►' : '❚ ❚';
}

function skip () {
    video.currentTime += parseFloat(this.dataset.skip);
}

function rangeUpdate () {
    video[this.name] = this.value;
}

function progressUpdate () {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub (e) {
     video.currentTime = (e.offsetX / progress.offsetWidth) * video.duration;
}


video.addEventListener('click', togglePlayback);
video.addEventListener('play', buttonUpdate);
video.addEventListener('pause', buttonUpdate);
video.addEventListener('timeupdate', progressUpdate);

toggle.addEventListener('click', togglePlayback);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', rangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', rangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);