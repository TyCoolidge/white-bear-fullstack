import React from "react";
import AppTemplate from "../ui/AppTemplate";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { actions } from "../../store/actions";

class ReviewImagery extends React.Component {
   constructor(props) {
      super(props);
      if (props.queue.cards.length === 0) {
         axios
            .get("https://run.mocky.io/v3/461e65d9-b5c3-4eeb-a299-3f63bcb3accb")
            .then((res) => {
               // handle success
               console.log(res);
               props.dispatch({
                  type: actions.STORE_QUEUED_CARDS,
                  payload: res.data,
               });
            })
            .catch((error) => {
               // handle error
               console.log(error);
            });
      }
   }
   goToPrevCard() {
      this.props.dispatch({ type: actions.DECREMENT_QUEUE_INDEX });

      this.props.history.push("/review-answer");
   }
   render() {
      const memoryCard = this.props.queue.cards[this.props.queue.index];
      return (
         <div>
            <AppTemplate>
               {/* <!--TOP CARD FOR FUTURE PAGES--> */}
               <div className="my-5">
                  <div className="card bg-primary">
                     <div className="card-body" style={{ color: "white" }}>
                        {memoryCard && memoryCard.imagery}
                     </div>
                  </div>
               </div>
               {/* <!-- make Button link to next page--> */}
               {this.props.queue.index > 0 && (
                  <button
                     type="button"
                     className="btn btn-link"
                     style={{ float: "left" }}
                     onClick={() => {
                        this.goToPrevCard();
                     }}
                  >
                     Previous card
                  </button>
               )}
               <div className="float-right">
                  <Link
                     to="review-answer"
                     type="button"
                     className="btn btn-outline-primary"
                  >
                     Show answer
                  </Link>
               </div>
            </AppTemplate>
         </div>
      );
   }
}

function mapStateToProps(state) {
   return {
      queue: state.queue,
   };
}
export default connect(mapStateToProps)(ReviewImagery);
