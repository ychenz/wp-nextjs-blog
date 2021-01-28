import Head from "next/head";
import Link from "next/link";
import React, { ReactElement } from "react";
import Particles, { IParticlesParams } from "react-particles-js";
import Button from "components/Button";
import PageWrapper from "components/PageWrapper";
import particles from "page-assets/portfolio/particles.json";
import {
  ParticleBackground,
  Title,
  ButtonContainer
} from "page-assets/portfolio/styles";

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
        <div>
          <Title>Portfolio</Title>
          <ButtonContainer>
            <Link
              href="/portfolio/charting"
            >
              <Button
                name="Advanced Charting"
                onClick={() => undefined}
                isTransparent
              />
            </Link>
          </ButtonContainer>
        </div>
      </div>
    </>
  );
}

export default PageWrapper(Portfolio);
