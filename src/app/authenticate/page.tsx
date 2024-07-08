import { Content } from "@/containers/Content";
import { LoginBox } from "@components/auth/LoginBox";
import { HomeHeader } from "@components/home/HomeHeader";

const AuthPage = () => {
    return (
        <>
            <HomeHeader headerText="Login" />
            <Content>
                <LoginBox />
            </Content>
        </>
    );
};

export default AuthPage;
