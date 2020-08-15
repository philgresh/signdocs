# == Schema Information
#
# Table name: documents
#
#  id          :uuid             not null, primary key
#  description :text
#  title       :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
FactoryBot.define do
  factory :document do
    
  end
end
