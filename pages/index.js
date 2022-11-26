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

  return (
   
    <div>
       
       
  
      <h1 className="text-xl font-medium text-gray-800">
        Top-rated places to stay
      </h1>
      <p className="he">
        Explore some of the best places in the world man
      </p>
      <div className="mt-8">
        <div>{JSON.stringify(homes)} </div>
      </div>
      </div>    
  );
}






// Pass the data to the Home page





