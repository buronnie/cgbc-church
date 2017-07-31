import React, { Component } from 'react';
import offerFactory from '../../factories/offer';
import { Spin } from 'antd';
import { Table } from 'antd';
import { NavLink } from 'react-router-dom';

const columns = [{
  title: 'Contributor',
  dataIndex: 'contributor',
  render: (text, record) => {
    const link = `/finance/offers/${record.id}`;
    return (
      <NavLink to={link}>{text}</NavLink>
    );
  },
}, {
  title: 'Amount',
  dataIndex: 'amount',
}, {
  title: 'Type',
  dataIndex: 'offer_type',
}, {
  title: 'Date',
  dataIndex: 'offered_at',
}, {
  title: 'Note',
  dataIndex: 'note',
}];

export default class ListOffers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'loading',
      offers: [],
    };
  }

  componentDidMount() {
    offerFactory.index()
      .then(res => {
        this.setState({
          status: 'success',
          offers: res.data.map(offer => ({...offer, key: offer.id})),
        });
      })
      .catch(res => {
        this.setState({
          status: res.statusText,
        });
      });
  }

  render() {
    if (this.state.status === 'loading') {
      return <Spin className="loading-spin" />;
    }

    return (
      <Table
        columns={columns}
        dataSource={this.state.offers}
      />
    );
  }
}
