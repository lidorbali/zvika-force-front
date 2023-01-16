import React, { useEffect } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
  
} from "react-bootstrap";
import Message from "../components/Message";
import { addToCart,removeFromCart} from "../actions/cartActions";

const CartScreen = () => {
  const params = useParams();
  const product_id = params.id;
  const navigate = useNavigate();
  const Location = useLocation();
  const qty = Location.search ?  Number(Location.search.split("=")[1]) : 1;
  // console.log('qty:', qty)
  // console.log('product_id:', product_id)

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  // console.log(cartItems)

  useEffect(() => {
    if (product_id) {
      dispatch(addToCart(product_id, qty));
    }
  }, [dispatch, product_id, qty]);

  const removeFromCartHandler = (id) => {
    // console.log("remove:", id);
    dispatch(removeFromCart(id));

  };

  const checkOutHandler = (id) => {
    navigate('/login?redirect=/shipping')


  }

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message variant="info">
            your cart is empty. <Link to="/"></Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item, index) => (
              // product =id of the product
              <ListGroup.Item key={index}>
                <Row>
                  <Col md={2}>
                    <Image  src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>
                    ₪
                    {
                      // limit the decimal number.
                      item.price
                    }
                  </Col>
                  <Col md={3}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {/* qty depents th stock */}
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={1}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>

      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              {/* Calculates the total number of products */}
              <h2>
                SubTotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              ₪
              {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
            </ListGroup.Item>
          </ListGroup>

          <ListGroup.Item>
            <Button type='button"'className='btn-block'disabled={cartItems.length ===0 } onClick={checkOutHandler}>
              Proceed To Checkout
            </Button>
          </ListGroup.Item>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
