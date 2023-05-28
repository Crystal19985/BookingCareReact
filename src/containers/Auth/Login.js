import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            passWord: '',
            isShowPW: false,
            errMessage: '',
        }
    }

    handleOnChangeUserName = (event) => {
        this.setState({ userName: event.target.value });
    }

    handleOnChangePW = (event) => {
        this.setState({ passWord: event.target.value });
    }

    handleClickLogin = async () => {
        this.setState({
            errMessage: '',
        })
        try {
            let data = await handleLoginApi(this.state.userName, this.state.passWord)
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message,
                })
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user);
                console.log(data.user);
            }
        } catch (error) {

            if (error.response)
                if (error.response.data)
                    this.setState({
                        errMessage: error.response.data.message,
                    })
        }
    }

    handleClickEye = () => {
        this.setState({ isShowPW: !this.state.isShowPW })
    }

    render() {
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login'>Login</div>
                        <div className='col-12 form-group'>
                            <label>User Name :</label>
                            <input
                                type='text'
                                className='form-control login-input'
                                placeholder='Enter your Name'
                                value={this.state.userName}
                                onChange={(event) => this.handleOnChangeUserName(event)}
                            />
                        </div>
                        <div className='col-12 form-group'>
                            <label>Password :</label>
                            <input
                                type={this.state.isShowPW === true ? 'text' : 'password'}
                                className='form-control login-input'
                                placeholder='Enter your password'
                                value={this.state.passWord}
                                onChange={(event) => this.handleOnChangePW(event)}
                            />
                            <span>
                                <i className={
                                    this.state.isShowPW ? "fas fa-eye-slash" : "fas fa-eye"}
                                    onClick={() => this.handleClickEye()}
                                >
                                </i>
                            </span>
                        </div>
                        <div className='col-12' style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12 ' >
                            <button className='login-btn'
                                onClick={() => this.handleClickLogin()}
                            >
                                Login
                            </button>
                        </div>
                        <div className='col-12'>
                            <span className='text-forgot'>Forgot your password</span>
                        </div>
                        <div className='col-12 text-center mt-3'>
                            <span className='text-or-login'>Or Login with</span>
                        </div>
                        <div className='col-12 login-social'>
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
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
        // adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        // adminLoginFail: () => dispatch(actions.adminLoginFail()),
        // userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfor) => dispatch(actions.userLoginSuccess(userInfor))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
