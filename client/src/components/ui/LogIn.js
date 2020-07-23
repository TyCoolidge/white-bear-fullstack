import React from "react";
import classnames from "classnames";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import { actions } from "../../store/actions";
import { connect } from "react-redux";

class LogIn extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         emailError: "",
         passwordError: "",
         hasEmailError: false,
         hasPasswordError: false,
      };
   }

   async validateAndLogInUser() {
      //need async in ordxer for await to work
      const logInEmailInput = document.getElementById("welcome-back-email")
         .value;
      const logInPasswordInput = document.getElementById(
         "welcome-back-password"
      ).value;
      const user = {
         email: logInEmailInput,
         password: logInPasswordInput,
      };
      axios //api call
         .post("/api/v1/users/auth", user)
         .then((res) => {
            // handle success
            console.log(res.data);
            // Update currentUser in global state with API response
            this.props.dispatch({
               type: actions.UPDATE_CURRENT_USER,
               payload: res.data,
            });
            this.props.history.push("/create-answer");
         })
         .catch((err) => {
            const { data } = err.response;
            console.log(data);
            const { emailError, passwordError } = data;
            if (emailError !== "") {
               this.setState({ hasEmailError: true, emailError: emailError });
            } else {
               this.setState({ hasEmailError: false, emailError: emailError });
            }
            if (passwordError !== "") {
               this.setState({
                  hasPasswordError: true,
                  passwordError: passwordError,
               });
            } else {
               this.setState({
                  hasPasswordError: false,
                  passwordError: passwordError,
               });
            }
         });
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
                           "is-invalid": this.state.hasEmailError,
                        })}
                        type="text"
                        id="welcome-back-email"
                     />
                     {this.state.hasEmailError && (
                        <p
                           id="warningWelcomeEmail"
                           className="mb-4 text-danger"
                           style={{
                              fontSize: "14px",
                           }}
                        >
                           {this.state.emailError}
                        </p>
                     )}
                     <h4 className="text-muted mt-2">Password</h4>
                     <input
                        className={classnames({
                           "form-control": true,
                           "thick-border": true,
                           "is-invalid": this.state.hasPasswordError,
                        })}
                        type="password"
                        id="welcome-back-password"
                     />
                     {this.state.hasPasswordError && (
                        <p
                           id="warningWelcomePassword"
                           className="mb-4 text-danger"
                           style={{
                              fontSize: "14px",
                           }}
                        >
                           {this.state.passwordError}
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
