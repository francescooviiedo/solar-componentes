const DOCX_MIME = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

export function toBase64(file: File): Promise<string> {
  const isDocx = file.type === DOCX_MIME || file.name.toLowerCase().endsWith(".docx");

  if (!isDocx) {
    return Promise.reject(new Error("Only .docx files are supported."));
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = () => reject(new Error("Failed to read file."));
    reader.onload = () => {
      const result = reader.result;
      if (typeof result !== "string") {
        reject(new Error("Unexpected file reader result."));
        return;
      }

      const commaIndex = result.indexOf(",");
      const base64 = commaIndex >= 0 ? result.slice(commaIndex + 1) : result;
      resolve(base64);
    };

    reader.readAsDataURL(file);
  });
}
