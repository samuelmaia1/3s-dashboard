import { LoadingSpinner } from "@components/LoadingSpinner/LoadingSpinner";

export function LoadingScreen() {
    return (
        <div style={{height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <LoadingSpinner size={24}/>
        </div>
    );
}