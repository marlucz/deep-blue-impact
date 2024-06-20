import { Suspense } from "react";

import { Settings } from "./Settings";
import { Reef } from "../Components/Reef";
import { SeaTurtle } from "../Components/SeaTurtle";
import { Portal } from "../Components/Portal";

const Scene = () => {
  return (
    <>
      <Settings />
      <Suspense fallback={null}>
        <Reef />
        <SeaTurtle />
        <Portal />
        {/* <Ocean /> */}
      </Suspense>

      {/* <Loader /> */}
    </>
  );
};

export default Scene;
