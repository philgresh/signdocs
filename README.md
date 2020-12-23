![Splash banner](https://user-images.githubusercontent.com/46543327/91600157-530df080-e91c-11ea-85d2-0b7e10247dfb.png)

[Overview](#overview) | [Features](features) | [Stack](#stack-used) | [Wiki](https://github.com/philgresh/signdocs/wiki) | [Styling](#styling)

## Overview
**[SignDocs](https://signdocs.herokuapp.com/)** allows users to digitally sign documents, send those documents to others for signature, and track who has not yet signed. A user can create a digital representation of their signature by either using a selection of fonts or by using a trackpad/mouse. To prepare a document for signatures, users can upload a PDF or Word document and then drag and drop different types of fields onto the document for their signatories to fill out. They can then route the document directly to their signatories' email and track completion.

## Features
### Signature development
#### Choose your style
A signature is an expression of one's personality, and demands more than choosing a dry sans-serif font to make their mark. SignDocs gives users a more diverse collection of typefaces to choose from to add a personal touch.

![Customize signature 1](https://user-images.githubusercontent.com/46543327/91599858-c9f6b980-e91b-11ea-9903-5a737bc33ca6.png)

#### Write your own autograph
Alternatively, users can draw their signature directly by using a mouse or trackpad.

![Customize signature 2](https://user-images.githubusercontent.com/46543327/91599909-e266d400-e91b-11ea-9bac-9de9957b3537.png)

### Document preparation
After uploading a document and adding signatories, users can drag-and-drop content fields onto the document which will later be filled with signatories' personal information. This can be their signature or text, such as the current date or their name. The content fields are assigned to specific users, so only they can fill out that information. Once they've reviewed the document, signatories can simply click the Sign button and apply their signature, and the document owner will be notified.

![Document Preparation](https://user-images.githubusercontent.com/46543327/103044360-130af300-4535-11eb-951b-101fc3b33a97.png)

## Stack used
### Backend
 - Ruby on Rails (5.2.3)
 - PostgreSQL DB
 - AWS S3 (document and image storage)

 ### Frontend
 - React with Redux for local state management
 
 ### Select libraries used
 
 - [react-pdf](https://github.com/wojtekmaj/react-pdf) for displaying PDF files
 - [react-dnd](https://react-dnd.github.io/react-dnd/about) for drag-and-drop functionality
 - [react-select](https://react-select.com/home) for beautiful and functional select inputs
 - [AWS KMS SDK](https://docs.aws.amazon.com/sdk-for-ruby/v2/api/Aws/KMS/Client.html#create_key-instance_method) to create public keys
 - [react-svgmt](https://hugozap.github.io/react-svgmt/) for loading remote SVGs
 - [react-signature-canvas](https://github.com/agilgur5/react-signature-canvas) to allow custom signatures
 - [zxcvbn](https://github.com/dropbox/zxcvbn) for password-strength feedback

## Styling
### A little elevation
Users want to immediately know what surfaces they can interact with. A small elevation change makes all the difference. Inspired by [Material Design](https://material.io/).
### Lower contrast, more whitespace
Black text on a white background can be too harsh. SignDocs takes inspiration from [this NSFW website](http://bettermotherfuckingwebsite.com/) and sets the background color to an off-white, and main text to a very dark blue. Hover states are demure, enough to show a reaction without shocking.
