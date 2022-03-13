import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap'
import Cart from './Cart';
import axios from 'axios';

const CartList = () => {

    const [products, setProducts] = useState([]);
    const [trigger, setTrigger] = useState(true);

    // const [products, setProducts] = useState(
    //     [
    //         {
    //         description: "dshdkdjkdjk",
    //         quantity: 3,
    //         price: 400,
    //         },
    //         {
    //         description: "dshdkdjkdjk",
    //         quantity: 3,
    //         price: 400,
    //         },
    //         {
    //         description: "dshdkdjkdjk",
    //         quantity: 3,
    //         price: 400,
    //         },
    //         {
    //         description: "dshdkdjkdjk",
    //         quantity: 3,
    //         price: 400,
    //         }]
    // );
    const thstyle = {
        padding: "1rem",
        border: "1px solid #c7bfab"
    }

    useEffect(async () => {
        axios.post("http://localhost:8080/getCart", {
            email: window.localStorage.getItem("email")
        })
            .then(res => {
                console.log(res.data.cart)
                setProducts(res.data.cart)
            })
            .catch(res => {
                console.log(res.data)
            })
    }, [])

    return (

        <>
            <h3 style={{ marginTop: "5rem" }}>CART PAGE</h3>
            <Table responsive striped hover bordered>
                <thead style={{ fontSize: "1.3rem", backgroundColor: "black", color: "white" }}>
                    <th style={thstyle}>Product</th>
                    <th style={thstyle}>Description</th>
                    <th style={thstyle}>Quantity</th> 
                    <th style={thstyle}>Price</th>
                    <th style={thstyle}>Total Price</th>
                    <th style={thstyle}>Remove</th>
                    <th style={thstyle}>Payment</th>
                </thead>

                <tbody>
                    {
                        products.map((pdt, idx)=>{
                            console.log(pdt)
                            return <Cart key={idx} productDetails={pdt} />
                        })
                    }   
                </tbody>
            </Table>
        </>


    )
}

export default CartList
