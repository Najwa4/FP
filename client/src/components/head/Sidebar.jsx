import React from "react";
import "../../styles/Sidebar.css";
import { NavLink } from "react-router-dom";
import { BiLogOutCircle } from "react-icons/bi";
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
  return (
    <div className="sidebar_bg">
      <div className="sidebar-container">
        <SectionLink name="User" to="/HProfile" icon={<AiOutlineUser />} />
        <SectionLink
          name="Quit Job Request"
          to="/HQuit"
          icon={<GrStatusGood />}
        />
        <SectionLink name="Rest Request" to="/HRest" icon={<GrStatusGood />} />
        <SectionLink
          name="New Announcement"
          to="/NewEmp"
          icon={<GrStatusGood />}
        />
        <SectionLink
          name="Update Announcement"
          to="/UpdateAnnoun"
          icon={<GrStatusGood />}
        />
        <SectionLink
          name="Day Of Absence"
          to="/Absence"
          icon={<GrStatusGood />}
        />
        <SectionLink name="logout" to="/login" icon={<BiLogOutCircle />} />
      </div>
    </div>
  );
};

export default Sidebar;
