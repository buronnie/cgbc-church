import React from 'react';
import offerFactory from '../../factories/offer';
import { Table } from 'antd';
import { NavLink } from 'react-router-dom';
import handleExceptionContainer from '../../components/HOC/handleExceptionContainer';

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

const loadData = (classRef) => {
  offerFactory.index()
    .then(res => {
      classRef.setState({
        status: 'success',
        offers: res.data.map(offer => ({...offer, key: offer.id})),
      });
    })
    .catch(res => {
      classRef.setState({
        status: res.statusText,
      });
    });
};

const ListOffers = (props) => (
  <Table
    columns={columns}
    {...props}
  />
);

export default handleExceptionContainer(
  ListOffers,
  loadData
);
