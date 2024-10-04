import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TextField, Button, RadioGroup, FormControlLabel, Radio, Select, MenuItem, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText,DialogTitle, Rating, Divider,} from '@mui/material';
import { Grid2, FormControl, InputLabel, FormLabel, Box, Typography } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: { main: '#231942',},
    secondary: { main: '#231942',},
    background: { default: '#F1F8E9', },
    text: { primary: '#231942', secondary: '#231942', },},
  typography: { fontFamily: 'Arial', h5: { fontWeight: 800, color: '#231942',},
    body1: { fontSize: 40,},},
  components: { MuiInputLabel: { styleOverrides: { root: { color: '#231942',},},}, 
  MuiFormLabel: { styleOverrides: { root: { color: '#231942',},},},
    MuiButton: { styleOverrides: { root: { borderRadius: '20px', padding: '10px 20px', backgroundColor: '#231942', color: 'white',},},},
    MuiFormControlLabel: { styleOverrides: { label: { color: '#231942',},},},},});

function App() {
  const [data, setData] = useState({name: '', surname: '', age: '', gender: '', language: '', termsAccepted: false, score: 0,});

  const [dialogOpen, setDialogOpen] = useState(false); 

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target; 
    setData({...data,[name]: type === 'checkbox' ? checked : value,});};

  const handleRatingChange = (event, newValue) => { setData({ ...data, score: newValue });};

  const handleSubmit = (e) => { e.preventDefault(); 
    if (data.termsAccepted) {  setDialogOpen(true);}};

  const handleDialogClose = () => { setDialogOpen(false);};
  const handleReset = () => {
    setData({name: '', surname: '', age: '', gender: '', language: '', termsAccepted: false, score: 0,});}

  return (
    <ThemeProvider theme={theme}>
      <div style={{ padding: '50px', backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
        <Typography variant="h5" align="center" gutterBottom>
          Formulario
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid2 container spacing={2}>
            <Grid2 item xs={12} sm={4}>
              <TextField fullWidth required label="Nombre" name="name" value={data.name} onChange={handleChange} />
            </Grid2>
            <Grid2 item xs={12} sm={4}>
              <TextField fullWidth required label="Apellido" name="surname" value={data.surname} onChange={handleChange} />
            </Grid2>
            <Grid2 item xs={12} sm={4}>
              <TextField fullWidth required label="Edad" name="age" type="number" value={data.age} onChange={handleChange} />
            </Grid2>

            <Grid2 item xs={12} sm={6}>
              <FormControl required>
                <FormLabel style={{ color: '#231942' }}>Género</FormLabel> 
                <RadioGroup name="gender" value={data.gender} onChange={handleChange}>
                  <FormControlLabel value="male" control={<Radio />} label="Masculino" />
                  <FormControlLabel value="female" control={<Radio />} label="Femenino" />
                  <FormControlLabel value="ratata" control={<Radio />} label="Furro" />
                  <FormControlLabel value="other" control={<Radio />} label="No especifico" />
                </RadioGroup>
              </FormControl>
            </Grid2>
            <Grid2 item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Lenguaje de Programación Favorito</InputLabel>
                <Select name="language" value={data.language} onChange={handleChange} >
                  <MenuItem value="javascript">JavaScript</MenuItem>
                  <MenuItem value="python">Python</MenuItem>
                  <MenuItem value="java">Java</MenuItem>
                  <MenuItem value="c#">C# / C++</MenuItem>
                </Select>
              </FormControl>
            </Grid2>
          </Grid2>

          <Divider sx={{ my: 4, backgroundColor: theme.palette.primary.main }} />

          <Grid2 container spacing={2}>
            <Grid2 item xs={12}>
              <Box component="fieldset" mb={3} borderColor="transparent">
                <FormLabel component="legend">Puntuar Encuesta</FormLabel>
                <Rating name="score" value={data.score} onChange={handleRatingChange} max={5} sx={{ color: theme.palette.primary.main,}} />
              </Box>
            </Grid2>
          </Grid2>

          <Grid2 container spacing={2}>
            <Grid2 item xs={12}>
              <FormControlLabel
                control={ <Checkbox name="termsAccepted" checked={data.termsAccepted} onChange={handleChange} />}
                label={<span style={{ color: '#231942' }}>He leído los términos y condiciones</span>} />
            </Grid2>
          </Grid2>

          <Grid2 container spacing={2} justifyContent="space-between" style={{ marginTop: '20px' }}>
            <Grid2 item>
              <Button variant="contained" color="primary" type="submit" disabled={!data.termsAccepted} >
                Enviar
              </Button>
            </Grid2>
            <Grid2 item>
              <Button variant="outlined" color="secondary" onClick={handleReset} >
                Limpiar
              </Button>
            </Grid2>
          </Grid2>
        </form>

        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogTitle>Confirmación</DialogTitle>
          <DialogContent>
            <DialogContentText>¿Está seguro de enviar este formulario?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>No</Button>
            <Button onClick={() => { handleDialogClose(); console.log(data); }} autoFocus>
              Sí
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </ThemeProvider>
  );
}

export default App;
