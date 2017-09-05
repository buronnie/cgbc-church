import React, { Component } from 'react';
import { Form, DatePicker, Input, InputNumber, Button, Select, Upload, Icon, Modal } from 'antd';
import offerFactory from '../../factories/offer';

const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;

const WIDTH = 200;
const dateFormat = 'MM/DD/YYYY';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const contributorConfig = (initValue) => {
  return {
    initialValue: initValue,
    rules: [{required: true, message: 'Please select a contributor!'}],
  };
};
const amountConfig = (initValue) => {
  return {
    initialValue: initValue,
    rules: [{ required: true, message: 'Please input the offer amount!' }],
  };
};
const typeConfig = (initValue) => {
  return {
    initialValue: initValue,
    rules: [{ required: true, message: 'Please input the offer date!' }],
  };
};
const dateConfig = (initValue) => {
  return {
    initialValue: initValue,
    rules: [{ required: true, message: 'Please select the offer date!' }],
  };
};
const noteConfig = (initValue) => {
  return {
    initialValue: initValue,
  };
};

class OfferForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saveSuccess: false,
      fileList: props.file_list || [],
    };
  }

  payload = (params) => {
    if (this.props.id) {
      return { id: this.props.id, ...params };
    }
    return params;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const form = this.props.form;
    const apiCall = this.props.action === 'new' ? offerFactory.create : offerFactory.update;

    form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }

      // Should format date value before submit.
      fieldsValue['offered_at'] = fieldsValue['offered_at'].format('YYYY-MM-DD');

      fieldsValue['document_data'] = this.state.fileList;
      apiCall(this.payload(fieldsValue))
        .then(() => {
          this.setState({ saveSuccess: true });
        })
        .catch(res => {
          let errors = res.responseJSON.errors;
          for (let attr in errors) {
            form.setFields({
              [attr]: {
                value: fieldsValue[attr],
                errors: [new Error(errors[attr][0])],
              }
            });
          }
        }
      );
    });
  };

  handleUpload = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function() {
      this.setState({
        fileList: this.state.fileList.concat([{
          uid: file.uid,
          name: file.name,
          url: reader.result,
        }])
      })
    }.bind(this);
    return false;
  };

  hanldeDeleteUploadedFile = (uid) => {
    const self = this;
    Modal.confirm({
      title: 'Confirm',
      content: 'Are you sure to delete this uploaded file?',
      onOk() {
        self.setState({
          fileList: self.state.fileList.filter(file => file.uid !== uid),
        });
      }
    });
  };

  renderUploadedFileList = () => {
    if (this.state.fileList.length > 0) {
      return (
        <div>
          {this.state.fileList.map(file =>
            <div key={file.uid}>
              {file.link ? <a href={file.link} rel="noopener noreferrer" target="_blank">{file.name}</a>
                : <span>{file.name}</span>}
              <Icon
                type="close"
                className="ml-5"
                onClick={() => this.hanldeDeleteUploadedFile(file.uid)}
              />
              {file.link &&
                <img src={file.link} className="upload-thumbnail" alt="Sorry, preview is not avaiable"/>}
            </div>
          )}
        </div>
      );
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    let view = null;
    if (this.state.saveSuccess) {
      view = this.props.redirectToUrl;
    } else {
      view = <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="Contributor"
        >
          {getFieldDecorator('contributor', contributorConfig(this.props.contributor))(
            <Select
              style={{ width: WIDTH }}
              placeholder="Select a person"
              optionFilterProp="children"
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="tom">Tom</Option>
            </Select>
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Amount"
        >
          {getFieldDecorator('amount', amountConfig(this.props.amount))(
            <InputNumber
              size="large"
              style={{ width: WIDTH }}
              formatter={value => {
                return `$ ${String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
              }}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
            />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Offer Type"
        >
          {getFieldDecorator('offer_type', typeConfig(this.props.offer_type))(
            <Select
              style={{ width: WIDTH }}
              placeholder="Select a type"
              optionFilterProp="children"
            >
              <Option value="sunday">Sunday</Option>
              <Option value="friday">Friday</Option>
            </Select>
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Offer Date"
        >
          {getFieldDecorator('offered_at', dateConfig(this.props.offered_at))(
            <DatePicker
              format={dateFormat}
              style={{ width: WIDTH }}
            />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Note"
        >
          {getFieldDecorator('note', noteConfig(this.props.note))(
            <TextArea
              rows={4}
              style={{ width: WIDTH }}
            />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Receipt"
        >
          <Upload
            name='file'
            beforeUpload={this.handleUpload}
          >
            <Button>
              <Icon type="upload" /> Click to Upload
            </Button>
          </Upload>
          {this.renderUploadedFileList()}
        </FormItem>

        <FormItem
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: 16, offset: 8 },
          }}
        >
          <Button type="primary" htmlType="submit" size="large">Submit</Button>
        </FormItem>
      </Form>
    }
    return view;
  }
}

export default Form.create()(OfferForm);
