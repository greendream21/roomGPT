import { AnimatePresence, motion } from "framer-motion";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { UploadDropzone } from "react-uploader";
import { Uploader } from "uploader";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoadingDots from "../components/LoadingDots";
import ResizablePanel from "../components/ResizablePanel";

// Configuration for the uploader
const uploader = Uploader({ apiKey: "free" });
const options = { maxFileCount: 1, mimeTypes: ["image/jpeg", "image/png", "image/jpg"], editor: { images: { crop: false } }, styles: { colors: { primary: "#000" } } };

const Home: NextPage = () => {
  const [originalPhoto, setOriginalPhoto] = useState<string | null>(null);
  const [restoredImage, setRestoredImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const UploadDropZone = () => (
    <UploadDropzone
      uploader={uploader}
      options={options}
      onUpdate={(file) => {
        if (file.length !== 0) {
          console.log("uploaded file man");
          setOriginalPhoto(file[0].fileUrl);
          generatePhoto(file[0].fileUrl);
        }
      }}
      width="670px"
      height="250px"
    />
  );

  async function generatePhoto(fileUrl: string) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setLoading(true);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrl: fileUrl }),
    });

    let newPhoto = await res.json();
    setRestoredImage(newPhoto);
    setLoading(false);
  }

  return (
    <div className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>Restore Photos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-4">
        <h1 className="mx-auto max-w-4xl font-display text-4xl font-bold tracking-normal text-slate-900 sm:text-6xl mb-5">Restore your photos</h1>

        <ResizablePanel>
          <AnimatePresence exitBeforeEnter>
            <motion.div className="flex justify-between items-center w-full flex-col mt-6">
              {!originalPhoto && <UploadDropZone />}
              {originalPhoto && !restoredImage && <Image alt="original photo" src={originalPhoto} className="w-80 rounded-2xl" width={300} height={300} />}
              {restoredImage && originalPhoto && (
                <div className="flex sm:space-x-4 sm:flex-row flex-col">
                  <div>
                    <h3 className="mb-1 font-medium text-lg">Original Photo</h3>
                    <Image alt="" src={originalPhoto} className="rounded-2xl relative" width={300} height={300} />
                  </div>
                  <div className="sm:mt-0 mt-8">
                    <h3 className="mb-1 font-medium text-lg">Restored Photo</h3>
                    <Image alt="" src={restoredImage} className="rounded-2xl relative sm:mt-0 mt-2" width={300} height={300} />
                  </div>
                </div>
              )}
              {loading && (
                <button disabled className="bg-black rounded-full text-white font-medium px-4 pt-2 pb-3 mt-8 hover:bg-black/80 w-40">
                  <span className="pt-4">
                    <LoadingDots color="white" style="large" />
                  </span>
                </button>
              )}
              {originalPhoto && !loading && (
                <button
                  onClick={() => {
                    setOriginalPhoto(null);
                    setRestoredImage(null);
                  }}
                  className="bg-black rounded-full text-white font-medium px-4 py-2 mt-8 hover:bg-black/80"
                >
                  Upload New Photo
                </button>
              )}
            </motion.div>
          </AnimatePresence>
        </ResizablePanel>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
