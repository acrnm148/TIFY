import '../css/tapName.styles.css';

function TapNameKor(props) {
  return (
    <div className="tap-box">
      <div className="side-bar"></div>
      <div>
        <p className="tap-title-kor">{props.title}</p>
        <p className="tap-content"> {props.content}</p>
      </div>
    </div>
  );
}

export default TapNameKor;
