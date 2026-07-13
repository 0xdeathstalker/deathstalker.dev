"use client";

import { MessageCircle } from "lucide-react";
import {
  DialogForm,
  DialogFormContent,
  DialogFormError,
  DialogFormFooter,
  DialogFormModal,
  DialogFormSubmit,
  DialogFormTitle,
  DialogFormTitleLabel,
  DialogFormTrigger,
  DialogFormView,
} from "@/components/ui/dialog-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

function DialogFormModalDemo() {
  return (
    <div className="absolute bottom-2 right-2">
      <DialogFormModal>
        <DialogFormTrigger
          className={cn(
            "bg-mauve-100 h-9 px-4 border border-mauve-300",
            "enabled:active:translate-y-0.5 enabled:focus-visible:translate-y-0.5",
            "transition-[translate] ease-in-out",
          )}
          style={{ borderRadius: 12 }}
        >
          <DialogFormTitleLabel className="inline-flex items-center gap-2 leading-loose">
            <MessageCircle className="size-4" />
            Contact us
          </DialogFormTitleLabel>
        </DialogFormTrigger>

        <DialogFormContent
          className={cn(
            "absolute bottom-0 right-0 h-[250px] sm:h-[270px] w-[calc(100vw-5.7rem)] sm:w-lg",
            "bg-mauve-100 border border-mauve-300 overflow-hidden",
          )}
          style={{ borderRadius: 16 }}
        >
          <DialogFormTitle className="px-3 sm:px-4 py-1 sm:py-2.5">
            <DialogFormTitleLabel className="inline-flex items-center gap-2 leading-loose">
              <MessageCircle className="size-4" />
              Contact us
            </DialogFormTitleLabel>
          </DialogFormTitle>

          <DialogFormView success={<SuccessComponent />}>
            <DialogForm
              className="px-2.5 sm:px-4 space-y-1"
              action={async (formData) => {
                // demo stub: pretend to send, fail when the message is empty
                await new Promise((resolve) => setTimeout(resolve, 3000));
                if (!formData.get("message")) {
                  throw new Error("Message cannot be empty.");
                }
              }}
            >
              <FormInputs />
            </DialogForm>

            <DialogFormFooter className="px-2.5 sm:px-4 pt-2.5 pb-1 sm:b-3.5 flex items-center justify-between">
              <DialogFormError className="text-sm text-red-500" />
              <DialogFormSubmit
                className="w-24 h-9 rounded-lg"
                spinner={
                  <Spinner
                    size={14}
                    color="rgba(255, 255, 255, 0.65)"
                  />
                }
              >
                Submit
              </DialogFormSubmit>
            </DialogFormFooter>
          </DialogFormView>
        </DialogFormContent>
      </DialogFormModal>
    </div>
  );
}

function FormInputs() {
  return (
    <>
      <div className="flex items-center gap-2 sm:gap-4">
        <div>
          <label
            htmlFor="name-composed"
            className="ml-0.5 text-xs text-muted-foreground"
          >
            Name
          </label>
          <Input
            id="name-composed"
            name="name"
            type="text"
            autoComplete="off"
            className="bg-mauve-50 border border-mauve-300"
          />
        </div>
        <div>
          <label
            htmlFor="email-composed"
            className="ml-0.5 text-xs text-muted-foreground"
          >
            Email
          </label>
          <Input
            id="email-composed"
            name="email"
            type="email"
            autoComplete="off"
            className="bg-mauve-50 border border-mauve-300"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="message-composed"
          className="ml-0.5 text-xs text-muted-foreground"
        >
          Message
        </label>
        <Textarea
          id="message-composed"
          name="message"
          rows={5}
          autoComplete="off"
          className="bg-mauve-50 border border-mauve-300"
        />
      </div>
    </>
  );
}

function SuccessComponent() {
  return (
    <div className="h-[270px] flex flex-col items-center justify-center gap-3">
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="size-16"
      >
        <path
          d="M27.6 16C27.6 17.5234 27.3 19.0318 26.717 20.4392C26.1341 21.8465 25.2796 23.1253 24.2025 24.2025C23.1253 25.2796 21.8465 26.1341 20.4392 26.717C19.0318 27.3 17.5234 27.6 16 27.6C14.4767 27.6 12.9683 27.3 11.5609 26.717C10.1535 26.1341 8.87475 25.2796 7.79759 24.2025C6.72043 23.1253 5.86598 21.8465 5.28302 20.4392C4.70007 19.0318 4.40002 17.5234 4.40002 16C4.40002 12.9235 5.62216 9.97301 7.79759 7.79759C9.97301 5.62216 12.9235 4.40002 16 4.40002C19.0765 4.40002 22.027 5.62216 24.2025 7.79759C26.3779 9.97301 27.6 12.9235 27.6 16Z"
          fill="#a89ea9"
          fillOpacity="0.16"
        />
        <path
          d="M12.1334 16.9667L15.0334 19.8667L19.8667 13.1M27.6 16C27.6 17.5234 27.3 19.0318 26.717 20.4392C26.1341 21.8465 25.2796 23.1253 24.2025 24.2025C23.1253 25.2796 21.8465 26.1341 20.4392 26.717C19.0318 27.3 17.5234 27.6 16 27.6C14.4767 27.6 12.9683 27.3 11.5609 26.717C10.1535 26.1341 8.87475 25.2796 7.79759 24.2025C6.72043 23.1253 5.86598 21.8465 5.28302 20.4392C4.70007 19.0318 4.40002 17.5234 4.40002 16C4.40002 12.9235 5.62216 9.97301 7.79759 7.79759C9.97301 5.62216 12.9235 4.40002 16 4.40002C19.0765 4.40002 22.027 5.62216 24.2025 7.79759C26.3779 9.97301 27.6 12.9235 27.6 16Z"
          stroke="#79697b"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="flex flex-col items-center justify-center gap-1 text-center">
        <h3 className="text-lg font-medium">Message Sent</h3>
        <p className="text-sm text-muted-foreground">Thanks for reaching out. We'll be in touch soon.</p>
      </div>
    </div>
  );
}

const bars = Array(12).fill(0);

function Spinner({ color, size = 20 }: { color?: string; size?: number }) {
  return (
    <div
      className="relative"
      style={{ width: size, height: size, color }}
    >
      <div className="relative top-1/2 left-1/2 size-full">
        {bars.map((_, i) => (
          <div
            key={`spinner-bar-${`${i + 1}`}`}
            className="absolute -left-[10%] -top-[3.9%] h-[8%] w-[24%] rounded-md bg-current animate-[spinner-fade_1.2s_linear_infinite]"
            style={{
              animationDelay: `${-1.2 + i * 0.1}s`,
              transform: `rotate(${i * 30}deg) translate(146%)`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export { DialogFormModalDemo };
