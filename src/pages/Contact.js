import React from "react";
import {Layout} from "./../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
const Contact = () => {
  return (
    <Layout title={"Contact us"}>
      <div className="row contactus ">
        <div className="col-md-7 ">
          <img
            src="https://img.freepik.com/free-photo/colleagues-working-together-call-center-office_23-2149256147.jpg?w=1060&t=st=1699336619~exp=1699337219~hmac=95957d44ab976c40fcbfdf9277a0996b0feeae612508ddea19c51d41452ab79b"
            alt="contactus"
            style={{ width: "100%",borderRadius:"5px" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
            any query and info about prodduct feel free to call anytime we 24X7
            vaialible
          </p>
          <p className="mt-3">
            <BiMailSend /> : www.help@ecommerceapp.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 012-3456789
          </p>
          <p className="mt-3">
            <BiSupport /> : 1800-0000-0000 (toll free)
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;