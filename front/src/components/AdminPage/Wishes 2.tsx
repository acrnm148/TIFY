import React, { useState } from "react";

import { ref, set, push, onValue, child, get, update, remove } from "firebase/database";
import { List } from "@mui/material";
import { useSelector } from 'react-redux';
import { RootState } from '../../store/Auth';

import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Search } from 'react-bootstrap-icons';
import { NavLink } from 'react-router-dom';

interface wish {
    id: number;
    user : any;
    title : string;
    totPrice : number;
    nowPrice : number;
    finishYN: string;
    endDate: string;
    category: string;
}

const Wishes = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<wish[]|null>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const maxResults = 10;
    const baseUrl = "https://i8e208.p.ssafy.io/api/admin";

    const getData = async (page: number) => {
      try {
        const response = await axios.get(`${baseUrl}/wish`, {
          params: {
            page,
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

    const handleDelete = async (id: number) => {
        console.log(id);
        try {
            const response = await axios.delete(`${baseUrl}/wish/${id}`);
            getData(page);
            console.log(`deleted wish ${id}`)
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
                <th scope="col">userEmail</th>
                <th scope="col">title</th>
                <th scope="col">totPrice</th>
                <th scope="col">nowPrice</th>
                <th scope="col">finishYN</th>
                <th scope="col">endDate</th>
                <th scope="col">category</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">0</th>
                    <td>rewq@naver.com</td>
                    <td>Testing</td>
                    <td>총 가격</td>
                    <td>현재 모인 금액</td>
                    <td>N</td>
                    <td>2023-02-05</td>
                    <td>생일</td>
                    <td colSpan={2}>
                        <button className="btn" style={{backgroundColor:"blue", color:"white"}}>수정</button>
                        <button className="btn" style={{backgroundColor:"gray", color:"black"}}>삭제</button>
                    </td>
                </tr>
                {searchResults?.map((wish,idx:any) => (
                <tr key={idx+1}>
                  <td>{idx+1}</td>
                  <td>
                    {wish?.user?.email}
                  </td>
                  <td>{wish?.title.toString()}</td>
                  <td>{wish?.totPrice.toString()}</td>
                  <td>{wish?.nowPrice.toString()}</td>
                  <td>{wish?.finishYN.toString()}</td>
                  <td>{wish?.endDate.toString()}</td>
                  <td>{wish?.category.toString()}</td>
                  <td colSpan={2}>
                    {/* <NavLink to={`/admin/users/${user.id}`} > */}
                    <button className="btn" style={{backgroundColor:"blue", color:"white"}}>수정</button>
                    {/* </NavLink> */}
                    <button className="btn" style={{backgroundColor:"gray", color:"black"}}
                        onClick={() => handleDelete(wish?.id)}>삭제</button>
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
export default Wishes;