class AddBoardToTasks < ActiveRecord::Migration[7.1]
  def change
    add_reference :tasks, :board, null: false, foreign_key: true
  end
end
