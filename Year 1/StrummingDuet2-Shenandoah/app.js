
let masterTrack = document.getElementById('master-audio');
const timeline = document.getElementById('timeline');

  masterTrack.addEventListener('ended', endTracks);
  masterTrack.addEventListener('timeupdate', function() {
    timeline.value = this.currentTime;
  });

  function goBack() {
      const params = new URLSearchParams(window.location.search);
      const backPage = params.get('from');
      if (backPage) {
        location.href = '../' + backPage + '.html';
      } else {
        location.href = '../index.html';
      }
    }
  
  // Function to change the playback speed based on the input BPM
  function changeSpeed(bpm) {
    const masterTrack = document.getElementById('master-audio');
    
    const baseBpm = 100;
    const speed = bpm / baseBpm;
    
    // Adjust the playback speed
    masterTrack.playbackRate = speed;
  }
  

  // Function to play or pause all tracks in sync
  function toggleMasterPlayPause() {
    const masterTrack = document.getElementById('master-audio');
    const masterButton = document.getElementById('master-play-pause');
    
    if (masterTrack.paused) {
      masterTrack.play();
      masterButton.textContent = '⏸︎';
    }
    else {
      masterTrack.pause();
      masterButton.textContent = '⏵︎';
    }
  }


  function endTracks() {
    const masterTrack = document.getElementById('master-audio');
    const masterButton = document.getElementById('master-play-pause');
    masterTrack.pause();
    masterTrack.currentTime = 0;
    masterButton.textContent = '⏵︎';
  }


  //Function to handle Restarting Tracks
  function restartTracks() {
    const masterTrack = document.getElementById('master-audio');
    masterTrack.currentTime = 0;
  }

  //Function to handle moving the Time of the Tracks
  function moveTracks(timeInSeconds) {
    const masterTrack = document.getElementById('master-audio');
    masterTrack.currentTime = masterTrack.currentTime + timeInSeconds;
  }

  //Function to handle moving the Time of the Tracks using the slider
  function moveTracksSlider(timeInSeconds) {
    const masterTrack = document.getElementById('master-audio');
    masterTrack.currentTime = timeInSeconds;
  }


  function loopHandler() {
    const loopStart = document.getElementById('loop-start');
    const loopEnd = document.getElementById('loop-end');
    if (this.currentTime >= loopEnd.value || this.currentTime < loopStart.value) {
      this.currentTime = loopStart.value;
      this.play();
    }
  }

  function toggleLoop() {
    const loopDiv = document.getElementById('loop-controls');
    const masterTrack = document.getElementById('master-audio');

    if (loopDiv.hidden === true) {

      loopDiv.hidden = false;
      masterTrack.addEventListener('timeupdate', loopHandler);
    } else {
      loopDiv.hidden = true;
      masterTrack.removeEventListener('timeupdate', loopHandler);
    }
  }
  