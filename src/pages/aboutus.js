import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const AboutUsPage = () => {
  return (
    <Container>
      <Row className="mt-5">
        <Col>
          <h1>About Us</h1>
          <p>
            Welcome to To-Let, the ultimate destination for seamless and rewarding rental experiences. We specialize in connecting renters with comfortable living spaces and providing property owners with a streamlined platform to showcase their rentals. Whether you’re in search of the perfect rental flat or room, or you’re a property owner looking to maximize your investment, To-Let has you covered.
          </p>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <h2>Our Mission</h2>
          <p>
            At To-Let, we understand that finding the right place to call home is essential. Our platform offers a diverse array of rental flats and rooms, each curated to meet different preferences and lifestyles. With our user-friendly interface, you can easily browse through listings, view detailed property information, and connect directly with property owners. Your comfort is our priority, and we take pride in ensuring that each rental option is well-maintained and equipped with modern amenities.
          </p>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <h2>For Property Owners</h2>
          <p>
            Are you a property owner looking to attract reliable and respectful tenants? To-Let provides a unique subscription-based service that empowers you to showcase your rentals to a discerning audience. Our platform allows you to create and manage your account with ease, displaying your property’s features, rental terms, and high-quality images. With our transparent process, you can connect directly with potential renters who appreciate the value your property offers.
          </p>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <h2>Why Choose Us</h2>
          <ul>
            <li>Tailored Listings: We offer renters a diverse range of rental options and provide property owners with the tools to create enticing listings that stand out.</li>
            <li>Quality Assurance: Every property listed on [Your Website Name] undergoes a quality check to ensure renters enjoy a comfortable and satisfying living experience.</li>
            <li>User-Friendly Interface: Our platform is designed to be intuitive and easy to navigate, ensuring a seamless experience for both renters and property owners.</li>
            <li>Direct Connections: Property owners have the opportunity to interact directly with potential renters, building trust and establishing positive rental relationships.</li>
            <li>Community Building: Beyond rentals, we foster a sense of community by organizing events and activities for both renters and property owners to connect and engage.</li>
          </ul>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <h2>Join Us Today</h2>
          <p>
            At To-Let, we’re more than just a rental platform; we’re a community dedicated to enhancing the rental experience for everyone involved. Join us today to discover the possibilities of stress-free renting and successful property ownership.
          </p>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <h2>Contact Us</h2>
          <p>
            For inquiries, questions, or assistance, please don’t hesitate to get in touch with our friendly team. Your journey to a rewarding rental experience starts here.
          </p>
          <p>Email: <a href="mailto:support@to-let.live">support@to-let.live</a></p>
        </Col>
      </Row>
    </Container>
  );
}

export default AboutUsPage;
