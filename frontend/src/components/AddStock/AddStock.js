import React from 'react'
import styled from 'styled-components'
import { Button, Table } from 'react-bootstrap'
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'

const AddStock = () => {
    const [products, setProducts] = useState([]);
    const thstyle = {
        padding: "1rem",
        border: "1px solid #c7bfab"
    }


    useEffect(async () => {
        await axios.post("http://localhost:8080/allProduct")
            .then(res => {
                setProducts(res.data.products);
            }).catch(err => { console.log(err) })

    }, [])



    const uploadStock = async (e) => {
        e.preventDefault();
        let id = e.target.elements[0].id;

        let quantity = e.target.elements[0].value;

        if (quantity > 0) {
            await axios.post("http://localhost:8080/addStock/", {
                id: id,
                stock: Number(quantity),
            })
                .then(res => {

                    if (res.data.ans) {
                        alert("Added stock successfully")
                        e.target.elements[0].value = ""
                        axios.post("http://localhost:8080/allProduct")
                            .then(res => {
                                setProducts(res.data.products);
                            }).catch(err => { console.log(err) })
                    }
                    else {
                        alert("unable to load")
                    }
                })

        }
        else {
            alert("quantity must be grater than zero");
        }

    }


    return (
        <div style={{ padding: '10px', marginTop: "4rem" }}>
            <Heading>Add Stock</Heading>
            <hr></hr>


            <Table striped responsive hover bordered variant='light'>
                <thead style={{ fontSize: "1.3rem", backgroundColor: "black", color: "white" }}>
                    <th style={thstyle} >No.</th>
                    <th style={thstyle} >Product Name</th>
                    <th style={thstyle} >Description</th>
                    <th style={thstyle} >Stock</th>
                    <th style={thstyle} >Stocks to be added</th>

                </thead>


                <tbody>

                    {
                        products.map((product, index) => {

                            return (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td>{product.stock}</td>
                                    <td style={{ display: 'flex' }}>
                                        <form style={{ display: 'flex', width: '100%' }} onSubmit={uploadStock}>
                                            <input id={product._id} className='form-control' style={{ minWidth: '80px', margin: '5px', width: '100%' }} placeholder='Quantity' type='number' min='1' />
                                            <Button variant='success' fid={product._id} type="submit" >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                                                    <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                                                </svg>
                                                {" "}Add
                        </Button>
                                        </form>
                                        {/* onClick={uploadStock} */}
                                    </td>




                                </tr>)


                        })
                    }

                </tbody>

            </Table>

        </div>
    )
}

export default AddStock

const Heading = styled.div`
color:green;
font-size:30px;
`