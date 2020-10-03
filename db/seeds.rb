# frozen_string_literal: true

require "faker"
require "cuid"
require "victor"

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

def setup_phil_user
  User.create(
    first_name: "Phil",
    last_name: "Gresham",
    email: "phil@gresham.dev",
    password: Cuid::generate,
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
  # destroy_all(SentinelBlock)

  sentinels = docs.map do |doc|
    block_type = ["SIGNATURE", "TEXT"].sample
    SentinelBlock.create(
      block_type: block_type,
    )
  end

  print_results(SentinelBlock)

  sentinels
end

def create_new_content_fields(docs, sentinels)
  # destroy_all(ContentField)

  (0...docs.size).each do |i|
    doc = docs[i]
    sentinel = sentinels[i]
    ContentField.create(
      bbox: {
        x: rand(200..500),
        y: rand(200..500),
        width: rand(150..300),
        height: rand(50..200),
        page: 1,
      },
      signatory_id: doc.owner.id,
      document_id: doc.id,
      contentable: sentinel,
    )
  end

  print_results(ContentField)
end

demo_user = setup_demo_user()
phil = setup_phil_user()
# users = create_new_users() << demo_user
# docs = create_new_documents()
# sentinels = create_new_sentinel_blocks(docs)
# content_fields = create_new_content_fields(docs, sentinels)
