import { motion } from "framer-motion";

const FloatingQuotes = () => {
  const quotes = [
    "Look for the light.",
    "Endure and survive.",
    "It can't be for nothing.",
    "You have no idea what loss is.",
    "This world is cruel.",
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
      {quotes.map((quote, index) => {
        const randomX = Math.random() * 100; // Posição inicial aleatória no eixo X
        const randomY = Math.random() * 100; // Posição inicial aleatória no eixo Y
        const duration = Math.random() * 10 + 15; // Duração aleatória (15-25s)
        const delay = Math.random() * 5; // Atraso aleatório

        return (
          <motion.p
            key={index}
            className="absolute text-white italic text-xs md:text-sm opacity-20"
            style={{
              left: `${randomX}%`,
              top: `${randomY}%`,
            }}
            animate={{
              x: ["0%", "10%", "-10%", "0%"], // Pequenos movimentos para os lados
              y: ["0%", "-20%"], // Flutuações para cima
              opacity: [0.2, 0.3, 0.2], // Variações de opacidade
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay,
            }}
          >
            {quote}
          </motion.p>
        );
      })}
    </div>
  );
};

export default FloatingQuotes;
