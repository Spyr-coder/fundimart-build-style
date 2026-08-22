/**
 * High-resolution construction fallback photos hosted on Unsplash CDN.
 */
export const CATEGORY_FALLBACKS: Record<string, string> = {
  Cement: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80",
  Steel: "https://images.unsplash.com/photo-1535813547-99c456a41d4a?auto=format&fit=crop&w=800&q=80",
  Roofing: "https://images.unsplash.com/photo-1628744876497-eb30460be9f6?auto=format&fit=crop&w=800&q=80",
  Timber: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
  Tools: "https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?auto=format&fit=crop&w=800&q=80",
  Electrical: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
  Plumbing: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800&q=80",
  Default: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80",
};

/**
 * Returns a valid image URL for a product based on uploaded photos, product category, or name.
 */
export const getProductImage = (
  image?: string,
  category?: string,
  name?: string
): string => {
  if (image && image.trim() !== "" && !image.includes("placeholder")) {
    return image;
  }

  if (category && CATEGORY_FALLBACKS[category]) {
    return CATEGORY_FALLBACKS[category];
  }

  // Attempt keyword match based on product name
  if (name) {
    const lowerName = name.toLowerCase();
    for (const [key, url] of Object.entries(CATEGORY_FALLBACKS)) {
      if (lowerName.includes(key.toLowerCase())) {
        return url;
      }
    }
  }

  return CATEGORY_FALLBACKS.Default;
};

/**
 * Generates a clean avatar badge for a seller or hardware store using UI Avatars API.
 */
export const getSellerBadge = (hardwareName?: string): string => {
  const name = encodeURIComponent(hardwareName || "Hardware Store");
  return `https://ui-avatars.com/api/?name=${name}&background=0F172A&color=38BDF8&bold=true&size=128`;
};

/**
 * Compresses File objects or raw Base64 strings to optimized JPEG Data URLs.
 * Shrinks 3MB+ raw uploads down to ~100–150KB to protect database & localStorage quotas.
 */
export const compressImageFile = (
  input: File | string,
  maxWidth = 1000,
  quality = 0.7
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const processDataUrl = (dataUrl: string) => {
      const img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);

        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = (error) => reject(error);
    };

    if (typeof input === "string") {
      processDataUrl(input);
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(input);
      reader.onload = (event) => {
        if (event.target?.result) {
          processDataUrl(event.target.result as string);
        } else {
          reject(new Error("Failed to read image file."));
        }
      };
      reader.onerror = (error) => reject(error);
    }
  });
};