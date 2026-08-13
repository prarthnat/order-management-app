import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './OrderTracking.css';

export default function OrderTracking() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let intervalId;

    const fetchOrder = async () => {
      try {
        const res = await fetch(`http://localhost:5001/api/orders/${id}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'Order not found');
        }

        setOrder(data);
        setError(null);
        
        // Stop polling if delivered
        if (data.status === 'Delivered') {
          clearInterval(intervalId);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
    
    // Poll every 3 seconds
    intervalId = setInterval(fetchOrder, 3000);

    return () => clearInterval(intervalId);
  }, [id]);

  if (loading) {
    return <div className="tracking-container">Loading order details...</div>;
  }

  if (error) {
    return (
      <div className="tracking-container">
        <div className="error">{error}</div>
        <button className="btn" onClick={() => navigate('/')}>Return Home</button>
      </div>
    );
  }

  if (!order) return null;

  const statuses = ['Order Received', 'Preparing', 'Out for Delivery', 'Delivered'];
  const currentStepIndex = statuses.indexOf(order.status);

  return (
    <div className="animate-fade-in tracking-container">
      <div className="glass tracking-card">
        <h1 className="title">Order #{order.id}</h1>
        <p className="timestamp">Placed on {new Date(order.createdAt).toLocaleString()}</p>
        
        <div className="progressContainer">
          {statuses.map((status, index) => {
            const isCompleted = index <= currentStepIndex;
            const isCurrent = index === currentStepIndex;
            
            return (
              <div key={status} className="step">
                <div className={`circle ${isCompleted ? 'activeCircle' : ''} ${isCurrent ? 'currentCircle' : ''}`}>
                  {isCompleted ? '✓' : index + 1}
                </div>
                <div className={`label ${isCompleted ? 'activeLabel' : ''}`}>{status}</div>
                {index < statuses.length - 1 && (
                  <div className={`line ${index < currentStepIndex ? 'activeLine' : ''}`} />
                )}
              </div>
            );
          })}
        </div>
        
        <div className="details">
          <div className="items">
            <h3 className="sectionTitle">Items</h3>
            {order.items.map(item => (
              <div key={item.id} className="itemRow">
                <span>{item.quantity}x {item.name}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="totalRow">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="delivery">
            <h3 className="sectionTitle">Delivery Info</h3>
            <p>{order.deliveryDetails.name}</p>
            <p>{order.deliveryDetails.address}</p>
            <p>{order.deliveryDetails.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
