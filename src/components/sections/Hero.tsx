import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import theme from "../layout/Theme";

const HeroContainer = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 0 ${theme.spacing.md};

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      ${theme.colors.secondary} 0%,
      #1a1a2e 100%
    );
    opacity: 0.9;
    z-index: -1;
  }
`;

const BackgroundPattern = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
      circle at 20% 20%,
      rgba(255, 51, 102, 0.1) 0%,
      transparent 20%
    ),
    radial-gradient(
      circle at 80% 50%,
      rgba(255, 51, 102, 0.08) 0%,
      transparent 25%
    ),
    radial-gradient(
      circle at 40% 80%,
      rgba(255, 51, 102, 0.06) 0%,
      transparent 30%
    ),
    radial-gradient(
      circle at 70% 10%,
      rgba(44, 62, 80, 0.1) 0%,
      transparent 15%
    );
  z-index: -1;
`;

const AnimatedLines = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(
      30deg,
      rgba(255, 255, 255, 0.05) 12%,
      transparent 12.5%,
      transparent 87%,
      rgba(255, 255, 255, 0.05) 87.5%,
      rgba(255, 255, 255, 0.05)
    ),
    linear-gradient(
      150deg,
      rgba(255, 255, 255, 0.05) 12%,
      transparent 12.5%,
      transparent 87%,
      rgba(255, 255, 255, 0.05) 87.5%,
      rgba(255, 255, 255, 0.05)
    );
  background-size: 40px 70px;
  z-index: -1;
`;

const DynamicParticles = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
`;

const Particle = styled(motion.div)`
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
`;

const ModelGalleryBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  opacity: 0.15;
  overflow: hidden;
`;

const ModelTile = styled(motion.div)`
  position: absolute;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 10;

  @media (max-width: ${theme.breakpoints.tablet}) {
    flex-direction: column;
    justify-content: center;
    text-align: center;
    gap: ${theme.spacing.lg};
  }
`;

const HeroText = styled(motion.div)`
  flex: 1;
  color: ${theme.colors.light};
  max-width: 600px;

  @media (max-width: ${theme.breakpoints.tablet}) {
    order: 2;
  }
`;

const HeroTitle = styled(motion.h1)`
  font-family: ${theme.fonts.primary};
  font-size: clamp(2.5rem, 5vw, ${theme.fontSizes.xxlarge});
  font-weight: 700;
  margin-bottom: ${theme.spacing.sm};
  line-height: 1.2;

  span {
    color: ${theme.colors.primary};
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: clamp(${theme.fontSizes.medium}, 2vw, ${theme.fontSizes.large});
  margin-bottom: ${theme.spacing.md};
  opacity: 0.9;
  line-height: 1.6;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};

  @media (max-width: ${theme.breakpoints.tablet}) {
    justify-content: center;
  }
`;

const PrimaryButton = styled(motion.a)`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.light};
  padding: 12px 24px;
  border-radius: 4px;
  font-weight: 600;
  font-size: ${theme.fontSizes.medium};
  border: 2px solid ${theme.colors.primary};
  cursor: pointer;
  transition: ${theme.transitions.default};
  display: inline-block;
  text-decoration: none;

  &:hover {
    background-color: transparent;
    color: ${theme.colors.light};
  }
`;

const SecondaryButton = styled(motion.a)`
  background-color: transparent;
  color: ${theme.colors.light};
  padding: 12px 24px;
  border-radius: 4px;
  font-weight: 600;
  font-size: ${theme.fontSizes.medium};
  border: 2px solid ${theme.colors.light};
  cursor: pointer;
  transition: ${theme.transitions.default};
  display: inline-block;
  text-decoration: none;

  &:hover {
    background-color: ${theme.colors.light};
    color: ${theme.colors.secondary};
  }
`;

const HeroVisual = styled(motion.div)`
  flex: 1;
  position: relative;
  height: 500px;

  @media (max-width: ${theme.breakpoints.tablet}) {
    order: 1;
    height: 300px;
    width: 100%;
  }
`;

const FloatingImage = styled(motion.div)`
  position: absolute;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.3);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &.model-1 {
    width: 250px;
    height: 350px;
    top: 0;
    left: 50px;
    z-index: 3;

    @media (max-width: ${theme.breakpoints.tablet}) {
      width: 150px;
      height: 210px;
      left: 10%;
    }
  }

  &.model-2 {
    width: 250px;
    height: 350px;
    bottom: 0;
    right: 50px;
    z-index: 2;

    @media (max-width: ${theme.breakpoints.tablet}) {
      width: 150px;
      height: 210px;
      right: 10%;
    }
  }

  &.model-3 {
    width: 200px;
    height: 300px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;

    @media (max-width: ${theme.breakpoints.tablet}) {
      width: 120px;
      height: 180px;
    }
  }
`;

const ShapeDivider = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  z-index: 5;

  svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 70px;

    @media (max-width: ${theme.breakpoints.tablet}) {
      height: 40px;
    }
  }

  .shape-fill {
    fill: ${theme.colors.light};
  }
`;

// Collection of fashion model images
const modelImages = [
  "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZmFzaGlvbiUyMG1vZGVsfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFzaGlvbiUyMG1vZGVsfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmFzaGlvbiUyMG1vZGVsfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhc2hpb24lMjBtb2RlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGZhc2hpb24lMjBtb2RlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZhc2hpb24lMjBtb2RlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGZhc2hpb24lMjBtb2RlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGZhc2hpb24lMjBtb2RlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
];

