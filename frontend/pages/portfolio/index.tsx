import Head from "next/head";
import { ReactElement } from "react";
import Particles, { IParticlesParams } from "react-particles-js";
import PageWrapper from "components/PageWrapper";
import particles from "./particles.json";
import {
  ParticleBackground
} from "./styles";

function Portfolio(): ReactElement {
  return (
    <>
      <Head>
        <title>Portfolio</title>
        <script src="https://cdn.rawgit.com/progers/pathseg/master/pathseg.js" />
      </Head>
      <div>
        <ParticleBackground>
          <Particles params={particles as IParticlesParams} />
        </ParticleBackground>
        <div>My portfolio Page</div>
      </div>
    </>
  );
}

export default PageWrapper(Portfolio);
