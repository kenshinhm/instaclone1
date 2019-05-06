import formStyles from "shared/formStyles.scss";
import React from "react";
import PropTypes from "prop-types";
import FacebookLogin from 'react-facebook-login';

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
        <span>
            <FacebookLogin
                appId="1009671839203165"
                autoLoad={false}
                fields="name,email,picture"
                callback={props.handleFacebookLogin}
                cssClass={formStyles.facebookLink}
                icon='fa-facebook-official'
            />
        </span>
        <span className={formStyles.forgotLink}>Forgot password?</span>
    </div>
);

LoginForm.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleFacebookLogin: PropTypes.func.isRequired,
};

export default LoginForm;
