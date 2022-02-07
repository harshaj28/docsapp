import "@material-tailwind/react/tailwind.css"
import "tailwindcss/tailwind.css"
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { signOut, useSession } from 'next-auth/client';

function Header() {
    const [session]=useSession();

    return(
        <div className="sticky p-3 top-0 z-50 flex items-center px-5 py-3 shadow-sm bg-white">
             <Button color="grey" buttonType="outline" rounded={true} iconOnly={true} ripple="dark" className=" hidden md:inline-flex border-0 h-10 w-10 mr-2 hover:bg-gray-100" >
                  <Icon name="menu" size="2xl" /> 
             </Button> 
             <Icon name="description" size="4xl" color="blue" /> 
             <h1 className="hidden md:inline-flex ml-2 text-gray-700 text-2xl">
                  Docs 
             </h1> 
             <div className="flex flex-grow items-center ml-3 lg:ml-36 md:mr-56 px-5 py-3 bg-gray-100 rounded-lg focus-within:bg-white focus-within:shadow-md  ">
                 <Icon name="search" size="2xl" color="darkgray" />
                  <input type="text" placeholder="Search" className="flex-grow px-5 text-base bg-transparent outline-none" />
            </div> 

            <Button
            color="white"
            buttonType="outline"
            rounded={true}
            iconOnly={true}
            ripple="dark"
            className="hidden md:inline-flex ml-5 h-10 w-10 -border-0 bg-white hover:bg-gray-100"
            >
                <Icon name="apps" size="2xl" color="grey" />
            </Button>
            <img
            loading="lazy"
            className="cursor-pointer h-9 w-9 rounded-full ml-2"
            src={session?.user.image}
            onClick={signOut}
            />
        </div>
    )
}
export default Header;