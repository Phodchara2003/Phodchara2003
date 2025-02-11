import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useNavigate, Link } from 'react-router-dom';
import "./style.css";

export const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (response.ok) {
        alert('Registration successful!');
        navigate('/login');
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Registration failed');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <HelmetProvider>
      <Container>
        <Row className="justify-content-center">
          <Col lg="12">
            <div className="register-container">
              <Form onSubmit={handleSubmit} className="register-form">
                <h2 className="text-center text-white mb-4">สร้างบัญชีผู้ใช้</h2>
                
                {/* Social Login Options */}
                <div className="social-login">
                  <a 
                    href="https://www.facebook.com/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-decoration-none"
                  >
                    <Button className="social-btn facebook-btn mb-3 w-100">
                      <i className="fab fa-facebook-f"></i> Continue with Facebook
                    </Button>
                  </a>
                  <div className="divider">
                    <span>หรือ</span>
                  </div>
                  <a 
                    href="https://github.com/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-decoration-none"
                  >
                    <Button className="social-btn github-btn mb-3 w-100">
                      <i className="fab fa-github"></i> Continue with GitHub
                    </Button>
                  </a>
                </div>

                {/* Regular Form Fields */}
                <Form.Group className="mb-3">
                  <Form.Label className="text-white">ชื่อผู้ใช้</Form.Label>
                  <Form.Control 
                    className="register-input"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="text-white">อีเมล</Form.Label>
                  <Form.Control 
                    className="register-input"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="text-white">รหัสผ่าน</Form.Label>
                  <Form.Control 
                    className="register-input"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Button type="submit" className="register-btn w-100">
                  สมัครสมาชิก
                </Button>

                <div className="text-center mt-3">
                  <p className="text-white">มีบัญชีอยู่แล้ว? <Link to="/login" className="login-link">เข้าสู่ระบบ</Link></p>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </HelmetProvider>
  );
};

export default Register;