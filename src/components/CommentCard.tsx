import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

interface Comment {
  customer_name: string;
  customer_email: string;
  customer_image: string;
  comment: string;
}

interface CommentCardProps {
  comments: Comment[];
}

export default function CommentCard({ comments }: CommentCardProps) {
  const [index, setIndex] = useState(0);

  const nextComment = () => {
    setIndex(prev => (prev + 1) % comments.length);
  };

  const prevComment = () => {
    setIndex(prev => (prev - 1 + comments.length) % comments.length);
  };

  // Auto-slide every 10 seconds
  useEffect(() => {
    // Only set up the interval if there are comments to display
    if (comments && comments.length > 0) {
      const interval = setInterval(() => {
        nextComment();
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [comments.length]);

  if (!comments || comments.length === 0) {
    return (
      <div className="w-full max-w-md mx-auto p-4 border rounded-lg shadow text-center bg-[#fff3ec]">
        <p className="text-gray-500 font-semibold">No comments available yet. Be the first to leave a review!</p>
      </div>
    );
  }

  const current = comments[index];

  return (
    <div className="w-full shadow-xl relative text-[#533710] bg-[#fcae30] py-6">
      
      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-8 w-[90%] md:w-[85%] lg:w-[80%] mx-auto items-center">
        
        {/* Large Image Section (Hidden on mobile, shown on large screens) */}
        <section className="hidden lg:block w-full h-full p-4">
          <img 
            src={current.customer_image || "https://placehold.co/400x400/533710/ffffff?text=Review+Image"} 
            alt={`Image of ${current.customer_name}`} 
            className="w-full h-[400px] object-cover rounded-[15px] shadow-2xl"
          />
        </section>

        {/* Review Content Section */}
        <section className="px-4 lg:px-0">
          <h2 className="text-[1.2rem] font-bold font-serif mb-4 text-[#533710]">What Our Customers Say</h2>

          {/* Customer Comment Text */}
          <p className="mt-3 mb-7 leading-relaxed font-serif italic text-[1rem] md:text-[1.4rem] text-justify">
            " {current.comment} "
          </p>

          {/* Customer Info */}
          <div className="border-dashed border-t-2 border-[#d99220] pt-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 md:w-16 md:h-16 lg:w-16 lg:h-16  flex-shrink-0">
                <img
                  src={current.customer_image || "https://placehold.co/64x64/d99220/ffffff?text=PFP"}
                  alt="Customer profile"
                  className="w-full h-full rounded-full object-cover ring-2 ring-white shadow-md "
                />
              </div>
              
              <div>
                <h3 className="font-extrabold text-base lg:text-[1.3rem] md:text-[1.3rem] text-[#533710]">{current.customer_name}</h3>
                <p className="text-sm opacity-80">{current.customer_email}</p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex gap-4 items-center mt-6">
              <button
                onClick={prevComment}
                aria-label="Previous Review"
                className="p-2 md:p-3 lg:p-3 bg-white rounded-full ring-2 ring-[#d99220] text-[#147a6d] hover:bg-gray-100 transition shadow-md"
              >
                <ArrowLeft size={20}/>
              </button>

              <button
                onClick={nextComment}
                aria-label="Next Review"
                className="p-2 md:p-3 lg:p-3 bg-[#147a6d] rounded-full ring-1 md:ring-1 lg:ring-1 ring-[#07312f] text-white hover:bg-[#116257] transition shadow-md"
              >
                <ArrowRight size={20}/>
              </button>
              {/* Index indicator */}
              <span className="text-sm font-medium ml-4">
                Review {index + 1} of {comments.length}
              </span>
            </div>
          </div>
        </section>
        
      
      </div>
    </div>
  );
}