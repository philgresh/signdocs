module Taggable
  # this module becomes a concern thanks to this line
  extend ActiveSupport::Concern

  # code in this block will be run in class scope when the concern is included
  included do
    # validations and associations usually go here
    has_many :taggings, as: :taggable
    has_many :tags, through: :taggings
    validates #...
    # etc
  end

  # tags_string will become an instance method
  def tags_string
    tags.map(&:name).join(', ')
  end

  # methods defined in here become class methods
  module ClassMethods

    # this will become a class method
    # it should return all the elements that are tagged 'tag_name'
    def by_tag_name(tag_name)
      self.joins(:tags).where('tags.name' => tag_name)
    end
  end
end


# # app/models/question.rb
# class Question < ApplicationRecord
#   include Taggable
#   # ...
# end

# # app/models/answer.rb
# class Answer < ApplicationRecord
#   include Taggable
#   # ...
# end