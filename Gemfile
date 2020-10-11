source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "2.5.1"

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem "rails", "~> 5.2.3"
# Use postgresql as the database for Active Record
gem "pg", ">= 0.18", "< 2.0"
# Use Puma as the app server
gem "puma", "~> 3.11"
# Use SCSS for stylesheets
gem "sass-rails", "~> 5.0"
# Use Uglifier as compressor for JavaScript assets
gem "uglifier", ">= 1.3.0"
# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'mini_racer', platforms: :ruby

# Use CoffeeScript for .coffee assets and views
gem "coffee-rails", "~> 4.2"
# Turbolinks makes navigating your web application faster. Read more: https://github.com/turbolinks/turbolinks
# gem "turbolinks", "~> 5"
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem "jbuilder", "~> 2.5"
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 4.0'
# Use ActiveModel has_secure_password
gem "bcrypt"
gem "jquery-rails"
gem "aws-sdk-s3", require: false
gem 'sendgrid-ruby'
gem 'sendgrid-actionmailer'

# Use ActiveStorage variant
gem 'active_storage_validations'
gem 'mini_magick', '>= 4.9.5'
gem 'rmagick'
gem 'image_processing'
gem 'victor'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

# Reduces boot times through caching; required in config/boot.rb
gem "bootsnap", ">= 1.1.0", require: false
gem "faker"
gem 'cuid'
gem "pry-rails"
gem 'hexapdf'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem "byebug", platforms: [:mri, :mingw, :x64_mingw]
  gem "annotate"
  gem "better_errors"
  gem "binding_of_caller"
  gem 'capybara', '~> 2.13'
  gem 'launchy'
  gem 'selenium-webdriver'
  gem 'shoulda-matchers'
  gem 'rails-controller-testing'
  gem 'rspec-rails', '~> 3.5'
  gem 'factory_bot_rails'
  gem 'rubocop'
  gem 'kramdown'

  # required for ActiveStorage::Previewer::PopplerPDFPreviewer
  # gem 'poppler'
end


group :development do
  # Access an interactive console on exception pages or by calling 'console' anywhere in the code.
  gem "web-console", ">= 3.3.0"
  gem "listen", ">= 3.0.5", "< 3.2"
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem "spring"
  gem "spring-watcher-listen", "~> 2.0.0"
  gem 'rb-readline'
end

group :test do
  # Adds support for Capybara system testing and selenium driver
  # Easy installation and use of chromedriver to run system tests with Chrome
  gem "chromedriver-helper"
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]

# use config for picking out key/values
gem 'config'
gem 'figaro'