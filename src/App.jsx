import { useState, useEffect, useRef} from "react";
import "./App.css";

let globalSongCounter = 0;

const playlists = [
  {
    id: 0,
    name: "Today's Top Hits",
    image: "/images/playlist1.jpg",
    color: "#1e3a5f",
    songs: [
      { id: 0,  title: "Blinding Lights",         artist: "The Weeknd",           duration: "3:20", image: "/images/song1.jpg"  },
      { id: 1,  title: "Shape of You",            artist: "Ed Sheeran",           duration: "3:53", image: "/images/song2.jpg"  },
      { id: 2,  title: "Stay",                    artist: "The Kid LAROI",        duration: "2:21", image: "/images/song3.jpg"  },
      { id: 3,  title: "Levitating",              artist: "Dua Lipa",             duration: "3:23", image: "/images/song4.jpg"  },
      { id: 4,  title: "Peaches",                 artist: "Justin Bieber",        duration: "3:18", image: "/images/song5.jpg"  },
    ],
  },
  {
    id: 1,
    name: "Chill Vibes",
    image: "/images/playlist2.jpg",
    color: "#1a3a2a",
    songs: [
      { id: 0,  title: "Sunset Lover",            artist: "Petit Biscuit",        duration: "4:12", image: "/images/song6.jpg"  },
      { id: 1,  title: "Feels",                   artist: "Novo Amor",            duration: "3:45", image: "/images/song7.jpg"  },
      { id: 2,  title: "Golden Hour",             artist: "JVKE",                 duration: "3:24", image: "/images/song8.jpg"  },
      { id: 3,  title: "From the Start",          artist: "Laufey",               duration: "2:58", image: "/images/song9.jpg"  },
      { id: 4,  title: "Until I Found You",       artist: "Stephen Sanchez",      duration: "2:49", image: "/images/song10.jpg" },
    ],
  },
  {
    id: 2,
    name: "Hip-Hop Essentials",
    image: "/images/playlist3.jpg",
    color: "#2a1a3a",
    songs: [
      { id: 0,  title: "HUMBLE.",                 artist: "Kendrick Lamar",       duration: "2:57", image: "/images/song11.jpg" },
      { id: 1,  title: "God's Plan",              artist: "Drake",                duration: "3:18", image: "/images/song12.jpg" },
      { id: 2,  title: "Sicko Mode",              artist: "Travis Scott",         duration: "5:12", image: "/images/song13.jpg" },
      { id: 3,  title: "Rockstar",                artist: "Post Malone",          duration: "3:39", image: "/images/song14.jpg" },
      { id: 4,  title: "MIDDLE CHILD",            artist: "J. Cole",              duration: "3:29", image: "/images/song15.jpg" },
    ],
  },
  {
    id: 3,
    name: "Late Night Drive",
    image: "/images/playlist4.jpg",
    color: "#1a1a3a",
    songs: [
      { id: 0,  title: "Midnight Rain",           artist: "Taylor Swift",         duration: "3:42", image: "/images/song16.jpg" },
      { id: 1,  title: "Nights",                  artist: "Frank Ocean",          duration: "5:07", image: "/images/song17.jpg" },
      { id: 2,  title: "After Hours",             artist: "The Weeknd",           duration: "6:01", image: "/images/song18.jpg" },
      { id: 3,  title: "Solo",                    artist: "Frank Ocean",          duration: "3:54", image: "/images/song19.jpg" },
      { id: 4,  title: "Slow Dancing",            artist: "V",                    duration: "3:06", image: "/images/song20.jpg" },
    ],
  },
  {
    id: 4,
    name: "Workout Mode",
    image: "/images/playlist5.jpg",
    color: "#3a1a1a",
    songs: [
      { id: 0,  title: "POWER",                   artist: "Kanye West",           duration: "4:52", image: "/images/song21.jpg" },
      { id: 1,  title: "Lose Yourself",           artist: "Eminem",               duration: "5:26", image: "/images/song22.jpg" },
      { id: 2,  title: "Can't Hold Us",           artist: "Macklemore",           duration: "4:18", image: "/images/song23.jpg" },
      { id: 3,  title: "Stronger",                artist: "Kanye West",           duration: "5:11", image: "/images/song24.jpg" },
      { id: 4,  title: "Till I Collapse",         artist: "Eminem",               duration: "4:57", image: "/images/song25.jpg" },
    ],
  },
  {
    id: 5,
    name: "Acoustic Morning",
    image: "/images/playlist6.jpg",
    color: "#2a1f0a",
    songs: [
      { id: 0,  title: "The Night Will Always Win", artist: "Manchester Orchestra", duration: "4:01", image: "/images/song26.jpg" },
      { id: 1,  title: "Skinny Love",             artist: "Bon Iver",             duration: "3:58", image: "/images/song27.jpg" },
      { id: 2,  title: "Holocene",                artist: "Bon Iver",             duration: "5:37", image: "/images/song28.jpg" },
      { id: 3,  title: "Re: Stacks",              artist: "Bon Iver",             duration: "4:52", image: "/images/song29.jpg" },
      { id: 4,  title: "Death With Dignity",      artist: "Sufjan Stevens",       duration: "3:50", image: "/images/song30.jpg" },
    ],
  },
];

