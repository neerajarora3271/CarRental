import React from 'react';
import { assets } from '../assets/assets';


const Footer = () => {
    return (
        <footer className="bg-gray-100 px-3 py-3 text-gray-700 border-t border-gray-300">
            <div className="max-w-7xl mx-auto grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4">


                <div>
                    <img className='h-10 mr-30' src={assets.logo} />
                    <p className="mt-3 text-sm">
                        Premium car rental service with a wide selection of luxury and everyday vehicles for all your driving needs.
                    </p>
                    <div className="flex gap-8 mt-4 text-xl cursor-pointer">
                        <img className='' src={assets.instagram_logo} />
                        <img className='' src={assets.twitter_logo} />
                        <img className='' src={assets.facebook_logo} />
                        <img className='' src={assets.gmail_logo} />

                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="font-bold mb-3">QUICK LINKS</h3>
                    <ul className="text-sm space-y-1 cursor-pointer">
                        <li>Home</li>
                        <li>Browse Cars</li>
                        <li>List Your Car</li>
                        <li>About Us</li>
                    </ul>
                </div>

                {/* Resources */}
                <div>
                    <h3 className="font-bold mb-2">RESOURCES</h3>
                    <ul className="text-sm space-y-2 cursor-pointer">
                        <li>Help Center</li>
                        <li>Terms of Service</li>
                        <li>Privacy Policy</li>
                        <li>Insurance</li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="font-bold mb-3">CONTACT</h3>
                    <p className="text-sm">1234 Luxury Drive</p>
                    <p className="text-sm">San Francisco, CA 94107</p>
                    <p className="text-sm mt-2">+1 (555) 123-4567</p>
                    <p className="text-sm">car@example.com</p>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="mt-5 border-t border-gray-300 pt-1 flex flex-col md:flex-row justify-between  text-xs text-gray-500">
                <p>© 2025 CarRental. All rights reserved.</p>
                <div className="flex gap-4 mt-2 md:mt-0">
                    <span>Terms</span>
                    <span>Privacy</span>
                    <span>Cookies</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
