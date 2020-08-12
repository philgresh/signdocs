# frozen_string_literal: true

require 'faker'
require 'cuid'

NUM_USERS = 10
NUM_DOCUMENTS = 3
SIGNATURE_STYLE_FONT_FAMILIES = [
  'Dancing Script',
  'Caveat',
  'Permanent Marker',
  'Rock Salt',
  'Homemade Apple'
].freeze
COLORS = %w[darkred darkgreen darkgray].freeze

def create_new_users
  puts 'Destroying all users...'
  User.destroy_all

  puts 'Creating users...'
  users = (0...NUM_USERS).map do
    f_name = Faker::Name.first_name
    User.create(
      email: Faker::Internet.safe_email(name: f_name),
      password: 'abc123!?',
      first_name: f_name,
      last_name: Faker::Name.last_name
    )
  end
  puts "Created #{NUM_USERS} users"
  puts 'First user:'
  p User.first

  users
end

def create_new_signature_blocks(users)
  puts 'Destroying all signatures...'
  SignatureBlock.destroy_all

  puts 'Creating signatures...'
  users.each do |user|
    SignatureBlock.create(
      user_id: user.id,
      styling: {
        "font-family": SIGNATURE_STYLE_FONT_FAMILIES.sample,
        "color": COLORS.sample
      },
      pub_key: Cuid.generate,
      body: "#{user.first_name} #{user.last_name}"
    )
  end
end

def create_new_documents(users)
  (0...NUM_DOCUMENTS).each do |i|
    # editor_ids
    # file_id
    # owner_id

    doc = Document.new(
      owner_id: users.sample.id
    )

    doc.file.attach io: File.open("/Users/phil/Downloads/signdocs_sample_pdfs/sample#{i}.pdf"),
                        filename: "sample#{i}.pdf",
                        content_type: 'application/pdf'
  end
end

users = create_new_users
create_new_signature_blocks(users)
