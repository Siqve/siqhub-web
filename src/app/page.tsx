import { HomeHeader } from "@components/home/HomeHeader";
import { DeviceList } from "@/containers/DeviceList";

const Home = () => {
    return (
        <div className="flex flex-col items-center">
            <HomeHeader headerText="SiqHue" />
            <main>
                <DeviceList />
            </main>
        </div>
    );
};

export default Home;
