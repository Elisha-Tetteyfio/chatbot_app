class CreateMessages < ActiveRecord::Migration[8.0]
  def change
    create_table :messages do |t|
      t.references :conversation, null: false, foreign_key: true
      t.string :content, null: false
      t.string :sender, null: false

      t.timestamps
    end
  end
end
