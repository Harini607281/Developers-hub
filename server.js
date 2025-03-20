const express=require('express');
const app=express();
const devuser=require('./devusermode')
const jwt=require('jsonwebtoken');
const middleware=require('./middleware');
const cors=require('cors');
const mongoose = require('mongoose');
const review =require('./reviewmode');
app.use(express.json());
app.use(cors({origin:'*'}));
mongoose.connect('mongodb+srv://root:root1234@cluster0.es2uh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(
    ()=>
    {
        console.log("db connected");
    }
)
app.post('/register', async (req, res) => {
    try {
        console.log(req.body); // Debugging log
        const { fullname, email, mobile, skill, password, confirmpassword } = req.body;

        const exists = await devuser.findOne({ email });
        if (exists) {
            return res.status(400).send("already existed");
        }
        if (password !== confirmpassword) {
            return res.status(403).send("password invalid");
        }
        let newUser = new devuser({
            fullname,
            email,
            mobile,
            skill,
            password,
            confirmpassword
        });
        await newUser.save();
        return res.status(200).send("user registered");
    } catch (err) {
        console.log(err);
        return res.status(500).send("server error");
    }
});
app.post('/login',async(req,res)=>{
    try{
    const{email,password}=req.body;
    const exists=await devuser.findOne({email});
    if(!exists)
    {
        return res.status(400).send("user was not existed");
    }
    if(exists.password!=password)
    {
        return res.status(400).send("password is not valid")
    }
    let payload={
        user:{
            id:exists.id
        }
    }
    jwt.sign(payload,'jwtToken',{expiresIn:360000000},(err,token)=>{
        if(err) throw err;
        return res.json({token});
    })
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).send("server error");
    }
   
})
app.get('/allprofiles',middleware,async(req,res)=>
{
    try{
         let allprofile=await devuser.find();
         return res.json(allprofile);  
    }
    catch(err)
    {
        return res.status(500).send("server error");
    }
})
app.get('/myprofile', middleware, async (req, res) => {
    try {
        // Access the user ID from req.user
        let user = await devuser.findById(req.user.id);

        // Check if user exists
        if (!user) {
            return res.status(404).send("User not found");
        }

        // Return the user profile
        return res.json(user);
    } catch (err) {
        console.error(err);
        return res.status(500).send("Server error");
    }
});
app.post('/addreview', middleware, async (req, res) => {
    try {
        const { taskworker, rating } = req.body;

        if (!taskworker || !rating) {
            return res.status(400).send("Taskworker and rating are required.");
        }

        const taskProvider = await devuser.findById(req.user.id);
        if (!taskProvider) {
            return res.status(404).send("Task provider not found.");
        }

        const newReview = new review({
            taskprovider: taskProvider.fullname,
            taskworker,
            rating,
        });
        await newReview.save();

        return res.status(201).send("Review added successfully.");
    } catch (err) {
        console.error("Error adding review:", err);
        return res.status(500).send("Server error.");
    }
});
app.get('/myreview',middleware,async(req,res)=>{
    try{
           let allreviews=await review.find();
           let myreviews=allreviews.filter(review=>review.taskworker.toString()===req.user.id.toString())
           return res.status(200).json(myreviews);
    }
    catch(err)
    {
        console.error("Error adding review:", err);
        return res.status(500).send("Server error."); 
    }
})
app.get('/',(req,res)=>{
    return res.send('Hello world');
})

app.listen(5000,()=>{console.log("server running")});




/* mongodb+srv://harini:<db_password>@cluster0.i7kv6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0 */