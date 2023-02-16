import { useState, useEffect } from "react";
import alert from '../assets/iconAlert.svg';
import bell from '../assets/bell.png';
import anony from '../assets/anony.png';

import { ref, push, onValue, child, get, update } from "firebase/database";
import { db } from "./firebase";
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
  const [isNew, setIsNew] = useState<string>(alert)
  const accessToken = useSelector(
    (state: RootState) => state.authToken.accessToken,
  );
  const [showDropdown, setShowDropdown] = useState(false);
  const mb = ref(db, "/test/tify/"+userId);
  const [alarmsArray, setAlarmsArray] = useState<Alarm[]>([]);

  const readOne = () => {
    get(mb)
      .then(snapshot => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const newAlarmsArray = Object?.keys(data)?.map((key) => {
          if (data[key].state === false) {
            console.log('새 알람 발생');
            setIsNew(bell);
          }
          return { ...data[key], id: key } as Alarm;
        });
        newAlarmsArray.sort((a, b) => (a.time < b.time ? 1 : -1));
        setAlarmsArray(newAlarmsArray);
      } else {
        console.log("No data available");
      }
    })
      .catch(error => {
      console.error(error);
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      readOne()
    }, 3000);
    return () => clearInterval(interval);
  }, [alarmsArray]);




  // view 
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
                    height: '500px',
                    width: '20vw',
                    position: 'absolute',
                    zIndex: '100',
                    flexDirection : 'column',
                    overflowY: "auto", //  넘치는거 스크롤
                    left: "-200px",  /* set to a negative value */
            }}>
            { alarmsArray.length > 0 ? 
              alarmsArray.map((item) => (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '6em',
                    width: '100%',
                    position: 'relative',
                    flexDirection : 'row',
                    justifyContent: 'spaceBetween'}}
                    key={item.id}>
                    <div style={{padding:"5px"}}>
                      <img style={{borderRadius: '50%', width: '40px', height: '40px',}} src={item.profile? item.profile:anony} alt="img"/>
                    </div>
                    <div style={{}}>
                      <div style={{fontWeight:"bold"}}>{item.title}</div>
                      <div>{item.text} <div style={{ fontSize:'5px', color: item.state ? "lightgray" : "red"}}>{ passedTime(Date.now() - item.time)}</div></div>
                    </div>
                    <div style={{minWidth:"100px", display:"felx"}}>
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