"use client";
import { API_ROUTE } from "@/app/api/constants";
import { SettingsDocument } from "@/libs/firebase/types";
import { Color } from "@/types/Color";
import { getColorFromFirebase } from "@actions/firebase/colors";
import { LedColorList } from "@components/LedColorList";
import { useEffect, useState } from "react";

export const LedStaticInterface = () => {
    const [activeColor, setActiveColor] = useState<Color>();

    const initSettingsListener = () => {
        const settingsEventSource = new EventSource(API_ROUTE.FIRESTORE.ON_SETTINGS_UPDATE);

        settingsEventSource.onmessage = (event) => {
            const settings: SettingsDocument = JSON.parse(event.data);

            if (settings.activeColorId) {
                getColorFromFirebase(settings.activeColorId).then((color) => {
                    setActiveColor(color);
                });
            }
        };
    };

    useEffect(() => {
        initSettingsListener();
    }, []);

    return (
        <div className="mx-5">
            <LedColorList
                activeColor={activeColor}
            />
        </div>
    );
};
