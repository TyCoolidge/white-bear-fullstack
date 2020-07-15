import React from "react";
import successIcon from "../../icons/success.svg";
import errorIcon from "../../icons/error.svg";
import saveIcon from "../../icons/save.svg";
import AppTemplate from "../ui/AppTemplate";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { checkIsOver, MAX_CARD_CHARS } from "../../utils/helpers";

// import addAnswer from "../pages/CreateAnswer";

export default class CreateImagery extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         addImagery: "",
      };
   }
   setAddImageryText(e) {
      this.setState({ addImagery: e.target.value });
   }

   checkIfImageryHasValidCharCount() {
      if (
         this.state.addImagery.length > MAX_CARD_CHARS ||
         this.state.addImagery.length === 0
      ) {
         return true;
      } else return false;
   }

   render() {
      return (
         <div>
            {/* //   <!-- created success overlay --> */}
            <div
               className="bg-success w-100 py-4 d-none justify-content-center fixed-top"
               id="overlay-success"
            >
               <img
                  src={successIcon}
                  width="28px"
                  style={{ marginTop: "-1px" }}
                  className="mr-2"
                  alt="Success Icon"
               />
               {/* <!-- find out what broke this --> */}
               <p className="lead" style={{ color: "white" }}>
                  Card created!
               </p>
            </div>

            {/* // <!-- created danger overlay --> */}
            <div
               className="bg-danger w-100 py-4 d-none justify-content-center fixed-top"
               id="overlay-danger"
            >
               <img
                  src={errorIcon}
                  width="28px"
                  style={{ marginTop: "-1px" }}
                  className="mr-2"
                  alt="error icon"
               />
               {/* <!-- find out what broke this --> */}
               <p className="lead" style={{ color: "white" }}>
                  Oops! Our bad. Please try again.
               </p>
            </div>

            {/* <!-- comment just to split code for organization--> */}
            <AppTemplate>
               <h4 className="my-4 text-center text-muted">
                  Add memorable imagery
               </h4>

               {/* <!--TOP CARD FOR FUTURE PAGES--> */}
               <div className="mb-2">
                  <div className="card bg-primary">
                     <div className="card-body">
                        {/* <!--add rows --> */}
                        <textarea
                           rows="7"
                           autofocus="autofocus"
                           id="imageryCard"
                           onChange={(e) => this.setAddImageryText(e)}
                        ></textarea>
                     </div>
                  </div>

                  <div className="card bg-secondary">
                     <div className="card-body">
                        <textarea
                           rows="4"
                           defaultValue="placeholder text"
                        ></textarea>
                     </div>
                  </div>
               </div>
               {/* <!-- character count--> */}
               <p className="float-right mb-5 text-muted">
                  <span
                     className={classnames({
                        "text-danger": checkIsOver(
                           this.state.addImagery,
                           MAX_CARD_CHARS
                        ),
                     })}
                  >
                     {this.state.addImagery.length}/{MAX_CARD_CHARS}
                  </span>
               </p>
               {/* <!-- create margin between card and buttons --> */}
               <div className="clearfix"></div>
               {/* <!-- make Button link to next page--> */}
               <button
                  type="button"
                  className="btn btn-link"
                  style={{ float: "left" }}
                  id="create-error"
               >
                  Back to answer
               </button>
               <div className="float-right">
                  <Link
                     to="/review-imagery"
                     type="button"
                     className={classnames("btn btn-primary btn-lg", {
                        disabled: this.checkIfImageryHasValidCharCount(),
                     })}
                     id="save-imagery"
                  >
                     <img
                        src={saveIcon}
                        width="20px"
                        style={{ marginTop: "-1px" }}
                        className="mr-2"
                        alt="save icon"
                     />
                     Save
                  </Link>
               </div>
            </AppTemplate>
         </div>
      );
   }
}
