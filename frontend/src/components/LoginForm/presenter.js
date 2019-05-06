import formStyles from "shared/formStyles.scss";
import Ionicon from "react-ionicons";
import React from "react";
import PropTypes from "prop-types";

export const LoginForm = props => (
    <div className={formStyles.formComponent}>
        <form className={formStyles.form} onSubmit={props.handleSubmit}>
            <input type="text" placeholder="Username" className={formStyles.textInput}
                   value={props.username} onChange={props.handleInputChange} name='username'/>
            <input type="password" placeholder="Password" className={formStyles.textInput}
                   value={props.password} onChange={props.handleInputChange} name='password'/>
            <input type="submit" value="Log in" className={formStyles.button}/>
        </form>
        <span className={formStyles.divider}>or</span>
        <span className={formStyles.facebookLink}>
            <Ionicon icon="logo-facebook" fontSize="20px" color="#385185"/> Log in with Facebook
        </span>
        <span className={formStyles.forgotLink}>Forgot password?</span>
    </div>
);

LoginForm.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
