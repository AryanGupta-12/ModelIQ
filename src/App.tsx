import React from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./components/layout/Theme";
import theme from "./components/layout/Theme";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Services from "./components/sections/Services";
import Contact from "./components/sections/Contact";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Contact />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
