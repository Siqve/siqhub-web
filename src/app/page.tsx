import { HomeHeader } from "@components/home/HomeHeader";
import { DeviceList } from "@/containers/DeviceList";

const Home = () => {
    return (
        <div>
            <HomeHeader headerText="Home"/>
            <DeviceList/>
        </div>
    );
};

export default Home;
