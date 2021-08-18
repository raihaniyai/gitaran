import React from 'react';
import { Col, Row } from 'antd';
import { object } from 'prop-types';

import CouponCard from '@components/CampaignCard';
import { Advertisement, Container } from './style';

const ClaimComponent = ({ data }) => {
  return (
    <>
      <Row className={Container} justify="center" align="middle">
        <Col span={12}>
          <CouponCard
            title={data.name}
            date="01/01/2021"
            claimed={120}
            eligible={data.totalPromo}
          />
        </Col>
      </Row>

      <div className={Advertisement}>Testing</div>
    </>
  );
};

ClaimComponent.propTypes = {
  data: object,
};

export default ClaimComponent;
