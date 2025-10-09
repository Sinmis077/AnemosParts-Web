import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "./ui/input-group"
import { useState } from "react"
import { Link } from "react-router-dom";
import Home from "@/pages/home";

export function NavBar() {
  const [search, setSearch] = useState("")

  const inputHandler = (e) => {
    const lowerCase = e.target.value.toLowerCase();

    setSearch(lowerCase);
  };

  return (
    <header className="grid grid-cols-10 md:grid-cols-9 lg:grid-cols-8 w-full lg:gap-7 gap-4 items-center pb-5 mb-2 shadow">
      <div className="col-span-3 md:col-span-2 lg:col-span-1 flex flex-0 justify-center">
        <Link to="/catalog">
          <img src="src\assets\AnemosParts_Logo.svg" alt="Anemos Racing Parts logo" />
        </Link>
      </div>
      <InputGroup className="col-span-6 bg-white">
        <InputGroupInput value={search} onChange={inputHandler} placeholder="Type to search..." />
      </InputGroup>
      <Avatar className="col-span-1">
        <AvatarImage className="max-h-12 " src="src/assets/AccountIcon.svg" alt="Account settings" />
        <AvatarFallback>No</AvatarFallback>
      </Avatar>
    </header>

    // <NavigationMenu viewport={false}>
    //   <NavigationMenuList>
    //     <NavigationMenuItem>
    //       <NavigationMenuLinker goto="/" displayName="Home" />
    //     </NavigationMenuItem>
    //     <NavigationMenuItem>
    //       <NavigationMenuLinker goto="/catalog" displayName="Catalog" />
    //     </NavigationMenuItem>
    //   </NavigationMenuList>
    // </NavigationMenu>
  )
}
