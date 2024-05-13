import { CircleIcon } from "@/containers/CircleIcon";
import { Card } from "@/containers/Card";

export const LedStaticInterface = () => {
    return (
        <div className="flex flex-col m-5">
            <div className="flex">
                <Card>
                    <div className="flex gap-3">
                        <CircleIcon circleClass="bg-slate-500" />
                        <CircleIcon circleClass="bg-slate-500" />
                        <CircleIcon circleClass="bg-slate-500" />
                    </div>
                </Card>
            </div>
        </div>
    );
};
