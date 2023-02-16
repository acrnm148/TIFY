import '../css/giftHubList.styles.css';
import type { GiftProps } from '../interface/interface';

export function GiftHubList({ giftList }: GiftProps) {
  return (
    <div className="gift-list-con-container">
      {/* <div className="gift-list-container">
                <div className="gift-list">
                {giftList.map((gift, i:number) => (
                    <NavLink to={`/gifthub/${gift.giftId}`}>
                        <GiftItem key={i} gift={gift} />
                    </NavLink>
                ))}
                </div>
            </div> 
            <div>
                
            </div>     */}
    </div>
  );
}
