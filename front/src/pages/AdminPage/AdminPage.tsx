import { BrowserRouter, Route, Routes,useLocation  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/Auth';
import { useNavigate } from 'react-router';
import {useEffect } from "react";
import PrivateRoute from '../../modules/routes/PrivateRoutes';
import PublicRoute from '../../modules/routes/PublicRoutes';

import { Header } from '../../fixture/Header';
import { Footer } from '../../fixture/Footer';
import { NotFound } from '../../pages/NotFound';

import '../../css/styles.css';
import { useReducer } from 'react';
import ScrollTop from '../../interface/scroll';
import { NavLink } from "react-router-dom";

function Admin() {

  const location = useLocation().pathname;
  const roleList: string[] = useSelector((state: RootState) => state.authToken.roleList);
  const isAdmin = roleList.includes('ADMIN');
  const navigate = useNavigate();

  useEffect(() => {
    let toLogin = false;
    location.split('/').forEach((val) => {
      if (val === 'admin') {
        toLogin = true;
      }
    });

    if (isAdmin && toLogin) {
      alert("관리자 권한이 없습니다.");
      navigate('../login');
    }
  }, [location, navigate]);


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
            <NavLink to="gifts">Gifts</NavLink>
          </li>
          <li>
            <NavLink to="orders">Orders</NavLink>
          </li>
          <li>
            <NavLink to="qna">Qna</NavLink>
          </li>
          <li>
            <NavLink to="faq">Faq</NavLink>
          </li>
        </ul>
        </nav>
        </>
  );
}

export default Admin;