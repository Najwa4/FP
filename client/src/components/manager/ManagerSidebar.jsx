import React from "react";
import "../../styles/Sidebar.css";
import { NavLink } from "react-router-dom";
import { BiMoney, BiLogOutCircle } from "react-icons/bi";
import { MdOutlineAssessment } from "react-icons/md";
import { AiFillMinusCircle } from "react-icons/ai";
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
  return (
    <div className="sidebar_bg">
      <div className="sidebar-container">
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
          name="Posted Announcement"
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
        <SectionLink name="logout" to="/login" icon={<BiLogOutCircle />} />
      </div>
    </div>
  );
};

export default Sidebar;
