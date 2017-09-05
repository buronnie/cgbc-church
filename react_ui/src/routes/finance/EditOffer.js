import React from 'react';
import OfferForm from '../../components/finance/OfferForm';
import offerFactory from '../../factories/offer';
import moment from 'moment';
import { Redirect } from 'react-router-dom';
import handleExceptionContainer from '../../components/HOC/handleExceptionContainer';

const redirectToUrl = (
  <Redirect to="/finance/offers" />
);

const loadData = (classRef) => {
  const offer_id = classRef.props.match.params.id;
  offerFactory.show(offer_id)
    .then(res => {
      classRef.setState({
        status: 'success',
        id: offer_id,
        contributor: res.contributor,
        amount: String(res.amount),
        offer_type: res.offer_type,
        offered_at: moment(res.offered_at),
        note: res.note || '',
        file_list: res.file_list || [],
      });
    })
    .catch(res => {
      classRef.setState({
        status: res.statusText,
      });
    });
};

const EditOffer = (props) => (
  <OfferForm
    {...props}
    action="edit"
    redirectToUrl={redirectToUrl}
  />
);

export default handleExceptionContainer(
  EditOffer,
  loadData
);
