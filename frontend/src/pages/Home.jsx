import React, { useEffect, useState } from "react";
import MenuItem from "../components/Menu/MenuItem";
import "./Home.css";

export default function Home() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMenu() {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
        const res = await fetch(`${API_URL}/api/menu`);
        const data = await res.json();
        setMenuItems(data);
      } catch (error) {
        console.error("Failed to fetch menu", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchMenu();
  }, []);

  return (
    <div className="animate-fade-in">
      <header className="hero-section" style={{ margin: '2rem 0 3rem' }}>
        <div className="hero-layout">
          <div className="hero-text">
            <h1 className="title cursive">
              Taste the <span className="highlight">Authenticity</span>
            </h1>
            <p className="subtitle">
              Order your favorite meals from our diverse kitchen. Freshly prepared, securely managed, and delivered hot to your door.
            </p>
            <button className="btn" style={{ marginTop: '1.5rem' }}>Explore Menu</button>
          </div>
          <div className="hero-images">
             <div className="pill-card glass">
                <img src="https://images.unsplash.com/photo-1557872943-16a5ac26437e?auto=format&fit=crop&q=80&w=200" alt="Special" className="pill-img" />
                <h3 className="item-title" style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '1.4rem' }}>Spicy & Hearty</h3>
                <p>Enjoy a personalized fusion of flavors.</p>
             </div>
             <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400" alt="Hero Burger" className="hero-main-img" />
          </div>
        </div>
      </header>

      {loading ? (
        <div className="loading">Simmering the broth...</div>
      ) : (
        <div className="grid">
          {menuItems.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </div>
      )}

      <section className="story-section glass">
        <h2 className="heading">Our Story</h2>
        <p>Since our founding, we've been crafting authentic meals with traditional methods passed down through generations. Every order is made with love, using the finest ingredients and time-honored recipes.</p>
        <button className="btn">Made with love ★</button>
      </section>


      <section className="reviews-section">
        <h2 className="heading cursive section-chalk-title">Customer Reviews 🌟</h2>
        <div className="reviews-grid">
           <div className="review-card glass chalk-border">
              <div className="stars">★★★★★</div>
              <p className="cursive">"The best food delivery experience I've ever had. Highly recommend the Gourmet Cheeseburger!"</p>
              <h4>- Sarah J.</h4>
              <span className="badge icon-badge" style={{position: 'absolute', top: '-15px', right: '-15px', transform: 'rotate(15deg)'}}>🔥</span>
           </div>
           <div className="review-card glass chalk-border">
              <div className="stars">★★★★★</div>
              <p className="cursive">"Fast delivery and the food was still piping hot. The Sushi Platter was incredible."</p>
              <h4>- Michael T.</h4>
              <span className="badge icon-badge" style={{position: 'absolute', top: '-15px', right: '-15px', transform: 'rotate(-10deg)'}}>🍜</span>
           </div>
        </div>
      </section>

      <footer className="footer-section">
        <div className="grid-overlay"></div>
        <h2 className="heading cursive section-chalk-title">Visit Us Today 📍</h2>
        <p className="cursive subtitle">Experience the authentic taste of our diverse kitchen.</p>
        <div className="location-box glass chalk-border">
           <p><strong>Location:</strong> 123 Crave Street, Foodville, FC 90210</p>
           <p><strong>Hours:</strong> Mon-Sun: 11:00 AM - 10:00 PM</p>
           <button className="btn" style={{marginTop: '1.5rem'}}>Book a Table ✏️</button>
        </div>
        <div className="badges-stack" style={{alignItems: 'center', marginTop: '2rem', flexDirection: 'row', justifyContent: 'center', gap: '1rem'}}>
          <div className="badge pill-badge">Since 1958</div>
          <div className="badge dark-badge cursive">Made with love</div>
        </div>
      </footer>
    </div>
  );
}
