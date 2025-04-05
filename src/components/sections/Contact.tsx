import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import emailjs from "emailjs-com";
import theme from "../layout/Theme";

const ContactSection = styled.section`
  padding: ${theme.spacing.xl} 0;
  background-color: ${theme.colors.light};
  position: relative;
`;

const ContactContainer = styled.div`
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

const ContactContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfo = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const InfoBlock = styled.div`
  margin-bottom: ${theme.spacing.md};
`;

const InfoTitle = styled.h3`
  font-family: ${theme.fonts.primary};
  font-size: ${theme.fontSizes.large};
  color: ${theme.colors.secondary};
  margin-bottom: ${theme.spacing.sm};
`;

const InfoText = styled.p`
  line-height: 1.7;
  color: #666;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${theme.spacing.sm};
`;

const InfoIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 51, 102, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${theme.spacing.sm};
  color: ${theme.colors.primary};
  font-size: 1.2rem;
`;

const ContactFormWrapper = styled(motion.div)`
  background-color: #fff;
  border-radius: 10px;
  padding: ${theme.spacing.md};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
`;

const FormGroup = styled.div`
  margin-bottom: ${theme.spacing.sm};
`;

const FormLabel = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
  color: ${theme.colors.secondary};
`;

const FormInput = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: ${theme.fontSizes.medium};
  transition: ${theme.transitions.default};

  &:focus {
    border-color: ${theme.colors.primary};
    outline: none;
    box-shadow: 0 0 0 3px rgba(255, 51, 102, 0.1);
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: ${theme.fontSizes.medium};
  transition: ${theme.transitions.default};
  min-height: 120px;
  resize: vertical;

  &:focus {
    border-color: ${theme.colors.primary};
    outline: none;
    box-shadow: 0 0 0 3px rgba(255, 51, 102, 0.1);
  }
`;

const SubmitButton = styled(motion.button)`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.light};
  border: none;
  padding: 12px 25px;
  border-radius: 4px;
  font-weight: 600;
  font-size: ${theme.fontSizes.medium};
  cursor: pointer;
  transition: ${theme.transitions.default};
  width: 100%;

  &:hover {
    background-color: ${theme.colors.secondary};
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ThankYouMessage = styled(motion.div)`
  text-align: center;
  padding: ${theme.spacing.md};
`;

const ThankYouTitle = styled.h3`
  font-family: ${theme.fonts.primary};
  font-size: ${theme.fontSizes.large};
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.sm};
`;

const ThankYouText = styled.p`
  line-height: 1.7;
  color: #666;
  margin-bottom: ${theme.spacing.md};
`;

const ResetButton = styled(motion.button)`
  background-color: ${theme.colors.secondary};
  color: ${theme.colors.light};
  border: none;
  padding: 12px 25px;
  border-radius: 4px;
  font-weight: 600;
  font-size: ${theme.fontSizes.medium};
  cursor: pointer;
  transition: ${theme.transitions.default};

  &:hover {
    background-color: ${theme.colors.primary};
  }
`;

const ErrorMessage = styled.div`
  color: ${theme.colors.error};
  margin-top: 4px;
  font-size: ${theme.fontSizes.small};
