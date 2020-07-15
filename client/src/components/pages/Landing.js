import React from "react";
import LogoLanding from "../../icons/logo-landing.png";
import SignUp from "../ui/SignUp";
import LogIn from "../ui/LogIn";

export default function Landing() {
   return (
      <div className="background-image">
         <div className="container">
            <div className="row">
               <div className="col">
                  {/* <!-- NEED TO MAKE MOBILE FRIENDLY 
          <div
          className="col-12 col-xl-6 offset-xl-3 col-lg-8 offset-lg-2 col-md-10 offset-md-1"
       > -->
          <!--First card, needs correct fonts and margins, also needs drop down when clicking sign up--> */}
                  <div className="row mb-3 mt-7">
                     <div className="col">
                        <div className="d-flex justify-content-start">
                           <img
                              className="img-responsive mr-5 img-size"
                              src={LogoLanding}
                              alt="White Bear Logo"
                              width="135px;"
                           />
                           <h1
                              className="ml-3 h1-size"
                              style={{ color: "white" }}
                           >
                              White Bear
                           </h1>
                        </div>
                     </div>
                  </div>

                  {/* <!--REMINDER to make mobile friendly get text to reappear & fix margins for textbox--> */}
                  <div className="row mt-5">
                     <SignUp />

                     {/* <!--Second card that needs fonts and margins as well--> */}
                     <LogIn />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
