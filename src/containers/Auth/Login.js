import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

//import * as actions from "../store/actions";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';


class Login extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login'>Login</div>
                        <div className='col-12 form-group'>
                            <label>User Name :</label>
                            <input type='text' className='form-control login-input' placeholder='Enter your Name' />
                        </div>
                        <div className='col-12 form-group'>
                            <label>Password :</label>
                            <input type='password' className='form-control login-input' placeholder='Enter your password' />
                        </div>
                        <div className='col-12 ' >
                            <button className='login-btn'>Login</button>
                        </div>
                        <div className='col-12'>
                            <span className='text-forgot'>Forgot your password</span>
                        </div>
                        <div className='col-12 text-center mt-3'>
                            <span className='text-or-login'>Or Login with</span>
                        </div>
                        <div className='col-12 login-social'>
                            <i className="fab fa-google-plus-g google"></i>
                            <i class="fab fa-facebook-f facebook"></i>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
