import React, { useState, useEffect} from "react";
import { useSelector } from 'react-redux';
import { RootState } from '../../store/Auth';
import {useLocation  } from 'react-router-dom';
import { useNavigate } from 'react-router';

import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Search } from 'react-bootstrap-icons';
import {Modal, Form} from 'react-bootstrap';
import Swal from "sweetalert2";

export interface Answer {
	createdDate?: any;
	modifiedDate?: any;
	id: number;
	userPk: number;
	content: string;
	imgUrl?: any;
}

export interface User {
	id: number;
	userid: string;
	password: string;
	roles: string;
	provider?: any;
	nickname: string;
	profileImg: string;
	username: string;
	birth: string;
	email: string;
	tel: string;
	addr1: string;
	addr2: string;
	zipcode: string;
	birthYear: string;
	gender: string;
	emailAuth: boolean;
	createTime: string;
	roleList: string[];
}

export interface QnaForm {
	createdDate: string;
	modifiedDate: string;
	id: number;
	user: User;
	title: string;
	content: string;
	ansYN: boolean;
	type: number;
	files: any[];
	answers: Array<Answer>;
}
function getPageRanges(n: number): number[][] {
  const pageRanges: number[][] = [];
  for (let i = 1; i <= n; i += 10) {
    pageRanges.push(Array.from({ length: 10 }, (_, j) => i + j).filter(x => x <= n));
  }
  return pageRanges;
}

