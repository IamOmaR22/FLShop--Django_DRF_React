import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product' 
// import products from '../products'  // Static data

// import axios from 'axios'

import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'

import Loader from '../components/Loader'
import Message from '../components/Message'

function HomeScreen({history}) {
    // const [products, setProducts] = useState([])
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { error, loading, products } = productList

    let keyword = history.location.search
    // console.log(keyword)
    useEffect(() => {
        // console.log('Use Effect Triggered');
        // async function fetchProducts(){
        //     const { data } = await axios.get('/api/products/')
        //     setProducts(data)
        // }

        // fetchProducts()
        dispatch(listProducts(keyword))

    }, [dispatch, keyword])

    return (
        <div>
            <h1>Latest Products</h1>

            {
                loading ? <Loader/>
                : error ? <Message variant='danger'>{ error }</Message>
                :
                <Row>
                    {/* Loop To View Product */}
                    {products.map(product => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            {/* <h3>{product.name}</h3> */}
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
            }

        </div>
    )
}

export default HomeScreen
