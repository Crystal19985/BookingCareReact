import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import './ManageSchedule.scss';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';




class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDoctor: {},
            DoctorsSelectorReact: [],
            currentDate: new Date(),
            rangeTime: [],
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctorsByRedux();
        this.props.fetchAllScheduleTimesByRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctorsRedux !== this.props.allDoctorsRedux) {
            let doctorList = this.buildDataInputSelect(this.props.allDoctorsRedux)
            this.setState({
                DoctorsSelectorReact: doctorList,
            })
        }

        // if (prevProps.language !== this.props.language) {
        //     let doctorList = this.buildDataInputSelect(this.props.allDoctorsRedux)
        //     this.setState({
        //         DoctorsSelectorReact: doctorList,
        //     })
        // }

        if (prevProps.allDrScheduleTimesRedux !== this.props.allDrScheduleTimesRedux) {
            this.setState({
                rangeTime: this.props.allDrScheduleTimesRedux,
            })
        }
    }

    buildDataInputSelect = (inputDataArr) => {
        let result = [];

        if (inputDataArr && inputDataArr.length > 0) {
            inputDataArr.map((item, index) => {
                let obj = {};
                let labelEn = `${item.firstName} ${item.lastName}`;
                let labelVi = `${item.lastName} ${item.firstName}`;

                obj.label = this.props.language === LANGUAGES.VI ? labelVi : labelEn;
                obj.value = item.id;
                result.push(obj);
            })
        }

        return result;
    }

    handleOnChangeDoctorSelector = (selectedDoctor) => {
        this.setState({ selectedDoctor });
    };

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }

    render() {
        const { isLoggedIn, language } = this.props;
        const { selectedDoctor, DoctorsSelectorReact, rangeTime } = this.state
        console.log('rangeTime : ', rangeTime)
        return (
            <div className='manage-schedule-container'>
                <div className='m-s-title'>
                    <FormattedMessage id="manage-schedule.title" />
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <labe><FormattedMessage id="manage-schedule.chose-doctor" /></labe>
                            <Select
                                value={selectedDoctor}
                                onChange={this.handleOnChangeDoctorSelector}
                                options={DoctorsSelectorReact}
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <labe><FormattedMessage id="manage-schedule.chose-date" /></labe>
                            <DatePicker
                                className='form-control'
                                onChange={this.handleOnChangeDatePicker}
                                value={this.state.currentDate}
                                minDate={new Date()}
                            />
                        </div>
                        <div className='col-12 pick-hour-container'>

                            {rangeTime && rangeTime.length > 0 &&
                                rangeTime.map((item, index) => {
                                    return (
                                        <button
                                            className='btn btn-success px-2'
                                            key={index}>
                                            {language === LANGUAGES.VI
                                                ? item.valueVi : item.valueEn
                                            }
                                        </button>
                                    )
                                })

                            }
                        </div>
                        <div className='col-12'>
                            <button className='btn btn-primary px-2'><FormattedMessage id="manage-schedule.save-info" /></button>
                        </div>

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
        allDoctorsRedux: state.admin.allDoctors,
        allDrScheduleTimesRedux: state.admin.allDoctorScheduleTimes,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorsByRedux: () => dispatch(actions.fetchAllDoctorsStart()),
        fetchAllScheduleTimesByRedux: () => dispatch(actions.fetchAllScheduleTimes()),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
