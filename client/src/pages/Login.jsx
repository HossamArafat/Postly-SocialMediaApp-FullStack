import bgImg from "../assets/images/bgImage.png";
import logo from "../assets/images/logo.png";
import group_user from "../assets/images/group_users.png";
import { Star } from "lucide-react";
import { SignIn } from "@clerk/clerk-react";

const Login = () => {
  return (
    <div className="h-screen flex flex-col md:flex-row">
      <img src={bgImg} alt="" className="absolute top-0 left-0 w-full -z-10" />
      <div className="flex-1 flex flex-col items-start justify-between p-6 lg:pl-40 md:p-10">
        <img src={logo} alt="" className="h-12 object-contain" />
        <div>
          <div className="flex items-center gap-3 mb-4 max-md:mt-10">
            <img src={group_user} alt="" className="h-8 md:h-10" />
            <div>
              <div className="flex">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star
                      key={i}
                      className="size-5 md:size-5.5 text-transparent fill-amber-500"
                    />
                  ))}
              </div>
              <p>Used by 12k+ developers</p>
            </div>
          </div>
          <h1 className="text-3xl md:text-6xl md:pb-2 font-bold bg-linear-to-r from-indigo-950 to-indigo-800 bg-clip-text text-transparent">
            More than just friends truely connect
          </h1>
          <p className="flex-1 flex items-center justify-center p-6 sm:p-10"></p>
        </div>
        <span className="md:h-10"></span>
      </div>
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <SignIn/>
      </div>
    </div>
  );
};

export default Login;
