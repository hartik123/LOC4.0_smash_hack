import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import './Navbar1.css';
import { NavDropdown, Container, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'

const Navbar1 = () => {

  const history = useHistory();

  return (
    <div>
      <Navbar expand="lg" className="navcolor" fixed="top">
        <Container fluid>
          <Navbar.Brand href="#"><b>SCM 4.0</b></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="/">Home</Nav.Link>

              <NavDropdown title="Inventory management" id="navbarScrollingDropdown">
                <NavDropdown.Item href="/trackgoods">Track goods available </NavDropdown.Item>
                <NavDropdown.Item href="/manageorders">Manage orders</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Client List
          </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#action2">Contacts</Nav.Link>
            </Nav>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-danger">Search</Button>
            </Form>
            <Button variant="primary" className="buttons" onClick={() => history.push('/login')}>Sign In</Button>{' '}
            <Button variant="success" className="buttons" onClick={() => history.push('/register')}>Register</Button>{' '}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default Navbar1
