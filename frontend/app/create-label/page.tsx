'use client'
import { Box, Typography, CssBaseline, Container, TextField, MenuItem, Button, Checkbox, IconButton } from "@mui/material"
import { materials, percentages, careInstructions, languages, coo } from "@/public/data/data"
import { useState } from "react"
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import VerticalTabs from "../components/VerticalTabs";
import { CareLabelDataProvider } from "../context/CareEditorContext";
import { usePendingData, usePendingDataDispatch } from "../context/CareEditorContext"


const Page = () => {

    const pendingData = usePendingData()
    const dispatch = usePendingDataDispatch()
    const [fullscreen, setFullscreen] = useState(false)

  

    const handleScreenChange = () => {
        setFullscreen(!fullscreen);
    }

    


    return (
            <Box
                sx={{
                    display: "flex",
                    minHeight: "100vh",
                    flexDirection: {
                        xl: 'row',
                        lg: 'row',
                        md: 'column',
                        sm: 'column',
                        xs: 'column'
                    },
                    gap: 5,
                    pt: { xl: 8, lg: 8, md: 8, sm: 7, xs: 7 }
                }}
            >
                <CssBaseline />
                {!fullscreen &&
                    <Container
                        sx={{
                            bgcolor: "#212121",
                            minHeight: '100vh',
                            width: {
                                xl: '70%',
                                lg: '70%',
                                md: '100%',
                                sm: '100%',
                                xs: '100%'
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
                        <VerticalTabs />

                        

                        
                        

                    </Container>
                }
                {
                    pendingData?.selectedLanguages.length !== 0 ?
                        <Container
                            sx={{
                                minHeight: '100vh',
                                display: 'flex',
                                alignContent: !fullscreen ? 'flex-start' : '',
                                justifyContent: fullscreen ? 'center' : '',
                                flexWrap: "wrap",
                                gap: 2,
                                padding: 4,
                            }}
                        >
                            <Box
                                sx={{
                                    width: '100%'
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
                            {pendingData?.selectedLanguages.map((data: string, i) => (
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
                                        {pendingData?.cooIndex !== 0 &&
                                            <Typography sx={{ color: '#000', fontSize: 10 }}>
                                                {coo[data.toLowerCase().replace(' ', '_') as keyof typeof materials][pendingData?.cooIndex]}
                                            </Typography>
                                        }
                                        {pendingData?.fiberContent.map((fiber, index) => (
                                            fiber.material !== 0 && fiber.percentage !== 'Select' &&
                                            <Typography key={index} sx={{ color: '#000', fontSize: 10 }}>
                                                {fiber.percentage} {materials[data.toLowerCase().replace(' ', '_') as keyof typeof materials][fiber.material]}
                                            </Typography>

                                        ))}
                                        {pendingData?.careInstructionsList.map((care, index) => (
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
                                    fontSize: 30,
                                    opacity: 0.3
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
                            color: '#fff',
                            bgcolor: '#000',
                            border: 2,
                        }}
                        onClick={handleScreenChange}
                    >
                        {!fullscreen ?
                            <FullscreenIcon sx={{ fontSize: 30 }} />
                            :
                            <FullscreenExitIcon sx={{ fontSize: 30 }} />
                        }
                    </IconButton>
                </Box>
            </Box>
    )
}

export default Page