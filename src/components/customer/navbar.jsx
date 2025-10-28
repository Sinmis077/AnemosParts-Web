import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { InputGroup, InputGroupInput } from "@/components/ui/input-group"
import { useEffect, useState } from "react"
import { useSearchParams, useNavigate, Link } from "react-router-dom";

export function NavBar() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '')

  useEffect(() => {
    if(!search) {
      searchCatalog();
    } 
  }, [search])

  const handleEnter = (e) => {
    if(e.key === 'Enter') {
      e.preventDefault()

      searchCatalog()
    }
  }

  function searchCatalog() {
    if (search) {
      navigate(`/catalog?search=${encodeURIComponent(search)}`)
    }
    else {
      navigate()
    }
    
  }


  return (
    <header className="grid grid-cols-10 md:grid-cols-9 lg:grid-cols-8 w-full lg:gap-7 gap-4 items-center px-5 py-5 shadow bg-slate-50">
      <div className="col-span-3 md:col-span-2 lg:col-span-1 flex flex-0 justify-center">
        <Link to="/catalog">
          <img src="src\assets\AnemosParts_Logo.svg" alt="Anemos Racing Parts logo" />
        </Link>
      </div>
      <InputGroup className="col-span-6 bg-white">
        <InputGroupInput value={search} onChange={(e) => {setSearch(e.target.value)}} onKeyDown={handleEnter} placeholder="Type to search..." />
      </InputGroup>
      <Avatar className="col-span-1">
        <AvatarImage className="max-h-12 " src="src/assets/AccountIcon.svg" alt="Account settings" />
        <AvatarFallback>No</AvatarFallback>
      </Avatar>
    </header>
  )
}
