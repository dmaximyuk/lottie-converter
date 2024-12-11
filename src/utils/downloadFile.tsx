export const downloadFile = (
  data: Uint8Array,
  name: string,
  ext: "zlottie" | "json",
) => {
  const blob = new Blob([data], { type: "application/octet-stream" });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${name}.${ext}`;
  link.click();
};
