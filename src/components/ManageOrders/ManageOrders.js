import React, { useEffect } from 'react'
import { Table, Button } from 'react-bootstrap'
import styled from 'styled-components'
import axios from 'axios'
import { useState } from 'react'
import { useRef } from 'react'

const ManageOrders = () => {

    const thstyle = {
        padding: "1rem",
        border: "1px solid #c7bfab"
    }

    const [orders, setOrders] = useState([])
    const [displayOrders, setdisplayOrders] = useState([]);
    const [statusColor, setStatusColor] = useState(['danger', 'warning', 'success'])
    const [status, setStatus] = useState(['Pending', 'Dispatched', 'Delivered']);
    const filterRef1 = useRef(null);
    const filterRef2 = useRef(null);

    useEffect(() => {
        axios.get('http://localhost:8080/getAllOrders')
            .then(res => {
                console.log(res.data.orders)
                setOrders(res.data.orders);
                setdisplayOrders(res.data.orders)
            })
            .catch(err => console.log(err))
    }, [])


    const changeStatus = async (e) => {
        let s = e.target.getAttribute("status");
        let id = e.target.id;
        if (s.toLowerCase() == "pending") {
            await axios.post("http://localhost:8080/updateOrderStatus", { id: id, status: "Dispatched" })
                .then(async (res) => {
                    if (res.data.ans) {
                        await axios.get("http://localhost:8080/getAllOrders")
                            .then(res => {
                                console.log(res.data.orders)
                                setOrders(res.data.orders);
                                setdisplayOrders(res.data.orders)
                            })
                            .catch(err => { console.log(err) })
                        // e.target.style.backgroundColor='#ffc107'
                        // e.target.style.borderColor='#ffc107'
                        // e.target.setAttribute("status","dispatched");
                        // e.target.innerHTML="Dispatched";
                    }
                    else {
                        alert("Unable to update status due to some internal error!!!!!!")
                    }
                })


        }
        else if (s.toLowerCase() == "dispatched") {

            await axios.post("http://localhost:8080/updateOrderStatus", { id: id, status: "Delivered", })
                .then(async (res) => {
                    if (res.data.ans) {
                        await axios.get("http://localhost:8080/getAllOrders")
                            .then(res => {
                                console.log(res.data.orders)
                                setOrders(res.data.orders);
                                setdisplayOrders(res.data.orders)
                            })
                            .catch(err => { console.log(err) })

                    }
                    else {
                        alert("Unable to update status due to some error!!!!!!!")
                    }
                })


        }
        else {
            e.target.setAttribute("status", "delivered");

        }

    }

    const filterHandler = () => {

        let v2 = filterRef2.current.value;
        let a1, a2;

        if (v2 == "all") {
            a2 = orders;
        }
        else {
            a2 = orders.filter(o => o.status == v2)
        }
        setdisplayOrders(a2)

    }
    return (
        <div style={{ padding: '5px', marginTop: "4rem" }}>
            <div style={{ fontSize: "25px" }}>Order Delivery Status</div>
            <hr></hr>
            <Filters>

                <div>
                    <label style={{ margin: '10px', fontSize: '1.3rem' }}><b>Status:</b></label>
                    <select ref={filterRef2} onChange={filterHandler} style={{ margin: '0 15px', marginBottom: "1.5rem", width: '200px' }} className='form-control'>
                        <option value="all">All</option>
                        <option value="Pending">Pending</option>
                        <option value="Dispatched">Dispatched</option>
                        <option value="Delivered">Delivered</option>
                    </select>
                </div>
            </Filters>
            <Table responsive striped hover bordered>
                <thead style={{ fontSize: "1.3rem", backgroundColor: "black", color: "white" }}>
                    <th style={thstyle}>#</th>
                    <th style={thstyle}>OrderId</th>
                    <th style={thstyle}>PaymentId</th>
                    <th style={thstyle}>Quantity</th>
                    <th style={thstyle}>Delivery Address</th>
                    <th style={thstyle}>User email</th>
                    <th style={thstyle}>User phone</th>
                    <th style={thstyle}>status</th>
                </thead>

                <tbody>
                    {
                        displayOrders.map((order, idx) => {
                            let v;
                            if (order.status.toLowerCase() == 'pending') {
                                v = 'danger';
                            }
                            else if (order.status.toLowerCase() == 'dispatched') {
                                v = 'warning';

                            }
                            else {
                                v = 'success'
                            }
                            return (
                                <tr>
                                    <td>{idx + 1}</td>
                                    <td>{order._id}</td>
                                    <td>{order.paymentId}</td>
                                    <td>{order.quantity}</td>
                                    <td>{order.address}</td>
                                    <td>{order.email}</td>
                                    <td>{order.contact}</td>
                                    <td>
                                        <Button variant={v} id={order._id} onClick={changeStatus} status={order.status}>{order.status}</Button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default ManageOrders;

const Filters = styled.div`
width:100%;
display:flex;
flex-wrap:wrap;
justify-content:start;
flex-direction:row;
`