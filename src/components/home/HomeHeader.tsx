import { Header } from "@/containers/Header";

export const HomeHeader = ({ headerText }: { headerText: string }) => {
    return (
        <Header>
            <h1>{headerText}</h1>
        </Header>
    );
};
