import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { FormattedMessage } from 'react-intl';
import './ManageDoctor.scss';
import Select from 'react-select';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import { getDetailInforDoctor } from '../../../services/userService';





// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]



class TableManagerUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            selectDoctorList: [],
            hasOldData: false,
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctorsRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctorsRedux !== this.props.allDoctorsRedux) {
            let doctorList = this.buildDataInputSelect(this.props.allDoctorsRedux)
            this.setState({
                selectDoctorList: doctorList,
            })
        }

        if (prevProps.language !== this.props.language) {
            let doctorList = this.buildDataInputSelect(this.props.allDoctorsRedux)
            this.setState({
                selectDoctorList: doctorList,
            })
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        })
    }

    handleSaveContentMarkdown = () => {
        let { hasOldData } = this.state;
        this.props.saveInforDoctorRedux({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            action: hasOldData === false ? CRUD_ACTIONS.CREATE : CRUD_ACTIONS.EDIT
        })
    }

    handleChangeSelect = async selectedOption => {
        this.setState({ selectedOption });
        let respon = await getDetailInforDoctor(selectedOption.value);
        console.log('>>> data detail doctor :', respon);

        if (respon && respon.errCode === 0 && respon.data && respon.data.Markdown) {
            let markdown = respon.data.Markdown;
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,
            })
        }
        else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
            })
        }

    }

    handleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })
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

    render() {
        let { hasOldData, contentMarkdown } = this.state;
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>
                    Tao them thong tin doctors
                </div>

                <div className='more-infor'>
                    <div className='content-left form-group'>
                        <label>Chon bac sy</label>

                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.selectDoctorList}
                        />
                    </div>

                    <div className='content-right'>
                        <label>Thong tin gioi thieu</label>
                        <textarea className='form-control' rows='4'
                            onChange={(event) => this.handleOnChangeDesc(event)}
                            value={this.state.description}
                        >
                            adfasfwrqwrqwrrqr          AREA TEXT
                        </textarea>
                    </div>
                </div>

                <div>
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={contentMarkdown} />
                </div>

                <button
                    onClick={() => this.handleSaveContentMarkdown()}
                    className={hasOldData === true ? 'save-content-doctor' : 'create-content-doctor'}
                >
                    {hasOldData === true ?
                        <span>Luu thong tin</span>
                        :
                        <span>Tao moi thong tin</span>
                    }
                </button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        allDoctorsRedux: state.admin.allDoctors,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctorsStart()),
        saveInforDoctorRedux: (data) => dispatch(actions.saveInforDoctorStart(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManagerUser);
