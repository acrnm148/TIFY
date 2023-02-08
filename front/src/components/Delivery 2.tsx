import React, { useState, useEffect } from 'react';
import '../css/delivery.styles.css';

export function Delivery() {
  return (
    <div>
      test
      <div className="delivery-mod">
        <div className="modalBody" onClick={(e) => e.stopPropagation()}>
          {/* {props.children} */}
        </div>
      </div>
    </div>
  );
}
