
/* exported Bird */

class Bird {
    constructor() {
      this.y = height / 2;
      this.x = 64;
  
      this.gravity = 0.6;
      this.lift = -10;
      this.velocity = 0;
  
      this.icon = birdSprite;
      this.width = 64;
      this.height = 64;
    }
  
    show() {
      // draw the icon CENTERED around the X and Y coords of the bird object
      image(this.icon, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    }
  
    up() {
      this.velocity = this.lift;
    }
  
    update() {
      this.velocity += this.gravity;
      this.y += this.velocity;
  
      if (this.y >= height - this.height / 2) {
        this.y = height - this.height / 2;
        this.velocity = 0;
      }
  
      if (this.y <= this.height / 2) {
        this.y = this.height / 2;
        this.velocity = 0;
      }
    }
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