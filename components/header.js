import React from 'react';
import {Container, Row, Col } from 'reactstrap'
import Link from 'next/link'

const Header = props => ( 
  <Container className="header">
    <Row className="align-items-center">
      <Col>
        <div className="page-title-container">
          <a href="/">
            <img src="../static/nytexplore_logo.png" className="img-fluid"></img>
          </a>
        </div>
      </Col>
      <Col md={8}>
        <div className="search-bar">
          {props.children}
        </div>
      </Col>
    </Row>
  </Container>
)

export default Header;