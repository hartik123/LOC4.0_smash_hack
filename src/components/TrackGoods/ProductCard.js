import React from 'react'
import Card from 'react-bootstrap/Card'
import img1 from '../images/img1.jpg';

const ProductCard = () => {
    return (
            <Card style={{margin: "1rem"}}>
                <Card.Img variant="top" src={img1} style={{width: "auto", height: "200px"}} />
                <Card.Body>
                    <Card.Title>Card title</Card.Title>
                    <Card.Text>
                        This is a wider card with supporting text below as a natural lead-in to
                        additional content. This content is a little bit longer.
      </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">Last updated 3 mins ago</small>
                </Card.Footer>
            </Card>
    )
}

export default ProductCard
