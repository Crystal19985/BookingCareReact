import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import { LANGUAGES, USER_ROLE } from '../../utils';
import './Header.scss';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';




class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuApp: [],
        }
    }

    componentDidMount() {
        // console.log('userInfo props Header :', this.props.userInfo)
        let { userInfo } = this.props;
        let menu = [];

        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.roleId;
            if (role === USER_ROLE.ADMIN)
                menu = adminMenu
            if (role === USER_ROLE.DOCTOR)
                menu = doctorMenu
        }

        this.setState({
            menuApp: menu
        })
    }

    handleClickChangeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    }

    render() {
        const { processLogout, language, userInfo } = this.props;

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-left">
                    {/* <Navigator menus={adminMenu} /> */}
                    <Navigator menus={this.state.menuApp} />
                </div>

                {/* nút logout */}
                <div className='header-right'>
                    <span className='wellcome'><FormattedMessage id="homeheader.wellcome" />- {userInfo.firstName}</span>
                    <div
                        className={language === LANGUAGES.VI ? 'item language-vi active' : 'item language-vi'}
                        onClick={() => { this.handleClickChangeLanguage(LANGUAGES.VI) }}
                    >
                        VN
                    </div>
                    <div
                        className={language === LANGUAGES.EN ? 'item language-en active' : 'item language-en'}
                        onClick={() => { this.handleClickChangeLanguage(LANGUAGES.EN) }}
                    >
                        EN
                    </div>
                    <div className="item btn-logout"
                        onClick={processLogout}>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (lang) => dispatch(actions.changeLanguageApp(lang))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
