'use client'
import { Box, Typography, CssBaseline, Container, TextField, MenuItem, Button } from "@mui/material"
import { materials, percentages, careInstructions } from "@/public/data/data"
import { useState } from "react"


const Page = () => {
    const[rowNumFiber, setRowNumFiber] = useState(1)
    const[rowNumCare, setRowNumCare] = useState(1)

    const handleRowNumFiber=(i: number)=>{
        const num = rowNumFiber + i
        if(num >= 1){
            setRowNumFiber(num)
        }
    }

    const handleRowNumCare=(i: number)=>{
        const num = rowNumCare + i
        if(num >= 1){
            setRowNumCare(num)
        }
    }

    return (
        <Box
            sx={{
                display: "flex",
                minHeight: "100vh",
                gap: 5,
                padding:2
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
                        display:"flex",
                        padding:3,
                    }}
                >
                    <Typography
                        sx={{
                            fontSize:20
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
                { [...Array(rowNumFiber).keys()].map((i)=>(
                <Box
                    key={i}
                    sx={{
                        display:'flex',
                        justifyContent: "center",
                        gap:5,
                        p:4
                    }}
                >
                    <TextField
                        select
                        label="Select"
                        helperText="Please select material"
                    >
                        {materials.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        select
                        label="Select"
                        helperText="Please select percentage"
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
                        display:'flex',
                        justifyContent: "center",
                        gap:5
                    }}
                >
                    <Button
                        onClick={()=>{
                            handleRowNumFiber(1)
                            console.log(rowNumFiber)
                        }}
                    >
                        ADD ROW
                    </Button>
                    <Button
                        onClick={()=>{
                            handleRowNumFiber(-1)
                            console.log(rowNumFiber)
                        }}
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
                { [...Array(rowNumCare).keys()].map((i)=>(
                <Box
                    key={i}
                    sx={{
                        display:'flex',
                        justifyContent: "center",
                        gap:5,
                        p:4
                    }}
                >
                    <TextField
                        select
                        label="Select"
                        helperText="Please select care instructions"
                    >
                        {careInstructions.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>
                ))}
                <Box
                    sx={{
                        display:'flex',
                        justifyContent: "center",
                        gap:5
                    }}
                >
                    <Button
                        onClick={()=>{
                            handleRowNumCare(1)
                            console.log(rowNumCare)
                        }}
                    >
                        ADD ROW
                    </Button>
                    <Button
                        onClick={()=>{
                            handleRowNumCare(-1)
                            console.log(rowNumCare)
                        }}
                    >
                        DELETE ROW
                    </Button>
                </Box>
            </Container>
            <Container
                sx={{
                    bgcolor: "#303030",
                    height: '90vh',
                    borderRadius: 5
                }}
            >
                <Typography>
                    Create Label
                </Typography>
            </Container>
        </Box>
    )
}

export default Page