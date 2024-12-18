import "./HowToUse.sass";

import { type FC } from "react";
import { useTranslation } from "i18nano";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import { Page } from "components";
import { Text, Title, Caption, Button, Flex } from "uikit";

import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { IconCopy } from "assets/icons";

interface HowToUseProps {}

const lottiWebCode = `import "./LottieWeb.sass";

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
export const LottieWeb: FC<LottieWebProps> = ({
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
      style={{ width: \`\${size}px\`, height: \`\${size}px\` }}
    />
  );
};`;

const HowToUse: FC<HowToUseProps> = () => {
  const t = useTranslation();

  const handleCopy = () => {
    navigator.clipboard.writeText(lottiWebCode);
  };

  return (
    <Page className="HowToUse" containerClassName="HowToUse__container">
      <Title weight="1" Component="h1">
        {t("howToUse.title")}
      </Title>
      <a
        href="https://github.com/dmaximyuk/zloottie/blob/master/src/uikit/Service/LottieWeb/LottieWeb.tsx"
        target="_blank"
      >
        <Caption>{t("howToUse.openInGitHub")}</Caption>
      </a>
      <Text>{t("howToUse.subtitle")}</Text>
      <Text>{t("howToUse.text")}</Text>
      <ol>
        {Array.from(Array(3), (_, i) => {
          return (
            <li key={`how-to-use-usages-${i}`}>
              <Text>{t(`howToUse.usages.${i}`)}</Text>
            </li>
          );
        })}
      </ol>

      <div className="HowToUse__code">
        <Flex
          className="HowToUse__code-header"
          horizontal="space-between"
          vertical="center"
        >
          <Caption weight="2">LottiWeb.tsx</Caption>
          <Button isSquare type="accent" size="s" onClick={handleCopy}>
            <IconCopy width={20} height={20} color="var(--background)" />
          </Button>
        </Flex>
        <SyntaxHighlighter language="tsx" style={vscDarkPlus}>
          {lottiWebCode}
        </SyntaxHighlighter>
      </div>
    </Page>
  );
};

export default HowToUse;
