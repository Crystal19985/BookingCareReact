import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../../services/userService';
import { LANGUAGES } from '../../../utils/constant';
import * as actions from '../../../store/actions'

class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        // try {
        //     let res = await getAllCodeService('role');
        //     console.log('check gender res : ', res);
        //     if (res && res.errCode === 0) {
        //         this.setState({
        //             genderArr: res.data,
        //         });
        //     }
        // } catch (error) {

        // }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // render => didupdate
        // hiện tại(this)  và quá khứ (previous) : So sánh với nhau
        // []   [3]
        // [3]  [3]
        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                genderArr: this.props.genderRedux
            })
        }
    }

    render() {
        const { language } = this.props;
        const { genderArr } = this.state;

        return (
            <div className="user-redux-container" >
                <div className='title'>
                    LEARN CRUD REDUX
                </div>
                <div className='user-redux-body'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-3'>< FormattedMessage id="manager-user.add" /></div>
                            <div className='col-3'>
                                <label>< FormattedMessage id="manager-user.email" /></label>
                                <input className='form-control' type='email'></input>
                            </div>
                            <div className='col-3'>
                                <label>< FormattedMessage id="manager-user.password" /></label>
                                <input className='form-control' type='password'></input>
                            </div>
                            <div className='col-3'>
                                <label>< FormattedMessage id="manager-user.first-name" /></label>
                                <input className='form-control' type='text'></input>
                            </div>
                            <div className='col-3'>
                                <label>< FormattedMessage id="manager-user.last-name" /></label>
                                <input className='form-control' type='text'></input>
                            </div>
                            <div className='col-3'>
                                <label>< FormattedMessage id="manager-user.phone-number" /></label>
                                <input className='form-control' type='text'></input>
                            </div>
                            <div className='col-9'>
                                <label>< FormattedMessage id="manager-user.address" /></label>
                                <input className='form-control' type='text'></input>
                            </div>
                            <div className='col-3'>
                                <label>< FormattedMessage id="manager-user.gender" /></label>
                                <select className="form-control">
                                    {genderArr && genderArr.length > 0 &&
                                        genderArr.map((item, index) => {
                                            return (
                                                <option key={index} selected>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label>< FormattedMessage id="manager-user.position" /></label>
                                <select className="form-control">
                                    <option selected>Choose...</option>
                                    <option>...</option>
                                </select>
                            </div>
                            <div className='col-3'>
                                <label>< FormattedMessage id="manager-user.role" /></label>
                                <select className="form-control">
                                    <option selected>Choose...</option>
                                    <option>...</option>
                                </select>
                            </div>
                            <div className='col-3'>
                                <label>< FormattedMessage id="manager-user.image" /></label>
                                <input className='form-control' type='text'></input>
                            </div>
                            <div className='col-12'>
                                <button className='btn btn-primary mt-3'>< FormattedMessage id="manager-user.save" /></button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (lang) => dispatch(actions.changeLanguageApp(lang))
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
