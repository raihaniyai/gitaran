/* eslint-disable react/prop-types */
import React from 'react';
import { Row, Col } from 'antd';

import CampaignCard from '../CampaignCard';

import campaignData from '@constants/campaignData';

import { Container, Breadcrumbs, Title } from './styles';

const Campaigns = ({ showForm }) => (
  <div className={Container}>
    <p className={Breadcrumbs}>Dashboard &gt; Campaigns</p>
    <h2 className={Title}>Campaigns</h2>
    <Row gutter={[24, 24]}>
      {campaignData.map((campaign) => (
        <Col key={campaign.id} xs={24} sm={12} md={12} lg={8} xl={6}>
          <CampaignCard
            title={campaign.title}
            date={campaign.date}
            claimed={campaign.claimed}
            eligible={campaign.eligible}
            showForm={showForm}
          />
        </Col>
      ))}
    </Row>

  </div>
);

export default Campaigns;
