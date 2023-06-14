import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import './ManageSchedule.scss';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from '../../../store/actions';
import { LANGUAGES, DATE_FORMAT } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import { toast } from 'react-toastify';
import _ from 'lodash';
import moment from 'moment';
import { saveBulkDrScheduleService } from '../../../services/userService'





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
            let data = this.props.allDrScheduleTimesRedux;
            if (data && data.length > 0) {
                // data = data.map(item => { return { ...item, isSelected: 'false' } })
                data = data.map(item => ({ ...item, isSelected: false }))
            }

            this.setState({
                rangeTime: data,
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

    handleOnClickBtnTime = (btnTime) => {
        // btnTime.isSelected = true;      // Tai sao khong dung duoc cach nay
        let data = this.state.rangeTime;
        data = data.map(item => {
            if (item.id === btnTime.id) {
                btnTime.isSelected = !btnTime.isSelected;
            }
            return item;
        })

        this.setState({
            rangeTime: data,
        })
    }

    handleClickBtnSave = async () => {
        let result = [];
        let { rangeTime, selectedDoctor, currentDate } = this.state

        // selectedDoctor state dang la obj rong {}
        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error("select doctor is invaild");
            return;
        }

        if (!currentDate) {
            toast.error("currentDate is invaild");
            return;
        }

        // let formatedDate = moment(currentDate).format(DATE_FORMAT.SEND_TO_SERVER);
        let formatedDate = new Date(currentDate).getTime();

        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true);
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map(item => {
                    let obj = {};
                    obj.docterId = selectedDoctor.value;
                    obj.date = formatedDate;
                    obj.timeType = item.keyMap;

                    result.push(obj);
                })
            }
            else {
                toast.error('selectedTime is invalid');
                return;
            }

        }

        let respon = await saveBulkDrScheduleService({
            arrScheduleTime: result,
            docterId: selectedDoctor.value,
            date: formatedDate,
        });

        console.log('>>> respon', respon);
        console.log('>>> result', result);
    }

    render() {
        const { isLoggedIn, language } = this.props;
        const { selectedDoctor, DoctorsSelectorReact, rangeTime } = this.state
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
                                            className={item.isSelected === true ? 'btn btn-success px-2 active' : 'btn btn-success px-2'}
                                            key={index}
                                            onClick={() => this.handleOnClickBtnTime(item)}
                                        >
                                            {language === LANGUAGES.VI
                                                ? item.valueVi : item.valueEn
                                            }
                                        </button>
                                    )
                                })

                            }
                        </div>
                        <div className='col-12'>
                            <button className='btn btn-primary px-2'
                                onClick={() => this.handleClickBtnSave()}
                            >
                                <FormattedMessage id="manage-schedule.save-info" />
                            </button>
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
