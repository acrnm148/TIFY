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
import {Modal, Form } from 'react-bootstrap';
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
    emailAuth?: string;
    createTime?: string;
    roleList?: Array<string>;
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
const options = [
  { value: 'true', label: 'True' },
  { value: 'false', label: 'False' },
];
function getPageRanges(n: number): number[][] {
  const pageRanges: number[][] = [];
  for (let i = 1; i <= n; i += 10) {
    pageRanges.push(Array.from({ length: 10 }, (_, j) => i + j).filter(x => x <= n));
  }
  return pageRanges;
}

const Users = () => {
    const [Rfiles, setRFiles] = useState<File[]>([]); // profile imgae
    const [userInfo,setUserInfo] = useState<UserDetailInfo>({},);
    const [show, setShow] = useState(false); // modal
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<userInfo[] | null>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [selectUser,setSelectUser] = useState<UserDetailInfo|null> (null);
    const maxResults = 10;
    const baseUrl = "https://i8e208.p.ssafy.io/api/admin";
    // const baseUrl = "http://localhost:8081/api/admin";
    // Pagination
    const [nowPage, setNowPage] = useState<number>(0);
    const [pageRange, setPageRange] = useState<Array<Array<number>>>([[],])
    const [pageStates, setPageStates] = useState<{ [index: number]: boolean }>({},); // page 선택 여부.
    const [nowRange,setNowRange] = useState<Array<number>>([]);
    const [rangeIdx, setRangeIdx] = useState<number>(0);

    useEffect(()=>{
      setNowRange([...pageRange[0]])
    }, [totalPages]) //한 함수안에 related useState를 동시에 넣으면 안된다.!

    const handleSearch = async (event:any) => {
      if (event.key === 'Enter' || event.type === 'click') {
        getData(0);
      }
    };
    const GoToNextPage = () =>{
      if (rangeIdx < pageRange.length-1) {
        console.log(rangeIdx)
        setPageRange(getPageRanges(totalPages));
        const range = pageRange.at(rangeIdx + 1);
        if (range) {
            setNowRange([...range]);
        }
        setRangeIdx(rangeIdx + 1);
      }
     }
  
     const GoToBeforePage = () =>{
      if (rangeIdx > 0) {
        setPageRange(getPageRanges(totalPages));
        const range = pageRange.at(rangeIdx-1);
        if (range) {
            setNowRange([...range]);
        }
        setRangeIdx(rangeIdx - 1);
      }
     }

     const PageButtons = ({ totalPages }: { totalPages: number }) => {
      let buttons:Array<any> = [];
      nowRange.map(i => {
        buttons.push(
          <li className="page-item" key={`button idx-${i}`}>
            <button
              className="page-link"
              onClick={() => {
                // setPage(i - 1);
                setPageStates({...pageStates,[nowPage]:false,[i]:true})
                setNowPage(i);
                if (searchTerm.trim() == "" || searchTerm==null) {
                  getData(i - 1);
                }
              }}
              style={pageStates[i] ? {color:"white", backgroundColor: "blue"} : {backgroundColor: ""}}
            >
              {i}
            </button>
          </li>
        );
      })
      return <>{buttons}</>;
    };

    const getData = async (page: number) => {
      try {
        let url;
        searchTerm=='' ? url=`${baseUrl}/user`:url=`${baseUrl}/usersearch/${searchTerm}`
        const response = await axios .get(url, {
          params: {
            page,
          },
        }).then((res) => {
          setSearchResults(res.data.content);
          if (totalPages != res.data.totalPages) {
            setTotalPages(res.data.totalPages);
            setPageRange( getPageRanges(res.data.totalPages) ); 
            setNowPage(1);
            let pageSelect:{ [index: number]: boolean } = {};
            pageSelect[1]=true;
            for (let i=2; i<=res.data.totalPages; i++) {
              pageSelect[i]=false;
            }
            setPageStates(pageSelect);
          }
          console.log(res)
          return res});
        return response.data;
      } catch (error) {
        console.error(error);
      }
    }
    if (searchResults === null) {
        getData(0);
    }

    // 수정하기 위한 단일 정보 받아오기
    const handleEdit = async (pk: number|undefined) => {
      console.log(pk);
      console.log("-----------------");
      return await axios.get(`${baseUrl}/user/${pk}`).then((res) => {
        console.log(res)
        let data = res.data;
        setUserInfo(data);
        console.log(data);
        console.log("유저 수정 단일정보 획득");
        return data
      });
    };

    const handleClose = () => setShow(false);
    const handleShow = async (id:number) => {
      await handleEdit(id);
      setRFiles([])
      setShow(true)
    };

    const handleDelete = async (userid:number) => {
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
  
    const getImgUrl_one = async () => {
      if (Rfiles.length < 1) {return 0};
      let formData = new FormData();
      formData.append('file', Rfiles[0]); // 파일 상태 업데이트
      const API_URL = `https://i8e208.p.ssafy.io/api/files/upload/`;
      return await axios
        .post(API_URL, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((con) => {
          console.log('이미지주소불러오기 성공', con.data);
          // setImgUrlS3(con.data);
          userInfo.profileImg = con.data
          setUserInfo({ ...userInfo});
          console.log(con.data);
          console.log('프로필 이미지 성공');
          // setNewImgs(newImgs?.concat(temp));
          return con.data;
        })
        .catch((err) => {
          console.log('이미지주소불러오기 실패', err);
        });
    };

    const submitEdit = async (e: any) => {
      let id = userInfo?.id;
      e.preventDefault();
      await getImgUrl_one();
      // files.map(async (val, idx) => {
      //   await getImgUrl(idx);
      // })
      setUserInfo({...userInfo})
      await axios.put(`${baseUrl}/user/${id}`,{...userInfo})
      .then(
        (response) => {
          console.log("----------",userInfo.roles);
          console.log(response);
          console.log("요청 보낸겁니다.");
          setUserInfo(response.data);
        });
      handleClose();
      // <UserInfoEdit userInfo={selectUser} />
    };

    const formTitleStyle = {
      color: 'black',
      fontWeight: 'bold',
    };
    const onDropRep = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const droppedFiles = Array.from(e.dataTransfer.files);
      setRFiles(Rfiles.concat(droppedFiles));
    };
  
    const onDragOverRep = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
    };
    
    // const handleCreate = async () => {
    //   await axios.post('localhost:8081/api/users/');
    // };
  
    return (
        <div className="m-12">
            <div className="input-group mb-3">
                <Form.Control type="text" placeholder="Email로 검색하세요." value={searchTerm} onKeyUp={(e) => { if (e.key=="Enter") {getData(0)} }}  onChange={(e) => { e.preventDefault(); setSearchTerm(e.target.value)}}/>
                <button className="input-group-text"><Search size={24} style={{ margin: "0 auto" }} onClick={()=>getData(0)}/></button>
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
                {searchResults?.map((user,idx) => (
                <tr key={idx+1}>
                  <td>{idx+1}</td>
                  <td>
                    <img style={{borderRadius: '50%', width: '30px', height: '30px',}} src={user.profileImg || "https://mblogthumb-phinf.pstatic.net/MjAyMDExMDFfMTA1/MDAxNjA0MjI4ODc1Mzk0.05ODadJdsa3Std55y7vd2Vm8kxU1qScjh5-3eVJ9T-4g.h7lHansSdReVq7IggiFAc44t2W_ZPTPoZWihfRMB_TYg.JPEG.gambasg/%25EC%259C%25A0%25ED%258A%259C%25EB%25B8%258C_%25EA%25B8%25B0%25EB%25B3%25B8%25ED%2594%2584%25EB%25A1%259C%25ED%2595%2584_%25ED%258C%258C%25EB%259E%2591.jpg?type=w800" } alt="profile"/>
                  </td>
                  <td>{user?.userid}</td>
                  <td>{user?.username}</td>
                  <td>{user?.tel}</td>
                  <td>{user?.email}</td>

                  <td colSpan={2}>
                    <button
                      className="btn"
                      style={{ backgroundColor: 'blue', color: 'white' }}
                      onClick={() => handleShow(user?.id)}>
                      수정
                    </button>

                    <button
                      className="btn"
                      style={{ backgroundColor: 'gray', color: 'black' }}
                      onClick={() => handleDelete(user?.id)}
                    >
                      삭제
                    </button>
                  </td>
                    {/* <button onClick={() => handleEdit({ userPk: user.id })}>Edit {user.id}</button> */}
                    {/* <button onClick={() => handleDelete(user.idx)}>Delete</button> */}
                </tr>
              ))}
            </tbody>
            </table>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title style={{fontWeight:"bold"}}>유저 정보 수정</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{color:"red"}}>양식에 맞게 정보를 입력해주세요.</Modal.Body>
              <div style={{width:"400px", margin:"50px", marginBottom:"20ps"}}>
                <Form onSubmit={(e) => e.preventDefault}>
                  <Form.Group controlId="formPk">
                    <Form.Label style={formTitleStyle}>Pk</Form.Label>
                    <Form.Control type="text" placeholder="유저 고유번호" value={userInfo?.id} readOnly/>
                  </Form.Group><br/>
                  <Form.Group controlId="formBasicUserName">
                    <Form.Label style={formTitleStyle}>UserName</Form.Label>
                    <Form.Control type="text" placeholder="유저 명" value={userInfo?.username} onChange={(e) => { userInfo.username=e.target.value; setUserInfo({...userInfo})}} />
                  </Form.Group><br/>
                  <Form.Group controlId="formBasicUI">
                    <Form.Label style={formTitleStyle}>User Id</Form.Label>
                    <Form.Control type="text" placeholder="Empty UserId" value={userInfo?.userid} readOnly/>
                  </Form.Group><br/>
                  <Form.Group controlId="formBasicProvider">
                    <Form.Label style={formTitleStyle}>Provider</Form.Label>
                    <Form.Control type="text" placeholder="No Provider" value={userInfo?.provider} readOnly/>
                  </Form.Group><br/>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label style={formTitleStyle}>User Email</Form.Label>
                    <Form.Control type="text" placeholder="Empty UserEmail" value={userInfo?.email} readOnly/>
                  </Form.Group><br/>
                  <Form.Group controlId="formBasicUN">
                    <Form.Label style={formTitleStyle}>User NickName</Form.Label>
                    <Form.Control type="text" placeholder="Set User NickName" value={userInfo?.nickname} onChange={(e) => { userInfo.nickname = e.target.value; setUserInfo({...userInfo})}}/>
                  </Form.Group><br/>
                  <Form.Group controlId="formBasicRI">
                    <div onDrop={onDropRep} onDragOver={onDragOverRep}>
                      <h1 style={formTitleStyle}>Product RepImg</h1>
                      <p>
                        Drag and drop your RepImg
                        <br />
                        (우클릭시 이미지 빼기)
                      </p>
                      {/* <Form.Label style={formTitleStyle}>RepImg</Form.Label> */}
                      {/* <Form.Control type="file"/> */}
                      <div
                        style={{ display: 'flex', justifyContent: 'space-around' }}
                      >
                        <div>
                          <p>기존 대표 이미지</p>
                          <img
                            style={{ width: '100px', height: '100px' }}
                            src={userInfo?.profileImg || "https://mblogthumb-phinf.pstatic.net/MjAyMDExMDFfMTA1/MDAxNjA0MjI4ODc1Mzk0.05ODadJdsa3Std55y7vd2Vm8kxU1qScjh5-3eVJ9T-4g.h7lHansSdReVq7IggiFAc44t2W_ZPTPoZWihfRMB_TYg.JPEG.gambasg/%25EC%259C%25A0%25ED%258A%259C%25EB%25B8%258C_%25EA%25B8%25B0%25EB%25B3%25B8%25ED%2594%2584%25EB%25A1%259C%25ED%2595%2584_%25ED%258C%258C%25EB%259E%2591.jpg?type=w800"}
                            alt="addImg"
                            height={100}
                          />
                        </div>
                        <div>
                          <p>선택한 프로필 이미지</p>
                          {Rfiles.length === 0 ? (
                            <img
                              style={{ width: '100px', height: '100px' }}
                              height={100}
                              src="data:image/png;base64,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"
                            />
                          ) : (
                            <img
                              style={{ width: '100px', height: '100px' }}
                              src={URL.createObjectURL(Rfiles[0])}
                              alt={Rfiles[0].name}
                              height={100}
                              onContextMenu={(e) => {
                                e.preventDefault();
                                setRFiles([]);
                              }}
                            />
                          )}
                        </div>
                        </div>
                      </div>
                    </Form.Group><br/>

                  <Form.Group controlId="formBasicBirthYear">
                    <Form.Label style={formTitleStyle}>BirthYear</Form.Label>
                    <Form.Control type="text" placeholder="yyyy" value={userInfo?.birth} onChange={(e) => { userInfo.birth = e.target.value; setUserInfo({...userInfo})}}/>
                  </Form.Group><br/>
                  <Form.Group controlId="formBasicBirth">
                    <Form.Label style={formTitleStyle}>Birth</Form.Label>
                    <Form.Control type="text" placeholder="mm-dd" value={userInfo?.birthYear} onChange={(e) => { userInfo.birthYear = e.target.value; setUserInfo({...userInfo})}}/>
                  </Form.Group><br/>
                  <Form.Group controlId="formBasicA1">
                    <Form.Label style={formTitleStyle}>도로명/지번 주소</Form.Label>
                    <Form.Control type="text" placeholder="000길 00-00" value={userInfo?.addr1} onChange={(e) => { userInfo.addr1 = e.target.value; setUserInfo({...userInfo})}}/>
                  </Form.Group><br/>
                  <Form.Group controlId="formBasicA2">
                    <Form.Label style={formTitleStyle}>상세주소</Form.Label>
                    <Form.Control type="text" placeholder="000동 0 호" value={userInfo?.addr2} onChange={(e) => { userInfo.addr2 = e.target.value; setUserInfo({...userInfo})}}/>
                  </Form.Group><br/>
                  <Form.Group controlId="formBasicZC">
                    <Form.Label style={formTitleStyle}>우편번호</Form.Label>
                    <Form.Control type="text" placeholder="000-000" value={userInfo?.zipcode} onChange={(e) => { userInfo.zipcode = e.target.value; setUserInfo({...userInfo})}}/>
                  </Form.Group><br/>
                  <Form.Group controlId="formBasicZC">
                    <Form.Label style={formTitleStyle}>우편번호</Form.Label>
                    <Form.Control type="text" placeholder="000-000" value={userInfo?.zipcode} onChange={(e) => { userInfo.zipcode = e.target.value; setUserInfo({...userInfo})}}/>
                  </Form.Group><br/>
                  <Form.Group controlId="formBasicTel">
                    <Form.Label style={formTitleStyle}>전화번호</Form.Label>
                    <Form.Control type="text" placeholder="( - 없이 숫자만 입력)" value={userInfo.tel} onChange={(e) => { userInfo.tel = e.target.value; setUserInfo({...userInfo})}}/>
                  </Form.Group><br/>
                  <Form.Group controlId="formBasicGender">
                    <Form.Label style={formTitleStyle}>성별</Form.Label>
                    <Form.Control type="text" placeholder="남 / 여 ... etc" value={userInfo?.gender} onChange={(e) => { userInfo.gender = e.target.value; setUserInfo({...userInfo})}}/>
                  </Form.Group><br/>
                  <Form.Group controlId="formBasicEA">
                    <Form.Label style={formTitleStyle}>이메일 인증 여부</Form.Label>
                    <Form.Control type="text" placeholder="true or false" value={userInfo?.emailAuth ? userInfo?.emailAuth:"false"} onChange={(e) => { userInfo.emailAuth = e.target.value; setUserInfo({...userInfo})}}/>
                  </Form.Group><br/>
                  <Form.Group controlId="formBasicCT">
                    <Form.Label style={formTitleStyle}>가입 날짜</Form.Label>
                    <Form.Control type="text" placeholder="0000-00-00 ..." value={userInfo?.createTime} readOnly/>
                  </Form.Group><br/>
                  <Form.Group controlId="formBasicUR">
                    <Form.Label style={formTitleStyle}>User's Roles (,로 구분)</Form.Label>
                    <Form.Control type="text" placeholder="USER, ADMIN, ... (컴마로 구분)" value={userInfo?.roles} onChange={(e) => { userInfo.roles = e.target.value; setUserInfo({...userInfo})}}/>
                  </Form.Group><br/>
                  <button className="btn" style={{backgroundColor:"blue", color:"white"}} onClick={(e) => submitEdit(e)}>수정</button>
                </Form>
              </div>
            </Modal>
            <nav aria-label="Page navigation example">
              <ul className="pagination" style={{ justifyContent: 'center' }}>
                <li className="page-item">
                  <a className="page-link" onClick={(e)=>{e.preventDefault(); GoToBeforePage()}}>
                    Previous
                  </a>
                </li>
                <PageButtons totalPages={totalPages} />
                <li className="page-item">
                  { 
                    
                    <a className="page-link" onClick={(e)=>{e.preventDefault(); GoToNextPage()}}>
                      Next
                    </a>
                  }

                </li>
              </ul>
            </nav>
        </div>
      );
}
export default Users;