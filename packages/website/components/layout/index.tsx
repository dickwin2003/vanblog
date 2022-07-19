import Head from "next/head";

import { getRunTimeOfDays } from "../../utils/getRunTile";
import BackToTopBtn from "../BackToTop";
import NavBar from "../NavBar";
import Viewer from "../Viewer";
import { slide as Menu } from "react-burger-menu";
import { useEffect, useState } from "react";
import Link from "next/link";
import BaiduAnalysis from "../baiduAnalysis";
import GaAnalysis from "../gaAnalysis";
export default function (props: {
  title: string;
  children: any;
  ipcNumber: string;
  since: Date;
  ipcHref: string;
  logo: string;
  categories: string[];
  sideBar: any;
  favicon: string;
  walineServerUrl: string;
  siteName: string;
  siteDesc: string;
  baiduAnalysisID: string;
  gaAnalysisID: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <BaiduAnalysis id={props.baiduAnalysisID}></BaiduAnalysis>
      <GaAnalysis id={props.gaAnalysisID}></GaAnalysis>
      <NavBar
        siteName={props.siteName}
        logo={props.logo}
        categories={props.categories}
        isOpen={isOpen}
        setOpen={setIsOpen}
      ></NavBar>
      <BackToTopBtn></BackToTopBtn>
      <div>
        <Menu
          disableAutoFocus={true}
          customCrossIcon={false}
          customBurgerIcon={false}
          isOpen={isOpen}
          onStateChange={(state) => {
            if (state.isOpen) {
              // 要打开
              document.body.style.overflow = "hidden";
            } else {
              document.body.style.overflow = "auto";
            }

            setIsOpen(state.isOpen);
          }}
        >
          <ul className=" sm:flex h-full items-center  text-sm text-gray-600 hidden divide-y divide-dashed dark:text-dark ">
            <li className="side-bar-item dark:border-dark-2 dark:hover:bg-dark-2">
              <Link href={"/"}>
                <a className="w-full inline-block">主页</a>
              </Link>
            </li>
            <li className="side-bar-item dark:border-dark-2 dark:hover:bg-dark-2">
              <Link href={"/tag"}>
                <a className="w-full inline-block">标签</a>
              </Link>
            </li>
            <li className="side-bar-item dark:border-dark-2 dark:hover:bg-dark-2">
              <Link href={"/category"}>
                <a className="w-full inline-block">分类</a>
              </Link>
            </li>
            <li className="side-bar-item dark:border-dark-2 dark:hover:bg-dark-2">
              <Link href={"/timeline"}>
                <a className="w-full inline-block">时间线</a>
              </Link>
            </li>
            <li className="side-bar-item dark:border-dark-2 dark:hover:bg-dark-2">
              <Link href={"https://tools.mereith.com"} target="_blank">
                <a className="w-full inline-block">工具站</a>
              </Link>
            </li>
            <li className="side-bar-item dark:border-dark-2 dark:hover:bg-dark-2">
              <Link href={"/about"}>
                <a className="w-full inline-block">关于</a>
              </Link>
            </li>
          </ul>
        </Menu>
      </div>
      <div className="container mx-auto  md:px-6  md:py-4 py-2 px-2 text-gray-600 ">
        <Head>
          <title>{props.title}</title>
          <link rel="icon" href={props.favicon}></link>
        </Head>

        {
          <div className="flex mx-auto justify-center">
            <div className="flex-shrink flex-grow max-w-3xl ">
              {props.children}
            </div>
            <div
              className={`hidden lg:block flex-shrink-0 flex-grow-0 ${
                Boolean(props.sideBar) ? "w-52" : ""
              }`}
            >
              {props.sideBar}
            </div>
          </div>
        }
        <footer className="text-center text-sm space-y-1 mt-8 md:mt-12 dark:text-dark">
          <p className="">
            IPC 编号:{" "}
            <a
              href={props.ipcHref}
              target="_blank"
              className="hover:text-gray-900 hover:underline-offset-2 hover:underline dark:hover:text-dark-hover transition"
            >
              {props.ipcNumber}
            </a>
          </p>

          <p>本站居然运行了 {getRunTimeOfDays(props.since)} 天</p>
          <p className="">
            Powered By{" "}
            <a
              href="https://github.com/Mereithhh/van-blog"
              target={"_blank"}
              className="hover:text-gray-900 hover:underline-offset-2 hover:underline dark:hover:text-dark-hover transition"
            >
              Van Blog
            </a>
          </p>

          <p className="select-none">
            © {props.since.getFullYear()} - {new Date().getFullYear()}
          </p>
          <p className="select-none">
            <Viewer></Viewer>
            {/* <span className="waline-pageview-count" data-path="/*" /> */}
          </p>
        </footer>
      </div>
    </>
  );
}