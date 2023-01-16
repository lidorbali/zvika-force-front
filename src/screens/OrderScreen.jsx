import React, { useEffect, useState } from "react";
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {PayPalButton} from 'react-paypal-button-v2'
import { Link } from "react-router-dom";
import { getOrderDetails,payOrder } from "../actions/orderActions";
import {ORDER_PAY_RESET} from '../constants/orderConstans'

const OrderScreen = () => {
  const params = useParams();
  const orderId = params.id;
  const dispatch = useDispatch();
  const [sdkReady, setSdkReady] = useState(false)
  const refresh = () => window.location.reload(true)

  
  const orderDetails = useSelector(state => state.orderDetails);
  const { order, error, loading } = orderDetails;
  
  const orderPay = useSelector(state => state.orderPay);
  const { loading:loadingPay , success:successPay ,  } = orderPay;


  //object itemsPrice  ,CREATED IN THIS FILE, use only for this page  not from state
  //(if) handleing issuse if we dont have order yet
  if (!loading && !error) {
    order.itemsPrice = order.orderItems
      .reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2);
  }
  // paypay Id:  (remember to delet) AbTcuNBng9CEIberbPhUrl6rBQvlftMhZJFvxlXqGyc7kx2PNiafn9m5UkvXh6cHVz6l9EoYOdfIE4Xp
    const  addPayPalScript = () =>{
      const script = document.createElement('script',
        
      )
      script.type= 'text/javascript'
      script.src= 'https://www.paypal.com/sdk/js?client-id=AREpueneaVibNCv-A8x5CmQva3u7DSOR56Q4dnMolsYJ9nslOV4mpfNXkIt9YzAZ3enboQk2ZCfvMye-&buyer-country=IL&currency=ILS'
      script.async =true
      script.onload=()=>{
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }
    
    
    useEffect(() => {
    if (!order || successPay|| order._id !== Number(orderId)) {
      dispatch(getOrderDetails(orderId));

      dispatch({type:ORDER_PAY_RESET});
    }else if(!order.isPaid){
      if(!window.paypal){
        addPayPalScript()

      }else{
        setSdkReady(true)
      }

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [dispatch,order, orderId,successPay]);
  const successPaymentHandler =(paymentResult)=> {
    dispatch(payOrder(orderId,paymentResult,refresh()))


  }

  return loading ? (
    <Loader/>

  ): error ?(
    <Message variant='danger'>{error}</Message>
  ):
  (
    <div>
        <h1>Order: {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <h2> Shipping</h2>
            <p><strong>Name: </strong>{order.user.name}</p>
            <p><strong>Email: </strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
            <p>
              <strong> Shipping : </strong>
              {order.shippingAddress.address},{order.shippingAddress.city}
              {"  "}
              {order.shippingAddress.postalCode}
              {"  "}
              {order.shippingAddress.country}
            </p>

            {order.isDeliverd ? (
                <Message variant='success'>Delivered on {order.deliverdAt}</Message>
            ) : (
                <Message variant='warning'>Not Delivered</Message>
            ) }

          </ListGroup>

          <ListGroup variant="flush">
            <h2> Payment Method</h2>
            <p>
              <strong> Method : </strong>
              {order.paymentMethod}
            </p>

            {order.isPaid ? (
                <Message variant='success'>Paid on {order.paidAt}</Message>
            ) : (
                <Message variant='warning'>Not paid</Message>
            ) }


          </ListGroup>

          <ListGroup variant="flush">
            <h2> Order Items</h2>
            {order.orderItems.length === 0 ? (
              <Message variant="info">Your order is Empty</Message>
            ) : (
              <ListGroup variant="flush">
                {order.orderItems.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col md={1}>
                        <Image
                          src={item.image}
                          alt={item.name}
                          fluid
                          rounded
                        ></Image>
                      </Col>
                      <Col>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </Col>
                      <Col md={4}>
                        {item.qty} X ₪{item.price} = ₪{" "}
                        {(item.qty * item.price).toFixed(2)}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>
                  <Col>₪{order.itemsPrice}(tax includ)</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>₪{order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>₪{order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>₪{order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {!order.isPaid &&(
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady? (<Loader />
                  ):(
                    <PayPalButton currency='ILS' amount={order.totalPrice} onSuccess={successPaymentHandler}/>
                  )}

                </ListGroup.Item>
              )}
         

           
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OrderScreen;
