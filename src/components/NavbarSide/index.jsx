import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { ShoppingCartContext } from "../../Context";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../auth";
import { motion } from "framer-motion";
import "./styles.css";

function NavbarSide() {
  // const activeStyle =
  //   "bg-purple-300 rounded-2xl text-center border-b-4 border-black  text-black";
  const activeStyle = "text-center font-bold hover:bg-opacity-50"
  const context = useContext(ShoppingCartContext);
  const auth = useAuth();

  const NavItem = ({ to, children, activeStyle, onClick }) => {
    return (
      <NavLink
        to={to}
        className={({ isActive }) =>
          `w-full h-10 inline-flex py-1 px-4  ${
            isActive ? activeStyle : undefined
          }`
        }
        onClick={onClick}
      >
        {children}
      </NavLink>
    );
  };

  return (
    <div className="top-20 mt-4 fixed hidden md:flex ">
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className=" bg-white m-0 flex flex-col justify-between flex-wrap h-screen w-52 text-lg border-r border-solid border-gray-400"
      >
        <ul className="flex flex-col flex-wrap h-2/4 p-5">
          <li className="">
            <NavItem
              to="/"
              activeStyle={activeStyle}
              onClick={() => context.setSearchByCategory("")}
            >
              Inicio
            </NavItem>
          </li>
          <li>
            <NavItem
              to="/clothes"
              activeStyle={activeStyle}
              onClick={() => context.setSearchByCategory("clothes")}
            >
              Ropa
            </NavItem>
          </li>
          <li>
            <NavItem
              to="/electronics"
              activeStyle={activeStyle}
              onClick={() => context.setSearchByCategory("electronics")}
            >
              Tecnologia
            </NavItem>
          </li>
          <li>
            <NavItem
              to="/furnitures"
              activeStyle={activeStyle}
              onClick={() => context.setSearchByCategory("furniture")}
            >
              Muebles
            </NavItem>
          </li>
          <li>
            <NavItem
              to="/toys"
              activeStyle={activeStyle}
              onClick={() => context.setSearchByCategory("toys")}
            >
              Juguetes
            </NavItem>
          </li>
          <li>
            <NavItem
              to="/others"
              activeStyle={activeStyle}
              onClick={() => context.setSearchByCategory("others")}
            >
              Otros
            </NavItem>
          </li>
        </ul>

        <ul className="flex flex-col flex-wrap h-2/4 p-5">
          {auth.isLoggedIn ? (
            <div className="private">
              <li>
                <NavItem
                  to="/my-account"
                  activeStyle={activeStyle}
                  onClick={null}
                >
                  Cuenta
                </NavItem>
              </li>
              <li>
                <NavItem
                  to="/my-orders"
                  activeStyle={activeStyle}
                  onClick={null}
                >
                  Pedidos
                </NavItem>
              </li>
            </div>
          ) : (
            <div className="public">
              <li>
                <NavItem to="/sign-in" activeStyle={activeStyle} onClick={null}>
                  Iniciar Sesion
                </NavItem>
              </li>
            </div>
          )}
          <li className="flex text-orange-300">
            <ShoppingBagIcon className="w-6 h-6 " />
            {context.cartProducts.length}
          </li>
        </ul>
      </motion.nav>
    </div>
  );
}

export default NavbarSide;