const playlistsWithAudio = playlists.map((playlist) => ({
  ...playlist,
  songs: playlist.songs.map((song) => ({
    ...song,
    audio: `/audio/song${playlist.id * 5 + song.id + 1}.mp3`,
  })),
}));

function Sidebar({ playlists, activeId, onSelect }) {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">Spotify</div>

      <div className="sidebar-section">
        <p className="sidebar-label">Menu</p>
        <a className="sidebar-link sidebar-link-active" href="#">Home</a>
        <a className="sidebar-link" href="#">Search</a>
        <a className="sidebar-link" href="#">Your Library</a>
      </div>

      <div className="sidebar-section">
        <p className="sidebar-label">Playlists</p>
        {playlists.map((playlist) => (
          <button
            key={playlist.id}
            className={`sidebar-playlist ${playlist.id === activeId ? "sidebar-playlist-active" : ""}`}
            onClick={() => onSelect(playlist.id)}
          >
            <img
              className="sidebar-playlist-img"
              src={playlist.image}
              alt={playlist.name}
            />

            {playlist.name}
          </button>
        ))}
      </div>
    </div>
  );
}


function SongRow({ song, index, isPlaying, onPlay }) {
  return (
    <div
      className={`song-row ${isPlaying ? "song-row-active" : ""}`}
      onClick={() => onPlay(song, index)}
    >
      <span className="song-index">{isPlaying ? "▶" : index + 1}</span>
      <div className="song-info">
         <img className="song-img" src={song.image} alt={song.title} />
         <div>
        <span className="song-title">{song.title}</span>
        <span className="song-artist">{song.artist}</span>
        </div>
      </div>
      <span className="song-duration">{song.duration}</span>
    </div>
  );
}


function MainContent({ playlist, currentSong, onPlay }) {
  return (
    <div className="main">
      <div className="main-header" style={{ background: playlist.color }}>
        <div className="main-header-overlay" />
        <div className="main-header-content">
         <img
            className="playlist-cover"
            src={playlist.image}
            alt={playlist.name}
          />
          <div>
            <p className="playlist-type">Playlist</p>
            <h1 className="playlist-name">{playlist.name}</h1>
            <p className="playlist-meta">{playlist.songs.length} songs</p>
          </div>
        </div>
      </div>

      <div className="main-body">
        <div className="song-list-header">
          <span className="song-list-col">#</span>
          <span className="song-list-col">Title</span>
          <span className="song-list-col song-list-col-right">Duration</span>
        </div>
        <div className="song-list-divider" />

        {playlist.songs.map((song, index) => (
          <SongRow
            key={song.id}
            song={song}
            index={index}
            isPlaying={currentSong?.title === song.title && currentSong?.artist === song.artist}
            onPlay={onPlay}
          />
        ))}
      </div>
    </div>
  );
}


