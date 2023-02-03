import TapNameEng from '../components/TapNameEng';

export function NotFound() {
  return (
    <div style={{ height: '1000px' }}>
      <TapNameEng
        title="404 Error"
        content="잘못된 주소를 입력하신듯"
      ></TapNameEng>
    </div>
  );
}
