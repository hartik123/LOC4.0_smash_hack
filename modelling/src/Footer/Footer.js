import React from "react";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';


const Footer = () => {

    return (
        <footer className="page-footer font-small blue pt-4">
            <h3>CONTACT US</h3>
            <br />
            <div>
                <span style={{margin:"1rem"}}><a href="https://www.instagram.com/"><InstagramIcon /></a></span>
                <span style={{margin:"1rem"}}><a href="https://www.facebook.com/"><FacebookIcon /></a></span>
                <span style={{margin:"1rem"}}><a href="https://www.linkedin.com/"><LinkedInIcon /></a></span>
                <span style={{margin:"1rem"}}><a href="https://mail.google.com/"><EmailIcon /></a></span>
            </div>
            <div className="footer-copyright text-center py-3">© 2022 Copyright:
        <a href="https://mdbootstrap.com/"> SCM 4.0</a>
            </div>

        </footer>
    );
}

export default Footer;