/* eslint-disable no-undef */
'use client';

import React from 'react';
// import OpenAI from 'openai';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Button, Drawer, List, Menu } from 'antd';
import { useState } from 'react';
import styles from './page.module.css';

export default function Home() {
  const items = [
    {
      label: 'Navigation One',
      key: 'mail',
      icon: <MailOutlined />,
    },
    {
      label: 'Navigation Two',
      key: 'app',
      icon: <AppstoreOutlined />,
      disabled: true,
    },
    {
      label: 'Navigation Three - Submenu',
      key: 'SubMenu',
      icon: <SettingOutlined />,
      children: [
        {
          type: 'group',
          label: 'Item 1',
          children: [
            {
              label: 'Option 1',
              key: 'setting:1',
            },
            {
              label: 'Option 2',
              key: 'setting:2',
            },
          ],
        },
        {
          type: 'group',
          label: 'Item 2',
          children: [
            {
              label: 'Option 3',
              key: 'setting:3',
            },
            {
              label: 'Option 4',
              key: 'setting:4',
            },
          ],
        },
      ],
    },
    {
      key: 'alipay',
      label: (
        <a href='https://ant.design' target='_blank' rel='noopener noreferrer'>
          Navigation Four - Link
        </a>
      ),
    },
  ];

  const [current, setCurrent] = useState('mail');

  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [listData, setListData] = useState([]);
  const [localAPIData, setLocalAPIData] = useState('');
  const [aiData, setAIData] = useState('');

  const showLoading = async () => {
    setOpen(true);
    setLoading(true);

    const { status } = await fetch('http://localhost:5000/v1/status', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ a: 1, b: 2 }),
    }).then((data) => data.json());
    setLocalAPIData(status);
    const response = await fetch('https://api.restful-api.dev/objects').then((data) => data.json());
    const list = response.map(({ id, name: title, data }) => {
      return {
        id,
        title,
        description: data?.Description,
      };
    });

    setListData(list);

    const key = process.env.NEXT_PUBLIC_KEY;
    console.log(key);

    const { data } = await fetch('http://localhost:5000/v1/ask', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: key,
      },
      method: 'POST',
      body: JSON.stringify({ content: 'Say Good Morning' }),
    }).then((data) => data.json());

    setAIData(data?.message?.content);

    setLoading(false);
  };

  return (
    <div className={styles.page}>
      <Menu onClick={onClick} selectedKeys={[current]} mode='horizontal' items={items} />
      <div>{`SHOW STATUS LATEST AHGAIN - ${localAPIData}`}</div>
      <div>{`AI Response - ${aiData}`}</div>
      <div>
        <Button type='primary' onClick={showLoading}>
          Open Drawer
        </Button>
      </div>
      <Drawer
        closable
        destroyOnClose
        title={<p>Loading Drawer</p>}
        placement='right'
        open={open}
        loading={loading}
        onClose={() => setOpen(false)}
      >
        <Button
          type='primary'
          style={{
            marginBottom: 16,
          }}
          onClick={showLoading}
        >
          Reload
        </Button>

        {/* <List
          size="small"
          bordered
          dataSource={listData}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        /> */}
        <List
          itemLayout='horizontal'
          dataSource={listData}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${item.id}`} />}
                title={<a href='https://ant.design'>{item.title}</a>}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </Drawer>
    </div>
  );
}
