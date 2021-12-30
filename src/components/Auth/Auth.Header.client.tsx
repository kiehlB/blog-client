export type AuthHeaderProps = {};

function AuthHeader({}: AuthHeaderProps) {
  return (
    <div
      className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
flex items-center justify-center">
      <div className="w-full h-100">
        <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
          Log in to your account
        </h1>
      </div>
    </div>
  );
}

export default AuthHeader;
