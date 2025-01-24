import { Box, Container, IconButton, Typography, Divider } from "@mui/material";
import { LinkedIn, Instagram, GitHub } from "@mui/icons-material";
import Button from "@mui/material/Button";
import { Colors } from "../theme/colors";

const ConnectFooter = () => {
    return (
        <Box
            component="footer"
            sx={{
                py: 2,
                px: 2,
                mt: 'auto',
                background: "linear-gradient(90deg, #000 30%, #444444 100%)",
                width: '100%',
            }}
        >
            <Container
                maxWidth="sm"
                sx={{
                    display: "flex",
                    justifyContent: "space-between", 
                    alignItems: "center",
                    flexWrap: "wrap", 
                    gap: 2, 
                }}
            >
                
                
            </Container>
            <Container
                maxWidth="md"
                sx={{
                    mt: 3
                }}
            >
                <Divider sx={{ bgcolor: Colors.white }} />
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between", 
                        alignItems: "center", 
                        flexWrap: "wrap", 
                        gap: 2, 
                        mt: 3
                    }}
                >
                    <Typography
                        sx={{
                            color: Colors.white,
                            fontSize: {
                                xl:30,
                                lg:28,
                                md:26,
                                sm:24,
                                xs:22
                            }
                        }}
                    >
                        EZ-LABEL
                    </Typography>
                    <Typography
                        sx={{
                            color: Colors.white,
                            opacity: 0.5
                        }}
                    >
                        © {new Date().getFullYear()} All rights reserved
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}

export default ConnectFooter;