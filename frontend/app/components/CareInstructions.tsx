import { Box, Typography, TextField, MenuItem, Button } from "@mui/material"
import { usePendingData, usePendingDataDispatch } from "../context/CareEditorContext"
import { careInstructions } from "@/public/data/data"
import { Checkbox, FormControlLabel } from "@mui/material";

export const CareInstructions = () => {

    const pendingData = usePendingData()
    const dispatch = usePendingDataDispatch()

    const handleCareChange = (index: number, value: any) => {
        if(pendingData){
            const updated = [...pendingData.careInstructionsList];
            updated[index] = value;
            dispatch?.setCareInstructionsList(updated);
        }
    };

    const handleIndChange =(event: React.ChangeEvent<HTMLInputElement>)=>{
        dispatch?.setCareInstructionLangInd(event.target.checked)
    }

    const addCareRow = () => {
        if (pendingData)
            dispatch?.setCareInstructionsList([...pendingData.careInstructionsList, 0]);
    }
    const removeCareRow = () => {
        if (pendingData)
            dispatch?.setCareInstructionsList(pendingData.careInstructionsList.slice(0, -1));
    }


    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems:'center',
                    flexDirection:'column',
                    pt: 5
                }}
            >
                <Typography>
                    CARE INSTRUCTIONS
                </Typography>
                <FormControlLabel
                    control={<Checkbox checked={pendingData?.careInstructionLangInd} onChange={handleIndChange} />}
                    label={"Language Indicator"}
                    sx={{pt:2}}
                />
            </Box>
            {pendingData?.careInstructionsList.map((data, i) => (
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
                        onChange={(e) => { handleCareChange(i, e.target.value) }}
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
                        {careInstructions.english.map((option, i) => (
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
        </>
    )
}