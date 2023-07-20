import express from 'express';
import { protectRoute } from '../middleware/authMiddleware.js';
import { 
    registerUser,
    authUser,
    logOut,
    getUserProfile,
    updateUserProfile,
    deleteUser
 } from '../controllers/userControllers.js';
const router = express.Router()

router.post('/', registerUser)
router.post('/auth', authUser)
router.post('/logout', logOut)
router.route('/profile').get(protectRoute, getUserProfile).put(protectRoute, updateUserProfile)
router.delete('/:id', deleteUser)


export default router