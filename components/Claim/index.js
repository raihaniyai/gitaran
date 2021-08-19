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

      <div className={Advertisement}>
        <script type="text/javascript">
          var pubId=157566;
          var siteId=851482;
          var kadId=3932573;
          var kadwidth=300;
          var kadheight=250;
          var kadschain="SUPPLYCHAIN_GOES_HERE";
          var kadUsPrivacy=""; var kadtype=1;
          var kadGdpr="0";
          var kadGdprConsent=""; var kadexpdir = '1,2,3,4,5';
          var kadbattr = '8,9,10,11,14';
          var kadifb = 'Dc';
          var kadpageurl= "https%3A%2F%2Fgitaran.vercel.app%2F";
        </script>
        <script type="text/javascript" src="https://ads.pubmatic.com/AdServer/js/showad.js"></script>
      </div>
    </>
  );
};

ClaimComponent.propTypes = {
  data: object,
};

export default ClaimComponent;
