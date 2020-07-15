import React from "react";
import AppTemplate from "../ui/AppTemplate";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { checkIsOver, MAX_CARD_CHARS } from "../../utils/helpers";

export default class CreateAnswer extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         addAnswer: "",
      };
   }

   setAnswerText(e) {
      this.setState({ addAnswer: e.target.value });
   }

   checkHasInvalidCharCount() {
      if (
         this.state.addAnswer.length > MAX_CARD_CHARS ||
         this.state.addAnswer.length === 0
      ) {
         return true;
      } else return false;
   }

   render() {
      return (
         <AppTemplate>
            <h4 className="my-4 text-center text-muted">Add an answer</h4>

            <div className="mb-2">
               <div className="card bg-secondary">
                  <div className="card-body">
                     <textarea
                        rows="7"
                        autoFocus="autofocus"
                        id="textInput"
                        onChange={(e) => this.setAnswerText(e)}
                     ></textarea>
                  </div>
               </div>
            </div>
            {/* <!-- character count--> */}
            <p className="float-right mb-4 text-muted" id="overLimit">
               <span
                  className={classnames({
                     "text-danger": checkIsOver(
                        this.state.addAnswer,
                        MAX_CARD_CHARS
                     ),
                  })}
               >
                  {this.state.addAnswer.length}/{MAX_CARD_CHARS}
               </span>
            </p>
            {/* <!-- create margin between card and buttons --> */}
            <div className="clearfix"></div>

            {/* <!-- make Button link to next page--> */}
            <Link
               to="create-imagery"
               type="button"
               className={classnames("btn btn-outline-primary btn-lg", {
                  disabled: this.checkHasInvalidCharCount(),
               })}
               style={{ float: "right" }}
               id="nextButton"
            >
               Next
            </Link>
         </AppTemplate>
      );
   }
}
