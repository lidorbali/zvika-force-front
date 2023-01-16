import React ,{useState ,} from 'react'
import {  Button,   Form} from "react-bootstrap";
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate,  } from 'react-router-dom';
import FormContainer from '../components/FormContainer'
import CheckOutSteps from '../components/CheckOutSteps'

import {saveShippingAddress} from '../actions/cartActions'

const ShippingScreen = () => {
    

    
    const cart =useSelector(state=> state.cart)
    const {shippingAddress} = cart
    const dispatch =useDispatch()
    const [address, setAddress]= useState(shippingAddress.address)
    const [city, setCity]= useState(shippingAddress.city)
    const [postalCode, setPostalCode]= useState(shippingAddress.postalCode)
    const [country, setCountry]= useState(shippingAddress.country)
    const navigate= useNavigate()
    const submitHandler= (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({address,city,postalCode,country} ))
        navigate('/payment')

    }
 
    return (
    <FormContainer>
        <CheckOutSteps step1 step2 />
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='address'>
                <Form.Label>Address</Form.Label>
                <Form.Control
                required
                placeholder='Enter address'
                 type='text'
                //  if the address is empty put empty string *''*
                  value={address ? address : ''}
                   onChange={e=>setAddress(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId='city'>
                <Form.Label>City</Form.Label>
                <Form.Control
                required
                placeholder='Enter city'
                 type='text'
                //  if the city is empty put empty string *''*
                  value={city ? city : ''}
                   onChange={e=>setCity(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId='postalcode'>
                <Form.Label>Postalcode</Form.Label>
                <Form.Control
                required
                placeholder='Enter postalcode'
                 type='text'
                //  if the postalcode is empty put empty string *''*
                  value={postalCode ? postalCode : ''}
                   onChange={e=>setPostalCode(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId='country'>
                <Form.Label>Country</Form.Label>
                <Form.Control
                required
                placeholder='Enter country'
                 type='text'
                //  if the country is empty put empty string *''*
                  value={country ? country : ''}
                   onChange={e=>setCountry(e.target.value)}/>
            </Form.Group>
            <Button type='submit' variant='primary'>
                Continue
            </Button>

        </Form>
    </FormContainer>
  )
}

export default ShippingScreen
