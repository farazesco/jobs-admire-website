import Image from "next/image";
import {Typography} from "@material-tailwind/react";


function blog() {
  return (
    <header className="p-8 mt-5 bg-white">
        <div className="w-full lg:container lg:mx-auto">
      <Image
        width={1024}
        height={400}
        src="/images/blog-background.png"
        alt="credit cards"
        className="h-96 w-full rounded-lg object-cover lg:h-[21rem]"
      />
    </div>
    <div className="container pt-20 mx-auto text-center w-w-full">
      <Typography
        color="white"
        className="mx-auto bg-[#6ac7e6] rounded-xl w-full text-[30px] lg:text-[40px] font-bold leading-[45px] lg:leading-[60px] lg:max-w-2xl"
      >
        Student Success Stories & Tips
      </Typography>
      <Typography
        variant="lead"
        className="mx-auto mt-8 w-full px-8 !text-gray-700 lg:w-10/12 lg:px-12 xl:w-8/12 xl:px-20"
      >
        Expand your web development knowledge with our tutorials and
        learning articles.
      </Typography>
      
    </div>
    
  </header>
  );
}
export default blog;
