import React from 'react';
import {
  Form,
  Input,
  Select,
  DatePicker,
  Button,
} from 'antd';

import {
// FollowerStats,
} from './styles';

const { RangePicker } = DatePicker;

const CampaignForm = () => {
  const [form] = Form.useForm();

  const rangeConfig = {
    rules: [
      {
        type: 'array',
        required: true,
        message: 'Please select campaign period!',
      },
    ],
  };

  const onCheck = async () => {
    try {
      const values = await form.validateFields();
      console.log({
        ...values,
        period: {
          from: values.period[0]._d,
          to: values.period[1]._d,
        },
      });
      console.log('Success:', values);
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };

  return (
    <>
      <Form
        form={form}
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: 'large',
        }}
    //   onValuesChange={onFormLayoutChange}
        size="large"
      >
        <Form.Item name="title" label="Title" required tooltip="This is a required field">
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea />
        </Form.Item>
        {/* <Form.Item label="From" required tooltip="This is a required field">
          <DatePicker />
        </Form.Item> */}
        <Form.Item name="period" label="Period" {...rangeConfig}>
          <RangePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="socialmedia" label="Social media" required>
          <Select style={{ width: '100%' }}>
            <Select.Option value="twitter">Twitter</Select.Option>
            <Select.Option value="instagram">Instagram</Select.Option>
            <Select.Option value="facebook">Facebook</Select.Option>
            <Select.Option value="linkedin">LinkedIn</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="username" label="Username" required>
          <Input style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="eligibility" label="Eligibility" required>
          <Select style={{ width: '100%' }}>
            <Select.Option value="all">All followers</Select.Option>
            <Select.Option value="twoyears">More than 2 years</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit" onClick={() => onCheck()}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CampaignForm;
