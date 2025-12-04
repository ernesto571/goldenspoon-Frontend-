import { MapPin, Phone, Mail, Home, ShoppingCart, Utensils, MoonStar, Coffee, Cookie, Github, Linkedin, Instagram, ArrowRight } from "lucide-react";

const currentYear = new Date().getFullYear();

function Footer() {
  
  // Data structure for the Nav/Menu links
  const menuLinks = [
    { name: "Breakfast", icon: Utensils, href: "/breakfast" },
    { name: "Lunch", icon: Utensils, href: "/lunch" },
    { name: "Dinner", icon: MoonStar, href: "/dinner" },
    { name: "Appetizers", icon: Cookie, href: "/appetizers" },
    { name: "Desserts", icon: Cookie, href: "/desserts" },
    { name: "Beverages", icon: Coffee, href: "/beverages" },
  ];

  const navigateLinks = [
    { name: "Home", icon: Home, href: "/" },
    { name: "Cart", icon: ShoppingCart, href: "/cart" },
  ];

  const followLinks = [
    { name: "GitHub", icon: Github, href: "https://github.com/yourusername" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/in/yourprofile" },
    { name: "Instagram", icon: Instagram, href: "https://instagram.com/yourhandle" },
  ];

  return (
    <footer className="bg-[#fff3eb] text-[#533710] font-sans border-t-2 border-dashed border-[#13776a] mt-16 shadow-inner">
      <div className="w-[95%] mx-auto pt-8">

        {/* --- Main Grid Layout --- */}
        {/* Responsive grid: 1 column on small screens, 2 on medium, 4 on large */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-8">
          
          {/* 1. BRAND/CONTACT SECTION */}
          <div className="space-y-6">
            <h3 className=" text-[1.3rem] whitespace-nowrap md:text-3xl lg:text-3xl font-bold text-[#13776a] font-serif tracking-wider">
              Golden Spoon
            </h3>
            <p className="text-sm max-w-xs">
              Authentic meals delivered with passion and speed, ensuring a delicious experience every time.
            </p>

            {/* Contact Details */}
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#13776a] flex-shrink-0 mt-1" />
                <p>123 Spice Route, Lagos, Nigeria</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#13776a] flex-shrink-0" />
                <p>+234 802 741 5836</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#13776a] flex-shrink-0" />
                <p>goldenspoon@gmail.com</p>
              </div>
            </div>
          </div>
          
          {/* 2. NAVIGATION SECTION */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold border-b-2 border-dashed border-[#d99220] pb-2 text-[#13776a]">Navigate</h4>
            <ul className="space-y-3">
              {navigateLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="flex items-center gap-2 text-[#533710] hover:text-[#13776a] transition-colors"
                  >
                    <ArrowRight className="w-4 h-4 text-[#d99220]" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. MENU SECTION */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold border-b-2 border-dashed border-[#d99220] pb-2 text-[#13776a]">Our Menu</h4>
            <ul className="space-y-3">
              {menuLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="flex items-center gap-2 text-[#533710] hover:text-[#13776a] transition-colors"
                  >
                    <link.icon className="w-4 h-4 text-[#13776a]" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. FOLLOW US SECTION */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold border-b-2 border-dashed border-[#d99220] pb-2 text-[#13776a]">Follow Us</h4>
            <div className="flex flex-col space-y-3">
                {followLinks.map((link) => (
                    <a 
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-[#533710] hover:text-[#13776a] transition-colors"
                    >
                        <link.icon className="w-5 h-5 text-[#d99220]" />
                        {link.name}
                    </a>
                ))}
            </div>
            
            <div className="pt-4">
                <p className="text-sm font-semibold text-[#13776a]">Join Our Newsletter</p>
                <form className="mt-2 flex">
                    <input 
                        type="email" 
                        placeholder="Your email"
                        className="p-2 text-sm rounded-l-lg border-2 border-[#13776a] focus:outline-none focus:ring-1 focus:ring-[#fcae30] w-full max-w-[200px]"
                    />
                    <button className="p-2 text-sm bg-[#13776a] text-white rounded-r-lg hover:bg-[#116257] transition">
                        Sign Up
                    </button>
                </form>
            </div>
          </div>

        </div>

        {/* --- Copyright Section --- */}
        <div className="mt-5  border-t border-dotted border-[#d99220] text-center">
          <p className="text-sm my-6 text-[#533710]">
            &copy; {currentYear} Golden Spoon. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer