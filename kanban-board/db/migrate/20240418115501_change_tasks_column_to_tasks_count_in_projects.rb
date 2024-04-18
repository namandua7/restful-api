class ChangeTasksColumnToTasksCountInProjects < ActiveRecord::Migration[7.1]
  def change
    rename_column :projects, :tasks, :tasks_count
  end
end
