# https://itnext.io/refactoring-ruby-on-rails-controllers-using-blocks-bf78b1b292ca
class DocumentCreator < ApplicationService
  attr_reader :document

  # def self.call(document, &block)
  #   new(document).call(&block)
  # end

  def initialize(document)
    @document = document
  end
  private_class_method :new

  def call(&block)
    if document.save
      send_email
      track_activity
      yield(Trigger, NoTrigger)
    else
      yield(NoTrigger, Trigger)
    end
  end

  def send_email
    # Send email to all followers
  end

  def track_activity
    # Track in activity feed
  end
end

# app/services/trigger.rb
class Trigger
  def self.call
    yield
  end
end

# app/services/no_trigger.rb
class NoTrigger
  def self.call
    # Do nothing
  end
end