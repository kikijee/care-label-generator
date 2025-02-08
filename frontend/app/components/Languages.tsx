import { Box, Typography, FormGroup, FormControlLabel, Checkbox } from "@mui/material"
import { languages } from "@/public/data/data"
import { usePendingData, usePendingDataDispatch } from "../context/CareEditorContext"

export const Languages = () => {
    const pendingData = usePendingData()
    const dispatch = usePendingDataDispatch()

    const handleCheckboxChange = (lang: string) => {
        dispatch?.setSelectedLanguages((prev) =>
            prev.includes(lang)
                ? prev.filter((item) => item !== lang) // Remove if already checked
                : [...prev, lang] // Add if not already checked
        );
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: 'center',
                flexDirection: 'column'
            }}
        >
            <Box
                sx={{
                    pt: 5
                }}
            >
                <Typography>
                    LANGUAGES
                </Typography>
            </Box>
            <Box
                sx={{
                    pt:2,
                    width:{xl:'75%',lg:'75%',md:'75%'}
                }}
            >
                <FormGroup 
                    sx={{
                        display: 'flex',
                        justifyContent: "center",
                        alignItems:'center',
                    }} 
                    row
                >
                    {languages.map((lang, i) => (
                        <FormControlLabel
                            key={i}
                            control={
                                <Checkbox
                                    checked={pendingData?.selectedLanguages.includes(lang)}
                                    onChange={() => handleCheckboxChange(lang)}
                                />
                            }
                            label={lang}
                        />
                    ))}
                </FormGroup>
            </Box>
        </Box>
    )
}