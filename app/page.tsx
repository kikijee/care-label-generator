import { Container, Typography, CssBaseline,Box } from "@mui/material";

export default function Home() {
  return (
    <Box>
      <CssBaseline/>
      <Container
        sx={{
          display:"flex",
          justifyContent:"center",
          alignItems:"center",
          minHeight:"100vh"
        }}
      >
        <Typography
          sx={{
            fontSize:40
          }}
        >
          CARE LABEL GENERATOR
        </Typography>
      </Container>
    </Box>
  );
}