const Qna = () => {
    const [user, setUser] = useState<User>(); // qna writer
    const [title, setTitle] = useState<string>(''); // qna title
    const [content, setContent] = useState<string>(''); // qna content
    const [type, setType] = useState<User>(); // qna type
    const [answers, setAnswers] = useState<Array<Answer>>(); // qna Answer

    const [acontent, setAcontent] = useState<string>(''); // answer 내용
    const [aurl, setAurl] = useState<string>(''); // answer 이미지

    const [show, setShow] = useState(false); // modal
    const [open, setOpen] = useState(false); // img collapse
    const [files, setFiles] = useState<File[]>([]); // img list
    const [Rfiles, setRFiles] = useState<File[]>([]); // repImg

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<QnaForm[]|null>(null);
    const [page, setPage] = useState(1);
    // const [newImgs,setNewImgs] = useState<Array<pImg>>([]);
    const [totalPages, setTotalPages] = useState(0);
    const maxResults = 10;
    const baseUrl = "https://i8e208.p.ssafy.io/api/qna";
    const sUrl = "https://i8e208.p.ssafy.io/api/admin/qnasearch"
    // const baseUrl = "http://localhost:8081/api/qna";
    // const sUrl = "http://localhost:8081/api/admin/qnasearch"
    const [qnaInfo, setQnaInfo] = useState<QnaForm|null> (null);// for 상품정보 edit
    // Pagination
    const [nowPage, setNowPage] = useState<number>(0);
    const [pageRange, setPageRange] = useState<Array<Array<number>>>([[],])
    const [pageStates, setPageStates] = useState<{ [index: number]: boolean }>({},); // page 선택 여부.
    const [nowRange,setNowRange] = useState<Array<number>>([]);
    const [rangeIdx, setRangeIdx] = useState<number>(0);
    //관리자 인증
    const location = useLocation().pathname;
    const roleList: string[] = useSelector((state: RootState) => state.authToken.roleList);
    // const roleList2: string[]|undefined = localStorage.getItem('roles')?.split(",");
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
        Swal.fire({icon:'error', text:"관리자 권한이 없습니다."});
        navigate('../login');
      }
    }, [location, navigate]);

    useEffect(()=>{
      setNowRange([...pageRange[0]])
    }, [totalPages]) //한 함수안에 related useState를 동시에 넣으면 안된다.!


    const handleSearch = async (event:any) => {
      if (event.key === 'Enter' || event.type === 'click') {
        const response = await axios.get(`${baseUrl}/search/${user?.id}`);
        setSearchResults(response.data.content);
      }
    };

    const getData = async (page: number) => {
      try {
        let url;
        searchTerm=='' ? url=`${baseUrl}`:url=`${sUrl}/${searchTerm}`
        const response = await axios.get(`${url}`, {
          params: {
            page,
            max_result:10
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
          return res});
        return response.data.content;
      } catch (error) {
        console.error(error);
      }
    }
    if (searchResults === null) {
        getData(0);
    }

    const GoToNextPage = () =>{
      if (rangeIdx < pageRange.length-1) {
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

    const handleEdit = async (id: number) => {
        const data = await axios.get(`${baseUrl}/${id}`).then((res) => {
          setQnaInfo(res.data);
          return res.data
        });
        setUser(data.user)
        setTitle(data.title)
        setContent(data.content)
        setAnswers(data.answers)
        return data;
    };
  
    const handleDelete = async (id : number) => {
        try {
            const response = await axios.delete(`${baseUrl}/${id}`);
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

    const handleClose = () => setShow(false);
    const handleShow = async (id:number) => {
      await handleEdit(id);
      // setFiles([])
      setRFiles([])
      // setNewImgs([])
      setShow(true)
      setOpen(false)
    };


    const formTitleStyle = {
      color:"black",
      fontWeight:"bold"
    }
    

    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const droppedFiles = Array.from(e.dataTransfer.files);
      setFiles(files.concat(droppedFiles));
    };
  
    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
    };

    const onDropRep = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const droppedFiles = Array.from(e.dataTransfer.files);
      setRFiles(Rfiles.concat(droppedFiles));
    };
  
    const onDragOverRep = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
    };
    const fileToBlob = (file: File) => {
      return new Blob([file], { type: file.type });
    };

      // 사진 등록
  // imgFile 을 보내서 S3에 저장된 url받기
  const getImgUrl_one = async () => {
    let formData = new FormData();
    formData.append('file', Rfiles[0] ); // 파일 상태 업데이트
    const API_URL = `https://i8e208.p.ssafy.io/api/files/upload/`;
    return await axios
      .post(API_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((con) => {
        setAurl(con.data);
        return con.data;
      })
      .catch((err) => {
        console.log('이미지주소불러오기 실패', err);
      });
  };

  const submitEdit = async (e:any) => {
    let id = qnaInfo?.id;
    e.preventDefault();
    if (Rfiles.length > 0) {
      await getImgUrl_one();
    }
    let arr = [];
    const response = await axios.post(`https://i8e208.p.ssafy.io/api/answer/${id}`,{ content:acontent,imgUrl:aurl,userPk:user?.id  })
    .then(
      (response) => {
        setQnaInfo(response.data);
        }
      );
    setAcontent('');
    handleClose();
  };

    return (
        <div className="m-12">
            <div className="input-group mb-3">
              <Form.Control type="text" placeholder="문의 제목 또는 유저 이메일로 검색하세요." value={searchTerm} onKeyUp={(e) => { if (e.key=="Enter") {getData(0)} }}  onChange={(e) => { e.preventDefault(); setSearchTerm(e.target.value)}}/>
              <button className="input-group-text"><Search size={24} style={{ margin: "0 auto" }} onClick={()=>getData(0)}/></button>
            </div>
            
            <table className="table table-hover" style={{backgroundColor: "white",color: "unset"}}>
            <thead>
                <tr>
                <th scope="col">Idx</th>
                <th scope="col">ID</th>
                <th scope="col">Email</th>
                <th scope="col">title</th>
                <th scope="col">type</th>
                <th scope="col">CreateDate</th>
                <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">0</th>
                    <th scope="col">1</th>
                    <th scope="col">rkdrl@naver.com</th>
                    <th scope="col">이거 어케함?</th>
                    <th scope="col">45</th>
                    <th scope="col">생성일</th>
                    <td colSpan={2}>
                    <button className="btn" style={{backgroundColor:"blue", color:"white"}} onClick={() => handleShow(1)}>답변</button>
                        {/* <button className="btn" style={{backgroundColor:"blue", color:"white"}} onClick={() => setIsModalOpen(true)}>수정</button> */}
                    <button className="btn" style={{backgroundColor:"gray", color:"black"}}>삭제</button>
                    </td>
                </tr>
                {searchResults?.map((qna,idx:any) => (
                <tr key={idx+1}>
                  <td>{idx+1}</td>
                  <td>
                    {qna?.id}
                  </td>
                  <td>{qna?.user?.email}</td>
                  <td>{qna?.title}</td>
                  <td>{qna?.type}</td>
                  <td>{qna?.createdDate}</td>

                  <td colSpan={2}>
                    {/* <NavLink to={`/admin/users/${user.id}`} > */}
                    <button className="btn" style={{backgroundColor:"blue", color:"white"}} onClick={() => handleShow(qna?.id)}>답변</button>
                    {/* </NavLink> */}
                    <button className="btn" style={{backgroundColor:"gray", color:"black"}}
                        onClick={() => handleDelete(qna?.id)}>삭제</button>
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


          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title style={{fontWeight:"bold"}}>QnA 열람</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{color:"red"}}>답글을 달아주세요!<br/></Modal.Body>
            {
              answers?.map(val => (
                <div key={val.createdDate} style={{border:"solid black 1px"}}>
                  <h2>작성일: {val.createdDate}</h2>
                  <p>유저번호: {val.userPk}</p>
                  <p>내용: {val.content}</p>
                  <p>첨부 이미지</p>
                  <img src={val.imgUrl} alt="" />
                </div>
              ))
            }
            <div style={{width:"400px", margin:"50px", marginBottom:"20px"}}>
            <Form>
              <Form.Group controlId="formPk">
                <Form.Label style={formTitleStyle}>Pk</Form.Label>
                <Form.Control type="text" placeholder="문의 고유번호" value={qnaInfo?.id} readOnly/>
              </Form.Group><br/>
              <Form.Group controlId="formType">
                <Form.Label style={formTitleStyle}>Type</Form.Label>
                <Form.Control type="text" placeholder="문의 타입코드" value={qnaInfo?.type} readOnly/>
              </Form.Group><br/>
              <Form.Group controlId="formBasicEmail">
                <Form.Label style={formTitleStyle}>Name</Form.Label>
                <Form.Control type="text" placeholder="문의 생성자 이메일" value={qnaInfo?.user?.email} readOnly/>
              </Form.Group><br/>
              <Form.Group controlId="formBasicDate">
                <Form.Label style={formTitleStyle}>createdDate</Form.Label>
                <Form.Control type="text" placeholder="문의 생성날짜 " value={qnaInfo?.createdDate} readOnly/>
              </Form.Group><br/>
              <Form.Group controlId="formBasicTitle">
                <Form.Label style={formTitleStyle}>Title</Form.Label>
                <Form.Control type="text" placeholder="문의 제목" value={qnaInfo?.title} readOnly/>
              </Form.Group><br/>
              <Form.Group controlId="formBasicContent">
                <Form.Label style={formTitleStyle}>Title</Form.Label>
                <Form.Control type="text" placeholder="문의 내용" value={qnaInfo?.content} readOnly/>
              </Form.Group><br/>
                <div onDrop={onDropRep} onDragOver={onDragOverRep}>
                  <h1 style={formTitleStyle} >답변 첨부 이미지</h1>
                  <p>이미지를 끌어 올려주세요.<br/>(우클릭시 이미지 빼기)</p>
                  {/* <Form.Label style={formTitleStyle}>RepImg</Form.Label> */}
                  {/* <Form.Control type="file"/> */}
                    <div style={{display:"flex", justifyContent:"space-around"}}>
                        <p>선택한 이미지</p>
                        { Rfiles.length === 0 ? (
                            <img style={{width:"100px",height:"100px"}}
                            height={100}
                            src="data:image/png;base64,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"
                            />)
                            :
                            (
                              <img style={{width:"100px",height:"100px"}}
                              src={URL.createObjectURL(Rfiles[0])}
                              alt={Rfiles[0].name}
                              height={100}
                              onContextMenu={e => {
                                e.preventDefault();
                                setRFiles([]);
                              }}/>
                            )
                        }
                    </div>
                </div>
                <hr/>
              <Form.Group controlId="formBasicAC">
                <Form.Label style={formTitleStyle}>답변 내용</Form.Label>
                <Form.Control type="text" placeholder="acontent" value={acontent} onChange={(e) => setAcontent(e.target.value)}/>
              </Form.Group><br/>
              <button className="btn" style={{backgroundColor:"blue", color:"white"}} onClick={(e) => submitEdit(e)}>제출</button>
              {/* <Button variant="primary" type="submit" >
                수정하기
              </Button> */}
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
export default Qna;