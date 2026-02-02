"use client";

import {
  SharedLayout,
  SharedLayoutCard,
  SharedLayoutCardModal,
  SharedLayoutCardModalContent,
  SharedLayoutCardModalOverlay,
  SharedLayoutContent,
} from "@/components/ui/shared-layout";

function MotionSharedLayout() {
  return (
    <div className="px-2">
      <SharedLayout>
        <SharedLayoutContent className="mx-auto relative max-w-[500px] w-full h-[350px] p-7 grid grid-cols-2 md:grid-cols-3 gap-5 border rounded-4xl">
          {CARD_ITEMS.map((item) => (
            <SharedLayoutCard
              key={`layout-card-${item.title}`}
              layoutId={`card-${item.title}`}
              item={item}
              className="first:hidden first:md:flex nth-of-type-[4]:hidden nth-of-type-[4]:md:flex"
              style={{ borderRadius: 14 }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="size-full object-cover"
              />
            </SharedLayoutCard>
          ))}
        </SharedLayoutContent>

        <SharedLayoutCardModalOverlay />
        <SharedLayoutCardModal<TCard>>
          {(activeCard) => (
            <SharedLayoutCardModalContent
              layoutId={`card-${activeCard.title}`}
              style={{ borderRadius: 24 }}
            >
              <img
                src={activeCard.image}
                alt={activeCard.title}
                className="max-h-[calc(100vh-100px)] object-cover"
              />
            </SharedLayoutCardModalContent>
          )}
        </SharedLayoutCardModal>
      </SharedLayout>
    </div>
  );
}

type TCard = { title: string; image: string };

const CARD_ITEMS: Array<TCard> = [
  {
    title: "japan day 1",
    image:
      "https://images.unsplash.com/photo-1767818375174-0e3dede087c9?q=80&w=882&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "japan day 2",
    image:
      "https://images.unsplash.com/photo-1639054514127-cdf1a4a13416?q=80&w=1365&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "japan day 3",
    image:
      "https://images.unsplash.com/photo-1564284369929-026ba231f89b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "japan day 4",
    image:
      "https://images.unsplash.com/photo-1561503972-839d0c56de17?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "japan day 5",
    image:
      "https://images.unsplash.com/photo-1525230071276-4a87f42f469e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "japan day 6",
    image:
      "https://images.unsplash.com/photo-1621139151681-5ac8d73128ce?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export { MotionSharedLayout };