`;

// Use environment variables for EmailJS credentials
const EMAILJS_SERVICE_ID =
  process.env.REACT_APP_EMAILJS_SERVICE_ID || "service_lv0j50c";
const EMAILJS_TEMPLATE_ID =
  process.env.REACT_APP_EMAILJS_TEMPLATE_ID || "template_2nmuvm8";
const EMAILJS_USER_ID =
  process.env.REACT_APP_EMAILJS_USER_ID || "MyGwUWl4HZ5kvHO1o";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [contentRef, contentInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) {
      setErrorMessage("Please enter your name");
      return false;
    }

    if (!formData.email.trim()) {
      setErrorMessage("Please enter your email");
      return false;
    }

    if (!emailRegex.test(formData.email)) {
      setErrorMessage("Please enter a valid email address");
      return false;
    }

    if (!formData.message.trim()) {
      setErrorMessage("Please enter a message");
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    console.log("EmailJS configuration:", {
      SERVICE_ID: EMAILJS_SERVICE_ID,
      TEMPLATE_ID: EMAILJS_TEMPLATE_ID,
      USER_ID: EMAILJS_USER_ID,
    });

    console.log("Form data being sent:", {
      from_name: formData.name,
      reply_to: formData.email,
      company: formData.company,
      message: formData.message,
    });

    emailjs
      .send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          reply_to: formData.email,
          company: formData.company,
          message: formData.message,
        },
        EMAILJS_USER_ID
      )
      .then((response) => {
        console.log("Email sent successfully:", response);
        setIsLoading(false);
        setIsSubmitted(true);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        console.error("Error details:", error.text);
        setIsLoading(false);
        setErrorMessage(
          `Failed to send email: ${error.text || "Unknown error"}`
        );
      });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      company: "",
      message: "",
    });
    setIsSubmitted(false);
    setErrorMessage("");
  };

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const formVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  // Update EmailJS information
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Initialize EmailJS with your User ID
      console.log("Initializing EmailJS with user ID:", EMAILJS_USER_ID);
      emailjs.init(EMAILJS_USER_ID);
    }
  }, []);

  return (
    <ContactSection id="contact-form">
      <ContactContainer>
        <SectionHeader
          ref={headerRef}
          as={motion.div}
          variants={headerVariants}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
        >
          <SectionTag variants={headerVariants}>Get in Touch</SectionTag>
          <SectionTitle variants={headerVariants}>
            Ready to <span>Transform</span> Your Fashion Production?
          </SectionTitle>
          <SectionSubtitle variants={headerVariants}>
            Fill out the form below and one of our experts will reach out to
            discuss how our AI solutions can help your brand save costs and
            streamline production.
          </SectionSubtitle>
        </SectionHeader>

        <ContactContent ref={contentRef}>
          <ContactInfo
            variants={contentVariants}
            initial="hidden"
            animate={contentInView ? "visible" : "hidden"}
          >
            <InfoBlock>
              <InfoTitle>Let's Talk</InfoTitle>
              <InfoText>
                We're excited to hear about your fashion brand and how we can
                help you leverage AI technology to transform your production
                process.
              </InfoText>
            </InfoBlock>

            <InfoBlock>
              <InfoItem>
                <InfoIcon>✉️</InfoIcon>
                <InfoText>modeliq004@gmail.com</InfoText>
              </InfoItem>
            </InfoBlock>

            <InfoBlock>
              <InfoTitle>Business Hours</InfoTitle>
              <InfoText>
                Monday - Sunday: 9am - 9pm IST
                <br />
              </InfoText>
            </InfoBlock>
          </ContactInfo>

          <ContactFormWrapper
            variants={formVariants}
            initial="hidden"
            animate={contentInView ? "visible" : "hidden"}
          >
            {!isSubmitted ? (
              <form onSubmit={handleSubmit}>
                <FormGroup>
                  <FormLabel htmlFor="name">Full Name *</FormLabel>
                  <FormInput
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="email">Email Address *</FormLabel>
                  <FormInput
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="company">Company Name</FormLabel>
                  <FormInput
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Fashion Brand Inc."
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="message">Message *</FormLabel>
                  <FormTextarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell us about your brand and what you're looking for..."
                  />
                </FormGroup>

                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

                <SubmitButton
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? "Sending..." : "Send Message"}
                </SubmitButton>
              </form>
            ) : (
              <ThankYouMessage
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <ThankYouTitle>Thank You!</ThankYouTitle>
                <ThankYouText>
                  We've received your message and will get back to you soon. A
                  member of our team will contact you within 24-48 business
                  hours.
                </ThankYouText>
                <ResetButton
                  onClick={resetForm}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send Another Message
                </ResetButton>
              </ThankYouMessage>
            )}
          </ContactFormWrapper>
        </ContactContent>
      </ContactContainer>
    </ContactSection>
  );
};

export default Contact;
