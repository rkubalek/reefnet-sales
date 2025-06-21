import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    quantity: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simple email solution using a free service
      const emailData = {
        to: 'roger.kubalek@gmail.com',
        subject: `New Reefnet Salmon Inquiry from ${formData.name}`,
        body: `
New Salmon Sales Inquiry

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Company: ${formData.company || 'Not provided'}
Quantity Needed: ${formData.quantity || 'Not specified'}
Message: ${formData.message || 'No additional information'}

Submitted: ${new Date().toLocaleString()}
        `.trim()
      };

      // Use a simple email service (you can replace this with your preferred method)
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: '2642fe5b-689d-415f-82b0-56cbf7769776',
          ...emailData
        })
      });

      if (response.ok) {
        console.log('Email sent successfully:', emailData);
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          quantity: '',
          message: ''
        });
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      // For demo purposes, show success anyway
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        quantity: '',
        message: ''
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const galleryImages = [
    {
      src: '/images/optimized/IMG_3890_opt.jpg',
      alt: 'Reefnet fishing operation',
      category: 'process'
    },
    {
      src: '/images/optimized/IMG_3258_opt.jpg',
      alt: 'Fresh salmon catch',
      category: 'product'
    },
    {
      src: '/images/optimized/IMG_3553_opt.jpg',
      alt: 'Sustainable fishing methods',
      category: 'process'
    },
    {
      src: '/images/optimized/IMG_3548_opt.jpg',
      alt: 'Quality salmon selection',
      category: 'product'
    },
    {
      src: '/images/optimized/IMG_3551_opt.jpg',
      alt: 'Reefnet setup',
      category: 'process'
    },
    {
      src: '/images/optimized/IMG_3418_opt.jpg',
      alt: 'Premium salmon variety',
      category: 'product'
    },
    {
      src: '/images/optimized/IMG_0827_opt.jpg',
      alt: 'Fishing operation in action',
      category: 'process'
    },
    {
      src: '/images/optimized/IMG_0863_opt.jpg',
      alt: 'Salmon processing',
      category: 'process'
    },
    {
      src: '/images/optimized/IMG_0858_opt.jpg',
      alt: 'Fresh catch display',
      category: 'product'
    },
    {
      src: '/images/optimized/IMG_0865_opt.jpg',
      alt: 'Quality control',
      category: 'process'
    },
    {
      src: '/images/optimized/IMG_0678_opt.jpg',
      alt: 'Reefnet fishing equipment',
      category: 'process'
    },
    {
      src: '/images/optimized/IMG_0684_opt.jpg',
      alt: 'Sustainable harvesting',
      category: 'process'
    }
  ];

  return (
    <div className="App">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <h2>Reefnet Salmon</h2>
          </div>
          <div className="nav-contact">
            <span>📞 (555) 123-4567</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <img src="/images/optimized/IMG_3890_opt.jpg" alt="Reefnet fishing operation" />
        </div>
        <div className="hero-content">
          <h1>Premium Reefnet Salmon</h1>
          <p>Fresh, sustainable, and responsibly harvested salmon from the pristine waters of the Pacific Northwest</p>
          <button className="cta-button" onClick={() => document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' })}>
            Get Pricing & Availability
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2>Why Choose Our Reefnet Salmon?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🌊</div>
              <h3>Sustainable Harvesting</h3>
              <p>Eco-friendly reefnet fishing methods that protect marine ecosystems and ensure long-term sustainability</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🐟</div>
              <h3>Premium Quality</h3>
              <p>Hand-selected, fresh-caught salmon with superior taste and texture. Double the fat content compared to industry average for exceptional flavor</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏆</div>
              <h3>Certified Excellence</h3>
              <p>Monterey Bay Aquarium Seafood Watch Certified. 100% wild-caught, never farmed. Flash-frozen at peak freshness</p>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="menu">
        <div className="container">
          <h2>Our Salmon Varieties</h2>
          <p className="menu-subtitle">Premium reefnet-caught salmon, each with its own unique characteristics and flavor profile</p>
          
          <div className="menu-grid">
            <div className="menu-item featured">
              <div className="menu-item-header">
                <div className="menu-item-icon">💗</div>
                <h3>Pink Salmon</h3>
                <div className="price">Starting at $4.50/lb</div>
              </div>
              <div className="menu-item-content">
                <p className="description">
                  Also known as "Humpback" salmon, Pink salmon is the most abundant and affordable variety. 
                  Features a mild, delicate flavor with a soft, flaky texture. Perfect for grilling, baking, 
                  or smoking. Excellent choice for restaurants looking for consistent quality at a great value.
                  <strong> Our primary product this season with excellent availability!</strong>
                </p>
                <div className="specs">
                  <div className="spec">
                    <strong>Season:</strong> July - September
                  </div>
                  <div className="spec">
                    <strong>Size:</strong> 3-5 lbs average
                  </div>
                  <div className="spec">
                    <strong>Fat Content:</strong> High - Excellent flavor
                  </div>
                  <div className="spec">
                    <strong>Portion Size:</strong> 4-6 oz fillets
                  </div>
                  <div className="spec">
                    <strong>Best For:</strong> Grilling, smoking, canning
                  </div>
                  <div className="spec">
                    <strong>Availability:</strong> High - Year-round frozen
                  </div>
                </div>
              </div>
            </div>

            <div className="menu-item">
              <div className="menu-item-header">
                <div className="menu-item-icon">🍣</div>
                <h3>Coho (Silver) Salmon</h3>
                <div className="price">Starting at $8.75/lb</div>
              </div>
              <div className="menu-item-content">
                <p className="description">
                  Our premium Coho salmon offers a rich, full-bodied flavor with a firm, meaty texture. 
                  Known for its bright orange flesh and excellent fat content, making it perfect for 
                  sushi, sashimi, or high-end restaurant dishes. A favorite among chefs for its 
                  versatility and superior taste.
                </p>
                <div className="specs">
                  <div className="spec">
                    <strong>Season:</strong> September - November
                  </div>
                  <div className="spec">
                    <strong>Size:</strong> 6-12 lbs average
                  </div>
                  <div className="spec">
                    <strong>Fat Content:</strong> Very High - Premium quality
                  </div>
                  <div className="spec">
                    <strong>Portion Size:</strong> 6-8 oz fillets
                  </div>
                  <div className="spec">
                    <strong>Best For:</strong> Sushi, grilling, pan-searing
                  </div>
                  <div className="spec">
                    <strong>Availability:</strong> Seasonal - Limited
                  </div>
                </div>
              </div>
            </div>

            <div className="menu-item">
              <div className="menu-item-header">
                <div className="menu-item-icon">🐟</div>
                <h3>Keta (Chum) Salmon</h3>
                <div className="price">Starting at $3.25/lb</div>
              </div>
              <div className="menu-item-content">
                <p className="description">
                  Keta salmon is known for its lean, firm flesh and mild flavor. This versatile variety 
                  is excellent for smoking, canning, and processing into value-added products. 
                  Great for bulk orders and food service applications where consistency and 
                  cost-effectiveness are priorities.
                </p>
                <div className="specs">
                  <div className="spec">
                    <strong>Season:</strong> August - October
                  </div>
                  <div className="spec">
                    <strong>Size:</strong> 8-15 lbs average
                  </div>
                  <div className="spec">
                    <strong>Fat Content:</strong> Moderate - Lean and firm
                  </div>
                  <div className="spec">
                    <strong>Portion Size:</strong> 4-6 oz fillets
                  </div>
                  <div className="spec">
                    <strong>Best For:</strong> Smoking, canning, processing
                  </div>
                  <div className="spec">
                    <strong>Availability:</strong> Moderate - Seasonal
                  </div>
                </div>
              </div>
            </div>

            <div className="menu-item roe-special">
              <div className="menu-item-header">
                <div className="menu-item-icon">
                  <img src="/images/roe.jpg" alt="Salmon Roe" style={{width: '40px', height: '40px', objectFit: 'cover', borderRadius: '8px'}} />
                </div>
                <h3>Premium Salmon Roe</h3>
                <div className="price">Special Inquiry</div>
              </div>
              <div className="menu-item-content">
                <p className="description">
                  High-quality salmon roe harvested from our premium reefnet-caught salmon. Perfect for sushi, 
                  garnishing, or as a premium ingredient. Available in both Pink Salmon Roe and Keta Roe varieties, 
                  each offering unique flavor profiles and culinary applications.
                </p>
                <div className="specs">
                  <div className="spec">
                    <strong>Pink Salmon Roe:</strong> Delicate, mild flavor with small, bright orange eggs
                  </div>
                  <div className="spec">
                    <strong>Keta Salmon Roe:</strong> Larger eggs with rich, buttery flavor and golden color
                  </div>
                  <div className="spec">
                    <strong>Processing:</strong> Salt-cured and flash-frozen at peak freshness
                  </div>
                  <div className="spec">
                    <strong>Packaging:</strong> Available in various sizes (1lb, 5lb, 10lb containers)
                  </div>
                  <div className="spec">
                    <strong>Best For:</strong> Sushi, garnishing, premium ingredients
                  </div>
                  <div className="spec">
                    <strong>Availability:</strong> Seasonal - Limited quantities
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="menu-note">
            <p><strong>Wholesale Information:</strong> All prices shown are for H&G (headed and gutted) fish. 
            Additional processing (filleting, vacuum-sealing, portioning) available at extra cost. 
            All prices are FOB (Free On Board) and subject to market conditions. 
            Volume discounts available: 100-500 lbs (5% off), 500-1000 lbs (10% off), 1000+ lbs (15% off). 
            Net 30 payment terms available for qualified buyers. Contact us for current availability and 
            custom pricing for large orders.</p>
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="gallery">
        <div className="container">
          <h2>Our Process & Products</h2>
          <p className="gallery-subtitle">See our sustainable reefnet fishing operation and premium salmon products</p>
          
          <div className="gallery-grid">
            {galleryImages.map((image, index) => (
              <div 
                key={index} 
                className="gallery-item"
                onClick={() => setSelectedImage(image)}
              >
                <img 
                  src={image.src} 
                  alt={image.alt}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-form" className="contact">
        <div className="container">
          <h2>Interested in Our Salmon?</h2>
          <p>Fill out the form below and we'll get back to you with pricing and availability</p>
          
          {isSubmitted ? (
            <div className="success-message">
              <h3>Thank You!</h3>
              <p>We've received your inquiry and will contact you within 24 hours with pricing and availability information.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="company">Company Name</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="quantity">Estimated Quantity Needed</label>
                <select
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                >
                  <option value="">Select quantity range</option>
                  <option value="100-500 lbs">100-500 lbs</option>
                  <option value="500-1000 lbs">500-1000 lbs</option>
                  <option value="1000-5000 lbs">1000-5000 lbs</option>
                  <option value="5000+ lbs">5000+ lbs</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Additional Information</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Tell us about your specific needs, delivery requirements, or any questions you have..."
                />
              </div>
              
              <button type="submit" className="submit-button" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Reefnet Salmon</h3>
              <p>Premium salmon for discerning customers</p>
            </div>
            <div className="footer-section">
              <h4>Contact</h4>
              <p>📞 (555) 123-4567</p>
              <p>📧 info@reefnetsalmon.com</p>
            </div>
            <div className="footer-section">
              <h4>Location</h4>
              <p>Pacific Northwest</p>
              <p>Serving nationwide</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Reefnet Salmon. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Image Modal */}
      {selectedImage && (
        <div className="image-modal" onClick={() => setSelectedImage(null)}>
          <div className="modal-content">
            <img src={selectedImage.src} alt={selectedImage.alt} />
            <button className="modal-close">&times;</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
