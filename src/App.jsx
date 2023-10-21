import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numbersAllowed, setNumbersAllowed] = useState(false);
  const [charactersAllowed, setCharactersAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // useRef hook
  const passwordReference = useRef(null)

  const passwordGenerator = useCallback(() => {
    let passwd = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numbersAllowed) str += "0123456789";
    if (charactersAllowed) str += "`~!@#$%^&*()_-+={}[]|?/><";

    for (let i = 0; i <= length; i++) {
      let charIndex = Math.floor(Math.random() * str.length + 1);
      passwd += str.charAt(charIndex);
    }

    setPassword(passwd);
  }, [length, numbersAllowed, charactersAllowed, setPassword]);

  const copyPasswdToClipBoard = useCallback(() => {
    passwordReference.current?.select();
    passwordReference.current?.setSelectionRange(0, 100)
    window.navigator.clipboard.writeText(password);
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numbersAllowed, charactersAllowed, passwordGenerator])

  return (
    <>
      <div className="w-full max-w-md bg-gray-700 mx-auto my-8 px-4 py-4 shadow-md rounded-lg">
        <h1 className="text-white text-4xl text-center font-bold pb-4">
          Password Generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            value={password}
            className="outline-none w-full px-3 py-1 text-black"
            placeholder="Password"
            readOnly
            ref={passwordReference}
            type="text"
          />
          <button
          onClick={copyPasswdToClipBoard}
          className="outline-none bg-blue-600 text-white px-3 py-0.5 shrink-0">Copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input 
            type="range" 
            min={8}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {
              setLength(e.target.value)
            }}/>

            <label className="text-white">Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox"
            defaultChecked={numbersAllowed}
            id="numberInput"
            onChange={() => {
              setNumbersAllowed((prev) => !prev);
            }}
            />
            <label htmlFor="numberInput" className="text-white">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox"
            defaultChecked={charactersAllowed}
            id="characterInput"
            onChange={() => {
              setCharactersAllowed((prev) => !prev);
            }}
            />
            <label htmlFor="characterInput" className="text-white">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
