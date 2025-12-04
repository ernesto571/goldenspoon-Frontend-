import { useState } from "react";
import { useAdminMenuStore } from "../store/AdminMenuStore";
import { Loader, X } from "lucide-react";
import { useMenuStore } from "../store/MenuStore";

interface AddItemModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  editingId: string | null;
  setEditingId: (id: string | null) => void;
}

function AddItemModal({ showModal, setShowModal, editingId, setEditingId }: AddItemModalProps) {
  const {
    formData,
    isLoading,
    fetchMenus,
    addToMenu,
    updateMenu,
    setFormData,
    resetFormData,
  } = useAdminMenuStore();

  const { fetchMenusByCategory } = useMenuStore();

  const [ingredientInput, setIngredientInput] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let success;
    if (editingId) {
      success = await updateMenu(editingId, formData);
    } else {
      success = await addToMenu(formData);
    }
    
    if (success) {
      setShowModal(false);
      setEditingId(null);
      resetFormData();
      fetchMenusByCategory(formData.category);
      fetchMenus();
    }
  };

  const handleAddIngredient = () => {
    if (ingredientInput.trim()) {
      setFormData({
        ...formData,
        ingredients: [...formData.ingredients, ingredientInput.trim()],
      });
      setIngredientInput("");
    }
  };

  const handleRemoveIngredient = (index: number) => {
    setFormData({
      ...formData,
      ingredients: formData.ingredients.filter((_, i) => i !== index),
    });
  };

  const handleClose = () => {
    setShowModal(false);
    setEditingId(null);
    resetFormData();
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#fff3eb] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-[#13776a]">
        <div className="sticky top-0 bg-[#fff3eb] border-b-2 border-dotted border-[#13776a] px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-serif font-semibold text-[#13776a]">
            {editingId ? "Edit Menu Item" : "Add New Menu Item"}
          </h2>
          <button
            onClick={handleClose}
            className="text-[#13776a] hover:text-[#116257]"
          >
            <X className="size-6" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-[#13776a] mb-1">
              Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border-2 border-[#13776a] rounded-lg focus:ring-2 focus:ring-[#13776a] focus:border-transparent bg-white outline-none"
              placeholder="e.g., Jollof Rice"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-[#13776a] mb-1">
              Price ($) *
            </label>
            <input
              type="number"
              required
              min="0"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
              className="w-full px-4 py-2 border-2 border-[#13776a] rounded-lg focus:ring-2 focus:ring-[#13776a] focus:border-transparent bg-white outline-none"
              placeholder="e.g., 2500"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-[#13776a] mb-1">
              Image URL *
            </label>
            <input
              type="url"
              required
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-4 py-2 border-2 border-[#13776a] rounded-lg focus:ring-2 focus:ring-[#13776a] focus:border-transparent bg-white outline-none"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-[#13776a] mb-1">
              Category *
            </label>
            <select
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 border-2 outline-none border-[#13776a] rounded-lg focus:ring-2 focus:ring-[#13776a] focus:border-transparent bg-white"
            >
              <option value="">Select a category</option>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="appetizers">Appetizers</option>
              <option value="desserts">Desserts</option>
              <option value="beverages">Beverages</option>
            </select>
          </div>

          {/* Ingredients */}
          <div>
            <label className="block text-sm font-medium text-[#13776a] mb-1">
              Ingredients
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={ingredientInput}
                onChange={(e) => setIngredientInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddIngredient())}
                className="flex-1 px-4 py-2 border-2 border-[#13776a] rounded-lg focus:ring-2 focus:ring-[#13776a] focus:border-transparent bg-white outline-none"
                placeholder="e.g., Tomatoes"
              />
              <button
                type="button"
                onClick={handleAddIngredient}
                className="px-4 py-2 bg-[#157c6e] hover:bg-[#116257] text-white rounded-lg transition font-semibold"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.ingredients.map((ingredient, idx) => (
                <span
                  key={idx}
                  className="bg-[#13776a] text-white px-3 py-1 rounded-full text-sm flex items-center gap-2"
                >
                  {ingredient}
                  <button
                    type="button"
                    onClick={() => handleRemoveIngredient(idx)}
                    className="hover:text-red-300"
                  >
                    <X className="size-4" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Recommended */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="recommended"
              checked={formData.recommended}
              onChange={(e) => setFormData({ ...formData, recommended: e.target.checked })}
              className="w-4 h-4 text-[#13776a] rounded focus:ring-2 focus:ring-[#13776a] outline-none"
            />
            <label htmlFor="recommended" className="text-sm font-medium text-[#13776a]">
              Mark as featured/recommended
            </label>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 border-2 border-[#13776a] text-[#13776a] rounded-lg hover:bg-gray-100 transition font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-[#157c6e] hover:bg-[#116257] text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-semibold"
            >
              {isLoading ? (
                <>
                  <Loader className="size-5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>{editingId ? "Update Item" : "Add Item"}</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddItemModal;