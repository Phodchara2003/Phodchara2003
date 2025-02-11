import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link, useNavigate } from 'react-router-dom';
import { meta } from "../../content_option";
import "./style.css";

export const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();
      if (response.ok) {
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(data.user));
        // Navigate to home page
        navigate('/');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Network error occurred');
    }
  };

  return (
    <HelmetProvider>
      <Container>
        <Row className="justify-content-center">
          <Col lg="12">
            <div className="login-container">
              <Form onSubmit={handleSubmit} className="login-form">
                <h2 className="text-center text-white mb-4">เข้าสู่ระบบ</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <Form.Group className="mb-4">
                  <Form.Label className="text-white">ชื่อผู้ใช้</Form.Label>
                  <Form.Control 
                    className="login-input"
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label className="text-white">รหัสผ่าน</Form.Label>
                  <Form.Control 
                    className="login-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button type="submit" className="login-btn w-100 mb-3">
                  เข้าสู่ระบบ
                </Button>
                <div className="text-center">
                  <p className="text-white mb-3">Don't have an account?</p>
                  <Link to="/register" className="w-100">
                    <Button className="register-btn w-100">
                      Register Now
                    </Button>
                  </Link>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </HelmetProvider>
  );
};

export default Login;