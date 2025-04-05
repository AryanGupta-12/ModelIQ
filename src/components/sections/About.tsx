import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import theme from "../layout/Theme";

const AboutSection = styled.section`
  padding: ${theme.spacing.xl} 0;
  background-color: ${theme.colors.light};
`;

const AboutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.lg};
`;

const SectionTag = styled(motion.span)`
  display: inline-block;
  background-color: rgba(255, 51, 102, 0.1);
  color: ${theme.colors.primary};
  padding: 8px 16px;
  border-radius: 50px;
  font-size: ${theme.fontSizes.small};
  font-weight: 600;
  margin-bottom: ${theme.spacing.sm};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const SectionTitle = styled(motion.h2)`
  font-family: ${theme.fonts.primary};
  font-size: clamp(2rem, 4vw, ${theme.fontSizes.xlarge});
  color: ${theme.colors.secondary};
  margin-bottom: ${theme.spacing.sm};

  span {
    color: ${theme.colors.primary};
  }
`;

const SectionSubtitle = styled(motion.p)`
  font-size: ${theme.fontSizes.medium};
  color: #666;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.7;
`;

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.lg};
  margin-top: ${theme.spacing.lg};
`;

const ContentBlock = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: ${theme.spacing.md};
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: ${theme.transitions.default};

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  }
`;

const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: rgba(255, 51, 102, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${theme.spacing.sm};
  font-size: 2rem;
`;

const BlockTitle = styled.h3`
  font-family: ${theme.fonts.primary};
  font-size: ${theme.fontSizes.large};
  margin-bottom: ${theme.spacing.sm};
  color: ${theme.colors.secondary};
`;

const BlockDescription = styled.p`
  color: #666;
  line-height: 1.7;
`;

const About: React.FC = () => {
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [contentRef, contentInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <AboutSection id="about">
      <AboutContainer>
        <SectionHeader
          ref={headerRef}
          as={motion.div}
          variants={headerVariants}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
        >
          <SectionTag variants={itemVariants}>About Us</SectionTag>
          <SectionTitle variants={itemVariants}>
            Revolutionizing <span>Fashion Production</span> with AI
          </SectionTitle>
          <SectionSubtitle variants={itemVariants}>
            ModelIQ uses cutting-edge artificial intelligence to create virtual
            fashion try-ons, eliminating the need for expensive photoshoots and
            model hiring.
          </SectionSubtitle>
        </SectionHeader>

        <AboutContent
          ref={contentRef}
          as={motion.div}
          variants={contentVariants}
          initial="hidden"
          animate={contentInView ? "visible" : "hidden"}
        >
          <ContentBlock variants={itemVariants}>
            <IconWrapper>💰</IconWrapper>
            <BlockTitle>Cost Effective</BlockTitle>
            <BlockDescription>
              Say goodbye to expensive photoshoots, model hiring, and studio
              rentals. Our AI solution dramatically reduces production costs
              while maintaining high-quality visuals for your fashion catalog.
            </BlockDescription>
          </ContentBlock>

          <ContentBlock variants={itemVariants}>
            <IconWrapper>⚡</IconWrapper>
            <BlockTitle>Lightning Fast</BlockTitle>
            <BlockDescription>
              Traditional photoshoots can take weeks to plan and execute. With
              ModelIQ, you can generate professional fashion imagery in minutes,
              allowing you to showcase your new collections faster than ever.
            </BlockDescription>
          </ContentBlock>

          <ContentBlock variants={itemVariants}>
            <IconWrapper>🌐</IconWrapper>
            <BlockTitle>Diverse Representation</BlockTitle>
            <BlockDescription>
              Our AI models come in all shapes, sizes, and ethnicities, allowing
              you to showcase your clothing on a diverse range of models without
              the limitations of traditional model casting.
            </BlockDescription>
          </ContentBlock>

          <ContentBlock variants={itemVariants}>
            <IconWrapper>♻️</IconWrapper>
            <BlockTitle>Sustainable</BlockTitle>
            <BlockDescription>
              By eliminating the need for physical photoshoots, our solution
              reduces the carbon footprint associated with travel, studio
              lighting, and other resources typically required for fashion
              production.
            </BlockDescription>
          </ContentBlock>
        </AboutContent>
      </AboutContainer>
    </AboutSection>
  );
};

export default About;
