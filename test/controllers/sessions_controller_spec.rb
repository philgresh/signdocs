require 'rails_helper'

RSpec.describe SessionsController, type: :controller do
  let!(:user) { User.create({ email: 'jack_bruce@bruce.com', password: 'abcdef' }) }

  describe 'GET #new' do
    it 'renders the new session template' do
      get :new
      expect(response).to render_template(:new)
    end
  end

  describe 'POST #create' do
    context 'with invalid credentials' do
      it 'stores an error and returns to sign in with an non-existent user' do
        post :create, params: { user: { email: 'new_person@person.com', password: 'abcdef' } }
        expect(flash[:errors]).to eq(['Invalid email or password'])
        expect(response).to render_template(:new)
      end

      it 'returns to sign in on bad password' do
        post :create, params: { user: { email: 'jack_bruce@bruce.com', password: 'notmypassword' } }
        expect(response).to render_template(:new)
      end
    end

    context 'with valid credentials' do
      it 'redirects user to users index on success' do
        post :create, params: { user: { email: 'jack_bruce@bruce.com', password: 'abcdef' } }
        expect(response).to redirect_to(users_url)
      end

      it 'logs in the user' do
        post :create, params: { user: { email: 'jack_bruce@bruce.com', password: 'abcdef' } }
        user = User.find_by(email: 'jack_bruce@bruce.com')

        expect(session[:session_token]).to eq(user.session_token)
      end
    end
  end

  describe 'DELETE #destroy' do
    context 'when logged in' do
      before(:each) do
        post :create, params: { user: { email: 'jack_bruce@bruce.com', password: 'abcdef' } }
        @session_token = User.find_by(email: 'jack_bruce@bruce.com').session_token
      end

      it 'logs out the current user' do
        delete :destroy
        expect(session[:session_token]).to be_nil

        jack = User.find_by(email: 'jack_bruce@bruce.com')
        expect(jack.session_token).not_to eq(@session_token)
      end
    end

    context 'when logged out' do
      before do
        allow(controller).to receive(:current_user) { nil }
      end

      it 'redirects to the login page' do
        delete :destroy
        expect(response).to redirect_to(new_session_url)
      end
    end
  end

end
