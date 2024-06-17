import CardLogin from "@/components/cardLogin/CardLogin";

const PageLogin = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-muted/50">
      <div className="flex items-center justify-center w-full">
        <CardLogin />
        {/* <Button onClick={handleForgotPasswordClick} /> */}
      </div>
    </div>
  );
};

export default PageLogin;
