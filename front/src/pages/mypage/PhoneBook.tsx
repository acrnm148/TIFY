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

  // 업데이트 시도 부분
  const [tryUpdate, setTryUpdate] = useState<boolean>(false);
  const [tryUpdateId, setTryUpdateId] = useState<string>('');

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

  const handleAddContact = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
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
            setUsername('');
            setTel1('');
            setTel2('');
            setTel3('');
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

  // 수정된 내용으로 수정 요청함.
  const handleUpdate = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const API_URL = `https://i8e208.p.ssafy.io/api/phonebook/edit/${tryUpdateId}`;
    const tel = tel1 + '-' + tel2 + '-' + tel3;

    axios
      .put(API_URL, {
        phoneNumber: tel,
        name: username,
      })
      .then((res: any) => {
        console.log(res, '연락처 수정 시도 성공');
        GetPhoneBook();
        alert('연락처가 수정되었습니다.');
        setUsername('');
        setTel1('');
        setTel2('');
        setTel3('');
        setTryUpdateId('');
        setTryUpdate(false);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const handleUpdateCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setUsername('');
    setTel1('');
    setTel2('');
    setTel3('');
    setTryUpdate(false);
    setTryUpdateId('');
  };

  // 저장되어있는 리스트 하나하나
  const SingleContact = (contact: phonebook) => {
    console.log(contact, '아래에서 받은 거 ');
    console.log(contact.id, tryUpdateId, '둘이 같은가요?');
    console.log(contact.name, '이것이 내려받은 contact.name');

    // 업데이트할 연락처를 받아옴
    const UpdateContact = (id: string) => {
      setTryUpdate(true);
      setTryUpdateId(contact.id);
      setUsername(contact.name);
      const tels = contact.phoneNumber.split('-');
      setTel1(tels[0]);
      setTel2(tels[1]);
      setTel3(tels[2]);
      console.log(contact.id, tryUpdateId, '둘이 같은가요?');
    };

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
      <li
        className={`list-group-item
        ${contact.id == tryUpdateId && 'try-update-li'}
      `}
        key={contact.id}
      >
        <p className="friend-username">{contact.name}</p>
        <p className="friend-username">{contact.phoneNumber}</p>
        <div className="change-delete-button-div">
          <button
            className="friend-agree-button"
            onClick={() => UpdateContact(contact.id)}
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
    <div className="contacts-div">
      <p className="phone-book-title">| Contacts</p>
      <div className="under-title-div">
        <div className="phone-book-div">
          <form className="add-contact-form">
            <input
              placeholder="이름"
              className="phone-name-input"
              value={username}
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

            {tryUpdate ? (
              <>
                <div className="update-contact-div">
                  <button
                    className="update-contact-button"
                    onClick={handleUpdate}
                  >
                    연락처 수정
                  </button>
                  <button
                    className="cancel-update-contact-button"
                    onClick={handleUpdateCancel}
                  >
                    취소
                  </button>
                </div>
              </>
            ) : (
              <button className="add-contact-button" onClick={handleAddContact}>
                연락처 추가
              </button>
            )}
          </form>
          <div className="friends-div" style={{ width: '700px' }}>
            <ul className="list-group list-group-flush">
              {contactList !== undefined ? (
                contactList.map((contact: phonebook) => {
                  console.log(contact, 'map으로 받은 contact');
                  return <SingleContact {...contact}></SingleContact>;
                })
              ) : (
                <div>저장된 전화번호가 없습니다.</div>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
