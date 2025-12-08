import React, { useEffect, useState } from 'react';
import { InputGroup, InputGroupInput } from '@/components/ui/input-group';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { CircleUserRound, ShoppingCart } from 'lucide-react';
import useCart from '@/app/contexts/CartContext';

const navigationItems = [
  {
    title: "Home",
    to: "/",
  },
  {
    title: "Parts catalog",
    to: "/catalog",
  },
];

export function NavBar() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  const location = useLocation();

  const cart = useCart();

  const iconSize = 30;
  const iconColor = "#303030";

  useEffect(() => {
    if (!search) {
      searchCatalog();
    }
  }, [search]);

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      searchCatalog();
    }
  };

  function searchCatalog() {
    if (search) {
      navigate(`/catalog?search=${encodeURIComponent(search)}`);
    } else {
      navigate(location.pathname);
    }
  }

  return (
    <header className="grid-cols-1 grid-rows-3 shadow">
      <div className="flex gap-2 md:gap-7 w-full md:w-9/12 md:mx-auto items-center md:p-5 px-2.5 py-2.5 shadow-2xs">
        <div className="min-w-[12%] hidden sm:flex flex-0 justify-center">
          <Link to="/catalog">
            <img
              height={iconSize}
              src={"/AnemosParts_Logo.svg"}
              alt="Anemos Racing Parts logo"
            />
          </Link>
        </div>
        <InputGroup className="w-10/12 md:w-9/12 bg-white rounded-full">
          <InputGroupInput
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            onKeyDown={handleEnter}
            placeholder="Type to search..."
          />
        </InputGroup>
        <div className="w-auto flex gap-4 p-2">
          <button className="min-w-min min-h-min p-0.5 hidden md:block">
            <CircleUserRound
              strokeWidth={1.3}
              width={iconSize}
              height={iconSize}
              color={iconColor}
            />
          </button>
          <Link to="/cart" className="min-w-min min-h-min p-0.5 relative">
            <ShoppingCart
              strokeWidth={1.3}
              width={iconSize}
              height={iconSize}
              color={iconColor}
            />
            {cart.length > 0 && (
              <p className="absolute -top-1 -right-1.5 rounded-full w-5.5 h-5.5 flex items-center justify-center bg-sky-500 text-xs text-white border-2 border-white">
                {cart.length}
              </p>
            )}
          </Link>
        </div>
      </div>
      <div className="bg-gray-500 h-0.5 opacity-20 w-full"></div>
      <div className="flex p-1 w-8/12 mx-auto text-gray-700">
        {navigationItems.map((item) => (
          <Link key={item.title} to={item.to} style={{ fontSize: 15 }} className="px-5">
            {item.title}
          </Link>
        ))}
      </div>
    </header>
  );
}
