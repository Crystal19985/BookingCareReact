import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import { getAllUsers } from '../../services/userService'

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
        }
    }

    async componentDidMount() {
        let res = await getAllUsers('ALL');
        if (res && res.errCode === 0)
            this.setState({
                arrUsers: res.users,
            })
    }
    /** Life cycle
     *  Run component :
     * 1. Run Contructor --> init state
     * 2. Did mount (trong giai doan nay thuong se setState)
     *      Front End : thuong khong co du lieu.
     *      Ham Did mount co nhiem vu goi Api server ==> lay data setState
     *      Tu State sau do se Render data
     * 3. Render
     */

    render() {
        let { arrUsers } = this.state;
        return (
            <div className='users-container'>
                <div className="title text-center">Manage users</div>
                <div className='users-table mt-3 mx-3'>
                    <table id="customers">
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>

                        {
                            arrUsers.map((item, index) => {
                                return (
                                    <>
                                        <tr>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button className="btn-edit"><i className="fas fa-pencil-alt"></i></button>
                                                <button className="btn-delete"><i className="fas fa-trash"></i></button>
                                            </td>
                                        </tr>
                                    </>
                                )
                            })
                        }
                    </table>
                </div>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
