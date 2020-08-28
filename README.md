[Overview](#overview) | [Features](features) | [Stack](#stack-used) | [Wiki](https://github.com/philgresh/signdocs/wiki)

### Overview
**[SignDocs](signdocs.herokuapp.com/)** allows users to digitally sign documents, send those documents to others for signature, and track who has not yet signed. A user can create a digital representation of their signature by either using a selection of fonts or by using a trackpad/mouse. To prepare a document for signatures, users can upload a PDF or Word document and then drag and drop different types of fields onto the document for their signatories to fill out. They can then route the document directly to their signatories' email and track completion.

### Features
#### Signature development
A signature is an expression of one's personality, and demands more than choosing a dry sans-serif font to make their mark. SignDocs gives users a more diverse collection of typefaces to choose from. Alternatively, users can draw their signature directly by using a mouse or trackpad.

#### Document preparation
After uploading a document and adding signatories, users can drag-and-drop content fields onto the document which will later be filled with signatories' personal information. This can be their signature or text, such as the current date or their name. The content fields are assigned to specific users, so only they can fill out that information. Once they've reviewed the document, signatories can simply click the Sign button and apply their signature, and the document owner will be notified.

### Stack used
#### Backend
 - Ruby on Rails (5.2.3)
 - PostgreSQL DB
 - AWS S3 (document and image storage)
 - AWS Key Management Service (cryptographic public key repository)
 #### Frontend
 - React with Redux
 
 #### Select libraries used
 
 - [react-pdf](https://github.com/wojtekmaj/react-pdf) for displaying PDF files
 - [react-dnd](https://react-dnd.github.io/react-dnd/about) for drag-and-drop functionality
 - [react-select](https://react-select.com/home) for beautiful and functional select inputs
 - [AWS KMS SDK](https://docs.aws.amazon.com/sdk-for-ruby/v2/api/Aws/KMS/Client.html#create_key-instance_method) to create public keys
 - [react-svgmt](https://hugozap.github.io/react-svgmt/) for loading remote SVGs
 - [react-signature-canvas](https://github.com/agilgur5/react-signature-canvas) to allow custom signatures
 - [zxcvbn](https://github.com/dropbox/zxcvbn) for password-strength feedback

