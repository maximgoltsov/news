import React from "react";
import { Link } from "react-router-dom";
import { homeUrl, newsUrl } from "../../../constants/routes";
import { StyledSideBar, StylesBarList } from "./styled";

const SideBar: React.FC = () => {
  return (
    <StyledSideBar>
      <StylesBarList>
        <Link to={homeUrl}>На главную</Link>
        <Link to={newsUrl}>Новости</Link>
      </StylesBarList>
    </StyledSideBar>
  );
}

export default SideBar;