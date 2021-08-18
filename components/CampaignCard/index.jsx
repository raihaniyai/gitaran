/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-one-expression-per-line */

import React from 'react';
import Image from 'next/image';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Card } from 'antd';

import {
  Container,
  Content,
  Title,
  Dates,
  Stats,
} from './styles';

import proPlan from './images/pro-plan.svg';

const CouponCard = ({
  title,
  date,
  claimed,
  eligible,
  showForm,
}) => (
  <Card
    className={Container}
    cover={(
      <Image alt="sample" src={proPlan} />
    )}
    actions={[
      <SettingOutlined key="setting" />,
      <EditOutlined
        key="edit"
        onClick={() => showForm('Edit')}
      />,
      <EllipsisOutlined key="ellipsis" />,
    ]}
  >
    <div className={Content}>
      <p className={Title}>{title}</p>
      <p className={Dates}>{date}</p>
      <div className={Stats}>
        <p>Claimed: {claimed}</p>
        <p>Eligible: {eligible}</p>
      </div>
    </div>
  </Card>
);
export default CouponCard;
