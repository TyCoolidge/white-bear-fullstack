import React from "react";
import classnames from "classnames";
import { withRouter, Link } from "react-router-dom";
import hash from "object-hash";
import { v4 as getUuid } from "uuid";
import { EMAIL_REGEX } from "../../utils/helpers";
import axios from "axios";
import { actions } from "../../store/actions";
import { connect } from "react-redux";

class LogIn extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         logInEmailError: "",
         logInPasswordError: "",
         hasLogInEmailError: false,
         hasLogInPasswordError: false,
         emailText: "",
         passwordText: "",
      };
   }

   async setLogInEmailState(logInEmailInput) {
      if (logInEmailInput === "")
         this.setState({
            logInEmailError: "Please enter your email address",
            hasLogInEmailError: true, //will display if input is empty
         });
      else if (EMAIL_REGEX.test(logInEmailInput.toLowerCase()) === false) {
         this.setState({
            logInEmailError: "Please enter a valid email address",
            hasLogInEmailError: true, //will display if email doesnt fit regex
         });
      } else {
         this.setState({ logInEmailError: "", hasLogInEmailError: false });
      }
   }
   async setLogInPasswordState(logInPasswordInput) {
      //   console.log(passwordInput);
      //   const uniqChars = [...new Set(passwordInput)];
      //array of unique characters
      if (logInPasswordInput === "") {
         this.setState({
            logInPasswordError: "Please enter your password",
            hasLogInPasswordError: true, //will display if input is empty
         });
      } else {
         this.setState({
            logInPasswordError: "",
            hasLogInPasswordError: false,
         });
      }
   }

   async validateAndLogInUser() {
      //need async in ordxer for await to work
      const logInEmailInput = document.getElementById("welcome-back-email")
         .value;
      const logInPasswordInput = document.getElementById(
         "welcome-back-password"
      ).value;
      await this.setLogInEmailState(logInEmailInput); //waits until the promise of setEmailState has settled and returns result
      await this.setLogInPasswordState(logInPasswordInput); //waits until the promise of setPasswordState has settled and returns result
      if (
         this.state.hasLogInEmailError === false &&
         this.state.hasLogInPasswordError === false
      ) {
         const logInUser = {
            id: getUuid(),
            email: logInEmailInput,
            password: hash(logInPasswordInput),
            createdAt: Date.now(),
         };
         console.log("Created user object:", logInUser);
         // Mimic API response
         axios //api call
            .get("https://run.mocky.io/v3/72bc0359-8717-447b-a4ab-16ec882ec2f6")
            .then((res) => {
               // handle success
               const currentUser = res.data;
               console.log(currentUser);
               this.props.dispatch({
                  type: actions.UPDATE_CURRENT_USER,
                  payload: res.data,
               });
            })
            .catch((error) => {
               // handle error
               console.log(error);
            });

         this.props.history.push("/create-answer");
      }
   }

   render() {
      return (
         <div className="col-xl-4 offset-xl-1 col-lg-5 col-md-5 col-sm-6">
            <div className="card">
               <div className="card-body">
                  <h2 className="card-title">Welcome back</h2>
                  <p style={{ fontSize: "13px" }} className="mb-5">
                     Log in with your email address and password.
                  </p>
                  <form className="needs-validation">
                     <h4 className="text-muted">Email address</h4>
                     <input
                        className={classnames({
                           "form-control": true,
                           "thick-border": true,
                           "is-invalid": this.state.hasLogInEmailError,
                        })}
                        type="text"
                        id="welcome-back-email"
                     />
                     {this.state.hasLogInEmailError && (
                        <p
                           id="warningWelcomeEmail"
                           className="mb-4 text-danger"
                           style={{
                              fontSize: "14px",
                           }}
                        >
                           {this.state.logInEmailError}
                        </p>
                     )}
                     <h4 className="text-muted mt-2">Password</h4>
                     <input
                        className={classnames({
                           "form-control": true,
                           "thick-border": true,
                           "is-invalid": this.state.hasLogInPasswordError,
                        })}
                        type="password"
                        id="welcome-back-password"
                     />
                     {this.state.hasLogInPasswordError && (
                        <p
                           id="warningWelcomePassword"
                           className="mb-4 text-danger"
                           style={{
                              fontSize: "14px",
                           }}
                        >
                           {this.state.logInPasswordError}
                        </p>
                     )}

                     {/* <!-- disable log in if email/ password fields are not accepted --> */}
                     <div className="float-right">
                        <Link
                           to="#"
                           className="btn btn-success mt-5"
                           onClick={() => {
                              this.validateAndLogInUser();
                           }}
                        >
                           Log in
                        </Link>
                        {/* Link used to stay in React, acts like <a> */}
                     </div>
                  </form>
               </div>
            </div>
         </div>
      );
   }
}
function mapStateToProps(state) {
   return {};
}
export default withRouter(connect(mapStateToProps)(LogIn));
