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
        <>
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
                                    checked={pendingData?.selectedLanguages.includes(lang)}
                                    onChange={() => handleCheckboxChange(lang)}
                                />
                            }
                            label={lang}
                        />
                    ))}
                </FormGroup>
            </Box>
        </>
    )
}