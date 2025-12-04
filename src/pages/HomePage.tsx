import Slider from 'react-slick';
import { useEffect } from "react";
import { useMenuStore } from '../store/MenuStore';
import MenuCard from '../components/MenuCard';
import { ChevronRight, Laugh, Loader, MoonStar, UtensilsCrossed } from 'lucide-react';
import { useCommentStore } from '../store/CommentStore';
import CommentCard from '../components/CommentCard';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';




function HomePage() {

  // FIX 1: Correctly destructure all required state and actions from the store
  const { 
      isLoading, 
      error, 
      allMenus, // Contains all fetched menus for the top slider
      breakfastMenus, 
      lunchMenus, 
      dinnerMenus,
      fetchMenus, 
      fetchMenusByCategory 
  } = useMenuStore()

  const{ fetchComments, allComments} = useCommentStore();

  const navigate = useNavigate()

  const settings ={
      dots: false,         
      infinite: true,      
      speed: 800,
      slidesToShow: 6,     
      slidesToScroll: 2,
      arrows:false,
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
      // Pass the category slug/name to the generic function
      fetchMenus();
    }, []);

    useEffect(() => {
      // Pass the category slug/name to the generic function
      fetchMenusByCategory('breakfast');
    }, []);
    
    useEffect(() => {
        fetchMenusByCategory('lunch');
    }, []);
    
    useEffect(() => {
      fetchMenusByCategory('dinner');
    }, []);

    useEffect(() => {
      fetchComments();
    }, []);
  
    
      if (isLoading) {
        return (
          <div className="flex items-center justify-center h-screen bg-[#fff3eb]">
            <Loader className="size-10 animate-spin" color='#13776a'/>
          </div>
        );
      }
    
      if (error) {
        return (
          <div className="container mx-auto px-4 py-8">
            <div className="alert alert-error">{error}</div>
          </div>
        );
      }

    return(
        <main className="bg-[#fff3eb] min-h-screen pt-4 ">
            <div className='border-dotted border-b-2 border-[#13776a]'>

              <h1 className="text-[1.3rem] md:text-[1.8rem] lg:text-[2rem] w-[90%] md:w-[60%] lg:w-[30%] mx-auto text-center font-serif font-semibold tracking-wide text-[#13776a] pt-2 mb-4">
                  Dive Into Delicious Meal Dishes
              </h1>

              <div className="w-full mt-5 md:mt-10  lg:mt-10 mb-6">
                {/* All dynamic data is now type-safe! */}
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
            </div>
                    
            {/* breakfast special menu */}
            <section className='text-[#13776a] mt-10'>
              <div className='text-center'>
                <Laugh color='#13776a' size={40} className='w-[10%] mx-auto' />
                <h1 className='text-[1.3rem] md:text-[1.8rem]  lg:text-[1.8rem] tracking-wide mb-10 font-serif'>Breakfast Special Menu</h1>
                
              </div>
              <div className="grid w-[95%] lg:w-[80%] md:w-[80%] mx-auto grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-6">
                {breakfastMenus.slice(0,8).map((menu) => (
                  <MenuCard key={menu.id} menu={menu}/>
                ))}
              </div>

              <button
                onClick={()=>{navigate("/breakfast")}} 
                className='flex mx-auto mt-7 mb-7 px-6 py-2 rounded-full font-semibold text-white bg-[#157c6e] hover:bg-[#116257] transition-colors shadow-lg'>
                  Breakfast Dishes  <ChevronRight/>
              </button>
            </section>

            {/* lunch special menu */}
            <section className='text-[#13776a] mt-20'>
              <div className='text-center'>
                <UtensilsCrossed color='#13776a' size={40} className='w-[10%] mx-auto' />
                <h1 className='text-[1.3rem] md:text-[1.8rem]  lg:text-[1.8rem]  tracking-wide mb-10 font-serif'>Lunch Special Menu</h1>
                
              </div>
              <div className="grid  w-[95%] lg:w-[80%] md:w-[80%] mx-auto grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-6">
                {lunchMenus.slice(0,8).map((menu) => (
                  <MenuCard key={menu.id} menu={menu}/>
                ))}
              </div>

              <button onClick={()=>{navigate("/lunch")}} 
                className='flex mx-auto mt-7 mb-7 px-6 py-2 rounded-full font-semibold text-white bg-[#157c6e] hover:bg-[#116257] transition-colors shadow-lg'>
                  Lunch Dishes  <ChevronRight/>
              </button>
            </section>

            {/* dinner special menu */}
              <section className='text-[#13776a] mt-20 mb                                     -10'>
              <div className='text-center'>
                <MoonStar color='#13776a' size={40} className='w-[10%] mx-auto' />
                <h1 className='text-[1.3rem] md:text-[1.8rem]  lg:text-[1.8rem]  tracking-wide mb-10 font-serif'>Dinner Special Menu</h1>
                
              </div>
              <div className="grid  w-[95%] lg:w-[80%] md:w-[80%] mx-auto grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-6">
                {dinnerMenus.slice(0,8).map((menu) => (
                  <MenuCard key={menu.id} menu={menu}/>
                ))}
              </div>

              <button onClick={()=>{navigate("/dinner")}} 
                className='flex mx-auto mt-7 mb-7 px-6 py-2 rounded-full font-semibold text-white bg-[#157c6e] hover:bg-[#116257] transition-colors shadow-lg'>
                  Dinner Dishes  <ChevronRight/>
              </button>
            </section>
            
            <section className="border-dotted border-t-2 border-[#13776a] ">
              
              <h1 className='text-[#13776a] mt-5 lg:mt-10 text-[1.5rem] md:text-[2.5rem]  lg:text-[2.5rem] font-serif tracking-wide text-center'>Our Culture</h1>
              {/* All dynamic data is now type-safe! */}
              <div className='w-[95%] mx-auto mt-5 md:mt-10  lg:mt-10 mb-6 '>
                <Slider {...settings}>
                    {allMenus.slice(8,).map((menu) => (
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

              <div >
                  <CommentCard comments={allComments} />
              </div>
            </section>

            {/* footer */}
            <section>
              <Footer/>
            </section>
            


            
        </main>
    )
}

export default HomePage;