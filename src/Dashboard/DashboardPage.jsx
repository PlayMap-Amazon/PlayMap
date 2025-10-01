import { useEffect, useState } from "react";
import styles from "./DashboardPage.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { PageTypes } from "../CustomSidebar/CustomSidebar";
import UploadDoc from "../UploadDoc/UploadDoc";
import MindMap from "../MindMap/MindMap";
import Navbar from "@/Navbar/Navbar";
import FloatingParticles from "@/FloatingParticles";

function DashboardPage() {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const [currentScreen, setCurrentScreen] = useState(PageTypes.MapPage);
    const [focusedFileMetadata, setFocusedFileMetadata] = useState(null);

    useEffect(() => {
        if (!loading && !user) {
            navigate('/login');
        }
    }, [navigate, user, loading]);

    const tabs = [
        { name: "Mindmap", type: PageTypes.MapPage },
        { name: "Upload", type: PageTypes.UploadPage },
    ];
    
    return (
        <div className={styles.body}>
            <Navbar />
            <FloatingParticles />
            <div className="w-[100%] h-[100vh] p-[60px] z-10">
                <div style={{ height: "10%", width: "100%", display: "flex", justifyContent: "start", alignItems: "end" }}>
                    {tabs.map((tab) => (
                        <button
                            key={tab.type}
                            onClick={() => setCurrentScreen(tab.type)}
                            style={{
                                backgroundColor: "#FFECCC",
                                borderTopLeftRadius: "10px",
                                borderTopRightRadius: "10px",
                                marginRight: "10px",
                                borderTop: "2px solid #ffd895",
                                borderLeft: "2px solid #ffd895",
                                borderRight: "2px solid #ffd895",
                                fontWeight: "bold",
                                color: currentScreen === tab.type ? "black" : "gray",
                                padding: "12px 16px",
                                cursor: "pointer",
                            }}
                        >
                            {tab.name}
                        </button>
                    ))}
                </div>
                <div style={{ height: "80%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    {currentScreen === PageTypes.MapPage && (
                        <MindMap />
                    )}
                    {currentScreen === PageTypes.UploadPage && <UploadDoc />}
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;