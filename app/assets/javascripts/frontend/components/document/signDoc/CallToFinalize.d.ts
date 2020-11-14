/// <reference types="react" />
declare type CallToFinalizeProps = {
    docId: string;
    allCFsAreSigned: boolean;
    isOwner: boolean;
};
declare const CallToFinalize: ({ docId, allCFsAreSigned, isOwner, }: CallToFinalizeProps) => JSX.Element;
export default CallToFinalize;
