import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import './Navbar1.css';
import { NavDropdown, Container, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

const Navbar1 = () => {

  const history = useHistory();

  return (
    <div>
      <Navbar expand="lg" className="navcolor" fixed="top">
        <Container fluid>
          <Navbar.Brand href="/"><b>SCM 4.0</b></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/trackgoods">Goods Available</Nav.Link>
              <Nav.Link href="/manageorders">Manage orders</Nav.Link>
              <Nav.Link href="/clientlist">Client list</Nav.Link>
            </Nav>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search for the product"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="info">Search</Button>
            </Form>
            {
              window.localStorage.getItem('email') === null ?
                (
                  <>
                    <Button variant="primary" className="buttons" onClick={() => history.push('/login')} style={{ margin: "1rem" }}>Sign In</Button>
                    <Button variant="success" className="buttons" onClick={() => history.push('/register')} style={{ margin: "1rem" }}>Register</Button>
                  </>

                )
                :
                <Button variant="danger" className="buttons" onClick={() => {
                  window.localStorage.clear();
                  window.location.href = '/'
                }}>Logout</Button>


            }

          </Navbar.Collapse>
          <Button onClick={() => history.push('/cartlist')} variant="warning" style={{ marginLeft: "1rem" }}>
            <ShoppingBasketIcon />
          </Button>
        </Container>
      </Navbar>
    </div>
  )
}

export default Navbar1
