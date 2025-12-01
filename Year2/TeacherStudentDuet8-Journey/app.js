
let masterTrack = document.getElementById('master-audio');
const timeline = document.getElementById('timeline');

let trackToPlay = `Tracks/No Metronome/Combinations/Audio 20 Duet 8 Journey Mix No Met.mp3`;
let track1Mute = false;
let track2Mute = false;
let track3Mute = false;
let track4Mute = false;

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
  
  // Function to toggle mute on a track
  function toggleMute(trackId) {
    const track = document.getElementById(trackId);
    track.muted = !track.muted;

    const muteButton = document.getElementById(`mute-${trackId}`);
    muteButton.textContent = track.muted ? '🔇' : '🔊';
  }

  function toggleTrack(trackId, shouldPlay) {

    switch (trackId) {
      case 1:
        track1Mute = !track1Mute;
        const muteButton1 = document.getElementById(`mute-track1`);
        muteButton1.textContent = track1Mute ? '🔇' : '🔊';
        if (track1Mute) {
          muteButton1.classList.add('mute');
        }
        else {
          muteButton1.classList.remove('mute');
        }
        break;
      case 2:
        track2Mute = !track2Mute;
        const muteButton2 = document.getElementById(`mute-track2`);
        muteButton2.textContent = track2Mute ? '🔇' : '🔊';
        if (track2Mute) {
          muteButton2.classList.add('mute');
        }
        else {
          muteButton2.classList.remove('mute');
        }
        break;
      case 3:
        track3Mute = !track3Mute;
        const muteButton3 = document.getElementById(`mute-track3`);
        muteButton3.textContent = track3Mute ? '🔇' : '🔊';
        if (track3Mute) {
          muteButton3.classList.add('mute');
        }
        else {
          muteButton3.classList.remove('mute');
        }
        break;
      case 4:
        track4Mute = !track4Mute;
        const muteButton4 = document.getElementById(`mute-track4`);
        muteButton4.textContent = track4Mute ? '🔇' : '🔊';
        if (track4Mute) {
          muteButton4.classList.add('mute');
        }
        else {
          muteButton4.classList.remove('mute');
        }
        break;
    }
    if (!track1Mute && !track2Mute) {
      trackToPlay = `Tracks/No Metronome/Combinations/Audio 20 Duet 8 Journey Mix No Met.mp3`; 
    } else if (track1Mute && !track2Mute) {
      trackToPlay = `Tracks/No Metronome/Singles/Audio 20 Duet 8 Journey Gtr2 No Met.mp3`;
    } else if (!track1Mute && track2Mute) {
      trackToPlay = `Tracks/No Metronome/Singles/Audio 20 Duet 8 Journey Gtr1  No Met.mp3`;
    } else if (track1Mute && track2Mute) {
      toggleTrack(trackId, false);
      return;
    }
    if (shouldPlay) {
      let track = document.getElementById(`master-audio`);
      let source = document.getElementById(`master-source`);
      let wasPlaying = !track.paused;
      track.pause();
      let currentTime = track.currentTime;
      source.src = trackToPlay;
      track.load();
      track.currentTime = currentTime;
      if (wasPlaying) track.play();
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

  function setTrackVolume(trackId, volume) {
    const track = document.getElementById(trackId);
    track.volume = volume;
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
  