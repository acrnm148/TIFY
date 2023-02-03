// import React, { useState } from "react";
// import alert from '../assets/iconAlert.svg';
// import bell from '../assets/bell.png';
// import anony from '../assets/anony.png';

// import { ref, set, push, onValue, child, get, update, remove } from "firebase/database";
// import { db } from "./firebase";
// import { List } from "@mui/material";
// import { useSelector } from 'react-redux';
// import { RootState } from '../store/Auth';
// interface Alarm {
//     [key: string]: any;
//     id: string;
//   }

// const updateData = (dataid:string,data:Alarm,userEmail:string) => {
//     //data는 email 기준 조회합니다.
//     data.state = true;
//     console.log(data);
//     console.log("/test/tify/"+userEmail+"/"+dataid);
//     return update(
//         ref(db, "/test/tify/"+userEmail+"/"+dataid),
//         data
//     );
// };

const AlarmDropdown = () => {
//   var userEmail = useSelector((state: RootState) => state.authToken.userEmail);
//   if(userEmail) {userEmail = userEmail.replace("@","-").replace(".","-");}

//   const [showDropdown, setShowDropdown] = useState(false);
//   const toggleDropdown = () => {
//     isNew = alert;
//     setShowDropdown(!showDropdown);
//     alarmsArray.map((val,idx) => {
//         if ( alarmsArray[idx].state === false ){
//             updateData(alarmsArray[idx].id,alarmsArray[idx],userEmail);
//         }
//     })
//     console.log(alarmsArray);
//     };

//   const mb = ref(db, "/test/tify/"+userEmail);
//   // const mb = ref(db, "/test/tify/");

//   var alarmsArray: Alarm[] = [];

//   var isNew:string = alert;
//   onValue(mb, (snapshot) => {
//         const data = snapshot.val();
//         alarmsArray = Object.keys(data).map(key => {
//             if (data[key].state === false) {
//                 console.log("새 알람 발생");
//                 isNew = bell;
//             }
//             return { ...data[key], id: key } as Alarm;
//             });
//         console.log(alarmsArray)
//     });
//   const readOne = () => {
//     const dbRef = ref(db);
//     get(child(dbRef, "test/tify/rkdrlgks321-naver-com"))
//       .then(snapshot => {
//       if (snapshot.exists()) {
//         console.log(snapshot.val());
//       } else {
//         console.log("No data available");
//       }
//     })
//       .catch(error => {
//       console.error(error);
//     });
//   };
//   readOne();

  return (
    <div className="relative">
      {/* <img
        src={isNew}
        className="logo logo-right cursor-pointer"
        alt="Tify logo"
        onClick={toggleDropdown}
      />
      {showDropdown && (
        <div className="absolute bg-white py-2 rounded-lg shadow-xl">
            <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '400px',
                    width: '200px',
                    border: '1px solid black',
                    position: 'relative',
                    flexDirection : 'column',
                    overflowY: "auto"
            }}>
            {alarmsArray.map((item) => (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '50px',
                    width: '200px',
                    border: '1px solid black',
                    position: 'relative',
                    flexDirection : 'row'}}>
                    <div><img style={{borderRadius: '50%', width: '40px', height: '40px',}} src={anony} alt="img"/></div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '5px', }}>
                        <div>{item.title}</div>
                        <div>{item.content}</div>
                    </div>
                    <div style={{ fontSize:'5px'}}>{new Date(item.time * 1000).toDateString().substring(0,10)}</div>
                </div>
            ))}
            </div>
        </div>
      )} */}
    </div>
  );
};

export default AlarmDropdown;
