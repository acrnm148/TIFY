import React, { useState } from 'react';
// import KakaoPay from 'kakao-pay-js-sdk';

const jsKey = '360c30adb7c0e91ff0faab9145a3ea7e';
// SDK는 한 번만 초기화해야 한다.
// 중복되는 초기화를 막기 위해 isInitialized()로 SDK 초기화 여부를 판단한다.
if (!window.Kakao.isInitialized()) {
  // JavaScript key를 인자로 주고 SDK 초기화
  window.Kakao.init(jsKey);
  // SDK 초기화 여부를 확인하자.
  console.log(window.Kakao.isInitialized());
}


interface Props {
  price: number;
}

const PayingService: React.FC<Props> = ({ price }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      const kakaoPay = new KakaoPay({
        merchantId: 'YOUR_MERCHANT_ID', // Replace with your merchant ID
        key: 'YOUR_KEY', // Replace with your key
      });

      const payload = {
        amount: price,
        item_name: '축하하기',
        item_code: 'item_code',
        tax_free_amount: 0,
        vat_amount: 0,
        buyer_name: 'John Doe',
        buyer_email: 'johndoe@example.com',
        buyer_tel: '01234567890',
        buyer_addr: 'address',
        buyer_postcode: '123456',
        custom_data: {
          custom_key: 'custom_value',
        },
      };

      const { tid } = await kakaoPay.startPayment(payload);
      console.log(`Transaction ID: ${tid}`);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <button onClick={handlePayment}>Pay ${price}</button>
      )}
    </>
  );
};

export default PayingService;