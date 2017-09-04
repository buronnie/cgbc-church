class Document < ApplicationRecord
  belongs_to :offer

  has_attached_file :file
  validates_attachment :file, presence: true
  do_not_validate_attachment_file_type :file
end
