import { message } from 'antd';
import express from 'express';
const app = express();
const port = 5773;

//middleware to JSON
app.use(express.json())

let users = [
  { id: 1, name: "John snow", email:"john.snow@example.com" },
  { id: 2, name: "Mary jane", email:"mary.jane@example.com" },
  { id: 3, name: "Peter parker", email:"peter.parker@example.com" },
  { id: 4, name: "Bruce wayne", email:"bruce.wayne@example.com" }
];

// Sample routes
app.get('/users', (req, res) => {
   try {
    res.status(200).json({ success: true, message: "Users retrieved successfully", data: users });
   } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
   }
});

app.get("/users/:id", (req, res) => {
  const user = users.find(a => a.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: "User not found" });
  res.status(200).json({ success: true, message: "User retrieved successfully", data: user });
});

//Create User
app.post('/users', (req, res) => {
  const { name, email } = req.body;
    const newUser = {
        id: users.length + 1,
        name,
        email
    };
    users.push(newUser);
    res.status(201).json({ success: true, message: "User created successfully", data: newUser });
    
});

app.put('/users/:id', (req, res) => {
  const user = users.find(a => a.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: "User not found" });  
    const { name, email } = req.body;
    user.name = name || user.name;
    user.email = email || user.email;
    try {
      res.status(200).json({ success: true, message: "User updated successfully", data: user });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to update user" });
    }
});

// Delete User
app.delete("/users/:id", (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "User not found" });

  const deletedUser = users.splice(index, 1)[0];
  res.json({ message: "User deleted", user: deletedUser });
});



// Start the server
app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
});