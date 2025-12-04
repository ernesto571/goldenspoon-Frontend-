import { Pencil, Trash2, Star } from "lucide-react";

interface Menu {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  ingredients: string[];
  recommended: boolean;
}

interface AdminMenuCardProps {
  menu: Menu;
  onEdit: (menu: Menu) => void;
  onDelete: (id: string) => void;
  onToggleRecommended: (id: string, recommended: boolean) => void;
}

function AdminMenuCard({ menu, onEdit, onDelete, onToggleRecommended }: AdminMenuCardProps) {
  return (
    <div className="justify-between text-[#13776a] flex border-dotted border-b-2 border-[#13776a] pb-3 mb-3">
      {/* Image and Name */}
      <section className="flex flex-1">
        {/* Image Section */}
        <section className="h-[80px] w-[100px] mt-1 relative">
          <img
            src={menu.image}
            alt={menu.name}
            className="w-full h-full  object-cover rounded-[8px]"
          />
          {menu.recommended && (
            <div className="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-1">
              <Star className="size-3 fill-white text-white" />
            </div>
          )}
        </section>

        <div className="pl-3 flex-1">
          <h4 className="font-bold my-1 text-base md:text-[1.2rem] lg:text-[1.2rem]">
            {menu.name}
          </h4>
          <p className="text-xs text-[#13776a]/70 mb-1">
            Category: {menu.category}
          </p>
          <p className="text-sm flex flex-wrap gap-2">
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

      {/* Price and Actions */}
      <section className="font-bold flex flex-col items-center place-content-center gap-2 ml-4">
        {/* Price */}
        <span className="text-lg whitespace-nowrap">${menu.price}</span>
        
        {/* Action Buttons */}
        <div className="flex gap-1">
          {/* Feature/Unfeature Button */}
          <button
            onClick={() => onToggleRecommended(menu.id, !menu.recommended)}
            className={`
              p-2 rounded-full transition-all duration-300 hover:scale-110
              ${menu.recommended 
                ? "bg-yellow-400 text-white" 
                : "bg-gray-200 text-[#13776a] hover:bg-yellow-100"
              }
            `}
            aria-label={menu.recommended ? "Remove from featured" : "Add to featured"}
            title={menu.recommended ? "Remove from featured" : "Add to featured"}
          >
            <Star className={`w-4 h-4 ${menu.recommended ? "fill-white" : ""}`} />
          </button>

          {/* Edit Button */}
          <button
            onClick={() => onEdit(menu)}
            className="p-2 rounded-full bg-blue-500 text-white transition-all duration-300 hover:bg-blue-600 hover:scale-110"
            aria-label="Edit menu item"
            title="Edit"
          >
            <Pencil className="w-4 h-4" />
          </button>

          {/* Delete Button */}
          <button
            onClick={() => onDelete(menu.id)}
            className="p-2 rounded-full bg-red-500 text-white transition-all duration-300 hover:bg-red-600 hover:scale-110"
            aria-label="Delete menu item"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}

export default AdminMenuCard;