const bird = document.querySelector('.bird')
const gameDisplay = document.querySelector('.game-container')
const ground = document.querySelector('.ground')

let birdleft = 220
let birdBottom = 100
let gravity = 2
let timerId
let isGameOver = false
let gap = 430

function startGame(){
    birdBottom-= gravity
    bird.style.bottom = birdBottom + 'px'
    bird.style.left = birdleft + 'px'
}

timerId = setInterval(startGame,30)

function control(e){
    if(e.keyCode === 32) 
    {
        jump()
    }
}

function jump(){
    if(birdBottom < 480 )
    {
        birdBottom += 50
    bird.style.bottom = birdBottom + 'px'
    }
    
}
  
document.addEventListener('keyup', control)
// document.addEventListener('keyup', jump)


function generateObstacle(){
    let obstacleleft = 500
    let ransomHeight = Math.random() * 120
    let obstacleBottom = ransomHeight
    const obstacle = document.createElement('div')
    const topObstacle = document.createElement('div')
    if(!isGameOver)
    {
        obstacle.classList.add('obstacle')
        topObstacle.classList.add('topObstacle')

    } 
    gameDisplay.appendChild(obstacle)
    gameDisplay.appendChild(topObstacle)

    obstacle.style.left = obstacleleft + 'px'
    topObstacle.style.left = obstacleleft + 'px'
    obstacle.style.bottom = obstacleBottom + 'px'
    topObstacle.style.bottom = obstacleBottom + gap+ 'px'

    function moveObstacle(){
        obstacleleft -= 2
    obstacle.style.left = obstacleleft + 'px'
    topObstacle.style.left = obstacleleft + 'px'

    if(obstacleleft === -60)
    {
        clearInterval(obstacleTimerId)
        gameDisplay.removeChild(obstacle)
        gameDisplay.removeChild(topObstacle)
    }
    if(birdBottom === 0 || obstacleleft > 200 && obstacleleft < 280 && birdleft === 220 && (birdBottom < obstacleBottom + 153 ||birdBottom > obstacleBottom + gap - 200))
    {
        gameOver()
        clearInterval(obstacleTimerId)
    }

    }
    let obstacleTimerId = setInterval(moveObstacle, 20)
    if(!isGameOver) setTimeout(generateObstacle,3000)
}
generateObstacle()

function gameOver(){
    clearInterval(timerId)
    isGameOver = true
    document.removeEventListener('keyup',control) 
}

const gameAudio = document.getElementById("gameAudio");
const audioToggleBtn = document.getElementById("audioToggle");

// Function to play the audio
const playAudio = () => {
  gameAudio.play();
};

// Function to pause the audio
const pauseAudio = () => {
  gameAudio.pause();
};

// Function to toggle play/pause
const toggleAudio = () => {
  if (gameAudio.paused) {
    playAudio();
  } else {
    pauseAudio();
  }
};

// Event listener for when the audio ends, restart it
gameAudio.addEventListener("ended", () => {
  playAudio();
});

// Event listener for the button to toggle audio
audioToggleBtn.addEventListener("click", () => {
  toggleAudio();
  // Save the audio state to sessionStorage
  sessionStorage.setItem("audioState", gameAudio.paused ? "off" : "on");
});

// Event listener for when the page is unloaded (e.g., when navigating to another page)
window.addEventListener("beforeunload", () => {
  // Save the audio playback position to sessionStorage
  sessionStorage.setItem("audioPlaybackPosition", gameAudio.currentTime);
});

// Start playing the audio when the page loads
if (sessionStorage.getItem("audioState") === "on") {
  playAudio();
}

// Restore the audio playback position from sessionStorage
const savedPosition = sessionStorage.getItem("audioPlaybackPosition");
if (savedPosition) {
  gameAudio.currentTime = parseFloat(savedPosition);
}

// Stop the audio when the game stops
stopButton.addEventListener("click", () => {
  controls.classList.remove("hide");
  stopButton.classList.add("hide");
  startButton.classList.remove("hide");
  clearInterval(interval);
  pauseAudio();
});