import React, { useState, useEffect } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import {
  dataabout,
  meta,
  worktimeline,
  skills,
  services,
} from "../../content_option";

export const About = () => {
  const [age, setAge] = useState(dataabout.age);
  const [isEditing, setIsEditing] = useState(false);
  const [aboutInfo, setAboutInfo] = useState(() => {
    const savedInfo = localStorage.getItem('aboutInfo');
    return savedInfo ? JSON.parse(savedInfo) : {
      title: dataabout.title,
      aboutme: dataabout.aboutme,
      aboutmeeng: dataabout.aboutmeeng,
      education: worktimeline,
      skills: skills
    };
  });

  const [newEducation, setNewEducation] = useState({
    jobtitle: '',
    where: '',
    date: ''
  });
  
  const [newSkill, setNewSkill] = useState({
    name: '',
    value: 0
  });

  const handleSave = () => {
    localStorage.setItem('aboutInfo', JSON.stringify(aboutInfo));
    dataabout.title = aboutInfo.title;
    dataabout.aboutme = aboutInfo.aboutme;
    dataabout.aboutmeeng = aboutInfo.aboutmeeng;
    setIsEditing(false);
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm('คุณต้องการลบข้อมูลใช่หรือไม่?');
    if (confirmDelete) {
      const defaultInfo = {
        title: '',
        aboutme: '',
        aboutmeeng: '',
        education: [],
        skills: []
      };
      setAboutInfo(defaultInfo);
      localStorage.setItem('aboutInfo', JSON.stringify(defaultInfo));
      setAge(0);
    }
  };

  const handleAddEducation = () => {
    if (newEducation.jobtitle && newEducation.where && newEducation.date) {
      const updatedInfo = {
        ...aboutInfo,
        education: [...aboutInfo.education, newEducation]
      };
      setAboutInfo(updatedInfo);
      localStorage.setItem('aboutInfo', JSON.stringify(updatedInfo));
      setNewEducation({ jobtitle: '', where: '', date: '' });
    }
  };

  const handleAddSkill = () => {
    if (newSkill.name && newSkill.value > 0) {
      const updatedInfo = {
        ...aboutInfo,
        skills: [...aboutInfo.skills, newSkill]
      };
      setAboutInfo(updatedInfo);
      localStorage.setItem('aboutInfo', JSON.stringify(updatedInfo));
      setNewSkill({ name: '', value: 0 });
    }
  };

  // Add delete handler for individual items
  const handleDeleteEducation = (index) => {
    const updatedInfo = {
      ...aboutInfo,
      education: aboutInfo.education.filter((_, i) => i !== index)
    };
    setAboutInfo(updatedInfo);
    localStorage.setItem('aboutInfo', JSON.stringify(updatedInfo));
  };

  const handleDeleteSkill = (index) => {
    const updatedInfo = {
      ...aboutInfo,
      skills: aboutInfo.skills.filter((_, i) => i !== index)
    };
    setAboutInfo(updatedInfo);
    localStorage.setItem('aboutInfo', JSON.stringify(updatedInfo));
  };

  useEffect(() => {
    const savedInfo = localStorage.getItem('aboutInfo');
    if (savedInfo) {
      const parsedInfo = JSON.parse(savedInfo);
      setAboutInfo(parsedInfo);
    }
  }, []);

  return (
    <HelmetProvider>
      <Container className="About-header">
        <Helmet>
          <meta charSet="utf-8" />
          <title> About | {meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>
        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4">About me</h1>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
          <Col lg="4" className="text-end d-flex gap-2 justify-content-end">
            {isEditing ? (
              <button className="btn btn-success" onClick={handleSave}>
                Save Changes
              </button>
            ) : (
              <>
                <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
                  Edit Info
                </button>
                <button className="btn btn-danger" onClick={handleDelete}>
                  Delete All
                </button>
              </>
            )}
          </Col>
        </Row>
        <Row className="sec_sp">
          <Col lg="5">
            {isEditing ? (
              <input
                type="text"
                className="form-control mb-3"
                value={aboutInfo.title}
                onChange={(e) => setAboutInfo({...aboutInfo, title: e.target.value})}
              />
            ) : (
              <h3 className="color_sec py-4">{aboutInfo.title}</h3>
            )}
          </Col>
          <Col lg="7" className="d-flex align-items-center">
            <div>
              {isEditing ? (
                <>
                  <textarea
                    className="form-control mb-3"
                    value={aboutInfo.aboutme}
                    onChange={(e) => setAboutInfo({...aboutInfo, aboutme: e.target.value})}
                  />
                  <textarea
                    className="form-control mb-3"
                    value={aboutInfo.aboutmeeng}
                    onChange={(e) => setAboutInfo({...aboutInfo, aboutmeeng: e.target.value})}
                  />
                </>
              ) : (
                <>
                  <p>{aboutInfo.aboutme}</p>
                  <p>{aboutInfo.aboutmeeng}</p>
                </>
              )}
              <div className="d-flex align-items-center gap-2">
                <p className="mb-0">อายุ: {age} ปี</p>
                <div className="age-controls">
                  <button 
                    onClick={() => setAge(prev => Math.max(0, prev - 1))}
                    className="btn btn-sm btn-primary"
                  >-</button>
                  <button 
                    onClick={() => setAge(prev => prev + 1)}
                    className="btn btn-sm btn-primary"
                  >+</button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row className=" sec_sp">
          <Col lg="5">
            <h3 className="color_sec py-4">Education information</h3>
          </Col>
          <Col lg="7">
            <table className="table caption-top">
              <tbody>
                {aboutInfo.education.map((data, i) => (
                  <tr key={i}>
                    <th scope="row">{data.jobtitle}</th>
                    <td>{data.where}</td>
                    <td>{data.date}</td>
                    {isEditing && (
                      <td>
                        <button 
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDeleteEducation(i)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            {isEditing && (
              <div className="add-section mb-4">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Job Title"
                  value={newEducation.jobtitle}
                  onChange={(e) => setNewEducation({
                    ...newEducation,
                    jobtitle: e.target.value
                  })}
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Where"
                  value={newEducation.where}
                  onChange={(e) => setNewEducation({
                    ...newEducation,
                    where: e.target.value
                  })}
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Date"
                  value={newEducation.date}
                  onChange={(e) => setNewEducation({
                    ...newEducation,
                    date: e.target.value
                  })}
                />
                <button 
                  className="btn btn-success"
                  onClick={handleAddEducation}
                >
                  Add Education
                </button>
              </div>
            )}
          </Col>
        </Row>

        <Row className="sec_sp">
          <Col lg="5">
            <h3 className="color_sec py-4">Skills</h3>
          </Col>
          <Col lg="7">
            {aboutInfo.skills.map((data, i) => (
              <div key={i} className="skill-item">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h3 className="progress-title">{data.name}</h3>
                  {isEditing && (
                    <button 
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteSkill(i)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  )}
                </div>
                <div className="progress">
                  <div
                    className="progress-bar"
                    style={{
                      width: `${data.value}%`,
                    }}
                  >
                    <div className="progress-value">{data.value}%</div>
                  </div>
                </div>
              </div>
            ))}
            {isEditing && (
              <div className="add-section mt-4">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Skill Name"
                  value={newSkill.name}
                  onChange={(e) => setNewSkill({
                    ...newSkill,
                    name: e.target.value
                  })}
                />
                <input
                  type="number"
                  className="form-control mb-2"
                  placeholder="Skill Value (0-100)"
                  min="0"
                  max="100"
                  value={newSkill.value}
                  onChange={(e) => setNewSkill({
                    ...newSkill,
                    value: parseInt(e.target.value) || 0
                  })}
                />
                <button 
                  className="btn btn-success"
                  onClick={handleAddSkill}
                >
                  Add Skill
                </button>
              </div>
            )}
          </Col>
        </Row>

      </Container>
    </HelmetProvider>
  );
};
