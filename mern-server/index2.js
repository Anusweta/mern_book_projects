const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')


//middleware
app.use(cors());
app.use(express.json());

//Sa.Vnnd8DHtfd6T

app.get('/', (req,res) => {
    res.send('Hello World!')
})

//mongodb configuration

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://mern-book-store:Sa.Vnnd8DHtfd6T@cluster0.6f08uvc.mongodb.net/?retryWrites=true&w=majority";

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
    await client.connect();

   //create a collection of documents
   const clientbooksCollections = client.db("BookInventory").collection("clientbooks");
   
    //find by category
    app.get('/all-clientbooks', async(req,res) => {
        let query = {};
        if(req.query?.category){
            query = {category: req.query.category}
        }
        const result = await clientbooksCollections.find(query).toArray();
        res.send(result);
    })

    //to get single bookdata
    app.get('/clientbook/:id', async(req,res) => {
      const id = req.params.id;
      const filter = { _id:new ObjectId(id)};
      const result = await clientbooksCollections.findOne(filter);
      res.send(result);
    })



   //insert a book to the db: post method
    app.post('/upload-clientbooks', async(req,res) => {
      const data = req.body;
      const result = await clientbooksCollections.insertOne(data);
      res.send(result);
    })

    
    //update a book data : patch or update methods
    app.patch("/clientbook/:id", async(req,res) => {
        const id = req.params.id;
        const updateBookData = req.body;
        const filter = {_id: new ObjectId(id)};
        const option = { upsert: true};

        const updateDoc = {
            $set: {
                ...updateBookData
            }
        }

        //update
        const result = await clientbooksCollections.updateOne(filter,updateDoc,option);
        res.send(result);
    })

    //delete a book data
    app.delete('/clientbook/:id', async(req,res) => {
        const id = req.params.id;
        const filter = {_id: new ObjectId(id)};
        const result = await clientbooksCollections.deleteOne(filter);
        res.send(result);
    })

    

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})