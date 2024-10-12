const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT||5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


//  middleware
// app.use(cors());
app.use(express.json());
app.use(cors({
  origin: '*', 
}));

app.get('/',(req,res)=>{
    res.send('Tourist server is  running ')
})

app.listen(port,()=>{
    console.log(`Tourist runnging port ${port}`)
})
const uri = "mongodb+srv://Tourist_spot:lFOyB8qEAYfArisG@cluster0.mh62rbj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    const Product = client.db('Tourist_spot').collection('Product')
    const userCollection2 = client.db('usersDB').collection('users2')

    app.get('/product',async(req,res) => {
      const cursor = Product.find()
      const result = await cursor.toArray();
      res.send(result)
  })
  app.get('/product/:id',async(req,res) => {
  const id = req.params.id;
  const query = {_id: new ObjectId(id)}
  const result = await Product.findOne(query);
  res.send(result);
})
    app.post('/product',async(req,res) =>{
      const newCoffee = req.body;
      console.log(" newCoffee = ",newCoffee)
      const result = await Product.insertOne(newCoffee);
      res.send(result);
  });
  app.patch('/product/:id',async(req,res) => {
    const id = req.params.id;
    console.log(id);
    const filter = {_id: new ObjectId(id)}
    // const options = {upsert: true };
    const newProduct = req.body
    console.log(newProduct);
    const updateDocument = {
      $set: {
          productName: newProduct.productName,
          category: newProduct.category,
          cost: newProduct.cost,
      },
  };
    const result = await Product.updateOne(filter,updateDocument)
    console.log(result);
    res.send(result);
  })
  
  app.delete('/product/:id',async(req,res) =>{
    const id = req.params.id;
    console.log("delete from database ",id)
    const query = {_id: new ObjectId(id)}
    const result = await Product.deleteOne(query)
    console.log(result)
    res.send(result);
  })


  

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

