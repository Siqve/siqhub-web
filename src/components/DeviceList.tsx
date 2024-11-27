import { CardListSection } from "@/containers/CardListSection";
import { db } from "@/services/dbService";
import { DeviceIcon } from "@components/DeviceIcon";

export const DeviceList = async () => {
    const devices = await db.table().device().selectAll();

    return (
        <div className="m-5">
            <CardListSection title="Devices">
                {devices.map((device) => (
                    <DeviceIcon key={device.name} device={device} />
                ))}
            </CardListSection>
        </div>
    );
};

/*
Change received! {
  schema: 'public',
  table: 'profile',
  commit_timestamp: '2024-07-20T16:31:16.271Z',
  eventType: 'INSERT',
  new: { active_color_id: 2, name: 'bob4' },
  old: {},
  errors: null
}
Change received! {
  schema: 'public',
  table: 'profile',
  commit_timestamp: '2024-07-20T16:32:00.031Z',
  eventType: 'UPDATE',
  new: { active_color_id: 2, name: 'bobasd' },
  old: { name: 'bob3' },
  errors: null
}
Change received! {
  schema: 'public',
  table: 'profile',
  commit_timestamp: '2024-07-20T16:32:36.205Z',
  eventType: 'DELETE',
  new: {},
  old: { name: 'bob4' },
  errors: null
}
 */
