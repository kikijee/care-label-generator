import { Box, TextField, Typography } from "@mui/material"
import InputAdornment from '@mui/material/InputAdornment';
import { usePendingData, usePendingDataDispatch } from "../context/CareEditorContext"

export const Measurements =()=>{

    const pendingData = usePendingData()
    const dispatch = usePendingDataDispatch()

    const handleSeamChange =(value:any)=>{
        dispatch?.setSeamGap(value)
    }

    const handleXChange =(value:any)=>{
        dispatch?.setX(value)
    }

    const handleYChange =(value:any)=>{
        dispatch?.setY(value)
    }

    const handleFontChange =(value:any)=>{
        dispatch?.setFontSize(value)
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
                SEAM GAP
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
                helperText="seam allowence"
                type="number"
                value={pendingData?.seamGap}
                onChange={(e) => { handleSeamChange(e.target.value) }}
                sx={{
                    width: '250px'
                }}
                slotProps={{
                    input: {
                      endAdornment: <InputAdornment position="end">in</InputAdornment>,
                    },
                  }}
            />
        </Box>
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                pt: 5
            }}
        >
            <Typography>
                LABEL DIMENSIONS
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
                helperText="width"
                type="number"
                value={pendingData?.x}
                onChange={(e) => { handleXChange(e.target.value) }}
                slotProps={{
                    input: {
                      endAdornment: <InputAdornment position="end">in</InputAdornment>,
                    },
                  }}
            />
            <TextField
                helperText="height"
                type="number"
                value={pendingData?.y}
                onChange={(e) => { handleYChange(e.target.value) }}
                slotProps={{
                    input: {
                      endAdornment: <InputAdornment position="end">in</InputAdornment>,
                    },
                  }}
            />
        </Box>
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                pt: 5
            }}
        >
            <Typography>
                FONT SIZE
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
                helperText="seam allowence"
                type="number"
                value={pendingData?.fontSize}
                onChange={(e) => { handleFontChange(e.target.value) }}
                sx={{
                    width: '250px'
                }}
                slotProps={{
                    input: {
                      endAdornment: <InputAdornment position="end">pt</InputAdornment>,
                    },
                  }}
            />
        </Box>
    </>
    )
}