'use client'
import { Box, CssBaseline, Typography, IconButton, Divider, TextField, Card, CardContent } from "@mui/material"
import { useState, useEffect } from "react";
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import SwapVertIcon from '@mui/icons-material/SwapVert';
//import StarBorderIcon from '@mui/icons-material/StarBorder';
//import StarIcon from '@mui/icons-material/Star';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
//import Grid from '@mui/material/Grid2';
import SecureRoute from "../secureRoute/SecureRoute";
import { get_labels_by_user_id } from "../api-service/label";
import { useRouter } from 'next/navigation';
import DeleteIcon from '@mui/icons-material/Delete';
import { delete_label } from "../api-service/label";
import Notification from "../components/Notification";

type Measurements = {
    SeamGap: number;
    Width: number;
    Height: number;
    FontSize: number;
};

type AdditionalInfo = {
    RnNumber: string;
    Address: string;
    Website: string;
};

type LabelData = {
    LabelID: number;
    createdAt: string;
    updatedAt: string;
    _id: string;
    Title: string;
    Measurements: Measurements;
    FiberContent: number[];
    CareLabel: number[];
    AdditionalInfo: AdditionalInfo;
    Languages: string[];
};

const Dashboard = () => {

    //const [starred, setStarred] = useState<boolean>(false);
    const [alphaOption, setAlphaOption] = useState<boolean>(true);
    const [dateOption, setDateOption] = useState<boolean>(false);
    const [order, setOrder] = useState<boolean>(false);
    const [savedSets, setSavedSets] = useState<LabelData[]>([]);
    //const [stars, setStars] = useState<boolean[]>([]);
    const router = useRouter();

    const [notification, setNotification] = useState(false);
    const [notificationStatus,setNotificationStatus] = useState(false);
    const [notificationMessage,setNotificationMessage] = useState("");
    const [search, setSearch] = useState("");


    useEffect(() => {
        const fetchData = async () => {
            const response = await get_labels_by_user_id()
            console.log(response)
            if (response.status === 200) {
                setSavedSets(response.data);
            }
            else {
                //handle error
            }
        }
        fetchData();
    }, [])

    const sortedSets = [...savedSets]
        //.map((set, index) => ({ ...set, starred: stars[index] })) // Attach star status
        .sort((a, b) => {
            // if (starred) {
            //     if (a.starred !== b.starred) return b.starred ? 1 : -1;
            // }
            if (alphaOption) {
                return order
                    ? b.Title.localeCompare(a.Title) // Descending
                    : a.Title.localeCompare(b.Title); // Ascending
            }
            if (dateOption) {
                return order
                    ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime() // Descending
                    : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(); // Ascending
            }
            return 0;
        })
        .filter(item => item.Title.toLowerCase().includes(search.toLowerCase()));


    // const handleStarredChange = () => {
    //     setStarred(!starred);
    // }
    const handleCloseNotification = () => {
        setNotification(false)
    }

    const handleLabelDelete = async (id: number) => {
        const response = await delete_label(id);
        if(response.status === 200){
            const updatedLabels = savedSets.filter((data) => data.LabelID !== id);
            setSavedSets(updatedLabels)
            setNotificationStatus(true);
            setNotification(true);
            setNotificationMessage("delete success");
        }
        else{
            setNotificationStatus(false);
            setNotification(true);
            setNotificationMessage("delete failure");
        }
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

    // const handleStarsChange = (index: number) => {
    //     const newStars = [...stars];
    //     newStars[index] = !stars[index];
    //     setStars(newStars);
    // }

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
                        <TextField 
                            size="small" 
                            label="search" 
                            variant="outlined"
                            value={search}
                            onChange={(e:any)=>setSearch(e.target.value)}
                        />

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
                { savedSets.length !== 0 ?
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        width: '50%',
                        flexWrap: 'wrap',
                        columnGap: 2,
                        rowGap: 2,
                        mt: 3
                    }}
                >
                    {
                        sortedSets.map((data, index) => (
                            <Card
                                key={index}
                                onClick={() => router.push(`/dashboard/label/${data.LabelID}`)}
                                sx={{
                                    transition: 'transform 0.3s ease-in-out', // Smooth transition
                                    '&:hover': {
                                        transform: 'scale(1.1)', // Slightly expand the card
                                        cursor: "pointer"
                                    },
                                    height: 175,
                                    width: 175,
                                }}
                            >
                                <CardContent>
                                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: { xs: 14, sm: 16 } }}>
                                        {data.Title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontSize: { xs: 14, sm: 16 } }}>
                                        {new Date(data.createdAt).toISOString().split("T")[0]}
                                    </Typography>
                                    <Box
                                        sx={{ position: 'absolute', bottom: 5, left: 5 }}
                                    >
                                        <IconButton
                                            onClick={(e: any) => { 
                                                e.stopPropagation() 
                                                handleLabelDelete(data.LabelID);
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </CardContent>

                            </Card>
                        ))}
                </Box>
                :
                <Box
                    sx={{
                        display:'flex',
                        justifyContent:'center',
                        alignItems:'center',
                        minHeight:'90vh'
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: 30,
                            opacity: 0.3
                        }}
                    >
                        No Labels Saved
                    </Typography>
                </Box>
                }

            </Box>
            {notification &&
                  <Notification message={notificationMessage} status={notificationStatus} close={handleCloseNotification} />
                }
        </SecureRoute>
    )
}

export default Dashboard