function NowPlaying({ song, playlist, onNext, onPrev , isPlaying, onPlayPause, onSeek, onVolume, progress, volume, duration }) {

  const fmt = (s) => {
    if (!s || isNaN(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec < 10 ? "0" : ""}${sec}`;


  };

  const handleProgressClick = (e) => {
    const bar = e.currentTarget;
    const rect = bar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const fraction = (e.clientX - rect.left) / rect.width;
    onSeek(Math.max(0, Math.min(1, fraction)));
  };

  const handleVolumeClick = (e) => {
    const bar = e.currentTarget;
    const rect = bar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const fraction = (e.clientX - rect.left) / rect.width;
    onVolume(Math.max(0, Math.min(1, fraction)));
  };

  const progressPercent = progress * 100;
  const volumePercent = volume * 100;
  return (
    <div className="now-playing">
      <div className="now-playing-left">
        <img
          className="now-playing-cover"
          src={song.image}
          alt={song.title}
        />
        <div>
          <p className="now-playing-title">{song.title}</p>
          <p className="now-playing-artist">{song.artist}</p>
        </div>
      </div>

      <div className="now-playing-center">
        <div className="player-controls">
        <button className="ctrl-btn" onClick={onPrev}>⏮</button>
        <button className="ctrl-btn ctrl-btn-play" onClick={onPlayPause}>
          {isPlaying ? "⏸" : "▶"}
        </button>
       <button className="ctrl-btn" onClick={onNext}>⏭</button>
        </div>
        <div className="progress-row">
          <span className="progress-time-left">{fmt(duration * progress)}</span>
          <div className="progress-bar" onClick={handleProgressClick}>
            <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
          </div>
          <span className="progress-time-right">{fmt(duration)}</span>
        </div>
      </div>
      <div className="now-playing-right">
        <span className="volume-icon">🔊</span>
        <div className="volume-bar" onClick={handleVolumeClick}>
          <div className="volume-fill" style={{ width: `${volumePercent}%` }} />
        </div>
      </div>
    </div>
  );
}


export default function App() {
  const [activeId, setActiveId] = useState(0);
  const [currentSong, setCurrentSong] = useState(null);
  const [currentPlaylist, setCurrentPlaylist] = useState(null);

  const [currentIndex, setCurrentIndex] = useState(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);

  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio();
    audio.volume = volume;
    audioRef.current = audio;

    const onTimeUpdate = () => {
      if(audio.duration) setProgress(audio.currentTime / audio.duration);
    };

    const onEnded = () => {
      handleNext();
    };

    const onLoaded = () => {
      setDuration(audio.duration);
      
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("loadeddata", onLoaded);
  
return () => {
  audio.removeEventListener("timeupdate", onTimeUpdate);
  audio.removeEventListener("ended", onEnded);
  audio.removeEventListener("loadeddata", onLoaded);
  audio.pause();
};
  },[]);
  
useEffect(() => {
  if (!currentSong || !audioRef.current) return;
  const audio = audioRef.current;
  audio.src = currentSong.audio;
  audio.load();
  audio.play().then(() => setIsPlaying(true)).catch(() => {});
  setProgress(0);
}, [currentSong]);



  const handleNext = () => {
  if(!currentPlaylist) return;

  const next = (currentIndex + 1) % currentPlaylist.songs.length;
  const nextSong = currentPlaylist.songs[next];
  if (audioRef.current) {
    audioRef.current.src = nextSong.audio;
    audioRef.current.play();
  }
  setCurrentIndex(next);
  setCurrentSong(nextSong);
};

const handlePrev = () => {
  const prev = (currentIndex - 1 + currentPlaylist.songs.length) % currentPlaylist.songs.length;
  const prevSong = currentPlaylist.songs[prev];
  if (audioRef.current) {
    audioRef.current.src = prevSong.audio;
    audioRef.current.play();
  }
  setCurrentIndex(prev);
  setCurrentSong(prevSong);
};

  const activePlaylist = playlistsWithAudio[activeId];

  const handleSelectPlaylist = (id) => {
    setActiveId(id);
  };

const handlePlaySong = (song, index) => {
  if (audioRef.current) {
    audioRef.current.src = song.audio;
    audioRef.current.play();
  }
  setCurrentSong(song);
  setCurrentPlaylist(activePlaylist);
  setCurrentIndex(index);
  setIsPlaying(true);
};

const handlePlayPause = () => {
  const audio = audioRef.current;
  if (!audio) return;

  if (isPlaying) {
    audio.pause();
    setIsPlaying(false);
  } else {
    audio.play().then(() => setIsPlaying(true)).catch(() => {});
  }
}; 

const handleSeek = (fraction) => {
  const audio = audioRef.current;
  if (!audio || !audio.duration) return;
  
  audio.currentTime = fraction * audio.duration;
  setProgress(fraction);
};

const handleVolume = (fraction) => {
  const audio = audioRef.current;
  if (!audio) return;

  audio.volume = fraction;
  setVolume(fraction);
};

  return (
    <div className="app">
      <div className="app-layout">
        <Sidebar
          playlists={playlists}
          activeId={activeId}
          onSelect={handleSelectPlaylist}
        />
        <MainContent
          playlist={activePlaylist}
          currentSong={currentSong}
          onPlay={handlePlaySong}
        />
      </div>

      {currentSong && (
        <NowPlaying
        song={currentSong} 
        playlist={currentPlaylist}   
        onNext={handleNext}  
        onPrev={handlePrev}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onSeek={handleSeek}
        onVolume={handleVolume}
        progress={progress}
        duration={duration}
        volume={volume}
         />
      )}
    </div>
  );
}