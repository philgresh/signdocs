require 'rails_helper'

RSpec.describe NotesController, type: :controller do
  let(:jack) { User.create!(email: 'jack_bruce@bruce.com', password: 'abcdef') }
  let(:jasmine) { User.create!(email: 'jasmine@jazzyjaz.com', password: 'abcdef') }
  let(:jasmine_note) { Note.create!(title: 'History Homework', description: 'make sure it\'s done by Friday', secret: 'false', user: jasmine) }

  before(:each) do
    allow_message_expectations_on_nil
  end

  describe 'POST #create' do

    before do
      allow(controller).to receive(:current_user) { jack }
    end

  # NOTE: for post requests, the user_id WILL be sent in the url, like so:
  # 'users/1/notes'
    it 'should route correctly' do 
      expect(:post => 'users/1/notes').to route_to(controller: 'notes', user_id: '1', action: 'create')
    end

    context 'when logged in' do
      context 'with invalid params' do
        it 'validates the presence of all columns and redirects to the user\'s show page' do
          post :create, params: { user_id: jasmine.id, note: { title: 'this is an invalid note', secret: 'false' } }
          expect(response).to redirect_to(user_url(jasmine.id))
          expect(flash[:errors]).to eq(["Description can't be blank"])
        end
      end

      context 'with valid params' do
        it 'creates the note and redirects to the user\'s show page' do
          post :create, params: {  user_id: jasmine.id, note: { title: 'Note to self', description: 'you got this', secret: 'true' } }
          expect(response).to redirect_to(user_url(jasmine.id))
          expect(Note.exists?(title: 'Note to self')).to be true
        end
      end
    end

    context 'when logged out' do
      before do
        allow(controller).to receive(:current_user) { nil }
      end

      it 'redirects to the login page' do
        post :create, params: { user_id: jasmine.id, note: { title: 'Another note to self', description: 'Climb that mountain of success!', secret: 'true' } }
        expect(response).to redirect_to(new_session_url)
      end
    end
  end

   describe "GET #edit" do
    context "when logged in" do
      before do
        allow(controller).to receive(:current_user) { jasmine }
      end

      it "renders the note edit page" do
        get :edit, params: {id: jasmine_note.id}
        expect(response).to render_template(:edit)
      end
    end

    context "when logged out" do
      before do
        allow(controller).to receive(:current_user) { nil }
      end

      it "redirects to the login page" do
        get :edit, params: {id: jasmine_note.id}
        expect(response).to redirect_to(new_session_url)
      end
    end
  end

  describe 'PATCH #update' do
    context 'when logged in as a different user' do
      before do
        allow(controller).to receive(:current_user) { jack }
      end

      it 'should not allow users to update another user\'s notes' do
        begin
          patch :update, params: { id: jasmine_note.id, note: { title: 'Jack\'s Note now!' }}
        rescue ActiveRecord::RecordNotFound
        end
        edited_note = Note.find(jasmine_note.id)
        expect(edited_note.title).not_to eq('Jack\'s Note now!')
      end

      it 'should store an error to display to the user later' do
        begin
          patch :update, params: { id: jasmine_note.id, note: { title: 'Jack\'s Note now!' }}
        rescue ActiveRecord::RecordNotFound
        end
        expect(flash[:errors]).to eq(['Something went wrong!'])
      end
    end

    context 'when logged in as the note\'s owner' do
      before do
        allow(controller).to receive(:current_user) { jasmine }
      end

      it 'updates the note and redirects to the current user\'s show page' do
        patch :update, params: { id: jasmine_note.id, note: { title: 'Updated Note Title!' }}
        expect(Note.exists?(title: 'Updated Note Title!')).to be true
        expect(response).to redirect_to(user_url(jasmine)) 
      end
    end

    context 'when logged out' do
      before do
        allow(controller).to receive(:current_user) { nil }
      end

      it 'redirects to the login page' do
        patch :update, params: { id: jasmine_note.id, note: { title: 'Updated Note Title!' }}
        expect(response).to redirect_to(new_session_url)
      end
    end
  end
end
