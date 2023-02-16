import { useLocation  } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/Auth';
import { useNavigate } from 'react-router';
import {useEffect } from "react";

import '../../css/styles.css';
import { NavLink } from "react-router-dom";

function Admin() {

  const location = useLocation().pathname;
  const roleList: string[] = useSelector((state: RootState) => state.authToken.roleList);
  //const roleList2: string[]|undefined = localStorage.getItem('roles')?.split(",");
  const isAdmin = roleList.includes('ADMIN'); //|| roleList2?.includes('ADMIN');
  const navigate = useNavigate();

  useEffect(() => {
    let toLogin = false;
    location.split('/').forEach((val) => {
      if (val.includes("admin")) {
        toLogin = true;
      }
    });

    if (!(isAdmin && toLogin)) {
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