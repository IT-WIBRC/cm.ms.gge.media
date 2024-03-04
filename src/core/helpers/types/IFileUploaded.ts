export interface IFileUploaded  {
    name: string;
    data: Buffer;
    mimetype: string;
    size: number;
    encoding?: string;
}