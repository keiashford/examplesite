import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getServerSideProps() {
  // Get all homes
  const homes = await prisma.home.findMany();
  // Pass the data to the Home page
  return {
    props: {
      homes: JSON.parse(JSON.stringify(homes)),
    },
  };
}

export default function Home({ homes = [] }) {
  var rendered_homes=[];
  
  homes.forEach((x, i) =>(

   rendered_homes.push(
   <div>
    <h2>image src {x.image}</h2>
   <h1>{x.beds}</h1><img src={x.image}></img>
   {JSON.stringify(x)}
   </div>
   )
   ))


  return (
   
    <div>
       
       
  
      <h1 className="text-xl font-medium text-gray-800">
        Top-rated places to stay
      </h1>
      <p className="he">
        Explore some of the best places in the world man
      </p>
      <div className="mt-8">
       {rendered_homes}
        </div>
      </div>    
  );
}






// Pass the data to the Home page





