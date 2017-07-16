class UpdateTypeToOfferTypeInOffers < ActiveRecord::Migration[5.1]
  def change
    rename_column :offers, :type, :offer_type
  end
end
