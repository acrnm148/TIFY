import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

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

const UserInfoEdit = (userInfo : UserDetailInfo) => {
  const location = useLocation();
  const baseUrl = "https://i8e208.p.ssafy.io/api/admin";

  const [id, setId] = useState(userInfo?.id);
  const [userid, setUserid] = useState(userInfo?.userid);
  const [password, setPassword] = useState(userInfo?.password);
  const [roles, setRoles] = useState(userInfo?.roles);
  const [provider, setProvider] = useState(userInfo?.provider);
  const [nickname, setNickname] = useState(userInfo?.nickname);
  const [profileImg, setProfileImg] = useState(userInfo?.profileImg);
  const [username, setUsername] = useState(userInfo?.username);
  const [birth, setBirth] = useState(userInfo?.birth);
  const [email, setEmail] = useState(userInfo?.email);
  const [tel, setTel] = useState(userInfo?.tel);
  const [addr1, setAddr1] = useState(userInfo?.addr1);
  const [addr2, setAddr2] = useState(userInfo?.addr2);
  const [zipcode, setZipcode] = useState(userInfo?.zipcode);
  const [birthYear, setBirthYear] = useState(userInfo?.birthYear);
  const [gender, setGender] = useState(userInfo?.gender);
  const [emailAuth, setEmailAuth] = useState(userInfo?.emailAuth);
  const [createTime, setCreateTime] = useState(userInfo?.createTime);
  const [roleList, setRoleList] = useState(userInfo?.roleList);
  const [userData, setUserData] = useState<UserDetailInfo>({
    id: id,
    userid: userid,
    password: password,
    roles: roles,
    provider: provider,
    nickname: nickname,
    profileImg: profileImg,
    username: username,
    birth: birth,
    email: email,
    tel: tel,
    addr1: addr1,
    addr2: addr2,
    zipcode: zipcode,
    birthYear: birthYear,
    gender: gender,
    emailAuth: emailAuth,
    createTime: createTime,
    roleList: roleList,
  });
  

  const handleSubmit = async (event: React.FormEvent) =>{
    event.preventDefault();
    let arr = location.pathname.split('/');
    let userPk = arr[arr.length-1];
    // Add code to submit the updated user info to your API
    try {
        console.log({...userData})
        const response = await axios.put(`${baseUrl}/user/${userPk}`,{
            ...userData
        });
        return console.log(response.data)
      } catch (error) {
        console.error(error);
      }
  };



  const getDetail = async () => {
    let arr = location.pathname.split('/');
    let userPk = arr[arr.length-1];
    try {
        const response = await axios.get(`${baseUrl}/user/${userPk}`);
        setUserData(response.data);
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error(error);
      }
  }
  
  if (userData.id === undefined ) {getDetail()}

  const MakeSubmitForm = ( {userData} : any ) => {
    let fields = ["id","userid","password","roles","provider","nickname","profileImg","username","birth","email","tel",
    "addr1","addr2","zipcode","birthYear","gender","emailAuth","createTime","roleList"];
    let forms:any = [];
    fields.map((val,idx) => {
        forms.push(
            <div>
                <div className="form-group">
                <label htmlFor={val}>{val.toUpperCase()}</label>
                <input 
                type="text" 
                className="form-control" 
                id={val} 
                value={userData[val]}
                onChange={e => setUserData({ ...userData, [val]: e.target.value })}
                />
                </div>
            </div>

        )
    })
    return (
        <>
            {forms}
        </>
        )
  }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <MakeSubmitForm userData={userData} />
            <button className="btn btn-primary" type="submit" style={{color:"black"}}>수정</button>
        </form>
    </div>

    );
}

export default UserInfoEdit;