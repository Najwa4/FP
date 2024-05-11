import React from "react";
import "../../styles/Sidebar.css";
import { NavLink } from "react-router-dom";
import { BiMoney, BiLogOutCircle } from "react-icons/bi";
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
        <SectionLink name="User" to="/DeanProfile" icon={<AiOutlineUser />} />
        <SectionLink
          name="Manage Rest"
          to="/DeanRest"
          icon={<MdOutlineAssessment />}
        />
        <SectionLink name="Accepted Rests" to="/Accepted" icon={<BiMoney />} />
        <SectionLink
          name="Quit Job Request"
          to="/DQuit"
          icon={<GrStatusGood />}
        />
        <SectionLink name="Rest Request" to="/DRest" icon={<GrStatusGood />} />
        <NavLink to="/login" className="notselected" onClick={handleLogout}>
          <BiLogOutCircle />
          Logout
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
