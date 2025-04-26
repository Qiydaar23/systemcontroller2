import React from 'react'
import './Footer.css';

const FooterComponent = () => {
    return (
        <div>
            <footer className='footer'>
                <span>Qiydaar Dev | All Right Reserved &copy; {new Date().getFullYear()} </span>
               <a href="https://github.com/Qiydaar23" target="_blank" rel="noopener noreferrer"> <span>GitHub</span></a>
               <a href="https://medium.com/@qiydaarwilliams23" target="_blank" rel="noopener noreferrer"> <span>Blog</span></a>
               <a href="https://www.linkedin.com/in/qiydaarwilliams23/" target="_blank" rel="noopener noreferrer"> <span>LinkedIn</span></a>
            </footer>
        </div>
    )
}

export default FooterComponent