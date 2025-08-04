class CreateRecords < ActiveRecord::Migration[8.0]
  def change
    create_table :records do |t|
      t.string :name
      t.integer :wins
      t.integer :losses
      t.references :team, null: false, foreign_key: true

      t.timestamps
    end
  end
end
