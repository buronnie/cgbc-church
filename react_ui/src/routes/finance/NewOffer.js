import React, { Component } from 'react';
import OfferForm from '../../components/finance/OfferForm';
import offerFactory from '../../factories/offer';
import moment from 'moment';
import { Spin } from 'antd';
import { Redirect } from 'react-router-dom';
import My401Page from '../../components/exceptions/My401Page';
import My404Page from '../../components/exceptions/My404Page';

const redirectToUrl = (
  <Redirect to="/" />
);

export default class NewOffer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'loading',
    };
  }

  componentDidMount() {
    offerFactory.newItem()
      .then(res => {
        this.setState({
          status: 'success',
          contributor: res.contributor,
          amount: String(res.amount),
          offer_type: res.offer_type,
          offered_at: moment(res.offered_at),
          note: res.note || '',
        });
      })
      .catch(res => {
        this.setState({
          status: res.statusText,
        });
      });
  }


  render() {
    if (this.state.status === 'success') {
      return (
        <OfferForm
          action="new"
          {...this.state}
          redirectToUrl={redirectToUrl}
        />
      );
    } else if (this.state.status === 'Unauthorized') {
      return (
        <My401Page />
      );
    } else if (this.state.status === 'error') {
      return (
        <My404Page />
      );
    }

    return (
      <Spin className="loading-spin" />
    );
  }
}
