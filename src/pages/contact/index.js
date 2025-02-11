import React, { useState, useEffect } from "react";
import * as emailjs from "emailjs-com";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { contactConfig, meta } from "../../content_option";

export const Contact = () => {
  const [formData, setFormdata] = useState({
    email: "",
    name: "",
    message: "",
    loading: false,
    show: false,
    alertmessage: "",
    variant: "",
  });

  // Load initial data from localStorage or use default values
  const [contactInfo, setContactInfo] = useState(() => {
    const savedInfo = localStorage.getItem('contactInfo');
    return savedInfo ? JSON.parse(savedInfo) : {
      email: contactConfig.YOUR_EMAIL,
      phone: contactConfig.YOUR_FONE,
      description: contactConfig.description
    };
  });

  // Add new state for edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Update handler with localStorage
  const handleSave = () => {
    // Save to localStorage
    localStorage.setItem('contactInfo', JSON.stringify(contactInfo));
    
    // Update contactConfig
    contactConfig.YOUR_EMAIL = contactInfo.email;
    contactConfig.YOUR_FONE = contactInfo.phone;
    contactConfig.description = contactInfo.description;
    
    setIsEditing(false);
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm('คุณต้องการลบข้อมูลทั้งหมดใช่หรือไม่?');
    if (confirmDelete) {
      const defaultInfo = {
        email: '',
        phone: '',
        description: ''
      };
      setContactInfo(defaultInfo);
      localStorage.setItem('contactInfo', JSON.stringify(defaultInfo));
    }
  };

  // Use useEffect to load data when component mounts
  useEffect(() => {
    const savedInfo = localStorage.getItem('contactInfo');
    if (savedInfo) {
      const parsedInfo = JSON.parse(savedInfo);
      setContactInfo(parsedInfo);
      
      // Update contactConfig with saved values
      contactConfig.YOUR_EMAIL = parsedInfo.email;
      contactConfig.YOUR_FONE = parsedInfo.phone;
      contactConfig.description = parsedInfo.description;
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormdata({ loading: true });

    const templateParams = {
      from_name: formData.email,
      user_name: formData.name,
      to_name: contactConfig.YOUR_EMAIL,
      message: formData.message,
    };

    emailjs
      .send(
        contactConfig.YOUR_SERVICE_ID,
        contactConfig.YOUR_TEMPLATE_ID,
        templateParams,
        contactConfig.YOUR_USER_ID
      )
      .then(
        (result) => {
          setFormdata({
            loading: false,
            alertmessage: "SUCCESS! Thank you for your message",
            variant: "success",
            show: true,
          });
        },
        (error) => {
          setFormdata({
            loading: false,
            alertmessage: `Failed to send! ${error.text}`,
            variant: "danger",
            show: true,
          });
        }
      );
  };

  const handleChange = (e) => {
    setFormdata({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <HelmetProvider>
      <Container>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{meta.title} | Contact</title>
          <meta name="description" content={meta.description} />
        </Helmet>
        <Row className="mb-5 mt-3">
          <Col lg="8">
            <h1 className="display-4 mb-4">Contact Me</h1>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
          <Col lg="4" className="text-end d-flex gap-2 justify-content-end">
            {isEditing ? (
              <button 
                className="btn btn-success" 
                onClick={handleSave}
              >
                Save Changes
              </button>
            ) : (
              <>
                <button 
                  className="btn btn-primary" 
                  onClick={() => setIsEditing(true)}
                >
                  Edit Info
                </button>
                <button 
                  className="btn btn-danger" 
                  onClick={handleDelete}
                >
                  Delete All
                </button>
              </>
            )}
          </Col>
        </Row>
        <Row className="sec_sp">
          <Col lg="12">
            <Alert
              variant={formData.variant}
              className={`rounded-0 co_alert ${
                formData.show ? "d-block" : "d-none"
              }`}
              onClose={() => setFormdata({ show: false })}
              dismissible
            >
              <p className="my-0">{formData.alertmessage}</p>
            </Alert>
          </Col>
          <Col lg="5" className="mb-5">
            <h3 className="color_sec py-4">Get in touch</h3>
            {isEditing ? (
              <div className="edit-form">
                <div className="mb-3">
                  <label className="form-label">Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({
                      ...contactInfo,
                      email: e.target.value
                    })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo({
                      ...contactInfo,
                      phone: e.target.value
                    })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description:</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={contactInfo.description}
                    onChange={(e) => setContactInfo({
                      ...contactInfo,
                      description: e.target.value
                    })}
                  />
                </div>
              </div>
            ) : (
              <address>
                <strong>Email:</strong>{" "}
                <a href={`mailto:${contactInfo.email}`}>
                  {contactInfo.email}
                </a>
                <br />
                <br />
                {contactInfo.phone && (
                  <p>
                    <strong>Phone:</strong> {contactInfo.phone}
                  </p>
                )}
                <p>{contactInfo.description}</p>
              </address>
            )}
          </Col>
          <Col lg="7" className="d-flex align-items-center">
            <form onSubmit={handleSubmit} className="contact__form w-100">
              <Row>
                <Col lg="6" className="form-group">
                  <input
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Name"
                    value={formData.name || ""}
                    type="text"
                    required
                    onChange={handleChange}
                  />
                </Col>
                <Col lg="6" className="form-group">
                  <input
                    className="form-control rounded-0"
                    id="email"
                    name="email"
                    placeholder="Email"
                    type="email"
                    value={formData.email || ""}
                    required
                    onChange={handleChange}
                  />
                </Col>
              </Row>
              <textarea
                className="form-control rounded-0"
                id="message"
                name="message"
                placeholder="Message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              <br />
              <Row>
                <Col lg="12" className="form-group">
                  <button className="btn ac_btn" type="submit">
                    {formData.loading ? "Sending..." : "Send"}
                  </button>
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
      </Container>
      <div className={formData.loading ? "loading-bar" : "d-none"}></div>
    </HelmetProvider>
  );
};

export default Contact;
