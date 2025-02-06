import { Box, TextField, Typography, MenuItem } from "@mui/material"
import InputAdornment from '@mui/material/InputAdornment';
import { usePendingData, usePendingDataDispatch } from "../context/CareEditorContext"

export const Measurements = () => {

    const pendingData = usePendingData()
    const dispatch = usePendingDataDispatch()

    const handleSeamChange = (value: any) => {
        dispatch?.setSeamGap(value)
    }

    const handleXChange = (value: any) => {
        dispatch?.setX(value)
    }

    const handleYChange = (value: any) => {
        dispatch?.setY(value)
    }

    const handleFontChange = (value: any) => {
        dispatch?.setFontSize(value)
    }

    const handleAlignmentChange = (value: string) => {
        dispatch?.setAlignment(value)
    }

    const handleMarginLeftChange = (value: any) => {
        dispatch?.setMarginLeft(value)
    }

    return (
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
                    helperText="font size"
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

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    pt: 5
                }}
            >
                <Typography>
                    TEXT ALIGNMENT
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
                    select
                    label="Select"
                    helperText="text alignment type"
                    defaultValue={pendingData?.alignment}
                    value={pendingData?.alignment}
                    onChange={(e) => { handleAlignmentChange(e.target.value) }}
                    sx={{
                        width: '250px'
                    }}
                >
                    <MenuItem value={"Left"}>
                        Left
                    </MenuItem>
                    <MenuItem value={"Center"}>
                        Centered
                    </MenuItem>
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
                    MARGIN LEFT
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
                    helperText="left margin spacing"
                    type="number"
                    value={pendingData?.marginLeft}
                    onChange={(e) => { handleMarginLeftChange(e.target.value) }}
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
        </>
    )
}