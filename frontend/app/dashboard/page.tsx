'use client'
import { Box, CssBaseline, Typography, IconButton, Divider, TextField, Card, CardContent } from "@mui/material"
import { useState, useEffect } from "react";
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Grid from '@mui/material/Grid2';
import SecureRoute from "../secureRoute/SecureRoute";

const tempSets = [
    {
        title: "title d",
        date: "2005-01-01",
        starred: false
    },
    {
        title: "title b",
        date: "2010-01-02",
        starred: false
    },
    {
        title: "title c",
        date: "2002-01-03",
        starred: false
    },
    {
        title: "title z",
        date: "2021-01-04",
        starred: false
    },
    {
        title: "title l",
        date: "2000-01-05",
        starred: false
    },
    {
        title: "title p",
        date: "1999-01-06",
        starred: true
    }
]

const dashboard = () => {

    const [starred, setStarred] = useState<boolean>(false);
    const [alphaOption, setAlphaOption] = useState<boolean>(true);
    const [dateOption, setDateOption] = useState<boolean>(false);
    const [order, setOrder] = useState<boolean>(false);
    const [savedSets, setSavedSets] = useState<{ title: string; date: string; starred: boolean }[]>([]);
    const [stars, setStars] = useState<boolean[]>([]);
    //const [sortedSets, setSortedSets] = useState<{ title: string; date: string; starred: boolean }[]>([]);

    useEffect(() => {
        setSavedSets(tempSets); // axios call here
        // const tempSorted = [...tempSets]
        //     .sort((a, b) => {
        //         if (alphaOption) {
        //             return order
        //                 ? b.title.localeCompare(a.title) // Descending
        //                 : a.title.localeCompare(b.title); // Ascending
        //         }
        //         if (dateOption) {
        //             return order
        //                 ? new Date(b.date).getTime() - new Date(a.date).getTime() // Descending
        //                 : new Date(a.date).getTime() - new Date(b.date).getTime(); // Ascending
        //         }
        //         return 0;
        //     });
        // setSortedSets(tempSorted);
        // setStars(tempSorted.map(set => set.starred));
    }, [])

    const sortedSets = [...savedSets]
        //.map((set, index) => ({ ...set, starred: stars[index] })) // Attach star status
        .sort((a, b) => {
            // if (starred) {
            //     if (a.starred !== b.starred) return b.starred ? 1 : -1;
            // }
            if (alphaOption) {
                return order
                    ? b.title.localeCompare(a.title) // Descending
                    : a.title.localeCompare(b.title); // Ascending
            }
            if (dateOption) {
                return order
                    ? new Date(b.date).getTime() - new Date(a.date).getTime() // Descending
                    : new Date(a.date).getTime() - new Date(b.date).getTime(); // Ascending
            }
            return 0;
        });


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

    const handleStarsChange = (index: number) => {
        const newStars = [...stars];
        newStars[index] = !stars[index];
        setStars(newStars);
    }

    // const sortAlpha = () => {
    //     if(alphaOption){
    //         const tempSorted = [...savedSets]
    //         .sort((a,b) =>{
    //             return order
    //                 ? b.title.localeCompare(a.title) // Descending
    //                 : a.title.localeCompare(b.title); // Ascending
    //         });
    //         setSortedSets(tempSorted);
    //     }
    // }

    // const sortDate = () => {
    //     if(dateOption){
    //         const tempSorted = [...savedSets]
    //         .sort((a,b) =>{
    //             return order
    //             ? new Date(b.date).getTime() - new Date(a.date).getTime() // Descending
    //             : new Date(a.date).getTime() - new Date(b.date).getTime(); // Ascending
    //         });
    //         setSortedSets(tempSorted);
    //     }
    // }



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

                        {/* <IconButton
                            onClick={handleStarredChange}
                        >
                            {starred ? <StarIcon sx={{ color: '#ffff00' }} /> : <StarBorderIcon />}
                        </IconButton> */}

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
                        justifyContent: 'center',
                        width:'50%',
                        flexWrap:'wrap',
                        columnGap:2,
                        rowGap:2,
                        mt:3
                    }}
                >
                        {
                            sortedSets.map((data, index) => (
                                    <Card
                                        sx={{
                                            transition: 'transform 0.3s ease-in-out', // Smooth transition
                                            '&:hover': {
                                                transform: 'scale(1.1)', // Slightly expand the card
                                            },
                                            height:150,
                                            width:150
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
                                        {/* <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'flex-end',
                                                alignItems: 'center',
                                                marginTop: 'auto'  // Push the icon to the bottom of the card content
                                            }}
                                        >
                                            <IconButton
                                                onClick={() => { handleStarsChange(index) }}
                                            >
                                                {stars[index] ? <StarIcon sx={{ color: '#ffff00' }} /> : <StarBorderIcon />}
                                            </IconButton>
                                        </Box> */}
                                    </Card>
                            ))}
                </Box>

            </Box>
        </SecureRoute>
    )
}

export default dashboard