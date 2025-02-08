import { Box, Typography, TextField, Button, IconButton } from "@mui/material"
import { usePendingData, usePendingDataDispatch } from "../context/CareEditorContext"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import ClearIcon from '@mui/icons-material/Clear';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export const AdditionalInfo = () => {

    const pendingData = usePendingData()
    const dispatch = usePendingDataDispatch()

    const handleRnChange = (value: any) => {
        dispatch?.setRnNumber(value)
    }

    const handleWebsiteChange = (value: any) => {
        dispatch?.setWebsite(value)
    }

    const handleAddressChange = (value: any) => {
        dispatch?.setAddress(value)
    }

    const handleUploadClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || event.target.files.length === 0) return;

        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            dispatch?.setLogo(reader.result as string);
        };

        reader.readAsDataURL(file);
        event.target.value = "";
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
                    WEBSITE
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

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    pt: 5
                }}
            >
                <Typography>
                    LOGO UPLOAD
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
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                >
                    Upload files
                    <VisuallyHiddenInput
                        type="file"
                        onChange={handleUploadClick}
                        accept="image/*"
                    />
                </Button>
            </Box>
            {pendingData?.logo &&
                <>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: "center",
                        }}
                    >
                        <IconButton
                            onClick={()=>dispatch?.setLogo("")}
                        >
                            <ClearIcon />
                        </IconButton>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: "center",
                        }}
                    >
                        <img src={pendingData.logo} alt="Uploaded Preview" style={{ marginTop: 10, width: 100, height: "auto"}} />
                    </Box>
                </>
            }
        </>
    )
}