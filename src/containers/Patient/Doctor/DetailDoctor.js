import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailDoctor.scss'
import { getDetailInforDoctor } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import DoctorSchedule from './DoctorSchedule';






class DetailDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            deltailDoctor: {}
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let respon = await getDetailInforDoctor(this.props.match.params.id);

            if (respon && respon.errCode === 0) {
                this.setState({
                    deltailDoctor: respon.data,
                })
            }
            // imageBase64 = new Buffer(item.image, 'base64').toString('binary');
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // if (prevProps.listUsers !== this.props.listUsers) {
        //     this.setState({
        //         usersRedux: this.props.listUsers,
        //     })
        // }
    }

    render() {
        let { deltailDoctor } = this.state;
        let { language } = this.props;

        let nameVi = '', nameEn = '';
        if (deltailDoctor && deltailDoctor.positionData) {
            nameVi = `${deltailDoctor.positionData.valueVi}, ${deltailDoctor.lastName} ${deltailDoctor.firstName} `;
            nameEn = `${deltailDoctor.positionData.valueEn}, ${deltailDoctor.firstName} ${deltailDoctor.lastName} `;
        }
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className='doctor-detail-container'>
                    <div className='intro-doctor'>
                        <div className='content-left'
                            style={{ backgroundImage: `url(${deltailDoctor.image})` }}>

                        </div>

                        <div className='content-right'>
                            <div className='up'>
                                {language === LANGUAGES.VI ? nameVi : nameEn}
                            </div>
                            <div className='down'>
                                {deltailDoctor && deltailDoctor.Markdown
                                    && deltailDoctor.Markdown.description &&
                                    <span>
                                        {deltailDoctor.Markdown.description}
                                    </span>
                                }
                            </div>
                        </div>
                    </div>

                    <div className='schedule-doctor'>
                        <div className='content-left'>

                            <DoctorSchedule
                                doctorIdFromParent={deltailDoctor && deltailDoctor.id ? deltailDoctor.id : -1}
                            />
                        </div>
                        <div className='content-right'>

                        </div>
                    </div>

                    <div className='detail-infor-doctor'>
                        {deltailDoctor && deltailDoctor.Markdown
                            && deltailDoctor.Markdown.contentHTML &&
                            <div dangerouslySetInnerHTML={{ __html: deltailDoctor.Markdown.contentHTML }} >
                            </div>
                        }
                    </div>

                    <div className='comment-doctor'></div>
                </div>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
