import  express from "express";
import { bookVisit, cancelBooking, createUser, getAllBookings, getAllFavourites, toFav } from "../controllers/userCntrl.js";
import { getAllTheFavourites, getAllUsers, getAlltheBookings } from "../controllers/adminCntrl.js";
const router = express.Router()

router.post("/register" , createUser)
router.post("/bookVisit/:id", bookVisit)
router.post("/allBookings", getAllBookings)
router.post("/removeBooking/:id", cancelBooking)
router.post('/toFav/:rid', toFav);
router.post('/allFav',getAllFavourites);
router.post('/admin/allUsers',getAllUsers);
router.post('/admin/allTheFav', getAllTheFavourites);
router.post('/admin/allTheBookings',getAlltheBookings)
export {router as userRoute}