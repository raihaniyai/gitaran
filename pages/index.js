// import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'

import React, { useState } from 'react';

import { Modal } from 'antd';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import SideNav from '../components/SideNav';
import Campaigns from '../components/Campaigns';

import { Container, AddButton } from '../styles/styles';
import CampaignForm from '../components/CampaignForm';

export default function Home() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formTitle, setFormTitle] = useState('New');
  const [formData, setFormData] = useState({});

  const showForm = (title) => {
    setFormTitle(title);
    setIsFormVisible(true);
  };

  const handleSubmit = () => {
    console.log(formData);
    setIsFormVisible(false);
  };

  return (
    <>
      <SideNav />
      <div className={Container}>
        <Campaigns showForm={showForm} />
      </div>
      <div className={AddButton}>
        <Fab aria-label="add" color="primary" onClick={() => showForm('New')}>
          <AddIcon />
        </Fab>
      </div>
      <Modal
        title={`${formTitle} Campaign`}
        centered
        visible={isFormVisible}
        onCancel={() => setIsFormVisible(false)}
        onOk={() => handleSubmit()}
        okText="Create"
        width="800px"
        footer={null}
      >
        <CampaignForm setFormData={setFormData} />
      </Modal>
    </>
  );
}
