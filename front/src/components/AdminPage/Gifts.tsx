import React, { useState,useEffect } from "react";

import { ref, set, push, onValue, child, get, update, remove } from "firebase/database";
import { List } from "@mui/material";
import { useSelector } from 'react-redux';
import { RootState } from '../../store/Auth';

import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Search } from 'react-bootstrap-icons';
import { NavLink } from 'react-router-dom';
import {Modal, Form, Collapse, Container, Row, Col} from 'react-bootstrap';
import { GiftItem, GiftOption, Wish, User } from './AdTypes';
import { borderRadius } from "@mui/system";

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

const Gifts = () => {
    const [show, setShow] = useState(false); // modal
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<Array<GiftItem>|null>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [GiftItemInfo, setGiftItemInfo] = useState<GiftItem|null>(null);

    const [productId,setProductId] = useState<string>('')
    const [quantity,setQuantity] = useState<string>('')
    const [userOption,setUserOption] = useState<string>('')
    const [giftname,setGiftname] = useState<string>('')
    const [type,setType] = useState<string>('')
    const [finishYN,setFinishYN] = useState<string>('')
    const [maxAmount,setMaxAmount] = useState<string>('')
    const [purePrice,setPurePrice] = useState<string>('')
    const [gathered,setGathered] = useState<string>('')
    const [successYN,setSuccessYN] = useState<string>('')
    const [idx,setIdx] = useState<string>('')
    const [finishDate,setFinishDate] = useState<string>('')
    const [giftImgUrl,setGiftImgUrl] = useState<string>('')
    const [giftUrl,setGiftUrl] = useState<string>('')
    const [giftOptions,setGiftOptions] = useState<Array<GiftOption>>([]);
    const [id,setId] = useState<string>('')
    const [userEmail, setUserEmail] = useState<string>('')
    // Pagination
    const [nowPage, setNowPage] = useState<number>(0);
    const [pageRange, setPageRange] = useState<Array<Array<number>>>([[],])
    const [pageStates, setPageStates] = useState<{ [index: number]: boolean }>({},); // page 선택 여부.
    const [nowRange,setNowRange] = useState<Array<number>>([]);
    const [rangeIdx, setRangeIdx] = useState<number>(0);

    const maxResults = 10;
    const baseUrl = "https://i8e208.p.ssafy.io/api/gift";
    // const baseUrl = "http://localhost:8081/api/gift";
    // const sUrl = "http://localhost:8081/api/admin/giftsearch"
    const sUrl = "https://i8e208.p.ssafy.io/api/admin/giftsearch"

    useEffect(()=>{
      setNowRange([...pageRange[0]])
    }, [totalPages]) //한 함수안에 related useState를 동시에 넣으면 안된다.!

    const getData = async (page: number) => {
      try {
        let url;
        searchTerm=='' ? url=`${baseUrl}`:url=`${sUrl}/${searchTerm}`
        const response = await axios.get(`${url}`, {
          params: {page,},
        }).then((res) => {
          setSearchResults(res.data.content);
          if (totalPages != res.data.totalPages) {
            setTotalPages(res.data.totalPages);
            setPageRange( getPageRanges(res.data.totalPages) ); 
            let pageSelect:{ [index: number]: boolean } = {};
            pageSelect[1]=true;
            for (let i=2; i<=res.data.totalPages; i++) {
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
    const handleEdit = async (pk: number|undefined) => {
      console.log(pk);
      console.log("-----------------");
      const response = await axios.get(`${baseUrl}/admin/${pk}`).then((res) => {
        console.log(res)
        let data = res.data;
        setId(data.id || id)
        setProductId(data.productId || productId);
        setQuantity(data.quantity || quantity);
        setFinishYN(data.finishYN || finishYN);
        setUserOption(data.userOption || userOption);
        setType(data.Type || type);
        setMaxAmount(data.maxAmount || maxAmount);
        setPurePrice(data.purePrice || purePrice);
        setGathered(data.gathered || gathered);
        setSuccessYN(data.successYN || successYN);
        setIdx(data.Idx || idx);
        setFinishDate(data.FinishDate || finishDate);
        setGiftImgUrl(data.giftImgUrl || giftImgUrl);
        setGiftUrl(data.giftUrl || giftUrl);
        setGiftname(data.giftname || giftname);
        // setGiftOptions(data.Options || giftOptions);
        setGiftItemInfo(data);
        return data
      });
      setGiftItemInfo(response.data);
      console.log(response);
      return response;
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
            const response = await axios.delete(`${baseUrl}/gift/${id}`);
            getData(page);
            console.log(`deleted gift ${id}`)
            return response;
        } catch (error) {
            console.error(error);
        }
    };

    const handleClose = () => {
      setId('')
      setProductId('');
      setQuantity('');
      setFinishYN('');
      setUserOption('');
      setType('');
      setMaxAmount('');
      setPurePrice('');
      setGathered('');
      setSuccessYN('');
      setIdx('');
      setFinishDate('');
      setGiftImgUrl('');
      setGiftUrl('');
      setShow(false);
    }
    const handleShow = async (id:number|undefined) => {
      await handleEdit(id);
      setShow(true);
    };

    const handleSubmit = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      console.log("-----------------sssssssssss");
      const response = await axios.put(`${baseUrl}/detail/${id}`,
      {...GiftItemInfo,productId,quantity,finishYN,userOption,giftname,type,maxAmount,purePrice,
      gathered,idx,giftImgUrl,giftUrl}).then((res) => {console.log(res); return res;});
      console.log("0--=====================")
      console.log(GiftItemInfo)
      setGiftItemInfo(response.data);
      console.log(response.data);
      setShow(false);
      return response.data;
    };

    return (
        <div className="m-12">
            <div className="input-group mb-3">
              <Form.Control type="text" placeholder="Giftname으로 검색하세요." value={searchTerm} onKeyUp={(e) => { if (e.key=="Enter") {getData(0)} }}  onChange={(e) => { e.preventDefault(); setSearchTerm(e.target.value)}}/>
              <button className="input-group-text"><Search size={24} style={{ margin: "0 auto" }} onClick={()=>getData(0)}/></button>
            </div>
            {/* <td colSpan={2}>Larry the Bird</td> */}
            <table className="table table-hover">
            <thead>
                <tr>
                <th scope="col">Idx</th>
                <th scope="col">GiftId</th>
                <th scope="col">GiftImg</th>
                <th scope="col">Giftname</th>
                <th scope="col">totPrice</th>
                <th scope="col">nowPrice</th>
                <th scope="col">finishYN</th>
                <th scope="col">endDate</th>
                <th scope="col">category</th>
                </tr>
            </thead>
            <tbody>
                {searchResults?.map((gift,idx:any) => (
                <tr key={idx+1}>
                  <td style={{whiteSpace:"normal", textOverflow: "ellipsis", width:"50px"}}>{idx+1}</td>
                  <td >
                    {gift?.id}
                  </td>
                  <td>
                    {gift?.giftImgUrl ? <img style={{borderRadius: '50%', width: '50px', height: '50px',}} src={gift?.giftImgUrl} alt="" /> 
                    : <img style={{borderRadius: '50%', width: '50px', height: '50px',}} src="data:image/jpeg;base64,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" alt="" /> }
                  </td>
                  <td >
                    {gift?.giftname}
                  </td>
                  <td>{gift?.quantity}</td>
                  <td>{gift?.maxAmount}</td>
                  <td>{gift?.purePrice}</td>
                  <td>{gift?.finishYN}</td>
                  <td>{gift?.successYN}</td>
                  <td>{gift?.idx}</td>
                  <td colSpan={2}>
                    <button className="btn" style={{backgroundColor:"blue", color:"white"}} onClick={() => handleShow(parseInt(gift?.id))}>수정</button>
                    <button className="btn" style={{backgroundColor:"gray", color:"black"}}
                        onClick={() => handleDelete(parseInt(gift?.id))}>삭제</button>
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
                <Modal.Title style={{fontWeight:"bold"}}>기프트 정보 수정</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{color:"red"}}>양식에 맞게 정보를 입력해주세요.<br/>특히 option 정보는 입력 양식에 주의바랍니다!</Modal.Body>
              <div style={{width:"400px", margin:"50px", marginBottom:"20ps"}}>
                {giftImgUrl ? <img src={giftImgUrl} alt="" /> : <img src="data:image/jpeg;base64,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" alt="" /> }
                <Form onSubmit={(e) => e.preventDefault}>
                  <Form.Group controlId="formPk">
                    <Form.Label style={formTitleStyle}>Pk</Form.Label>
                    <Form.Control type="text" placeholder="기프트 고유번호" value={id} readOnly/>
                  </Form.Group><br/>
                  <Form.Group controlId="formBasicGiftName">
                    <Form.Label style={formTitleStyle}>giftName</Form.Label>
                    <Form.Control type="text" placeholder="기프트 이름" value={giftname} onChange={(e) => {setGiftname(e.target.value)}} />
                  </Form.Group><br/>
                  <Form.Group controlId="formBasicPI">
                    <Form.Label style={formTitleStyle}>productId</Form.Label>
                    <Form.Control type="text" placeholder="Enter product Id" value={productId} onChange={(e) => {setProductId(e.target.value)}} />
                  </Form.Group><br/>
                  <Form.Group controlId="formBasicQuantity">
                    <Form.Label style={formTitleStyle}>quantity</Form.Label>
                    <Form.Control type="text" placeholder="quantity" value={quantity} onChange={(e) => {setQuantity(e.target.value)}}/>
                  </Form.Group><br/>
                  <Form.Group controlId="formBasicMA">
                    <Form.Label style={formTitleStyle}>maxAmount</Form.Label>
                    <Form.Control type="text" placeholder="Max Amount" value={maxAmount} readOnly/>
                  </Form.Group><br/>
                  <Form.Group controlId="formBasicPP">
                    <Form.Label style={formTitleStyle}>purePrice</Form.Label>
                    <Form.Control type="text" placeholder="PurePrice 000 won" value={purePrice} onChange={(e) => {setMaxAmount( (parseInt(e.target.value)*1.05).toString() ); setPurePrice(e.target.value)}}/>
                  </Form.Group><br/>
                  <Form.Group controlId="formBasicSYN">
                    <Form.Label style={formTitleStyle}>successYN</Form.Label>
                    <Form.Control type="text" placeholder="successYN" value={GiftItemInfo ? GiftItemInfo?.successYN:"" } readOnly/>
                  </Form.Group><br/>
                  <Form.Group controlId="formBasicYN">
                    <Form.Label style={formTitleStyle}>finishYN</Form.Label>
                    <Form.Control type="text" placeholder="Is it finished?" readOnly value={GiftItemInfo ? GiftItemInfo?.finishYN:""}/>
                  </Form.Group><br/>
                  <Form.Group controlId="formBasicCD">
                    <Form.Label style={formTitleStyle}>idx</Form.Label>
                    <Form.Control type="text" placeholder="Index" value={idx} onChange={(e) => {setIdx(e.target.value)}}/>
                  </Form.Group><br/>
                  <Form.Group controlId="formBasicSD">
                    <Form.Label style={formTitleStyle}>StartDate</Form.Label>
                    <Form.Control type="text" placeholder="StartDate" value={GiftItemInfo ? GiftItemInfo?.finishDate:""} readOnly/>
                  </Form.Group><br/>
                  <Form.Group controlId="formBasicFD">
                    <Form.Label style={formTitleStyle}>FinishDate</Form.Label>
                    <Form.Control type="text" placeholder="FinishDate" value={finishDate} onChange={(e) => {setFinishDate(e.target.value)}}/>
                  </Form.Group><br/>
                  <Form.Group controlId="formBasicGU">
                    <Form.Label style={formTitleStyle}>giftUrl</Form.Label>
                    <Form.Control type="text" placeholder="CIC" value={giftUrl} onChange={(e) => {setGiftUrl(e.target.value)}}/>
                  </Form.Group><br/>
                  <Form.Group controlId="formBasicIU">
                    <Form.Label style={formTitleStyle}>giftImgUrl</Form.Label>
                    <Form.Control type="text" placeholder="IU" value={giftImgUrl} onChange={(e) => {setGiftImgUrl(e.target.value)}}/>
                  </Form.Group><br/>
                  <Form.Group controlId="formBasicType">
                    <Form.Label style={formTitleStyle}>Type</Form.Label>
                    <Form.Control type="text" placeholder="Type" value={type} onChange={(e) => {setType(e.target.value)}}/>
                  </Form.Group><br/>
                  <div>
                    <h2 style={{fontWeight:"bold"}}>옵션은 대분류-소분류-가격(원) 양식으로 기입해주세요.<br/> 구분은 , 로 해주세요.</h2>
                    <p>ex. Color-White-500, Size-Large-100</p>
                  </div>
                  <Form.Group controlId="formBasicUO">
                    <Form.Label style={formTitleStyle}>UserOption</Form.Label>
                    <textarea placeholder="User Option here" value={type} 
                    onChange={(e) => {setType(e.target.value)}}
                    style={{height:"100px", border:"1px lightgray solid", width:"100%", borderRadius:"10px"}}></textarea>
                  </Form.Group><br/>

                  {/* <Form.Group controlId="formBasicA1">
                    <Form.Label style={formTitleStyle}>Addr1</Form.Label>
                    <Form.Control type="text" placeholder="Address" value={giftOptions} onChange={(e) => {setGiftOptions(e.target.value)}}/>
                  </Form.Group><br/> */}
                  <button className="btn" style={{backgroundColor:"blue", color:"white"}} onClick={(e) => handleSubmit(e)}>수정</button>
                </Form>
              </div>
            </Modal>

        </div>
      );
}
export default Gifts;