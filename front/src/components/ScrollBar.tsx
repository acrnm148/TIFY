import React, { useState, useEffect } from "react";

function ScrollBar() {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = document.documentElement.scrollTop + document.body.scrollTop;
      setScrollPercentage(scrolled / scrollHeight);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="gradient-bar">
      <div
        className="fill"
        style={{
          width: `${scrollPercentage * 100}%`,
          background: "linear-gradient(to right, #ff0000, #ffff00, #00ff00)"
        }}
      />
    </div>
  );
}

export default ScrollBar;
