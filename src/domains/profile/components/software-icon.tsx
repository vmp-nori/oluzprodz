import Image from "next/image";

type SoftwareIconProps = {
  tone: string;
};

const officialIcons: Record<string, string> = {
  premiere:
    "https://main--cc--adobecom.aem.live/cc-shared/assets/img/product-icons/svg/premiere-pro-40.svg",
  "after-effects":
    "https://main--cc--adobecom.aem.live/cc-shared/assets/img/product-icons/svg/after-effects-40.svg",
  lightroom:
    "https://main--cc--adobecom.aem.live/cc-shared/assets/img/product-icons/svg/lightroom.svg",
  capcut:
    "https://lf16-web-buz.capcut.com/obj/capcut-web-buz-sg/common/images/lv_web-2.ico",
  "final-cut":
    "https://cdsassets.apple.com/live/7WUAS350/images/pro-apps/app-icon-final-cut-pro-otp.png",
};

export function SoftwareIcon({ tone }: SoftwareIconProps) {
  return (
    <Image
      alt=""
      aria-hidden="true"
      height={64}
      src={officialIcons[tone]}
      unoptimized
      width={64}
    />
  );
}
