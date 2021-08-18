import React from 'react';
import { Menu } from 'antd';
import {
  CalendarOutlined,
  SettingOutlined,
} from '@ant-design/icons';

import {
  Container,
  MenuText,
} from './styles';

const menus = [
  {
    id: '1',
    name: 'Campaigns',
    icon: <CalendarOutlined style={{ fontSize: '20px', marginLeft: '20px' }} />,
  },
  {
    id: '2',
    name: 'Analytics',
    icon: <CalendarOutlined style={{ fontSize: '20px', marginLeft: '20px' }} />,
  },
  {
    id: '3',
    name: 'Settings',
    icon: <SettingOutlined style={{ fontSize: '20px', marginLeft: '20px' }} />,
  },
];

const SideNav = () => (
  <>
    <Menu
      className={Container}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      theme="dark"
    >
      {/* <h1 style={{ color: '#FFFFFF', margin: '50px 20px 50px 40px' }}>Hello</h1> */}
      {menus.map((menu) => (
        <Menu.Item style={menu.id === '1' ? { height: '50px', marginTop: '50px' } : { height: '50px' }} key={menu.id} icon={menu.icon}>
          <div className={MenuText}>
            {menu.name}
          </div>
        </Menu.Item>
      ))}
    </Menu>
  </>
);
export default SideNav;
