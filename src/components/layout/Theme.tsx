import { createGlobalStyle } from "styled-components";

export const theme = {
  colors: {
    primary: "#FF3366", // Fashion pink
    secondary: "#2C3E50", // Deep navy
    tertiary: "#F7F7F7", // Light grey
    accent: "#FFD700", // Gold
    dark: "#1A1A1A",
    light: "#FFFFFF",
    error: "#FF0033",
    success: "#00CC99",
  },
  fonts: {
    primary: "'Playfair Display', serif",
    secondary: "'Montserrat', sans-serif",
  },
  fontSizes: {
    small: "0.875rem",
    medium: "1rem",
    large: "1.5rem",
    xlarge: "2.5rem",
    xxlarge: "3.5rem",
  },
  breakpoints: {
    mobile: "576px",
    tablet: "768px",
    desktop: "1024px",
    wide: "1200px",
  },
  spacing: {
    xs: "0.5rem",
    sm: "1rem",
    md: "2rem",
    lg: "3rem",
    xl: "5rem",
  },
  transitions: {
    default: "0.3s ease",
    slow: "0.6s ease",
    fast: "0.15s ease",
  },
};

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap');
  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: ${theme.fonts.secondary};
    color: ${theme.colors.dark};
    background-color: ${theme.colors.light};
    line-height: 1.6;
    overflow-x: hidden;
  }
  
  h1, h2, h3, h4, h5 {
    font-family: ${theme.fonts.primary};
    font-weight: 600;
    line-height: 1.3;
    margin-bottom: ${theme.spacing.sm};
  }
  
  p {
    margin-bottom: ${theme.spacing.sm};
  }
  
  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    transition: ${theme.transitions.default};
    
    &:hover {
      color: ${theme.colors.secondary};
    }
  }
  
  button {
    font-family: ${theme.fonts.secondary};
    cursor: pointer;
  }
  
  section {
    padding: ${theme.spacing.lg} 0;
  }
`;

export default theme;
