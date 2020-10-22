"use strict";
exports.__esModule = true;
var React = require("react");
var react_redux_1 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
var document_1 = require("../../../actions/document");
var CallToFinalize = function (_a) {
    var docId = _a.docId, allCFsAreSigned = _a.allCFsAreSigned, isOwner = _a.isOwner;
    var history = react_router_dom_1.useHistory();
    var dispatch = react_redux_1.useDispatch();
    var onClick = function (e) {
        e.preventDefault();
        dispatch(document_1.finalizeDocument(docId)).then(function (res) {
            if (res.document) {
                var _a = res.document, title = _a.title, fileUrl = _a.fileUrl;
                window.open(fileUrl, title + " - Final");
                history.push("/documents/" + docId);
            }
        });
    };
    return (React.createElement("div", { className: "call-to-finalize" },
        React.createElement("h2", null, "Congratulations!"),
        React.createElement("p", null, "All of your document's fields have been signed."),
        isOwner && allCFsAreSigned && (React.createElement("p", null,
            "Click\u00A0",
            React.createElement("button", { type: "button", onClick: onClick }, "here"),
            "\u00A0to finalize your document and have the completed version sent to your signatories."))));
};
exports["default"] = CallToFinalize;
