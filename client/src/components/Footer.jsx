import React from 'react';
import { motion } from 'framer-motion';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="px-6 md:px-16 lg:px-24 xl:px-32 bg-primary/3"
      >
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
          
          {/* Logo & Description */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <img
              alt="logo"
              className="w-32 sm:w-44 -mt-10"
              src={assets.mylogo}
            />
            <p className="max-w-[410px] -m-5 ml-4">
              EchoBlog is a modern blogging platform offering seamless publishing, engaging UI, category-based browsing, fast performance, and responsive design.
            </p>
          </motion.div>

          {/* Links Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-between w-full md:w-[45%] gap-5"
          >
            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">
                Quick Links
              </h3>
              <ul className="text-sm space-y-1">
                <li><a href="#" className="hover:underline transition">Home</a></li>
                <li><a href="#" className="hover:underline transition">Best Sellers</a></li>
                <li><a href="#" className="hover:underline transition">Offers & Deals</a></li>
                <li><a href="#" className="hover:underline transition">Contact Us</a></li>
                <li><a href="#" className="hover:underline transition">FAQs</a></li>
              </ul>
            </div>

            {/* Need Help */}
            <div className='hidden sm:block'>
              <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">
                Need Help?
              </h3>
              <ul className="text-sm space-y-1">
                <li><a href="#" className="hover:underline transition">Delivery Information</a></li>
                <li><a href="#" className="hover:underline transition">Return & Refund Policy</a></li>
                <li><a href="#" className="hover:underline transition">Payment Methods</a></li>
                <li><a href="#" className="hover:underline transition">Track your Order</a></li>
                <li><a href="#" className="hover:underline transition">Contact Us</a></li>
              </ul>
            </div>

            {/* Follow Us */}
            <div>
              <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">
                Follow Us
              </h3>
              <ul className="text-sm space-y-1">
                <li><a href="https://www.instagram.com/yogesh_thakur_1108" className="hover:underline transition" target='_blank' rel="noreferrer">Instagram</a></li>
                <li><a href="https://twitter.com/YogeshT12554000" className="hover:underline transition" target='_blank' rel="noreferrer">Twitter</a></li>
                <li><a href="https://www.facebook.com/yogesh.sengar.589" className="hover:underline transition" target='_blank' rel="noreferrer">Facebook</a></li>
                <li><a href="#" className="hover:underline transition">YouTube</a></li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="py-4 text-center text-sm md:text-base text-gray-500/80"
        >
          Copyright 2025 © Echoblog - Yogesh Thakur | All Rights Reserved.
        </motion.p>
      </motion.div>
    </>
  );
};

export default Footer;
