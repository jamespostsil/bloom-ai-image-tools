export type ImageDimensions = {
  width: number;
  height: number;
};

const DEFAULT_DIMENSIONS: ImageDimensions = { width: 0, height: 0 };

export const getImageDimensions = (
  source: string | null | undefined
): Promise<ImageDimensions> => {
  if (!source || typeof Image === "undefined") {
    return Promise.resolve(DEFAULT_DIMENSIONS);
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = () => {
      resolve(DEFAULT_DIMENSIONS);
    };
    img.src = source;
  });
};

export const blobToBase64 = (blob: Blob): Promise<string> => {
  if (typeof FileReader === "undefined") {
    return Promise.reject(new Error("FileReader is not supported"));
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve((reader.result as string) ?? "");
    reader.onerror = () => {
      reject(reader.error ?? new Error("Failed to convert blob to data URL"));
    };
    reader.readAsDataURL(blob);
  });
};

export const getMimeTypeFromUrl = (
  dataUrl: string | null | undefined
): string | null => {
  if (!dataUrl) return null;
  const match = dataUrl.match(/^data:(image\/[a-z0-9.+-]+);/i);
  return match ? match[1].toLowerCase() : null;
};

export type PreparedImageBlob = {
  dataUrl: string;
  mimeType: string | null;
  dimensions: ImageDimensions;
};

export const prepareImageBlob = async (
  blob: Blob
): Promise<PreparedImageBlob> => {
  const dataUrl = await blobToBase64(blob);
  const mimeType = blob.type || getMimeTypeFromUrl(dataUrl);
  const dimensions = await getImageDimensions(dataUrl);
  return { dataUrl, mimeType, dimensions };
};
export const detectImageShape = (dimensions: ImageDimensions): string => {
  const { width, height } = dimensions;
  if (!width || !height) return "Square";
  const ratio = width / height;
  if (ratio > 1.2) return "Landscape Rectangle";
  if (ratio < 0.8) return "Portrait Rectangle";
  return "Square";
};

export const detectImageSize = (dimensions: ImageDimensions): string => {
  const maxDim = Math.max(dimensions.width, dimensions.height);
  if (maxDim > 3000) return "4k";
  if (maxDim > 1500) return "2k";
  return "1k";
};
