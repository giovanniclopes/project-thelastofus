import { useState, useEffect, useRef } from "react";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import TlouLogo from "../src/assets/logo.png";
import FireflyLogo from "../src/assets/fireflies-logo.svg";
import BackgroundMusic from "../src/assets/audio/bg-audio.mp3";
import SporesAnimation from "../src/components/SporesAnimation";
import RotatingQuote from "../src/components/RotatingQuote";
import FloatingQuotes from "../src/components/FloatingQuotes";

const images = [
  new URL("./assets/tlou-1.jpg", import.meta.url).href,
  new URL("./assets/tlou-2.jpg", import.meta.url).href,
  new URL("./assets/tlou-3.jpg", import.meta.url).href,
  new URL("./assets/tlou-4.jpg", import.meta.url).href,
  new URL("./assets/tlou-5.jpg", import.meta.url).href,
  new URL("./assets/tlou-6.jpg", import.meta.url).href,
];

// Componente para o áudio
const AudioController = ({
  isMuted,
  toggleMute,
}: {
  isMuted: boolean;
  toggleMute: () => void;
}) => (
  <button
    onClick={toggleMute}
    className="absolute top-4 right-4 text-white text-2xl"
    aria-label={isMuted ? "Unmute audio" : "Mute audio"}
  >
    {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
  </button>
);

// Componente para os indicadores de imagens
const ImageIndicators = ({
  images,
  currentImageIndex,
  setCurrentImageIndex,
}: {
  images: string[];
  currentImageIndex: number;
  setCurrentImageIndex: (index: number) => void;
}) => (
  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3  p-2 rounded-full">
    {images.map((_, index) => (
      <button
        key={index}
        onClick={() => setCurrentImageIndex(index)}
        className={`w-2.5 h-2.5 border rounded-full ${
          currentImageIndex === index
            ? "p-2 bg-black border-white"
            : "p-2 bg-white border-black hover:bg-gray-300"
        } transition-all duration-300 transform hover:scale-110 hover:shadow-glow`}
        aria-label={`Go to image ${index + 1}`}
      />
    ))}
  </div>
);

const App = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(
    () => localStorage.getItem("isMuted") === "true"
  );
  const audioRef = useRef<HTMLAudioElement>(new Audio(BackgroundMusic));

  // Precarrega imagens
  useEffect(() => {
    images.forEach((img) => {
      const imgPreload = new Image();
      imgPreload.src = img;
    });
  }, []);

  // Troca automática de imagens
  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 7500);
    return () => clearTimeout(timeout);
  }, [currentImageIndex]);

  // Configura e gerencia o áudio
  useEffect(() => {
    const audio = audioRef.current;
    audio.loop = true;
    audio.muted = isMuted;
    if (!isMuted) {
      audio
        .play()
        .catch((error) => console.error("Erro ao reproduzir áudio:", error));
    }
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted((prevMuted) => {
      const newMutedState = !prevMuted;
      audioRef.current.muted = newMutedState;
      localStorage.setItem("isMuted", String(newMutedState));
      return newMutedState;
    });
  };

  return (
    <div className="relative">
      <SporesAnimation />
      <FloatingQuotes />

      <div className="fixed inset-0 pointer-events-none opacity-40 bg-black"></div>
      <div
        className="w-screen h-screen bg-cover bg-center transition-all duration-1000 ease-in-out relative"
        style={{
          backgroundImage: `url(${images[currentImageIndex]})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/90 pointer-events-none" />

        <div className="flex flex-col pt-16 md:pt-32 pl-4 md:pl-16 mbl:pt-36">
          <img
            className="invert w-3/6 md:w-2/6"
            src={TlouLogo}
            alt="The Last of Us Logo"
          />
          <RotatingQuote />
          <p className="text-white mt-4 md:mt-10 max-w-full md:max-w-2xl text-sm md:text-xl text-left leading-relaxed mbl:w-5/6 mbl:mt-7">
            The Last of Us é uma série distópica da HBO baseada na franquia de
            jogos de videogame de mesmo nome criada por Neil Druckmann. O drama
            narra um futuro pandêmico que foi devastador para humanidade.
          </p>
          <button className="w-max mt-5 text-sm md:text-lg font-bold bg-white text-black py-2 md:py-4 px-5 md:px-10 cursor-pointer flex items-center justify-center gap-2 border-none rounded-lg overflow-hidden transition-all duration-200 hover:bg-slate-200">
            <img
              className="size-6 md:size-10"
              src={FireflyLogo}
              alt="Firefly Logo"
            />
            Assistir
          </button>
        </div>
      </div>
      <ImageIndicators
        images={images}
        currentImageIndex={currentImageIndex}
        setCurrentImageIndex={setCurrentImageIndex}
      />
      <AudioController isMuted={isMuted} toggleMute={toggleMute} />
    </div>
  );
};

export default App;
