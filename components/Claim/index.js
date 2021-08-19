import React, { useCallback } from 'react';
import { Col, Row } from 'antd';
import { object } from 'prop-types';

import CouponCard from '@components/CampaignCard';
import { Advertisement, Container } from './style';

const ClaimComponent = ({ data, handleClaim, isEligible }) => {
  return (
    <>
      <Row className={Container} justify="center" align="middle">
        <Col span={12}>
          <CouponCard
            title={data.name}
            date={data.endDate}
            claimed={data.claimed || 0}
            eligible={data.totalPromo}
            handleClaim={handleClaim}
            isClaim
            isEligible={isEligible}
          />
        </Col>
      </Row>
    </>
  );
};

ClaimComponent.propTypes = {
  data: object,
};

export default ClaimComponent;
