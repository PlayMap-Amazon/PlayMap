import { useState } from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
} from "react-pro-sidebar";
import {
  FaRegComment,
  FaFilePdf,
  FaFileAlt,
  FaImage,
  FaFilePowerpoint,
} from "react-icons/fa";
import styles from './CustomSidebar.module.css';

const CustomSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar collapsed={collapsed}
        rootStyles={{
          ['.ps-sidebar-container']: {
            backgroundColor: '#F69B54',
          },
        }}
      >
        <Menu>
          <div style={{ flexDirection: "row", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px" }}>
            <img src="logo.png" alt="Logo" className={styles.logoImg} onClick={handleToggle}/>
            <img src="sidebar.svg" alt="Sidebar" className={`${styles.sidebarSvg} ${collapsed ? styles.sidebarSvgClosed : styles.sidebarSvgOpen}`} onClick={handleToggle}/>
          </div>
          <MenuItem icon={<FaRegComment />} style={{ width: '80%', borderRadius: '8px' }}> New Topic </MenuItem>
          <div style={{ padding: "10px 25px", fontSize: 16, color: "#454444" }}>Summarize</div>
          <div style={{ flexDirection: "column", fontSize: 16 }}>
              <MenuItem icon={<FaFilePdf />} style={{ width: '90%',borderRadius: '8px' }}> PDF </MenuItem>
              <MenuItem icon={<FaFileAlt />} style={{ width: '90%', borderRadius: '8px' }}> Document </MenuItem>
              <MenuItem icon={<FaImage />} style={{ width: '90%', borderRadius: '8px' }}> Images </MenuItem>
              <MenuItem icon={<FaFilePowerpoint />} style={{ width: '90%', borderRadius: '8px' }}> Slides </MenuItem>
          </div>
          <div style={{ padding: "10px 25px", fontSize: 16, color: "#454444" }}>History</div>
        </Menu>
      </Sidebar>
      <main style={{ flex: 1 }}>
        <h1 style={{marginTop: "17.5px", marginLeft: "10px", color: "#FD7003"}}>PlayMap</h1>
      </main>
    </div>
  );
};

export default CustomSidebar;
