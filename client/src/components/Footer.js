import React from 'react';
//import './Footer.scss';
import  "../styles/Footer.css"
import { Link} from "react-router-dom";

const Footer = () => {
    return (
        <div className="f-bcg">
    <div className="footer-container">
      <p className="footer-title">Questions? Contact us.</p>
      <div className="footer-break" />
      <div className="footer-row">
        <div className="footer-column">
          <Link to="#" className="link">FAQ</Link>
          <Link to="#"className="link" >Investor Relations</Link>
          <Link to="#" className="link">Ways to Watch</Link>
          <Link to="#"className="link" >Corporate Information</Link>
          <Link to="#" className="link">Filmotron Originals</Link>
         
        </div>

        <div className="footer-column">
          <Link to="#"className="link" >Help Centre</Link>
          <Link to="#"className="link" >Jobs</Link>
          <Link to="#"className="link"  >Terms of Use</Link>
          <Link to="#" className="link">Contact Us</Link>
        </div>

        <div className="footer-column">
          <Link to="#"className="link" >Account</Link>
          <Link to="#" className="link">Redeem gift cards</Link>
          <Link to="#" className="link">Privacy</Link>
          <Link to="#" className="link">Speed Test</Link>
        </div>

        <div className="footer-column">
          <Link to="#"className="link" >Media Centre</Link>
          <Link to="#" className="link">Buy gift cards</Link>
          <Link to="#" className="link">Cookie Preferences</Link>
          <Link to="#" className="link">Legal Notices</Link>
        </div>
      </div>
      <div className="footer-break "/>
      <div className="footer-text">Filmotron United Kingdom</div>
    </div>
    </div>
    );
};

export default Footer;
