import { useAppSelector } from "../types/storeType"

const ProfileScreen = () => {
    const {userInfo} = useAppSelector(state => state.auth)
    return (
        <>
        <h1>{userInfo?.email}</h1>
        </>
    )
}

export default ProfileScreen