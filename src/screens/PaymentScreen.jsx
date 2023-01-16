import React ,{useState } from 'react'
import {  Button,   Form ,Col} from "react-bootstrap";
import {useDispatch, useSelector} from 'react-redux'
import {  useNavigate,  } from 'react-router-dom';
import FormContainer from '../components/FormContainer'
import CheckOutSteps from '../components/CheckOutSteps'
import {savePaymentMethod} from '../actions/cartActions'


const PaymentScreen = () => {
    const navigate =useNavigate()
    const cart =useSelector(state=> state.cart)
    const {shippingAddress} = cart
    const dispatch =useDispatch()
  
    

    const[paymentMethod,setPaymentMethod] =useState('PayPal')
    if(!shippingAddress.address){
        navigate('/shipping')
    }
    const submitHandler =(e) =>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
        
    }
  return (
    <FormContainer>
        <CheckOutSteps step1 step2 step3 />
        <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form as='legend'>Select Method</Form>
                    <Col>
                        <Form.Check type='radio'
                        label ='PayPal or Credit Card'
                        id='paypal'
                        name='paymentMethod'
                        value='PayPal'
                        checked
                        onChange={(e)=>setPaymentMethod(e.target.value)}
                        ></Form.Check>
                    </Col>
                    </Form.Group>
                <Button type ='submit' variant='primary'>
                    Continue
                </Button>

            </Form>

    </FormContainer>
                


        
    
  )
}

export default PaymentScreen