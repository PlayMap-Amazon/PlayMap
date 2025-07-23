import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import { CustomSidebar, PageTypes } from "../CustomSidebar/CustomSidebar";
import UploadDoc from "../UploadDoc/UploadDoc";
import MindMap from "../MindMap/MindMap";
import { IoArrowBackSharp } from "react-icons/io5";
import FileViewer from "../FileViewer/FileViewer";

function DashboardPage() {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const [currentScreen, setCurrentScreen] = useState(PageTypes.MapPage);
    const [focusedFileMetadata, setFocusedFileMetadata] = useState(null);


    useEffect(() => {
        console.log('User in DashboardPage:', user, 'Loading:', loading);
        if (!loading && !user) {
            navigate('/login');
        }
    }, [navigate, user, loading]);

    if (loading) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        );
    }
    
    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <CustomSidebar onScreenChange={setCurrentScreen} /><main style={{ height: "100vh", width: "100vw" }}>
                <div style={{ height: "10%", width: "100%", alignItems: "center", display: "flex", justifyContent: "left" }}>
                    <h1 style={{color: "#FD7003", paddingLeft: "17.5px"}}>PlayMap</h1>
                </div>
                <div style={{ height: "90%", width: "100%", padding: "50px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    {currentScreen === PageTypes.MapPage && (
                        focusedFileMetadata != null ? (
                            <FileViewer metadata={focusedFileMetadata} goBackToMindMap={() => setFocusedFileMetadata(null)}/>
                        ) : (
                        <MindMap onNodeFocus={setFocusedFileMetadata} />
                        )
                    )}
                    {currentScreen === PageTypes.UploadPage && <UploadDoc />}
                </div>
            </main>
        </div>
    );
}

export default DashboardPage;