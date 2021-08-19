import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Modal } from 'antd';
import useSWR from 'swr';
import { loginWithTwitter } from '@utils/firebase';

import ClaimComponent from '@components/Claim';

const fetcher = (url) => fetch(url).then((res) => res.json())

const ClaimPromotion = () => {
  const router = useRouter();
  const { companyId, promotionId } = router.query;
  const [data, setData] = useState({});
  const [isEligible, setEligible] = useState(false);
  const [userId, setUserId] = useState(null);
  const [promoCode, setPromoCode] = useState(null);
  const { data: result, error } = useSWR(`/api/promotion/data?companyId=${companyId}&promotionId=${promotionId}`, fetcher);
  const { data: media, error: errMedia } = useSWR(`/api/company/socialMedia/getFollowers?companyId=${companyId}`, fetcher);
  // const { error: errUpdateFollowers } = useSWR(`/api/twitter/updateFollowers?username=jadijago`, fetcher);

  // const handleClaim = useCallback(() => {
  //   const claimedData = db.ref('bank-jago/promotions/' + promotionId + '/claimed');
  //   claimedData.set(100);
  // }, [companyId, promotionId, userId]);

  console.log(promoCode);

  const handleClaim = useCallback(async () => {
    const response = await fetch(`/api/promotion/claim`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        companyId,
        promotionId,
        userId,
      }),
    });

    const data = await response.json();

    console.log(data);
  }, [companyId, promotionId, userId]);

  useEffect(() => {
    if (error) {
      Modal.error({
        title: 'Error Occured',
        content: error,
      });
    }

    if (result) {
      setData(result.data || {});
    }
  }, [error, result]);

  useEffect(() => {
    if (errMedia) {
      Modal.error({
        title: 'Error Occured',
        content: errMedia,
      });
    }

    if (media) {
      const { twitter } = media.data;
      const followersList = Object.keys(twitter[0].followers);

      setEligible(followersList.includes(userId));
    }
  }, [errMedia, media]);

  useEffect(() => {
    Modal.info({
      title: "Need to login",
      content: "You need to login to Twitter Account"
    });

    loginWithTwitter(setUserId);
  }, []);

  useEffect(() => {
    if (userId) {
      Modal.destroyAll();
    }
  }, [userId]);

  return (
    <ClaimComponent data={data} handleClaim={handleClaim} isEligible={true} />
  );
};

export default ClaimPromotion;
