import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import CustomSidebar from "../CustomSidebar/CustomSidebar";

function DashboardPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

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
        <CustomSidebar/>
    );
}

export default DashboardPage;