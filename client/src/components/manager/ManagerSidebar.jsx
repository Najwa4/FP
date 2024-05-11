import React from "react";
import "../../styles/Sidebar.css";
import { NavLink } from "react-router-dom";
import { BiMoney, BiLogOutCircle } from "react-icons/bi";
import { MdOutlineAssessment } from "react-icons/md";
import { AiFillMinusCircle, AiOutlineUser } from "react-icons/ai";
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
        <SectionLink name="User" to="/Prof" icon={<AiOutlineUser />} />
        <SectionLink
          name="Manage Leave"
          to="/Quit"
          icon={<MdOutlineAssessment />}
        />
        <SectionLink
          name="Employe Request"
          to="/manager-announce"
          icon={<BiMoney />}
        />
        <SectionLink
          name="Posted Announce"
          to="/manager-posted"
          icon={<GrStatusGood />}
        />
        <SectionLink
          name="Reject"
          to="/manager-reject"
          icon={<AiFillMinusCircle />}
        />
        <SectionLink
          name="Employee"
          to="/find-emppage"
          icon={<AiFillMinusCircle />}
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
