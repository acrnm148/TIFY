import '../css/tapName.styles.css';

function TapNameEng(props) {
  return (
    <div className="tap-box">
      <div className="side-bar"></div>
      <div>
        <p className="tap-title-eng">{props.title}</p>
        <p className="tap-content"> {props.content}</p>
      </div>
    </div>
  );
}

export default TapNameEng;
