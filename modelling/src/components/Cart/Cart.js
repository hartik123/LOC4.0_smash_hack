import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Button } from 'react-bootstrap';
import DeleteIcon from '@mui/icons-material/Delete';
import img1 from '../images/img1.jpg';
import axios from 'axios';

const Cart = ({ productDetails }) => {



    const theme = useTheme();
    // const [quantity, setQuantity] = useState(pdt.quantity);


    const removeProduct=(e)=>{
console.log("removing")
            axios.post('http://localhost:8080/removeFromCart',{
                product: productDetails.pdt,
                email: window.localStorage.getItem('email')
            })
            .then(res=>{
                console.log(res)
                productDetails.setTrigger(prev=>!prev)
            })
            .catch(err=>console.log(err))
    }

    return (
        <>

            <tr>
                <td><img src={productDetails.img ? productDetails.img: img1} /></td>
                {/* <td><img src={"http://localhost:8080/" + pdt.image} /></td> */}
                <td>
                    <span>{productDetails.description}</span>
                </td>
                <td>
                    <span style={{ margin: "1rem" }}>{productDetails.quantity}</span>

                </td>

                <td>
                    <span>{productDetails.price}</span>
                </td>

                <td>
                    <span>{productDetails.quantity * productDetails.price}</span>
                </td>

               <td>
                   <Button variant="danger" onClick={removeProduct} ><DeleteIcon /></Button>
                </td>

                <td>
                    <Button style={{ height: "auto" }}>Pay Now</Button>
                </td>
            </tr>
        </>
    )
}

export default Cart;
