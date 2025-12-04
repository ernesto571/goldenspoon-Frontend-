import { Plus, Check } from "lucide-react";
import { useCartStore } from "../store/CartStore";

interface Menu {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  ingredients: string[];
}

interface MenuCardProps {
  menu: Menu;
}

function MenuCard({ menu }: MenuCardProps) {
  const { addToCart, isInCart, isLoading } = useCartStore();
  const inCart = isInCart(menu.id);

  const handleAddToCart = async () => {
    if (!inCart) {
      await addToCart(menu, 1);
    }
  };

  return (
    <div className="justify-between text-[#13776a] flex border-dotted border-b-2 border-[#13776a]">
      {/* image and name */}
      <section className="flex">
        {/* Image Section */}
        <section className="h-[60px]  mt-2 md:mt-1 lg:mt-1  w-[80px] md:h-[80px] md:w-[100px] lg:h-[80px] lg:w-[100px] mb-3">
          <img
            src={menu.image}
            alt={menu.name}
            className="w-full h-full object-cover rounded-[8px]"
          />
        </section>
        <div className="pl-3">
          <h4 className=" lg:whitespace-nowrap font-bold my-2 text-base  lg:text-[1.2rem]">
            {menu.name}
          </h4>
          <p className="hidden  lg:flex text-sm  gap-2 ">
          {menu.ingredients.slice(0, 4).map((ingredient, index) => (
              <span key={index} className="text-xs">
                {ingredient}
              </span>
            ))}
          {menu.ingredients.length > 4 && (
              <span className="text-xs text-[#13776a]/70">
                +{menu.ingredients.length - 3} more
              </span>
            )}
          </p>
          {/* show only on small screen */}
          <p className="text-sm md:whitespace-nowrap lg:whitespace-nowrap flex lg:hidden gap-2 ">
          {menu.ingredients.slice(0, 2).map((ingredient, index) => (
              <span key={index} className="text-xs">
                {ingredient}
              </span>
            ))}
          {menu.ingredients.length > 3 && (
              <span className="text-xs text-[#13776a]/70">
                +{menu.ingredients.length - 3} more
              </span>
            )}
          </p>
        </div>
      </section>

      {/* price and add button */}
      <section className="font-bold  flex flex-col items-center gap-2">
        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={inCart || isLoading}
          className={`
            p-1 rounded-full transition-all duration-300 
            ${inCart 
              ? "bg-[#13776a] text-white cursor-default" 
              : " hover:bg-gray-200 text-[#13776a] hover:scale-110"
            }
            ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
          `}
          aria-label={inCart ? "In cart" : "Add to cart"}
        >
          {inCart ? (
            <Check className="w-3 h-3" />
          ) : (
            <Plus className="w-5 h-5" />
          )}
        </button>
        
        {/* Price */}
        <span className="place-content-center text-[0.9rem]  lg:text-base md:pt-1 lg:pt-1">${menu.price}</span>
      </section>
    </div>
  );
}

export default MenuCard;