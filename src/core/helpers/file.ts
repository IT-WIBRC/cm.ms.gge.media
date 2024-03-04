export const fromBufferToCustomBase64 = (buffer: Buffer, mimetype: string): string => {
   return `data:${mimetype};base64,${Buffer.from(buffer).toString("base64")}`;
};