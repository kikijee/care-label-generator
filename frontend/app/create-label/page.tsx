'use client'
import { Box, Typography, CssBaseline, Container, SpeedDial, SpeedDialAction } from "@mui/material"
import { materials, careInstructions, coo } from "@/public/data/data"
import { useState } from "react"
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import VerticalTabs from "../components/VerticalTabs";
import { usePendingData, usePendingDataDispatch } from "../context/CareEditorContext"
import DownloadIcon from '@mui/icons-material/Download';
import jsPDF from "jspdf";
//import html2canvas from "html2canvas";
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';


const Page = () => {

    const pendingData = usePendingData()
    const dispatch = usePendingDataDispatch()
    const [fullscreen, setFullscreen] = useState(false)
    const [open, setOpen] = useState(false)



    const handleScreenChange = () => {
        setFullscreen(!fullscreen);
    }

    const handleZoomChange = (newValue: any) => {
        if (newValue > 150 || newValue < 0) return
        dispatch?.setZoom(newValue)
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
                gap: 5,
                pt: { xl: 8, lg: 8, md: 8, sm: 7, xs: 7 }
            }}
        >
            <CssBaseline />
            {!fullscreen &&
                <Container
                    sx={{
                        bgcolor: "#212121",
                        minHeight: '100vh',
                        width: {
                            xl: '70%',
                            lg: '70%',
                            md: '100%',
                            sm: '100%',
                            xs: '100%'
                        }
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            padding: 3,
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: 20
                            }}
                        >
                            CARE LABEL OPTIONS
                        </Typography>
                    </Box>
                    <VerticalTabs />






                </Container>
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
                                        <Box>
                                            {pendingData?.cooIndex !== 0 &&
                                                <Typography sx={{ color: '#000', fontSize: pendingData?.fontSize * 0.75 * ((pendingData.zoom) * 0.01 + 1) }}>
                                                    {coo[data.toLowerCase().replace(' ', '_') as keyof typeof materials][pendingData?.cooIndex]}
                                                </Typography>
                                            }
                                            {pendingData?.fiberContent.map((fiber, index) => (
                                                fiber.material !== 0 && fiber.percentage !== 'Select' &&
                                                <Typography key={index} sx={{ color: '#000', fontSize: pendingData?.fontSize * 0.75 * ((pendingData.zoom) * 0.01 + 1) }}>
                                                    {fiber.percentage} {materials[data.toLowerCase().replace(' ', '_') as keyof typeof materials][fiber.material]}
                                                </Typography>
                                            ))}
                                            {pendingData?.careInstructionsList.map((care, index) => (
                                                care !== 0 &&
                                                <Typography key={index} sx={{ color: '#000', fontSize: pendingData?.fontSize * 0.75 * ((pendingData.zoom) * 0.01 + 1) }}>
                                                    {careInstructions[data.toLowerCase().replace(' ', '_') as keyof typeof careInstructions][care]}
                                                </Typography>
                                            ))}
                                        </Box>
                                        <Box sx={{ marginTop: 'auto' }}> {/* Ensures bottom alignment */}
                                            {pendingData?.rnNumber !== "" &&
                                                <Typography sx={{ color: '#000', fontSize: pendingData?.fontSize * 0.75 * ((pendingData.zoom) * 0.01 + 1) }}>
                                                    {`RN ${pendingData?.rnNumber}`}
                                                </Typography>
                                            }
                                            {pendingData?.address !== "" &&
                                                <Typography sx={{ color: '#000', fontSize: pendingData?.fontSize * 0.75 * ((pendingData.zoom) * 0.01 + 1) }}>
                                                    {pendingData?.address}
                                                </Typography>
                                            }
                                            {pendingData?.website !== "" &&
                                                <Typography sx={{ color: '#000', fontSize: pendingData?.fontSize * 0.75 * ((pendingData.zoom) * 0.01 + 1) }}>
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
            </SpeedDial>

        </Box>


    )
}

export default Page