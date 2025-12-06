import { SignIn } from "@clerk/clerk-react";

function SignInPage() {
  
    return(
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 min-h-screen">

        {/* right hand section */}
        <section className=" bg-[#fff3ec]">
          <div className="w-[92%] md:w-[90%] place-content-center lg:w-[70%] mx-auto ">
            <h1 className="mt-4 text-[1.7rem] font-bold font-serif  text-[#3f5d43]">Let's Get Started !</h1>
            <p className="mt-2 mb-5 font-bold font-serif  text-[#3f5d43]">Unlock a world of flavour.</p>
            <SignIn 
              path="/sign-in" 
              routing="path" 
              signUpUrl="/sign-up" // <--- Make sure this is here!
            />
          </div>
          
        </section>

        {/* left hand section */}
        <section className="hidden md:flex lg:flex">
          <img src="/auth_page.png" alt="authpage poster" />
        </section>
      </main>
    )
  }
  
  export default SignInPage;

  
