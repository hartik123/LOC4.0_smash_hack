import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { Button, Form } from 'react-bootstrap'
import axios from 'axios'

const AddProduct = () => {

    const formRef = useRef(null)
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [warrenty, setWarrenty] = useState();
    const [description, setDescription] = useState()
    const [quantity, setQuantity] = useState()
    const [image, setImage] = useState();

    const changeHandler = (event) => {
        if (event.target.id == 'name') {
            setName(event.target.value)
        }
        else if (event.target.id == 'price') {
            setPrice(event.target.value)
        }
        else if (event.target.id == 'warrenty') {
            setWarrenty(event.target.value)
        }
        else if (event.target.id == 'image') {
            setImage(event.target.files[0])
        }
        else if (event.target.id == 'description') {

            setDescription(event.target.value)
        }
        else {
            setQuantity(event.target.value)
        }
    }

    //submit Details
    const submitHandler = async (e) => {
        e.preventDefault();
        var formdata = new FormData()
        formdata.append("name", name)
        formdata.append("image", image)
        formdata.append("price", price)
        formdata.append("description", description)
        formdata.append("stock", quantity)
        formdata.append("warrenty", warrenty)
        formdata.append("email", window.localStorage.getItem('email'))
        await axios.post("http://localhost:8080/addProduct", formdata)
            .then((res) => {
                if (res.data.ans) {
                    alert("Added successfully"); formRef.current.reset();
                }
                else {
                    alert("Unsuccessful");
                }
            })
            .catch(e => console.log(e))

    }




    return (

        <>
            <center>
                <div style={{ marginTop: "5rem", display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
                    <form ref={formRef}>
                        <Container className='shadow'>
                            <center style={{ color: 'green', fontSize: '25px', alignSelf: 'center' }}>Product Details</center>
                            <input onChange={changeHandler} id='name' required style={{ margin: '5px' }} type='text' className='form-control' placeholder='Product Name'></input>
                            <input onChange={changeHandler} id='price' required style={{ margin: '5px' }} className='form-control' min='0' type='number' placeholder='price' ></input>

                            <input onChange={changeHandler} id='quantity' required style={{ margin: '5px' }} type='number' placeholder='quantity' min='0' className='form-control' />

                            <label style={{ alignSelf: 'start' }}>Product Image:</label>
                            <input onChange={changeHandler} id='image' required style={{ margin: '5px', alignSelf: 'start' }} type='file' />
                            <input onChange={changeHandler} id='warrenty' required style={{ margin: '5px' }} type='number' min='0' className='form-control' placeholder='warrenty in years' />


                            <textarea onChange={changeHandler} id='description' style={{ margin: '10px' }} className='form-control' placeholder='Product specific Description'>
                            </textarea>
                            <Button type='submit' onClick={submitHandler}>Add Product</Button>
                        </Container>
                    </form>

                </div>
            </center>
        </>
    )
}

export default AddProduct

const Container = styled.div`
  width: 500px;
  background-color: white;
  border-radius: 5px;
  margin:10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
  @media only screen and (max-width: 600px) {
    width:80vw
`;

const ColorIndicator = styled.div`
width:auto;
padding:5px;
margin:1px;
border-radius:5px;
background-color:#69a2ff;
`