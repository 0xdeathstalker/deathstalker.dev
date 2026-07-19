"use client";

import {
  InlineCopyToast,
  InlineCopyToastContent,
  InlineCopyToastSuccess,
  InlineCopyToastTrigger,
} from "@/components/ui/inline-copy-toast";

function TwitterInlineCopy() {
  return (
    <InlineCopyToast
      value="@xdeathstalker"
      className="w-[210px] h-13 rounded-full"
    >
      <InlineCopyToastContent className="pl-5 pr-1.5">
        <span className="font-semibold text-mauve-400 select-none tracking-wide">@xdeathstalker</span>
        <InlineCopyToastTrigger className="size-10 rounded-full hover:bg-mauve-50">
          <CopyIcon className="size-4 text-mauve-600" />
        </InlineCopyToastTrigger>
      </InlineCopyToastContent>
      <InlineCopyToastSuccess role="status">
        <CheckCircle className="size-6 text-mauve-600" />
        <span className="font-semibold text-mauve-600">Username Copied!</span>
      </InlineCopyToastSuccess>
    </InlineCopyToast>
  );
}

function WalletAddressInlineCopy() {
  return (
    <InlineCopyToast
      value="0x8840BB0D5990161889388Ab0979EF2103cF0dAdF"
      className="w-[170px]"
    >
      <InlineCopyToastContent>
        <span className="font-semibold  select-none tracking-wide">0x884...0dAdF</span>
        <InlineCopyToastTrigger className="focus:scale-95 will-change-transform">
          <CopyIcon className="size-4 " />
        </InlineCopyToastTrigger>
      </InlineCopyToastContent>
      <InlineCopyToastSuccess>
        <CheckCircle className="size-5 " />
        <span className="font-semibold ">Address Copied!</span>
      </InlineCopyToastSuccess>
    </InlineCopyToast>
  );
}

function CheckCircle({ ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <title>Circle Check icon</title>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM15.774 10.1333C16.1237 9.70582 16.0607 9.0758 15.6332 8.72607C15.2058 8.37635 14.5758 8.43935 14.226 8.86679L10.4258 13.5116L9.20711 12.2929C8.81658 11.9024 8.18342 11.9024 7.79289 12.2929C7.40237 12.6834 7.40237 13.3166 7.79289 13.7071L9.79289 15.7071C9.99267 15.9069 10.2676 16.0129 10.5498 15.9988C10.832 15.9847 11.095 15.8519 11.274 15.6333L15.774 10.1333Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CopyIcon({ ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      color="currentColor"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9 15C9 12.1716 9 10.7574 9.87868 9.87868C10.7574 9 12.1716 9 15 9L16 9C18.8284 9 20.2426 9 21.1213 9.87868C22 10.7574 22 12.1716 22 15V16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H15C12.1716 22 10.7574 22 9.87868 21.1213C9 20.2426 9 18.8284 9 16L9 15Z"></path>
      <path d="M16.9999 9C16.9975 6.04291 16.9528 4.51121 16.092 3.46243C15.9258 3.25989 15.7401 3.07418 15.5376 2.90796C14.4312 2 12.7875 2 9.5 2C6.21252 2 4.56878 2 3.46243 2.90796C3.25989 3.07417 3.07418 3.25989 2.90796 3.46243C2 4.56878 2 6.21252 2 9.5C2 12.7875 2 14.4312 2.90796 15.5376C3.07417 15.7401 3.25989 15.9258 3.46243 16.092C4.51121 16.9528 6.04291 16.9975 9 16.9999"></path>
    </svg>
  );
}

export { TwitterInlineCopy, WalletAddressInlineCopy };
