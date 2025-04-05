import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import theme from "../layout/Theme";

const ServicesSection = styled.section`
  padding: ${theme.spacing.xl} 0;
  background-color: ${theme.colors.tertiary};
  position: relative;
  overflow: hidden;
`;

const ServicesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
  position: relative;
  z-index: 1;
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

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled(motion.div)`
  background-color: ${theme.colors.light};
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.05);
  transition: ${theme.transitions.default};

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);

    .service-image {
      transform: scale(1.05);
    }
  }
`;

const ServiceImageContainer = styled.div`
  height: 250px;
  overflow: hidden;
`;

const ServiceImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
`;

const ServiceContent = styled.div`
  padding: ${theme.spacing.md};
`;

const ServiceTitle = styled.h3`
  font-family: ${theme.fonts.primary};
  font-size: ${theme.fontSizes.large};
  color: ${theme.colors.secondary};
  margin-bottom: ${theme.spacing.sm};
`;

const ServiceDescription = styled.p`
  color: #666;
  line-height: 1.7;
  margin-bottom: ${theme.spacing.sm};
`;

const ServiceFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: ${theme.spacing.sm};
`;

const ServiceFeatureItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: ${theme.spacing.xs};

  &:before {
    content: "✓";
    color: ${theme.colors.primary};
    font-weight: bold;
    margin-right: 10px;
  }
`;

const ActionButton = styled(motion.a)`
  display: inline-block;
  background-color: ${theme.colors.primary};
  color: ${theme.colors.light};
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: 600;
  font-size: ${theme.fontSizes.small};
  text-decoration: none;
  transition: ${theme.transitions.default};

  &:hover {
    background-color: ${theme.colors.secondary};
    color: ${theme.colors.light};
  }
`;

const BackgroundPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
`;

const Services: React.FC = () => {
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

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <ServicesSection id="services">
      <BackgroundPattern />
      <ServicesContainer>
        <SectionHeader
          ref={headerRef}
          as={motion.div}
          variants={headerVariants}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
        >
          <SectionTag variants={headerVariants}>Our Services</SectionTag>
          <SectionTitle variants={headerVariants}>
            Transforming <span>Fashion Production</span> With AI
          </SectionTitle>
          <SectionSubtitle variants={headerVariants}>
            Our AI-powered solutions offer innovative ways to showcase your
            clothing and accessories without the need for traditional
            photoshoots.
          </SectionSubtitle>
        </SectionHeader>

        <ServicesGrid
          ref={contentRef}
          as={motion.div}
          variants={gridVariants}
          initial="hidden"
          animate={contentInView ? "visible" : "hidden"}
        >
          <ServiceCard variants={cardVariants}>
            <ServiceImageContainer>
              <ServiceImage
                src="https://images.unsplash.com/photo-1704926273322-86addc31fbf2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="AI Model Try-On"
                className="service-image"
              />
            </ServiceImageContainer>
            <ServiceContent>
              <ServiceTitle>AI Model Try-On</ServiceTitle>
              <ServiceDescription>
                Our core service allows you to virtually try clothing items on
                AI-generated models, eliminating the need for traditional
                photoshoots.
              </ServiceDescription>
              <ServiceFeatures>
                <ServiceFeatureItem>
                  Multiple model types and body shapes
                </ServiceFeatureItem>
                <ServiceFeatureItem>
                  Realistic fabric draping and physics
                </ServiceFeatureItem>
                <ServiceFeatureItem>
                  Customizable poses and backgrounds
                </ServiceFeatureItem>
                <ServiceFeatureItem>
                  High-resolution output for all marketing channels
                </ServiceFeatureItem>
              </ServiceFeatures>
              <ActionButton
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </ActionButton>
            </ServiceContent>
          </ServiceCard>

          <ServiceCard variants={cardVariants}>
            <ServiceImageContainer>
              <ServiceImage
                src="https://images.unsplash.com/photo-1731444654622-3c83043ea285?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="3D Garment Visualization"
                className="service-image"
              />
            </ServiceImageContainer>
            <ServiceContent>
              <ServiceTitle>3D Garment Visualization</ServiceTitle>
              <ServiceDescription>
                Create stunning 3D visualizations of your garments without
                physical samples, perfect for design iterations and
                pre-production approvals.
              </ServiceDescription>
              <ServiceFeatures>
                <ServiceFeatureItem>
                  Accurate fabric simulation
                </ServiceFeatureItem>
                <ServiceFeatureItem>
                  Color and pattern variations
                </ServiceFeatureItem>
                <ServiceFeatureItem>
                  360-degree rotation views
                </ServiceFeatureItem>
                <ServiceFeatureItem>
                  Design iteration without physical sampling
                </ServiceFeatureItem>
              </ServiceFeatures>
              <ActionButton
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </ActionButton>
            </ServiceContent>
          </ServiceCard>

          <ServiceCard variants={cardVariants}>
            <ServiceImageContainer>
              <ServiceImage
                src="https://images.unsplash.com/photo-1505022610485-0249ba5b3675?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fGZhc2hpb24lMjB0ZWNofGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
                alt="Virtual Fashion Show"
                className="service-image"
              />
            </ServiceImageContainer>
            <ServiceContent>
              <ServiceTitle>Virtual Fashion Show</ServiceTitle>
              <ServiceDescription>
                Create immersive virtual fashion shows to showcase your
                collections without the logistics and expenses of physical
                runway events.
              </ServiceDescription>
              <ServiceFeatures>
                <ServiceFeatureItem>
                  Animated AI models walking the runway
                </ServiceFeatureItem>
                <ServiceFeatureItem>
                  Customizable venue and lighting
                </ServiceFeatureItem>
                <ServiceFeatureItem>
                  Music and sound effects integration
                </ServiceFeatureItem>
                <ServiceFeatureItem>
                  Shareable digital experience for global audiences
                </ServiceFeatureItem>
              </ServiceFeatures>
              <ActionButton
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </ActionButton>
            </ServiceContent>
          </ServiceCard>
        </ServicesGrid>
      </ServicesContainer>
    </ServicesSection>
  );
};

export default Services;
