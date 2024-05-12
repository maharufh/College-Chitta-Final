import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import SearchBoxMobile from './SearchBoxMobile';

const HomeTop = () => {
  
  return (
    <div className="background firstSection">
      <Container fluid>
        <Row className='main-box'>
          {/* For desktop view: Logo and Text side by side */}
          <Row className='main-box-r1'>
          <Col md={12} lg={6}>
            <div className="firstHalf">
              <p className="text-big">The Future of Education is here</p>
              <p className="text-small">This is a career consultant organization. Here we provide Career guidance, counseling for Engineering and Medical. We provide the best college according to their rank and cutoff. The Future of Education is here</p>
              <div className="buttons">
            <Button variant="outline-dark" size='lg' className="custom-btn" href='https://www.youtube.com/@MentorRaju' target='__blank'>Watch Video</Button>
              </div>
            </div>
            <Row className='searchbox-row'>
            <SearchBoxMobile/>
          </Row>
          </Col>
          <Col md={12} lg={6}>
           
            <div className="secondHalf">
              <img src="img.jpg" alt="Laptop Image" className="hometop-logo" />
            </div>
          </Col>
          </Row>
          
        </Row>
        {/* For desktop view: Search at the bottom */}
       
      </Container>
    </div>
  );
};

export default HomeTop;