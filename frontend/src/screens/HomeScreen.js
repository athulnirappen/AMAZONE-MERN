import React, { useEffect, useReducer } from 'react'

// import data from '../data'
import axios from "axios";
import logger from "use-reducer-logger";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Product from '../components/Product';


const reducer = (state,action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state,products:action.payload, loading: false };
    case "FETCH_FAILURE":
      return { ...state, loading: false, error: action.payload };
    
    default:
      return state;
  }
}




const HomeScreen = () => {

  const [{ loading, products, error }, dispatch] = useReducer(logger(reducer), {
    products:[],
    loading: true,
    error:"",
  })


  
  // const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS',payload:result.data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAILURE',payload:error.message });
      }
      
      // setProducts(result.data);
      
    };
    fetchdata();
  }, []);
  return (
    <div>
      <h1>Featured Product</h1>
      <div className="products">
        {loading ? (
          <div>Loading....</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                <Product product={product} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default HomeScreen
