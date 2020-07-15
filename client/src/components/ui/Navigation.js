import React from "react";
import { Link } from "react-router-dom";

export default function Navigation() {
   const url = window.location.pathname; //returns the url pathname of the current page
   const tabActiveOnCreate = (url) => {
      if (
         url.indexOf("create-answer") > 0 || //use >0 to see if something exists
         url.indexOf("create-imagery") > 0
      ) {
         return "tab-active"; //return bootstrap class of tab-active
      } else return "";
   };
   const tabActiveOnReview = (url) => {
      if (
         url.indexOf("review-answer") > 0 ||
         url.indexOf("review-imagery") > 0 ||
         url.indexOf("review-empty") > 0
      ) {
         return "tab-active"; //return bootstrap class of tab-active
      } else return "";
   };
   const tabActiveOnAllCards = (url) => {
      if (url.indexOf("all-cards") > 0) {
         return "tab-active"; //return bootstrap class of tab-active
      } else return "";
   };
   return (
      //This is create so one thing will need to be changed instead of fixing all pages
      <div
         className="btn-group nav-bar"
         role="navigation"
         style={{ width: "100%" }}
         aria-label="navigation"
      >
         <Link
            to="/create-answer"
            type="button"
            className={`btn btn-secondary ${tabActiveOnCreate(url)}`}
         >
            Create new
         </Link>
         <Link
            to="/review-imagery"
            type="button"
            className={`btn btn-secondary tab-separator ${tabActiveOnReview(
               url
            )}`}
         >
            Review
         </Link>
         <Link
            to="/all-cards"
            type="button"
            className={`btn btn-secondary tab-separator ${tabActiveOnAllCards(
               url
            )}`}
         >
            All cards
         </Link>
      </div>
   );
}
