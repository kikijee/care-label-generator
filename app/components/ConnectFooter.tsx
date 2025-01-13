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
                backgroundColor: Colors.header_color,
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
                <Box>
                    <Typography
                        sx={{
                            fontSize: {
                                xl:30,
                                lg:28,
                                md:26,
                                sm:24,
                                xs:22
                            } ,
                            color: Colors.black
                        }}
                    >
                        EZ-LABEL
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{
                            bgcolor: Colors.black,
                            borderRadius: 10,
                            px: 3,
                            py: 1,
                            mt: 4
                        }}
                        href="/contact"
                    >
                        <Typography
                            sx={{
                                color: Colors.white,
                                wordSpacing: 5,
                                letterSpacing: 1
                            }}
                        >
                            GET IN TOUCH
                        </Typography>
                    </Button>
                </Box>
                <Box>
                    <Typography
                        sx={{
                            color: Colors.black,
                            wordSpacing: 5,
                            letterSpacing: 1,
                            fontSize: {
                                xl:20,
                                lg:20,
                                md:18,
                                sm:18,
                                xs:18
                            }
                        }}
                    >
                        Socials
                    </Typography>
                </Box>
            </Container>
            <Container
                maxWidth="md"
                sx={{
                    mt: 3
                }}
            >
                <Divider sx={{ bgcolor: Colors.black }} />
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
                            color: Colors.black,
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
                            color: Colors.black,
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