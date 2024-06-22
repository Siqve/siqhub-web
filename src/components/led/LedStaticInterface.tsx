"use client";
import { API_ROUTE } from "@/app/api/constants";
import { SettingsDocument } from "@/libs/firebase/types";
import { Color } from "@/types/Color";
import { getColorFromFirestore, updateColorInFirestore } from "@actions/firestore/colors";
import { Spinner } from "@components/Spinner";
import { ColorPicker } from "@components/led/picker/ColorPicker";
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

    const onColorChange = (color: string) => {
        if (activeColor.immutable) return;
        updateColorInFirestore(activeColor.id, color);
    };

    return (
        <div className="mx-5 flex flex-col items-center gap-6">
            <LedColorList activeColor={activeColor} />
            <ColorPicker inputColor={activeColor.hex} onChange={onColorChange} />
        </div>
    );
};
