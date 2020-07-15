import React from "react";
import { Link } from "react-router-dom";
import editIcon from "../../icons/edit.svg";
import { actions } from "../../store/actions";
import { connect } from "react-redux";

class MemoryCard extends React.Component {
   storeEditableCard() {
      console.log("store");
      this.props.dispatch({
         type: actions.STORE_EDITABLE_CARD,
         payload: {
            card: this.props.card,
            prevRoute: "/all-cards",
         },
      });
   }
   render() {
      return (
         <div>
            {/* <!-- first edit button --> */}
            <div className="row">
               <div className="col-10">
                  <div className="card bg-primary ">
                     <div
                        className="card-body"
                        style={{ color: "white", fontSize: "16px" }}
                     >
                        {this.props.card.imagery}
                     </div>
                  </div>

                  <div className="card bg-secondary mb-5">
                     <div className="card-body" style={{ fontSize: "16px" }}>
                        {this.props.card.answer}
                     </div>
                  </div>
               </div>
               <div className="col-2">
                  <Link
                     to="/edit"
                     type="button"
                     className="btn btn-link float-right"
                     onClick={() => {
                        this.storeEditableCard();
                     }}
                  >
                     <img
                        src={editIcon}
                        width="24px"
                        style={{ marginBottom: "0px" }}
                        className="mr-1"
                        alt="edit icon"
                     />
                     Edit
                  </Link>
               </div>
            </div>
         </div>
      );
   }
}

function mapStateToProps(state) {
   return {};
}
export default connect(mapStateToProps)(MemoryCard);
