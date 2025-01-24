import { Container, Typography, CssBaseline, Box, Divider } from "@mui/material";

export default function Home() {
  return (
    <Box>
      <CssBaseline/>
      <Container
        sx={{
          display:"flex",
          justifyContent:"center",
          alignItems:"center",
          minHeight:"100vh",
          gap:5,
          flexDirection:{
            xl:"row",
            lg:"row",
            md:"column",
            sm:"column",
            xs:"column"
          }
        }}
      >
        <Box
          sx={{
            display:'flex',
            flexDirection:"column"
          }}
        >
          <Divider sx = {{width:'75%'}}/>
          <Typography
            sx={{
              fontSize:40
            }}
          >
            CARE LABEL GENERATOR
          </Typography>
          <Typography
            sx={{
              fontSize:20,
              mt:5
            }}
          >
            An application to streamline care label prototyping and creation.
          </Typography>
        </Box>
        <Box
            component="img"
            src={'/images/care-label-home-page.jpg'}
            alt="Background Graphic"
            sx={{
              zIndex: -1,
              opacity:0.4,
              width: {
                xs: "300px",
                sm: "350px",
                md: "400px",
                lg: "550px",
                xl: "600px",
              },
              height: "auto",
            }}
          />
      </Container>
    </Box>
  );
}
