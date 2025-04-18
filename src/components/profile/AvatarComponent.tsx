import { auth } from '../../firebase/firebaseConfig' // Adjust the import path as necessary
import { useAuthState } from "react-firebase-hooks/auth";


const AvatarComponent = ({ userName, isAuth }: { userName: string; isAuth: boolean }) => {
    const [ user ] = useAuthState(auth);
    const profilePhoto = user?.photoURL || ''; // Get the user's profile photo URL

    if (!isAuth || !profilePhoto) {
        return (
            <div className="avatar avatar-online avatar-placeholder">
                <div className="bg-neutral text-neutral-content w-12 h-12 rounded-full flex items-center justify-center overflow-hidden">
                    <span className="text-xl">
                        {userName
                            .split(' ')
                            .map((name) => name[0])
                            .join('')
                            .toUpperCase()}
                    </span>
                </div>
            </div>
        );
    }

    if (profilePhoto) {
        return (
            <div className="avatar avatar-online">
                <div className="w-12 rounded-full">
                    <img src={profilePhoto} alt={`${userName}'s avatar`} className="rounded-full" />
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="avatar avatar-online avatar-placeholder">
                <div className="bg-neutral text-neutral-content w-12 h-12 rounded-full flex items-center justify-center overflow-hidden">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
            </div>
        </>
    );
};

export default AvatarComponent