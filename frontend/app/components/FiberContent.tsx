import { Box, Typography, TextField, MenuItem, Button } from "@mui/material"
import { usePendingData, usePendingDataDispatch } from "../context/CareEditorContext"
import { materials } from "@/public/data/data"
import { percentages } from "@/public/data/data"

export const FiberContent = () => {

    const pendingData = usePendingData()
    const dispatch = usePendingDataDispatch()

    const handleFiberChange = (index: number, field: "material" | "percentage", value: any) => {
        if(pendingData){
            const updated = [...pendingData.fiberContent];
            if (field === "percentage") { updated[index][field] = value; }
            else { updated[index][field] = value; }
            dispatch?.setFiberContent(updated);
        }
    };

    const addFiberRow = () => {
        if(pendingData)
            dispatch?.setFiberContent([...pendingData.fiberContent, { material: 0, percentage: "Select" }]);
    }
    const removeFiberRow = () => {
        if(pendingData)
            dispatch?.setFiberContent(pendingData.fiberContent.slice(0, -1));
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
                    FIBER CONTENT
                </Typography>
            </Box>
            {pendingData?.fiberContent.map((data, i) => (
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
        </>
    )
}