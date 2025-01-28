import { Box, Typography, TextField } from "@mui/material"
import { usePendingData, usePendingDataDispatch } from "../context/CareEditorContext" 

export const AdditionalInfo =()=>{

    const pendingData = usePendingData()
    const dispatch = usePendingDataDispatch()

    const handleRnChange =(value: any)=>{
        dispatch?.setRnNumber(value)
    }

    const handleWebsiteChange =(value: any)=>{
        dispatch?.setWebsite(value)
    }

    const handleAddressChange =(value: any)=>{
        dispatch?.setAddress(value)
    }

    return(
        <>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    pt: 5
                }}
            >
                <Typography>
                    RN NUMBER
                </Typography>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: "center",
                    gap: 5,
                    p: 4
                }}
            >
                <TextField
                    helperText="enter RN number"
                    value={pendingData?.rnNumber}
                    onChange={(e) => { handleRnChange(e.target.value) }}
                    sx={{
                        width: '250px'
                    }}
                >
                </TextField>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    pt: 5
                }}
            >
                <Typography>
                    ADDRESS
                </Typography>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: "center",
                    gap: 5,
                    p: 4
                }}
            >
                <TextField
                    helperText="enter address"
                    value={pendingData?.address}
                    onChange={(e) => { handleAddressChange(e.target.value) }}
                    sx={{
                        width: '250px'
                    }}
                >
                </TextField>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    pt: 5
                }}
            >
                <Typography>
                    Website
                </Typography>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: "center",
                    gap: 5,
                    p: 4
                }}
            >
                <TextField
                    helperText="enter website"
                    value={pendingData?.website}
                    onChange={(e) => { handleWebsiteChange(e.target.value) }}
                    sx={{
                        width: '250px'
                    }}
                >
                </TextField>
            </Box>
        </>
    )
}