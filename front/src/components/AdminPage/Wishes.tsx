import React, { useState, useEffect} from "react";

import { ref, set, push, onValue, child, get, update, remove } from "firebase/database";
import { List } from "@mui/material";
import { useSelector } from 'react-redux';
import { RootState } from '../../store/Auth';

import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Search } from 'react-bootstrap-icons';
import { NavLink } from 'react-router-dom';
import {Modal, Form, Collapse, Container, Row, Col} from 'react-bootstrap';
import {GiftItem, GiftOption, Wish, User} from './AdTypes'

const formTitleStyle = {
  color:"black",
  fontWeight:"bold"
}
function getPageRanges(n: number): number[][] {
  const pageRanges: number[][] = [];
  for (let i = 1; i <= n; i += 10) {
    pageRanges.push(Array.from({ length: 10 }, (_, j) => i + j).filter(x => x <= n));
  }
  return pageRanges;
}
const Wishes = () => {
    const [show, setShow] = useState(false); // modal
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<Array<Wish>|null>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [wishInfo, setWishInfo] = useState<Wish|null>(null);
    const [title,setTitle] = useState<string>('')
    const [content,setContent] = useState<string>('')
    const [finishYN,setfinishYN] = useState<string>('')
    const [endDate,setEndDate] = useState<string>('')
    const [cardImageCode,setCardImageCode] = useState<string>('')
    const [addr1,setAddr1] = useState<string>('')
    const [addr2,setAddr2] = useState<string>('')
    const [zipCode,setZipCode] = useState<string>('')
    const [category,setCategory] = useState<string>('')
    const [id,SetId] = useState<number>(0)
    // Pagination
    const [nowPage, setNowPage] = useState<number>(0);
    const [pageRange, setPageRange] = useState<Array<Array<number>>>([[],])
    const [pageStates, setPageStates] = useState<{ [index: number]: boolean }>({},); // page 선택 여부.
    const [nowRange,setNowRange] = useState<Array<number>>([]);
    const [rangeIdx, setRangeIdx] = useState<number>(0);
    
    const [refresh, setRefresh] = useState<boolean>(false);
    useEffect(() => {
      getData(page)}, [refresh]);
      useEffect(()=>{
        setNowRange([...pageRange[0]])
      }, [totalPages]) //한 함수안에 related useState를 동시에 넣으면 안된다.!
  
    const maxResults = 10;
    const baseUrl = "https://i8e208.p.ssafy.io/api/admin";
    // const baseUrl = "http://localhost:8081/api/admin";
    const getData = async (page: number) => {
      try {
        let url;
        searchTerm=='' ? url=`${baseUrl}/wish`:url=`${baseUrl}/wishsearch/${searchTerm}`
        const response = await axios.get(url, {
          // params: {page,},
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

    // 수정하기 위한 단일 정보 받아오기
    const handleEdit = async (id: number|undefined) => {
      console.log(id);
      console.log("-----------------");
      const response = await axios.get(`${baseUrl}/wish/${id}`).then((res) => {
        let data = res.data;
        SetId(data.id);
        setTitle(data.title);
        setContent(data.content);
        setfinishYN(data.finishYN);
        setEndDate(data.endDate);
        setCardImageCode(data.cardImageCode);
        setAddr1(data.addr1);
        setAddr2(data.addr2);
        setZipCode(data.zipCode);
        setCategory(data.category);
        return data
      });
      setWishInfo(response);
      console.log(response);
      return response.data;
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

    const handleDelete = async (id: number|undefined) => {
        console.log(id);
        try {
            const response = await axios.delete(`${baseUrl}/wish/${wishInfo?.id}`);
            getData(page);
            console.log(`deleted wish ${id}`)
            return response;
        } catch (error) {
            console.error(error);
        }
    };

    const handleClose = () => setShow(false);
    const handleShow = async (id:number|undefined) => {
      await handleEdit(id);
      setShow(true);
    };

    const handleSubmit = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      console.log("-----------------sssssssssss");
      console.log(wishInfo?.id);
      const response = await axios.put(`${baseUrl}/wish/${id}`,
      {...wishInfo,title,content,finishYN,endDate,cardImageCode,
      addr1,addr2,zipCode,category}).then((res) => {console.log(res); return res;});
      console.log("0--=====================");
      console.log(wishInfo)
      setWishInfo(response.data);
      console.log(response.data);
      setShow(false);
      setRefresh(!refresh);
      return response.data;
    };



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
                  <td>{wish?.title}</td>
                  <td>{wish?.totPrice}</td>
                  <td>{wish?.nowPrice}</td>
                  <td>{wish?.finishYN}</td>
                  <td>{wish?.endDate}</td>
                  <td>{wish?.category}</td>
                  <td colSpan={2}>
                    <button className="btn" style={{backgroundColor:"blue", color:"white"}} onClick={() => handleShow(wish?.id)}>수정</button>
                    <button className="btn" style={{backgroundColor:"gray", color:"black"}}
                        onClick={() => handleDelete(wish?.id)}>삭제</button>
                  </td>
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

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title style={{fontWeight:"bold"}}>위시정보 수정</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{color:"red"}}>양식에 맞게 정보를 입력해주세요.<br/>특히 option 정보는 입력 양식에 주의바랍니다!</Modal.Body>
              <div style={{width:"400px", margin:"50px", marginBottom:"20ps"}}>
                <Form>
                  <Form.Group controlId="formPk">
                    <Form.Label style={formTitleStyle}>Pk</Form.Label>
                    <Form.Control type="text" placeholder="위시 고유번호" value={wishInfo?.id} readOnly/>
                  </Form.Group><br/>
                  <Form.Group controlId="formBasicName">
                    <Form.Label style={formTitleStyle}>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter Name" value={title} onChange={(e) => {setTitle(e.target.value)}} />
                  </Form.Group><br/>
                  <Form.Group controlId="formBasicContent">
                    <Form.Label style={formTitleStyle}>Content</Form.Label>
                    <Form.Control type="text" placeholder="content" value={content} onChange={(e) => {setContent(e.target.value)}}/>
                  </Form.Group><br/>
                  <Form.Group controlId="formBasicPrice">
                    <Form.Label style={formTitleStyle}>totPrice</Form.Label>
                    <Form.Control type="text" placeholder="price 000 won" value={wishInfo?.totPrice} readOnly/>
                  </Form.Group><br/>
                  <Form.Group controlId="formBasicPrice">
                    <Form.Label style={formTitleStyle}>nowPrice</Form.Label>
                    <Form.Control type="text" placeholder="price 000 won" value={wishInfo?.nowPrice} readOnly/>
                  </Form.Group><br/>
                  <Form.Group controlId="formBasicJoinCount">
                    <Form.Label style={formTitleStyle}>JoinCount</Form.Label>
                    <Form.Control type="text" placeholder="Join Count" value={wishInfo?.joinCount} readOnly/>
                  </Form.Group><br/>
                  <Form.Group controlId="formBasicYN">
                    <Form.Label style={formTitleStyle}>finishYN</Form.Label>
                    <Form.Control type="text" placeholder="Is it finished?" readOnly value={finishYN} onChange={(e) => {setfinishYN(e.target.value)}}/>
                  </Form.Group><br/>
                  <Form.Group controlId="formBasicCD">
                    <Form.Label style={formTitleStyle}>CreateDate</Form.Label>
                    <Form.Control type="text" placeholder="CreateDate" value={wishInfo?.createDate} readOnly/>
                  </Form.Group><br/>
                  <Form.Group controlId="formBasicSD">
                    <Form.Label style={formTitleStyle}>StartDate</Form.Label>
                    <Form.Control type="text" placeholder="StartDate" value={wishInfo?.startDate} readOnly/>
                  </Form.Group><br/>
                  <Form.Group controlId="formBasicED">
                    <Form.Label style={formTitleStyle}>EndDate</Form.Label>
                    <Form.Control type="text" placeholder="EndDate" value={endDate} onChange={(e) => {setEndDate(e.target.value)}}/>
                  </Form.Group><br/>
                  <Form.Group controlId="formBasicCC">
                    <Form.Label style={formTitleStyle}>CartImg Code</Form.Label>
                    <Form.Control type="text" placeholder="CIC" value={cardImageCode} onChange={(e) => {setCardImageCode(e.target.value)}}/>
                  </Form.Group><br/>
                  <Form.Group controlId="formBasicA1">
                    <Form.Label style={formTitleStyle}>Addr1</Form.Label>
                    <Form.Control type="text" placeholder="Address" value={addr1} onChange={(e) => {setAddr1(e.target.value)}}/>
                  </Form.Group><br/>
                  <Form.Group controlId="formBasicA2">
                    <Form.Label style={formTitleStyle}>Addr2</Form.Label>
                    <Form.Control type="text" placeholder="Address" value={addr2} onChange={(e) => {setAddr2(e.target.value)}}/>
                  </Form.Group><br/>
                  <Form.Group controlId="formBasicZC">
                    <Form.Label style={formTitleStyle}>ZipCode</Form.Label>
                    <Form.Control type="text" placeholder="write zip code" value={zipCode} onChange={(e) => {setZipCode(e.target.value)}}/>
                  </Form.Group><br/>
                  <Form.Group controlId="formBasicCategory">
                    <Form.Label style={formTitleStyle}>category</Form.Label>
                    <Form.Control type="text" placeholder="category code" value={category} onChange={(e) => {setCategory(e.target.value)}}/>
                  </Form.Group><br/>
                  <button className="btn" style={{backgroundColor:"blue", color:"white"}} onClick={(e) => handleSubmit(e)}>수정</button>
                </Form>
              </div>
            </Modal>

        </div>
      );
}
export default Wishes;