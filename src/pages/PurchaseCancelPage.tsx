import { useNavigate } from "react-router-dom";
import { XCircle, ShoppingCart, ArrowLeft } from "lucide-react";

function PurchaseCancelPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fff3eb] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-12 h-12 text-orange-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Payment Cancelled
          </h1>
          <p className="text-gray-600">
            Your order was not completed. Your cart items are still saved.
          </p>
        </div>

        <div className="bg-[#fff3eb] rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-700">
            <strong>Note:</strong> No charges were made to your account. You can return to your cart and try again when you're ready.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => navigate('/cart')}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#13776a] text-white rounded-lg hover:bg-[#0f5d52] transition font-semibold"
          >
            <ShoppingCart className="w-5 h-5" />
            Return to Cart
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#13776a] text-[#13776a] rounded-lg hover:bg-gray-50 transition font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            Continue Shopping
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            Need help?{" "}
            <a href="#" className="text-[#13776a] hover:underline font-semibold">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default PurchaseCancelPage;