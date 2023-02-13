import React, { useState, useEffect, ReactEventHandler, useCallback, ReactHTMLElement } from "react";
import alert from '../../assets/iconAlert.svg';
import bell from '../../assets/bell.png';
import anony from '../../assets/anony.png';

import { ref, set, push, onValue, child, get, update, remove } from "firebase/database";
import { List } from "@mui/material";
import { useSelector } from 'react-redux';
import { RootState } from '../../store/Auth';

import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Justify, Search } from 'react-bootstrap-icons';
import { NavLink } from 'react-router-dom';
import {Modal, Form, Collapse, Container, Row, Col} from 'react-bootstrap';
import { borderRadius } from "@mui/system";

export interface FaqForm {
	createdDate: string;
	modifiedDate: string;
	id: number;
	title: string;
	content: string;
	idx: number;
  type: number;
  imgUrl: string;
}

interface pImg {
  idx?: number;
  url?: string;
  id?: number;
}
function getPageRanges(n: number): number[][] {
  const pageRanges: number[][] = [];
  for (let i = 1; i <= n; i += 10) {
    pageRanges.push(Array.from({ length: 10 }, (_, j) => i + j).filter(x => x <= n));
  }
  return pageRanges;
}

const Faq = () => {
    const [id, setId] = useState<string>(''); // faq id
    const [title, setTitle] = useState<string>(''); // faq title
    const [content, setContent] = useState<string>(''); // faq content
    const [type, setType] = useState<string>(''); // faq type
    const [idx, setIdx] = useState<string>(''); // faq idx
    const [imgUrl, setImgUrl] = useState<string>(''); // faq img
    const [newImgs, setNewImgs] = useState<Array<pImg>>([]);

    const [show, setShow] = useState(false); // modal
    const [open, setOpen] = useState(false); // img collapse
    const [files, setFiles] = useState<File[]>([]); // img list
    const [Rfiles, setRFiles] = useState<File[]>([]); // repImg

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<FaqForm[]|null>(null);
    const [page, setPage] = useState(0);
    // const [newImgs,setNewImgs] = useState<Array<pImg>>([]);
    const [totalPages, setTotalPages] = useState(0);
    const maxResults = 10;
    const baseUrl = "https://i8e208.p.ssafy.io/api/faq";
    const sUrl = "https://i8e208.p.ssafy.io/api/admin/faqsearch"
    // const baseUrl = "http://localhost:8081/api/faq";
    // const sUrl = "http://localhost:8081/api/admin/faqsearch"
    const [faqInfo, setFaqInfo] = useState<FaqForm|null> (null);// for 상품정보 edit

    const [newShow, setNewShow] = useState(false); // modal

    const [refresh, setRefresh] = useState<boolean>(false); //페이지 갱신용
    // Pagination
    const [nowPage, setNowPage] = useState<number>(0);
    const [pageRange, setPageRange] = useState<Array<Array<number>>>([[],])
    const [pageStates, setPageStates] = useState<{ [index: number]: boolean }>({},); // page 선택 여부.
    const [nowRange,setNowRange] = useState<Array<number>>([]);
    const [rangeIdx, setRangeIdx] = useState<number>(0);

    useEffect(() => {
      getData(page)}, [refresh]);
    useEffect(()=>{
        setNowRange([...pageRange[0]])
      }, [totalPages]) //한 함수안에 related useState를 동시에 넣으면 안된다.!
    // const handleSearch = async (event:any) => {
    //   if (event.key === 'Enter' || event.type === 'click') {
    //     const response = await axios.get(`${baseUrl}/search/${searchTerm}`);
    //     setSearchResults(response.data.content);
    //   }
    // };

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
            let pageSelect:{ [index: number]: boolean } = {};
            for (let i=1; i<=res.data.totalPages; i++) {
              pageSelect[i]=false;
            }
            setPageStates(pageSelect);
          }
          console.log(res)
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

    const handleEdit = async (id: number) => {
        console.log(id);
        console.log("-----------------");
        return await axios.get(`${baseUrl}/${id}`).then((res) => {
          let data = res.data
          setFaqInfo(data);
          setId(data.id)
          setTitle(data.title)
          setContent(data.content)
          setType(data.type)
          setIdx(data.idx)
          setImgUrl(data.imgUrl)
          console.log(data);
          return data
        });
    };
  
    const handleDelete = async (id : number) => {
        console.log(id);
        try {
            const response = await axios.delete(`${baseUrl}/${id}`);
            getData(page-1);
            console.log(`deleted faq ${id}`)
            return response;
        } catch (error) {
            console.error(error);
        }
    };
  
    // const handleCreate = async () => {
    //   await axios.post('localhost:8081/api/users/');
    // };

    const handleClose = () => {
      setShow(false);
    }
    const handleShow = async (id:number) => {
      setRFiles([])
      setTitle('');
      setContent('');
      setImgUrl('');
      setType('');
      setIdx('');
      await handleEdit(id);
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
    if (Rfiles.length < 1) {
      return 0
    }
    let formData = new FormData();
    formData.append('file', Rfiles[0] ); // 파일 상태 업데이트
    const API_URL = `https://i8e208.p.ssafy.io/api/files/upload/`;
    return await axios
      .post(API_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((con) => {
        setImgUrl(con.data);
        console.log("이미지 성공")
        return con.data;
      })
      .catch((err) => {
        console.log('이미지주소불러오기 실패', err);
      });
  };

  const submitEdit = async (e:any) => {
    let id = faqInfo?.id;
    e.preventDefault();
    console.log(id);
    console.log("-----------------");
    await axios.put(`${baseUrl}/${id}`,{ content, imgUrl: await getImgUrl_one(), idx, title, type })
    .then(
      (response) => {
        console.log(response);
        setFaqInfo(response.data);
        setRefresh(!refresh)
        handleClose();
        }
      );

  };

  const handleNewClose = () => {
    setRefresh(!refresh);
    setNewShow(false);
   }
  const handleNewShow = () => {
    setRFiles([])
    setTitle('');
    setContent('');
    setImgUrl('');
    setType('');
    setIdx('');
    setNewShow(true)
  };

  const createFaq = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (idx == '') { setIdx('0')} // 지정안하면 0으로 처리 해버리기
    await axios.post(`${baseUrl}`,{ content, imgUrl: await getImgUrl_one(), idx, title, type })
    .then((res) => {
      console.log(res);
      setTitle('');
      setContent('');
      setImgUrl('');
      setType('');
      setIdx('');
      handleNewClose();
      return res.data;
    })
  }


    return (
        <div className="m-12">
            <div className="input-group mb-3">
              <Form.Control type="text" placeholder="문의 제목 또는 유저 이메일로 검색하세요." value={searchTerm} onKeyUp={(e) => { if (e.key=="Enter") {getData(0)} }}  onChange={(e) => { e.preventDefault(); setSearchTerm(e.target.value)}}/>
              <button className="input-group-text"><Search size={24} style={{ margin: "0 auto" }} onClick={()=>getData(0)}/></button>
            </div>
            <button
                  className="btn"
                  style={{ backgroundColor: '#FA4141', color: 'white' }}
                  onClick={() => handleNewShow()}
                >FAQ 등록</button>
            <table className="table table-hover" style={{backgroundColor: "white",color: "unset"}}>
            <thead>
                <tr>
                <th scope="col">Idx</th>
                <th scope="col">ID</th>
                <th scope="col">Title</th>
                <th scope="col">idx</th>
                <th scope="col">type</th>
                <th scope="col">CreateDate</th>
                <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">0</th>
                    <th scope="col">1</th>
                    <th scope="col">에페큐입니다.</th>
                    <th scope="col">1</th>
                    <th scope="col">2</th>
                    <th scope="col">생성일</th>
                    <td colSpan={2}>
                    <button className="btn" style={{backgroundColor:"blue", color:"white"}} onClick={() => handleShow(1)}>수정</button>
                        {/* <button className="btn" style={{backgroundColor:"blue", color:"white"}} onClick={() => setIsModalOpen(true)}>수정</button> */}
                    <button className="btn" style={{backgroundColor:"gray", color:"black"}}>삭제</button>
                    </td>
                </tr>
                {searchResults?.map((faq,idx:any) => (
                <tr key={idx+1}>
                  <td>{idx+1}</td>
                  <td>
                    {faq?.id}
                  </td>
                  <td>{faq?.title}</td>
                  <td>{faq?.idx}</td>
                  <td>{faq?.type}</td>
                  <td>{faq?.createdDate}</td>

                  <td colSpan={2}>
                    {/* <NavLink to={`/admin/users/${user.id}`} > */}
                    <button className="btn" style={{backgroundColor:"blue", color:"white"}} onClick={() => handleShow(faq?.id)}>수정</button>
                    {/* </NavLink> */}
                    <button className="btn" style={{backgroundColor:"gray", color:"black"}}
                        onClick={() => handleDelete(faq?.id)}>삭제</button>
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
              <Modal.Title style={{fontWeight:"bold"}}>FAQ 수정</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{color:"red"}}>FAQ 상세 내용입니다.<br/></Modal.Body>
            <div style={{width:"400px", margin:"50px", marginBottom:"20px"}}>
            <Form>
              <Form.Group controlId="formPk">
                <Form.Label style={formTitleStyle}>Pk</Form.Label>
                <Form.Control type="text" placeholder="FAQ 고유번호" value={faqInfo?.id} readOnly/>
              </Form.Group><br/>
              <Form.Group controlId="formType">
                <Form.Label style={formTitleStyle}>Type</Form.Label>
                <Form.Control type="text" placeholder="FAQ 타입코드" value={type} onChange={(e) => setType(e.target.value) }/>
              </Form.Group><br/>
              <Form.Group controlId="formBasicIdx">
                <Form.Label style={formTitleStyle}>Idx</Form.Label>
                <Form.Control type="text" placeholder="FAQ 노출 순서" value={idx} onChange={(e) => setIdx(e.target.value) }/>
              </Form.Group><br/>
              <Form.Group controlId="formBasicDate">
                <Form.Label style={formTitleStyle}>createdDate</Form.Label>
                <Form.Control type="text" placeholder="FAQ 생성날짜 " value={faqInfo?.createdDate ? faqInfo?.createdDate:''} readOnly/>
              </Form.Group><br/>
              <Form.Group controlId="formBasicTitle">
                <Form.Label style={formTitleStyle}>Title</Form.Label>
                <Form.Control type="text" placeholder="FAQ 제목" value={title} onChange={(e) => setTitle(e.target.value) }/>
              </Form.Group><br/>
              <Form.Group controlId="formBasicContent">
                <Form.Label style={formTitleStyle}>Content</Form.Label>
                <Form.Control type="text" placeholder="FAQ 내용" value={content} onChange={(e) => setContent(e.target.value) }/>
              </Form.Group><br/>
                <div onDrop={onDropRep} onDragOver={onDragOverRep}>
                  <h1 style={formTitleStyle} >FAQ 첨부 이미지</h1>
                  <p>이미지를 끌어 올려주세요.<br/>(우클릭시 이미지 빼기)</p>
                  {/* <Form.Label style={formTitleStyle}>RepImg</Form.Label> */}
                  {/* <Form.Control type="file"/> */}
                    <div style={{display:"flex", justifyContent:"space-around"}}>
                          <div>
                          <p>기존 대표 이미지</p>
                          <img
                            style={{ width: '100px', height: '100px' }}
                            src={imgUrl || "https://t3.ftcdn.net/jpg/04/34/72/82/240_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg"}
                            alt="addImg"
                            height={100}
                          />
                        </div>
                        <div>
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
                </div>
                <hr/>
              <button className="btn" style={{backgroundColor:"blue", color:"white"}} onClick={(e) => submitEdit(e)}>수정</button>
              {/* <Button variant="primary" type="submit" >
                수정하기
              </Button> */}
            </Form>
            </div>
          </Modal>



          <Modal show={newShow} onHide={handleNewClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontWeight: 'bold' }}>
            FAQ 등록하기
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: 'red' }}>
          양식에 맞게 정보를 입력해주세요.
        </Modal.Body>
        <div style={{ width: '400px', margin: '50px', marginBottom: '20px' }}>
          <Form>
            <Form.Group controlId="formBasicName">
              <Form.Label style={formTitleStyle}>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="제목을 입력하세요."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <br />

