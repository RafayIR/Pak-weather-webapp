require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors')
const dbcon = require('./dbconfig/mongodbconfig')
const userRoutes = require('./routes/userRoutes');
const weather = require('./controllers/weather')
const fetchUserId = require('./controllers/user')
const scio = require('./controllers/socketio');
const { User } = require("./models/userModel");
app.use(cors());
const getCitiesWeather = require('./controllers/weather')

const http = require('http')
const server = http.createServer(app)
const io = require('socket.io')(server, {
    cors: "*",
    methods: ["GET", "POST"]
});

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send("Welcome to weather app");
})



const rooms = [];

io.on('connection', (socket) => {
    console.log('user connected');

    const userId = fetchUserId(socket.handshake.query.token);
    if (!rooms.includes(userId)) rooms.push(userId);
    socket.join(userId);


    socket.on('getWeatherUpdate', async () => {
        // console.log('user connected');
        // socket.to("some room").emit("some event");
        const data = await getCitiesWeather();
        io.to(userId).emit('message', data)
    })
    socket.on("disconnecting", () => {
        console.log(socket.rooms); // the Set contains at least the socket ID
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    })
})

setInterval(() => {
    // console.log('inside interval', rooms);
    rooms.map(async (room) => {
        let data = '';
        if (room != 'guest') {
            const userData = await User.findById(room);
            data = await getCitiesWeather(userData.cities);
        } else {
            data = await getCitiesWeather();
        }
        io.to(room).emit('message', data)
    })

}, 1000)


app.use('/user', userRoutes);

server.listen(8080, () => {
    console.log('port connected on 8080');
})