class CreateOffers < ActiveRecord::Migration[5.1]
  def change
    create_table :offers do |t|
      t.string   :contributor, null: false
      t.float    :amount, null: false, default: 0
      t.string   :type, null: false
      t.datetime :offered_at
      t.string   :note
      t.timestamps
    end
  end
end
