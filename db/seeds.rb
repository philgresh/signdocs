# frozen_string_literal: true

require "faker"
require "cuid"

NUM_USERS = 10
NUM_DOCUMENTS = 3
SIGNATURE_STYLE_FONT_FAMILIES = [
  "Dancing Script",
  "Caveat",
  "Permanent Marker",
  "Rock Salt",
  "Homemade Apple",
].freeze
COLORS = %w[darkred darkgreen darkgray].freeze
SENTINEL_BLOCK_TYPES = [
  "SIGNATURE",
  "TEXT"
]

def destroy_all(klass)
  names = klass.name.underscore.pluralize
  puts "Destroying all #{names}..."
  klass.destroy_all

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
    User.create(
      email: Faker::Internet.safe_email(name: f_name),
      password: "abc123!?",
      first_name: f_name,
      last_name: Faker::Name.last_name,
    )
  end
  
  print_results(User)

  users
end

def create_new_signature_blocks(users)
  destroy_all(SignatureBlock)

  users.each do |user|
    s = SignatureBlock.create(
      user_id: user.id,
      styling: {
        "font-family": SIGNATURE_STYLE_FONT_FAMILIES.sample,
        "color": COLORS.sample,
      },
      pub_key: Cuid.generate,
      body: "#{user.first_name} #{user.last_name}",
    )
    s.gen_new_pub_key
    s.schedule_key_deletion(30)
  end

  print_results(SignatureBlock)
end

def create_new_documents(users)
  destroy_all(Document)

  docs = (0...NUM_DOCUMENTS).map do |i|
    doc = Document.new(
      owner_id: users.sample.id,
      title: Faker::Book.title,
      description: Faker::Quotes::Shakespeare.hamlet_quote,
    )

    doc.file.attach io: File.open("/Users/phil/Downloads/signdocs_sample_pdfs/sample#{i}.pdf"),
                    filename: "sample#{i}.pdf",
                    content_type: "application/pdf"
    doc.save!
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
      placeholder: "This is a #{block_type} placeholder"
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


# users = create_new_users()
# create_new_signature_blocks(users)
# docs = create_new_documents(users)
# sentinels = create_new_sentinel_blocks(Document.all)
# content_fields = create_new_content_fields(sentinels)