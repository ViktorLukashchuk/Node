const  express = require('express');
const app = express();
const  fsService = require('./fsService')

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.listen(5000, ()=>{
    console.log("Server has been started");
})

app.get('/users', async (req, res)=> {
   const  users = await fsService.reader();
   res.json(users);
})

app.get('/users/:id', async (req, res)=> {
    const  users = await fsService.reader();
    const {id} = req.params;
    const user = users.filter((user)=> user.id === +id)
    res.json(user);
})

app.post('/users', async (req, res) =>{
    try {
        const {name, email} = req.body;

        if (!name || name.length < 2){
            throw new Error('Wrong name')

        }

        if (!email || !email.includes('@') ){
            throw new Error('Wrong name')

        }

        const users = await fsService.reader();
        const lastId = users[users.length-1].id;
        const newUser = {name, email, id: lastId + 1}
        users.push(newUser);
        await fsService.writer(users);

        res.status(201).json(newUser);
    }
   catch (e) {
       return res.status(400).json(e.message)
   }

})

app.put('/users/:id', async (req, res) =>{
    try {
        const {name, email} = req.body;

        if (!name || name.length < 2){
            throw new Error('Wrong name')

        }

        if (!email || !email.includes('@') ){
            throw new Error('Wrong name')

        }

        const users = await fsService.reader();
        const {id} = req.params;
        const updatedUser = {id: +id, name, email}
        users[+id-1] = updatedUser
        console.log(users)
        await fsService.writer(users);

        res.status(201).json(updatedUser);
    }
    catch (e) {
        return res.status(400).json(e.message)
    }

})

app.delete('/users/:id', async (req, res) =>{
    try {
        const users = await fsService.reader();
        const {id} = req.params;
        const deleteId = Number(id) - 1
        users.splice(deleteId, 1);
        console.log(users)
        await fsService.writer(users);
        res.send("DELETE Request DONE")
    }
    catch (e) {
        return res.status(400).json(e.message)
    }
})