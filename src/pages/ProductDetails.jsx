import axios from 'axios';
import React, { useEffect } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { PulseLoader } from 'react-spinners';
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useAuth } from '../Auth/AuthProvider';


const ProductImage = ({ image, title }) => {
    return (
        <Card className=" border-0">
            <Card.Img
                src={image}
                alt={title}
                style={{
                    objectFit: 'contain',
                    height: '400px',
                }}
            />
        </Card>
    );
};

const ProductDetails = ({ product }) => {
    const {  addToCart } = useAuth();
    const {  title, price, category, description } = product;
    const discountedPrice = price * 0.8;

    return (
        <div className="d-flex flex-column h-100 bg-white">
            <h1 className="fw-bolder text-dark mb-2">{title}</h1>
            <div className="mb-4">
                <span className="h3 fw-bold" style={{ color: '#FE7743' }}>
                    ${discountedPrice.toFixed(2)}
                </span>
            </div>
            <p
                className="text-secondary mb-4"
                style={{
                    fontSize: '1rem',
                    lineHeight: '1.7',
                    color: '#555',
                }}
            >
                {description}
            </p>
            <div className="mb-4">
                <span className="fw-bold me-2">Category:</span>
                <Badge className='bg-secondary' style={{ fontSize: '0.9rem' }}>{category}</Badge>
            </div>
            <div className="mt-auto">
                <Button
                    variant="primary"
                    size="lg"
                    className="w-100"
                    style={{
                        backgroundColor: '#FE7743',
                        borderRadius: '0.5rem',
                        border: 'none',
                    }}
                    onClick={()=>addToCart(product)}
                >
                    Add to Cart
                </Button>
            </div>
        </div>
    );
};

const ProductDetailPage = () => {
    const { id } = useParams();
    const [product, setProduct] = React.useState({});
    const [loader, setloader] = React.useState(true);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios(`https://fakestoreapi.com/products/${id}`);
            if (response.status != 200) throw new Error("something went wrong while fetching data");
            const data = await response.data
            setProduct(data)
          } catch (error) {
            console.error('Error fetching data:', error);
          }
          finally {
            setloader(false)
          }
        };
        fetchData();
      }, [id])
    return (
        <>
        {loader ? <div className='container d-flex justify-content-center align-items-center' style={{height:'90vh' ,backgroundColor:'white'}}><PulseLoader color='#FE7743' /></div> :
        <div className="container my-5 bg-white">
            <div className='row'>
                <div className='col-6'>
                    <ProductImage image={product.image} title={product.title} />
                </div>
                <div className='col-6'>
                    <ProductDetails product={product} />
                </div>
            </div>
        </div>}
        <ToastContainer />
        </>
    );
};

export default ProductDetailPage;

