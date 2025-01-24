'use client'
import { Box, Typography, CssBaseline, Container, TextField, MenuItem, Button, Checkbox, IconButton } from "@mui/material"
import { materials, percentages, careInstructions, languages } from "@/public/data/data"
import { useState } from "react"
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Draggable from "react-draggable";
import React, { useRef } from 'react';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';


const Page = () => {
    const [rowNumFiber, setRowNumFiber] = useState(1)
    const [rowNumCare, setRowNumCare] = useState(1)

    const [fullscreen, setFullscreen] = useState(false)

    const [selectedLanguages, setSelectedLanguages] = useState<string[]>(["English"]); // Default to English checked

    const [fiberContent, setFiberContent] = useState([{ material: 0, percentage: "Select" }]);
    const [careInstructionsList, setCareInstructionsList] = useState<number[]>([0]);

    const handleScreenChange = () =>{
        setFullscreen(!fullscreen);
    }

    const handleFiberChange = (index: number, field: "material" | "percentage", value: any) => {
        const updated = [...fiberContent];
        if (field === "percentage") { updated[index][field] = value; }
        else { updated[index][field] = value; }
        setFiberContent(updated);
    };

    const addFiberRow = () => setFiberContent([...fiberContent, { material: 0, percentage: "Select" }]);
    const removeFiberRow = () => setFiberContent(fiberContent.slice(0, -1));

    const handleCareChange = (index: number, value: any) => {
        const updated = [...careInstructionsList];
        updated[index] = value;
        setCareInstructionsList(updated);
    };

    const addCareRow = () => setCareInstructionsList([...careInstructionsList, 0]);
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
                flexDirection:{
                    xl:'row',
                    lg:'row',
                    md:'column',
                    sm:'column',
                    xs:'column'
                },
                gap: 5,
                pt: {xl:8,lg:8,md:8,sm:7,xs:7}
            }}
        >
            <CssBaseline />
            { !fullscreen &&
            <Container
                sx={{
                    bgcolor: "#212121",
                    minHeight: '100vh',
                    width: {
                        xl:'70%',
                        lg:'70%',
                        md:'100%',
                        sm:'100%',
                        xs:'100%'
                    }
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
                            onChange={(e) => { handleFiberChange(i, "material", e.target.value) }}
                        >
                            {materials.english.map((option, i) => (
                                <MenuItem key={i} value={i}>
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
                {careInstructionsList.map((data, i) => (
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
                            onChange={(e) => {handleCareChange(i, e.target.value)}}
                            sx={{
                                width: '250px'
                            }}
                            SelectProps={{
                                MenuProps: {
                                    PaperProps: {
                                        sx: {
                                            maxWidth: '700px',  // Limit dropdown width
                                        }
                                    }
                                }
                            }}
                        >
                            {careInstructions.english.map((option , i) => (
                                <MenuItem key={i} value={i}>
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
            }
            {
            selectedLanguages.length !== 0 ?
            <Container
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignContent: !fullscreen ? 'flex-start': '',
                    justifyContent: fullscreen ? 'center': '', 
                    flexWrap: "wrap",
                    gap: 2,
                    padding: 4,
                }}
            >
                <Box
                    sx={{
                        width:'100%'
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: 20
                        }}
                    >
                        LABEL VIEW
                    </Typography>
                </Box>
                {selectedLanguages.map((data: string, i) => (
                    <Box key={i}>
                        <Typography>
                            {data}
                        </Typography>
                        <Box
                            sx={{
                                width: 200,
                                height: 350,
                                bgcolor: 'white',
                                paddingTop: 3
                            }}
                        >
                            {fiberContent.map((fiber, index) => (
                                fiber.material !== 0 && fiber.percentage !== 'Select' &&
                                <Typography key={index} sx={{ color: '#000', fontSize: 10 }}>
                                    {fiber.percentage} {materials[data.toLowerCase().replace(' ', '_') as keyof typeof materials][fiber.material]}
                                </Typography>

                            ))}
                            {careInstructionsList.map((care, index) => (
                                care !== 0 &&
                                <Typography key={index} sx={{ color: '#000', fontSize: 10 }}>
                                    {careInstructions[data.toLowerCase().replace(' ', '_') as keyof typeof careInstructions][care]}
                                </Typography>
                            ))}
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
            :
            <Container
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignContent: 'center',
                    justifyContent: 'center', 
                    flexWrap: "wrap",
                    gap: 2,
                    padding: 4,
                }}
            >
                <Typography
                    sx={{
                        fontSize:30,
                        opacity:0.3
                    }}
                >
                    Select Language Options
                </Typography>
            </Container>
            }
            <Box
                sx={{
                    position: 'fixed',
                    bottom: 16,  // Distance from bottom
                    right: 16,   // Distance from right
                    zIndex: 1000 // Ensures it stays above other content
                }}
            >
                <IconButton
                    sx={{
                        color:'#fff',
                        bgcolor:'#000',
                        border:2,
                    }}
                    onClick={handleScreenChange}
                >
                    { !fullscreen ? 
                    <FullscreenIcon sx={{fontSize:30}}/>
                    :
                    <FullscreenExitIcon sx={{fontSize:30}}/>
                    }
                </IconButton>
            </Box>
        </Box>
    )
}

export default Page