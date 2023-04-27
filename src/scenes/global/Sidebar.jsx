import { useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import userProfile from "../../assets/images/user.png";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const style = { item: { color: colors.grey[100] } };
  return (
    <ProSidebar rtl={true} style={{ background: colors.primary[400] }}>
      <Menu iconShape="square">
        {/* LOGO AND MENU ICON */}

        {!isCollapsed && (
          <Box mb="25px">
            <Box display="flex" justifyContent="center" alignItems="center">
              <img
                alt="profile-user"
                width="100px"
                height="100px"
                src={userProfile}
                style={{ cursor: "pointer", borderRadius: "50%" }}
              />
            </Box>
            <Box textAlign="center">
              <Typography
                variant="h2"
                color={colors.grey[100]}
                fontWeight="bold"
                sx={{ m: "10px 0 0 0" }}
              >
                Admin
              </Typography>
              <Typography variant="h5" color={colors.greenAccent[500]}>
                Administrator
              </Typography>
            </Box>
          </Box>
        )}

        <Item
          title="سحل التدريب"
          to="/subscriptions"
          selected={selected}
          setSelected={setSelected}
        />
        <SubMenu
          title={"المتدربين"}
          style={{ background: colors.primary[400], color: colors.grey[100] }}
        >
          <Item
            style={style.item}
            title="سحل المتدربين"
            to="/customers"
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="انشاء متدرب جديد"
            to="/addCustomer"
            selected={selected}
            setSelected={setSelected}
          />
        </SubMenu>
        <SubMenu
          title={"الكورسات"}
          style={{ background: colors.primary[400], color: colors.grey[100] }}
        >
          <Item
            style={style.item}
            title="سحل الكورسات"
            to="/courses"
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="انشاء كورس جديد"
            to="/addCourse"
            selected={selected}
            setSelected={setSelected}
          />
        </SubMenu>
      </Menu>
    </ProSidebar>
  );
};

export default Sidebar;
