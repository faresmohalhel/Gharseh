import React from 'react'

const Service = () => {
  return (
    <>
<div className="relative">
  <div className="flex flex-col gap-4 justify-center items-center w-full h-full md:px-0">
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-green-500">
      ماذا نحن نفعل؟
    </h1>
  </div>
</div>



    <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16 " dir='rtl'>
    <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10">
      <div className="rounded overflow-hidden shadow-lg transition duration-300 hover:scale-105 ">
        <div className="relative">
            <img
              className="w-full"
              src="https://www.czechuniversities.com/uploads/2020/02/290.jpg"
              alt="Sunset in the mountains"
            />
            <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
            <div className="text-sm absolute top-0 right-0 bg-green-600 px-4 text-white rounded-full h-16 w-16 flex flex-col items-center justify-center mt-3 mr-3 transition duration-500 ease-in-out">
            <i className="fab fa-pagelines fa-lg" style={{ color: "#ffffff" }} />
            </div>
        </div>
        <div className="px-6  font-bold py-4">
        زراعة أشجار جديدة
          <p className="text-gray-500 text-sm">نقوم بزراعة الأشجار بمواقع يتم تحدديها مسبقاً</p>
        </div>
   
      </div>
      <div className="rounded overflow-hidden shadow-lg transition duration-300 hover:scale-105">
        <div className="relative">
            <img
              className="w-full"
              src="https://cdn.shopify.com/s/files/1/0257/3903/4698/articles/7_Tips_To_Be_More_Eco-friendly_in_2019_1000x1000.jpg?v=1571826589"
              alt="Sunset in the mountains"
            />
            <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
            <div className="text-sm absolute top-0 right-0 bg-green-600 px-4 text-white rounded-full h-16 w-16 flex flex-col items-center justify-center mt-3 mr-3 transition duration-500 ease-in-out">
            <i className="fas fa-seedling"></i>
            </div>
        </div>
        <div className="px-6  font-bold py-4">
        نحن أصدقاء البيئة
          <p className="text-gray-500 text-sm">فريقنا فريق محب للطبيعة ونرحب بكل اصدقاء الطبيعة</p>
        </div>
   
      </div>
      <div className="rounded overflow-hidden shadow-lg transition duration-300 hover:scale-105">
        <div className="relative" >
            <img
              className="w-full"
              src="https://modo3.com/thumbs/fit630x300/169038/1638267558/%D8%B7%D8%B1%D9%82_%D8%B1%D9%8A_%D8%A7%D9%84%D9%86%D8%A8%D8%A7%D8%AA%D8%A7%D8%AA.jpg"
              alt="Sunset in the mountains"
            />
            <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
            <div className="text-sm absolute top-0 right-0 bg-green-600 px-4 text-white rounded-full h-16 w-16 flex flex-col items-center justify-center mt-3 mr-3 transition duration-500 ease-in-out">
            <i className="fas fa-tint"></i>
            </div>
        </div>
        <div className="px-6 font-bold py-4">
        متابعة الأشجار وسقايتها
          <p className="text-gray-500 text-sm">نقوم بمتابعة الاهتمام بالأشجار بجميع المواقع</p>
        </div>
   
      </div>

    </div>
  </div>
  </>
  )
}

export default Service