import { useEffect, useState } from "react";
import { useAdminMenuStore } from "../store/AdminMenuStore";
import AdminMenuCard from "../components/AdminMenuCard";
import { 
  UtensilsCrossed, 
  Plus, 
  Loader, 
} from "lucide-react";
import { useMenuStore } from "../store/MenuStore";
import AddItemModal from "../components/AddItemModal";

function AdminHomePage() {
  const {
    allMenus,
    isLoading,
    fetchMenus,
    deleteMenu,
    toggleRecommended,
    setFormData,
    resetFormData,
  } = useAdminMenuStore();

  const {
    breakfastMenus, 
    lunchMenus, 
    dinnerMenus,
    appetizerMenus,
    dessertMenus,
    beverageMenus,
    fetchMenusByCategory 
  } = useMenuStore();

  const categories = ["all", "breakfast", "lunch", "dinner", "appetizers", "desserts", "beverages"];

  const [activeCategory, setActiveCategory] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Fetch all menus on mount
  useEffect(() => {
    fetchMenus();
  }, [fetchMenus]);

  // Fetch menus by category
  useEffect(() => {
    fetchMenusByCategory('breakfast');
    fetchMenusByCategory('lunch');
    fetchMenusByCategory('dinner');
    fetchMenusByCategory('appetizers');
    fetchMenusByCategory('desserts');
    fetchMenusByCategory('beverages');
  }, [fetchMenusByCategory]);

  // Filter menus based on active category
  const getFilteredMenus = () => {
    if (activeCategory === "all") {
      return allMenus;
    }
    
    // Filter from the appropriate category array
    switch (activeCategory) {
      case "breakfast":
        return breakfastMenus;
      case "lunch":
        return lunchMenus;
      case "dinner":
        return dinnerMenus;
      case "appetizers":
        return appetizerMenus;
      case "desserts":
        return dessertMenus;
      case "beverages":
        return beverageMenus;
      default:
        return allMenus;
    }
  };

  const filteredMenus = getFilteredMenus();

  const handleEdit = (menu: any) => {
    setFormData({
      name: menu.name,
      price: menu.price,
      image: menu.image,
      category: menu.category,
      ingredients: menu.ingredients || [],
      recommended: menu.recommended || false,
    });
    setEditingId(menu.id);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      const menuToDelete = allMenus.find(m => m.id === id);
      await deleteMenu(id);
      if (menuToDelete) {
        fetchMenusByCategory(menuToDelete.category);
        // Also refresh all menus
        fetchMenus();
      }
    }
  };

  const openAddModal = () => {
    resetFormData();
    setEditingId(null);
    setShowModal(true);
  };

  if (isLoading && allMenus.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fff3eb]">
        <Loader className="size-10 animate-spin text-[#13776a]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fff3eb] pt-4">
      <div className="w-[95%] md:w-[90%] lg:w-[80%] mx-auto px-4 py-8">
        {/* Header */}
        <div className="block md:flex lg:flex md:justify-between lg:justify-between items-center mb-8 border-dotted border-b-2 border-[#13776a] pb-4">
          <div className="flex items-center gap-3">
            <UtensilsCrossed className="size-5 md:size-8 lg:size-8 text-[#13776a]" />
            <h1 className="text-[1.3rem] md:text-[1.8rem] lg:text-[2rem] font-serif font-semibold tracking-wide text-[#13776a]">
              Menu Management
            </h1>
          </div>
          <button
            onClick={openAddModal}
            className="px-6 py-2 mt-3 text-[0.8rem] md:text-base lg:text-base md:mt-0 lg:mt-0 place-content-center rounded-full font-semibold text-white bg-[#157c6e] hover:bg-[#116257] transition-colors shadow-lg flex items-center gap-2">
            <Plus className="size-3 md:size-5 lg:size-5" />
            Add New Item
          </button>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 lg:gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`
                px-6 py-1 md:py-2 lg:py-3 rounded-full font-semibold transition-all duration-300 capitalize
                ${activeCategory === category
                  ? 'bg-[#13776a] text-white shadow-lg scale-105'
                  : 'bg-[#fff3eb] text-[#13776a] hover:bg-gray-200/10  border border-gray-200'
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu List */}
        {filteredMenus.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[#13776a]/70 text-lg font-serif">
              {activeCategory === "all" 
                ? "No menu items yet. Add your first item!"
                : `No ${activeCategory} items yet.`
              }
            </p>
          </div>
        ) : (
          <div className="grid w-[100%] mx-auto grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-6">
            {filteredMenus.map((menu) => (
              <AdminMenuCard
                key={menu.id}
                menu={menu}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggleRecommended={toggleRecommended}
              />
            ))}
          </div>
        )}

        {/* Add/Edit Modal */}
        <AddItemModal 
          showModal={showModal}
          setShowModal={setShowModal}
          editingId={editingId}
          setEditingId={setEditingId}
        />
      </div>
    </div>
  );
}

export default AdminHomePage;