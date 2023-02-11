import '../../css/mypage/phoneBook.styles.css';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/Auth';
import axios from 'axios';

// interface contact {
//   id: string;
//   myId: string;
//   phoneNumber: string;
// }

interface phonebook {
  id: string;
  myId: string;
  phoneNumber: string;
  name: string;
}

export function PhoneBook() {
  const userId = useSelector((state: RootState) => state.authToken.userId);
  const [username, setUsername] = useState<string>('');
  const [tel1, setTel1] = useState<string>('');
  const [tel2, setTel2] = useState<string>('');
  const [tel3, setTel3] = useState<string>('');
  const [contactList, setContectList] = useState<Array<phonebook>>();

  useEffect(() => {
    GetPhoneBook();
  }, []);

  const GetPhoneBook = () => {
    const API_URL = `https://i8e208.p.ssafy.io/api/phonebook/${userId}`;
    axios
      .get(API_URL)
      .then((res) => {
        console.log(res, '연락처 받아오기 성공');

        setContectList(res.data);
        console.log(res.data);
        console.log(contactList);
      })
      .catch((err) => {
        console.log(err, '연락처 받아오기 실패');
      });
  };

  const handleInfoSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const tel = tel1 + '-' + tel2 + '-' + tel3;

    if (CheckValid()) {
      try {
        return await axios
          .post('https://i8e208.p.ssafy.io/api/phonebook/add', {
            myId: userId,
            phoneNumber: tel,
            name: username,
          })
          .then((res) => {
            console.log(res, '연락처 추가 요청 시도 성공!');
            GetPhoneBook();
            alert('연락처가 추가되었습니다.');
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
        console.log('Errrrrrr');
      }
    }
  };

  function CheckValid() {
    if (username == '') {
      alert('이름을 입력하세요.');
      return false;
    }
    if (tel1 == '' || tel2 == '' || tel3 == '') {
      alert('전화번호를 입력해주세요.');
      return false;
    }

    if (3 < tel1.length) {
      alert('전화번호 첫 자리가 너무 길어요.');
      return false;
    }
    if (4 < tel2.length) {
      alert('전화번호 두 번째 자리가 너무 길어요.');
      return false;
    }
    if (4 < tel3.length) {
      alert('전화번호 세 번째 자리가 너무 길어요.');
      return false;
    }

    return true;
  }

  const SingleContact = (contact: phonebook) => {
    console.log(contact, '아래에서 받은 거 ');

    const DeleteContact = (id: string) => {
      const API_URL = `https://i8e208.p.ssafy.io/api/phonebook/delete/${id}`;
      axios
        .delete(API_URL)
        .then((res: any) => {
          console.log(res, '연락처 삭제 성공');
          GetPhoneBook();
        })
        .catch((err: any) => {
          console.log(err);
        });
    };

    return (
      <li className="list-group-item" key={contact.id}>
        <p className="friend-username">{contact.name}</p>
        <p className="friend-username">{contact.phoneNumber}</p>
        <div className="">
          <button
            className="friend-agree-button"
            // onClick={() => FriendAccept(request.id)}
          >
            수정
          </button>
          <button
            className="friend-deny-button"
            onClick={() => DeleteContact(contact.id)}
          >
            삭제
          </button>
        </div>
      </li>
    );
  };

  return (
    <div>
      <p className="phone-book-title">| Contacts</p>
      <form className="add-contact-form" onSubmit={handleInfoSubmit}>
        <input
          placeholder="이름"
          className="phone-name-input"
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <div className="mini-input-container">
          <input
            type="number"
            className="mini-input-box"
            placeholder="010"
            maxLength={3}
            value={tel1}
            onChange={(e) => setTel1(e.target.value)}
          />
          <span>-</span>
          <input
            type="number"
            className="mini-input-box"
            placeholder="8888"
            maxLength={4}
            value={tel2}
            onChange={(e) => setTel2(e.target.value)}
          />
          <span>-</span>
          <input
            type="number"
            className="mini-input-box"
            placeholder="8888"
            maxLength={4}
            value={tel3}
            onChange={(e) => setTel3(e.target.value)}
          />
        </div>

        <button className="add-contact-button">연락처 추가</button>
      </form>
      <div className="friends-div">
        <ul className="list-group list-group-flush">
          {contactList &&
            contactList.map((contact: phonebook) => {
              console.log(contact, 'map으로 받은 contact');
              return <SingleContact {...contact}></SingleContact>;
            })}
          <li className="list-group-item">An item</li>
          <li className="list-group-item">A second item</li>
          <li className="list-group-item">A third item</li>
          <li className="list-group-item">A fourth item</li>
          <li className="list-group-item">And a fifth test</li>
        </ul>
      </div>
    </div>
  );
}

const RequestFriend = ({ request }: any) => {
  const FriendAccept = (id: string) => {
    console.log(id);
    const API_URL = `https://i8e208.p.ssafy.io/api/friends/accept`;
    axios
      .post(API_URL, {
        friendId: id,
        accepted: true,
      })
      .then((res: any) => {
        console.log(res, '친구 요구 승락 성공');
        // GetFriendData();
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const FriendDeny = (id: string) => {
    console.log(id);
    const API_URL = `https://i8e208.p.ssafy.io/api/friend/reqdelete/${id}`;
    axios
      .delete(API_URL)
      .then((res: any) => {
        console.log(res, '친구 요청 거부 성공');
        // GetPhoneBook();
        // GetFriendData();
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  return (
    <li className="list-group-item">
      <img src={request.profileImg} className="friend-profile"></img>
      <p className="friend-nickname">{request.nickname}</p>
      <p className="friend-username">{request.username}</p>
      <div className="">
        <button
          className="friend-agree-button"
          // onClick={() => FriendAccept(request.id)}
        >
          승락
        </button>
        <button
          className="friend-deny-button"
          onClick={() => FriendDeny(request.id)}
        >
          거부
        </button>
      </div>
    </li>
  );
};
