import { PrismaClient } from '@prisma/client';
import DisplayHome from '../components/displayHome';

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
  // new displayHome(x)
   )
   ))


  return (
   
    
       
       
  <div>
      <h1>
        Top-rated places to stay
      </h1>
      <p>
        Explore some of the best places in the world 
      
      </p>
      <p>Example site by: Keith Ashford</p>
      <a className="greenbutton" href="/create">Create new listing</a>
      <div className='homepageFlex'>
       
         {homes.map((h) => { 
          
           return <DisplayHome key={h.id} {...h}  />;
        })}
       
        </div>
      </div>    
  );
}






// Pass the data to the Home page





