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
    fontSize:number;
    rnNumber:string;
    address:string;
    website:string;
    alignment:string;
    marginLeft:number;
    logo:string;
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
    setFontSize: React.Dispatch<React.SetStateAction<number>>;
    setRnNumber: React.Dispatch<React.SetStateAction<string>>;
    setAddress: React.Dispatch<React.SetStateAction<string>>;
    setWebsite: React.Dispatch<React.SetStateAction<string>>;
    setAlignment: React.Dispatch<React.SetStateAction<string>>;
    setMarginLeft: React.Dispatch<React.SetStateAction<number>>;
    setLogo: React.Dispatch<React.SetStateAction<string>>;
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
    const [zoom, setZoom] = useState<number>(75);
    const [fontSize, setFontSize] = useState<number>(6);
    const [rnNumber, setRnNumber] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [website, setWebsite] = useState<string>("");
    const [alignment, setAlignment] = useState<string>("Left");
    const [marginLeft, setMarginLeft] = useState<number>(0);
    const [logo, setLogo] = useState<string>("");

    const dispatch = {
        setSelectedLanguages,
        setFiberContent,
        setCareInstructionsList,
        setCooIndex,
        setX,
        setY,
        setSeamGap,
        setZoom,
        setFontSize,
        setRnNumber,
        setAddress,
        setWebsite,
        setAlignment,
        setMarginLeft,
        setLogo
    };

    const pendingData = {
        selectedLanguages,
        fiberContent,
        careInstructionsList,
        cooIndex,
        x,
        y,
        seamGap,
        zoom,
        fontSize,
        rnNumber,
        address,
        website,
        alignment,
        marginLeft,
        logo
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