`           <Form.Group controlId="formBasicContent">
              <Form.Label style={formTitleStyle}>Content</Form.Label>
              <Form.Control type="text" placeholder="내용을 입력해주세요." value={content} onChange={(e) => setContent(e.target.value)}/>
            </Form.Group><br/>
            <Form.Group controlId="formBasicRI">
            <div onDrop={onDropRep} onDragOver={onDragOverRep}>`
                <h1 style={formTitleStyle}>FAQ 첨부 이미지</h1>
                <p>
                  첨부 이미지를 끌어다가 올려주세요.
                  <br />
                  (우클릭시 이미지 빼기)
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                  <div>
                    <p>선택한 첨부 이미지</p>
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
              <Form.Group controlId="formBasicType">
                <Form.Label style={formTitleStyle}>타입</Form.Label>
                <Form.Control type="text" placeholder="FAQ 타입" value={type} onChange={(e) => setType(e.target.value)}/>
              </Form.Group><br/>
              <Form.Group controlId="formBasicIdx">
                <Form.Label style={formTitleStyle}>인덱스 설정</Form.Label>
                <Form.Control type="text" placeholder="글 게시 순서 지정해주세요." value={idx} onChange={(e) => setIdx(e.target.value)}/>
              </Form.Group><br/>

            <button
              className="btn"
              style={{ backgroundColor: 'blue', color: 'white' }}
              onClick={(e) => createFaq(e)}
            >
              등록
            </button>
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
export default Faq;