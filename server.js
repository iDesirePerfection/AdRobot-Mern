const express = require('express');
const connectDB = require('./config/db');

const app = express();

//Connect dataBase
connectDB();

//Init Middeleware

app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

app.use('/api/agents', require('./routes/api/agent'));
app.use('/api/customers', require('./routes/api/customer'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
