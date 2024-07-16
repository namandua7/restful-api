class CreateBlogs < ActiveRecord::Migration[7.1]
  def change
    create_table :blogs do |t|
      t.string :title
      t.text :description
      t.string :author
      t.datetime :published

      t.timestamps
    end
  end
end
