import React, {
  useState,
  useEffect,
  ReactEventHandler,
  useCallback,
  ReactHTMLElement,
} from 'react';
import alert from '../../assets/iconAlert.svg';
import bell from '../../assets/bell.png';
import anony from '../../assets/anony.png';

import {
  ref,
  set,
  push,
  onValue,
  child,
  get,
  update,
  remove,
} from 'firebase/database';
import { List } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/Auth';

import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Justify, Search } from 'react-bootstrap-icons';
import { NavLink } from 'react-router-dom';
import {Modal, Form, Collapse, Container, Row, Col, ListGroup} from 'react-bootstrap';
import { borderRadius } from "@mui/system";
import { now } from 'moment';





interface product {
  id: number;
  name: string;
  repImg: string;
  quantity: number;
  price: number;
  category: string;
  likeCount: number;
}

interface pImg {
  idx?: number;
  url?: string;
  id?: number;
}
interface Option {
  id?: number;
  idx?: number;
  title: string;
  details: Array<OptionDetail>;
}
interface OptionDetail {
  id?: number;
  content: string;
  value: string;
  idx: number;
}
interface productDetail {
  id?: number;
  name?: string;
  repImg?: string;
  imgList?: Array<pImg>;
  quantity?: string;
  price?: string;
  description?: string;
  category?: string;
  options?: Array<Option>;
  likeCount?: string;
}

