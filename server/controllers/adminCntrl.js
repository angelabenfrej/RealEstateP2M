import asyncHandler from 'express-async-handler'
import { prisma } from '../config/prismaConfig.js'

export const getAlltheBookings = asyncHandler(async (req, res) => {
    const { email } = req.body;
    console.log('Request Body Email:', email);

    const adminUser = await prisma.user.findUnique({
        where: { email: email },
    });

    try {
        if (adminUser.role !== "ADMIN") {
            return res.status(404).send('Forbidden, You must be an admin');
        }
        const bookings = await prisma.user.findMany({
            select: { bookedVisits: true }
        });

        res.status(200).send(bookings);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
});



export const getAllTheFavourites = asyncHandler(async(req, res)=>{
    const {email}= req.body;
    const adminUser = await prisma.user.findUnique({
        where: { email: email },
    });
    try {

        if (adminUser.role !== "ADMIN") {
            return res.status(404).send('Forbidden, You must be an admin');
        }
        const favourites = await prisma.user.findMany({
            select :{ 
                email: true, // Include email (be mindful of privacy considerations)
                favResidenciesiD: true}
        })
        res.status(200).send(favourites)
        
    } catch (err) {
        throw new Error(err.message);
        
    }
})


export const getAllUsers = asyncHandler(async (req, res) => {
    const {email}= req.body;
    const adminUser = await prisma.user.findUnique({
        where: { email: email },})
  try {

    if (adminUser.role !== "ADMIN") {
        return res.status(404).send('Forbidden, You must be an admin');
    }
    const users = await prisma.user.findMany({
        select: { 
            id: true,   
            email: true, 
          },
          
    });

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});


export const getAllAdmins = asyncHandler(async (req, res) => {
    const {email}= req.body;
    const adminUser = await prisma.user.findUnique({
        where: { email: email },})
  try {

    if (adminUser.role !== "ADMIN") {
        return res.status(404).send('Forbidden, You must be an admin');
    }
    const users = await prisma.user.findMany({
        where: {
            role : "ADMIN", // Filter for users with role 'USER'
          },
        select: {
            id: true,   
            email: true, // Include email (be mindful of privacy considerations)
          },
          
    });

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});