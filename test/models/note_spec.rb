# == Schema Information
#
# Table name: notes
#
#  id          :bigint           not null, primary key
#  title       :string           not null
#  description :string           not null
#  secret      :boolean          not null
#  user_id     :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
require 'rails_helper'

RSpec.describe Note, type: :model do
  it { should validate_presence_of(:title) }
  it { should validate_presence_of(:description) }
  it { should allow_value(true, false).for(:secret) }
  it { should belong_to(:user) }
end
