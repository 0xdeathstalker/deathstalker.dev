"use client";

import { Send } from "lucide-react";
import * as React from "react";
import {
  MessageForm,
  MessageInput,
  MessageInputButton,
  MessageInputPseudoMesage,
  MessageItem,
  MessagesContainer,
  MessagesList,
} from "@/components/ui/input-morph";

function IOSInputMorphText() {
  const [messages, setMessages] = React.useState<Array<{ id: number; text: string }>>([]);
  const [value, setValue] = React.useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (value.trim()) {
      const timestamp = Date.now();
      setMessages([...messages, { id: timestamp, text: value }]);
      setValue("");
    }
  }

  return (
    <div className="h-96 w-fit sm:w-full max-w-[500px] border border-mauve-200 rounded-lg bg-white">
      <MessagesContainer>
        <MessagesList>
          {messages.map((message) => (
            <MessageItem
              key={message.id}
              layoutId={`container-[${messages.length - 1}]`}
            >
              {message.text}
            </MessageItem>
          ))}
        </MessagesList>

        <div className="mt-4 flex w-full">
          <MessageForm onSubmit={handleSubmit}>
            <MessageInput
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="border-mauve-200 bg-taupe-100 placeholder:text-mauve-400"
            />

            <MessageInputPseudoMesage
              key={messages.length}
              layoutId={`container-[${messages.length}]`}
            >
              {value}
            </MessageInputPseudoMesage>

            <MessageInputButton disabled={!value}>
              <Send className="size-4" />
            </MessageInputButton>
          </MessageForm>
        </div>
      </MessagesContainer>
    </div>
  );
}

export { IOSInputMorphText };
