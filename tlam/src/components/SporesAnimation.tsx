import { motion } from "framer-motion";

const SporesAnimation = () => {
  const spores = Array.from({ length: 35 }); // Número de esporos

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {spores.map((_, index) => {
        // Configurações de cada espore
        const randomX = Math.random() * 100; // Posição inicial aleatória no eixo X
        const randomSize = Math.random() * 5 + 2; // Tamanho aleatório (entre 2px e 7px)
        const duration = Math.random() * 10 + 5; // Duração da animação aleatória (5-15s)

        return (
          <motion.div
            key={index}
            className="absolute bg-orange-500 rounded-full opacity-30"
            style={{
              width: `${randomSize}px`,
              height: `${randomSize}px`,
              left: `${randomX}%`,
              top: "100%", // Inicia fora da tela
            }}
            animate={{
              top: ["100%", "-10%"], // Anima do fundo ao topo da tela
              opacity: [0.2, 0.5, 0], // Fica mais visível no meio e desaparece
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay: Math.random() * 5, // Atraso aleatório para cada partícula
            }}
          />
        );
      })}
    </div>
  );
};

export default SporesAnimation;
