import React, { useState } from "react";
import alert from '../assets/iconAlert.svg';
import bell from '../assets/bell.png';
import anony from '../assets/anony.png';

import { ref, set, push, onValue, child, get, update, remove } from "firebase/database";
import { db } from "./firebase";
import { List } from "@mui/material";
import { useSelector } from 'react-redux';
import { RootState } from '../store/Auth';
import logo from '../assets/tifyLogo.svg';

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
  var userId = useSelector((state: RootState) => state.authToken.userId);
  // if(userEmail) {userEmail = userEmail.replace("@","-").replace(".","-");}

  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => {
    isNew = alert;
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

  var isNew:string = alert;
  onValue(mb, (snapshot) => {
        const data = snapshot.val();
        alarmsArray = Object?.keys(data)?.map(key => {
            if (data[key].state === false) {
                console.log("새 알람 발생");
                isNew = bell;
            }
            return { ...data[key], id: key } as Alarm;
            });
        alarmsArray.sort((a, b) => (a.time < b.time) ? 1 : -1);
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
        <div className="absolute bg-white py-2 rounded-lg shadow-xl"
                  style={{
                    backgroundColor:"#FAFAFA",
                    display: 'flex',
                    alignItems: 'center',
                    height: '500px',
                    // width: '200px',
                    position: 'absolute',
                    flexDirection : 'column',
                    overflowY: "auto",
                    left: "-200px",  /* set to a negative value */
            }}>
            { alarmsArray.length > 0 ? 
              alarmsArray.map((item) => (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '65px',
                    width: '250px',
                    position: 'relative',
                    flexDirection : 'row'}}>
                    <div style={{padding:"5px"}}>
                      <img style={{borderRadius: '50%', width: '40px', height: '40px',}} src={item.profile? item.profile:anony} alt="img"/>
                    </div>
                    <div style={{width:"150px"}}>
                      <div style={{fontWeight:"bold"}}>{item.title}</div>
                      <div>{item.text} <div style={{ fontSize:'5px', color: item.state ? "lightgray" : "red"}}>{ passedTime(Date.now() - item.time)}</div></div>
                    </div>

                    <div style={{ fontSize:'5px', width:"50px"}}>무언가 들어감.</div>
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
