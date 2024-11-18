import { useState } from "react";
import "./styles/global.css";

export function App() {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const images = [
    { src: "../../src/images/tlou-bg.jpg", alt: "Ellie e Joel abraçados" },
    { src: "../../src/images/tlou-2.jpg", alt: "Personagens The Last of Us" },
    { src: "../../src/images/tlou-3.jpg", alt: "Joel olhando pela janela" },
    { src: "../../src/images/tlou-4.jpg", alt: "Ellie e Tess se olhando" },
    {
      src: "../../src/images/tlou-5.jpg",
      alt: "Ellie e Joel caminhando em uma cidade destruída",
    },
    {
      src: "../../src/images/tlou-6.jpg",
      alt: "Joel segurando uma lanterna ligada na mão direita",
    },
  ];

  const handleButtonClick = (index: number) => {
    setActiveImageIndex(index);
  };

  return (
    <main>
      <div className="carrossel">
        {images.map((image, index) => (
          <img
            key={index}
            className={`image ${index === activeImageIndex ? "active" : ""}`}
            src={image.src}
            alt={image.alt}
          />
        ))}
      </div>

      <div className="content">
        <div className="informations">
          <img
            className="logo"
            src="../../src/images/logo.png"
            alt="logo The Last of Us"
          />
          <p className="description">
            The Last of Us é uma série distópica da HBO baseada na franquia de
            jogos de videogame de mesmo nome criada por Neil Druckmann. O drama
            narra um futuro pandêmico que foi devastador para humanidade,
            deixando os seres humanos à beira da extinção.
          </p>
          <a href="./src/pages/episodes.html">
            <button id="contact-btn">
              {/* SVG button content remains the same */}
              <span>Assistir</span>
            </button>
          </a>
        </div>

        <div className="buttons-carrossel">
          {images.map((_, index) => (
            <button
              key={index}
              className={`button ${
                index === activeImageIndex ? "selected" : ""
              }`}
              onClick={() => handleButtonClick(index)}
            />
          ))}
        </div>
      </div>

      <aside className="sidebar">
        <ul>
          <li>
            <a
              href="https://github.com/giovanniclopes"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="../../src/images/github.svg"
                alt="ícone GitHub"
                className="icon"
              />
            </a>
          </li>
          <li>
            <a
              href="https://linkedin.com/in/giovanni-lopes21"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="../../src/images/linkedin.svg"
                alt="ícone LinkedIn"
                className="icon"
              />
            </a>
          </li>
          <audio src="/audio/bg-audio.mp3" autoPlay loop />
        </ul>
      </aside>
    </main>
  );
}

export default App;
