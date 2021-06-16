import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product' 
// import products from '../products'  // Static data

import axios from 'axios'

function HomeScreen() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        // console.log('Use Effect Triggered');
        async function fetchProducts(){
            const { data } = await axios.get('/api/products/')
            setProducts(data)
        }

        fetchProducts()

    }, [])

    return (
        <div>
            <h1>Latest Products</h1>
            <Row>
                {/* Loop To View Product */}
                {products.map(product => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        {/* <h3>{product.name}</h3> */}
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default HomeScreen
