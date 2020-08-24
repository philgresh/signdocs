# frozen_string_literal: true

require "faker"
require "cuid"
require "victor"
require "byebug"

NUM_USERS = 3
NUM_DOCUMENTS = 3

SENTINEL_BLOCK_TYPES = [
  "SIGNATURE",
  "TEXT",
]

IMGS_PATH = "#{Rails.root}/app/assets/images/"


def setup_demo_user
  u = User.create(
    first_name: "Bob",
    last_name: "Zhurunkel",
    email: "bob1@example.org",
    password: "password",
  )
end

def destroy_all(klass)
  names = klass.name.underscore.pluralize
  if klass.count > 0
    puts "Destroying all #{names}..."
    klass.destroy_all
  end

  puts "Creating #{names}..."
end

def print_results(klass)
  puts "Created #{klass.count} documents."
  pp klass.first
end

def create_new_users
  destroy_all(User)
  users = (0...NUM_USERS).map do
    f_name = Faker::Name.first_name
    user = User.create(
      email: Faker::Internet.safe_email(name: f_name),
      password: "password",
      first_name: f_name,
      last_name: Faker::Name.last_name,
    )
  end

  print_results(User)

  users
end


def create_new_documents()
  destroy_all(Document)

  docs = (0...NUM_DOCUMENTS).map do |i|
    doc = Document.create(
      title: Faker::Book.title,
      description: Faker::Quotes::Shakespeare.hamlet_quote,
    )

    users = User.all.sample(2)
    doc.editors << users[0]
    doc.editors << users[1] if (rand(0..2) == 1)
    # doc.document_editors.find_by(user_id: user.id).is_owner = true
    doc.owner = (users[0])

    doc.file.attach(
      io: File.open(
        "#{Rails.root}/app/assets/images/sample#{i}.pdf"
      ),
      filename: "sample#{i}.pdf",
      content_type: "application/pdf",
    )
  end

  print_results(Document)

  puts "First file:"
  p Document.first.file
  return docs
end

def create_new_sentinel_blocks(docs)
  destroy_all(SentinelBlock)

  sentinels = docs.map do |doc|
    block_type = ["SIGNATURE", "TEXT"].sample
    SentinelBlock.create(
      user_id: doc.owner.id,
      block_type: block_type,
      placeholder: "This is a #{block_type} placeholder",
    )
  end

  print_results(SentinelBlock)

  sentinels
end

def create_new_content_fields(sentinels)
  destroy_all(ContentField)

  content_fields = sentinels.map do |sentinel|
    sentinel.content_field = ContentField.create(
 # bbox
           # assignee_id
           # document_id
      )
  end

  print_results(ContentField)
  content_fields
end


users = create_new_users() << setup_demo_user()
docs = create_new_documents()
# sentinels = create_new_sentinel_blocks(Document.all)
# content_fields = create_new_content_fields(sentinels)