const Hero: React.FC = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // State to cycle through images
  const [image1Index, setImage1Index] = useState(0);
  const [image2Index, setImage2Index] = useState(1);
  const [image3Index, setImage3Index] = useState(2);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Cycle through images
  useEffect(() => {
    const interval1 = setInterval(() => {
      setImage1Index((prevIndex) => (prevIndex + 1) % modelImages.length);
    }, 5000);

    const interval2 = setInterval(() => {
      setImage2Index((prevIndex) => (prevIndex + 1) % modelImages.length);
    }, 6000);

    const interval3 = setInterval(() => {
      setImage3Index((prevIndex) => (prevIndex + 1) % modelImages.length);
    }, 7000);

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
      clearInterval(interval3);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const generateParticles = () => {
    const particles = [];
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const size = Math.random() * 4 + 2;
      particles.push(
        <Particle
          key={i}
          style={{ left: `${x}%`, top: `${y}%`, width: size, height: size }}
          animate={{
            y: [0, Math.random() * -30 - 10, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      );
    }
    return particles;
  };

  const generateModelTiles = () => {
    const tiles = [];
    for (let i = 0; i < 12; i++) {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const size = Math.random() * 70 + 100;
      const imageIndex = i % modelImages.length;

      tiles.push(
        <ModelTile
          key={i}
          style={{
            left: `${x}%`,
            top: `${y}%`,
            width: size,
            height: size * 1.5,
            transform: `rotate(${Math.random() * 20 - 10}deg)`,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.5, 0],
            scale: [0.8, 1, 0.8],
            x: [0, Math.random() * 40 - 20, 0],
            y: [0, Math.random() * 40 - 20, 0],
          }}
          transition={{
            duration: Math.random() * 15 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        >
          <img src={modelImages[imageIndex]} alt={`Fashion model ${i}`} />
        </ModelTile>
      );
    }
    return tiles;
  };

  return (
    <HeroContainer id="home">
      <BackgroundPattern
        animate={{
          background: [
            "radial-gradient(circle at 20% 20%, rgba(255, 51, 102, 0.1) 0%, transparent 20%), radial-gradient(circle at 80% 50%, rgba(255, 51, 102, 0.08) 0%, transparent 25%), radial-gradient(circle at 40% 80%, rgba(255, 51, 102, 0.06) 0%, transparent 30%), radial-gradient(circle at 70% 10%, rgba(44, 62, 80, 0.1) 0%, transparent 15%)",
            "radial-gradient(circle at 30% 30%, rgba(255, 51, 102, 0.1) 0%, transparent 20%), radial-gradient(circle at 70% 60%, rgba(255, 51, 102, 0.08) 0%, transparent 25%), radial-gradient(circle at 50% 70%, rgba(255, 51, 102, 0.06) 0%, transparent 30%), radial-gradient(circle at 60% 20%, rgba(44, 62, 80, 0.1) 0%, transparent 15%)",
            "radial-gradient(circle at 20% 20%, rgba(255, 51, 102, 0.1) 0%, transparent 20%), radial-gradient(circle at 80% 50%, rgba(255, 51, 102, 0.08) 0%, transparent 25%), radial-gradient(circle at 40% 80%, rgba(255, 51, 102, 0.06) 0%, transparent 30%), radial-gradient(circle at 70% 10%, rgba(44, 62, 80, 0.1) 0%, transparent 15%)",
          ],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <AnimatedLines
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <DynamicParticles>{generateParticles()}</DynamicParticles>

      <ModelGalleryBackground>{generateModelTiles()}</ModelGalleryBackground>

      <HeroContent>
        <HeroText
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <HeroTitle variants={itemVariants}>
            Virtual Fashion Try-On with <span>AI Models</span>
          </HeroTitle>
          <HeroSubtitle variants={itemVariants}>
            Save costs on photoshoots, model hiring, and streamline your fashion
            catalog production with our cutting-edge AI solution.
          </HeroSubtitle>
          <ButtonGroup>
            <PrimaryButton
              href="#contact"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </PrimaryButton>
            <SecondaryButton
              href="#about"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </SecondaryButton>
          </ButtonGroup>
        </HeroText>

        <HeroVisual>
          <FloatingImage
            className="model-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{
              opacity: 1,
              x: 0,
              y: [0, -10, 0],
              transition: {
                y: {
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                },
                opacity: { duration: 0.8, delay: 0.5 },
                x: { duration: 0.8, delay: 0.5 },
              },
            }}
            key={`model1-${image1Index}`}
          >
            <motion.img
              src={modelImages[image1Index]}
              alt="Fashion model showcasing outfit"
              initial={{ opacity: 0.3, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            />
          </FloatingImage>

          <FloatingImage
            className="model-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{
              opacity: 1,
              x: 0,
              y: [0, 10, 0],
              transition: {
                y: {
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                },
                opacity: { duration: 0.8, delay: 0.7 },
                x: { duration: 0.8, delay: 0.7 },
              },
            }}
            key={`model2-${image2Index}`}
          >
            <motion.img
              src={modelImages[image2Index]}
              alt="Fashion model in trending clothes"
              initial={{ opacity: 0.3, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            />
          </FloatingImage>

          <FloatingImage
            className="model-3"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: [0, 2, 0, -2, 0],
              transition: {
                rotate: {
                  repeat: Infinity,
                  duration: 5,
                  ease: "easeInOut",
                },
                opacity: { duration: 0.8, delay: 0.9 },
                scale: { duration: 0.8, delay: 0.9 },
              },
            }}
            key={`model3-${image3Index}`}
          >
            <motion.img
              src={modelImages[image3Index]}
              alt="Fashion model posing"
              initial={{ opacity: 0.3, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            />
          </FloatingImage>
        </HeroVisual>
      </HeroContent>

      <ShapeDivider>
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="shape-fill"
          ></path>
        </svg>
      </ShapeDivider>
    </HeroContainer>
  );
};

export default Hero;
