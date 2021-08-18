import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Modal } from 'antd';
import useSWR from 'swr';

import ClaimComponent from '@components/Claim';

const fetcher = (url) => fetch(url).then((res) => res.json())

const ClaimPromotion = () => {
  const router = useRouter();
  const { companyId, promotionId } = router.query;
  const { data = {}, error } = useSWR(`/api/promotion/data?companyId=${companyId}&promotionId=${promotionId}`, fetcher);

  if (error) {
    Modal.error({
      title: error,
      content: 'Try again later.'
    });
  }

  return (
    <ClaimComponent data={data} />
  );
};

export default ClaimPromotion;
