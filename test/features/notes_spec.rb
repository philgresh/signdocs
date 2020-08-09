require 'rails_helper'


feature 'Creating a note on User show page (hint: make sure your capitalization is exact!)', type: :feature do
  context 'when logged in' do
    before :each do
      register_as_jack_bruce
      visit user_url(User.find_by(email: "jack_bruce@bruce.com"))
    end

    it 'has a form to add a new note' do
      expect(page).to have_content 'Add a New Note'
    end

    it 'takes a Title and Description' do
      expect(page).to have_content 'Title'
      expect(page).to have_content 'Description'
    end
    
    it 'has a radio button that allows a user to choose "true" if a note is secret' do
      # Find all the radio buttons - there should only be 2
      radio_buttons = all('input[type=radio]', maximum: 2)
      # Finds the one radio button with the value of true
      true_button_array = radio_buttons.select{|input| input.value == "true"}
      expect(true_button_array).not_to be_empty
    end

    it 'has a radio button that allows a user to choose "false" if a note is not secret' do
      # Find all the radio buttons - there should only be 2
      radio_buttons = all('input[type=radio]', maximum: 2)
      # Finds the one radio button with the value of false
      false_button_array = radio_buttons.select{|el| el.value == "false"}
      expect(false_button_array).not_to be_empty
    end

    context 'on a successful save' do
      before :each do
        register_as_jack_bruce
        visit user_url(User.find_by(email: "jack_bruce@bruce.com"))
        fill_in 'Title', with: 'Found New Hike'
        fill_in 'Description', with: 'Found a great hiking path by the river - gotta do it again!'
        choose(option: 'false')
        click_button 'Create Note'
      end

      it 'redirects to the the user show page' do
        expect(current_path).to eq(user_path(User.find_by(email: "jack_bruce@bruce.com")))
        expect(page).to have_content 'Found New Hike'
      end

    end

    context 'on a failed save' do
      before :each do
        register_as_jack_bruce
        visit user_url(User.find_by(email: "jack_bruce@bruce.com"))
        fill_in 'Title', with: 'Found Cool Rock'
        choose(option: 'false')
        click_button 'Create Note'
      end

      it 're-directs to the the user show page' do
        expect(current_path).to eq(user_path(User.find_by(email: "jack_bruce@bruce.com")))
      end

      it 'renders errors to the user' do
        expect(page).to have_content "Description can't be blank"
      end

      it 'still allows for a successful save' do
        fill_in 'Title', with: 'Found Cool Rock'
        fill_in 'Description', with: 'Off the path by the post office'
        choose(option: 'false')
        click_button 'Create Note'
        expect(page).to have_content 'Found Cool Rock'
      end
    end
  end
end    

feature 'Showing a user\'s notes (hint: make sure your capitalization is exact!)', type: :feature do
  context 'showing note Title and Description' do
    before :each do
      register_as_jack_bruce
      make_note_for_jack('Remember to buy Milk', 'Making a cake tonight!', 'false')
      make_note_for_jack('Found the best cake recipe', 'Funfetti for life', 'false')
      visit user_url(User.find_by(email: "jack_bruce@bruce.com"))
    end

    it 'on any user\'s show page it lists that user\'s notes Titles' do
      expect(page).to have_content 'Remember to buy Milk'
      expect(page).to have_content 'Found the best cake recipe'
    end

    it 'on a user\'s show page it lists the Description of that user\'s notes' do
      expect(page).to have_content 'Making a cake tonight!'
      expect(page).to have_content 'Funfetti for life'
    end

  end

  context 'showing a note only if NOT secret' do
    before :each do
      register_as_jack_bruce
      jack = User.find_by(email: "jack_bruce@bruce.com")
      visit user_url(jack)
    end
    
    it 'if a note is private it WILL NOT be shown on the user\'s show page' do
      make_note_for_jack('Secret Message', 'ooooh don\'t tell!', 'true')
      expect(page).not_to have_content 'Secret Message'
    end

    it 'if a note is NOT private it will be shown on the user\'s show page' do
      make_note_for_jack('Mundane Message', 'everyone can read this!', 'false')
      expect(page).to have_content 'Mundane Message'
    end

    it "displays a link to edit a note" do
      make_note_for_jack('Cool Note', 'Woop!', 'false')
      expect(page).to have_content 'Edit Note'
    end

  end
end

feature 'Editing an existing Note (hint: make sure your capitalization is exact!)', type: :feature do
  context 'when logged in' do
    before :each do
      register_as_jack_bruce
      make_note_for_jack('To-Do', 'Get groceries', 'false')
      click_link 'Edit Note'
    end
    
    it 'has a form to edit an existing note' do
      expect(page).to have_content 'Edit Note Form'
    end

    it 'takes a title and description' do
      expect(page).to have_content 'Title'
      expect(page).to have_content 'Description'
    end
  end

  context 'on a successful update' do
    before :each do
      register_as_jack_bruce
      make_note_for_jack('To-Do', 'Get groceries', 'false')
      click_link 'Edit Note'
      fill_in 'Title', with: 'ToDo'
      click_button 'Save Edited Note'
    end

    it 'redirects to the user\'s show page page and updates the note\'s information' do
      expect(current_path).to eq(user_path(get_jack.id))
      expect(page).to have_content 'ToDo'
    end
  end

  context 'on a failed update' do
    before :each do
      register_as_jack_bruce
      make_note_for_jack('To-Do', 'Get groceries', 'false')
      click_link 'Edit Note'
      fill_in 'Title', with: ''
      fill_in 'Description', with: 'my new note description'
      click_button 'Save Edited Note'
    end

    it 'renders errors to the user' do
      expect(page).to have_content "Something went wrong!"
    end

    it 'prefills information from a failed update and still allows for a successful update' do
      fill_in 'Title', with: 'New Note Title'
      click_button 'Save Edited Note'
      expect(page).to have_content 'New Note Title'
    end
  end
end    
