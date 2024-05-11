import React from "react";
import "../../styles/Sidebar.css";
import { NavLink } from "react-router-dom";
import { BiLogOutCircle } from "react-icons/bi";
import { MdOutlineAssessment } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { GrStatusGood } from "react-icons/gr";

const SectionLink = ({ name, to, icon }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? "selected" : "notselected")}
    >
      {icon}
      {name}
    </NavLink>
  );
};

const Sidebar = () => {
  const handleLogout = () => {
    window.location.reload();
  };

  return (
    <div className="sidebar_bg">
      <div className="sidebar-container">
        <SectionLink name="User" to="/EmpProfile" icon={<AiOutlineUser />} />
        <SectionLink
          name="Quit Job Request"
          to="/EmpQuit"
          icon={<MdOutlineAssessment />}
        />
        <SectionLink
          name="Rest Request"
          to="/EmpRest"
          icon={<GrStatusGood />}
        />
        <NavLink className="notselected" onClick={handleLogout}>
          <BiLogOutCircle />
          Logout
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
