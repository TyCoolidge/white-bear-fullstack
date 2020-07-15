import React from "react";
import AppTemplate from "../ui/AppTemplate";
import MemoryCard from "../ui/MemoryCard";
import orderBy from "lodash/orderBy";
import axios from "axios";

export default class AllCards extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         allCards: [],
         displayedCards: [],
         orderBy: '["createdAt", "desc"]', //default value
      };
   }

   componentDidMount() {
      //lifecycle method, do not have to call
      axios //api call
         .get("https://run.mocky.io/v3/461e65d9-b5c3-4eeb-a299-3f63bcb3accb")
         .then((res) => {
            // handle success
            console.log(res.data);
            const memoryCards = res.data;
            this.setState({
               allCards: orderBy(memoryCards, ["createdAt"], ["desc"]),
               displayedCards: orderBy(memoryCards, ["createdAt"], ["desc"]),
            });
         })
         .catch((error) => {
            // handle error
            console.log(error);
         });
   }

   filteringCardsWithSearch() {
      const searchInput = document
         .getElementById("search-input")
         .value.toLowerCase();
      const allCards = [...this.state.allCards];
      const fillteredCards = allCards.filter((card) => {
         const cardBody = card.imagery + card.answer; //filter will search for words in both top and bottom of card
         return cardBody.toLowerCase().indexOf(searchInput) >= 0;
      });
      const orderArr = JSON.parse(this.state.orderBy);
      const orderedCards = orderBy(fillteredCards, ...orderArr);
      this.setState({ displayedCards: orderedCards });
   }
   setCardOrder(e) {
      //"e" is synthetic event
      this.setState({ orderBy: e.target.value }, () => {
         // changes state of object by giving it current value of selected target in dropdown menu
         return this.filteringCardsWithSearch(); // return the filteredCards that follow the order parameters
      });
      console.log(e.target.value);
   }

   render() {
      return (
         <AppTemplate>
            {/* <!-- top of all cards page --> */}
            <div className="input-group-prepend mt-4 mb-4">
               <input
                  type="text"
                  className="form-control col-8 thick-border"
                  placeholder="Search for a word"
                  id="search-input"
                  // onChange={() => {
                  //    this.filteringCardsWithSearch();
                  // }}
               />
               <button
                  type="submit"
                  className="btn btn-primary btn-sm col-3 offset-1"
                  onClick={() => {
                     this.filteringCardsWithSearch();
                  }}
               >
                  Search
               </button>
               <div className="clearfix"></div>
            </div>
            {/* <!-- come back to fix dropdown --> */}

            <div className="row mb-6">
               <div className="col-4">
                  <p className="text-muted mt-2">Sort cards by</p>
               </div>
               <div className="col-8">
                  <select
                     value={this.state.orderBy}
                     className="thick-border form-control"
                     onChange={(e) => this.setCardOrder(e)}
                  >
                     <option value='["createdAt", "desc"]'>Most recent</option>
                     <option value='[["totalSuccessfulAttempts", "createdAt"], ["desc", "desc"]]'>
                        Easiest
                     </option>
                     <option value='[["totalSuccessfulAttempts", "createdAt"], ["asc", "asc"]]'>
                        Hardest
                     </option>
                     <option value='["createdAt", "asc"]'>Oldest</option>
                  </select>
               </div>
            </div>
            <div className="clearfix"></div>

            {this.state.displayedCards.map((memoryCard) => {
               return <MemoryCard card={memoryCard} key={memoryCard.id} />;
            })}
            {/* key = allows react to iterate over data quickly */}
         </AppTemplate>
      );
   }
}
