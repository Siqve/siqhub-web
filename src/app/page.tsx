import { Content } from "@/containers/Content";
import { DeviceList } from "@components/DeviceList";
import { HomeHeader } from "@components/home/HomeHeader";

const Home = () => {
    return (
        <>
            <HomeHeader headerText="SiqHub" />
            <Content>
                <DeviceList />
            </Content>
        </>
    );
};

export default Home;
