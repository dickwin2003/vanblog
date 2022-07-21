import MarkdownNavbar from "markdown-navbar";
import { useEffect } from "react";
import Headroom from "headroom.js";
import scroll from "react-scroll";
export default function (props: { content: string }) {
  useEffect(() => {
    const el = document.querySelector("#author-card");
    if (el) {
      const headroom = new Headroom(el, {
        classes: {
          initial: "side-bar",
          pinned: "side-bar-pinned",
          unpinned: "side-bar-unpinned",
          top: "side-bar-top",
          notTop: "side-bar-not-top",
        },
      });
      headroom.init();
    }
  });
  return (
    <div className="fixed" id="author-card">
      <div
        id="toc-container"
        className="bg-white w-60 card-shadow dark:card-shadow-dark ml-2 dark:bg-dark overflow-y-auto"
        style={{ maxHeight: 450 }}
      >
        <MarkdownNavbar
          updateHashAuto={true}
          source={props.content}
          headingTopOffset={56}
          onHashChange={(newHash, oldHash) => {
            // 判断一下当前激活的元素
            const el = document.querySelector(
              ".markdown-navigation div.active"
            );

            let to = (el as any)?.offsetTop;
            // console.log(to);

            if (to) {
              if (newHash < oldHash) {
                to = to - 100;
              }
              scroll.animateScroll.scrollTo(to, {
                containerId: "toc-container",
                smooth: true,
                delay: 0,
                spyThrottle: 0,
              });
            }
            // console.log(newHash, oldHash, el);
          }}
        />
      </div>
    </div>
  );
}
