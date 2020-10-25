declare enum CFTypes {
    UNFILLED_TEXT = "UNFILLED_TEXT",
    UNFILLED_SIGNATURE = "UNFILLED_SIGNATURE",
    FILLED_TEXT = "FILLED_TEXT",
    FILLED_SIGNATURE = "FILLED_SIGNATURE"
}
export declare interface CFProps {
    id: string;
    docId: string;
    contentableId: string;
    contentableType: string;
    signatoryId: string;
    placeholder?: string;
    type: CFTypes;
    bbox: {
        x: number;
        y: number;
        widthPct: number;
        aspectRatio: number;
        page: number;
    };
    body?: string;
}
export declare interface DocProps {
    id: string;
    title: string;
    description?: string;
    fileUrl: string;
    downloadUrl: string;
    ownerId: string;
    editorIds: string[];
    updatedAt: string;
    status: string;
    previewImageUrl: string;
    contentFieldsCount?: number;
}
export declare interface UserProps {
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    sigId: string;
}
export declare interface SigProps {
    id: string;
    userId: string;
    pubKeyFingerprint: string;
    imageUrl: string;
}
export {};
