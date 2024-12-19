import "./LottieWeb.sass";

import { useEffect, useRef, useState, type FC } from "react";

import { inflate } from "fflate";
import lottie from "lottie-web/build/player/lottie_light";

/**
 * Props for the LottieWeb component.
 * @property {Uint8Array} animationData - Compressed animation data (zlib format).
 * @property {boolean} [loop=true] - Whether the animation should loop.
 * @property {boolean} [autoplay=true] - Whether the animation should autoplay.
 * @property {number} [size=100] - Width and height of the animation container in pixels.
 */
interface LottieWebProps {
  animationData: Uint8Array;
  loop?: boolean;
  autoplay?: boolean;
  size?: number;
}

/**
 * Lightweight Lottie animation player component.
 * @param {LottieWebProps} props - Component properties.
 */
const LottieWeb: FC<LottieWebProps> = ({
  animationData,
  loop = true,
  autoplay = true,
  size = 100,
}) => {
  const refContainer = useRef<HTMLDivElement>(null);
  const isInitialized = useRef<boolean>(false);
  const [isMounted, setIsMounted] = useState(false);

  /**
   * Decompresses and parses the animation data.
   * @param {Uint8Array} compressedData - Compressed animation data.
   * @returns {Promise<any>} Parsed animation JSON.
   */
  const decompressAnimation = (compressedData: Uint8Array): Promise<any> =>
    /**
     * Important!
     * You will initially have string/etc in `compressedData`.
     * You will need to convert from string/etc to Uint8Array!!!
     */
    new Promise((resolve, reject) => {
      inflate(compressedData, (err, decompressedData) => {
        if (err) {
          reject(err);
        } else {
          try {
            const jsonString = new TextDecoder("utf-8").decode(
              decompressedData,
            );
            resolve(JSON.parse(jsonString));
          } catch (parseError) {
            reject(parseError);
          }
        }
      });
    });

  useEffect(() => {
    let isEffectActive = true;

    if (!animationData || !refContainer.current || isMounted) return;

    const loadAnimation = async () => {
      try {
        const animation = await decompressAnimation(animationData);
        lottie.loadAnimation({
          container: refContainer.current!,
          animationData: animation,
          loop,
          autoplay,
          renderer: "svg",
        });
        setIsMounted(true);
      } catch (error) {
        console.error("Failed to load animation:", error);
      }
    };

    loadAnimation();

    return () => {
      lottie.destroy();
      isInitialized.current = false;
      isEffectActive = false;
    };
  }, [animationData, loop, autoplay, isMounted]);

  return (
    <div
      ref={refContainer}
      className="LottieWeb"
      style={{ width: `${size}px`, height: `${size}px` }}
    />
  );
};

export default LottieWeb;
