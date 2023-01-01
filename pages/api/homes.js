
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
      if (req.method === 'PUT') {
      try{
        console.log('its a put');
        const {action, theid,stat,statvalue } =
        req.body;
        console.log('id'+theid);
        console.log('statvalue'+statvalue);
        console.log('update?');
        if(action=='update')
     {
      console.log('update');
        const user = await prisma.home.update({
        where: { id: theid },
        data: { [stat]: statvalue },
      })
    }

    console.log('delete?');
    if (action=='delete')
    {
      console.log('action is delete');
      const user = await prisma.home.delete({
        where: { id: theid }
      })

    }

      res.status(200).json({res:'g'});
    }
      catch (e) {
        console.log(e);
      res.status(500).json(e);
    }
  }
    
}