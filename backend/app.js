const express = require('express');
const cors = require('cors');
// const sequelize = require('./config/db');
const { sequelize, User, Task } = require('./models'); 


const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');


const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Task Manager API is running');
  
});


app.use('/api/auth',authRoutes);
app.use('/api/task',taskRoutes);


sequelize.authenticate()
  .then(() => {
    console.log('✅ DB connected successfully');
    // Sync database
    return sequelize.sync({ force: false });
  })
  .then(() => {
    console.log('🔄 Database synced');
  })
  .catch(err => console.log('❌ DB error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
