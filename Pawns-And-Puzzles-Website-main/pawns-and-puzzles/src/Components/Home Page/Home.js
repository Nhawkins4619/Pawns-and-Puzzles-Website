import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import lowerThird1 from '../../Assets/lowerThirds/TheGig.png'
import lowerThird2 from '../../Assets/lowerThirds/Vinyl.png'
import lowerThird3 from '../../Assets/lowerThirds/LeftGirl.png'
import lowerThird4 from '../../Assets/lowerThirds/RightGirl.png'
import {Fade, Slide, Zoom} from 'react-awesome-reveal'
import './Home.css'
import {
    NavLink,
} from "react-router-dom";
import { Typography } from '@mui/material';
import { useEffect } from 'react';
//themes for styling and fonts
const MerriweatherFont = createTheme({
    typography: {
        fontFamily: ['Merriweather', 'serif'].join(",")
    },
});
const SpecialEliteFont = createTheme({
    typography: {
        fontFamily: ['Special Elite', 'cursive'].join(",")
    },
});
function Home() {
    //Renders Main page/ Main UI elements
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            
            <div className='chessPieces'>
                <Fade ><ThemeProvider theme={MerriweatherFont}><Typography sx={{ fontSize: '6em', color: '#0f4a3b', fontWeight: 'bold', letterSpacing: '0.2em'}}>Pawns & Puzzles</Typography> </ThemeProvider>
                <ThemeProvider theme={SpecialEliteFont}><Typography sx={{ fontSize: '2em', color: '#0f4a3b' }}>Welcome!</Typography> </ThemeProvider></Fade>
            </div>
            <Box sx={{ bgcolor: '#141414', width: '100%', height: '60vh', display: 'flex', flexDirection: 'row' }}>
                <Slide delay={200} direction='right'>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <ThemeProvider theme={MerriweatherFont}>
                        <Typography align='center' sx={{ fontSize: '3em', color: 'white', fontWeight: 'bold', mt: '1em', ml: '2em', alignSelf: 'start', letterSpacing: '0.1em' }}>Interested in Buying?</Typography>
                    </ThemeProvider>
                    <Box sx={{ display: 'flex', flexDirection: 'row', }}>
                        <Box sx={{ display: 'flex', width: '70em', mt: '4em', ml: '16em', mr: '1.1em', flexDirection: 'column' }}>
                            <ThemeProvider theme={SpecialEliteFont}>
                                <Typography align='center' sx={{ fontSize: '2em', color: '#b3b3b3', letterSpacing: '0.2em' }}>
                                    Looking for the perfect board game to enjoy with friends and family? You're in the right place! At Pawns & Puzzles, we offer a wide selection of both new and used board games to cater to all your gaming needs.</Typography>
                            </ThemeProvider>
                            <NavLink to={'/Games'} style={{ alignSelf: 'center' }}>
                                <Button sx={{
                                    my: '2em', width: '15em', backgroundColor: '#0f4a3b',
                                    ':hover': {
                                        bgcolor: '#09261f',
                                        color: 'white'
                                    }
                                }} variant='contained'>Buy Now!</Button>
                            </NavLink>
                        </Box>
                    </Box>
                </Box>
                </Slide>
                <Fade delay={700}><img className='theGig' src={lowerThird1} alt='the gig'></img></Fade>
            </Box>
            <Box sx={{ bgcolor: '#EEEEEB', width: '100%', height: '60vh', display: 'flex', flexDirection: 'row' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Fade delay={700}><img width={'1400px'} height={'1050px'} className='Vinyl' src={lowerThird2} alt='the gig'></img></Fade>
                </Box>
                <Slide delay={200} direction='left'>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <ThemeProvider theme={MerriweatherFont}>
                        <Typography align='center' sx={{ fontSize: '3em', color: 'black', fontWeight: 'bold', mt: '1em', mr: '3em', letterSpacing: '0.1em', alignSelf: 'self-end' }}>Interested in Selling?</Typography>
                    </ThemeProvider>
                    <Box sx={{ display: 'flex', flexDirection: 'row', }}>
                        <Box sx={{ display: 'flex', width: '80em', mt: '4em', mr: '16em', ml: '1.1em', flexDirection: 'column' }}>
                            <ThemeProvider theme={SpecialEliteFont}>
                                <Typography align='center' sx={{ fontSize: '2em', color: '#050505', letterSpacing: '0.2em', ml: '2em' }}>
                                    Interested in joining our board game marketplace as a vendor? You're just a few steps away from becoming a part of our community! As a vendor, you'll have the opportunity to showcase and sell your new and used board games to a passionate and diverse audience.</Typography>
                            </ThemeProvider>
                            <NavLink to={'/Vendors'} style={{ alignSelf: 'center' }}>
                                <Button sx={{
                                    my: '2em', width: '15em', backgroundColor: '#8c8c8c',
                                    ':hover': {
                                        bgcolor: 'black',
                                        color: 'white'
                                    }
                                }} variant='contained'>Become One!</Button>
                            </NavLink>
                        </Box>
                    </Box>
                </Box>
                </Slide>
            </Box>
            <Box sx={{ bgcolor: '#0f4a3b', width: '100%', height: '60vh', flexDirection: 'row', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Slide direction='down' duration={1000}><Fade><img className='rightGirl' src={lowerThird3} alt='talking girl'></img></Fade></Slide>
                <Zoom delay={200} >
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', height: '100%' }}>
                    <ThemeProvider theme={MerriweatherFont}>
                        <Typography align='center' sx={{ fontSize: '3em', color: '#F5F5F5', fontWeight: 'bold', letterSpacing: '0.1em', alignSelf: 'center', my: '1em' }}>
                            Become apart of our community</Typography>
                    </ThemeProvider>
                    <ThemeProvider theme={SpecialEliteFont}>
                        <Typography align='center' sx={{ fontSize: '2em', color: '#F5F5F5', letterSpacing: '0.2em' }}>
                            Ready to become a part of our vibrant board game community? We're thrilled to have you! By joining us, you'll have the opportunity to connect with fellow board game enthusiasts, share your experiences, and stay updated on the latest news and events in the world of board gaming.
                        </Typography>
                    </ThemeProvider>
                    <NavLink to={'/Comments'} style={{ alignSelf: 'center' }}>
                        <Button sx={{ color:'black',
                            my: '2em', width: '15em', backgroundColor: '#F5F5F5',
                            ':hover': {
                                bgcolor: '#bfbfbf',
                                color: 'black'
                            }
                        }} variant='contained'>Join Now!</Button>
                    </NavLink>
                </Box>
                </Zoom>
                <Slide direction='down' duration={1200}><Fade><img className='leftGirl' src={lowerThird4} alt='talking girl'></img></Fade></Slide>
            </Box>
        </Box>
    );
}
export default Home;