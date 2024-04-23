class AddTableCreatedByToTasks < ActiveRecord::Migration[7.1]
  def change
    add_column :tasks, :created_by, :string
  end
end