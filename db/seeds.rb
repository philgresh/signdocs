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
  # create_avatar(user)
  # create_new_signature_block(user)
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
    create_avatar(user)
    create_new_signature_block(user)
  end

  print_results(User)

  users
end

def create_avatar(user)
  new_avatar = Faker::Avatar.image(
    slug: "#{user.first_name}_#{user.last_name}",
    size: "200x200",
    format: "png",
  )
  download = open(new_avatar)
  local_link = "#{Rails.root}/app/assets/images/avatar.png"
  IO.copy_stream(download, local_link)
  user.avatar.attach(
    io: File.open(local_link),
    content_type: "image/png",
    filename: "#{user.id}-avatar.png",
    # identify: false,
  )
  user.save!
end

def create_new_signature_block(user)
  s = SignatureBlock.create(
    user_id: user.id,
  )
  # s.gen_new_pub_key
  # s.schedule_key_deletion(30)
  file = gen_svg_from_name(user.first_name, user.last_name)
  s.sig_image.attach(
    io: File.open(file),
    content_type: "image/svg+xml",
    filename: "#{user.id}-sig.svg",
    # identify: false,
  )
  File.delete(file) if File.exist?(file)

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

users = create_new_users()
docs = create_new_documents()
# sentinels = create_new_sentinel_blocks(Document.all)
# content_fields = create_new_content_fields(sentinels)
