"use client";
import { ColorList } from "@components/ColorList";
import { Color } from "@/types/Color";
import { useEffect, useState } from "react";
import { SettingsDocument } from "@/libs/firebase/types";
import { getColorFromFirebase } from "@actions/firebase/colors";
import { API_ROUTE } from "@/app/api/constants";

export const LedStaticInterface = () => {
    const [activeColor, setActiveColor] = useState<Color>();

    useEffect(() => {
        const settingsEventSource = new EventSource(API_ROUTE.FIRESTORE.ON_SETTINGS_UPDATE);

        settingsEventSource.onmessage = (event) => {
            const settings: SettingsDocument = JSON.parse(event.data);

            if (settings.activeColorId) {
                getColorFromFirebase(settings.activeColorId).then((color) => {
                    setActiveColor(color);
                });
            }
        };
    }, []);

    return (
        <div className="mx-5">
            <ColorList
                activeColor={activeColor}
                onColorSelect={(color: Color) => {
                    setActiveColor(color);
                    //     TODO: Make this update the settings in firebase
                }}
                showCreateColorCircle
            />
        </div>
    );
};
