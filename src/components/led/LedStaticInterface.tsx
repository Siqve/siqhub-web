"use client";
import { API_ROUTE } from "@/app/api/constants";
import { SettingsDocument } from "@/libs/firebase/types";
import { Color } from "@/types/Color";
import { getColorFromFirestore } from "@actions/firestore/colors";
import { Spinner } from "@components/Spinner";
import { LedColorList } from "@components/led/LedColorList";
import { useEffect, useState } from "react";

export const LedStaticInterface = () => {
    const [activeColor, setActiveColor] = useState<Color>();

    const initSettingsListener = () => {
        const settingsEventSource = new EventSource(API_ROUTE.FIRESTORE.ON_SETTINGS_UPDATE);

        settingsEventSource.onmessage = (event) => {
            const settings: SettingsDocument = JSON.parse(event.data);

            if (settings.activeColorId) {
                getColorFromFirestore(settings.activeColorId).then((color) => {
                    setActiveColor(color);
                });
            }
        };
        return settingsEventSource;
    };

    useEffect(() => {
        const eventSource = initSettingsListener();
        return () => eventSource.close();
    }, []);

    if (!activeColor) {
        return <Spinner />;
    }

    return (
        <div className="mx-5">
            <LedColorList activeColor={activeColor} />
        </div>
    );
};
