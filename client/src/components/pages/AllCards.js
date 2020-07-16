import React from "react";
import AppTemplate from "../ui/AppTemplate";
import MemoryCard from "../ui/MemoryCard";
import axios from "axios";
const userId = "50f3f48e-8412-4a27-bf89-83b9ef06ab0c";

export default class AllCards extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         memoryCards: [],
         order: "%60memory_cards%60.%60created_at%60%20DESC",
         searchTerm: "",
      };
   }

   componentDidMount() {
      this.setMemoryCards();
   }

   setMemoryCards() {
      //lifecycle method, do not have to call
      axios //api call
         .get(
            `/api/v1/memory-cards?userId=${userId}&searchTerm=${this.state.searchTerm}&order=${this.state.order}`
         )
         .then((res) => {
            // handle success
            console.log(res.data);
            this.setState({
               memoryCards: res.data,
            });
         })
         .catch((error) => {
            // handle error
            console.log(error);
         });
   }

   setSearchTerm() {
      const searchInput = document.getElementById("search-input").value;
      this.setState({ searchTerm: searchInput }, () => {
         this.setMemoryCards();
      });
   }

   setCardOrder(e) {
      //"e" is synthetic event
      const newOrder = e.target.value;
      console.log(newOrder);
      this.setState({ order: newOrder }, () => {
         this.setMemoryCards(); // return the memoryCards that follow the order parameters
      });
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
               />
               <button
                  type="submit"
                  className="btn btn-primary btn-sm col-3 offset-1"
                  onClick={() => {
                     this.setSearchTerm();
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
                     <option value="%60memory_cards%60.%60created_at%60%20DESC">
                        Most recent
                     </option>
                     <option value="memory_cards.total_successful_attempts%20DESC,%20memory_cards.created_at%20DESC">
                        Easiest
                     </option>
                     <option value="memory_cards.total_successful_attempts%20ASC,%20memory_cards.created_at%20ASC">
                        Hardest
                     </option>
                     <option value="%60memory_cards%60.%60created_at%60%20ASC">
                        Oldest
                     </option>
                  </select>
               </div>
            </div>
            <div className="clearfix"></div>

            {this.state.memoryCards.map((memoryCard) => {
               return <MemoryCard card={memoryCard} key={memoryCard.id} />;
            })}
            {/* key = allows react to iterate over data quickly */}
         </AppTemplate>
      );
   }
}