const Products = () => {
  const [options, setOptions] = useState<Array<Option>>([]); // for Option
  const [imgUrlS3, setImgUrlS3] = useState<string>(''); // img upload
  const [show, setShow] = useState(false); // modal
  const [open, setOpen] = useState(false); // img collapse
  const [files, setFiles] = useState<File[]>([]); // img list
  const [Rfiles, setRFiles] = useState<File[]>([]); // repImg
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<product[] | null>(null);
  const [page, setPage] = useState(1);
  const [newImgs, setNewImgs] = useState<Array<pImg>>([]);
  const [totalPages, setTotalPages] = useState(0);
  const maxResults = 10;
  const baseUrl = "https://i8e208.p.ssafy.io/api/gifthub";
  // const baseUrl = 'http://localhost:8081/api/gifthub';
  const [productInfo, setProductInfo] = useState<productDetail | null>(null); // for 상품정보 edit

  const [name, setName] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [openStates, setOpenStates] = useState<{ [index: string]: boolean }>({},);

    const [addOpt, setAddOpt] = useState<string>('');
    const [addODC, setAddODC] = useState<string>("");
    const [addODV,setAddODV] = useState<string>("");
    const [addODI,setAddODI] = useState<string>("");
  // Pagination
  const [nowPage, setNowPage] = useState<number>();
  const pamount = 10
  const [nowStartNum, setNowStartNum] = useState<number>(1)
  const [nowLastNum, setNowLastNum] = useState<number>(1)

  ////////////////////// 상품 등록용 state
  const [newProductInfo, setNewProductInfo] = useState<productDetail | null>({});
  const [newShow, setNewShow] = useState(false); // modal
  const [newName, setNewName] = useState<string>('');
  const [newQuantity, setNewQuantity] = useState<string>('');
  const [newPrice, setNewPrice] = useState<string>('');
  const [newCategory, setNewCategory] = useState<string>('');
  const [newDescription, setNewDescription] = useState<string>('');
  const [repImg, setRepImg] = useState<string>('');
  
  const [newOpenStates, setNewOpenStates] = useState<{ [index: string]: boolean }>({},);
  const toggleNewCollapse = (index: number) => {
    setNewOpenStates({
      ...newOpenStates,
      [index]: !newOpenStates[index],
    });
  };
  const [refresh, setRefresh] = useState<boolean>(false);
  useEffect(() => {
    getData(page)}, [refresh]);

  const toggleCollapse = (index: number) => {
    setOpenStates({
      ...openStates,
      [index]: !openStates[index],
    });
  };

  const GoToNextPage = () =>{
    let target = nowLastNum+1
    // if(target)
    setNowPage(target)
    getData(target-1)
    console.log(nowStartNum, pamount, "---------------")
    setNowStartNum(target)
    if (nowLastNum + pamount > totalPages) { setNowLastNum(totalPages) }
    else {setNowLastNum(nowLastNum+pamount) }
   }
   const GoToBeforePage = () =>{
    let target = nowStartNum-pamount
    if(target < 1){
      return
    }
    setNowPage(target)
    getData(target-1)
    setNowLastNum(nowStartNum-1)
    setNowStartNum(target)
   }


  const handleNewClose = () => {
    console.log(newImgs);
    console.log("저장은되냐?");
    setNewShow(false);
   }
  const handleNewShow = () => {
    setAddOpt('')
    setFiles([])
    setRFiles([])
    setNewImgs([])
    setOptions([])
    setAddODC("")
    setAddODV("")
    setAddODI("")
    setNewName('')
    setNewQuantity('');
    setNewPrice('');
    setNewCategory('');
    setNewDescription('');
    setNewShow(true)
  };
  const createProduct = async (e: any) => {
    e.preventDefault();
    await getImgUrl_one();
    await Promise.all(files.map(async (val, idx) => {
      return await getImgUrl(idx);
    })).then(() => {
      console.log("image translation finish");
    });
    const response = await axios.post(`${baseUrl}/product`,{
      name:newName,
      quantity:newQuantity,
      price:newPrice,
      category:newCategory,
      description:newDescription,
      repImg,
      imgList:newImgs,
      likeCount:0,
      options
    })
    .then(
      (response) => {
        console.log(response);
        console.log("상품 등록 요청 완료");
        return response;
      });

    setAddOpt('')
    setFiles([])
    setRFiles([])
    setNewImgs([])
    setOptions([])
    setAddODC("")
    setAddODV("")
    setAddODI("")
    setNewName('')
    setNewQuantity('');
    setNewPrice('');
    setNewCategory('');
    setNewDescription('');
    handleNewClose();
    // <UserInfoEdit userInfo={selectUser} />
  };

  // const handleOptions = async (event:React.ChangeEvent) => {
  //   setProductInfo({...productInfo, options:(event.target as HTMLInputElement).value});
  // };
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
      let url;
      searchTerm=='' ? url=`${baseUrl}/products`:url=`${baseUrl}/search/${searchTerm}`
      const response = await axios.get(`${url}`, {
        params: {
          page,
          max_result: 20,
        },
      }).then((res) => {
        console.log(res,"페이지 찐정보"); 
        setSearchResults(res.data.content);
        setTotalPages(res.data.totalPages);
        (page<=pamount && res.data.totalPages <= pamount) ? setNowLastNum(res.data.totalPages) : setNowLastNum(10*(page/10+1)) 
        console.log(totalPages,nowLastNum,"페이지 정보")
        return res});
      return response.data.content;
    } catch (error) {
      console.error(error);
    }
  };
  if (searchResults === null) {
    getData(0);
  }

  // const searchDataByName = async (page: number) => {
  //   let urls;
  //   if (searchTerm.trim() == "" || searchTerm==null) {
  //     urls = `${baseUrl}/products`
  //   }
  //   else {
  //     urls = `${baseUrl}/search/${searchTerm}`
  //   }
  //   try {
  //     const response = await axios.get(urls, {
  //       params: {
  //         page,
  //         max_result: 20,
  //       },
  //     }
  //     );
  //     setSearchResults(response.data.content);
  //     setTotalPages(response.data.totalPages);
  //     console.log(response.data);
  //     console.log("----------- page info")
  //     return response.data.content;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const PageButtons = ({ totalPages }: { totalPages: number }) => {
    let buttons = [];
    for (let i = nowStartNum; i <= nowLastNum; i++) {
      buttons.push(
        <li className="page-item" key={i}>
          <button
            className="page-link"
            onClick={() => {
              // setPage(i - 1);
              setNowPage(i);
              if (searchTerm.trim() == "" || searchTerm==null) {
                getData(i - 1);
              }
            }}
          >
            {i}
          </button>
        </li>,
      );
    }
    return <>{buttons}</>;
  };


  const handleEdit = async (id: number) => {
    console.log(id);
    console.log('-----------------');
    const response = await axios.get(`${baseUrl}/product/${id}`).then((res) => {
      let data = res.data;
      setName(data.name);
      setCategory(data.category);
      setQuantity(data.quantity);
      setPrice(data.price);
      setDescription(data.description);
      setOptions(data.options);
      for (let i = 0; i < options.length; i++) {
        setOpenStates({
          ...openStates,
          [i]: false,
        });
      }
      return data;
    });
    setProductInfo(response);
    console.log(response);
    return response;
    // <UserInfoEdit userInfo={selectUser} />
  };

  const handleDelete = async (id: number) => {
    console.log(id);
    try {
      const response = await axios.delete(`${baseUrl}/product/${id}`);
      getData(page - 1);
      console.log(`deleted user ${id}`);
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
      setAddOpt('')
      setFiles([])
      setRFiles([])
      setNewImgs([])
      setAddODC("")
      setAddODV("")
      setAddODI("")
      setShow(true)
      setOpen(false)
    };

  const handleImgShow = (e: any) => {
    e.preventDefault();
    setOpen(!open);
  };

  const formTitleStyle = {
    color: 'black',
    fontWeight: 'bold',
  };

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
        setProductInfo({ ...productInfo, repImg: con.data });
        setRepImg(con.data);
        console.log(con);
        console.log('대표이미지 성공');
        // setNewImgs(newImgs?.concat(temp));
        return con.data;
      })
      .catch((err) => {
        console.log('이미지주소불러오기 실패', err);
      });
  };
  const getImgUrl = async (idx: number) => {
    let formData = new FormData();
    formData.append('file', files[idx]); // 파일 상태 업데이트
    const API_URL = `https://i8e208.p.ssafy.io/api/files/upload/`;
    return await axios
      .post(API_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((con) => {
        console.log('이미지주소불러오기 성공', con.data);
        // setImgUrlS3(con.data);
        let temp: pImg = {
          url: con.data,
          idx: idx,
        };
        newImgs.push(temp);
        setNewImgs([...newImgs]); // 이미지 추가추가
        console.log(newImgs);
        console.log("추가되는 이미지들 인데욥?");
        // setNewImgs(newImgs?.concat(temp));
        return temp;
      })
      .catch((err) => {
        console.log('이미지주소불러오기 실패', err);
      });
  };
  // setProductInfo({...productInfo, imgList:})

  const submitEdit = async (e: any) => {
    let id = productInfo?.id;
    e.preventDefault();

    console.log('-----------------');
    console.log(id);
    if (Rfiles.length > 0) {
      await getImgUrl_one();
    }
    await Promise.all(files.map(async (val, idx) => {
      return await getImgUrl(idx);
    })).then(() => {
      console.log("finish");
    });
    // files.map(async (val, idx) => {
    //   await getImgUrl(idx);
    // })
    setProductInfo({...productInfo,imgList:newImgs})
    await axios.put(`${baseUrl}/product`,{...productInfo,repImg,imgList:newImgs, options, quantity})
    .then(
      (response) => {
        console.log(response);
        console.log("요청 보낸겁니다.");
        setProductInfo(response.data);
      });
    handleClose();
    // <UserInfoEdit userInfo={selectUser} />
  };

  const addOption = (title:string) => {
    setOptions([...options,{
      idx:options.length+1,
      title:title,
      details: []
    }])
  }

  const addOptionDetail = (pos:number,content:string, value:string) => {
    options[pos].details.push({
      idx:options[pos].details.length+1,
      content,
      value,
    })
    setOptions([...options])
    openStates[pos] = true;
    setOpenStates({...openStates})
  }

  const deleteOption = (idx:number) => {
    options.splice(idx,1);
    setOptions([...options]);
  }
  // 마지막 idx 녀석만 삭제
  const deleteOptionDetail = (pos:number) => {
    options[pos].details.pop();
    openStates[pos] = true;
    setOptions([...options]);
    setOpenStates({...openStates})

  }



  return (
    <div className="m-12">
      <div className="input-group mb-3">
          <Form.Control type="text" placeholder="상품명으로 검색하세요." value={searchTerm} onKeyUp={(e) => { if (e.key=="Enter") {getData(0)} }}  onChange={(e) => { e.preventDefault(); setSearchTerm(e.target.value)}}/>
          <button className="input-group-text"><Search size={24} style={{ margin: "0 auto" }} onClick={()=>getData(0)}/></button>
      </div>
      <button
                  className="btn"
                  style={{ backgroundColor: '#FA4141', color: 'white' }}
                  onClick={() => handleNewShow()}
                >상품 등록</button>
      <hr />
      <table
        className="table table-hover"
        style={{ backgroundColor: 'white', color: 'unset' }}
      >
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
          {/* <tr>
            <th scope="row">0</th>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">quantity</th>
            <th scope="col">price</th>
            <th scope="col">category</th>
            <th scope="col">likeCount</th>
            <td colSpan={2}>
              <button
                className="btn"
                style={{ backgroundColor: 'blue', color: 'white' }}
                onClick={() => handleShow(1)}
              >
                수정
              </button>
              <button
                className="btn"
                style={{ backgroundColor: 'gray', color: 'black' }}
              >
                
              </button>
            </td>
          </tr> */}
          {searchResults?.map((item: product, idx: any) => (
            <tr key={`${idx + 1}${Date.now()}`}>
              <td>{idx + 1}</td>
              <td>{item?.id}</td>
              <td>{item?.name}</td>
              <td>{item?.quantity}</td>
              <td>{item?.price}</td>
              <td>{item?.category}</td>
              <td>{item?.likeCount}</td>

              <td colSpan={2}>
                {/* <NavLink to={`/admin/users/${user.id}`} > */}
                <button
                  className="btn"
                  style={{ backgroundColor: 'blue', color: 'white' }}
                  onClick={() => handleShow(item?.id)}
                >
                  수정
                </button>
                {/* </NavLink> */}
                <button
                  className="btn"
                  style={{ backgroundColor: 'gray', color: 'black' }}
                  onClick={() => handleDelete(item?.id)}
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
      {/* <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          /> */}
      {/* <button onClick={handleCreate}>Create</button> */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontWeight: 'bold' }}>
            상품정보 수정
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: 'red' }}>
          양식에 맞게 정보를 입력해주세요.
          <br />
          특히 option 정보는 입력 양식에 주의바랍니다!
        </Modal.Body>
        <div style={{ width: '400px', margin: '50px', marginBottom: '20px' }}>
          <Form>
            <Form.Group controlId="formPk">
              <Form.Label style={formTitleStyle}>Pk</Form.Label>
              <Form.Control
                type="text"
                placeholder="상품 고유번호"
                value={productInfo?.id}
                readOnly
              />
            </Form.Group>
            <br />
            <Form.Group controlId="formBasicName">
              <Form.Label style={formTitleStyle}>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <br />
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
                      src={productInfo?.repImg || "https://t3.ftcdn.net/jpg/04/34/72/82/240_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg"}
                      alt="addImg"
                      height={100}
                    />
                  </div>
                  <div>
                    <p>선택한 대표 이미지</p>
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
              <div onDrop={onDrop} onDragOver={onDragOver}>
                <h1 style={formTitleStyle} >Product ImageList</h1>
                <p>Drag and drop your images here(max /9)<br/>(우클릭시 이미지 빼기)</p>
                { <h1>{files.length} / 9 개</h1> }
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
              <button className="btn" style={{backgroundColor:"black", color:"white", marginTop:"10px"}}
                onClick={handleImgShow}
                aria-controls="example-collapse-text"
                aria-expanded={open}>
                Show old images ({productInfo?.imgList?.length})
              </button>
              <Collapse in={open}>
                <div>
                  {
                    productInfo?.imgList?.map((val,idx) => {
                      return (
                          <div style={{visibility: "visible"}} key={`${idx + 1}${Date.now()}`}>
                          <h2 style={{fontWeight:"bold"}}>{val?.idx} 번 이미지</h2>
                          <img key={val.url} src={val.url} alt={val.url} />
                          </div>
                      )
                    })
                  }
                </div>
                </Collapse><br/><br/>
              <Form.Group controlId="formBasicQuantity">
                <Form.Label style={formTitleStyle}>Quantity</Form.Label>
                <Form.Control type="text" placeholder="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
              </Form.Group><br/>
              <Form.Group controlId="formBasicPrice">
                <Form.Label style={formTitleStyle}>Price</Form.Label>
                <Form.Control type="text" placeholder="price 000 won" value={price} onChange={(e) => setPrice(e.target.value)}/>
              </Form.Group><br/>
              <Form.Group controlId="formBasicDesc">
                <Form.Label style={formTitleStyle}>description</Form.Label>
                <Form.Control type="text" placeholder="product description" value={description} onChange={(e) => setDescription(e.target.value)}/>
              </Form.Group><br/>
              <Form.Group controlId="formBasicCategory">
                <Form.Label style={formTitleStyle}>category</Form.Label>
                <Form.Control type="text" placeholder="category code" value={category} onChange={(e) => setCategory(e.target.value)}/>
              </Form.Group><br/>
              <Form.Group controlId="formBasicLC">
                <Form.Label style={formTitleStyle}>likeCount</Form.Label>
                <Form.Control type="text" placeholder="1" readOnly value={productInfo?.likeCount}/>
              </Form.Group><br/>
              <Form.Group controlId="formBasicOpts">
                <Form.Label style={formTitleStyle}>Options
                  <button onClick={(e) => {e.preventDefault(); addOption(addOpt);}}
                        style={{ backgroundColor:"white", width:"20px", marginLeft:"10px",
                        borderRadius:"5px", border:"1px lightgray solid" }}>+</button>
                </Form.Label>
                <Form.Control type="text" placeholder="추가할 옵션 대분류명" value={addOpt} onChange={(e) => setAddOpt(e.target.value)}/>
                <br />
                { options.length > 0 &&
                 ( <>
                <Form.Label style={formTitleStyle}>OptionDetail
                <button onClick={(e) => {
                  let vari = parseInt(addODI);
                  e.preventDefault();
                  if ( ( vari>(-1) ) && (vari < options.length) ) {
                    addOptionDetail(vari, addODC, addODV);
                  } }}
                    style={{backgroundColor:"white", width:"20px", marginLeft:"10px",
                    borderRadius:"5px", border:"1px lightgray solid"}}>+</button>
                </Form.Label>

                <div>
                  <Form.Control type="text" placeholder="옵션 세부 추가할 대분류 idx" value={addODI} onChange={(e) => setAddODI(e.target.value)}/>
                  <Form.Control type="text" placeholder="옵션 세부 내용" value={addODC} onChange={(e) => setAddODC(e.target.value)}/>
                  <Form.Control type="text" placeholder="옵션 세부 추가금액" value={addODV} onChange={(e) => setAddODV(e.target.value)}/>
                  <br/>
                </div>
                </>)
                }


                <ListGroup>
                {options.map((val, index) => (
                  <div key={`${val.title} ${Date.now()}`}>
                    <h1></h1>
                    <ListGroup.Item style={{backgroundColor:"lightgrey", cursor:"pointer"}} onClick={(e) => {e.preventDefault(); toggleCollapse(index)}}>
                      옵션명 - {index} : {val.title}
                      <button onClick={(e) => {
                              e.preventDefault();
                                deleteOptionDetail(index);}}
                                style={{backgroundColor:"white", width:"20px", marginLeft:"10px",
                                borderRadius:"5px", border:"1px lightgray solid"}}>-</button>
                      <button onClick={(e) => {
                              e.preventDefault();
                                deleteOption(index);}}
                                style={{backgroundColor:"white", width:"20px", marginLeft:"10px",
                                borderRadius:"5px", border:"1px lightgray solid"}}>x</button>
                      <Form.Control type="text" placeholder="옵션 대분류명 변경 (Enter 입력)" onChange={(e) => {options[index].title=e.target.value}}
                      onKeyUp={(e) => { if (e.key == "Enter") {setOptions([...options])}  }}/>
                      </ListGroup.Item>
                    {/* <button style={{border:"1px solid black", borderRadius:"10px", color:"black"}} >옵션명 : {val.title}</button> */}
                    <h1>{openStates.index}</h1>
                    <Collapse in={openStates[index]}>
                      <div style={{visibility: "visible"}}>
                        {
                          val.details.map((detail,didx) => (
                            <ListGroup.Item key={`${didx*100}${Date.now()}`}>
                              <p style={{fontWeight:"bolder"}} >detail - {detail.idx}</p>
                              <Form.Control type="text" placeholder="옵션 세부 idx" value={options[index].details[didx].idx} onChange={(e) => {options[index].details[didx].idx = parseInt(e.target.value); setOptions([...options])} }/>
                              <p style={{textOverflow: "ellipsis", overflow: "hidden"}}>content: {detail.content}</p>
                              <Form.Control type="text" placeholder="옵션 세부 내용" value={options[index].details[didx].content} onChange={(e) => {options[index].details[didx].content = e.target.value; setOptions([...options])} }/>
                              <p>price: {detail.value} 원 </p>
                              <Form.Control type="text" placeholder="옵션 세부 추가금액" value={options[index].details[didx].value} onChange={(e) => {options[index].details[didx].value = e.target.value; setOptions([...options])} }/>
                            </ListGroup.Item>
                            // <div key={detail.id}>
                            //   <h1>detail {detail.content}</h1>
                            // </div>
                          ))
                        }
                      </div>
                    </Collapse>
                  </div>
                ))}
                </ListGroup>
                {/* <Form.Control type="text" placeholder="Options json array form" value={options} onChange={(e) => handleOptions(e)}/> */}
              </Form.Group> <br/>

            <button
              className="btn"
              style={{ backgroundColor: 'blue', color: 'white' }}
              onClick={(e) => submitEdit(e)}
            >
              수정
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
              
              (nowLastNum < totalPages) &&
              <a className="page-link" onClick={(e)=>{e.preventDefault(); GoToNextPage()}}>
                Next
              </a>
            }

          </li>
        </ul>
      </nav>

      <Modal show={newShow} onHide={handleNewClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontWeight: 'bold' }}>
            상품 등록하기
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: 'red' }}>
          양식에 맞게 정보를 입력해주세요.
          <br />
          특히 option 정보는 입력 양식에 주의바랍니다!
        </Modal.Body>
        <div style={{ width: '400px', margin: '50px', marginBottom: '20px' }}>
          <Form>
            <Form.Group controlId="formBasicName">
              <Form.Label style={formTitleStyle}>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </Form.Group>
            <br />
            <Form.Group controlId="formBasicRI">
              <div onDrop={onDropRep} onDragOver={onDragOverRep}>
                <h1 style={formTitleStyle}>Product RepImg</h1>
                <p>
                  Drag and drop your RepImg
                  <br />
                  (우클릭시 이미지 빼기)
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                  <div>
                    <p>선택한 대표 이미지</p>
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
              <div onDrop={onDrop} onDragOver={onDragOver}>
                <h1 style={formTitleStyle} >Product ImageList</h1>
                <p>Drag and drop your images here(max /9)<br/>(우클릭시 이미지 빼기)</p>
                { <h1>{files.length} / 9 개</h1> }
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
                          <div key={`${index}${Date.now()}`}>
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
              <Form.Group controlId="formBasicQuantity">
                <Form.Label style={formTitleStyle}>Quantity</Form.Label>
                <Form.Control type="text" placeholder="quantity" value={newQuantity} onChange={(e) => setNewQuantity(e.target.value)}/>
              </Form.Group><br/>
              <Form.Group controlId="formBasicPrice">
                <Form.Label style={formTitleStyle}>Price</Form.Label>
                <Form.Control type="text" placeholder="price 000 won" value={newPrice} onChange={(e) => setNewPrice(e.target.value)}/>
              </Form.Group><br/>
              <Form.Group controlId="formBasicDesc">
                <Form.Label style={formTitleStyle}>description</Form.Label>
                <Form.Control type="text" placeholder="product description" value={newDescription} onChange={(e) => setNewDescription(e.target.value)}/>
              </Form.Group><br/>
              <Form.Group controlId="formBasicCategory">
                <Form.Label style={formTitleStyle}>category</Form.Label>
                <Form.Control type="text" placeholder="category code" value={newCategory} onChange={(e) => setNewCategory(e.target.value)}/>
              </Form.Group><br/>
              <Form.Group controlId="formBasicOpts">
                <Form.Label style={formTitleStyle}>Options
                  <button onClick={(e) => {e.preventDefault(); addOption(addOpt);}}
                        style={{ backgroundColor:"white", width:"20px", marginLeft:"10px",
                        borderRadius:"5px", border:"1px lightgray solid" }}>+</button>
                </Form.Label>
                <Form.Control type="text" placeholder="추가할 옵션 대분류명" value={addOpt} onChange={(e) => setAddOpt(e.target.value)}/>
                <br />
                { options.length > 0 &&
                ( <>
                <Form.Label style={formTitleStyle}>OptionDetail
                <button onClick={(e) => {
                  let vari = parseInt(addODI);
                  e.preventDefault();
                  if ( ( vari>(-1) ) && (vari < options.length) ) {
                    addOptionDetail(vari, addODC, addODV);
                  } }}
                    style={{backgroundColor:"white", width:"20px", marginLeft:"10px",
                    borderRadius:"5px", border:"1px lightgray solid"}}>+</button>
                </Form.Label>

                <div>
                  <Form.Control type="text" placeholder="옵션 세부 추가할 대분류 idx" value={addODI} onChange={(e) => setAddODI(e.target.value)}/>
                  <Form.Control type="text" placeholder="옵션 세부 내용" value={addODC} onChange={(e) => setAddODC(e.target.value)}/>
                  <Form.Control type="text" placeholder="옵션 세부 추가금액" value={addODV} onChange={(e) => setAddODV(e.target.value)}/>
                  <br/>
                </div>
                </>)
                }


                <ListGroup>
                {options.map((val, index) => (
                  <div key={`${val.title} ${Date.now()}`}>
                    <h1></h1>
                    <ListGroup.Item style={{backgroundColor:"lightgrey", cursor:"pointer"}} onClick={(e) => {e.preventDefault(); toggleCollapse(index)}}>
                      옵션명 - {index} : {val.title}
                      <button onClick={(e) => {
                              e.preventDefault();
                                deleteOptionDetail(index);}}
                                style={{backgroundColor:"white", width:"20px", marginLeft:"10px",
                                borderRadius:"5px", border:"1px lightgray solid"}}>-</button>
                      <button onClick={(e) => {
                              e.preventDefault();
                                deleteOption(index);}}
                                style={{backgroundColor:"white", width:"20px", marginLeft:"10px",
                                borderRadius:"5px", border:"1px lightgray solid"}}>x</button>
                      <Form.Control type="text" placeholder="옵션 대분류명 변경 (Enter 입력)" onChange={(e) => {options[index].title=e.target.value}}
                      onKeyUp={(e) => { if (e.key == "Enter") {setOptions([...options])}  }}/>
                      </ListGroup.Item>
                    {/* <button style={{border:"1px solid black", borderRadius:"10px", color:"black"}} >옵션명 : {val.title}</button> */}
                    <h1>{openStates.index}</h1>
                    <Collapse in={openStates[index]}>
                      <div style={{visibility: "visible"}}>
                        {
                          val.details.map((detail,didx) => (
                            <ListGroup.Item key={`${didx+100}${Date.now()}`}>
                              <p style={{fontWeight:"bolder"}} >detail - {detail.idx}</p>
                              <Form.Control type="text" placeholder="옵션 세부 idx" value={options[index].details[didx].idx} onChange={(e) => {options[index].details[didx].idx = parseInt(e.target.value); setOptions([...options])} }/>
                              <p style={{textOverflow: "ellipsis", overflow: "hidden"}}>content: {detail.content}</p>
                              <Form.Control type="text" placeholder="옵션 세부 내용" value={options[index].details[didx].content} onChange={(e) => {options[index].details[didx].content = e.target.value; setOptions([...options])} }/>
                              <p>price: {detail.value} 원 </p>
                              <Form.Control type="text" placeholder="옵션 세부 추가금액" value={options[index].details[didx].value} onChange={(e) => {options[index].details[didx].value = e.target.value; setOptions([...options])} }/>
                            </ListGroup.Item>
                            // <div key={detail.id}>
                            //   <h1>detail {detail.content}</h1>
                            // </div>
                          ))
                        }
                      </div>
                    </Collapse>
                  </div>
                ))}
                </ListGroup>
                {/* <Form.Control type="text" placeholder="Options json array form" value={options} onChange={(e) => handleOptions(e)}/> */}
              </Form.Group> <br/>

            <button
              className="btn"
              style={{ backgroundColor: 'blue', color: 'white' }}
              onClick={(e) => createProduct(e)}
            >
              등록
            </button>
            {/* <Button variant="primary" type="submit" >
                수정하기
              </Button> */}
          </Form>
        </div>
        </Modal>

    </div>
  );
};
export default Products;

/////////////////////////////////////////////////////////////////////////////////////////////////////////

















