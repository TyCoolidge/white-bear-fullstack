import React from "react";
import thumbsUp from "../../icons/thumbs-up.svg";
import AppTemplate from "../ui/AppTemplate";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { actions } from "../../store/actions";

class ReviewAnswer extends React.Component {
   constructor(props) {
      super(props);
      if (this.props.queue.cards.length === 0) {
         this.props.history.push("/review-empty");
      }
   }
   goToNextCard() {
      //TODO if index of current card =total length THEN show out of cards
      if (this.props.queue.index === this.props.queue.cards.length - 1) {
         //you're on the last card
         this.props.dispatch({ type: actions.INCREMENT_QUEUE_INDEX });
         this.props.history.push("/review-empty");
      } else {
         this.props.dispatch({ type: actions.INCREMENT_QUEUE_INDEX });
         this.props.history.push("/review-imagery");
      }
   }

   storeEditableCard() {
      console.log("store");
      const memoryCard = this.props.queue.cards[this.props.queue.index];
      this.props.dispatch({
         type: actions.STORE_EDITABLE_CARD,
         payload: {
            card: memoryCard,
            prevRoute: "/review-answer",
         },
      });
   }

   render() {
      const memoryCard = this.props.queue.cards[this.props.queue.index];
      return (
         <AppTemplate>
            {/* <!--TOP CARD FOR FUTURE PAGES--> */}
            <div className="my-5">
               <div className="card bg-primary">
                  <div className="card-body" style={{ color: "white" }}>
                     {memoryCard && memoryCard.imagery}
                  </div>
               </div>

               <div className="card bg-secondary">
                  <div className="card-body">
                     {memoryCard && memoryCard.answer}
                  </div>
               </div>
            </div>

            {/* <!-- make Button link to next page--> */}
            <Link
               to="/edit"
               type="button"
               className="btn btn-link"
               style={{ float: "left" }}
               onClick={() => {
                  this.storeEditableCard();
               }}
            >
               Edit
            </Link>
            <div className="float-right">
               <button
                  type="button"
                  onClick={() => {
                     this.goToNextCard();
                  }}
                  className="btn btn-outline-primary mr-5"
               >
                  Needs Work
               </button>
               <button
                  type="button"
                  onClick={() => {
                     this.goToNextCard();
                  }}
                  className="btn btn-secondary "
               >
                  <img
                     src={thumbsUp}
                     width="20px"
                     style={{ marginBottom: "5px" }}
                     className="mr-2"
                     alt="thumbsUp"
                  />
                  Got it
               </button>
            </div>
         </AppTemplate>
      );
   }
}

function mapStateToProps(state) {
   return {
      queue: state.queue,
   };
}
export default connect(mapStateToProps)(ReviewAnswer);
