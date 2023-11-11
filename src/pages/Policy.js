import React from "react";
import {Layout} from "./../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="https://img.freepik.com/free-photo/car-auto-motor-insurance-reimbursement-vehicle-concept_53876-165271.jpg?w=900&t=st=1699337537~exp=1699338137~hmac=c1df0bff9793d436362aad548a8791f9dc3b689418f9f4f9391b3115066b0b7d"
            alt="policy"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p>A privacy policy on your website is a legal document informing users about how you collect and handle their personal data, who you share it with, if you sell it, and any other relevant details.</p>
          <p>You should note that while there are essential differences between the information included in a privacy policy and a privacy notice, the terms can still be confused and are often used interchangeably.</p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;