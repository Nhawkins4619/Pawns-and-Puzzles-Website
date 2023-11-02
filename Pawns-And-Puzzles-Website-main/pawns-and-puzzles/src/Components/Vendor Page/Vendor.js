import { Typography, Box, Divider, Button, Modal, TextField, Alert, Collapse } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Axios from "axios";
import { useState, useEffect } from 'react';
import logo from '../../Assets/Logo/Pawns&Puzzles.png'
import React from 'react';
import '../Vendor Page/Vendor.css'
import {
  NavLink,
} from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Carousel from 'react-material-ui-carousel'
//import themes for fonts and styling
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
const customTheme = createTheme({

  typography: {
    fontFamily: 'Merriweather, serif',
  },
  palette: {
    primary: {
      main: '#0f4a3b',
    },
    text: {
      primary: '#000',
      secondary: '#fff',
    },
  }
});



export default function Browse() {
  //variables for functionality of the website
  const [vendor, setvendor] = useState([]);
  const [isOpen, setisOpen] = useState(false);
  const [isUpdate, setisUpdate] = useState(false);
  const [isAdd, setisAdd] = useState(false);
  const [isDelete, setisDelete] = useState(false);
  const [currentName, setcurrentName] = useState('');
  const [currentVendorId, setcurrentVendorId] = useState();
  const [currentGamerId, setcurrentGamerId] = useState();
  const [currentDesc, setcurrentDesc] = useState('');
  const [newDesc, setnewDesc] = useState('');
  const [newprice, setnewprice] = useState('');
  const [newName, setnewName] = useState('');
  const [newType, setnewType] = useState('');
  const [games, setgames] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isAlert, setIsAlert] = useState(false)
  const [alertMessage, setalertMessage] = useState('')

  //renders profit for each vendor if admin is present
  const renderProfit = (profit) => {
    let userId = document.cookie
    let temp = userId.split('=')
    var finalUserId = temp[1]
    //this is an error in the developer console, the syntax wants to be strict but there is no need to be strict here
    if (finalUserId == 1) {
      return (
        <Typography fontWeight={'bold'} color='#0f4a3b' sx={{ m: 1, fontSize: '2.5em' }}>${profit}</Typography>
      )
    }
    else {
      return null
    }
  }
  //renders admin UI based on the condition the admin is signed in, also contains functionality
  const renderAdminUI = (quantity, gameId, currentDesc, currentName, currentPrice, currentType) => {
    let userId = document.cookie
    let temp = userId.split('=')
    var finalUserId = temp[1]
    //this is an error in the developer console, the syntax wants to be strict but there is no need to be strict here
    if (finalUserId == 1) {
      return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Typography>Boxes Available: {quantity}</Typography>
          <Typography>Admin Priveledges:</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <Button variant='contained' sx={{ m: 1 }} onClick={() => {
              setnewDesc('')
              setnewName('')
              setnewprice('')
              setnewType('')
              setisAdd(true)
              setisUpdate(true)

            }}>
              Add Game
            </Button>
            <Button variant='contained' sx={{ m: 1 }} onClick={() => {
              setnewDesc(currentDesc)
              setnewName(currentName)
              setnewprice(currentPrice)
              setnewType(currentType)
              setisAdd(false)
              setisUpdate(true)
              setcurrentGamerId(gameId)
            }}>
              Update Game
            </Button>
            <Button variant='contained' sx={{ m: 1 }} onClick={() => {
              setisDelete(true)
              setcurrentGamerId(gameId)
            }}>
              Delete Game
            </Button>

          </Box>
          <Modal sx={{ display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}
            open={isDelete} onClose={() => { setisDelete(false) }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                <IconButton onClick={() => setisDelete(false)}><CloseIcon sx={{ color: 'white' }}></CloseIcon></IconButton>
              </Box>
              <Alert severity='error'>ARE YOU SURE YOU WANT TO DELETE?</Alert>
              <Button color='error' variant='contained' sx={{ m: 1 }} onClick={async () => {
                await Axios.post('https://api-puzzles-pawns.onrender.com/DeleteGame', {
                  GameID: currentGamerId,
                }).then(async (response) => {
                  window.location.reload();
                })
              }}>yes i'm sure</Button>
            </Box>
          </Modal>
          <Modal sx={{ display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }} open={isUpdate} onClose={() => { setisUpdate(false) }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '40%', bgcolor: 'white', borderRadius: 4 }}>
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <ThemeProvider theme={customTheme}><Typography sx={{ m: '0.5em' }} fontWeight={'bold'}>Add/Edit Game</Typography></ThemeProvider>
                <IconButton onClick={() => setisUpdate(false)}><CloseIcon></CloseIcon></IconButton>
              </Box>
              <Divider></Divider>
              <Typography sx={{ mx: '0.5em', my: '0.5em' }} >Name</Typography>
              <TextField sx={{ mx: '1em' }} value={newName}
                onChange={(e) => setnewName(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}>

              </TextField>
              <Typography sx={{ mx: '0.5em', my: '0.5em' }}>description</Typography>
              <TextField sx={{ mx: '1em' }}
                required
                multiline
                rows={4}
                value={newDesc}
                onChange={(e) => setnewDesc(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Typography sx={{ mx: '0.5em', my: '0.5em' }}>Price</Typography>
              <TextField sx={{ mx: '1em', mb: '0.5em' }} value={newprice}
                onChange={(e) => setnewprice(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}>

              </TextField>
              <Typography sx={{ mx: '0.5em', my: '0.5em' }}>Type</Typography>
              <TextField sx={{ mx: '1em', mb: '0.5em' }} value={newType}
                onChange={(e) => setnewType(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}>

              </TextField>
              <ThemeProvider theme={customTheme}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ m: 2 }}
                  onClick={async () => {
                    //this is an error in the developer console, the syntax wants to be strict but there is no need to be strict here
                    if (isAdd == true) {
                      await Axios.post('https://api-puzzles-pawns.onrender.com/AddGame', {
                        Gname: newName,
                        descp: newDesc,
                        price: newprice,
                        vendorID: currentVendorId,
                        Type: newType,
                      }).then(async (response) => {
                        window.location.reload();
                      })
                    }
                    else {
                      await Axios.post('https://api-puzzles-pawns.onrender.com/UpdateGames', {
                        Gname: newName,
                        descp: newDesc,
                        price: newprice,
                        GameId: currentGamerId,
                        Type: newType,
                      }).then(async (response) => {
                        window.location.reload();
                      })
                    }
                  }}
                >
                  Submit
                </Button>
              </ThemeProvider>
            </Box>
          </Modal>
        </Box>
      )
    }
    else {
      return (
        null
      )
    }
  }
  //renders all of the Vendors, contacts the API and pulls data from the database
  const renderVendors = async () => {
    await Axios.post("https://api-puzzles-pawns.onrender.com/GetVendor", {
      Vname: searchQuery
    }
    ).then(async (response) => {
      console.log(response)
      if (response.data.message == 'None') {
        setIsAlert(true)
        setalertMessage('no results match your query')
        setvendor([])
      }
      else {
        setIsAlert(false)
        let temp = []
        for (let i = 0; i < response.data.length; i++) {
          temp.push({ VendorId: response.data[i].VendorID, Vname: response.data[i].Vname, Vdesc: response.data[i].Vdesc, logo: response.data[i].logo, profit: response.data[i].TotalProfit })
        }
        setvendor(temp)
        vendor.map.size = vendor.length
      }
    })
  }
  //renders all of the games associated with each vender
  const renderVendorGames = async (Id) => {
    await Axios.post("https://api-puzzles-pawns.onrender.com/GetGames", {
      VendorID: Id
    }
    ).then(async (response) => {
      let temp = []
      for (let i = 0; i < response.data.length; i++) {
        temp.push({ GameId: response.data[i].GameID, Gname: response.data[i].Gname, Price: response.data[i].Price, descp: response.data[i].descp, Quantity: response.data[i].Quantity, Type: response.data[i].Type, picture: response.data[i].picture })
      }
      setgames(temp)
      games.map.size = games.length
    })
  }
  //this fires when vendorId is changed, instead of a traditional function call, something to do with updating of states
  //this produces an error within the developer console, It is not an error as renderVendorGames is a function therefore it does not need to be a dependency.
  useEffect(() => {
    renderVendorGames(currentVendorId)
  }, [currentVendorId,])
  useEffect(() => {

  }, [games])
  //this produces an error within the developer console, It is not an error as renderVendors is a function therefore it does not need to be a dependency.
  //these useEffects are called on first render and when searchquery is changed
  useEffect(() => {
    renderVendors()
  }, [])
  useEffect(() => {
    renderVendors()
  }, [searchQuery])
  //renders UI elements
  return (
    <Box sx={{ display: 'flex', minHeight: '100%' }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <NavLink to={'/Home'} style={{ alignSelf: 'center' }}><img className='logo' src={logo} alt='Chess' /></NavLink>
          <Box sx={{ display: 'flex', flexDirection: 'column', bgcolor: 'grey', width: '200px' }}>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'end', alignItems: 'end' }}>
            <NavLink to={'/Home'} style={{ alignSelf: 'center' }}>
              <Button sx={{
                my: '2em', mx: '1em', width: '15em', backgroundColor: '#0f4a3b',
                ':hover': {
                  bgcolor: '#09261f',
                  color: 'white'
                }
              }} variant='contained'>Home</Button>
            </NavLink>
            <NavLink to={'/Games'} style={{ alignSelf: 'center' }}>
              <Button sx={{
                my: '2em', mx: '1em', width: '15em', backgroundColor: '#0f4a3b',
                ':hover': {
                  bgcolor: '#09261f',
                  color: 'white'
                }
              }} variant='contained'>Browse Games</Button>
            </NavLink>
            <NavLink to={'/Comments'} style={{ alignSelf: 'center' }}>
              <Button sx={{
                my: '2em', mx: '1em', width: '15em', backgroundColor: '#0f4a3b',
                ':hover': {
                  bgcolor: '#09261f',
                  color: 'white'
                }
              }} variant='contained'>Community</Button>
            </NavLink>
          </Box>
          <Divider variant='middle' orientation='horizontal' sx={{ width: '100%', bgcolor: '#0f4a3b', borderBottomWidth: '0.15em', }}></Divider>
          <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'end' }}>
            <ThemeProvider theme={customTheme}>
              <TextField sx={{ width: '30%', my: '1em', mx: '2em' }}
                InputLabelProps={{
                  style: { color: '#0f4a3b' },
                }}
                margin="normal"
                name="Search"
                label="Search"
                id="Search"
                //helperText="Search results will include titles of all games that contain your entry."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  console.log(searchQuery)
                }
                }
              />
            </ThemeProvider>
          </Box>
          <Collapse in={isAlert}>
            <Alert severity="error">{alertMessage}</Alert>
          </Collapse>
          <Box sx={{ display: 'flex', width: '100%', flexWrap: 'wrap' }}>
            {vendor.map((vendors) => (
              <Box sx={{
                display: 'flex', flexDirection: 'column', maxWidth: '500px', bgcolor: '#e9e9e9',
                borderRadius: 4, m: '1em', boxShadow: '0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12);', justifyContent: 'center', alignItems: 'center'
                , "&:hover": {
                  transition: 'all 0.2s ease out',
                  boxShadow: '0px 4px 8px rgba(38, 38, 38, 0.2);',
                  top: '-4px',
                  border: '1px solid #cccccc',
                  backgroundColor: '#cccaca'
                }
              }}>
                <img style={{ margin: '1em' }} className='logos' src={vendors.logo} alt='Vendor Brand'></img>
                <ThemeProvider theme={MerriweatherFont}><Typography fontWeight={'bold'} color='#0f4a3b' sx={{ m: 1, fontSize: '2em' }}>{vendors.Vname}</Typography>
                  {renderProfit(vendors.profit)}</ThemeProvider>
                <Button onClick={async () => {
                  setcurrentName(vendors.Vname)
                  setcurrentVendorId(vendors.VendorId)
                  setcurrentDesc(vendors.Vdesc)
                  setisOpen(true)
                }} sx={{
                  my: '2em', mx: '1em', width: '15em', backgroundColor: '#0f4a3b',
                  ':hover': {
                    bgcolor: '#09261f',
                    color: 'white'
                  }
                }} variant='contained'>visit {vendors.Vname}</Button>
              </Box>
            ))}
          </Box>
          <Modal sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }} open={isOpen} onClose={() => setisOpen(false)}>
            <Box sx={{ display: 'flex', bgcolor: 'white', flexDirection: 'column', width: '50%', borderRadius: 3 }}>
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <ThemeProvider theme={customTheme}><Typography sx={{ m: '0.5em', fontSize: '2em' }} fontWeight={'bold'}>{currentName}</Typography></ThemeProvider>
                <IconButton onClick={() => setisOpen(false)}><CloseIcon></CloseIcon></IconButton>
              </Box>
              <Divider></Divider>
              <ThemeProvider theme={MerriweatherFont}>
                <ThemeProvider theme={SpecialEliteFont}><Typography align='center' sx={{ m: 1, fontSize: '1.25em' }}>{currentDesc}</Typography></ThemeProvider>
                <Typography fontWeight={'bold'} color='#0f4a3b' align='center' sx={{ m: 1, fontSize: '3em' }}>Games</Typography>
                <Carousel>
                  {
                    games.map((games) => (
                      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <ThemeProvider theme={MerriweatherFont}>
                          <img alt='missing game asset' className='games' src={games.picture}></img>
                          <Typography>{games.Gname}</Typography>
                          <Typography>Type: {games.Type}</Typography>
                          {renderAdminUI(games.Quantity, games.GameId, games.descp, games.Gname, games.Price, games.Type)}
                        </ThemeProvider>
                      </Box>
                    ))
                  }
                </Carousel>
              </ThemeProvider>
            </Box>
          </Modal>
        </Box>
      </Box>
    </Box>
  )
}
