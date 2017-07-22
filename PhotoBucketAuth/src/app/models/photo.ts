import { FirebaseFlatSnapshot } from "./firebase-flat-snapshot";

export class Photo extends FirebaseFlatSnapshot {
    public caption: string;
    public imageUrl: string;
    public uid: string;

    constructor(obj?: any) {
        super(obj);
        this.caption = obj && obj.caption || "";
        this.imageUrl = obj && obj.imageUrl || "";
        this.uid = obj && obj.uid || "";
    }
}