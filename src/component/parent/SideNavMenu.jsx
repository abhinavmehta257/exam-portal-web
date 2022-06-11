import {
  RiAccountBoxFill,
  RiDashboard2Fill,
  RiDashboardFill,
  RiFileChartFill,
  RiFileUploadFill,
  RiQuestionAnswerFill,
  RiSwordFill,
  RiUserFollowFill,
} from "react-icons/ri";
import {
  AiOutlineDashboard,
  AiOutlineFilePpt,
  AiOutlineTrophy,
  AiOutlineHeart,
  AiFillSetting,
  AiFillQuestionCircle,
  AiOutlineUserAdd,
  AiOutlineTeam,
  AiOutlineInbox,
} from "react-icons/ai";
import { MdMarkEmailRead } from "react-icons/md";
import classes from "./parentStudent.module.css";
import { useLocation, useNavigate } from "react-router-dom";

const MENUS = [
  {
    title: "Student Profile",
    icon: <AiOutlineTeam />,
    to: "/profiles",
  },
  {
    title: "Dashboard",
    icon: <RiDashboardFill />,
    to: "/dashboard",
  },
  {
    title: "My Performance",
    icon: <AiOutlineDashboard />,
    to: "/performance",
  },
  {
    title: "Practice",
    icon: <AiOutlineFilePpt />,
    to: "/practice",
  },
  {
    title: "Competition & Battle",
    icon: <AiOutlineTrophy />,
    to: "/competition",
  },
  {
    title: "Favorites",
    icon: <AiOutlineHeart />,
    to: "/favorites",
  },
  {
    title: "Add a Student",
    icon: <AiOutlineUserAdd />,
    to: "/add/student",
  },
  {
    title: "My Account",
    icon: <AiFillSetting />,
    to: "/account",
  },
  {
    title: "Subscriptions",
    icon: <AiOutlineInbox />,
    to: "/subscription",
  },
  {
    title: "Help",
    icon: <AiFillQuestionCircle />,
    to: "/help",
  },
];

const STUDENT_MENUS = [
  // {
  //   title: "Dashboard",
  //   icon: <RiDashboard2Fill />,
  //   to: "/dashboard",
  // },
  {
    title: "My Performance",
    icon: <AiOutlineDashboard />,
    to: "/performance",
  },
  {
    title: "Practice",
    icon: <AiOutlineFilePpt />,
    to: "/practice",
  },
  {
    title: "Competition & Battle",
    icon: <AiOutlineTrophy />,
    to: "/competition_battles",
  },
  {
    title: "Favorites",
    icon: <AiOutlineHeart />,
    to: "/favorites",
  },
  {
    title: "Help",
    icon: <AiFillQuestionCircle />,
    to: "/help",
  },
];

const ADMIN_MENUS = [
  {
    title: "Dashboard",
    icon: <RiDashboard2Fill />,
    to: "/dashboard",
  },
  {
    title: "Customer Account Management",
    icon: <RiUserFollowFill />,
    to: "/account/customer",
  },
  {
    title: "Bulk Upload",
    icon: <RiFileUploadFill />,
    to: "/upload",
  },
  {
    title: "Competitions",
    icon: <AiOutlineTrophy />,
    to: "/competitions",
  },
  {
    title: "Battles",
    icon: <RiSwordFill />,
    to: "/battles",
  },
  {
    title: "Reports",
    icon: <RiFileChartFill />,
    to: "/reports",
  },
  {
    title: "Account & Role Management",
    icon: <RiAccountBoxFill />,
    to: "/account/manage",
  },
  {
    title: "Queries",
    icon: <RiQuestionAnswerFill />,
    to: "/queries",
  },
  {
    title: "Email Templates",
    icon: <MdMarkEmailRead />,
    to: "/email/template",
  },
];


function SideNavMenu({ prefix, role }) {
  const navigate = useNavigate();
  const location = useLocation();
  const ROLE = role || "PARENT";
  function getMenus() {
    if (ROLE === "ADMIN") return ADMIN_MENUS;
    if (ROLE === "PARENT") return MENUS;
    if (ROLE === "STUDENT") return STUDENT_MENUS;
    return [];
  }
  return (
    <ul className="px-0">
      {getMenus().map((menu) => (
        <li
          className={`${classes.lefNavLi} ${
            location.pathname.endsWith(menu.to) ? classes.liActive : ""
          }`}
          key={menu.to}
          onClick={() => navigate(`${prefix}${menu.to}`)}
        >
          <div className={`${classes.lefNavIcon}`}>{menu.icon}</div>
          <div className={`${classes.lefNavLink}`}>{menu.title}</div>
        </li>
      ))}
    </ul>
  );
}

export default SideNavMenu;
