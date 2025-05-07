const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');

const app=express();
app.use(cors());
app.use(express.json());

const MONGO_URI = 'mongodb+srv://kavya123:kavya123@cluster0.r1ll2iq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}) 

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phone: String,
  address: String,
  gender: String,
  interests: [String],
  country: String,
});

const User = mongoose.model('User', userSchema);

//create
app.post('/users', async(req, res)=>{
    const user=new User(req.body);
    await user.save();
    res.send(user);
})

//read all
app.get('/users', async(req,res)=>{
    const users = await User.find();
    res.send(users);
})

//update
app.put('/users/:id', async(req,res)=>{
    const user=await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
    res.send(user);
})

//delete
// Delete a user by ID
app.delete('/users/:id', async(req,res)=>{
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.send({ success: true });
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).send({ error: 'Failed to delete user' });
    }
});

  
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log("Server started on port `${PORT}`"));
