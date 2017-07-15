import React from 'react';
import { Modal, Form, Input, Icon } from 'antd';
const FormItem = Form.Item;

const SignupFormModal = Form.create()(
  (props) => {
    const { visible, onCancel, onSubmit, form } = props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title="Sign Up"
        onCancel={onCancel}
        onOk={onSubmit}
        maskClosable={false}
      >
        <Form layout="vertical">
          <FormItem>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your email!' }],
            })(
              <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Email" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password_confirmation', {
              rules: [{ required: true, message: 'Please input your Password again!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Confirm Password" />
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
);

export default Form.create()(SignupFormModal);
