import React, { Component } from 'react';

import { connect } from 'react-redux';
import './HomeHeader.scss'

class HomeHeader extends Component {

    render() {

        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className="fas fa-bars"></i>
                            <div className='header-logo'>
                            </div>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b>Chuyên khoa</b></div>
                                <div className='sub-title'>Tìm bác sỹ theo chuyên khoa</div>
                            </div>
                            <div className='child-content'>
                                <div><b>Cơ sơ y tế</b></div>
                                <div className='sub-title'>Chọn bệnh viện phòng khám</div>
                            </div>
                            <div className='child-content'>
                                <div><b>Bác sĩ</b></div>
                                <div className='sub-title'>Chọn bác sỹ giỏi</div>
                            </div>
                            <div className='child-content'>
                                <div><b>Gói khám</b></div>
                                <div className='sub-title'>Khám sức khỏe tổng quát</div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='supprot'>
                                <i className="fas fa-question-circle"> Hỗ trợ </i>
                            </div>
                            <div className='flag'>
                                VN
                            </div>
                        </div>
                    </div>
                </div>
                <div className='home-header-banner'>
                    <div className='content-up'>
                        <div className='title1'>NỀN TẢNG Y TẾ</div>
                        <div className='title2'>CHĂM SÓC SỨC KHỎE TOÀN DIỆN</div>
                        <div className='search'>
                            <i className="fas fa-search"></i>
                            <input type='text' placeholder='Tìm kiểm chuyên khoa' />
                        </div>
                    </div>
                    <div className='content-down'>
                        <div className='options'>
                            <div className='option-child'>
                                <div className='child-icon'><i class="fas fa-hospital"></i></div>
                                <div className='child-text'>Khám chuyên khoa</div>
                            </div>
                            <div className='option-child'>
                                <div className='child-icon'><i class="fas fa-hospital"></i></div>
                                <div className='child-text'>Khám từ xa</div>
                            </div>
                            <div className='option-child'>
                                <div className='child-icon'><i class="fas fa-hospital"></i></div>
                                <div className='child-text'>Khám tổng quát</div>
                            </div>
                            <div className='option-child'>
                                <div className='child-icon'><i class="fas fa-hospital"></i></div>
                                <div className='child-text'>Xét nghiệm y học</div>
                            </div>
                            <div className='option-child'>
                                <div className='child-icon'><i class="fas fa-hospital"></i></div>
                                <div className='child-text'>Sức khỏe tinh thần</div>
                            </div>
                            <div className='option-child'>
                                <div className='child-icon'><i class="fas fa-hospital"></i></div>
                                <div className='child-text'>Khám nha khoa</div>
                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
