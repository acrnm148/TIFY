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
import {Button, Modal, Form, Collapse} from 'react-bootstrap';

interface product {
  id:number;
  name:string;
  repImg:string;
  quantity:number;
  price:number;
  category:string;
  likeCount:number;
}

interface pImg {
  idx?:string;
  url?:string;
  id?:string;
}

interface productDetail {
  id?:string;
  name?:string;
  repImg?:string;
  imgList?:pImg[];
  quantity?:string;
  price?:string;
  description?:string;
  category?:string;
  options?:any;
  likeCount?:string;
}

const Products = () => {
    
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<product[]|null>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const maxResults = 10;
    const baseUrl = "https://i8e208.p.ssafy.io/api/gifthub";

    // for 상품정보 edit
    const [productInfo, setProductInfo] = useState<productDetail|null> (null);
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
  
    const handleEdit = async (id: number) => {
        console.log(id);
        console.log("-----------------");
        const response = await axios.get(`${baseUrl}/product/${id}`);
        setProductInfo(response.data);
        console.log(response.data)
        return response.data;
            // <UserInfoEdit userInfo={selectUser} />
    };
  
    const handleDelete = async (id : number) => {
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
    const [show, setShow] = useState(false); // modal
    const [open, setOpen] = useState(false); // img collapse

    const handleClose = () => setShow(false);
    const handleShow = async (id:number) => {
      await handleEdit(id);
      setShow(true)
      setOpen(false)
    };

    const handleImgShow = (e:Event) => {
      e.preventDefault();
      setOpen(!open)
    };
  


    const formTitleStyle = {
      color:"black",
      fontWeight:"bold"
    }
    const [files, setFiles] = useState<File[]>([]);

    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const droppedFiles = Array.from(e.dataTransfer.files);
      setFiles(droppedFiles);
    };
  
    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
    };
  
    return (
        <div className="m-12">
            <div className="input-group mb-3">
                <div className="form-floating">
                    <input type="text" className="form-control" id="floatingInputGroup1" placeholder="Username"/>
                </div>
                <button className="input-group-text"><Search size={24} style={{ margin: "0 auto" }} /></button>
            </div>
            {/* <td colSpan={2}>Larry the Bird</td> */}
            <div onDrop={onDrop} onDragOver={onDragOver}>
              <h1>Image Upload</h1>
              <p>Drag and drop your images here</p>
              <ul>
                {files.map((file, index) => (
                  <li key={index}>
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      height={100}
                    />
                    <p>{file.name}</p>
                  </li>
                ))}
              </ul>
            </div>
            <table className="table table-hover" style={{backgroundColor: "white",color: "unset"}}>
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
                    <button className="btn" style={{backgroundColor:"blue", color:"white"}} onClick={() => handleShow(1)}>수정</button>
                        {/* <button className="btn" style={{backgroundColor:"blue", color:"white"}} onClick={() => setIsModalOpen(true)}>수정</button> */}
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
                        onClick={() => handleDelete(item?.id)}>삭제</button>
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
              <Modal.Title style={{fontWeight:"bold"}}>상품정보 수정</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{color:"red"}}>양식에 맞게 정보를 입력해주세요.<br/>특히 option 정보는 입력 양식에 주의바랍니다!</Modal.Body>
            <div style={{width:"400px", margin:"50px", marginBottom:"20ps"}}>
            <Form>
              <Form.Group controlId="formPk">
                <Form.Label style={formTitleStyle}>Pk</Form.Label>
                <Form.Control type="text" placeholder="상품 고유번호" value={productInfo?.id} readOnly/>
              </Form.Group><br/>
              <Form.Group controlId="formBasicName">
                <Form.Label style={formTitleStyle}>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Name" value={productInfo?.name}/>
              </Form.Group><br/>
              <Form.Group controlId="formBasicEmail">
                <Form.Label style={formTitleStyle}>RepImg</Form.Label>
                <Form.Control type="file"/>
              </Form.Group><br/>
              <Form.Group controlId="formBasicImgList">
                <Form.Label style={formTitleStyle}>imgList</Form.Label>
                <Form.Control type="file" multiple/>
                <button className="btn" block="true" style={{backgroundColor:"black", color:"white", marginTop:"10px"}}
                  onClick={handleImgShow}
                  aria-controls="example-collapse-text"
                  aria-expanded={open}>
                  Show old images
                </button>
                <Collapse in={open}>
                  <div visibility={"collapse"}>
                    {
                      productInfo?.imgList?.map((val,idx) => {
                        return (
                          <div style={{ border:"1px solid", marginBottom:"20px" }}>
                            <h2 style={{fontWeight:"bold"}}>{val.idx} 번 이미지</h2>
                            <img key={val.url} src={val.url} alt={val.url} />
                          </div>
                          
                        )
                      })
                    }
                  </div>
                </Collapse>
              </Form.Group><br/>
              <Form.Group controlId="formBasicQuantity">
                <Form.Label style={formTitleStyle}>Quantity</Form.Label>
                <Form.Control type="text" placeholder="quantity" value={productInfo?.quantity}/>
              </Form.Group><br/>
              <Form.Group controlId="formBasicPrice">
                <Form.Label style={formTitleStyle}>Price</Form.Label>
                <Form.Control type="text" placeholder="price 000 won" value={productInfo?.price}/>
              </Form.Group><br/>
              <Form.Group controlId="formBasicDesc">
                <Form.Label style={formTitleStyle}>description</Form.Label>
                <Form.Control type="text" placeholder="product description" value={productInfo?.description}/>
              </Form.Group><br/>
              <Form.Group controlId="formBasicCategory">
                <Form.Label style={formTitleStyle}>category</Form.Label>
                <Form.Control type="text" placeholder="category code" value={productInfo?.category}/>
              </Form.Group><br/>
              <Form.Group controlId="formBasicLC">
                <Form.Label style={formTitleStyle}>likeCount</Form.Label>
                <Form.Control type="text" placeholder="1" readOnly value={productInfo?.likeCount}/>
              </Form.Group><br/>
              <Form.Group controlId="formBasicOpts">
                <Form.Label style={formTitleStyle}>Options</Form.Label>
                <Form.Control type="text" placeholder="Options json array form" value={productInfo?.options}/>
              </Form.Group>

              <h1>dsadss</h1>
              <button className="btn" block="true" style={{backgroundColor:"blue", color:"white"}}>수정</button>
              {/* <Button variant="primary" type="submit" >
                수정하기
              </Button> */}
            </Form>
            </div>
          </Modal>

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