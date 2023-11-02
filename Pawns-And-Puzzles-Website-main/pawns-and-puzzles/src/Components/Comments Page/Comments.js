import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  createTheme,
  ThemeProvider,
  Box,
  Divider
} from '@mui/material';
import { createTheme as createMuiTheme } from '@mui/material/styles';
import checkerboard from '../../Assets/background/CheckerboardBackground.jpg'
import logo from '../../Assets/Logo/Pawns&Puzzles.png'
import {
  NavLink,
} from "react-router-dom";
import Axios from "axios";
import { Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
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
  },
});

function App() {
  //variables to handle functionailty like comments, alerts, browsability etc.
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState('');
  const [editComment, seteditComment] = useState('');
  const [isOpen, setisOpen] = useState(false);
  const [isAlert, setisAlert] = useState(false);
  const [currentUserId, setcurrentUserId] = useState(0)
  //function on call renders all comments based on API call
  const RenderComments = async () => {
    await Axios.post("https://api-puzzles-pawns.onrender.com/Comment", {
    }).then(async (response) => {
      let newReviews = []
      for (let i = 0; i < response.data.length; i++) {
        newReviews.push({ ReviewId: response.data[i].ChatID, CommentBody: response.data[i].Comment, UserId: response.data[i].userID, Commenter: response.data[i].Email })
      }
      setReviews(newReviews)
      reviews.map.size = reviews.length
    })
  };
  //function that when called renders the delete button and edit button based off if your admin, if you made the comment it also renders the edit button for that comment
  const renderDelete = (commentRef, ChatRef, Comment) => {
    let userId = document.cookie
    let temp = userId.split('=')
    var finalUserId = temp[1]
    if (finalUserId == 1) {
      return (<Box><Button
        variant="outlined"
        sx={{ mr: 4 }}
        color="error"
        onClick={() => handleDelete(ChatRef)}
      >
        Delete
      </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => {
            setisOpen(true)
            seteditComment(Comment)
            setcurrentUserId(ChatRef)
          }}
        >
          Edit
        </Button></Box>
      )
    }
    else if (finalUserId == commentRef) {
      return (<Button
        variant="outlined"
        color="secondary"
        onClick={() => {
          setisOpen(true)
          seteditComment(Comment)
          setcurrentUserId(ChatRef)
        }}
      >
        Edit
      </Button>)
    }
    else {
      return (null)
    }
  }
  //actual API call that deletes the cooresponding comment
  const handleDelete = async (ChatID) => {
    await Axios.post("https://api-puzzles-pawns.onrender.com/DeleteComment", {
      reviewID: ChatID
    }).then(async (response) => {
      RenderComments()
    })
  };
  //actual API call that edits a comment
  const handleEdit = async () => {
    await Axios.post("https://api-puzzles-pawns.onrender.com/UpdateComment", {
      comment: editComment,
      userId: currentUserId
    }).then(async (response) => {
      setisOpen(false)
      RenderComments()
    })
  };
  //function that adds a comment to the database 
  const handleSubmit = async () => {
    if (comment === '') {
      setisAlert(true)
    }
    else {
      setComment('')
      setisAlert(false)
      let userId = document.cookie
      let temp = userId.split('=')
      var finalUserId = temp[1]
      await Axios.post("https://api-puzzles-pawns.onrender.com/AddComment", {
        commentEntry: comment,
        userId: finalUserId
      }).then(async (response) => {
      })
      RenderComments()
    }
  }
  //fires when webpage is initially loaded, renders the comments on first load
  useEffect(() => {
    RenderComments()
  }, [])
  //Renders ALL main UI elements
  return (
    <ThemeProvider theme={customTheme}>
      <div
        style={{
          background: `url(${checkerboard}) no-repeat center center fixed`,
          backgroundSize: 'cover',
          minHeight: '100vh',
        }}

      >
        <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <NavLink to={'/Home'} style={{ alignSelf: 'center' }}><img className='logo' src={logo} alt='Chess' /></NavLink>
            <Box sx={{ display: 'flex', flexDirection: 'column', bgcolor: 'white' }}>

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
              <NavLink to={'/Vendors'} style={{ alignSelf: 'center' }}>
                <Button sx={{
                  my: '2em', mx: '1em', width: '15em', backgroundColor: '#0f4a3b',
                  ':hover': {
                    bgcolor: '#09261f',
                    color: 'white'
                  }
                }} variant='contained'>Become a Vendor</Button>
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
            </Box>
            <Divider variant='middle' orientation='horizontal' sx={{ width: '95%', bgcolor: '#0f4a3b', borderBottomWidth: '0.15em', }}></Divider>
          </Box>
        </Box>
        <Container maxWidth="md">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ThemeProvider theme={MerriweatherFont}>
              <Typography variant="h4" align="center" gutterBottom>
                Board Game Reviews
              </Typography>
              </ThemeProvider>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            {reviews.map((review) => (
              <Grid item xs={12} key={review.ReviewId}>
                <Paper elevation={3} sx={{ p: 2, "&:hover": {
                  transition: 'all 0.2s ease out',
                  boxShadow: '0px 4px 8px rgba(38, 38, 38, 0.2);',
                  top: '-4px',
                  border: '1px solid #cccccc',
                  backgroundColor: '#f0f0f0'
                } }}>
                  <ThemeProvider theme={MerriweatherFont}><Typography fontWeight={'bold'}>{review.CommentBody}</Typography></ThemeProvider>
                  <ThemeProvider theme={SpecialEliteFont}><Typography color={'grey'} variant="h6">- {review.Commenter}</Typography></ThemeProvider>
                  {renderDelete(review.UserId, review.ReviewId, review.CommentBody)}
                </Paper>
              </Grid>
            ))}
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
                <ThemeProvider theme={MerriweatherFont}><Typography sx={{ mb: 2 }} variant="h6">Leave Your Review</Typography></ThemeProvider>
                <Box sx={{ mb: 2 }}> {/* Add margin-bottom */}
                  <Collapse in={isAlert}>
                    <Alert severity='error'>Please input text in the body paragraph</Alert>
                  </Collapse>
                  <TextField
                    required
                    fullWidth
                    label="Your Review"
                    multiline
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    className="custom-textfield"
                  />
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={handleSubmit}
                >
                  Submit Review
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Container>
        {/*pop up window for edit box*/}
        <Modal sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} open={isOpen} onClose={() => setisOpen(false)}>
          <Box sx={{ display: 'flex', bgcolor: 'white', flexDirection: 'column', width: '50%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <ThemeProvider theme={MerriweatherFont}><Typography sx={{ m: '0.5em' }} fontWeight={'bold'}>Edit your review</Typography></ThemeProvider>
              <IconButton onClick={() => setisOpen(false)}><CloseIcon></CloseIcon></IconButton>
            </Box>
            <Divider></Divider>
            <Box sx={{ m: 2 }}> {/* Add margin-bottom */}
              <TextField
                required
                fullWidth
                label="Your Review"
                multiline
                rows={4}
                value={editComment}
                onChange={(e) => seteditComment(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                className="custom-textfield"
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ m: 2 }}
              onClick={handleEdit}
            >
              Submit Review
            </Button>
          </Box>
        </Modal>
      </div>
    </ThemeProvider>
  );
}

export default App;
