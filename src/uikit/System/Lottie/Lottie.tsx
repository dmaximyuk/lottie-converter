import style from "./LottieWeb.module.css";

import {
  useEffect,
  useMemo,
  useRef,
  type AllHTMLAttributes,
  type FC,
} from "react";
import { unzlib } from "fflate";

import lottie from "lottie-web/build/player/lottie_light";

interface LottieWeb extends AllHTMLAttributes<HTMLDivElement> {
  animationData: string;
  loop?: boolean;
  autoplay?: boolean;
  size?: number;
  onEndLoad: () => void;
}

const cache = new Map<string, any>();

export const LottieWeb: FC<LottieWeb> = (props) => {
  const refContainer = useRef<HTMLDivElement>(null);

  const fetchAndDecodeLottie = async (url: string): Promise<any> => {
    try {
      const dataCache = cache.get(url);
      if (dataCache) {
        return dataCache;
      }

      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const compressedData = new Uint8Array(arrayBuffer);

      try {
        const parsedJson = await new Promise((resolve, reject) => {
          unzlib(compressedData, (err, _decode) => {
            if (err) {
              return reject(err);
            }

            const jsonString = new TextDecoder("utf-8").decode(_decode);

            resolve(JSON.parse(jsonString));
          });
        });

        cache.set(url, parsedJson);

        return parsedJson;
      } catch (error) {
        console.error("Error encode zlib lottie:", error);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!props?.animationData && !refContainer?.current) return;

    const animation = (async () =>
      await fetchAndDecodeLottie(props.animationData))();
    // if (props.animationData.includes("lightning.xyz")) {
    //   console.log(animation)
    // }

    if (animation && refContainer?.current) {
      lottie.loadAnimation({
        container: refContainer.current,
        animationData: animation,
        loop: true,
        autoplay: props.autoplay ?? true,
        renderer: "svg",
        name: props.animationData,
      });
      props.onEndLoad();
    }

    return () => {
      lottie.destroy(props.animationData);
    };
  }, [refContainer]);

  return (
    <div
      ref={refContainer}
      style={{
        width: props.size + "px",
        height: props.size + "px",
      }}
    />
  );
};
