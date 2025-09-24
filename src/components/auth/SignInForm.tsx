import { useState } from "react";
import { Link } from "react-router";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Login 
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Entre utilizando suas credencias da rede AGU!
            </p>
          </div>
          <div>
            <form>
              <div className="space-y-6">
                <div>
                  <Label>
                    Email <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input placeholder="info@agu.gov.br" />
                </div>
                <div>
                  <Label>
                    Password <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox checked={isChecked} onChange={setIsChecked} />
                    <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                      Manter-me conectado
                    </span>
                  </div>
                    <a
                    href="https://passwordreset.microsoftonline.com/passwordreset#!/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                    >
                    Esqueceu sua senha?
                    </a>
                </div>
                <div>
                  <Button className="w-full bg-brand-950 hover:bg-brand-900 text-white" size="sm">
                    Sign in
                  </Button>
                </div>
              </div>
            </form>

            <div className="mt-5">
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
