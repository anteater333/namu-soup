import { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [headerText, setHeaderText] = useState(
    "바쁜 현대사회, 가끔은 나무 대신 숲을 봐야 할 때도 있습니다."
  );

  return (
    <div className="header">
      <span className="header-context">
        <Link to="/">{headerText}</Link>
      </span>
    </div>
  );
}

export default Header;
