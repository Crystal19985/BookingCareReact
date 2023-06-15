import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DoctorSchedule.scss'
import { LANGUAGES } from '../../../utils';
import moment from 'moment';
import localization from 'moment/locale/vi' // khong su dung, nhung co thu vien nay mac dinh se hieu default la vi
import { getScheduleDrByDateService } from '../../../services/userService';






class DoctorSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvailableTime: [],
        }
    }

    async componentDidMount() {
        this.setStateAllDays(this.props.language)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
            this.setStateAllDays(this.props.language)
        }
    }

    captitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    setStateAllDays = (language) => {
        let arrDate = [];
        for (let i = 0; i < 7; i++) {
            let obj = {};

            if (language === LANGUAGES.VI) {
                let string = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                obj.label = this.captitalizeFirstLetter(string);
            }

            else
                obj.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');

            obj.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();

            arrDate.push(obj);
        }

        this.setState({
            allDays: arrDate
        })
    }


    handleOnChangeScheduleSelect = async (event) => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {

            let doctorId = this.props.doctorIdFromParent;
            let date = event.target.value;
            let res = await getScheduleDrByDateService(doctorId, date);
            if (res && res.errCode === 0) {
                this.setState({
                    allAvailableTime: res.data ? res.data : []
                })
            }
        }
    }

    render() {
        let { allDays, allAvailableTime } = this.state;
        let { language } = this.props;
        return (
            <div className='docter-schedule-container'>
                <div className='all-schedule'>
                    <select onChange={(event) => this.handleOnChangeScheduleSelect(event)}>
                        {allDays && allDays.length > 0 &&
                            allDays.map((item, index) =>
                            (<option value={item.value}
                                key={index}
                            >
                                {item.label}
                            </option>))
                        }
                    </select>

                </div>
                <div className='all-available-time'>
                    <div className='text-calendar'>
                        <span><i className='fas fa-calendar-alt'>Lịch Khám</i></span>
                    </div>
                    <div className='time-content'>
                        {allAvailableTime && allAvailableTime.length > 0
                            ?
                            allAvailableTime.map((item, index) => {
                                let timeDisplay = language === LANGUAGES.VI ?
                                    item.timeTypeData.valueVi : item.timeTypeData.valueEn;
                                return < button key={index}> {timeDisplay}</button>
                            })

                            :
                            <div>Không có lịch hẹn khám</div>
                        }

                    </div>
                </div>
            </div >
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
