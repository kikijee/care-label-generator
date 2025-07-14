// const generateLabels = () => {
//     const newLabels: { content: string[] }[] = [];
//     let currentLabel: string[] = [];
//     let currentHeight = 0; // Track accumulated height
    
//     const maxLabelHeight = (y * 96) * ((zoom * 0.01) + 1); // Define label height limit

//     const addTextToLabel = (text: string) => {
//         const estimatedTextHeight = fontSize * 1.2; // Approximate height per text line
        
//         if (currentHeight + estimatedTextHeight > maxLabelHeight) {
//             // If adding this text overflows, push current label and start a new one
//             newLabels.push({ content: currentLabel });
//             currentLabel = [];
//             currentHeight = 0;
//         }
        
//         currentLabel.push(text);
//         currentHeight += estimatedTextHeight;
//     };

//     // Add COO information
//     if (cooIndex !== 0) {
//         selectedLanguages.forEach(lang => {
//             addTextToLabel(coo[lang.toLowerCase().replace(' ', '_') as keyof typeof coo][cooIndex]);
//         });
//     }

//     // Add Fiber Content
//     fiberContent.forEach(fiber => {
//         if (fiber.material !== 0 && fiber.percentage !== 'Select') {
//             selectedLanguages.forEach(lang => {
//                 addTextToLabel(`${fiber.percentage} ${materials[lang.toLowerCase().replace(' ', '_') as keyof typeof materials][fiber.material]}`);
//             });
//         }
//     });

//     // Add Care Instructions
//     careInstructionsList.forEach(care => {
//         if (care !== 0) {
//             selectedLanguages.forEach(lang => {
//                 addTextToLabel(careInstructions[lang.toLowerCase().replace(' ', '_') as keyof typeof careInstructions][care]);
//             });
//         }
//     });

//     // Add RN number, Address, Website
//     if (rnNumber) addTextToLabel(`RN ${rnNumber}`);
//     if (address) addTextToLabel(address);
//     if (website) addTextToLabel(website);

//     // Push last label if it has content
//     if (currentLabel.length > 0) {
//         newLabels.push({ content: currentLabel });
//     }

//     setLabels(newLabels);
// };
