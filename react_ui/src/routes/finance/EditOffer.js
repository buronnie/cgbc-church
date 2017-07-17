import React, { Component } from 'react';
import OfferForm from '../../components/finance/OfferForm';
import offerFactory from '../../factories/offer';
import moment from 'moment';
import { Spin } from 'antd';
import { Redirect } from 'react-router-dom';
import My401Page from '../../components/exceptions/My401Page';
import My404Page from '../../components/exceptions/My404Page';

const redirectToUrl = (
  <Redirect to="/finance/offers/new" />
);

export default class EditOffer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'loading',
    };
  }

  componentDidMount() {
    const offer_id = this.props.match.params.id;
    offerFactory.show(offer_id)
      .then(res => {
        this.setState({
          status: 'success',
          id: offer_id,
          contributor: res.contributor,
          amount: String(res.amount),
          offer_type: res.offer_type,
          offered_at: moment(res.offered_at),
          note: res.note || '',
        });
      })
      .fail(res => {
        this.setState({
          status: res.statusText,
        });
      });
  }

  render() {
    if (this.state.status === 'success') {
      return (
        <OfferForm
          action="edit"
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
