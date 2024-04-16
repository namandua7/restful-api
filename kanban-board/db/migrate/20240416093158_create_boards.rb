class CreateBoards < ActiveRecord::Migration[7.1]
  def change
    create_table :boards do |t|
      t.string :status
      t.string :description

      t.timestamps
    end
  end
end
