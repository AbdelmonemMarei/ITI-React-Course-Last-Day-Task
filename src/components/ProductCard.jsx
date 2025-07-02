import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function ProductCard({ product }) {
  const { id, title, price, category, image, description } = product
  const navigate = useNavigate()
  return (
    <Card
      className="shadow-sm border-0"
      style={{ borderRadius: '0.75rem', display: 'flex', flexDirection: 'column', height: '100%',cursor:'pointer' }}
    >
      <Card.Img
        variant="top"
        src={image}
        alt={title}
        style={{
          objectFit: 'contain',
          height: '180px',
          borderTopLeftRadius: '0.75rem',
          borderTopRightRadius: '0.75rem',
        }}
      />
      <Card.Body className="d-flex flex-column p-3">
        <Card.Title className="mb-2 text-dark fw-bold" style={{ fontSize: '1.1rem',lineClamp: '2', WebkitLineClamp: '2', display: '-webkit-box', WebkitBoxOrient: 'vertical' ,overflow: 'hidden',minHeight:'40px'}}>
          {title}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-secondary" style={{ fontSize: '0.9rem' }}>
          ${price.toFixed(2)}
        </Card.Subtitle>
        <Card.Text className="mb-2 text-muted" style={{ fontSize: '0.9rem' }}>
          {category}
        </Card.Text>
        <Card.Text
          className="mb-auto text-secondary"
          style={{ fontSize: '0.9rem',lineClamp: '3', WebkitLineClamp: '3', display: '-webkit-box', WebkitBoxOrient: 'vertical' ,overflow: 'hidden'}}
        >
          {description}
        </Card.Text>
        <div className="mt-3">
          <div className="d-grid gap-2">
            <Button
              variant="primary"
              size="sm"
              style={{ backgroundColor: '#FE7743', border: 'none', borderRadius: '0.3rem' }}
              onClick={()=>navigate(`/product/${id}`)}
            >
              
              View Details
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>

  );
}

export default ProductCard
