'use client'
import { Box, Typography, CssBaseline, Container, SpeedDial, SpeedDialAction, TextField, Divider } from "@mui/material"
import { materials, careInstructions, coo } from "@/public/data/data"
import { useState, useEffect } from "react"
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import VerticalTabs from "@/app/components/VerticalTabs";
import { usePendingData, usePendingDataDispatch } from "@/app/context/CareEditorContext";
import DownloadIcon from '@mui/icons-material/Download';
import jsPDF from "jspdf";
//import html2canvas from "html2canvas";
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SecureRoute from "@/app/secureRoute/SecureRoute";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { save_label, update_label, upload_logo, remove_logo } from "@/app/api-service/label";
import LabelSaveDialog from "@/app/components/LabelSaveDialog";
import Notification from "@/app/components/Notification";
import { get_label_by_id } from "@/app/api-service/label";
import SaveIcon from '@mui/icons-material/Save';


export const LabelView = ({ id }: { id?: number }) => {

    

    const pendingData = usePendingData();
    const dispatch = usePendingDataDispatch();
    const [fullscreen, setFullscreen] = useState(false);
    const [open, setOpen] = useState(false);
    const [openSaveDialog, setOpenSaveDialog] = useState(false);
    const [title, setTitle] = useState("")

    const [notification, setNotification] = useState(false);
    const [notificationStatus, setNotificationStatus] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id){
            const fetchData = async () => {
                const response = await get_label_by_id(id);
                if (response.status === 200) {
                    setTitle(response.data.Title);
                    dispatch?.setSeamGap(response.data.Measurements.SeamGap);
                    dispatch?.setX(response.data.Measurements.Width);
                    dispatch?.setY(response.data.Measurements.Height);
                    dispatch?.setFontSize(response.data.Measurements.FontSize);
                    dispatch?.setFiberContent(response.data.FiberContent);
                    dispatch?.setCareInstructionsList(response.data.CareLabel);
                    dispatch?.setRnNumber(response.data.AdditionalInfo.RnNumber);
                    dispatch?.setAddress(response.data.AdditionalInfo.Address);
                    dispatch?.setWebsite(response.data.AdditionalInfo.Website);
                    dispatch?.setSelectedLanguages(response.data.Languages);
                    dispatch?.setCooIndex(response.data.CountryOfOrigin);
                    dispatch?.setAlignment(response.data.Measurements.TextAlignment);
                    dispatch?.setMarginLeft(response.data.Measurements.MarginLeft);
                    dispatch?.setLogoSize(response.data.Measurements.LogoSize);
                    dispatch?.setLogoMarginTop(response.data.Measurements.LogoMarginTop);
                    dispatch?.setLogoMarginBottom(response.data.Measurements.LogoMarginBottom);
                    dispatch?.setLogo(response.data.ImageURL)
                    setLoading(false);
                    console.log(response.data)
                }
                else {
                    setLoading(false);
                }
            }
            fetchData();
        }
        else{
            setLoading(false);
        }
    }, [])

    if (loading) {
        return (
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <CssBaseline />
                Loading...
            </Box>
        );
    }

    const handleCloseNotification = () => {
        setNotification(false)
    }

    const handleScreenChange = () => {
        setFullscreen(!fullscreen);
    }

    const handleZoomChange = (newValue: any) => {
        if (newValue > 150 || newValue < 0) return;
        dispatch?.setZoom(newValue);
    }

    const handleLabelSave = async (title: string) => {
        const body = {
            label_data: {
                Title: title,
                Measurements: {
                    SeamGap: pendingData?.seamGap,
                    Width: pendingData?.x,
                    Height: pendingData?.y,
                    FontSize: pendingData?.fontSize,
                    TextAlignment: pendingData?.alignment,
                    MarginLeft: pendingData?.marginLeft,
                    LogoSize: pendingData?.logoSize,
                    LogoMarginTop: pendingData?.logoMarginTop,
                    LogoMarginBottom: pendingData?.logoMarginBottom
                },
                CountryOfOrigin:pendingData?.cooIndex,
                FiberContent: pendingData?.fiberContent,
                CareLabel: pendingData?.careInstructionsList,
                AdditionalInfo: {
                    RnNumber: pendingData?.rnNumber,
                    Address: pendingData?.address,
                    Website: pendingData?.website
                },
                Languages: pendingData?.selectedLanguages,
            }
        };
        const response = await save_label(body);

        
        if (pendingData?.logoFormData){
            const response_label = await upload_logo(pendingData.logoFormData, response.data.sql.LabelID);

            if (response.status === 201 && response_label.status === 200) {
                setNotificationStatus(true)
                setNotification(true)
                setNotificationMessage("Save Success");
                console.log(response.data);
            }
            else {
                setNotificationStatus(false)
                setNotification(true)
                setNotificationMessage("Save Failure");
                console.error("error in label save", response.data.message, response_label.data);
            }
        }
        else{
            if (response.status === 201) {
                setNotificationStatus(true)
                setNotification(true)
                setNotificationMessage("Save Success");
                console.log(response.data);
            }
            else {
                setNotificationStatus(false)
                setNotification(true)
                setNotificationMessage("Save Failure");
                console.error("error in label save", response.data.message);
            }
        }
        
    }

    const handleLabelUpdate = async () => {
        if(id){
            const body = {
                label_data: {
                    Title: title,
                    Measurements: {
                        SeamGap: pendingData?.seamGap,
                        Width: pendingData?.x,
                        Height: pendingData?.y,
                        FontSize: pendingData?.fontSize,
                        TextAlignment: pendingData?.alignment,
                        MarginLeft: pendingData?.marginLeft,
                        LogoSize: pendingData?.logoSize,
                        LogoMarginTop: pendingData?.logoMarginTop,
                        LogoMarginBottom: pendingData?.logoMarginBottom
                    },
                    CountryOfOrigin:pendingData?.cooIndex,
                    FiberContent: pendingData?.fiberContent,
                    CareLabel: pendingData?.careInstructionsList,
                    AdditionalInfo: {
                        RnNumber: pendingData?.rnNumber,
                        Address: pendingData?.address,
                        Website: pendingData?.website
                    },
                    Languages: pendingData?.selectedLanguages
                }
            };
            const response = await update_label(body, id);
            let response_label = {status:200,data:{}};

            if (pendingData?.logoFormData){
                response_label = await upload_logo(pendingData.logoFormData, id);
            }

            if (pendingData?.logo === ""){
                const res = await remove_logo(id);
                console.log(res);
            }

            if (response.status === 200 && response_label.status === 200) {
                setNotificationStatus(true)
                setNotification(true)
                setNotificationMessage("Save Success");
                console.log(response.data);
            }
            else {
                setNotificationStatus(false)
                setNotification(true)
                setNotificationMessage("Save Failure");
                console.error("error in label save", response.data.message, response_label.data);
            }
        }
    }


    // const handleDownloadPDF = () => {
    //     const input = document.getElementById("label-container"); // The HTML container with labels

    //     if (!input) return;

    //     html2canvas(input, { scale: 2 }).then((canvas) => {
    //         const imgData = canvas.toDataURL("image/png");
    //         const pdf = new jsPDF("p", "mm", "a4");
    //         const pdfWidth = pdf.internal.pageSize.getWidth();
    //         const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    //         pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    //         pdf.save("care_labels.pdf");
    //     });
    // };


    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        const margin = 10; // Margin around the labels
        const labelWidth = (pendingData?.x ? pendingData.x : 1.18) * 25.4;
        const labelHeight = (pendingData?.y ? pendingData.y : 2.36) * 25.4;
        const fontSize = (pendingData?.fontSize || 6) * 0.352778;
        const seemAllowance = (pendingData?.seamGap || 0.25) * 25.4;

        //let currentPage = 1;
        let currentY = margin; // Start position for first label

        pendingData?.selectedLanguages.forEach((data) => {
            if (currentY + labelHeight + margin > doc.internal.pageSize.height) {
                doc.addPage(); // Create a new page if label exceeds page height
                currentY = margin;
                //currentPage++;
            }

            // Draw border for the label
            doc.setDrawColor(0, 0, 0); // Black border
            doc.rect(margin, currentY, labelWidth, labelHeight);
            doc.setFontSize(10);
            doc.text(data, margin, currentY - 2)

            doc.setFontSize(fontSize);
            doc.setTextColor(0, 0, 0);
            let textY = currentY + seemAllowance + (fontSize / 2); // Start position with a small offset
            const textX = margin + 0.5; // Padding inside the label

            // Helper function to add wrapped text
            const addWrappedText = (text: string) => {
                const wrappedText = doc.splitTextToSize(text, labelWidth - 1); // Wrap text to fit within the label width
                wrappedText.forEach((line: string) => {
                    if (textY + fontSize > currentY + labelHeight - seemAllowance) {
                        doc.addPage(); // Move to next page if text exceeds label
                        currentY = margin;
                        textY = currentY + seemAllowance + (fontSize / 2);
                        doc.rect(margin, currentY, labelWidth, labelHeight); // Draw new label border
                    }
                    doc.text(line, textX, textY);
                    textY += fontSize / 2; // Move down by font size
                });
            };

            // COO (Country of Origin)
            if (pendingData?.cooIndex !== 0) {
                const cooText = coo[data.toLowerCase().replace(" ", "_") as keyof typeof materials][pendingData?.cooIndex];
                addWrappedText(cooText);
            }

            // Fiber Content
            pendingData?.fiberContent.forEach((fiber) => {
                if (fiber.material !== 0 && fiber.percentage !== "Select") {
                    const fiberText = `${fiber.percentage} ${materials[data.toLowerCase().replace(" ", "_") as keyof typeof materials][fiber.material]
                        }`;
                    addWrappedText(fiberText);
                }
            });

            // Care Instructions
            pendingData?.careInstructionsList.forEach((care) => {
                if (care !== 0) {
                    const careText =
                        careInstructions[data.toLowerCase().replace(" ", "_") as keyof typeof careInstructions][care];
                    addWrappedText(careText);
                }
            });

            let bottomTotal = 1
            if (pendingData?.website !== "") {
                doc.text(pendingData?.website, textX, currentY + labelHeight + (bottomTotal * -(fontSize / 2)));
                bottomTotal += 1
            }
            if (pendingData?.address !== "") {
                doc.text(pendingData?.address, textX, currentY + labelHeight + (bottomTotal * -(fontSize / 2)));
                bottomTotal += 1
            }
            if (pendingData?.rnNumber !== "") {
                doc.text(`RN ${pendingData?.rnNumber}`, textX, currentY + labelHeight + (bottomTotal * -(fontSize / 2)));
                bottomTotal += 1
            }

            // Update Y position for next label
            currentY += labelHeight + margin;
        });

        // Save the PDF
        doc.save("care_labels.pdf");
    };






    return (
        <SecureRoute>
            <Box
                sx={{
                    display: "flex",
                    minHeight: "100vh",
                    flexDirection: {
                        xl: 'row',
                        lg: 'row',
                        md: 'column',
                        sm: 'column',
                        xs: 'column'
                    },
                    gap: 0,
                    pt: { xl: 8, lg: 8, md: 8, sm: 7, xs: 7 },
                }}
            >
                <CssBaseline />
                {!fullscreen &&
                    <Box
                        sx={{
                            bgcolor: "#212121",
                            minHeight: '100vh',
                            minWidth:'50%',
                            borderRight: 1,
                            borderColor: 'divider',
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems:'center',
                                py:3,
                            }}
                        >
                            { id ?
                            <>
                                <Typography
                                    sx={{
                                        fontSize: {xl:20,lg:20,md:20,sm:15,xs:15},
                                        px:2
                                    }}
                                >
                                    CARE LABEL OPTIONS {` LABEL: `}
                                </Typography>
                                <TextField 
                                    size="small"
                                    value={title}
                                    onChange={(e:any)=>setTitle(e.target.value)}
                                />
                            </>
                            :
                            <Typography
                                sx={{
                                    fontSize: {xl:20,lg:20,md:20,sm:15,xs:15},
                                    pr:2
                                }}
                            >
                                CARE LABEL OPTIONS
                            </Typography>
                            }
                        </Box>
                        <Divider sx={{width:'100%'}}/>
                        <VerticalTabs />






                    </Box>
                }
                {
                    pendingData?.selectedLanguages.length !== 0 ?
                        <Container
                            sx={{
                                minHeight: '100vh',
                                display: 'flex',
                                alignContent: !fullscreen ? 'flex-start' : '',
                                justifyContent: fullscreen ? 'center' : '',
                                flexWrap: "wrap",
                                gap: 2,
                                padding: 4,
                            }}
                        >
                            <Box
                                sx={{
                                    width: '100%'
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: 20
                                    }}
                                >
                                    LABEL VIEW
                                </Typography>
                            </Box>
                            <Box
                                id="label-container"
                                sx={{
                                    display: 'flex',
                                    alignContent: !fullscreen ? 'flex-start' : '',
                                    justifyContent: fullscreen ? 'center' : '',
                                    flexWrap: "wrap",
                                    gap: 2,
                                    padding: 4,
                                }}
                            >
                                {pendingData?.selectedLanguages.map((data: string, i) => (
                                    <Box key={i}>
                                        <Typography>
                                            {data}
                                        </Typography>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                width: (pendingData?.x * 96 || 113.28) * ((pendingData.zoom) * 0.01 + 1),
                                                height: (pendingData?.y * 96 || 226.56) * ((pendingData.zoom) * 0.01 + 1),
                                                bgcolor: 'white',
                                                paddingTop: `${(pendingData?.seamGap * 96) * ((pendingData.zoom) * 0.01 + 1)}px`,
        
                                            }}
                                        >
                                            { pendingData.logo &&
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: "center",
                                                        pt: `${(pendingData?.logoMarginTop * 96) * ((pendingData.zoom) * 0.01 + 1)}px`,
                                                        pb: `${(pendingData?.logoMarginBottom * 96) * ((pendingData.zoom) * 0.01 + 1)}px`
                                                    }}
                                                >
                                                    <img src={pendingData.logo} alt="Uploaded Preview" style={{ width: `${((pendingData?.logoSize*96)*((pendingData.zoom) * 0.01 + 1))}px`, height: "auto"}} />
                                                </Box>
                                            }
                                            <Box
                                                sx={{
                                                    display:'flex',
                                                    flexDirection: 'column',
                                                    alignItems: pendingData?.alignment === 'Center' ? 'center' : 'flex-start',
                                                    textAlign: pendingData?.alignment === 'Center' ? 'center' : 'left',
                                                    paddingLeft: `${(pendingData?.marginLeft * 96) * ((pendingData.marginLeft) * 0.01 + 1)}px`,
                                                }}
                                            >
                                                {pendingData?.cooIndex !== 0 &&
                                                    <Typography 
                                                        sx={{ 
                                                            color: '#000', fontSize: pendingData?.fontSize * 0.75 * ((pendingData.zoom) * 0.01 + 1)
                                                        }}
                                                    >
                                                        {coo[data.toLowerCase().replace(' ', '_') as keyof typeof materials][pendingData?.cooIndex]}
                                                    </Typography>
                                                }
                                                {pendingData?.fiberContent.map((fiber, index) => (
                                                    fiber.material !== 0 && fiber.percentage !== 'Select' &&
                                                    <Typography
                                                        key={index} 
                                                        sx={{ 
                                                            color: '#000', fontSize: pendingData?.fontSize * 0.75 * ((pendingData.zoom) * 0.01 + 1)
                                                        }}
                                                    >
                                                        {fiber.percentage} {materials[data.toLowerCase().replace(' ', '_') as keyof typeof materials][fiber.material]}
                                                    </Typography>
                                                ))}
                                                {pendingData?.careInstructionsList.map((care, index) => (
                                                    care !== 0 &&
                                                    <Typography 
                                                        key={index} 
                                                        sx={{ 
                                                            color: '#000', fontSize: pendingData?.fontSize * 0.75 * ((pendingData.zoom) * 0.01 + 1)
                                                        }}
                                                    >
                                                        {careInstructions[data.toLowerCase().replace(' ', '_') as keyof typeof careInstructions][care]}
                                                    </Typography>
                                                ))}
                                            </Box>
                                            <Box 
                                                sx={{
                                                    marginTop: 'auto',
                                                    display:'flex',
                                                    flexDirection: 'column',
                                                    alignItems: pendingData?.alignment === 'Center' ? 'center' : 'flex-start',
                                                    textAlign: pendingData?.alignment === 'Center' ? 'center' : 'left',
                                                    paddingLeft: `${(pendingData?.marginLeft * 96) * ((pendingData.marginLeft) * 0.01 + 1)}px`,
                                                }}
                                            > {/* Ensures bottom alignment */}
                                                {pendingData?.rnNumber !== "" &&
                                                    <Typography
                                                        sx={{ 
                                                            color: '#000', fontSize: pendingData?.fontSize * 0.75 * ((pendingData.zoom) * 0.01 + 1)
                                                        }}
                                                    >
                                                        {`RN ${pendingData?.rnNumber}`}
                                                    </Typography>
                                                }
                                                {pendingData?.address !== "" &&
                                                    <Typography
                                                        sx={{ 
                                                            color: '#000', fontSize: pendingData?.fontSize * 0.75 * ((pendingData.zoom) * 0.01 + 1)
                                                        }}
                                                    >
                                                        {pendingData?.address}
                                                    </Typography>
                                                }
                                                {pendingData?.website !== "" &&
                                                    <Typography
                                                        sx={{ 
                                                            color: '#000', fontSize: pendingData?.fontSize * 0.75 * ((pendingData.zoom) * 0.01 + 1)
                                                        }}
                                                    >
                                                        {pendingData?.website}
                                                    </Typography>
                                                }
                                            </Box>
                                        </Box>
                                    </Box>
                                ))}

                            </Box>
                            {/* <Draggable nodeRef={myRef}>
                    <div 
                        ref={myRef} 
                        style={{ 
                            display: 'inline-block', 
                        }}
                    >
                        <Box
                            sx={{
                                ":hover":{
                                    cursor:"grab"
                                },
                                
                            }}
                        >
                            <Typography>HELLO</Typography>
                        </Box>
                    </div>
                </Draggable> */}
                        </Container>
                        :
                        <Container
                            sx={{
                                minHeight: '100vh',
                                display: 'flex',
                                alignContent: 'center',
                                justifyContent: 'center',
                                flexWrap: "wrap",
                                gap: 2,
                                padding: 4,
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: 30,
                                    opacity: 0.3
                                }}
                            >
                                Select Language Options
                            </Typography>
                        </Container>
                }

                <SpeedDial
                    sx={{
                        position: 'fixed',
                        bottom: 16,
                        right: 16,
                        zIndex: 1000
                    }}
                    ariaLabel="SpeedDial actions"
                    icon={<SpeedDialIcon />}
                    open={open}
                    onOpen={() => setOpen(true)}
                    onClose={() => setOpen(false)}
                >
                    <SpeedDialAction
                        icon={<FullscreenIcon />}
                        tooltipTitle="Fullscreen"
                        onClick={handleScreenChange}
                    />
                    <SpeedDialAction
                        icon={<DownloadIcon />}
                        tooltipTitle="Download PDF"
                        onClick={handleDownloadPDF}
                    />
                    <SpeedDialAction
                        icon={<ZoomInIcon />}
                        tooltipTitle="Zoom In"
                        onClick={() => handleZoomChange(pendingData ? pendingData?.zoom + 10 : 0)}
                    />
                    <SpeedDialAction
                        icon={<ZoomOutIcon />}
                        tooltipTitle="Zoom Out"
                        onClick={() => handleZoomChange(pendingData ? pendingData?.zoom - 10 : 0)}
                    />
                    <SpeedDialAction
                        icon={<BookmarkIcon />}
                        tooltipTitle="Save As New Label"
                        onClick={() => setOpenSaveDialog(true)}
                    />
                    { id &&
                    <SpeedDialAction
                        icon={<SaveIcon />}
                        tooltipTitle="Save Label"
                        onClick={handleLabelUpdate}
                    />
                    }
                </SpeedDial>
                <LabelSaveDialog open={openSaveDialog} setOpen={setOpenSaveDialog} saveLabel={handleLabelSave} />
                {notification &&
                    <Notification message={notificationMessage} status={notificationStatus} close={handleCloseNotification} />
                }
            </Box>
        </SecureRoute>


    )
}
