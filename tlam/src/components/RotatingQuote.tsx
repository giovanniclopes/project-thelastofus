import { useState, useEffect } from "react";

const RotatingQuote = () => {
  const quotes = [
    "When you're lost in the darkness, look for the light.",
    "Endure and survive.",
    "Save who you can save.",
    "You keep finding something to fight for.",
    "After all we've been through, everything I've done—it can't be for nothing.",
  ];

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let typingInterval: NodeJS.Timeout;
    const currentQuote = quotes[currentQuoteIndex];

    if (!isDeleting && displayedText.length < currentQuote.length) {
      // Adiciona caracteres
      typingInterval = setTimeout(() => {
        setDisplayedText(currentQuote.substring(0, displayedText.length + 1));
      }, 100);
    } else if (isDeleting && displayedText.length > 0) {
      // Remove caracteres
      typingInterval = setTimeout(() => {
        setDisplayedText(currentQuote.substring(0, displayedText.length - 1));
      }, 50);
    } else if (!isDeleting && displayedText.length === currentQuote.length) {
      // Pausa antes de deletar
      typingInterval = setTimeout(() => {
        setIsDeleting(true);
      }, 3000);
    } else if (isDeleting && displayedText.length === 0) {
      // Passa para a próxima frase
      setIsDeleting(false);
      setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
    }

    return () => clearTimeout(typingInterval);
  }, [displayedText, isDeleting, currentQuoteIndex]);

  return (
    <p className="text-white mt-2 italic text-sm md:text-base">
      {displayedText}
      <span className="blinking-cursor">|</span>
    </p>
  );
};

export default RotatingQuote;
