"use client";

import Image, { type ImageLoader } from "next/image";
import { useState } from "react";

interface CustomImageProps {
  src: string | null | undefined;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loader?: ImageLoader;
  fallback?: string;
}

const CustomImage: React.FC<CustomImageProps> = ({
  src,
  alt,
  loader,
  width = 500,
  height = 500,
  className,
  fallback = "/favicon.ico",
}) => {
  const [imgSrc, setImgSrc] = useState(() => {
    if (src) {
      return src;
    }
    return fallback;
  });

  console.log(src);

  return (
    <Image
      loader={loader}
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() => setImgSrc(fallback)} // chemin de l'image de fallback
    />
  );
};

export default CustomImage;
