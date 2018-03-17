export interface IPhoto {
    id: string;
    Url: string;
    Blob: string;
    CreatedBy: string;
    CreatedDate: Date;
    DataSource: string;
    FileName: string;
    FileType: string;
};
export class Photo implements IPhoto {
    id: string;
    Url: string;
    Blob: string;
    CreatedBy: string;
    CreatedDate: Date;
    DataSource: string;
    FileName: string;
    FileType: string;
    constructor(photo?: any) {
        this.id = photo && photo.id || '';
        this.Blob = photo && photo.Blob || '';
        this.CreatedBy = photo && photo.CreatedBy || '';
        this.CreatedDate = photo && photo.CreatedDate || null;
        this.Url = photo && photo.Url || '';

        this.DataSource = photo && photo.DataSource || '';
        this.FileName = photo && photo.FileName || '';
        this.FileType = photo && photo.FileType || '';
    }
};