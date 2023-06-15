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
            allDays: []
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

    setStateAllDays = (language) => {
        let arrDate = [];
        for (let i = 0; i < 7; i++) {
            let obj = {};

            if (language === LANGUAGES.VI)
                obj.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
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
        console.log('>>> check this.props.doctorIdFromParent', this.props.doctorIdFromParent);
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {

            let doctorId = this.props.doctorIdFromParent;
            let date = event.target.value;
            console.log('>>> check date', date, '>>> check doctorId', doctorId);
            let res = await getScheduleDrByDateService(doctorId, date);
            console.log('>>> check res', res)
        }
    }

    render() {
        let { allDays } = this.state;
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

                </div>
                <div>

                </div>
            </div>
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
