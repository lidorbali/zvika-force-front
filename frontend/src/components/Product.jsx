import React from 'react'
import  {Card} from "react-bootstrap"
import Rating from './Rating'
import {Link} from 'react-router-dom'




const Product = ({product}) => {
  return (
    <Card  className='my-3 p-3 rounded'>
     <Link to={`/product/${product._id}`}>
        <Card.Img style={{ width: 270, height: 340 }}  src={product.image}/>
     </Link>

        <Card.Body>
            <Link to={`/product/${product._id}`}>
                <Card.Title md={1} as="div">
                    <h6>{product.name}</h6>
                </Card.Title>
            </Link>
                
            <Card.Text  as='div'>
                <div className='my-3'>
                    
                    <Rating value ={product.rating} text={`${product.numReviews} reviews`} color={`#f8e825`} />

                </div>
            </Card.Text>
             
             <Card.Text as='h3'>
             ₪{product.price}

             </Card.Text>

        </Card.Body>
    </Card>
  )
}

export default Product
