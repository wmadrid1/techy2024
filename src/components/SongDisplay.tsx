import { Button } from "antd";
import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

interface SongDisplayProps {
  emails: string;
  cover: string;
  mp3_url: string;
  audio_url: string;
  titulo: string;
  showSong: boolean;
}

const SongDisplay: React.FC<SongDisplayProps> = ({
  emails,
  cover,
  mp3_url,
  audio_url,
  showSong,
  titulo
}) => {

  useEffect(() => emailjs.init(process.env.REACT_APP_EMAILJS_KEY ?? '6DPLoUxaLqR_Y5lsi'), []);
  
  const [showSent, setShowSent] = useState(false);

  const handleSubmit = async () => {
 
    const serviceId = "service_qup7err";
    const templateId = "template_4nbk34k";

    try {
      await emailjs.send(serviceId, templateId, {
        portada: cover,
        cancion: mp3_url,
        titulo: titulo,
        bcc: emails,
      });
      setShowSent(true);
    } catch (error) {
      console.log(error);
    } finally {
    }

    setTimeout(() => {
      setShowSent(false);
     }, 5000);
  };

  return (
    <div className="w-1/2 mx-auto mb-8">
      <div className="flex justify-between flex-col">
        { showSong ?  
        <div className="bg-white mt-5 shadow-lg p-8 content-center">
          <div className="flex justify-center items-center">
            <img
            className="p-2"
            height={170}
            style={{ height: "170px" }}
            alt="Portada"
            src={cover}
          />
          </div>
          <AudioPlayer
            autoPlay
            src={audio_url}
            onPlay={e => console.log("onPlay")}
          />
        </div>
        : null }
        { showSent ?  
          <div className="bg-lime-500 mt-5 shadow-lg p-8">
          Emails enviados!
          </div> : null 
        }
        <div className="justify-end flex mt-5">
          <Button
            className="uppercase bg-green-500 hover:bg-green-700"
            type="primary"
            onClick={handleSubmit}
          >
            Enviar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SongDisplay;
