export const fromBufferToBase64 = (buffer: Buffer, mimetype: string): string =>
  `data:${mimetype};base64,${Buffer.from(buffer).toString("base64")}`;
