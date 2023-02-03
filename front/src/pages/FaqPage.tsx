import TapNameEng from '../components/TapNameEng';
import '../css/faqPage.styles.css';

export function FaqPage() {
  return (
    <div>
      <TapNameEng
        title="FAQ"
        content="자주 묻는 질문을 알아보아요."
      ></TapNameEng>
      <div className="q-box">
        <p className="q-title">
          Q. 신용카드 결제 중 오류가 난 경우 어떻게 하나요?
        </p>
        <div className="q-active-box">
          <p className="q-active-title">Q. 판매자에게 연결하고 싶어요</p>
          <p className="q-active-content">
            상품 상세 페이지 또는 전체 주문 내역에서 판매자 연락처를 확인할 수
            있습니다. 판매자와 전화 연결이 되지 않는다면 상품 상세 페이지에서
            판매자에게 [문의하기]로 글을 남겨 문의할 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
}
