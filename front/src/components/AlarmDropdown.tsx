import React, { useState } from "react";
import alert from '../assets/iconAlert.svg';
import bell from '../assets/alert.svg';
import anony from '../assets/anony.png';

import { ref, set, push, onValue, child, get, update, remove } from "firebase/database";
import { db } from "./firebase";
import { List } from "@mui/material";
import { useSelector } from 'react-redux';
import { RootState } from '../store/Auth';
import logo from '../assets/tifyLogo.svg';
import axios from "axios";

import "../css/AlramDropDown.styles.css"

interface Alarm {
    [key: string]: any;
    id: string;
  }
const updateData = (dataid:string,data:Alarm,userId:string) => {
    //data는 email 기준 조회합니다.
    data.state = true;
    console.log(data);
    console.log("/test/tify/"+userId+"/"+dataid);
    return update(
        ref(db, "/test/tify/"+userId+"/"+dataid),
        data
    );
};

const AlarmDropdown = () => {
  const [accept, setAccept] = useState<boolean>(false)
  var userId = useSelector((state: RootState) => state.authToken.userId);
  // if(userEmail) {userEmail = userEmail.replace("@","-").replace(".","-");}
  const accessToken = useSelector(
    (state: RootState) => state.authToken.accessToken,
  );

  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => {
    setIsNew(alert);
    if (showDropdown){
      alarmsArray.map((val,idx) => {
        if ( alarmsArray[idx].state === false ){
            updateData(alarmsArray[idx].id,alarmsArray[idx],userId);
        }
      })
    }
    setShowDropdown(!showDropdown);
    console.log(alarmsArray);
    };

  const mb = ref(db, "/test/tify/"+userId);
  // const mb = ref(db, "/test/tify/");

  var alarmsArray: Alarm[] = [];

  const [isNew, setIsNew] = useState<string>(alert);
  onValue(mb, (snapshot) => {
        const data = snapshot.val();
        alarmsArray = Object?.keys(data)?.map(key => {
            if (data[key].state === false) {
                console.log("새 알람 발생");
            }
            return { ...data[key], id: key } as Alarm;
            });
        alarmsArray.sort((a, b) => (a.time < b.time) ? 1 : -1);
        // setIsNew(bell);
        console.log(alarmsArray)
    });

  const readOne = () => {
    const dbRef = ref(db);
    get(child(dbRef, "test/tify/rkdrlgks321-naver-com"))
      .then(snapshot => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }``
    })
      .catch(error => {
      console.error(error);
    });
  };
  readOne();

  const passedTime = (timeDiff : number) : string => {
    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    const month = 30 * day;
    let timeString;

    if (timeDiff < minute) {
      timeString = "Just before";
    } else if (timeDiff < hour) {
      timeString = `${Math.round(timeDiff / minute)} minutes ago`;
    } else if (timeDiff < day) {
      timeString = `${Math.round(timeDiff / hour)} hours ago`;
    } else if (timeDiff < month) {
      timeString = `${Math.round(timeDiff / day)} days ago`;
    } else {
      timeString = "A long time ago";
    }
    return timeString;
  }

  return (
    <div className="relative">
      <img
        src={isNew}
        className="logo logo-right cursor-pointer"
        alt="Tify logo"
        onClick={toggleDropdown}
      />
      {showDropdown && (
        <div className="dropdown-con rounded-lg shadow-xl">
            { alarmsArray.length > 0 ? 
              alarmsArray.map((item) => (
                <div className="alarm-contents" >
                  <div className="alarm-contents-left">
                    <div style={{padding:"5px", paddingTop:"10px"}}>
                      <img style={{borderRadius: '50%', width: '40px', height: '40px', backgroundColor:"white"}} src={item.profile? item.profile:anony} alt="img"/>
                    </div>
                    <div style={{}}>
                      <div style={{fontWeight:"bold",paddingTop:"5px"}}>{item.title}</div>
                      <div>{item.text} <div style={{ padding:"5px", fontSize:'5px', color: item.state ? "lightgray" : "red"}}>{ passedTime(Date.now() - item.time)}</div></div>
                    </div>
                  </div>
                    <div style={{minWidth:"36px", display:"felx"}}>
                      {item.friend&&
                        item.friend == 'req' &&
                          // <div style={{ fontSize:'5px', width:"50px"}}>.</div>
                          <button className="accept-btn" onClick={()=>(
                            handleAcceptFriend(item.friendName, item.friendId, accessToken),
                            setAccept(true)
                          )
                          }>{accept?'친구':'수락'}</button>
                      }
                    </div>
                </div>
            ))
            :
            (                 
              <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '250px',
                    width: '250px',
                    position: 'relative',
                    justifyContent: 'center',
                    flexDirection : 'column'}}
                    >
                    <div>
                      <img src={logo} alt="" style={{ filter:"grayscale(100%)"}} />
                    </div>
                    <h1 style={{fontSize:"1rem", fontWeight:"bolder", color:"gray"}}>새로운 알림이 없습니다.</h1>
                    <p style={{fontSize:"0.5rem", color:"#A4A4A4"}}>나와 관련된 중요한 알림을 한꺼번에<br/>모아서 확인할 수 있습니다.</p>
                </div> )
          
          }
            </div>
      )}
    </div>
  );
};

export default AlarmDropdown;
const pushData = (friendName:string, friendId:number) => {
  let base = "/test/tify/"; 
  push(ref(db, base + friendId), {
    text: friendName+'님이 친구요청을 수락했습니다.',
    interval: "Daily",
    time : Date.now(),
  });
  console.log('친구요청수락함')
};
const handleAcceptFriend = async (friendName:string,friendId: number, accessToken:any) => {
  try {
    const response = await axios.post(
      `https://i8e208.p.ssafy.io/api/friends/accept`,
      {
        friendId: friendId,
        accepted: true,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-type': 'application/json',
        },
      },
    );
    // 친구수락 받는 사람한테 알림
    pushData(friendName, friendId)
  } catch (error) {
    console.log(error);
  }
};