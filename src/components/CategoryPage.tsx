import { useEffect, useState } from "react";
import { useMenuStore } from "../store/MenuStore";
import MenuCard from "./MenuCard";
import { Loader } from "lucide-react";
import Slider from 'react-slick';
import Footer from "./Footer";

interface Menu {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  ingredients: string[];
  recommended: boolean;
}

interface CategoryPageProps {
  category: string;
}

// Export the component with explicit typing
const CategoryPage: React.FC<CategoryPageProps> = ({ category }) => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(true);
  const { fetchMenusByCategory } = useMenuStore();

  const settings = {
    dots: false,         
    infinite: true,      
    speed: 800,
    slidesToShow: 6,     
    slidesToScroll: 2,
    autoplay: true, 
    arrows:false,     
    autoplaySpeed: 3500, 
    swipeToSlide: true,  
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 600, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } }
    ]
  };

  useEffect(() => {
    const fetchCategoryMenus = async () => {
      if (!category) {
        setLoading(false);
        return;
      }
      
      setLoading(true);
      try {
        const meal = await fetchMenusByCategory(category);
        setMenus(meal || []);
      } catch (err) {
        console.error(err);
        setMenus([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryMenus();
  }, [category, fetchMenusByCategory]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#fff3eb]">
        <Loader className="size-10 animate-spin text-[#13776a]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fff3eb] py-4">
      <div className="px-4"> {/* Fixed: removed extra quote */}
        <h1 className="text-[1.5rem] md:text-[1.8rem] lg:text-[2.5rem] font-serif text-[#13776a] text-center mb-8 capitalize">
          {category} Menu
        </h1>

        {menus.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[#13776a]/70 text-lg font-serif">
              No {category} items available at the moment.
            </p>
          </div>
        ) : (
          <div>
            {/* Image Slider */}
            <div className="w-full  mt-5 md:mt-10  lg:mt-10mb-6 border-dashed pb-4 border-b-2 border-[#13776a]" >
              <Slider {...settings}>
                {menus.map((menu) => (
                  <div key={menu.id} className="p-2">
                    <div className="h-[150px] md:h-[200px] lg:h-[200px] rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-[1.03]">
                      <img 
                        src={menu.image} 
                        alt={`Meal Dish ${menu.name}`} /* Fixed: corrected alt syntax */
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ))}
              </Slider>
            </div>

            {/* Menu Cards Grid */}
            <div className="grid w-[95%] lg:w-[80%] md:w-[80%] mx-auto grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-6 mt-10">
              {menus.map((menu) => (
                <MenuCard key={menu.id} menu={menu} />
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default CategoryPage;