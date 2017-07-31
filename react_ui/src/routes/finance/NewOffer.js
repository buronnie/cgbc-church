import React from 'react';
import OfferForm from '../../components/finance/OfferForm';
import offerFactory from '../../factories/offer';
import handleExceptionContainer from '../../components/HOC/handleExceptionContainer';
import moment from 'moment';
import { Redirect } from 'react-router-dom';

const redirectToUrl = (
  <Redirect to="/finance/offers" />
);

const loadData = (classRef) => {
  offerFactory.newItem()
    .then(res => {
      classRef.setState({
        status: 'success',
        contributor: res.contributor,
        amount: String(res.amount),
        offer_type: res.offer_type,
        offered_at: moment(res.offered_at),
        note: res.note || '',
      });
    })
    .catch(res => {
      classRef.setState({
        status: res.statusText,
      });
    });
};

const NewOffer = (props) => (
  <OfferForm
    {...props}
    action="new"
    redirectToUrl={redirectToUrl}
  />
);

export default handleExceptionContainer(
  NewOffer,
  loadData
);
