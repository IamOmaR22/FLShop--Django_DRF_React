import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
// import products from '../products';   // Static data

// import axios from 'axios'  // No need this. Because i have imported axios in Actions ==> productActions.js

import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../actions/productActions'

import Loader from '../components/Loader'
import Message from '../components/Message'

// history from props. We are destructuring our props now. history for redirect after onClick  --  addToCartHandler.
function ProductScreen({ match, history }) {
    // const product = products.find((p) => p._id == match.params.id)   // Static data
    // const [product, setProduct] = useState([])
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)  // productDetails from Redux Store ==> store.js
    const { loading, error, product } = productDetails  // Destructure this to get the data.

    const [qty, setQty] = useState(1)  // Set our quantity. Quantity is going to be a state within our component. No need Redux for that because it's small part of our state. Set 1, because we always want start with 1 and we can change it.

    useEffect(() => {
        // async function fetchProduct(){
        //     const { data } = await axios.get(`/api/products/${match.params.id}`)
        //     setProduct(data)
        // }

        // fetchProduct()

        dispatch(listProductDetails(match.params.id))

    }, [dispatch, match])

    const addToCartHandler = () => {
        // console.log('Add To Cart :', match.params.id)
        history.push(`/cart/${match.params.id}?qty=${qty}`)  // Redirect to our cart page. history from props.
    }

    return (
        <div>
            <Link to='/' className='btn btn-light my-3'>Go Back</Link>

            {
                loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                :
                (
                    <Row>
                        <Col md={6}>
                            <Image src={product.image} alt={product.name} fluid />
                        </Col>

                        <Col md={3}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h3>{product.name}</h3>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
                                </ListGroup.Item>
                                
                                <ListGroup.Item>
                                    Price: ${product.price}
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    Description: {product.description}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>

                        <Col md={3}>
                            <Card>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price:</Col>
                                            <Col>
                                                <strong>${product.price}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col>
                                                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                {/* Check the condition. If product in stock then show it. If not in stock then don't show it. */}
                                    { product.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Qty</Col>
                                                <Col xs='auto' className='my-1'>
                                                    <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>  {/* By default qty is 1. setQty() is an update method to update qty. get value from what we selected. */}
                                                        {
                                                            [...Array(product.countInStock).keys()].map((x) => (
                                                                <option key={x + 1} value={x + 1}>
                                                                    { x + 1 }
                                                                </option>
                                                            ))
                                                        }
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}

                                    <ListGroup.Item>
                                        <Button onClick={addToCartHandler} className='btn-block' disabled={product.countInStock === 0} type='button'>Add to Cart</Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                )
            }

            
        </div>
    )
}

export default ProductScreen
