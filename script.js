let timer;
let isRunning = false;
let startTime;
let lapCounter = 1;

function startPause() {
  if (!isRunning) {
    isRunning = true;
    document.getElementById('startPause').textContent = 'Pause';
    startTime = new Date() - (lapCounter > 1 ? lapCounter - 1 : 0);
    timer = setInterval(updateTime, 10);
  } else {
    isRunning = false;
    document.getElementById('startPause').textContent = 'Resume';
    clearInterval(timer);
  }
}

function reset() {
  clearInterval(timer);
  isRunning = false;
  document.getElementById('startPause').textContent = 'Start';
  document.getElementById('display').textContent = '00:00:00';
  lapCounter = 1;
  document.getElementById('lapList').innerHTML = '';
}

function recordLap() {
  if (isRunning) {
    const lapTime = formatTime(new Date() - startTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
    document.getElementById('lapList').appendChild(lapItem);
    lapCounter++;
  }
}

function updateTime() {
  const currentTime = new Date() - startTime;
  document.getElementById('display').textContent = formatTime(currentTime);
}

function formatTime(time) {
  const date = new Date(time);
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  const milliseconds = Math.floor(date.getMilliseconds() / 10).toString().padStart(2, '0');
  return `${minutes}:${seconds}:${milliseconds}`;
}

document.addEventListener("DOMContentLoaded", function() {
  reset();
});
