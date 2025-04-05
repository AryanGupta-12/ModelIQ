import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import theme from "./Theme";

const FooterContainer = styled.footer`
  background-color: ${theme.colors.secondary};
  color: ${theme.colors.light};
  padding: ${theme.spacing.lg} 0;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const FooterSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
`;

const FooterTitle = styled.h3`
  font-family: ${theme.fonts.primary};
  color: ${theme.colors.light};
  margin-bottom: ${theme.spacing.sm};
  font-size: ${theme.fontSizes.large};
  position: relative;

  &:after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 0;
    height: 2px;
    width: 50px;
    background-color: ${theme.colors.primary};

    @media (max-width: ${theme.breakpoints.tablet}) {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const FooterText = styled.p`
  margin-bottom: ${theme.spacing.sm};
  font-size: ${theme.fontSizes.medium};
  line-height: 1.6;
`;

const FooterLink = styled.a`
  color: ${theme.colors.light};
  margin-bottom: ${theme.spacing.xs};
  transition: ${theme.transitions.default};
  display: inline-block;

  &:hover {
    color: ${theme.colors.primary};
    transform: translateX(5px);

    @media (max-width: ${theme.breakpoints.tablet}) {
      transform: none;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.sm};

  @media (max-width: ${theme.breakpoints.tablet}) {
    justify-content: center;
  }
`;

const SocialIcon = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  color: ${theme.colors.light};
  font-size: ${theme.fontSizes.medium};
  transition: ${theme.transitions.default};

  &:hover {
    background-color: ${theme.colors.primary};
    color: ${theme.colors.light};
    transform: translateY(-3px);
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: ${theme.spacing.md};
  margin-top: ${theme.spacing.md};
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
  font-size: ${theme.fontSizes.small};
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-left: ${theme.spacing.md};
  padding-right: ${theme.spacing.md};
`;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer id="contact">
      <FooterContent>
        <FooterSection
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <FooterTitle>ModelIQ</FooterTitle>
          <FooterText>
            Revolutionizing fashion with AI-powered virtual try-on technology.
            Reducing costs and increasing efficiency for clothing brands while
            providing an enhanced shopping experience.
          </FooterText>
          <SocialLinks>
            <SocialIcon
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <span>𝕏</span>
            </SocialIcon>
            <SocialIcon
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <span>ℹ️</span>
            </SocialIcon>
            <SocialIcon
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <span>📸</span>
            </SocialIcon>
          </SocialLinks>
        </FooterSection>

        <FooterSection
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <FooterTitle>Quick Links</FooterTitle>
          <FooterLink href="#home">Home</FooterLink>
          <FooterLink href="#about">About Us</FooterLink>
          <FooterLink href="#services">Services</FooterLink>
          <FooterLink href="#contact">Contact</FooterLink>
        </FooterSection>

        <FooterSection
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <FooterTitle>Contact Us</FooterTitle>
          <FooterText>
            Email: info@modeliq.com
            <br />
          </FooterText>
        </FooterSection>
      </FooterContent>

      <Copyright>
        <p>© {currentYear} ModelIQ. All rights reserved.</p>
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;
