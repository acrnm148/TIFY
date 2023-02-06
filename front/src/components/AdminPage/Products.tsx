import React, { useState, useEffect, ReactEventHandler, useCallback } from "react";
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
import { NavLink } from 'react-router-dom';
import {Modal, Form, Collapse, Container, Row, Col} from 'react-bootstrap';
import { borderRadius } from "@mui/system";

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
    const [imgUrlS3, setImgUrlS3] = useState<string>(''); // img upload
    const [show, setShow] = useState(false); // modal
    const [open, setOpen] = useState(false); // img collapse
    const [files, setFiles] = useState<File[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<product[]|null>(null);
    const [page, setPage] = useState(1);
    const [newImgs,setNewImgs] = useState<pImg[]|null>(null);
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
        console.log(response.data);
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

    const handleClose = () => setShow(false);
    const handleShow = async (id:number) => {
      await handleEdit(id);
      setShow(true)
      setOpen(false)
    };

    const handleImgShow = (e) => {
      e.preventDefault();
      setOpen(!open)
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
  

      // 사진 등록
  const formData = new FormData();
  const handleChangeFile = async (idx:number) => {
    if (idx < files.length) {
      formData.append('file', files[idx]); // 파일 상태 업데이트
    }
    // imgFile 을 보내서 S3에 저장된 url받기
    const getImgUrl = async (idx) => {
      const API_URL = `https://i8e208.p.ssafy.io/api/files/upload/`;
      return await axios
        .post(API_URL, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((con) => {
          console.log('이미지주소불러오기 성공', con.data);
          setImgUrlS3(con.data);
          let temp:pImg = {
            idx, url:con.data
          };
          // setNewImgs(newImgs?.concat(temp));
          return con.data
        })
        .catch((err) => {
          console.log('이미지주소불러오기 실패', err);
        });
    };

  };

    const submitEdit = async (id: number) => {
      console.log(id);
      console.log("-----------------");
      const response = await axios.get(`${baseUrl}/product/${id}`);
      setProductInfo(response.data);
      console.log(response.data);
      return response.data;
          // <UserInfoEdit userInfo={selectUser} />
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
              {/* <ul>
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
              </ul> */}
            
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
              <div onDrop={onDrop} onDragOver={onDragOver}>
                <h1 style={formTitleStyle} >Product ImageList</h1>
                <p>Drag and drop your images here(max 9)</p>
                {/* auto 속성존재 */}
                <div style={{ display:"grid", width:"400px", margin: "0 auto", 
                  gridTemplateColumns:"repeat(3,1fr)", gridTemplateRows:"repeat(3, minmax(50px, auto))" 
                  , border:"1px solid", borderRadius:"5px", color:"lightgray"}}>
                    {files.length === 0 ? (
                      <div>
                      <h1>Add Image</h1>
                      <img style={{width:"100px",height:"100px"}}
                              src="data:image/png;base64,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"
                              alt="addImg"
                              height={100}
                              />
                      </div>
                    ) : (
                    files.map((file, index) => {
                      return (
                          <div key={index}>
                            <p>{index + 1}. {file.name}</p>
                            <img style={{width:"100px",height:"100px"}}
                              src={URL.createObjectURL(file)}
                              alt={file.name}
                              height={100}
                              onContextMenu={e => {
                                e.preventDefault();
                                setFiles(prevFiles => prevFiles.filter(prevFile => prevFile !== file));
                              }}/>
                          </div>
                        );}
                    ))}
                </div>
              </div>
              <button className="btn" block="true" style={{backgroundColor:"black", color:"white", marginTop:"10px"}}
                onClick={handleImgShow}
                aria-controls="example-collapse-text"
                aria-expanded={open}>
                Show old images
              </button>
              <Collapse in={open}>
                <div>
                  {
                    productInfo?.imgList?.map((val,idx) => {
                      return (
                          <>
                          <h2 style={{fontWeight:"bold"}}>{val.idx+1} 번 이미지</h2>
                          <img key={val.url} src={val.url} alt={val.url}/>
                          </>
                      )
                    })
                  }
                </div>
                </Collapse><br/><br/>
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