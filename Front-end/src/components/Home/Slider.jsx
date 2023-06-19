import React from "react";

import { Carousel, Typography, Button } from "@material-tailwind/react";

import slider1 from "../../assets/slider-1.jpg";
import slider2 from "../../assets/slider-2.jpg";
import slider3 from "../../assets/slider-3.jpg";
import { Link } from "react-router-dom";

function Slider() {
  return (
    <Carousel
      loop={true}
      autoplay={true}
      transition={{ type: "tween", duration: 0.5 }}
      className=""
      style={{ height: "75vh" }}
      dir="ltr"
    >
      <div className="relative w-full">
        <img
          src={slider1}
          alt="image 1"
          className=" w-full object-cover"
          style={{ height: "75vh" }}
        />
        <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/60">
          <div className="w-3/4 text-center md:w-2/4">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              أنقذ الطبيعة معنا
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              الطبيعة تعتبر منبعًا حيويًا للحياة، وتوفر لنا الهواء النقي والمياه
              العذبة والغذاء الصحي. إلا أنها تتعرض للتدهور والتلوث بسبب نشاطاتنا
              البشرية غير المستدامة
            </Typography>
            <div className="flex justify-center gap-2">
              <Link to='/services'><Button size="lg" color="green">
                تبرع بشجرة
              </Button></Link>
            </div>
          </div>
        </div>
      </div>
      <div className="relative w-full">
        <img
          src={slider2}
          alt="image 1"
          className=" w-full object-cover"
          style={{ height: "75vh" }}
        />
        <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/60">
          <div className="w-3/4 text-center md:w-2/4">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              حان الوقت لتقديم مساعدة أفضل
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80 "
            >
              انضم إلى فريقنا للتطوع في زراعة الأشجار وكون جزءًا من الحركة
              العالمية للمحافظة على البيئة. قد تكون هناك فرص
              في المتنزهات والمستشفيات والمدارس وغيرها من الأماكن. انطلق الآن
              وقدم طلبك للتطوع لزراعة الأشجار، فالطبيعة تنتظر مساهمتك
            </Typography>
            <div className="flex justify-center gap-2">
             <Link to='/Signup'><Button size="lg" color="green">
                تطوع الآن
              </Button></Link> 
            </div>
          </div>
        </div>
      </div>
      <div className="relative w-full">
        <img
          src={slider3}
          alt="image 1"
          className=" w-full object-cover"
          style={{ height: "75vh" }}
        />
        <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/60">
          <div className="w-3/4 text-center md:w-2/4">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              !قمنا بزرعة أكثر من 1000 شجرة
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              ستساهم في إنشاء غابات جديدة وتحسين جودة الهواء وتوفير موطن للحياة
              البرية المتنوعة. فهذه الأشجار ليست مجرد نباتات، بل هي مصدر للحياة
              والأكسجين ومساحات للترفيه ايضاً
            </Typography>
            <div className="flex justify-center gap-2">
              <Link to='/Signup'><Button size="lg" color="green">
                !انضم إلينا
              </Button></Link>
            </div>
          </div>
        </div>
      </div>
    </Carousel>
  );
}

export default Slider;
