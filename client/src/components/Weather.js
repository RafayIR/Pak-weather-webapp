/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import axios from 'axios';
// Material UI Start
import { Box, Button, Card } from '@mui/material';
import { CardContent } from '@mui/material';
import { Typography } from '@mui/material';
import { CardActionArea } from '@mui/material';
import { Container } from "@mui/system";
import Grid from '@mui/material/Grid';
import { Input } from '@mui/material';
// Material UI end 





const Weather = () => {
  const [weather, setWeather] = useState([]);
  const [cityName, setCityName] = useState('');
  const navigate = useNavigate();



  useEffect(() => {
    const socketURL = process.env.REACT_APP_SERVER_URL + '/?token=' + (localStorage.getItem('token') ?? '');
    const socket = io.connect(socketURL)
    console.log("in use effect")
    socket.on('message', (data) => {
      setWeather(data)
    })
  }, [])

  const logout = () => {
    localStorage.clear()
    navigate('/signin');
  }

  const cityHandle = (e) => {
    setCityName(e.target.value)
  }

  const addCity = async () => {
    try {

      await axios.post(process.env.REACT_APP_SERVER_URL + '/user/usercities', {
        city: cityName,
      }, { headers: { 'Authorization': `Basic ${localStorage.getItem('token')}` } })
    } catch (error) {
      console.log(error)
    }
    setCityName('')
  }


  const deleteCity = async (cityName) => {
    try {
      await axios.delete(process.env.REACT_APP_SERVER_URL + '/user/usercities/' + cityName,
        {
          headers: { 'Authorization': `Basic ${localStorage.getItem('token')}` }
        })
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
      {/*  */}

      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ textAlign: 'end' }}>
            {localStorage?.length ? <Button type="button" variant='contained' color="primary" sx={{ mt: 2, mb: 4, }}
              onClick={logout}>Logout</Button> :
              <Button type="button" variant='contained' color="primary" sx={{ mt: 2, mb: 4, }} onClick={logout}>Login</Button>
            }
          </Grid>
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Input placeholder="Enter Your City Name" value={cityName} onChange={cityHandle} name="city"></Input>
            <Button type="button" variant='contained' color="primary" sx={{ m: 4, }} onClick={addCity}>Add</Button>
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
          {weather.map((data, index) => {
            return (
              <Card key={index} sx={{ width: 340, m: 2, }}>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {data.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {(data.main.temp).toFixed(2)} <span className="deg-celsius">°C</span>
                    </Typography>
                    <Grid item xs={12} sx={{}}>
                      <Button type="button" variant='contained' size="small" color="error" sx={{ mt: 2 }} onClick={() => deleteCity(data.name)}>Delete</Button></Grid>
                  </CardContent>
                </CardActionArea>
              </Card>
            )
          })}
        </Box>
      </Container>
      {/*  */}
    </>
  );
};

export default Weather;
