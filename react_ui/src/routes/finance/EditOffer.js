import React, { Component } from 'react';
import OfferForm from '../../components/finance/OfferForm';
import offerFactory from '../../factories/offer';
import moment from 'moment';
import { Spin } from 'antd';
import { Redirect } from 'react-router-dom';

const redirectToUrl = (
  <Redirect to="/offers/new" />
);

export default class EditOffer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
    };
  }

  componentDidMount() {
    const offerId = this.props.match.params.id;
    offerFactory.show(offerId).then(res => {
      this.setState({
        ready: true,
        contributor: res.contributor,
        amount: String(res.amount),
        offer_type: res.offer_type,
        offered_at: moment(res.offered_at),
        note: res.note || '',
      });
    });
  }

  render() {
    if (this.state.ready) {
      return (
        <OfferForm
          action="edit"
          {...this.state}
          redirectToUrl={redirectToUrl}
        />
      );
    }

    return (
      <Spin className="loading-spin" />
    );
  }
}
