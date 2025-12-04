import { useEffect } from "react";
import { useOrderStore } from "../store/OrderStore"
import { Loader } from "lucide-react";
import OrderCard from "../components/OrderCard";

function OrdersPage(){

    const {isLoading, fetchUserOrders, orders } = useOrderStore()

    useEffect(() => {
        fetchUserOrders();
    }, []);

    if (isLoading) {
        return (
          <div className="flex items-center justify-center h-screen bg-[#fff3eb]">
            <Loader className="size-10 animate-spin" color='#13776a'/>
          </div>
        );
      }

    return(
        <div className="min-h-screen bg-[#fff3eb]">

          <h1 className="text-[1.3rem] pt-7 md:text-[1.6rem] lg:text-[2rem] font-bold place-content-center text-[#13776a] mb-8 flex items-center">My Orders</h1>
          <div className="w-[98%] md:w-[90%] mx-auto lg:w-[90%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-y-6 gap-x-20">
          {orders.map((order) =>(
                <OrderCard key={order.stripe_session_id} order={order}/>
            ))}
          </div>
            
        </div>
    )
}
export default OrdersPage