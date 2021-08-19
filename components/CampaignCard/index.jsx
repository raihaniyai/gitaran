/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-one-expression-per-line */

import React from 'react';
import Image from 'next/image';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';

import {
  ClaimButton,
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
  isClaim,
  handleClaim,
  isEligible,
}) => (
  <Card
    className={Container}
    cover={(
      <Image alt="sample" src={proPlan} />
    )}
    actions={isClaim ? null : [
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

      {isClaim && <Button type="primary" className={ClaimButton} onClick={handleClaim} disabled={!isEligible}>Get my code</Button>}
    </div>
  </Card>
);

export default CouponCard;
