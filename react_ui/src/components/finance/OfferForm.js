import React, { Component } from 'react';
import { Form, DatePicker, Input, InputNumber, Button, Select } from 'antd';
import moment from 'moment';
import offerFactory from '../../factories/offer';
import { Redirect } from 'react-router-dom';

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
const contributorConfig = {
  rules: [{ required: true, message: 'Please select a contributor!' }],
};
const amountConfig = {
  initialValue: "0.0",
  rules: [{ required: true, message: 'Please input the offer amount!' }],
};
const typeConfig = {
  initialValue: "sunday",
  rules: [{ required: true, message: 'Please input the offer date!' }],
};
const dateConfig = {
  initialValue: moment(),
  rules: [{ required: true, message: 'Please select the offer date!' }],
};

class OfferForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saveSuccess: false,
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const form = this.props.form;

    form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }

      // Should format date value before submit.
      fieldsValue['offered_at'] = fieldsValue['offered_at'].format('YYYY-MM-DD');
      offerFactory.create({offer: fieldsValue})
        .then(res => {
          this.setState({ saveSuccess: true });
        })
        .fail(res => {
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

  render() {
    const { getFieldDecorator } = this.props.form;

    let view = null;
    if (this.state.saveSuccess) {
      view = <Redirect to="/"/>
    } else {
      view = <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="Contributor"
        >
          {getFieldDecorator('contributor', contributorConfig)(
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
          {getFieldDecorator('amount', amountConfig)(
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
          {getFieldDecorator('offer_type', typeConfig)(
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
          {getFieldDecorator('offered_at', dateConfig)(
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
          {getFieldDecorator('note')(
            <TextArea
              rows={4}
              style={{ width: WIDTH }}
            />
          )}
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
