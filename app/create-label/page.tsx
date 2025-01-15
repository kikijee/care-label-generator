'use client'
import { Box, Typography, CssBaseline, Container, TextField, MenuItem, Button, Checkbox } from "@mui/material"
import { materials, percentages, careInstructions, languages } from "@/public/data/data"
import { useState } from "react"
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Draggable from "react-draggable";
import React, { useRef } from 'react';


const Page = () => {
    const [rowNumFiber, setRowNumFiber] = useState(1)
    const [rowNumCare, setRowNumCare] = useState(1)

    const [selectedLanguages, setSelectedLanguages] = useState<string[]>(["English"]); // Default to English checked

    const [fiberContent, setFiberContent] = useState([{ material: "Select", percentage: "Select" }]);
    const [careInstructionsList, setCareInstructionsList] = useState(["Select"]);

    const handleFiberChange = (index: number, field: "material" | "percentage", value: string) => {
        const updated = [...fiberContent];
        updated[index][field] = value;
        setFiberContent(updated);
    };

    const addFiberRow = () => setFiberContent([...fiberContent, { material: "Select", percentage: "Select" }]);
    const removeFiberRow = () => setFiberContent(fiberContent.slice(0, -1));

    const handleCareChange = (index: number, value: string) => {
        const updated = [...careInstructionsList];
        updated[index] = value;
        setCareInstructionsList(updated);
    };

    const addCareRow = () => setCareInstructionsList([...careInstructionsList, "Select"]);
    const removeCareRow = () => setCareInstructionsList(careInstructionsList.slice(0, -1));

    const myRef = useRef<HTMLDivElement>(null);


    const handleRowNumFiber = (i: number) => {
        const num = rowNumFiber + i
        if (num >= 1) {
            setRowNumFiber(num)
        }
    }

    const handleRowNumCare = (i: number) => {
        const num = rowNumCare + i
        if (num >= 1) {
            setRowNumCare(num)
        }
    }

    const handleCheckboxChange = (lang: string) => {
        setSelectedLanguages((prev) =>
            prev.includes(lang)
                ? prev.filter((item) => item !== lang) // Remove if already checked
                : [...prev, lang] // Add if not already checked
        );
    };

    return (
        <Box
            sx={{
                display: "flex",
                minHeight: "100vh",
                gap: 5,
                padding: 2
            }}
        >
            <CssBaseline />
            <Container
                sx={{
                    bgcolor: "#303030",
                    height: '90vh',
                    borderRadius: 5,
                    overflowY: "auto"
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        padding: 3,
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: 20
                        }}
                    >
                        CARE LABEL OPTIONS
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        pt: 5
                    }}
                >
                    <Typography>
                        FIBER CONTENT
                    </Typography>
                </Box>
                {fiberContent.map((data, i) => (
                    <Box
                        key={i}
                        sx={{
                            display: 'flex',
                            justifyContent: "center",
                            gap: 5,
                            p: 4
                        }}
                    >
                        <TextField
                            select
                            label="Select"
                            helperText="Please select material"
                            value={data.material}
                            onChange={(e) => handleFiberChange(i, "material", e.target.value)}
                        >
                            {materials.english.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            select
                            label="Select"
                            helperText="Please select percentage"
                            value={data.percentage}
                            onChange={(e) => handleFiberChange(i, "percentage", e.target.value)}
                        >
                            {percentages.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>
                ))}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: "center",
                        gap: 5
                    }}
                >
                    <Button
                        onClick={addFiberRow}
                    >
                        ADD ROW
                    </Button>
                    <Button
                        onClick={removeFiberRow}
                    >
                        DELETE ROW
                    </Button>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        pt: 5
                    }}
                >
                    <Typography>
                        CARE INSTRUCTIONS
                    </Typography>
                </Box>
                {careInstructionsList.map((data,i) => (
                    <Box
                        key={i}
                        sx={{
                            display: 'flex',
                            justifyContent: "center",
                            gap: 5,
                            p: 4
                        }}
                    >
                        <TextField
                            select
                            label="Select"
                            helperText="Please select care instructions"
                            value={data}
                            onChange={(e) => handleCareChange(i,e.target.value)}
                        >
                            {careInstructions.english.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>
                ))}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: "center",
                        gap: 5
                    }}
                >
                    <Button
                        onClick={addCareRow}
                    >
                        ADD ROW
                    </Button>
                    <Button
                        onClick={removeCareRow}
                    >
                        DELETE ROW
                    </Button>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        pt: 5
                    }}
                >
                    <Typography>
                        LANGUAGES
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        pt: 4
                    }}
                >
                    <FormGroup row>
                        {languages.map((lang, i) => (
                            <FormControlLabel
                                key={i}
                                control={
                                    <Checkbox
                                        checked={selectedLanguages.includes(lang)}
                                        onChange={() => handleCheckboxChange(lang)}
                                    />
                                }
                                label={lang}
                            />
                        ))}
                    </FormGroup>
                </Box>

            </Container>
            <Container
                sx={{
                    bgcolor: "#303030",
                    height: '90vh',
                    borderRadius: 5,
                    display: 'flex',
                    flexWrap: "wrap",
                    gap: 2,
                    padding: 4,
                    overflowY: "auto"
                }}
            >
                {selectedLanguages.map((data, i) => (
                    <Box key={i}>
                        <Typography>
                            {data}
                        </Typography>
                        <Box
                            sx={{
                                width: 200,
                                height: 350,
                                bgcolor: 'white',
                            }}
                        >
                        </Box>
                    </Box>
                ))}
                {/* <Draggable nodeRef={myRef}>
                    <div 
                        ref={myRef} 
                        style={{ 
                            display: 'inline-block', 
                        }}
                    >
                        <Box
                            sx={{
                                ":hover":{
                                    cursor:"grab"
                                },
                                
                            }}
                        >
                            <Typography>HELLO</Typography>
                        </Box>
                    </div>
                </Draggable> */}
            </Container>
        </Box>
    )
}

export default Page