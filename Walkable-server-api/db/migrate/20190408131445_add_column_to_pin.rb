class AddColumnToPin < ActiveRecord::Migration[5.2]
  def change
    add_column :pins, :user_id, :integer
  end
end
