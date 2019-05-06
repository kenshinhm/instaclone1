import formStyles from "shared/formStyles.scss";
// import Ionicon from "react-ionicons";
import React from "react";
import PropTypes from "prop-types";
import FacebookLogin from "react-facebook-login";

export const SignupForm = props => (
    <div className={formStyles.formComponent}>
        <h3 className={formStyles.signupHeader}>
            Sign up to see photos and videos from your friends.
        </h3>
        <FacebookLogin
            appId="1009671839203165"
            autoLoad={false}
            fields="name,email,picture"
            callback={props.facebookLogin}
            cssClass={formStyles.button}
            icon='fa-facebook-official'
        />
        {/*<button className={formStyles.button}>*/}
        {/*    <Ionicon icon="logo-facebook" fontSize="20px" color="white"/> Log in with Facebook*/}
        {/*</button>*/}
        <span className={formStyles.divider}>or</span>
        <form className={formStyles.form} onSubmit={props.onSubmit}>
            <input type="email" placeholder="Email" className={formStyles.textInput}
                   value={props.email} onChange={props.onChange} name='email'/>
            <input type="text" placeholder="Full Name" className={formStyles.textInput}
                   value={props.fullname} onChange={props.onChange} name='fullname'/>
            <input type="username" placeholder="Username" className={formStyles.textInput}
                   value={props.username} onChange={props.onChange} name='username'/>
            <input type="password" placeholder="Password" className={formStyles.textInput}
                   value={props.password} onChange={props.onChange} name='password'/>
            <input type="submit" value="Sign up" className={formStyles.button}/>
        </form>
        <p className={formStyles.terms}>
            By signing up, you agree to our <span>Terms & Privacy Policy</span>.
        </p>
    </div>
);

SignupForm.propTypes = {
    email: PropTypes.string.isRequired,
    fullname: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    facebookLogin: PropTypes.func.isRequired,
};

export default SignupForm;