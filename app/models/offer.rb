class Offer < ApplicationRecord
  # -----> VALIDATIONS
  validates :contributor, presence: true
  validates :amount, numericality: true
  validates :offer_type, presence: true
  validate  :offered_at_must_be_a_valid_date

  attr_accessor :document_data

  has_many :documents, dependent: :destroy

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

  def save_attachments(params)
    file_uids = []
    if params[:document_data].present?
      params[:document_data].each do |_, doc|
        file_uids.push(doc['uid'])
      end
    end

    persisted_documents = self.documents.where(file_uid: file_uids)
    not_persisted_documents = self.documents.where.not(file_uid: file_uids)
    new_uids = file_uids - persisted_documents.map(&:file_uid)

    if params[:document_data].present?
      params[:document_data].select do |_, doc|
        new_uids.include?(doc['uid'])
      end.each do |_, doc|
        self.documents.create(file: doc['url'], file_file_name: doc['name'], file_uid: doc['uid'])
      end
    end
    not_persisted_documents.map(&:destroy)
  end

end
