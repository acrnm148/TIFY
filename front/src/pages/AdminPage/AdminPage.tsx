import { BrowserRouter, Route, Routes } from 'react-router-dom';

import PrivateRoute from '../../modules/routes/PrivateRoutes';
import PublicRoute from '../../modules/routes/PublicRoutes';

import { Header } from '../../fixture/Header';
import { Footer } from '../../fixture/Footer';
import { NotFound } from '../../pages/NotFound';

import '../../css/styles.css';
import { useReducer } from 'react';
import ScrollTop from '../../interface/scroll';
import { NavLink } from "react-router-dom";

import Users from "../../components/AdminPage/Users"
import Wishes from "../../components/AdminPage/Wishes"

function Admin() {
  return (
        <>
        <nav>
        <ul>
          <li>
            <NavLink to="users">Users</NavLink>
          </li>
          <li>
            <NavLink to="wishes">Wishes</NavLink>
          </li>
          <li>
            <NavLink to="orders">Orders</NavLink>
          </li>
        </ul>
        </nav>
        <h1>dsadasdssad</h1>
        </>
  );
}

export default Admin;