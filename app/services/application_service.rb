# https://www.toptal.com/ruby-on-rails/rails-service-objects-tutorial
class ApplicationService
  def self.call(*args, &block)
    new(*args, &block).call
  end
end
