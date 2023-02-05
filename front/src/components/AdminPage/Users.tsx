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

interface userInfo {
	username: string;
	userid: string;
	email: string;
    tel: string;
    profileImg: string;
    id: number; // pk 값
}

interface UserDetailInfo {
    id?: number;
    userid?: string;
    password?: string;
    roles?: string;
    provider?: string;
    nickname?: string;
    profileImg?: string;
    username?: string;
    birth?: string;
    email?: string;
    tel?: string;
    addr1?: string;
    addr2?: string;
    zipcode?: string;
    birthYear?: string;
    gender?: string;
    emailAuth?: boolean;
    createTime?: string;
    roleList?: string[];
  }

interface userPageResult {
    content: any;
    pageable : any;
    totalElements: Number;
    totalPages: Number;
    sort: any;
    numberOfElements: 10;
    first: Boolean;
    size: Number;
    number: Number;
    empty: Boolean;
    last: Number;
}

const Users = () => {
    
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<userPageResult|null>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [selectUser,setSelectUser] = useState<UserDetailInfo|null> (null);
    const maxResults = 10;
    const baseUrl = "https://i8e208.p.ssafy.io/api/admin";

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
        const response = await axios.get(`${baseUrl}/user`, {
          params: {
            page,
          },
        });
        setSearchResults(response.data);
        setTotalPages(response.data.totalPages);
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    }
    if (searchResults === null) {
        getData(0);
    }

    // 임시로 프로필 이미지 없는 경우 대체용
    const checkImg = (imgUrl:string) => {
        // let suffix = imgUrl?.split("/");
        // if (suffix[suffix.length-1] == "no_img.png") {return anony}
        // else if (suffix?.length>1) {return imgUrl}
        // else {return anony}
        return imgUrl;
    }

    const PageButtons = ({ totalPages }: { totalPages: number }) => {
        let buttons = [];
        for (let i = 1; i <= totalPages; i++) {
          buttons.push(
            <li className="page-item" key={i}>
                <button className="page-link" onClick={() => {setPage(i); getData(i-1);}}>{i}</button>
            </li>
          )
        }
        return (
          <>
            {buttons}
          </>
        );
      };

    const handlePageChange = async (newPage) => {
      setPage(newPage);
      const response = await axios.get('localhost:8081/api/users/', {
        params: {
          page: newPage,
          max_results: maxResults,
        },
      });
      setSearchResults(response.data);
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
  
    const handleDelete = async (userid) => {
        console.log(userid);
        try {
            const response = await axios.delete(`${baseUrl}/user/${userid}`);
            await getData(page-1);
            console.log(`deleted user ${userid}`)
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
                <th scope="col">PI</th>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Tel</th>
                <th scope="col">Email</th>
                <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">0</th>
                    <td><img style={{borderRadius: '50%', width: '30px', height: '30px',}} src={anony} alt="img"/></td>
                    <td>Testing</td>
                    <td>강기한</td>
                    <td>010-4922-1157</td>
                    <td>rkdrlgks321@naver.com</td>
                    <td colSpan={2}>
                        <button className="btn" style={{backgroundColor:"blue", color:"white"}}>수정</button>
                        <button className="btn" style={{backgroundColor:"gray", color:"black"}}>삭제</button>
                    </td>
                </tr>
                {searchResults?.content.map((user:userInfo,idx:any) => (
                <tr key={idx+1}>
                  <td>{idx+1}</td>
                  <td>
                    <img style={{borderRadius: '50%', width: '30px', height: '30px',}} src={checkImg(user.profileImg)} alt="profile"/>
                  </td>
                  <td>{user.userid}</td>
                  <td>{user.username}</td>
                  <td>{user.tel}</td>
                  <td>{user.email}</td>

                  <td colSpan={2}>
                    <NavLink to={`/admin/users/${user.id}`} >
                    <button className="btn" style={{backgroundColor:"blue", color:"white"}}>수정</button>
                    </NavLink>
                    <button className="btn" style={{backgroundColor:"gray", color:"black"}}
                        onClick={() => handleDelete(user.id)}>삭제</button>
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
export default Users;