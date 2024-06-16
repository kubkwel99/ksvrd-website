/** @format */

import { Component } from 'react';
import { menuItems } from './MenuItems';
import './Navbar.scss';
import { motion } from 'framer-motion';
import { headerVariants } from '../assets/motion';
import React from 'react';

class Navbar extends Component {
  state = { clicked: false };
  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  render() {
    return (
      <motion.nav
        variants={headerVariants}
        initial='hidden'
        whileInView='show'
        viewport={{ once: false, amount: 0.01 }}
        className='navbarItems flex flex-row items-center text-white bg-black'>
        <h2 className='navbarLogo z-20'>@KSVRD</h2>

        <ul className={this.state.clicked ? 'navbarMenu active' : 'navbarMenu'}>
          {menuItems.map((item, index) => {
            return (
              <motion.li
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                key={index}>
                <a
                  className={item.cName}
                  href={item.url}>
                  <i className={item.icon}></i>
                  {item.title}
                </a>
              </motion.li>
            );
          })}
        </ul>

        <div
          className='menuIcons float-right'
          onClick={this.handleClick}>
          <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
      </motion.nav>
    );
  }
}

export default Navbar;

