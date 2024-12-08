import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [isNumber, setIsNumber] = useState(false);
  const [isCharacter, setIsCharacter] = useState(false);
  const [password, setPassword] = useState("");
  const [buttonText, setButtonText] = useState("Copy");

  const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const specials = "!@#$%^&*()_+[]{}|;:',.<>?/";

  const passwordRef = useRef(null);

  function copyText() {
    // to have bg-blue on copied password
    passwordRef.current?.select();
    // to copy the password on clipboard
    window.navigator.clipboard.writeText(password);
    // transform the text
    setButtonText("Copied");
    setTimeout(() => {
      setButtonText("Copy");
    }, 3000);
  }

  const passwordGenerator = useCallback(() => {
    let pass = "";
    pass = pass + letters;
    if (isNumber) pass = pass + numbers;
    if (isCharacter) pass = pass + specials;
    let newPassword = "";
    for (let i = 0; i < length; i++) {
      //Math.random() generates a number in the range [0, 1) (including 0 but excluding 1).
      let randomIndex = Math.floor(Math.random() * pass.length);
      let randomLetter = pass[randomIndex];
      newPassword = newPassword + randomLetter;
    }
    setPassword(newPassword);
  }, [length, isCharacter, isNumber, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, isCharacter, isNumber, passwordGenerator]);

  return (
    <>
      <div
        id="main-container"
        className="w-full mt-20 flex justify-center items-center"
      >
        <div
          id="container-wrapper"
          className="bg-slate-600 w-[500px] px-4 py-2 *:py-3"
        >
          <h1 className="text-3xl text-white text-center font-bold">
            Password Generator
          </h1>
          <div id="input-button-wrapper" className="w-full flex font-semibold">
            <input
              type="text"
              placeholder="Password"
              readOnly
              className="w-full pl-2 outline-none text-[19px]"
              value={password}
              ref={passwordRef}
            />
            <button
              onClick={copyText}
              title="copy"
              className="bg-blue-600 text-white px-2 py-1 font-semibold hover:bg-blue-700 "
            >
              {buttonText}
            </button>
          </div>

          <div id="footer-div" className="w-full flex gap-x-6">
            <div>
              <input
                type="range"
                min={8}
                value={length}
                max={20}
                onChange={(event) => setLength(event.target.value)}
                className=" cursor-pointer"
              />
              <label className="ml-2 font-semibold text-white">
                Length:{length}
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                className="cursor-pointer"
                onClick={() => setIsNumber((prev) => !prev)}
              />
              <label className="ml-2 font-semibold text-white">
                Number : {isNumber ? "YES" : "NO"}
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                className="cursor-pointer"
                onClick={() => setIsCharacter((prev) => !prev)}
              />
              <label className="ml-2 font-semibold text-white">
                Character : {isCharacter ? "YES" : "NO"}
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
