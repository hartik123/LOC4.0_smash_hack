import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { CardGroup, Button } from 'react-bootstrap';
import ProductCard from './ProductCard';
import axios from 'axios';


const TrackGoods = () => {
    const [product, setProduct] = useState([]);
    const history = useHistory();
    const [change, setChange] = useState(true);

    useEffect(() => {
        axios.post("http://localhost:8080/allProduct", {
            email: window.localStorage.getItem('email')
        })
            .then(res => {
                console.log(res.data.products)
                setProduct(res.data.products)
            })
            .catch(err => console.log(err))
    }, [change])


    return (

        <>
            <h1 style={{ marginTop: "4rem" }}>Goods Available</h1>
            <Button onClick={() => history.push('/addpdt')}>Add Product</Button>
            {'  '}
            <Button variant="btn btn-secondary" onClick={() => history.push('/addstock')}>Add Stock</Button>


            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                {
                    product.map((pdt, index) => {

                        return <ProductCard pdt={pdt} setChange={setChange}/>
                    })
                }
            </div>
        </>
    )
}



export default TrackGoods;
