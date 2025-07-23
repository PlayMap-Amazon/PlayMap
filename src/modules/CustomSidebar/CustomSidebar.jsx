import { useState } from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
} from "react-pro-sidebar";
import {
  FaFilePdf,
  FaFileAlt,
  FaImage,
} from "react-icons/fa";
import { IoMap } from "react-icons/io5";
import styles from './CustomSidebar.module.css';

const PageTypes = {
  MapPage: 'mapPage',
  UploadPage: 'uploadPage'
};
Object.freeze(PageTypes);

function CustomSidebar({onScreenChange}) {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Sidebar 
      collapsed={collapsed}
      rootStyles={{
        // eslint-disable-next-line
        ['.ps-sidebar-container']: {
          backgroundColor: '#F78F1E',
        },
        // eslint-disable-next-line
        ['.ps-menu-button']: {
          backgroundColor: 'transparent !important',
          marginLeft: '15px',
          marginRight: '15px',
          borderRadius: '10px',
          transition: 'background-color 0.2s ease',
        },
        // eslint-disable-next-line
        ['.ps-menu-button:hover']: {
          backgroundColor: '#FFECCC !important',
        },
      }}
    >
      <Menu>
        <div style={{ flexDirection: "row", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px" }}>
          <img src="logo.png" alt="Logo" className={styles.logoImg} onClick={handleToggle}/>
          <img src="sidebar.svg" alt="Sidebar" className={`${styles.sidebarSvg} ${collapsed ? styles.sidebarSvgClosed : styles.sidebarSvgOpen}`} onClick={handleToggle}/>
        </div>
        <MenuItem onClick={() => onScreenChange(PageTypes.MapPage)} icon={<IoMap className={styles.sidebarIcons} />} className={styles.sidebarButton}>Map</MenuItem>
        <div style={{ flexDirection: "column", fontSize: 16 }}>
            <MenuItem onClick={() => onScreenChange(PageTypes.UploadPage)} icon={<FaFileAlt className={styles.sidebarIcons}/>} className={styles.sidebarButton}>Documents</MenuItem>
            <MenuItem onClick={() => onScreenChange(PageTypes.UploadPage)} icon={<FaImage className={styles.sidebarIcons}/>} className={styles.sidebarButton}>Images</MenuItem>
        </div>
        <div style={{ flexDirection: "column", fontSize: 16 }}>
            <MenuItem icon={<FaFilePdf className={styles.sidebarIcons}/>} className={styles.sidebarButton}>History</MenuItem>
        </div>
      </Menu>
    </Sidebar>
  );
};

export { CustomSidebar, PageTypes };
