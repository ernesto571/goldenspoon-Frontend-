import { useEffect } from "react";
import { useCartStore } from "../store/CartStore";
import { useOrderStore } from "../store/OrderStore";
import { Trash2, Plus, Minus, ShoppingCart, Loader, ChevronRight } from "lucide-react";
import Slider from 'react-slick';
import { useMenuStore } from "../store/MenuStore";
import Footer from "../components/Footer";
import MenuCard from "../components/MenuCard";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


function CartPage() {
  const navigate = useNavigate()
  const {
    cartItems,
    isLoading,
    fetchCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartItemCount
  } = useCartStore();

  const { 
    createCheckoutSession, 
    isLoading: orderLoading 
  } = useOrderStore();

  const { 
    allMenus,
    recommendedMeals,
    fetchMenus,
    fetchRecommendedMeals, 
  } = useMenuStore();

  const settings = {
    dots: false,         
    infinite: true,      
    speed: 800,
    arrows: false,
    slidesToShow: 6,     
    slidesToScroll: 2,
    autoplay: true,      
    autoplaySpeed: 3500, 
    swipeToSlide: true,  
    responsive: [
        { breakpoint: 1024, settings: { slidesToShow: 4 } },
        { breakpoint: 600, settings: { slidesToShow: 3 } },
        { breakpoint: 480, settings: { slidesToShow: 2 } }
    ]
  };

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  useEffect(() => {
    fetchMenus();
  }, [fetchMenus]);

  useEffect(() => {
    fetchRecommendedMeals();
  }, [fetchRecommendedMeals]);

  const handleIncrement = (menu_id: string, currentQuantity: number) => {
    updateQuantity(menu_id, currentQuantity + 1);
  };

  const handleDecrement = (menu_id: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(menu_id, currentQuantity - 1);
    } else {
      removeFromCart(menu_id);
    }
  };

  // Handle checkout
  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    // Format cart items for order
    const products = cartItems.map(item => ({
      id: Number(item.menu_id),
      menu_id: Number(item.menu_id),
      name: item.name,
      price: Number(item.price),
      quantity: item.quantity,
      image: item.image
    }));

    // Create checkout session (will redirect to Stripe)
    await createCheckoutSession(products);
  };

  const total = getCartTotal();
  const itemCount = getCartItemCount();

  if (isLoading && cartItems.length==0) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#fff3eb]">
        <Loader className="size-10 animate-spin" color='#13776a'/>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#fff3eb]">
      <div className="pt-8 px-4">
        {cartItems.length === 0 ? (
          <div className="p-12 items-center text-center ">
            <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-500">Your cart is empty</p>
            <p className="text-gray-400 mt-2">Add some delicious items to get started!</p>
            <button onClick={() => navigate("/my-orders")} 
              className="px-6 py-2 mt-4 text-[0.8rem]  md:text-base lg:text-base rounded-full font-semibold text-white bg-[#157c6e] hover:bg-[#116257] transition-colors shadow-lg flex items-center gap-2 max-w-[50%] mx-auto ">
                View Previous Orders <ChevronRight className="size-[1rem] md:size-[1.5rem] lg:size-base"/>
              </button>
            
          </div>
        ) : (
          <div>
            <span>
              <h1 className="text-[1.3rem] md:text-[1.6rem] lg:text-[2rem] font-bold place-content-center text-[#13776a] mb-8 flex items-center gap-3">
                <ShoppingCart className="w-8 h-8" />
                Your Cart ({itemCount} {itemCount === 1 ? "item" : "items"})
              </h1>

              <button onClick={() => navigate("/my-orders")} 
              className="px-6 py-2 mt-3 text-[0.8rem] md:text-base lg:text-base md:mt-0 lg:mt-0 place-content-center rounded-full font-semibold text-white bg-[#157c6e] hover:bg-[#116257] transition-colors shadow-lg flex items-center gap-2">
                View Previous Orders <ChevronRight/>
              </button>
            </span>
           

            {allMenus.length > 0 && (
              <div className="w-full mx-auto mt-5 mb-6 border-dashed border-b-2 border-[#13776a]">
                <Slider {...settings}>
                  {allMenus.map((menu) => (
                    <div key={menu.id} className="p-2">
                      <div className="h-[150px] md:h-[200px] lg:h-[200px] rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-[1.03]">
                        <img 
                          src={menu.image} 
                          alt={`Meal Dish ${menu.name}`} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            )}

            <div className="md:w-[90%] lg:w-[90%] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-y-4 md:gap-x-12 lg:gap-x-12">
              {/* Cart Items Section */}
              <div className="lg:col-span-2 space-y-4">
                {/* Clear Cart Button */}
                {cartItems.length > 0 && (
                  <button
                    onClick={clearCart}
                    disabled={isLoading}
                    className="flex items-center gap-2 text-red-700 hover:text-red-800 transition disabled:opacity-50">
                    <Trash2 className="w-4 h-4" />
                    Clear Cart
                  </button>
                )}

                {/* Cart Items */}
                {cartItems.map((item) => (
                  <div
                    key={item.menu_id}
                    className="w-full border-dotted justify-betwwen border-b-2 border-[#13776a] md:p-4 lg:p-4 flex gap-2 md:gap-4 lg:gap-4">
                    {/* Item Image */}
                    <section className="flex">
                      {/* Image Section */}
                      <section className="h-[90px] mt-3 w-[90px] md:h-[80px] md:w-[100px] lg:h-[80px] lg:w-[100px] mb-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-[8px]"
                        />
                      </section>

                      {/* Item Details */}
                      <div className="flex-1 text-[#13776a] pl-1 md:pl-4 lg:pl-4">
                        <h3 className="md:whitespace-nowrap lg:whitespace-nowrap font-bold my-2 text-base  lg:text-[1.2rem]">
                          {item.name}
                        </h3>
                        <p className="hidden md:flex lg:flex text-sm text-[#13776a] mt-1">
                          {item.ingredients?.join("  ") || ""}
                        </p>
                        <p className="text-[0.9rem] md:text-lg lg:text-lg font-semibold text-[#13776a] mt-2">
                          ${item.price}
                        </p>
                      </div>
                    </section>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleDecrement(item.menu_id, item.quantity)}
                        className={`p-1 lg:p-2 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={isLoading}>
                        <Minus className="w-4 h-4 text-[#13776a]" />
                      </button>
                      <span className="text-lg font-semibold w-2 lg:w-8 md:w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleIncrement(item.menu_id, item.quantity)}
                        className={`p-1  lg:p-2 bg-[#13776a] hover:bg-[#0f5d52] text-white rounded-full transition-colors ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={isLoading}>
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.menu_id)}
                      className="p-1 lg:p-2 text-red-500 hover:text-red-700 transition-colors"
                      disabled={isLoading}>
                      <Trash2 className="w-5 h-5" />
                    </button>

                    {/* Item Subtotal */}
                    <div className="text-right place-content-center w-[50px] md:min-w-[80px] lg:min-w-[80px]">
                      <p className="text-sm text-ellipsis text-gray-500">Subtotal</p>
                      <p className="text-[0.9rem] md:text-[1.1rem] lg:text-lg font-bold text-[#13776a]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary Section */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
                  <h2 className="text-2xl font-bold text-[#13776a] mb-6">
                    Order Summary
                  </h2>

                  {/* Summary Details */}
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span className="font-semibold">${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Tax (10%)</span>
                      <span className="font-semibold">${(total * 0.1).toFixed(2)}</span>
                    </div>
                    {total < 50 && (
                      <div className="flex justify-between text-gray-600">
                        <span>Delivery Fee</span>
                        <span className="font-semibold">$5.00</span>
                      </div>
                    )}
                    
                    <div className="border-t-2 border-dotted border-gray-300 pt-4">
                      <div className="flex justify-between text-xl font-bold text-[#13776a]">
                        <span>Total</span>
                        <span>${total < 50 ? (total * 1.1 + 5).toFixed(2) : (total * 1.1).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={handleCheckout}
                    disabled={cartItems.length === 0 || orderLoading}
                    className="w-full bg-[#13776a] hover:bg-[#0f5d52] text-white font-bold py-4 rounded-lg transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {orderLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                      </>
                    ) : (
                      "Proceed to Checkout"
                    )}
                  </button>

                  {/* Additional Info */}
                  <p className="text-sm text-gray-500 text-center mt-4">
                    Free delivery on orders over $50
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recommended Meals Section */}
        {recommendedMeals.length > 0 && (
          <div className="w-full border-t-2 border-dashed border-[#13776a] mt-8">
            <div className="md:w-[90%] lg:w-[90%] mx-auto mt-12 mb-8">
              <h2 className="text-[1.5rem] md:text-[1.8rem] lg:text-[1.8rem] font-bold text-[#13776a] mb-6">
                You May Also Like
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-y-6 gap-x-12">
                {recommendedMeals.map((menu) => (
                  <MenuCard key={menu.id} menu={menu} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}

export default CartPage;