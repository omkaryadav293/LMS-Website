import React, { useState, useRef, useEffect, useCallback } from "react";
import ReactPlayer from "react-player";
import { FaPlay, FaPause, FaForward, FaBackward, FaVolumeUp, FaVolumeMute,FaCompress,FaExpand  } from "react-icons/fa";
import "./VideoPlayer.css";
import { PiSpeakerSimpleHighFill, PiSpeakerSimpleSlashFill } from "react-icons/pi";
const VideoPlayer = ({ url, onProgressUpdate, progressData }) => {
  
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showControls, setShowControls] = useState(true);

  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);
  // Play/Pause Toggle
  const togglePlayPause = () => setPlaying(!playing);

  // Mute Toggle
  const toggleMute = () => setMuted(!muted);

  // Forward & Backward
  const seekBySeconds = (seconds) => {
    const currentTime = playerRef.current.getCurrentTime();
    playerRef.current.seekTo(currentTime + seconds);
  };

  // Seekbar Handler
  const handleSeekChange = (e) => {
    const seekValue = parseFloat(e.target.value);
    setPlayed(seekValue);
    playerRef.current.seekTo(seekValue);
  };

  // Fullscreen Toggle
  const handleFullScreen = useCallback(() => {
    if (!isFullScreen) {
      if (playerContainerRef?.current.requestFullscreen) {
        playerContainerRef?.current?.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }, [isFullScreen]);


  function handleMouseMove() {
    setShowControls(true);
    clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 3000);
  }

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  // Handle Progress
  const handleProgress = (state) => {
    setPlayed(state.played);
  };

  // Handle Playback Speed Change
  const changePlaybackSpeed = (speed) => {
    setPlaybackRate(speed);
  };

  // Convert seconds to time format
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };


  onProgressUpdate && useEffect(()=>{
  if(played ===1){
    onProgressUpdate({
      ...progressData, progressValue : played
    })
  }
  },[played])




  return (
    <div className="video-player-container" onMouseMove={handleMouseMove} onMouseLeave={()=>setShowControls(false)} ref={playerContainerRef}>
      <ReactPlayer
        ref={playerRef}
        url={url}
        playing={playing}
        muted={muted}
        volume={volume}
        playbackRate={playbackRate}
        onProgress={handleProgress}
        onDuration={(dur) => setDuration(dur)}
        controls={false}
        width="100%"
        height="100%"
        
      />

<>
  {/* Timer and Controls */}
  <div className={`controls ${isFullScreen ? "fullscreen-controls" : ""}`}>
    <div className="playbackAndVolume">
      {/* Playback Controls */}
      <div className="playback-controls">
        <button onClick={() => seekBySeconds(-5)}>
          <FaBackward />
        </button>
        <button onClick={togglePlayPause}>
          {playing ? <FaPause /> : <FaPlay />}
        </button>
        <button onClick={() => seekBySeconds(5)}>
          <FaForward />
        </button>
      </div>

      {/* Volume Control */}
      <div className="volume-control">
        <button style={{background: "transparent", color:"white", cursor:"pointer",border:"none"}}  onClick={toggleMute}>
          {muted ? <PiSpeakerSimpleSlashFill size={20} /> : <PiSpeakerSimpleHighFill size={20} />}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          className="volume-seekbar"
          onChange={(e) => setVolume(parseFloat(e.target.value))}
        />
      </div>
    </div>

    <div className="playbackAndTimer">
      {/* Playback Speed */}
      <div className="playback-speed">
        <select
          value={playbackRate}
          onChange={(e) => changePlaybackSpeed(parseFloat(e.target.value))}
        >
          <option value="0.5">0.5x</option>
          <option value="1">1x</option>
          <option value="1.25">1.25x</option>
          <option value="1.5">1.5x</option>
          <option value="2">2x</option>
        </select>
      </div>

      {/* Timer */}
      <div className="timer">
        {formatTime(played * duration)} / {formatTime(duration)}
      </div>
    </div>
  </div>

  {/* Seekbar and Full-Screen */}
  <div className={`fullSeekbar ${isFullScreen ? "fullscreen-seekbar" : ""}`}>
    <input
      type="range"
      className="seekbar"
      min="0"
      max="1"
      step="0.01"
      value={played}
      onChange={handleSeekChange}
    />
    {/* Full-Screen Toggle */}
    <button style={{background: "transparent", cursor:"pointer", outline:"none", border:"none"}} onClick={handleFullScreen}>
      {isFullScreen ? <FaCompress size={24} style={{ color: "white" }} /> : <FaExpand size={24} style={{ color: "white" }} />}
    </button>
  </div>
</>

    </div>
  );
};

export default VideoPlayer;
