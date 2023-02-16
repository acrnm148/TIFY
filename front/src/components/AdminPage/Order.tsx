import { useState, useEffect } from "react";

import { useSelector } from 'react-redux';
import { RootState } from '../../store/Auth';
import {useLocation  } from 'react-router-dom';
import { useNavigate } from 'react-router';

import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Search } from 'react-bootstrap-icons';
import {Modal, Form } from 'react-bootstrap';
import Swal from "sweetalert2";

export interface OrderForm {
  id?: string;
  createdDate? : string;
	deliveryNumber? : string;
	gatheredPrice? : string;
	orderPrice? : string;
	tel? : string;
  giftId? : string;
  userId? : string;
  modifiedDate? : string;
  createdAt? : string;
  createdTime? : string;
  wishId? : string;
  wishName?: string;
  giftName?: string;
  giftImgUrl?: string;
  wishFinishDate?: string;
  userOption?: string;
  state?:string;
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

const Order = () => {
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
    const [searchResults, setSearchResults] = useState<OrderForm[]|null>(null);
    const [page, setPage] = useState(0);
    // const [newImgs,setNewImgs] = useState<Array<pImg>>([]);
    const [totalPages, setTotalPages] = useState(0);
    const maxResults = 10;
    const baseUrl = "https://i8e208.p.ssafy.io/api/order";
    const sUrl = "https://i8e208.p.ssafy.io/api/admin/ordersearch"
    const bUrl = "https://i8e208.p.ssafy.io/api/admin/order"
    // const baseUrl = "http://localhost:8081/api/order";
    // const sUrl = "http://localhost:8081/api/admin/ordersearch"
    // const bUrl = "http://localhost:8081/api/admin/order"
    const [orderInfo, setOrderInfo] = useState<OrderForm> ({});// for 상품정보 edit

    const [newShow, setNewShow] = useState(false); // modal

    const [refresh, setRefresh] = useState<boolean>(false); //페이지 갱신용
    // Pagination
    const [nowPage, setNowPage] = useState<number>(0);
    const [pageRange, setPageRange] = useState<Array<Array<number>>>([[],])
    const [pageStates, setPageStates] = useState<{ [index: number]: boolean }>({},); // page 선택 여부.
    const [nowRange,setNowRange] = useState<Array<number>>([]);
    const [rangeIdx, setRangeIdx] = useState<number>(0);
    //관리자 인증
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
        Swal.fire("관리자 권한이 없습니다.");
        navigate('../login');
      }
    }, [location, navigate]);

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
        searchTerm=='' ? url=`${bUrl}`:url=`${sUrl}/${searchTerm}`
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

    const handleEdit = async (id: any) => {
        return await axios.get(`${baseUrl}/${id}`).then((res) => {
          let data = res.data
          setOrderInfo(data);
          return data
        });
    };
  
    const handleDelete = async (id : any) => {
        try {
            const response = await axios.delete(`${baseUrl}/${id}`);
            getData(page-1);
            console.log(`deleted order ${id}`)
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
    const handleShow = async (id:any) => {
      await handleEdit(id);
      setShow(true)
      setOpen(false)
    };


    const formTitleStyle = {
      color:"black",
      fontWeight:"bold"
    }

  const submitEdit = async (e:any) => {
    let id = orderInfo?.id;
    e.preventDefault();
    await axios.put(`${baseUrl}/${id}`,{ ...orderInfo })
    .then(
      (response) => {
        setOrderInfo(response.data);
        setRefresh(!refresh)
        handleClose();
        }
      );

  };

  const handleNewClose = () => {
    setRefresh(!refresh);
    setNewShow(false);
   };
  const handleNewShow = () => {
    setNewShow(true)
  };

    return (
        <div className="m-12">
            <div className="input-group mb-3">
              <Form.Control type="text" placeholder="유저 이메일로 검색하세요." value={searchTerm} onKeyUp={(e) => { if (e.key=="Enter") {getData(0)} }}  onChange={(e) => { e.preventDefault(); setSearchTerm(e.target.value)}}/>
              <button className="input-group-text"><Search size={24} style={{ margin: "0 auto" }} onClick={()=>getData(0)}/></button>
            </div>
            <table className="table table-hover" style={{backgroundColor: "white",color: "unset"}}>
            <thead>
                <tr>
                <th scope="col">Idx</th>
                <th scope="col">주문번호</th>
                <th scope="col">모인 금액</th>
                <th scope="col">주문 가격</th>
                <th scope="col">전화번호</th>
                <th scope="col">주문시각</th>
                <th scope="col">위시명</th>
                <th scope="col">기프트명</th>
                <th scope="col">주문상태</th>
                <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">0</th>
                    <th scope="col">145-489486</th>
                    <th scope="col">500,000</th>
                    <th scope="col">450,00</th>
                    <th scope="col">01049221157</th>
                    <th scope="col">23-02-10 1603</th>
                    <th scope="col">왈생일</th>
                    <th scope="col">라비누</th>
                    <th scope="col">1</th>
                    <td colSpan={2}>
                    <button className="btn" style={{backgroundColor:"blue", color:"white"}} onClick={() => handleShow(orderInfo.id)}>수정</button>
                        {/* <button className="btn" style={{backgroundColor:"blue", color:"white"}} onClick={() => setIsModalOpen(true)}>수정</button> */}
                    <button className="btn" style={{backgroundColor:"gray", color:"black"}}>삭제</button>
                    </td>
                </tr>
                {searchResults?.map((order:OrderForm,idx:any) => (
                <tr key={idx+1}>
                  <td>{idx+1}</td>
                  <td>
                    {order?.deliveryNumber}
                  </td>
                  <td>{order?.gatheredPrice}</td>
                  <td>{order?.orderPrice}</td>
                  <td>{order?.tel}</td>
                  <td>{order?.createdTime}</td>
                  <td>{order?.wishName}</td>
                  <td>{order?.giftName}</td>
                  <td>{order?.state}</td>

                  <td colSpan={2}>
                    <button className="btn" style={{backgroundColor:"blue", color:"white"}} onClick={() => handleShow(order?.id)}>수정</button>
                    <button className="btn" style={{backgroundColor:"gray", color:"black"}}
                        onClick={() => handleDelete(order?.id)}>삭제</button>
                  </td>
                </tr>
              ))}

            </tbody>
            </table>


          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title style={{fontWeight:"bold"}}>주문 수정</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{color:"red"}}>주문 상세 내용입니다.<br/></Modal.Body>
            <div style={{width:"400px", margin:"50px", marginBottom:"20px"}}>
            <Form>
              <Form.Group controlId="formPk">
                <Form.Label style={formTitleStyle}>Order_Id</Form.Label>
                <Form.Control type="text" placeholder="고유번호" value={orderInfo?.id} readOnly/>
              </Form.Group><br/>
              <Form.Group controlId="formTypeCD">
                <Form.Label style={formTitleStyle}>생성일</Form.Label>
                <Form.Control type="text" placeholder="생성일" value={orderInfo?.createdTime} readOnly/>
              </Form.Group><br/>
              <Form.Group controlId="formBasicDN">
                <Form.Label style={formTitleStyle}>주문번호</Form.Label>
                <Form.Control type="text" placeholder="주문번호" value={orderInfo?.deliveryNumber} onChange={(e) => { orderInfo.deliveryNumber = e.target.value; setOrderInfo({...orderInfo}) }}/>
              </Form.Group><br/>
              <Form.Group controlId="formBasicGP">
                <Form.Label style={formTitleStyle}>모인금액</Form.Label>
                <Form.Control type="text" placeholder="모인금액" value={orderInfo?.gatheredPrice} onChange={(e) => { orderInfo.gatheredPrice = e.target.value; setOrderInfo({...orderInfo}) }}/>
              </Form.Group><br/>
              <Form.Group controlId="formBasicOP">
                <Form.Label style={formTitleStyle}>주문금액</Form.Label>
                <Form.Control type="text" placeholder="주문금액" value={orderInfo?.orderPrice} onChange={(e) => { orderInfo.orderPrice = e.target.value; setOrderInfo({...orderInfo}) }}/>
              </Form.Group><br/>
              <Form.Group controlId="formBasicWP">
                <Form.Label style={formTitleStyle}>위시 PK</Form.Label>
                <Form.Control type="text" placeholder="wish PK" value={orderInfo?.wishId} readOnly/>
              </Form.Group><br/>
              <Form.Group controlId="formBasicWT">
                <Form.Label style={formTitleStyle}>위시명</Form.Label>
                <Form.Control type="text" placeholder="위시 제목" value={orderInfo?.wishName} readOnly/>
              </Form.Group><br/>
              <Form.Group controlId="formBasicGP">
                <Form.Label style={formTitleStyle}>선물 PK</Form.Label>
                <Form.Control type="text" placeholder="gift PK" value={orderInfo?.giftId} readOnly/>
              </Form.Group><br/>
              <Form.Group controlId="formBasicUO">
                <Form.Label style={formTitleStyle}>선물 옵션</Form.Label>
                <Form.Control type="text" placeholder="user option" value={orderInfo?.userOption} readOnly/>
              </Form.Group><br/>
              <Form.Group controlId="formBasicGT">
                <Form.Label style={formTitleStyle}>선물명</Form.Label>
                <Form.Control type="text" placeholder="gift name" value={orderInfo?.giftName} readOnly/>
                <img src={orderInfo?.giftImgUrl} alt="" />
              </Form.Group><br/>
              <Form.Group controlId="formBasicWFD">
                <Form.Label style={formTitleStyle}>위시 마감일</Form.Label>
                <Form.Control type="text" placeholder="wish_finish_date" value={orderInfo?.wishFinishDate} readOnly/>
              </Form.Group><br/>
              <Form.Group controlId="formBasicUK">
                <Form.Label style={formTitleStyle}>유저 PK</Form.Label>
                <Form.Control type="text" placeholder="user PK" value={orderInfo?.id} readOnly/>
              </Form.Group><br/>
              <Form.Group controlId="formBasicState">
                <Form.Label style={formTitleStyle}>주문상태</Form.Label>
                <Form.Control type="text" placeholder="order state" value={orderInfo?.state} onChange={(e) => { orderInfo.state = e.target.value; setOrderInfo({...orderInfo}) }}/>
              </Form.Group><br/>
              <Form.Group controlId="formBasicLMD">
                <Form.Label style={formTitleStyle}>마지막 수정일</Form.Label>
                <Form.Control type="text" placeholder="LMD" value={orderInfo?.modifiedDate} onChange={(e) => { orderInfo.modifiedDate = e.target.value; setOrderInfo({...orderInfo}) }}/>
              </Form.Group><br/>
              <button className="btn" style={{backgroundColor:"blue", color:"white"}} onClick={(e) => submitEdit(e)}>수정</button>
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
export default Order;