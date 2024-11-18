// src/routes/userRoutes.ts
import express from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from '../services/userService';
import { userSchema } from '../schemas/User';


const router = express.Router();



// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    console.log(JSON.stringify(error));
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await getUserById(Number(req.params.id));
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.log(JSON.stringify(error));
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Create a new user
router.post('/', async (req, res) => {
  try {
    const user = userSchema.parse(req.body);
    await createUser(user);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.log(JSON.stringify(error));
    res.status(400).json({ error: error });
  }
});

// Update user by ID
router.put('/:id', async (req, res) => {
  try {
    const user = userSchema.partial().parse(req.body);
    await updateUser(Number(req.params.id), user);
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    console.log(JSON.stringify(error));
    res.status(400).json({ error: error });
  }
});

// Delete user by ID
router.delete('/:id', async (req, res) => {
  try {
    await deleteUser(Number(req.params.id));
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.log(JSON.stringify(error));
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

export default router;
