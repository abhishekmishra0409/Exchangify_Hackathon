import React from 'react'
import "./Footer.css";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";



const Footer = () => {
    return (
        <div>
            <footer className="footer-distributed footer-distributed ">

                <div className="footer-left">

                    <div>
                        <img src="/assets/Logo.svg" alt="" />
                    </div>

                    <p className="footer-links">
                        <a href="#" className="link-1">Home</a>

                        <a href="#">Homw</a>

                        <a href="#">Collaborations</a>

                        <a href="#">Articles</a>

                        <a href="#">Services</a>

                        <a href="#">Mentorship</a>
                    </p>

                    <p className="footer-company-name">Xchangify © 2024</p>
                </div>

                <div className="footer-center">

                    <div>
                        <i className="fa fa-map-marker"></i>
                        <p><span>Swami Vivekanand College of Engineering </span> Indore, Madhya Pradesh</p>
                    </div>

                    <div>
                        <i className="fa fa-phone"></i>
                        <p>+91 123 456 789</p>
                    </div>

                    <div>
                        <i className="fa fa-envelope"></i>
                        <p><a href="mailto:jayeshexternal@gmail.com">jayeshexternal@gmail.com</a></p>
                    </div>

                </div>

                <div className="footer-right">

                    <p className="footer-company-about">
                        <span>About the company</span>
                        We are a platform which provides a space for individuals to exchange their skills and services with others. We believe in the power of collaboration and the impact it can have on personal and professional growth.
                    </p>

                    <div className="footer-icons">

                        <a href="#"><FaFacebook /></a>
                        <a href="#"><FaTwitter /></a>
                        <a href="#"><FaLinkedin /></a>
                        <a href="#"><FaGithub /></a>

                    </div>

                </div>

            </footer>
        </div>
    )
}

export default Footer
