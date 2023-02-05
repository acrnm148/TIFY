import React, { useState, useEffect } from "react";
import alert from '../../assets/iconAlert.svg';
import bell from '../../assets/bell.png';
import anony from '../../assets/anony.png';

import { ref, set, push, onValue, child, get, update, remove } from "firebase/database";
import { List } from "@mui/material";
import { useSelector } from 'react-redux';
import { RootState } from '../../store/Auth';

import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Search } from 'react-bootstrap-icons';
import UserInfoEdit from "./UserInfoEdit";
import { NavLink } from 'react-router-dom';

interface product {
  id:number;
  name:string;
  repImg:string;
  quantity:number;
  price:number;
  category:string;
  likeCount:number;
}

const Products = () => {
    
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<product[]|null>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const maxResults = 10;
    const baseUrl = "https://i8e208.p.ssafy.io/api/gifthub";

    // const handleSearch = async (event) => {
    //   if (event.key === 'Enter' || event.type === 'click') {
    //     const response = await axios.get('localhost:8081/api/users/search', {
    //       params: {
    //         email: searchTerm,
    //       },
    //     });
    //     setSearchResults(response.data);
    //   }
    // };
    
    const getData = async (page: number) => {
      try {
        const response = await axios.get(`${baseUrl}/products`, {
          params: {
            page,
            max_result:100
          },
        });
        setSearchResults(response.data.content);
        setTotalPages(response.data.totalPages);
        console.log(response.data.content);
        return response.data.content;
      } catch (error) {
        console.error(error);
      }
    }
    if (searchResults === null) {
        getData(0);
    }

    const PageButtons = ({ totalPages }: { totalPages: number }) => {
        let buttons = [];
        for (let i = 1; i <= totalPages; i++) {
          buttons.push(
            <li className="page-item" key={i}>
                <button className="page-link" onClick={() => {setPage(i-1); getData(i-1);}}>{i}</button>
            </li>
          )
        }
        return (
          <>
            {buttons}
          </>
        );
      };
  
    // const handleEdit = async ({ userPk }: { userPk: number }) => {
    //     console.log(userPk);
    //     console.log("-----------------");
    //     const response = await axios.get(`${baseUrl}/user/${userPk}`);
    //     setSelectUser(response.data);
    //     return (
    //         <UserInfoEdit userInfo={selectUser} />
    //     )
    // };
  
    const handleDelete = async (id) => {
        console.log(id);
        try {
            const response = await axios.delete(`${baseUrl}/product/${id}`);
            getData(page-1);
            console.log(`deleted user ${id}`)
            return response;
        } catch (error) {
            console.error(error);
        }
    };
  
    // const handleCreate = async () => {
    //   await axios.post('localhost:8081/api/users/');
    // };
  
    return (
        <div className="m-12">
            <div className="input-group mb-3">
                <div className="form-floating">
                    <input type="text" className="form-control" id="floatingInputGroup1" placeholder="Username"/>
                </div>
                <button className="input-group-text"><Search size={24} style={{ margin: "0 auto" }} /></button>
            </div>
            {/* <td colSpan={2}>Larry the Bird</td> */}
            <table className="table table-hover">
            <thead>
                <tr>
                <th scope="col">Idx</th>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">quantity</th>
                <th scope="col">price</th>
                <th scope="col">category</th>
                <th scope="col">likeCount</th>
                <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">0</th>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">quantity</th>
                    <th scope="col">price</th>
                    <th scope="col">category</th>
                    <th scope="col">likeCount</th>
                    <td colSpan={2}>
                        <button className="btn" style={{backgroundColor:"blue", color:"white"}}>수정</button>
                        <button className="btn" style={{backgroundColor:"gray", color:"black"}}>삭제</button>
                    </td>
                </tr>
                {searchResults?.map((item:product,idx:any) => (
                <tr key={idx+1}>
                  <td>{idx+1}</td>
                  <td>
                    {item?.id}
                  </td>
                  <td>{item?.name}</td>
                  <td>{item?.quantity}</td>
                  <td>{item?.price}</td>
                  <td>{item?.category}</td>
                  <td>{item?.likeCount}</td>

                  <td colSpan={2}>
                    {/* <NavLink to={`/admin/users/${user.id}`} > */}
                    <button className="btn" style={{backgroundColor:"blue", color:"white"}}>수정</button>
                    {/* </NavLink> */}
                    <button className="btn" style={{backgroundColor:"gray", color:"black"}}
                        onClick={() => handleDelete(item?.id)}>삭제ss</button>
                  </td>
                    {/* <button onClick={() => handleEdit({ userPk: user.id })}>Edit {user.id}</button> */}
                    {/* <button onClick={() => handleDelete(user.idx)}>Delete</button> */}
                </tr>
              ))}

            </tbody>
            </table>
          {/* <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          /> */}
          {/* <button onClick={handleCreate}>Create</button> */}
            <nav aria-label="Page navigation example">
                <ul className="pagination" style={{justifyContent:"center"}}>
                    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                    <PageButtons totalPages={totalPages} />
                    <li className="page-item"><a className="page-link" href="#">Next</a></li>
                </ul>
            </nav>
        </div>
      );
}
export default Products;