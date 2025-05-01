import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

import GetOTP from "./GetOTP";
import OTP from "./OTP";
import { Helmet } from "react-helmet";
import { PopupLoading } from "../../components/PopupLoading";

function LoginAdmin() {
  const [currentForm, setCurrentForm] = useState("GetOTP"); // Quản lý form hiện tại
  const [email, setEmail] = useState("");
  const [result, setResult] = useState(false);
  const [loadingPopup, setLoadingPopup] = useState(false);
  console.log("Current Form:", currentForm);
  return (
    <>
      <Helmet>
        <title>Đăng nhập</title>
      </Helmet>
      {loadingPopup && <PopupLoading />}
      <Container fluid className="flex justify-center items-center my-5">
        <Row className="justify-center w-full">
          <Col
            md={10}
            lg={4}
            className="relative flex items-center justify-center"
          >
            {currentForm === "GetOTP" && (
              <GetOTP
                onNext={() => setCurrentForm("OTP")}
                onSetEmail={setEmail}
                setResult={setResult}
              />
            )}
            {currentForm === "OTP" && (
              <OTP
                email={email}
                result={result}
                setLoadingPopup={setLoadingPopup}
              />
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default LoginAdmin;
