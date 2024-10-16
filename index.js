const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT||5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
app.use(cors()); 
app.use(express.json());


app.get('/',(req,res)=>{
    res.send('Tourist server is running ')
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
    const Category = client.db('Tourist_spot').collection('Category')

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
    res.send(result);
  })
  
  app.delete('/product/:id',async(req,res) =>{
    const id = req.params.id;
    console.log("delete from database ",id)
    const query = {_id: new ObjectId(id)}
    const result = await Product.deleteOne(query)
    res.send(result);
  })
  // report Page
  app.get('/report', async (req, res) => {
    const { email, from, to } = req.query;
    console.log(email, from, to);
    
    const filter = {
      Email: email,
    
    };

    try {
        const cursor = Product.find(filter);
        const result = await cursor.toArray();
        console.log(result);
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching data");
    }
});
  
  // Categorycal Page List
  
  app.get('/category',async(req,res) => {
    const cursor = Category.find()
    const result = await cursor.toArray();
    res.send(result)
})
app.get('/category/:id',async(req,res) => {
const id = req.params.id;
const query = {_id: new ObjectId(id)}
const result = await Category.findOne(query);
res.send(result);
})
  app.post('/category',async(req,res) =>{
    const newCoffee = req.body;
    const result = await Category.insertOne(newCoffee);
    res.send(result);
});
app.patch('/category/:id',async(req,res) => {
  const id = req.params.id;
  console.log(id);
  const filter = {_id: new ObjectId(id)}
  const newProduct = req.body
  console.log(newProduct);
  const updateDocument = {
    $set: {
        productName: newProduct.productName,
        category: newProduct.category,
        cost: newProduct.cost,
    },
};
  const result = await Category.updateOne(filter,updateDocument)
  console.log(result);
  res.send(result);
})

app.delete('/category/:id',async(req,res) =>{
  const id = req.params.id;
  console.log("delete from database ",id)
  const query = {_id: new ObjectId(id)}
  const result = await Category.deleteOne(query)
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

