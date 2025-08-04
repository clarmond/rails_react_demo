class CreateTeams < ActiveRecord::Migration[8.0]
  def change
    create_table :teams do |t|
      t.string :name
      t.string :league
      t.string :division
      t.string :abbrev

      t.timestamps
    end
  end
end
