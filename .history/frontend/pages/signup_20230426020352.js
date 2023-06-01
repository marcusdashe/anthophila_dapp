import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Web3 from "web3";
import { ethers } from "ethers";
import toast, { Toaster } from "react-hot-toast";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Link from "next/link";
import Layout from "@/components/Layout";
import artifacts from "@/src/artifacts/contracts/Holographic.sol/Holographic.json";

const Signup = () => {
  const [error, setError] = useState(false);
  const [hasMetamask, setHasMetamask] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [signer, setSigner] = useState(undefined);
  const [user, setUser] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [ethaddress, setEthaddress] = useState("");
  const [signupAs, setSignupAs] = useState("");
  const [signupSuccessfully, setSignupSuccessfully] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contractAddress, setContractAddress] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true);
      setContractAddress(process.env.NEXT_PUBLIC_LOCALNET_CONTRACT_ADDRESS);
    }
  }, [user]);

  const successNotification = () => {
    toast.success("Testator Registered Successfully");
  };

  const callSignupFunctionOnSC = async (evt) => {
    evt.preventDefault();

    if (hasMetamask) {
      try {
        setLoading(true);
        setError(null);

        // Connect to the smart contract
        await window.ethereum.request({ method: "eth_requestAccounts" });
        setIsConnected(true);
        setEthaddress(ethereum.selectedAddress);
        const provider = new ethers.BrowserProvider(window.ethereum);

        setSigner(await provider.getSigner());

        const contract = new ethers.Contract(
          "0x5fbdb2315678afecb367f032d93f642f64180aa3",
          artifacts.abi,
          signer
        );

        const tx = await contract.registerTestator.send(fullName, password);
        const receipt = await tx.wait();

        setSignupSuccessfully(true);
      } catch (err) {
        console.log(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (signupSuccessfully && signupAs === "testator") {
      router.push("/signin");
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <figure className="fixed top-10 left-10">
          <Link href="/">
            {" "}
            <KeyboardBackspaceIcon fontSize="large" />
          </Link>
        </figure>
        <div className="font-bold text-2xl cursor-pointer flex flex-col items-center text-gray-80 hover:scale-110 duration-500 mb-6"></div>
        <div className="bg-white p-10 rounded-lg shadow-lg">
          <h1 className="text-2xl font-medium mb-4">Create an account</h1>
          <form onSubmit={callSignupFunctionOnSC}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="border-[#5F3EB2] border-2 rounded-lg py-2 px-3 w-full"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-[#5F3EB2] border-2 rounded-lg py-2 px-3 w-full"
              />
            </div>

            <label htmlFor="signupAs">Signup as</label>
            <select
              id="signupAs"
              value={signupAs}
              onChange={(e) => setSignupAs(e.target.value)}
              className="border-1 mx-3 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-[#492823]"
              required
            >
              <option value="">-- Select --</option>
              <option value="testator">Testator</option>
              <option value="beneficiary">Beneficiary</option>
              <option value="doctor">Doctor/Coroner</option>
            </select>

            <button
              disabled={loading}
              className="bg-[#492823] w-150 text-white my-4 py-2 px-6 rounded-2xl md:mr-3 ml-0 hover:bg-[#D5D0ED] hover:text-[#492823] hover:scale-110 duration-500  snm:mr-3"
            >
              {loading ? "Loading..." : "Register"}
            </button>
          </form>
        </div>
        {error && toast.error("Error Occured")}
      </div>
      <Toaster />
    </Layout>
  );
};

export default Signup;
