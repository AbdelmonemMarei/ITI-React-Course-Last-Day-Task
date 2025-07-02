import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { Badge } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';
import { useAuth } from '../Auth/AuthProvider';
import { FaTrash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';

const Cart = () => {
    const { currentUser, updateCart, checkout } = useAuth();
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (currentUser && currentUser.cart) {
            setCartItems(currentUser.cart);
        }
        setLoading(false);
    }, [currentUser]);

    useEffect(() => {
        let newTotal = 0;
        cartItems.forEach(item => {
            newTotal += item.price * item.quantity;
        });
        setTotal(newTotal);
    }, [cartItems]);

    const handleRemoveFromCart = (productId) => {
        const updatedCart = cartItems.filter(item => item.id !== productId);
        setCartItems(updatedCart);
        updateCart(updatedCart);
    };

    const handleQuantityChange = (productId, quantity) => {
        if (quantity <= 0) {
            handleRemoveFromCart(productId);
            return;
        }
        const updatedCart = cartItems.map(item =>
            item.id === productId ? { ...item, quantity } : item
        );
        setCartItems(updatedCart);
        updateCart(updatedCart);
    };

    // Function to prevent duplicate items.
    const preventDuplicates = (cart) => {
        const uniqueCart = [];
        const uniqueIds = new Set();

        for (const item of cart) {
            if (!uniqueIds.has(item.id)) {
                uniqueIds.add(item.id);
                uniqueCart.push(item);
            }
        }
        return uniqueCart;
    }

    useEffect(() => {
        if (currentUser && currentUser.cart) {
            const uniqueCart = preventDuplicates(currentUser.cart);
            setCartItems(uniqueCart);
        }
        setLoading(false);
    }, [currentUser]);

    if (loading) {
        return <div className="text-center py-5">Loading cart...</div>;
    }

    if (!currentUser || !currentUser.cart || currentUser.cart.length === 0) {
        return (
            <div className="text-center py-5">
                <p className="text-gray-500">Your cart is empty.</p>
                <Link to="/" className='btn ' style={{ backgroundColor: '#FE7743', color: 'white' }}>Go to homepage</Link>
            </div>
        );
    }

    return (
        <div className="py-5 container">
            <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
            {cartItems.map((item) => (
                <Card key={item.id} className="mb-4">
                    <Card.Body className="d-flex flex-md-row flex-column align-items-center">
                        <div className="col-md-3 mb-3 mb-md-0">
                            <img src={item.image} alt={item.title} className="img-fluid rounded" style={{ maxHeight: '150px', objectFit: 'contain' }} />
                        </div>
                        <div className="col-md-7">
                            <h2 className="card-title">{item.title}</h2>
                            <p className="card-text">{item.description}</p>
                            <p className="card-text">Category: <Badge bg="secondary">{item.category}</Badge></p>
                            <p className="card-text">Price: ${item.price.toFixed(2)}</p>
                            <p className="card-text">Rating: {item.rating.rate} ({item.rating.count} reviews)</p>
                            <div className="d-flex align-items-center mt-2">
                                <span className="mr-2">Quantity:</span>
                                <Form.Control
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value, 10))}
                                    className="w-20"
                                />
                            </div>
                        </div>
                        <div className="col-md-2 d-flex justify-content-end align-items-start mt-3 mt-md-0">
                            <Button
                                variant="outline-danger"
                                onClick={() => handleRemoveFromCart(item.id)}
                                className="h-auto"
                            >
                                <FaTrash className='h-5 w-5' />
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            ))}
            <div className="text-right mt-4">
                <h3 className="text-xl font-semibold">Total: ${total.toFixed(2)}</h3>
                <Button variant="primary" className="mt-3" onClick={checkout}>Checkout</Button>
            </div>
        </div>
    );
};

export default Cart;
