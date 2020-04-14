import React, { useContext, useState } from "react";
import styled from "styled-components";

import Customer from "../components/applicationComponents/Steps/Customer";
import Location from "../components/applicationComponents/Steps/Location";
import Texture from "../components/applicationComponents/Steps/Texture";
import Size from "../components/applicationComponents/Steps/Size";
import GlassSize from "../components/applicationComponents/Steps/GlassSize";
import Success from "../components/applicationComponents/Steps/Success";
import Wrong from "../components/applicationComponents/Steps/Wrong";
import appContext from "../context/context";
import Sidelites from "../dbComponents/Sidelites";

const DoorApplication = ({ match }) => {
  const { dispatch } = useContext(appContext);
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const beginning = () => {
    setStep(1);
  };

  const Switch = (prop) => {
    switch (step) {
      case 1:
        return <Customer nextStep={nextStep} prevStep={prevStep} />;
      case 2:
        return <Location nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <Texture nextStep={nextStep} prevStep={prevStep} />;
      case 4:
        return <Size nextStep={nextStep} prevStep={prevStep} />;
      case 5:
        return <GlassSize nextStep={nextStep} prevStep={prevStep} />;
      case 6:
        return <Success beginning={beginning} prevStep={prevStep} />;
      default:
        return <Wrong />;
    }
  };

  return (
    <Container>
      <Left>
        <Switch />
      </Left>
      <Right></Right>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
`;

const Left = styled.div``;

const Right = styled.div``;

export default DoorApplication;
