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
  return (
    <div className="sidebar_bg">
      <div className="sidebar-container">
      <SectionLink name="User" to="/profile" icon={<AiOutlineUser />} />
        <SectionLink
          name="Manage Rest"
          to="/ManagerRest"
          icon={<MdOutlineAssessment />}
        />
        <SectionLink name="Approved Rests" to="/Approved" icon={<BiMoney />} />
        <SectionLink
          name="Employee"
          to="/find-employee"
          icon={<GrStatusGood />}
        />
        <SectionLink
          name="Applicant"
          to="/find-applicant"
          icon={<AiFillMinusCircle />}
        />
        <SectionLink
          name="New College"
          to="/AddColl"
          icon={<AiFillMinusCircle />}
        />
        <SectionLink
          name="New Department"
          to="/AddDep"
          icon={<AiFillMinusCircle />}
        />
        <SectionLink
          name="Update Test Day"
          to="/Test"
          icon={<AiFillMinusCircle />}
        />
        <SectionLink
          name="Add New User"
          to="/AddUser"
          icon={<AiFillMinusCircle />}
        />
        <SectionLink name="logout" to="/login" icon={<BiLogOutCircle />} />
      </div>
    </div>
  );
};

export default Sidebar;
