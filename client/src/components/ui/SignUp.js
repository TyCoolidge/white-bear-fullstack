import React from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { v4 as getUuid } from "uuid";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { actions } from "../../store/actions";
import { connect } from "react-redux";

class SignUp extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         isDisplayingInputs: false,
         emailError: "",
         passwordError: "",
         hasEmailError: false, // error will not display by default
         hasPasswordError: false,
      };
   }

   showInputs() {
      //  function assigned to sign up button, changes current state to equal the opposite state which hides our sign up inputs
      this.setState({
         isDisplayingInputs: true,
      });
   }

   async validateAndCreateUser() {
      //need async in ordxer for await to work
      const emailInput = document.getElementById("email-input").value;
      const passwordInput = document.getElementById("create-password-input")
         .value;
      // Create user obj
      const signUpNewUser = {
         id: getUuid(),
         email: emailInput,
         password: passwordInput,
         createdAt: Date.now(),
      };
      // and post to API
      axios
         .post("/api/v1/users", signUpNewUser)
         .then((res) => {
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
         <div className="col-xl-4 offset-xl-1 mb-5 col-lg-5 offset-lg-1 col-md-5 offset-md-1 col-sm-6">
            <div className="card">
               <div className="card-body">
                  <h2 className="card-title">Nice to meet you</h2>
                  <p style={{ fontSize: "13px" }} className="mb-1">
                     Sign up for White Bear. Free forever.
                  </p>
                  {this.state.isDisplayingInputs && (
                     <>
                        <p
                           style={{ color: " blue", fontSize: "13px" }}
                           className="mb-5"
                           id="signUpText"
                        >
                           Let's get you signed up.
                        </p>

                        {/* <!-- Dragdown menu once click on signup --> */}
                        <h4 className="text-muted">Email address</h4>
                        <input
                           className={classnames({
                              "form-control": true,
                              "thick-border": true,
                              "is-invalid": this.state.hasEmailError,
                           })} ///format for classnames, set the class is invalid to current state of hasEmailError which is set at false
                           type="email"
                           id="email-input"
                        />
                        {this.state.hasEmailError && (
                           <p
                              className="text-danger mt-1"
                              style={{
                                 fontSize: "14px",
                              }}
                           >
                              {this.state.emailError}
                           </p>
                        )}
                        <label className="text-muted mt-3">
                           Create a password
                           <br />
                           <span
                              style={{ fontSize: "14px" }}
                              className="text-muted"
                           >
                              Must be at least 9 characters
                           </span>
                        </label>
                        <input
                           className={classnames({
                              "form-control": true,
                              "thick-border": true,
                              "is-invalid": this.state.hasPasswordError,
                           })}
                           type="password"
                           id="create-password-input"
                        />
                        {this.state.hasPasswordError && (
                           <p
                              id="warningPassword"
                              className="mt-1 mb-3 text-danger"
                              style={{
                                 fontSize: "14px",
                              }}
                           >
                              {this.state.passwordError}
                           </p>
                        )}

                        <Link
                           to="#"
                           className="mt-5 btn btn-success btn-block"
                           onClick={() => {
                              this.validateAndCreateUser();
                           }}
                        >
                           Let's go!
                        </Link>
                     </>
                  )}
                  {/*if this.state is the opposite , then render button  */}
                  {!this.state.isDisplayingInputs && (
                     <Link
                        to="#"
                        className="btn btn-success btn-block mt-2"
                        //  function assigned to onClick, should return sign up menu
                        onClick={() => {
                           this.showInputs();
                        }}
                     >
                        Sign up
                     </Link>
                  )}
               </div>
            </div>
         </div>
      );
   }
}

function mapStateToProps(state) {
   return {};
}
export default withRouter(connect(mapStateToProps)(SignUp));
