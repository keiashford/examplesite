
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
     // Create new home
  
    if (req.method === 'POST') {
        try {
            console.log("helo");
          const { image, title, description, price, guests, beds, baths } =
            req.body;
    
          const home = await prisma.home.create({
            data: {
              image,
              title,
              description,
              price,
              guests,
              beds,
              baths,
            },
          });
        
        res.status(200).json(home);
  // code below is unchanged
  //...
}  
          
        catch (e) {
            console.log(e);
          res.status(500).json({ message: 'Something went wrong' });
        }
      }
}