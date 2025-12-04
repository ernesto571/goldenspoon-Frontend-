import { Package } from "lucide-react";

interface order {
  stripe_session_id: string;
  menu_name: string;
  unit_price:number;
  quantity: number;
  total_amount: number;
  created_at: number;
  image:string;
}

interface OrderCardProps {
  order: order;
}

function OrderCard({ order }: OrderCardProps) {
  // Format the date
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  

  return (
    <div className="justify-between text-[#13776a] flex border-dotted border-b-2 border-[#13776a]">
      {/* image and name */}
      <section className="flex">
        {/* Image Section */}
        <section className="h-[60px] mt-2 md:mt-1 lg:mt-1 w-[80px] md:h-[80px] md:w-[100px] lg:h-[80px] lg:w-[100px] mb-3">
          <img
          src={order.image}
            alt={order.menu_name}
            className="w-full h-full object-cover rounded-[8px]"
          />
        </section>
        
        <div className="pl-3">
          <h4 className="lg:whitespace-nowrap font-bold my-1 text-base lg:text-[1.2rem]">
            {order.menu_name}
          </h4>

          <p className="place-content-center text-[0.9rem] lg:text-base font-semibold">${order.unit_price}</p>
          
          {/* Order details */}
          <p className="text-sm flex gap-3">
            <span className="text-xs">
              Qty: {order.quantity}
            </span>
            <span className="text-xs text-[#13776a]/70">
              {formatDate(order.created_at)} 
            </span>
          </p>
          
          {/* Order ID - show only on larger screens */}
          {/* <p className="hidden lg:flex text-xs text-[#13776a]/60 mt-1">
            Order #{order.stripe_session_id}
          </p> */}
        </div>
      </section>

      {/* price and status */}
      <section className="font-bold flex flex-col items-center gap-2">
        {/* Status Icon */}
        <div className="p-1 rounded-full bg-[#13776a] text-white">
          <Package className="w-3 h-3" />
          
        </div>
        
        {/* Total Price */}
        <span className="place-content-center text-[0.9rem] md:text-base lg:text-[1.2rem] md:pt-1 lg:pt-1">
          ${(order.total_amount).toFixed(2)}
        </span>
      </section>
    </div>
  );
}
export default OrderCard