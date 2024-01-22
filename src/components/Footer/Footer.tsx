import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className='footer w-full flex justify-between items-center p-4 '>
      <p className='m-0'>Geek Ops - 2023</p>
      <ul className='flex gap-x-4'>
        <li className='hover:cursor-pointer'>
          <NavLink to='/contact'>Contact</NavLink>
        </li>
        <li className='hover:cursor-pointer'>
          <NavLink to='/legal'>Mentions légales</NavLink>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
