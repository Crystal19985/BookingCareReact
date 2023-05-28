import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import { getAllUsersService, createNewUserService, deleteUserService } from '../../services/userService';
import ModalUser from './ModalUser';
import { emitter } from '../../utils/emitter';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
        }
    }

    async componentDidMount() {
        await this.getAllUsers();
    }

    getAllUsers = async () => {
        let res = await getAllUsersService('ALL');
        if (res && res.errCode === 0)
            this.setState({
                arrUsers: res.users,
            })
    }

    createNewUser = async (data) => {
        try {
            let res = await createNewUserService(data);
            if (res && res.errCode === 0) {
                await this.getAllUsers();
                this.setState({
                    isOpenModalUser: false,
                })

                emitter.emit('EVENT_CLEAR_INPUT_DATA', { 'id': 'your id' });
                //params 1: tên event để các subcriber lắng nghe, params 2 : data truyền theo (ở trên chỉ là ví dụ)
                //Emitter phát event : sau khi create new user ==> phát event tác động tới 
                //child User Modal, thằng child lắng nghe và thực hiện thay đổi state
            }
            else {
                alert(res.message);
            }
        } catch (error) {
            alert(error)
        }
    }

    handleClickBtnAddNewUser = () => {
        this.setState({
            isOpenModalUser: true
        });
    }

    handleToggleModalUser = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }

    handleClickBtnDelete = async (user) => {
        try {
            let res = await deleteUserService(user.id);
            if (res && res.errCode === 0) {
                await this.getAllUsers();
            }
            else alert(res.message);
        } catch (error) {
            alert(error);
        }
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
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.handleToggleModalUser}
                    createNewUser={this.createNewUser}
                />
                <div className="title text-center">Manage users</div>
                <div className='my-1'>
                    <button
                        type="button"
                        className="btn btn-primary mx-3 px-3"
                        onClick={this.handleClickBtnAddNewUser}
                    >
                        <i className="fas fa-plus"> </i>
                        Add a new user
                    </button>
                </div>
                <div className='users-table mt-3 mx-3'>
                    <table id="customers">
                        <tbody>
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
                                            <tr key={index}>
                                                <td>{item.email}</td>
                                                <td>{item.firstName}</td>
                                                <td>{item.lastName}</td>
                                                <td>{item.address}</td>
                                                <td>
                                                    <button
                                                        className="btn-edit"

                                                    >
                                                        <i className="fas fa-pencil-alt"></i>
                                                    </button>
                                                    <button
                                                        className="btn-delete"
                                                        onClick={() => this.handleClickBtnDelete(item)}
                                                    >
                                                        <i className="fas fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
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
