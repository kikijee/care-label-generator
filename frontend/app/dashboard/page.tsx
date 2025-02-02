'use client'
import { Box, CssBaseline, Typography, IconButton, Divider, TextField, Card, CardContent } from "@mui/material"
import { useState } from "react";
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Grid from '@mui/material/Grid2';
import SecureRoute from "../secureRoute/SecureRoute";

const savedSets = [
    {
        title: "title 1",
        date: "2001-01-01"
    },
    {
        title: "title 2",
        date: "2001-01-02"
    },
    {
        title: "title 3",
        date: "2001-01-03"
    },
    {
        title: "title 4",
        date: "2001-01-04"
    },
    {
        title: "title 5",
        date: "2001-01-05"
    }
]

const dashboard = () => {

    const [starred, setStarred] = useState<boolean>(false);
    const [alphaOption, setAlphaOption] = useState<boolean>(true);
    const [dateOption, setDateOption] = useState<boolean>(false);
    const [order, setOrder] = useState<boolean>(false);

    const handleStarredChange = () => {
        setStarred(!starred);
    }

    const handleAlphaOptionChange = () => {
        if (alphaOption) return;
        if (!alphaOption && dateOption) setDateOption(!dateOption);
        setAlphaOption(!alphaOption);
    }

    const handleDateOptionChange = () => {
        if (dateOption) return;
        if (!dateOption && alphaOption) setAlphaOption(!alphaOption);
        setDateOption(!dateOption);
    }

    const handleOrderChange = () => {
        setOrder(!order);
    }

    return (
        <SecureRoute>
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column'
                }}
            >
                <CssBaseline />
                <Box
                    sx={{
                        mt: 12,
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 2
                        }}
                    >
                        <TextField size="small" label="search" variant="outlined" />

                        <IconButton
                            onClick={handleAlphaOptionChange}
                        >
                            <SortByAlphaIcon
                                sx={{
                                    color: alphaOption ? '#9b50fc' : ''
                                }}
                            />
                        </IconButton>

                        <IconButton
                            onClick={handleDateOptionChange}
                        >
                            <CalendarMonthIcon
                                sx={{
                                    color: dateOption ? '#9b50fc' : ''
                                }}
                            />
                        </IconButton>

                        <IconButton
                            onClick={handleStarredChange}
                        >
                            {starred ? <StarIcon sx={{ color: '#ffff00' }} /> : <StarBorderIcon />}
                        </IconButton>

                        <IconButton
                            onClick={handleOrderChange}
                        >
                            <SwapVertIcon
                                sx={{
                                    color: order ? '#00a80b' : '#b72a0b'
                                }}
                            />
                        </IconButton>

                    </Box>

                    <Divider sx={{ width: '100%', mt: 2 }} />
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <Grid container spacing={3} sx={{ marginTop: 5, width: '80%' }}>
                        {
                            savedSets.map((data, index) => (
                                <Grid
                                    key={index}
                                    size={{
                                        xs: 12, sm: 12, md: 5, lg: 4, xl: 4
                                    }}
                                >
                                    <Card
                                        sx={{
                                            transition: 'transform 0.3s ease-in-out', // Smooth transition
                                            '&:hover': {
                                                transform: 'scale(1.1)', // Slightly expand the card
                                            },
                                        }}
                                    >
                                        <CardContent>
                                            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: { xs: 14, sm: 16 } }}>
                                                {data.title}
                                            </Typography>
                                            <Typography variant="body2" sx={{ fontSize: { xs: 14, sm: 16 } }}>
                                                {data.date}
                                            </Typography>
                                        </CardContent>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'flex-end',
                                                alignItems: 'center',
                                                marginTop: 'auto'  // Push the icon to the bottom of the card content
                                            }}
                                        >
                                            {/* <IconButton
                                            onClick={() =>
                                                handleCheck(index)
                                            }>
                                            {checked[index] ? (
                                                <CheckCircleIcon color="success" sx={{ fontSize: 30 }} />  // Filled checkmark if checked
                                            ) : (
                                                <CheckCircleOutlineIcon sx={{ fontSize: 30 }} />  // Outlined checkmark if not checked
                                            )}
                                        </IconButton> */}
                                        </Box>
                                    </Card>
                                </Grid>
                            ))}
                    </Grid>
                </Box>

            </Box>
        </SecureRoute>
    )
}

export default dashboard