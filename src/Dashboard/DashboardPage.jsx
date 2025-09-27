import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { CustomSidebar, PageTypes } from "../CustomSidebar/CustomSidebar";
import UploadDoc from "../UploadDoc/UploadDoc";
import MindMap from "../MindMap/MindMap";
import FileViewer from "../FileViewer/FileViewer";
import Quiz from "@/Quiz";

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

    if (loading || !user) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        );
    }
    
    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <CustomSidebar onScreenChange={setCurrentScreen} />
            <main style={{ height: "100vh", width: "100vw" }}>
                <div style={{ height: "10%", width: "100%", alignItems: "center", display: "flex", justifyContent: "left" }}>
                    <h1 style={{color: "#FD7003", paddingLeft: "17.5px"}}>PlayMap</h1>
                </div>
                <div style={{ height: "90%", width: "100%", padding: "50px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    {currentScreen === PageTypes.MapPage && (
                        <MindMap />
                    )}
                    {currentScreen === PageTypes.UploadPage && <UploadDoc />}
                    {currentScreen === PageTypes.QuizPage && <Quiz />}
                </div>
            </main>
        </div>
    );
}

export default DashboardPage;