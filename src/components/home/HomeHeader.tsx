export const HomeHeader = ({ headerText }: { headerText: string }) => {
    return (
        <div className="w-full p-6 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.5)]">
            <h1>{headerText}</h1>
        </div>
    );
};
