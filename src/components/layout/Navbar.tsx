import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import theme from "./Theme";

interface ScrollProps {
  isScrolled?: boolean;
}

const NavContainer = styled.nav<ScrollProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: ${(props) => (props.isScrolled ? "1rem 2rem" : "1.5rem 2rem")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  transition: all ${theme.transitions.default};
  background-color: ${(props) =>
    props.isScrolled ? "rgba(255, 255, 255, 0.95)" : "transparent"};
  box-shadow: ${(props) =>
    props.isScrolled ? "0 2px 10px rgba(0, 0, 0, 0.1)" : "none"};

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 1rem;
  }
`;

const Logo = styled(motion.div)`
  font-family: ${theme.fonts.primary};
  font-size: ${theme.fontSizes.large};
  font-weight: 700;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
`;

const LogoText = styled.span<ScrollProps>`
  background: ${(props) =>
    props.isScrolled
      ? `linear-gradient(135deg, ${theme.colors.primary} 0%, #ff6b9d 100%)`
      : `linear-gradient(135deg, ${theme.colors.primary} 0%, #ffffff 100%)`};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: ${(props) =>
    props.isScrolled
      ? "0 2px 4px rgba(255, 51, 102, 0.2)"
      : "0 2px 10px rgba(255, 255, 255, 0.3)"};
  letter-spacing: 1px;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 2px;
    background: ${(props) =>
      props.isScrolled
        ? `linear-gradient(90deg, ${theme.colors.primary} 0%, transparent 100%)`
        : "rgba(255, 255, 255, 0.3)"};
    transform: scaleX(0.8);
    transform-origin: left;
    transition: transform 0.3s ease;
  }

  ${Logo}:hover &::after {
    transform: scaleX(1);
  }
`;

const LogoIcon = styled.span`
  font-size: 1.2em;
  margin-right: 8px;
  color: ${theme.colors.primary};
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: none;
  }
`;

const NavLink = styled(motion.a)<ScrollProps>`
  font-family: ${theme.fonts.secondary};
  font-size: ${theme.fontSizes.medium};
  font-weight: 500;
  color: ${(props) =>
    props.isScrolled ? theme.colors.secondary : theme.colors.light};
  text-decoration: none;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: ${theme.colors.primary};
    transition: width ${theme.transitions.default};
  }

  &:hover:after {
    width: 100%;
  }
`;

const MobileMenuButton = styled.button<ScrollProps>`
  display: none;
  background: none;
  border: none;
  cursor: pointer;

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: block;
    font-size: 1.5rem;
    color: ${(props) =>
      props.isScrolled ? theme.colors.secondary : theme.colors.light};
    z-index: 1001;
  }
`;

const MobileMenu = styled(motion.div)`
  display: none;

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${theme.colors.light};
    padding: 5rem 2rem;
    z-index: 1000;
  }
`;

const MobileNavLink = styled(motion.a)`
  font-family: ${theme.fonts.secondary};
  font-size: ${theme.fontSizes.large};
  font-weight: 500;
  color: ${theme.colors.secondary};
  text-decoration: none;
  padding: 1rem 0;
  border-bottom: 1px solid ${theme.colors.tertiary};
`;

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <NavContainer isScrolled={isScrolled}>
      <Logo
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <LogoIcon></LogoIcon>
        <LogoText isScrolled={isScrolled}>ModelIQ</LogoText>
      </Logo>

      <NavLinks
        as={motion.div}
        variants={navVariants}
        initial="hidden"
        animate="visible"
      >
        <NavLink href="#home" variants={itemVariants} isScrolled={isScrolled}>
          Home
        </NavLink>
        <NavLink href="#about" variants={itemVariants} isScrolled={isScrolled}>
          About
        </NavLink>
        <NavLink
          href="#services"
          variants={itemVariants}
          isScrolled={isScrolled}
        >
          Services
        </NavLink>
        <NavLink
          href="#contact"
          variants={itemVariants}
          isScrolled={isScrolled}
        >
          Contact
        </NavLink>
      </NavLinks>

      <MobileMenuButton onClick={toggleMobileMenu} isScrolled={isScrolled}>
        {isMobileMenuOpen ? "✕" : "☰"}
      </MobileMenuButton>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween" }}
          >
            <MobileNavLink
              href="#home"
              onClick={() => setIsMobileMenuOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Home
            </MobileNavLink>
            <MobileNavLink
              href="#about"
              onClick={() => setIsMobileMenuOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              About
            </MobileNavLink>
            <MobileNavLink
              href="#services"
              onClick={() => setIsMobileMenuOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Services
            </MobileNavLink>
            <MobileNavLink
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Contact
            </MobileNavLink>
          </MobileMenu>
        )}
      </AnimatePresence>
    </NavContainer>
  );
};

export default Navbar;
