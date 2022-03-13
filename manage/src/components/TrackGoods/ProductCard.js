import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import img1 from "../images/img1.jpg";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import useRazorpay from 'react-razorpay'
import axios from 'axios';


const ProductCard = ({ pdt, setChange }) => {
    const [quantity, setQuantity] = useState(0);
    const [phone, setPhone] = useState();
    const [show, setShow] = useState(false);
    const [address, setAddress] = useState();

    const reEnter = async () => {
        await axios.post("http://localhost:8080/addStock/", { id: pdt._id, stock: Number(quantity) })
        setChange(prev => !prev)
    }

    const RazorPay = useRazorpay();


    const submitProductDetails = () => {
        console.log({
            // id: "622c88a8e483a37326225fdd",
            id: pdt._id,
            email: window.localStorage.getItem('email'),
            quantity: quantity
        })
        if (quantity >= 1) {
            axios.post('http://localhost:8080/addtoCart', {
                id: pdt._id,
                email: window.localStorage.getItem('email'),
                quantity: quantity
            })
                .then(res => {
                    console.log(res)
                    if (res.data.ans) {
                        alert("added successfully")
                    }
                    else {
                        alert("Unable to add product")
                    }

                })
                .catch(res => {
                    console.log(res)
                    alert(res.data.ans);
                }
                )
        }
    }


    const makePayment = async () => {

        if ((window.localStorage.getItem('email')) == null) {
            alert("Plase Log In or Signup");

        }
        else {
            let res = await axios.post("http://localhost:8080/generateOrderId", { amount: quantity * pdt.price })
            let options = {
                KEY_ID: "rzp_test_DnK1IvY3O5N98N",
                name: "SCM",
                description: "Product purchase",
                order_id: res.data.order.id,
                handler: async function (response) {
                    alert("Payment id:" + response.razorpay_payment_id)
                    setChange(prev => !prev);
                    await axios.post("http://localhost:8080/createOrder", { paymentId: response.razorpay_payment_id, quantity: quantity,id: pdt._id, productName: pdt.name, phone: phone, email: window.localStorage.getItem('email'), address: address })
                        .then(res => {

                            console.log(res)
                        }).catch(err => console.log(err))

                },
                notes: {
                    address: "Malad",
                },
                theme: {
                    color: "#3399cc",
                },
                modal: {
                    ondismiss: reEnter
                }
            }

            let rz = new RazorPay(options)
            rz.on("payment.failed", function (response) {
                reEnter();
                alert(response.error.code);
                alert(response.error.description);
                alert(response.error.source);
                alert(response.error.step);
                alert(response.error.reason);
                alert(response.error.metadata.order_id);
                alert(response.error.metadata.payment_id);
            });
            await axios.post("http://localhost:8080/stockRemove/", { id: pdt._id, quantity: quantity })
                .then(async (res) => {
                    if (res.data.ans) {


                        rz.open();
                    }
                    else {
                        alert("Can not place order.Please try again")
                    }

                })
            // rz.open();

        }
    }

    return (
        <>
            <Modal variant='primary' show={show} onHide={() => { setShow(false) }}>
                <Modal.Header closeButton>Delivery address</Modal.Header>
                <Modal.Body>
                    <input type='text' onChange={e => setAddress(e.target.value)} className='form-control' placeholder='Delivery address' />
                    <input type='text' onChange={e => setPhone(e.target.value)} className='form-control' placeholder='phone number' />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='success' onClick={() => { setShow(false); makePayment(); }}>Confirm</Button>
                </Modal.Footer>
            </Modal>

            <Card style={{ margin: "1rem", width: "300px" ,backgroundColor:"#d5e3d9"}}>

                <Card.Img
                    variant="top"
                    src={"http://localhost:8080/" + pdt.image}
                    style={{ width: "auto", height: "200px" }}
                />
                <Card.Body>
                    <Card.Title>Name: {pdt.name}</Card.Title>
                    <Card.Text>
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <div>
                                <div>Description: {pdt.description}</div>
                                <div style={{display:"flex", justifyContent:"space-evenly"}}>
                                <span>Stock: <b>{pdt.stock} units</b></span>
                                <span><CurrencyRupeeIcon />{pdt.price}</span>
                                </div>
                            </div>
                            <span style={{ margin: "0 1rem" }}>Quantity: {quantity}</span>
                            <br />
                            <div>
                                <span>
                                    <Button onClick={() => { setQuantity(quantity + 1) }} variant="outline-success" className="addbtn" style={{ marginRight: "1rem" }}>
                                        <AddIcon />
                                    </Button>

                                    <span>
                                        <Button onClick={() => {
                                            if (quantity !== 0) {
                                                setQuantity(quantity - 1);
                                            }
                                        }} variant="outline-danger">
                                            <RemoveIcon />
                                        </Button>
                                    </span>
                                </span>
                                <br />
                                <div style={{ margin: '0.5rem' }}>
                                    <Button variant="btn btn-success" style={{ margin: "0 1rem 0 0" }} onClick={submitProductDetails}>Add to cart</Button>

                                    <Button variant="btn btn-primary" onClick={() => setShow(true)} style={{ margin: "0 1rem 0 0" }}>Buy Now</Button>
                                </div>
                            </div>
                        </div>
                    </Card.Text>
                </Card.Body>

            </Card>
        </>
    );
};

export default ProductCard;
