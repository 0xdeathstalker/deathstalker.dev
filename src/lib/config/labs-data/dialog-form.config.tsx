import { DialogFormModalDemo } from "@/components/labs/demo/dialog-form.demo";
import { Code } from "@/components/ui/code";
import { CodeBlock } from "@/components/ui/code-block";
import { InlineLink } from "@/components/ui/inline-link";

function getUsageSnippet() {
  return `{/* consumer decides where the widget lives on the page */}
<div className="absolute bottom-2 right-2">
  <DialogFormModal>
    <DialogFormTrigger>
      <DialogFormTitleLabel>Contact us</DialogFormTitleLabel>
    </DialogFormTrigger>

    {/* pins the panel's corner to the trigger's corner */}
    <DialogFormContent className="absolute bottom-0 right-0">
      <DialogFormTitle>
        <DialogFormTitleLabel>Contact us</DialogFormTitleLabel>
      </DialogFormTitle>

      <DialogFormView success={<SuccessComponent />}>
        <DialogForm action={async (formData) => await send(formData)}>
          {/* inputs */}
        </DialogForm>
        <DialogFormFooter>
          <DialogFormError />
          <DialogFormSubmit spinner={<Spinner />}>Submit</DialogFormSubmit>
        </DialogFormFooter>
      </DialogFormView>
    </DialogFormContent>
  </DialogFormModal>
</div>`;
}

function getActionSnippet() {
  return `// action drives the built-in state machine:
// idle -> submitting -> success | error
<DialogForm
  action={async (formData) => {
    await api.send(formData); // throw = error state
  }}
/>`;
}

const dialogFormConfig = {
  slug: "dialog-form",
  title: "dialog form modal",
  subHeading: "an anchored feedback widget that morphs from a button into a form.",
  description: (
    <>
      <p>
        a composable dialog form inspired by the feedback widget from{" "}
        <InlineLink href="https://x.com/emilkowalski">@emilkowalski</InlineLink>, built on{" "}
        <InlineLink href="https://base-ui.com">base ui</InlineLink> dialog primitives and{" "}
        <InlineLink href="https://motion.dev">motion</InlineLink>. the trigger button morphs into the form panel using a
        shared <Code>layoutId</Code>, so the pill and the panel feel like one continuous surface instead of a button
        opening a separate modal.
      </p>
      <p>
        unlike a centered dialog, this one is non-modal and anchored. the root renders a <Code>relative</Code> anchor
        wrapper that doubles as the portal container, so the panel can be corner-pinned to the trigger with plain
        absolute positioning and the whole widget can live anywhere on the page.
      </p>
      <CodeBlock
        language="tsx"
        code={getUsageSnippet()}
      />
      <p>
        the morph works because the trigger stays mounted while the popup mounts with the same <Code>layoutId</Code> .
        motion promotes the popup to lead and hides the trigger automatically. base ui contributes the unglamorous
        parts: focus management, escape/outside-click dismissal and aria wiring, merged onto motion elements through the{" "}
        <Code>render</Code> prop.
      </p>
      <p>
        submission runs through an <Code>action</Code> prop that receives <Code>FormData</Code> and drives an internal
        status machine. on success, <Code>DialogFormView</Code> swaps the form for a consumer-provided success
        component.
      </p>
      <CodeBlock
        language="tsx"
        code={getActionSnippet()}
      />
    </>
  ),
  tech: "motion",
  video: "",
  component: DialogFormModalDemo,
};

export { dialogFormConfig };
