'use client'

import { createContext, useContext, useState } from 'react';

interface PendingDataContextType {
    selectedLanguages: string[];
    fiberContent: { material: number; percentage: string }[];
    careInstructionsList: number[];
    cooIndex: number;
    x:number;
    y:number;
    seamGap:number;
    zoom:number;
}

export const PendingDataContext = createContext<PendingDataContextType | null>(null);

interface PendingDataDispatchType {
    setSelectedLanguages: React.Dispatch<React.SetStateAction<string[]>>;
    setFiberContent: React.Dispatch<React.SetStateAction<{ material: number; percentage: string }[]>>;
    setCareInstructionsList: React.Dispatch<React.SetStateAction<number[]>>;
    setCooIndex: React.Dispatch<React.SetStateAction<number>>;
    setX: React.Dispatch<React.SetStateAction<number>>;
    setY: React.Dispatch<React.SetStateAction<number>>;
    setSeamGap: React.Dispatch<React.SetStateAction<number>>;
    setZoom: React.Dispatch<React.SetStateAction<number>>;
}

export const PendingDataDispatchContext = createContext<PendingDataDispatchType | null>(null);

export function CareLabelDataProvider({ children }: { children: React.ReactNode }) {
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>(["English"]); // Default to English checked
    const [fiberContent, setFiberContent] = useState([{ material: 0, percentage: "Select" }]);
    const [careInstructionsList, setCareInstructionsList] = useState<number[]>([0]);
    const [cooIndex, setCooIndex] = useState<number>(0);
    const [x,setX] = useState<number>(1.18);
    const [y,setY] = useState<number>(2.36);
    const [seamGap, setSeamGap] = useState<number>(0.25);
    const [zoom, setZoom] = useState<number>(1);

    const dispatch = {
        setSelectedLanguages,
        setFiberContent,
        setCareInstructionsList,
        setCooIndex,
        setX,
        setY,
        setSeamGap,
        setZoom
    };

    const pendingData = {
        selectedLanguages,
        fiberContent,
        careInstructionsList,
        cooIndex,
        x,
        y,
        seamGap,
        zoom
    };

    return (
        <PendingDataContext.Provider value={pendingData}>
            <PendingDataDispatchContext.Provider value={dispatch}>
                {children}
            </PendingDataDispatchContext.Provider>
        </PendingDataContext.Provider>
    );
}

// Reads pending data globally
export function usePendingData() {
    return useContext(PendingDataContext);
}

// Manage pending data globally
export function usePendingDataDispatch() {
    return useContext(PendingDataDispatchContext);
}
