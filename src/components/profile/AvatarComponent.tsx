import React from 'react'
import { useGetUserInfo } from '../../hooks/useGetUserInfo';

const AvatarComponent = ({ userName, isAuth }: { userName: string; isAuth: boolean }) => {
    const { profilePhoto } = useGetUserInfo(); // Assuming useGetUserInfo is a hook that provides user profile data

    if (!isAuth) {
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
        <></>
    );
};

export default AvatarComponent