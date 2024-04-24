import { ReloadOutlined } from "@ant-design/icons";
import { Button, Card, Input, Select } from "antd";
import React from "react";
import { useState } from "react";
import axios from 'axios';

interface LetterDisplayProps {
  lyrics: string;
  setCover: (genre: string) => void;
  setMp3: (mp3: string) => void;
  setAudio: (audio: string) => void;
  setShowSong: (show: boolean) => void;
  setLoading: (loading: boolean) => void;
}

const LetterDisplay: React.FC<LetterDisplayProps> = ({
  lyrics,
  setCover,
  setAudio,
  setMp3,
  setLoading,
  setShowSong,
}) => {

  const [title, setTitle] = useState<string>("");
  const [genre, setGenre] = useState<string>("Cumbia");

  const handleTitleChange = (e: any) => {
    setTitle(e.target.value);
  };

  const handleGenreChange = (e: any) => {
    setGenre(e);
  };

  const handleGenerateMelody = async () => {

    setLoading(true);

    const json = JSON.stringify({
      "prompt": lyrics,
      "tags": genre,
      "title": title,
      "make_instrumental": false,
      "wait_audio": true
    });

    console.log(json);

    const api_url = process.env.REACT_APP_SUNO_API_URL ?? 'https://suno-api-mauve-omega.vercel.app';
    axios.post(api_url + '/api/custom_generate', json, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(function (response) {
      console.log(response);
      if(response.data && Array.isArray(response.data) && response.data[0]) {
        const image = response.data[0].image_url;
        //const mp3 = response.data[0].mp3_url;
        const audio = response.data[0].audio_url;
        setCover(image);
        setTimeout(() => { 
          //setMp3(mp3);
          setMp3(audio);
          setAudio(audio);
          setShowSong(true);  
        }, 1000);
      }
    })
    .catch(function (error) {
      console.log('Error generando la canción: ' + error);
    })
    .finally(function () {
      setLoading(false);
    });

  };

  return (
    <div className="w-1/2 mx-auto">
      <div className="bg-white mt-5 shadow-lg p-8">
        <h3 className="uppercase font-bold">Letra</h3>
        <div className="mb-4">
          <div className="flex justify-end">
            <Button
              className="uppercase hidden"
              icon={<ReloadOutlined />}
              type="primary"
            >
              Regenerar
            </Button>
          </div>
        </div>
        <div className="mb-4">
          <Card>
            <p>
              {lyrics.split("\n").map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </p>
          </Card>
        </div>
        <div className="flex p-3 pt-3">
          <div className="mx-auto flex-1">
            <div className="bg-white mt-5 shadow-lg p-8">
              <h3 className="mb-4">
                Título de la canción
              </h3>
              <Input
                placeholder=""
                className="rounded-none"
                onChange={handleTitleChange}
                id="title"
                ></Input>
            </div>
          </div>
          <div className="mx-auto flex-1">
            <div className="bg-white mt-5 shadow-lg p-8">
              <h3 className="mb-4">
                Género
              </h3>
              <Select
                id="genre"
                defaultValue="Cumbia"
                style={{ width: 200 }}
                onChange={handleGenreChange}
                options={[
                  { value: 'Cumbia', label: 'Cumbia' },
                  { value: 'Bolero', label: 'Bolero' },
                  { value: 'Pop', label: 'Pop' },
                  { value: 'Reggae', label: 'Reggae' },
                  { value: 'Reggaeton', label: 'Reggaeton' },
                  { value: 'Rock', label: 'Rock' },
                  { value: 'Rock en español', label: 'Rock en español' },
                  { value: 'Salsa', label: 'Salsa' },
                  { value: 'Tango', label: 'Tango' },
                ]}
              />
            </div>
          </div>
        </div>
        <div className="text-center pt-3">
          <p className="mb-4">¿Te gustó la letra?</p>
          <Button
            className="uppercase bg-green-500"
            type="primary"
            onClick={handleGenerateMelody}
          >
            Generar melodía
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LetterDisplay;
