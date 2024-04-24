import { useState } from "react";
import "./App.css";
import EmailInput from "./components/EmailInput";
import LetterDisplay from "./components/LetterDisplay";
import PromptInput from "./components/PromptInput";
import SongDisplay from "./components/SongDisplay";
import Title from "./components/Title";
import { Audio } from "react-loader-spinner";

function App() {
  const [loading, setLoading] = useState(false);
  const [lyrics, setLyrics] = useState<string>("");
  const [emails, setEmails] = useState<string>("");
  const [cover, setCover] = useState<string>("");
  const [mp3, setMp3] = useState<string>("");
  const [audio, setAudio] = useState<string>("");
  const [titulo, setTitulo] = useState<string>("");
  const [showSong, setShowSong] = useState(false);

  return (
    <div className="min-h-screen bg-[#0096FF] flex justify-center flex-col">
      <Title />
      <PromptInput setLyrics={setLyrics} setLoading={setLoading} />

      {  loading &&
        <div style={{ position: "fixed", left: "47%", top: "50%", zIndex: 1000 }}> 
          <Audio
            height="100"
            width="100"
            color="#4fa94d"
            ariaLabel="audio-loading"
            wrapperStyle={{}}
            wrapperClass="wrapper-class"
            visible={true}
          />
        </div>
        }
      <LetterDisplay lyrics={lyrics} setLoading={setLoading} setCover={setCover} setAudio={setAudio} setMp3={setMp3} setShowSong={setShowSong} setTitulo={setTitulo}  />
      <EmailInput setEmails={setEmails} />
      <SongDisplay emails={emails} cover={cover} mp3_url={mp3} audio_url={audio} showSong={showSong} titulo={titulo} />
    </div>
  );
}

export default App;
