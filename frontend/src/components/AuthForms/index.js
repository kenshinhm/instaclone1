import React from 'react';
import styles from './styles.scss';
import Ionicon from 'react-ionicons';

export const LoginForm = props => (
    <div>
        <form>
            <input type='text' placeholder='Username'/>
            <input type='password' placeholder='Password'/>
            <input type='submit' placeholder='Log in'/>
        </form>
        <span>or</span>
        <span>
            <Ionicon icon='logo-facebook' fontSize='20px' color='#385185'/>
            Log in with Facebook</span>
        <span>Forgot password?</span>
    </div>
);

export const SignUpForm = props => (
    <div>
        <h3>Sign up to see photos and videos from your friends</h3>
        <button>
            <Ionicon icon='logo-facebook' fontSize='20px' color='white'/>
            Login with Facebook
        </button>
        <span>or</span>
        <form>
            <input type='email' placeholder='Email'/>
            <input type='text' placeholder='Full Name'/>
            <input type='username' placeholder='Username'/>
            <input type='password' placeholder='Password'/>
            <input type='submit' value='Sign up'/>
        </form>
        <p>
            By signing up, you agree to our <span>Terms & Privacy Policy</span>
        </p>
    </div>
);