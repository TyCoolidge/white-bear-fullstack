import React from "react";
import AppTemplate from "../ui/AppTemplate";
import { connect } from "react-redux";
import { actions } from "../../store/actions";

class ReviewEmpty extends React.Component {
   goToPrevCard() {
      this.props.dispatch({ type: actions.DECREMENT_QUEUE_INDEX });
      this.props.history.push("/review-answer");
   }
   getMoreCards() {
      this.props.dispatch({ type: actions.RESET_QUEUE });
      this.props.history.push("/review-imagery");
   }
   render() {
      return (
         <div>
            <AppTemplate>
               <h4 className="my-4 text-center text-muted">Out of cards</h4>

               {/* <!--TOP CARD FOR FUTURE PAGES--> */}

               {/* <!-- <div className="card bg-primary col-md-12">
           <div className="card-body" style="color: white;">
              Far far away, behind the word mountains, far from the
              countries Vokalia and Consonantia, there live the blind
              texts. Separated they live in Bookmarksgrove right at the
              coast of the Semantics, a large
           </div>
        </div> -->

        <!-- make Button link to next page--> */}
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
               <button
                  type="button"
                  className="btn btn-outline-primary"
                  style={{ float: "right" }}
                  onClick={() => {
                     this.getMoreCards();
                  }}
               >
                  Get more cards
               </button>
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
export default connect(mapStateToProps)(ReviewEmpty);
