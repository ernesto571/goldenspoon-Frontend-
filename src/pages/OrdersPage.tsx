import { useEffect } from "react";
import { useOrderStore } from "../store/OrderStore";
import { Loader, ShoppingCart, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import OrderCard from "../components/OrderCard";

function OrdersPage() {
  const { isLoading, fetchUserOrders, orders } = useOrderStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserOrders();
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#fff3eb]">
        <Loader className="size-10 animate-spin" color="#13776a" />
      </div>
    );
  }

  // Empty state
  if (!orders || orders.length === 0) {
    return (
      <div className="min-h-screen bg-[#fff3eb] flex flex-col items-center justify-center text-center p-12">
        <ShoppingCart className="w-16 h-16 text-gray-300 mb-4" />
        <p className="text-xl text-gray-500">You have no orders yet</p>
        <p className="text-gray-400 mt-2">
          Once you place an order, it will appear here.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 mt-4 text-[0.8rem] md:text-base lg:text-base rounded-full font-semibold text-white bg-[#157c6e] hover:bg-[#116257] transition-colors shadow-lg flex items-center gap-2"
        >
          Browse Menu <ChevronRight className="size-[1rem] md:size-[1.5rem] lg:size-base" />
        </button>
      </div>
    );
  }

  // Orders list
  return (
    <div className="min-h-screen bg-[#fff3eb]">
      <h1 className="text-[1.3rem] pt-7 md:text-[1.6rem] lg:text-[2rem] font-bold flex items-center justify-center text-[#13776a] mb-8">
        My Orders
      </h1>
      <div className="w-[98%] md:w-[90%] lg:w-[90%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-y-6 gap-x-20">
        {orders.map((order) => (
          <OrderCard key={order.stripe_session_id} order={order} />
        ))}
      </div>
    </div>
  );
}

export default OrdersPage;
