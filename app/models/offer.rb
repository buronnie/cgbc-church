class Offer < ApplicationRecord
  # -----> VALIDATIONS
  validates :contributor, presence: true
  validates :amount, numericality: true
  validates :offer_type, presence: true
  validate  :offered_at_must_be_a_valid_date

  DEFAULT_OFFER = {
    contributor: '',
    amount: '0.0',
    offer_type: 'sunday',
    offered_at: Date.today.to_s,
    note: '',
  }.freeze

  resourcify

  def offered_at_must_be_a_valid_date
    if !offered_at.is_a?(ActiveSupport::TimeWithZone)
      errors.add(:offered_at, 'is not a valid date')
    end
  end

end
