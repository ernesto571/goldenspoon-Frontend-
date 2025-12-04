import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useOrderStore } from "../store/OrderStore";
import { useCartStore } from "../store/CartStore";
import { CheckCircle, Loader, Home, Package, ShoppingBag, Clock } from "lucide-react";

function PurchaseSuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { verifyPayment, isLoading } = useOrderStore();
  const { clearCart } = useCartStore();
  const [verifying, setVerifying] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    
    if (!sessionId) {
      navigate('/cart');
      return;
    }

    const verify = async () => {
      const result = await verifyPayment(sessionId);
      setSuccess(result);
      setVerifying(false);
      
      // Clear cart on successful payment
      if (result) {
        clearCart();
      }
    };

    verify();
  }, [searchParams, verifyPayment, navigate, clearCart]);

  if (verifying || isLoading) {
    return (
      <div className="min-h-screen bg-[#fff3eb] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="relative">
            <Loader className="w-16 h-16 text-[#13776a] animate-spin mx-auto mb-4" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Package className="w-8 h-8 text-[#13776a]" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-[#13776a] mb-2">
            Verifying your payment...
          </h2>
          <p className="text-gray-600">Please wait a moment</p>
          <div className="mt-4 flex justify-center gap-1">
            <div className="w-2 h-2 bg-[#13776a] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-[#13776a] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-[#13776a] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (!success) {
    return (
      <div className="min-h-screen bg-[#fff3eb] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-5xl font-bold">✕</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            Payment Verification Failed
          </h1>
          <p className="text-gray-600 mb-6">
            We couldn't verify your payment. If you were charged, please contact our support team.
          </p>
          <div className="space-y-3">
            <button 
              onClick={() => navigate('/cart')}
              className="w-full px-6 py-3 bg-[#13776a] text-white rounded-lg hover:bg-[#0f5d52] transition font-semibold"
            >
              Back to Cart
            </button>
            <button 
              onClick={() => navigate('/contact')}
              className="w-full px-6 py-3 border-2 border-[#13776a] text-[#13776a] rounded-lg hover:bg-gray-50 transition font-semibold"
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fff3eb] py-8 md:py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Success Animation Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-6 animate-fade-in">
          <div className="text-center mb-8">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-scale-in">
              <CheckCircle className="w-12 h-12 md:w-14 md:h-14 text-green-500" />
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-[#13776a] mb-2">
              Order Confirmed! 🎉
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              Thank you for your order. We're preparing your delicious meal!
            </p>
          </div>

          {/* Order Status Timeline */}
          <div className="bg-[#fff3eb] rounded-lg p-4 md:p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#13776a] rounded-full flex items-center justify-center">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-[#13776a] text-sm md:text-base">Order Status</p>
                  <p className="text-xs md:text-sm text-gray-600">Processing your order</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs md:text-sm font-semibold">
                Paid
              </span>
            </div>
            
            {/* Timeline */}
            <div className="space-y-3 ml-5 border-l-2 border-dashed border-[#13776a] pl-6 py-2">
              <div className="relative">
                <div className="absolute -left-[30px] w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                <p className="text-sm font-semibold text-gray-800">Payment Confirmed</p>
                <p className="text-xs text-gray-500">Your payment has been received</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[30px] w-4 h-4 bg-[#13776a] rounded-full border-2 border-white animate-pulse"></div>
                <p className="text-sm font-semibold text-gray-800">Preparing Order</p>
                <p className="text-xs text-gray-500">Our kitchen is working on your meal</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[30px] w-4 h-4 bg-gray-300 rounded-full border-2 border-white"></div>
                <p className="text-sm font-semibold text-gray-400">Ready for Delivery</p>
                <p className="text-xs text-gray-400">Will be ready soon</p>
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
              <p className="text-xs md:text-sm text-blue-800">
                📧 You will receive an email confirmation with your order details shortly.
              </p>
            </div>
          </div>

          {/* What's Next Section */}
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-lg md:text-xl font-semibold text-[#13776a] mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              What's Next?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-[#13776a] text-xl mt-1">📧</span>
                <div>
                  <p className="font-semibold text-sm text-gray-800">Email Confirmation</p>
                  <p className="text-xs text-gray-600">Check your inbox for order details</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-[#13776a] text-xl mt-1">👨‍🍳</span>
                <div>
                  <p className="font-semibold text-sm text-gray-800">Kitchen Preparation</p>
                  <p className="text-xs text-gray-600">Fresh ingredients, made with love</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-[#13776a] text-xl mt-1">🚚</span>
                <div>
                  <p className="font-semibold text-sm text-gray-800">Track Your Order</p>
                  <p className="text-xs text-gray-600">Monitor progress in order history</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => navigate('/my-orders')}
            className="flex items-center justify-center gap-2 px-6 py-4 bg-[#13776a] text-white rounded-lg hover:bg-[#0f5d52] transition-all font-semibold shadow-md hover:shadow-lg"
          >
            <Package className="w-5 h-5" />
            View My Orders
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex items-center justify-center gap-2 px-6 py-4 border-2 border-[#13776a] text-[#13776a] rounded-lg hover:bg-[#13776a] hover:text-white transition-all font-semibold"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </button>
        </div>

        {/* Continue Shopping Banner */}
        <div className="bg-gradient-to-r from-[#13776a] to-[#0f5d52] rounded-lg p-6 text-center text-white shadow-lg">
          <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-90" />
          <h3 className="text-xl font-bold mb-2">Want to Order More?</h3>
          <p className="text-sm mb-4 opacity-90">
            Explore our full menu and discover more delicious dishes
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-white text-[#13776a] rounded-lg hover:bg-gray-100 transition font-semibold"
          >
            Browse Menu
          </button>
        </div>

        {/* Help Section */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm mb-2">
            Need help with your order?
          </p>
          <a 
            href="#" 
            className="text-[#13776a] hover:underline font-semibold text-sm inline-flex items-center gap-1"
          >
            Contact Support
            <span>→</span>
          </a>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scale-in {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}

export default PurchaseSuccessPage;