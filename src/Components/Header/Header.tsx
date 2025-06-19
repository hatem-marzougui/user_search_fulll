import "./Header.css";
import { HEADER_TITLE } from "../../Constants";

const Header = () => {
  return (
    <div className="headerContainer">
      <b>{HEADER_TITLE}</b>
    </div>
  );
};

export default Header;
