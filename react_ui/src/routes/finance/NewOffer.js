import React, { Component } from 'react';
import OfferForm from '../../components/finance/OfferForm';
import moment from 'moment';
import { Redirect } from 'react-router-dom';

const redirectToUrl = (
  <Redirect to="/" />
);

export default class NewOffer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contributor: '',
      amount: '0.0',
      offer_type: 'sunday',
      offered_at: moment(),
      note: '',
    };
  }

  render() {
    return (
      <OfferForm
        action="new"
        {...this.state}
        redirectToUrl={redirectToUrl}
      />
    );
  }
}
