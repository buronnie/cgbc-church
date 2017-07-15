import React from 'react';
import { Modal, Form, Input, Icon, Checkbox } from 'antd';
const FormItem = Form.Item;

const LoginFormModal = Form.create()(
  (props) => {
    const { visible, onCancel, onSubmit, form } = props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title="Log In"
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
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>Remember Email</Checkbox>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('formError', {})(
              <div></div>
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
);

export default Form.create()(LoginFormModal);
