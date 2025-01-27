import { Box, TextField, Typography, MenuItem } from "@mui/material"
import { coo } from "@/public/data/data"
import { usePendingData, usePendingDataDispatch } from "../context/CareEditorContext"

export const CountryOfOrigin = () => {
    const pendingData = usePendingData()
    const dispatch = usePendingDataDispatch()

    const handleCooChange = (value: any) => {
        dispatch?.setCooIndex(value);
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
                    COUNTRY OF ORGIN
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
                    helperText="Please select Country of orgin"
                    value={pendingData?.cooIndex}
                    onChange={(e) => { handleCooChange(e.target.value) }}
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
                    {coo.english.map((option, i) => (
                        <MenuItem key={i} value={i}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
            </Box>
        </>
    )
}