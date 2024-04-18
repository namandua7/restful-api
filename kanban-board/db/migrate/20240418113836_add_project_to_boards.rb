class AddProjectToBoards < ActiveRecord::Migration[7.1]
  def change
    add_reference :boards, :project, null: false, foreign_key: true
  end
end
