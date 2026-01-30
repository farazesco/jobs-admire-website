import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Pagination, Autoplay } from 'swiper/modules';

// const testimonials = [
//   {
//     id: 1,
//     rating: 4.9,
//     review:
//       "UniAdmire made my dream of studying abroad a reality! Their team guided me through every step, from selecting the right university to securing my scholarship. The process was smooth, and their support was outstanding. Highly recommended!",
//     name: "Ayesha R.",
//     role: "Turkey",
//   },
//   {
//     id: 2,
//     rating: 4.9,
//     review:
//       "As a parent, I was worried about my son studying abroad, but UniAdmire provided us with complete guidance and assurance. They handled everything professionally, and today, my son is thriving at one of the top universities. Thank you, UniAdmire!",
//     name: "Mohammad Ali",
//     role: "Pakistan",
//   },
//   {
//     id: 3,
//     rating: 4.9,
//     review:
//       "I was struggling with my university applications until I found UniAdmire. Their expert team helped me with documentation, admissions, and even visa processing. Thanks to them, I am now studying at my dream university!",
//     name: "Sarah M.",
//     role: "Kazakhstan",
//   },
// ];

export default function TestimonialSlider() {
  return (
    <section class="bg-white">
    <div class="container px-6 py-10 mx-auto">
        <div class="mt-6 md:flex md:items-center md:justify-between">
            <div>
                <h1 class="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
                    What our clients are saying
                </h1>

                <div class="flex mx-auto mt-6">
                    <span class="inline-block w-40 h-1 bg-[#2c9caf] rounded-full"></span>
                    <span class="inline-block w-3 h-1 mx-1 bg-[#2c9caf] rounded-full"></span>
                    <span class="inline-block w-1 h-1 bg-[#2c9caf] rounded-full"></span>
                </div>
            </div>

            <div class="flex justify-between mt-8 md:mt-0">
                <button title="left arrow" class="p-2 mx-3 text-gray-800 transition-colors duration-300 border rounded-full rtl:-scale-x-100 dark:text-gray-200 dark:hover:bg-gray-800 dark:border-gray-700 hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <button title="right arrow" class="p-2 text-gray-800 transition-colors duration-300 border rounded-full rtl:-scale-x-100 dark:text-gray-200 dark:hover:bg-gray-800 dark:border-gray-700 hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>

        <section class="grid grid-cols-1 gap-8 mt-8 xl:mt-12 lg:grid-cols-2 xl:grid-cols-3">
            <div class="p-8 border rounded-lg dark:border-gray-700">
                <p class="leading-loose text-gray-500 dark:text-gray-400">
                    “UniAdmire made my dream of studying abroad a reality! Their team guided me through every step, from selecting the right university to securing my scholarship. The process was smooth, and their support was outstanding. Highly recommended!”
                </p>

                <div class="flex items-center mt-8 -mx-2">
                <img class="object-cover mx-2 rounded-full w-14 shrink-0 h-14 ring-4 ring-blue-200" src="https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80" alt=""/>

                    <div class="mx-2">
                        <h1 class="font-semibold text-gray-800 dark:text-white">Ayesha R.</h1>
                        <span class="text-sm text-gray-500 dark:text-gray-400">Turkey</span>
                    </div>
                </div>
            </div>

            <div class="p-8 bg-[#34b7eb] border border-transparent rounded-lg dark:bg-blue-600">
                <p class="leading-loose text-white">
                    “As a parent, I was worried about my son studying abroad, but UniAdmire provided us with complete guidance and assurance. They handled everything professionally, and today, my son is thriving at one of the top universities. Thank you, UniAdmire!”.
                </p>

                <div class="flex items-center mt-8 -mx-2">
                <img class="object-cover mx-2 rounded-full w-14 shrink-0 h-14 ring-4 ring-gray-300 dark:ring-gray-700" src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt=""/>
                    

                    <div class="mx-2">
                        <h1 class="font-semibold text-white">Mohammad Ali</h1>
                        <span class="text-sm text-blue-200">Pakistan</span>
                    </div>
                </div>
            </div>

            <div class="p-8 border rounded-lg dark:border-gray-700">
                <p class="leading-loose text-gray-500 dark:text-gray-400">
                    “I was struggling with my university applications until I found UniAdmire. Their expert team helped me with documentation, admissions, and even visa processing. Thanks to them, I am now studying at my dream university!”.
                </p>

                <div class="flex items-center mt-8 -mx-2">
                    <img class="object-cover mx-2 rounded-full w-14 shrink-0 h-14 ring-4 ring-gray-300 dark:ring-gray-700" src="https://images.unsplash.com/photo-1488508872907-592763824245?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt=""/>

                    <div class="mx-2">
                        <h1 class="font-semibold text-gray-800 dark:text-white">Sarah M. </h1>
                        <span class="text-sm text-gray-500 dark:text-gray-400">Kazakhstan</span>
                    </div>
                </div>
            </div>
        </section>
    </div>
</section>
    // <section className="py-24">
    //   <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
    //     <div className="mb-16 text-center">
    //       <span className="block mb-2 text-sm font-medium text-gray-500">
    //         TESTIMONIAL
    //       </span>
    //       <h2 className="text-4xl font-bold text-gray-900">
    //         What our happy users say!
    //       </h2>
    //     </div>
    //     <Swiper
    //       modules={[Pagination, Autoplay]}
    //       slidesPerView={1}
    //       spaceBetween={20}
    //     //   pagination={{ clickable: true }}
    //       autoplay={{ delay: 3000, disableOnInteraction: false }}
    //       loop={true}
    //       breakpoints={{
    //         640: { slidesPerView: 1 },
    //         1024: { slidesPerView: 3 },
    //       }}
    //       className="mySwiper"
    //     >
    //       {testimonials.map(({ id, rating, review, name, role }) => (
    //         <SwiperSlide key={id}>
    //           <div className="p-6 transition bg-white border border-gray-300 rounded-xl hover:border-indigo-600 hover:shadow-sm">
    //             <div className="flex items-center gap-2 mb-7 text-amber-500">
    //               <svg
    //                 className="w-5 h-5"
    //                 viewBox="0 0 18 17"
    //                 fill="none"
    //                 xmlns="http://www.w3.org/2000/svg"
    //               >
    //                 <path
    //                   d="M8.10326 1.31699C8.47008 0.57374 9.52992 0.57374 9.89674 1.31699L11.7063 4.98347C11.8519 5.27862 12.1335 5.48319 12.4592 5.53051L16.5054 6.11846C17.3256 6.23765 17.6531 7.24562 17.0596 7.82416L14.1318 10.6781C13.8961 10.9079 13.7885 11.2389 13.8442 11.5632L14.5353 15.5931C14.6754 16.41 13.818 17.033 13.0844 16.6473L9.46534 14.7446C9.17402 14.5915 8.82598 14.5915 8.53466 14.7446L4.91562 16.6473C4.18199 17.033 3.32456 16.41 3.46467 15.5931L4.15585 11.5632C4.21148 11.2389 4.10393 10.9079 3.86825 10.6781L0.940384 7.82416C0.346867 7.24562 0.674378 6.23765 1.4946 6.11846L5.54081 5.53051C5.86652 5.48319 6.14808 5.27862 6.29374 4.98347L8.10326 1.31699Z"
    //                   fill="currentColor"
    //                 />
    //               </svg>
    //               <span className="text-base font-semibold text-indigo-600">
    //                 {rating}
    //               </span>
    //             </div>
    //             <p className="pb-8 text-base leading-6 text-gray-600 group-hover:text-gray-800">
    //               {review}
    //             </p>
    //             <div className="flex items-center gap-5 pt-5 border-t border-gray-200">
    //               <div>
    //                 <h5 className="mb-1 font-medium text-gray-900">{name}</h5>
    //                 <span className="text-sm text-gray-500">{role}</span>
    //               </div>
    //             </div>
    //           </div>
    //         </SwiperSlide>
    //       ))}
    //     </Swiper>
    //   </div>
    // </section>
  );
}
